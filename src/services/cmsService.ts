import { CMSPage, PageFrontmatter, UploadedImage } from '../types/cms';

export async function fetchAllPages(): Promise<CMSPage[]> {
  try {
    const res = await fetch('/api/content/pages');
    if (!res.ok) {
      throw new Error(`Failed to fetch pages: ${res.statusText}`);
    }
    const data = await res.json();
    return data.pages || [];
  } catch (err) {
    console.error('Error in fetchAllPages:', err);
    return [];
  }
}

export async function fetchPageBySlug(slug: string): Promise<CMSPage | null> {
  try {
    const res = await fetch(`/api/content/pages/${encodeURIComponent(slug)}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch page ${slug}: ${res.statusText}`);
    }
    const data = await res.json();
    return data.page || null;
  } catch (err) {
    console.error(`Error in fetchPageBySlug(${slug}):`, err);
    return null;
  }
}

export async function savePage(pageData: {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
  originalSlug?: string;
}): Promise<CMSPage> {
  const res = await fetch('/api/content/pages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageData),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to save page: ${res.statusText}`);
  }

  const data = await res.json();
  return data.page;
}

export async function deletePage(slug: string): Promise<boolean> {
  const res = await fetch(`/api/content/pages/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to delete page: ${res.statusText}`);
  }

  return true;
}

export async function fetchUploadedImages(): Promise<UploadedImage[]> {
  try {
    const res = await fetch('/api/uploads');
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.images || [];
  } catch (err) {
    console.warn('Error fetching uploaded images:', err);
    return [];
  }
}

export async function deleteUploadedImage(filename: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/uploads/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.error('Error deleting image:', err);
    return false;
  }
}

export async function uploadMediaFile(file: File): Promise<{ success: boolean; url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Upload failed: ${res.statusText}`);
  }

  return await res.json();
}

