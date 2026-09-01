import express from 'express';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const CONTENT_DIR = path.join(process.cwd(), 'content');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');

// Ensure directories exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(GALLERY_DIR)) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
}

// Serve uploaded and gallery assets statically
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/public/uploads', express.static(UPLOADS_DIR));
app.use('/gallery', express.static(GALLERY_DIR));
app.use('/public/gallery', express.static(GALLERY_DIR));

// Configure Multer for drag-and-drop media (images & videos) uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    cb(null, `${uniqueSuffix}-${cleanName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.originalname.match(/\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|webp|gif|svg)$/i)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  },
});

// =========================================================================
// CMS REST API ENDPOINTS
// =========================================================================

// Allowed Admin Configuration endpoint
app.get('/api/config/admin', (req, res) => {
  res.json({
    allowedEmails: ['syashpal1510@gmail.com'],
  });
});

// GET /api/content/pages - List all Markdown pages
app.get('/api/content/pages', (req, res) => {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return res.json({ pages: [] });
    }

    const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.md'));
    const pages = files.map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const stats = fs.statSync(filePath);
      const parsed = matter(fileContent);
      const slugFromFilename = filename.replace(/\.md$/, '');
      const slug = (parsed.data.slug as string) || slugFromFilename;

      return {
        slug,
        filename,
        frontmatter: {
          title: parsed.data.title || slug.charAt(0).toUpperCase() + slug.slice(1),
          subtitle: parsed.data.subtitle || '',
          navTitle: parsed.data.navTitle || parsed.data.title || slug,
          order: typeof parsed.data.order === 'number' ? parsed.data.order : 99,
          slug,
          coverImage: parsed.data.coverImage || '',
          metaDescription: parsed.data.metaDescription || '',
          ...parsed.data,
        },
        content: parsed.content,
        rawMarkdown: fileContent,
        lastModified: stats.mtime.toISOString(),
      };
    });

    // Sort by order asc, then title
    pages.sort((a, b) => {
      const orderA = a.frontmatter.order ?? 99;
      const orderB = b.frontmatter.order ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });

    res.json({ pages });
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch content pages', details: error.message });
  }
});

// GET /api/content/pages/:slug - Get single Markdown page
app.get('/api/content/pages/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    const filename = `${slug}.md`;
    let filePath = path.join(CONTENT_DIR, filename);

    // Fallback: search for file with matching slug in frontmatter
    if (!fs.existsSync(filePath)) {
      const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
      const found = files.find((f) => {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8');
        const parsed = matter(raw);
        return parsed.data.slug === slug;
      });
      if (found) {
        filePath = path.join(CONTENT_DIR, found);
      } else {
        return res.status(404).json({ error: `Page with slug '${slug}' not found` });
      }
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const parsed = matter(fileContent);

    res.json({
      page: {
        slug,
        filename: path.basename(filePath),
        frontmatter: {
          title: parsed.data.title || slug,
          subtitle: parsed.data.subtitle || '',
          navTitle: parsed.data.navTitle || parsed.data.title || slug,
          order: typeof parsed.data.order === 'number' ? parsed.data.order : 99,
          slug,
          coverImage: parsed.data.coverImage || '',
          metaDescription: parsed.data.metaDescription || '',
          ...parsed.data,
        },
        content: parsed.content,
        rawMarkdown: fileContent,
        lastModified: stats.mtime.toISOString(),
      },
    });
  } catch (error: any) {
    console.error(`Error reading page ${req.params.slug}:`, error);
    res.status(500).json({ error: 'Failed to read page', details: error.message });
  }
});

