export interface PageFrontmatter {
  title: string;
  subtitle?: string;
  navTitle?: string;
  order?: number;
  slug: string;
  coverImage?: string;
  coverVideos?: string[];
  metaDescription?: string;
  [key: string]: any;
}

export interface CMSPage {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
  rawMarkdown: string;
  filename: string;
  lastModified?: string;
}

export interface UploadedImage {
  filename: string;
  url: string;
  size?: number;
  uploadedAt?: string;
}

export interface AdminUser {
  email: string;
  displayName: string;
  photoURL?: string;
  uid: string;
  isAuthorized: boolean;
}
