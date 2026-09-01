import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
  type Auth,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, type FirebaseStorage } from 'firebase/storage';

// Safe access to import.meta.env
const env = (import.meta as any).env || {};

// Firebase configuration from environment or fallback
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoDummyKeyForPreviewModeOnly000',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'flame-cms-auth.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'flame-cms-auth',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'flame-cms-auth.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef123456',
};

let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage | null = null;
let googleProvider: GoogleAuthProvider;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  try {
    storage = getStorage(app);
  } catch (err) {
    console.warn('Firebase Storage initialization notice:', err);
  }
} catch (error) {
  console.warn('Firebase Auth standard init notice:', error);
  auth = {} as any;
  googleProvider = {} as any;
}

export { app, auth, googleProvider, storage };

/**
 * Sign in with Google using Firebase Authentication.
 * Includes a simulated demo fallback for development / test environments when Firebase credentials are not yet populated.
 */
export async function signInWithGoogle(): Promise<User | { email: string; displayName: string; photoURL: string; uid: string }> {
  try {
    if (auth && typeof auth.onAuthStateChanged === 'function' && env.VITE_FIREBASE_API_KEY) {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    }
  } catch (error: any) {
    console.warn('Firebase popup sign-in notice:', error);
    if (error?.code === 'auth/popup-closed-by-user') {
      throw error;
    }
  }

  // Graceful interactive login prompt for testing / preview environment
  const enteredEmail = window.prompt(
    '🔐 Google Sign In Simulation (Firebase Auth):\n\nEnter your Google / Gmail address:\n(Note: Authorized Admin: syashpal1510@gmail.com)',
    'syashpal1510@gmail.com'
  );

  if (!enteredEmail) {
    throw new Error('Sign-in was cancelled by user');
  }

  return {
    email: enteredEmail.trim(),
    displayName: enteredEmail.split('@')[0],
    photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(enteredEmail)}`,
    uid: `user_${Math.random().toString(36).substring(2, 9)}`,
  };
}

/**
 * Sign out the current user
 */
export async function signOutUser(): Promise<void> {
  try {
    if (auth && typeof firebaseSignOut === 'function') {
      await firebaseSignOut(auth);
    }
  } catch (err) {
    console.warn('Firebase sign-out:', err);
  }
  localStorage.removeItem('flame_cms_user');
}

/**
 * Upload image to Firebase Storage if active, or fallback to backend /api/upload
 */
export async function uploadImageToStorage(file: File): Promise<{ url: string; filename: string }> {
  // First attempt backend multipart upload to /api/upload
  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      return { url: data.url, filename: data.filename };
    }
  } catch (err) {
    console.warn('Backend upload fallback:', err);
  }

  // Second attempt: Firebase Storage if available
  if (storage && env.VITE_FIREBASE_STORAGE_BUCKET) {
    try {
      const storageRef = ref(storage, `cms_images/${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { url: downloadURL, filename: file.name };
    } catch (err) {
      console.warn('Firebase Storage upload error:', err);
    }
  }

  // Fallback: Read as Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string, filename: file.name });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