// POST /api/content/pages - Create or Update a Markdown page
app.post('/api/content/pages', (req, res) => {
  try {
    const { slug, frontmatter = {}, content = '', originalSlug } = req.body;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const targetFilename = `${cleanSlug}.md`;
    const targetPath = path.join(CONTENT_DIR, targetFilename);

    // If slug was renamed, remove the old file
    if (originalSlug && originalSlug !== cleanSlug) {
      const oldPath = path.join(CONTENT_DIR, `${originalSlug}.md`);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Build frontmatter data object
    const finalData = {
      title: frontmatter.title || cleanSlug,
      subtitle: frontmatter.subtitle || '',
      navTitle: frontmatter.navTitle || frontmatter.title || cleanSlug,
      order: typeof frontmatter.order === 'number' ? frontmatter.order : 99,
      slug: cleanSlug,
      coverImage: frontmatter.coverImage || '',
      metaDescription: frontmatter.metaDescription || '',
      ...frontmatter,
    };

    // Serialize with gray-matter
    const outputMarkdown = matter.stringify(content, finalData);
    fs.writeFileSync(targetPath, outputMarkdown, 'utf-8');

    const stats = fs.statSync(targetPath);

    res.json({
      success: true,
      page: {
        slug: cleanSlug,
        filename: targetFilename,
        frontmatter: finalData,
        content,
        rawMarkdown: outputMarkdown,
        lastModified: stats.mtime.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error saving page:', error);
    res.status(500).json({ error: 'Failed to save page', details: error.message });
  }
});

// DELETE /api/content/pages/:slug - Delete a Markdown page
app.delete('/api/content/pages/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    const targetFilename = `${slug}.md`;
    const targetPath = path.join(CONTENT_DIR, targetFilename);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return res.json({ success: true, message: `Page '${slug}' deleted` });
    }

    // Check if any other file matches frontmatter slug
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
    const matched = files.find((f) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8');
      const parsed = matter(raw);
      return parsed.data.slug === slug;
    });

    if (matched) {
      fs.unlinkSync(path.join(CONTENT_DIR, matched));
      return res.json({ success: true, message: `Page '${slug}' deleted` });
    }

    return res.status(404).json({ error: `Page '${slug}' does not exist` });
  } catch (error: any) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page', details: error.message });
  }
});

// POST /api/upload - Drag-and-drop Image/Video Upload
app.post('/api/upload', upload.any() as any, (req, res) => {
  try {
    const uploadedFile = (req.files && Array.isArray(req.files) && req.files.length > 0)
      ? req.files[0]
      : (req as any).file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No media file uploaded' });
    }

    const publicUrl = `/uploads/${uploadedFile.filename}`;
    res.json({
      success: true,
      url: publicUrl,
      filename: uploadedFile.filename,
      size: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload media', details: error.message });
  }
});

// GET /api/uploads - List all uploaded images
app.get('/api/uploads', (req, res) => {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(UPLOADS_DIR);
    const images = files.map((filename) => {
      const filePath = path.join(UPLOADS_DIR, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        uploadedAt: stats.mtime.toISOString(),
      };
    });

    // Sort newest first
    images.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    res.json({ images });
  } catch (error: any) {
    console.error('Error listing images:', error);
    res.status(500).json({ error: 'Failed to list images', details: error.message });
  }
});

// DELETE /api/uploads/:filename - Delete uploaded image
app.delete('/api/uploads/:filename', (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(UPLOADS_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: 'Image deleted successfully' });
    }

    res.status(404).json({ error: 'Image not found' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image', details: error.message });
  }
});

// Configure Gallery Multer for uploading directly to /public/gallery
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(GALLERY_DIR)) {
      fs.mkdirSync(GALLERY_DIR, { recursive: true });
    }
    cb(null, GALLERY_DIR);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, cleanName);
  },
});

const uploadGallery = multer({
  storage: galleryStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.originalname.match(/\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|webp|gif|svg)$/i)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  },
});

// GET /api/gallery - List all image/media files from /public/gallery
app.get('/api/gallery', (req, res) => {
  try {
    if (!fs.existsSync(GALLERY_DIR)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(GALLERY_DIR).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov'].includes(ext);
    });

    const images = files.map((filename) => {
      const filePath = path.join(GALLERY_DIR, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        url: `/gallery/${filename}`,
        size: stats.size,
        modifiedAt: stats.mtime.toISOString(),
      };
    });

    res.json({ images });
  } catch (error: any) {
    console.error('Error listing gallery images:', error);
    res.status(500).json({ error: 'Failed to list gallery images', details: error.message });
  }
});

// POST /api/gallery/upload - Batch upload images/media to /public/gallery
app.post('/api/gallery/upload', uploadGallery.any() as any, (req, res) => {
  try {
    const files = (req.files && Array.isArray(req.files) ? req.files : req.file ? [req.file] : []) as Express.Multer.File[];
    const uploaded = files.map((f) => ({
      filename: f.filename,
      url: `/gallery/${f.filename}`,
      size: f.size,
    }));
    res.json({ success: true, count: uploaded.length, files: uploaded });
  } catch (error: any) {
    console.error('Gallery upload error:', error);
    res.status(500).json({ error: 'Failed to upload gallery images', details: error.message });
  }
});

// DELETE /api/gallery/:filename - Delete a gallery image
app.delete('/api/gallery/:filename', (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(GALLERY_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: 'Gallery image deleted successfully' });
    }

    res.status(404).json({ error: 'Image not found' });
  } catch (error: any) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Failed to delete gallery image', details: error.message });
  }
});

// =========================================================================
// VITE INTEGRATION
// =========================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Flame CMS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
