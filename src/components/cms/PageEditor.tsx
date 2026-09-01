import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Save,
  Trash2,
  Eye,
  Edit3,
  Columns,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link,
  Code,
  Table,
  UploadCloud,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { CMSPage, PageFrontmatter } from '../../types/cms';
import { savePage, deletePage } from '../../services/cmsService';
import { uploadImageToStorage } from '../../lib/firebase';
import { ImageManagerModal } from './ImageManagerModal';

interface PageEditorProps {
  page: CMSPage;
  onSaveSuccess: (updatedPage: CMSPage) => void;
  onDeleteSuccess: (deletedSlug: string) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  page,
  onSaveSuccess,
  onDeleteSuccess,
}) => {
  const [frontmatter, setFrontmatter] = useState<PageFrontmatter>(page.frontmatter);
  const [content, setContent] = useState<string>(page.content);
  const [slug, setSlug] = useState<string>(page.slug);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [isSaving, setIsSaving] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDraggingOverEditor, setIsDraggingOverEditor] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state when incoming page changes
  useEffect(() => {
    setFrontmatter(page.frontmatter);
    setContent(page.content);
    setSlug(page.slug);
    setSaveStatus('idle');
  }, [page]);

  // Insert markdown snippet at cursor position
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = before + selected + after;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  // Handle direct file drag & drop onto the markdown editor
  const handleEditorDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverEditor(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        try {
          const result = await uploadImageToStorage(file);
          const alt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          insertTextAtCursor(`\n\n![${alt}](${result.url})\n\n`);
        } catch (err: any) {
          alert('Failed to upload image: ' + err.message);
        }
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage(null);

    try {
      const saved = await savePage({
        slug,
        originalSlug: page.slug,
        frontmatter: {
          ...frontmatter,
          slug,
        },
        content,
      });

      setSaveStatus('saved');
      onSaveSuccess(saved);
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error saving page:', err);
      setSaveStatus('error');
      setErrorMessage(err.message || 'Failed to save page');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (slug === 'home') {
      alert('The home page cannot be deleted as it serves as the root index.');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete "${frontmatter.title || slug}" (${slug}.md)?`)) {
      try {
        await deletePage(page.slug);
        onDeleteSuccess(page.slug);
      } catch (err: any) {
        alert('Failed to delete page: ' + err.message);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d1117] text-[#f5f1ea] overflow-hidden font-['Raleway']">
      
      {/* Editor Top Bar */}
      <div className="px-6 py-4 border-b border-[#212836] bg-[#131822] flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#d4a359]/15 border border-[#d4a359]/40 text-[#d4a359] flex items-center justify-center font-mono font-bold text-xs">
            .md
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                {frontmatter.title || 'Untitled Page'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#202836] text-gray-300 font-mono text-[10px] border border-white/10">
                /{slug}.md
              </span>
            </div>
            <span className="text-[10px] text-gray-400">
              Order: #{frontmatter.order ?? 99} • Nav Title: &ldquo;{frontmatter.navTitle || frontmatter.title}&rdquo;
            </span>
          </div>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex items-center space-x-2">
          
          {/* View Modes */}
          <div className="flex items-center p-1 rounded-xl bg-black/50 border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                viewMode === 'edit' ? 'bg-[#d4a359] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Edit3 size={13} />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex px-3 py-1.5 rounded-lg font-medium transition-all items-center space-x-1 cursor-pointer ${
                viewMode === 'split' ? 'bg-[#d4a359] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Columns size={13} />
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                viewMode === 'preview' ? 'bg-[#d4a359] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye size={13} />
              <span>Preview</span>
            </button>
          </div>

          {/* Media Manager Trigger */}
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="px-3 py-2 rounded-xl bg-[#1b222f] hover:bg-[#253042] text-gray-200 hover:text-white border border-[#2e3b50] text-xs font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <ImageIcon size={14} className="text-[#d4a359]" />
            <span>Images</span>
          </button>

          {/* Delete Page */}
          {slug !== 'home' && (
            <button
              onClick={handleDelete}
              title="Delete Page"
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 border border-red-500/30 transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg ${
              saveStatus === 'saved'
                ? 'bg-emerald-500 text-black'
                : 'bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 text-black'
            }`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : saveStatus === 'saved' ? (
              <>
                <Check size={14} />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save Changes</span>
              </>
            )}
          </button>

        </div>

      </div>

      {errorMessage && (
        <div className="px-6 py-2 bg-red-950 border-b border-red-500/50 text-red-200 text-xs flex items-center space-x-2">
          <AlertCircle size={14} className="text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Metadata Frontmatter Bar (Collapsible / Compact) */}
      <div className="px-6 py-3.5 bg-[#10141c] border-b border-[#1f2533] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
            Page Title (H1)
          </label>
          <input
            type="text"
            value={frontmatter.title}
            onChange={(e) => setFrontmatter({ ...frontmatter, title: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white focus:border-[#d4a359] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
            Navigation Label
          </label>
          <input
            type="text"
            value={frontmatter.navTitle || ''}
            onChange={(e) => setFrontmatter({ ...frontmatter, navTitle: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white focus:border-[#d4a359] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
            URL Slug (.md)
          </label>
          <input
            type="text"
            value={slug}
            disabled={page.slug === 'home'}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
            className="w-full px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white font-mono focus:border-[#d4a359] focus:outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
            Display Order
          </label>
          <input
            type="number"
            value={frontmatter.order ?? 99}
            onChange={(e) => setFrontmatter({ ...frontmatter, order: parseInt(e.target.value, 10) || 99 })}
            className="w-full px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white font-mono focus:border-[#d4a359] focus:outline-none"
          />
        </div>
      </div>

      {/* Subtitle & Cover Image Bar */}
      <div className="px-6 py-2.5 bg-[#0f131a] border-b border-[#1f2533] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5">
            Subtitle / Short Description
          </label>
          <input
            type="text"
            value={frontmatter.subtitle || ''}
            onChange={(e) => setFrontmatter({ ...frontmatter, subtitle: e.target.value })}
            placeholder="e.g. Saffron Traditions & Live Cabaret"
            className="w-full px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white focus:border-[#d4a359] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5">
            Hero Cover Image URL
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={frontmatter.coverImage || ''}
              onChange={(e) => setFrontmatter({ ...frontmatter, coverImage: e.target.value })}
              placeholder="https://... or /uploads/..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#181e28] border border-[#2b3648] text-white font-mono text-[11px] focus:border-[#d4a359] focus:outline-none"
            />
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-[#202836] hover:bg-[#2c374a] text-gray-300 text-[11px] border border-white/10"
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="px-6 py-2 bg-[#141922] border-b border-[#212836] flex flex-wrap items-center gap-1 text-xs">
        <button
          onClick={() => insertTextAtCursor('**', '**')}
          title="Bold (**text**)"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Bold size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('*', '*')}
          title="Italic (*text*)"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Italic size={14} />
        </button>
        <div className="w-[1px] h-4 bg-[#2b3546] mx-1" />
        <button
          onClick={() => insertTextAtCursor('\n# ', '\n')}
          title="Heading 1"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Heading1 size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('\n## ', '\n')}
          title="Heading 2"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Heading2 size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('\n### ', '\n')}
          title="Heading 3"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Heading3 size={14} />
        </button>
        <div className="w-[1px] h-4 bg-[#2b3546] mx-1" />
        <button
          onClick={() => insertTextAtCursor('\n> ', '\n')}
          title="Quote"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Quote size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('\n* ', '')}
          title="Bullet list"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <List size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('\n1. ', '')}
          title="Numbered list"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <ListOrdered size={14} />
        </button>
        <div className="w-[1px] h-4 bg-[#2b3546] mx-1" />
        <button
          onClick={() => insertTextAtCursor('[Link Text](https://example.com)', '')}
          title="Link"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Link size={14} />
        </button>
        <button
          onClick={() => insertTextAtCursor('`', '`')}
          title="Inline Code"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Code size={14} />
        </button>
        <button
          onClick={() =>
            insertTextAtCursor(
              '\n| Item | Description | Price |\n| :--- | :--- | :--- |\n| Koobideh Kabab | Twin ground Angus skewers | $26.95 |\n| Soltani Feast | Barg + Koobideh platter | $36.95 |\n\n'
            )
          }
          title="Insert Table"
          className="p-1.5 rounded-md hover:bg-[#222b3a] text-gray-300 hover:text-white"
        >
          <Table size={14} />
        </button>
        <button
          onClick={() => setIsImageManagerOpen(true)}
          title="Upload or Insert Image"
          className="px-2 py-1 rounded-md bg-[#232c3c] hover:bg-[#2f3b50] text-[#f3cf8a] text-[11px] font-bold flex items-center space-x-1 ml-auto"
        >
          <UploadCloud size={13} />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Main Workspace (Editor / Split / Preview) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Markdown Source Editor */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOverEditor(true);
            }}
            onDragLeave={() => setIsDraggingOverEditor(false)}
            onDrop={handleEditorDrop}
            className={`flex-1 flex flex-col relative h-full bg-[#0a0d12] border-r border-[#1e2533] transition-colors ${
              isDraggingOverEditor ? 'bg-amber-950/20 ring-2 ring-[#d4a359]' : ''
            }`}
          >
            {isDraggingOverEditor && (
              <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <div className="p-4 rounded-2xl bg-[#1d2430] border border-[#d4a359] text-center space-y-2">
                  <UploadCloud size={32} className="mx-auto text-[#f3cf8a] animate-bounce" />
                  <p className="text-xs font-bold text-white">Drop image to upload &amp; insert at cursor</p>
                </div>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your page markdown content here... (Headings, lists, images, tables, quotes)"
              className="w-full h-full p-6 bg-transparent text-gray-200 font-mono text-sm leading-relaxed resize-none focus:outline-none selection:bg-[#d4a359]/30"
              spellCheck={false}
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 h-full overflow-y-auto bg-[#0b0e14] p-6 sm:p-10 space-y-6">
            
            {/* Live Hero Header Simulation */}
            {frontmatter.coverImage && (
              <div className="relative rounded-3xl overflow-hidden h-48 sm:h-64 border border-[#2b3548] shadow-2xl">
                <img
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4a359]">
                    Live Page Hero Preview
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {frontmatter.title}
                  </h1>
                  {frontmatter.subtitle && (
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 font-light">
                      {frontmatter.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Markdown Rendered Output */}
            <div className="prose prose-invert max-w-none space-y-4 text-gray-200 leading-relaxed text-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white border-b border-[#2b3548] pb-3 mb-4 mt-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f3cf8a] border-b border-white/10 pb-2 mb-3 mt-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif text-lg font-bold text-white mb-2 mt-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children, node }) => {
                    const hasBlockChild =
                      node?.children?.some(
                        (child: any) =>
                          child.tagName === 'img' ||
                          child.tagName === 'figure' ||
                          child.tagName === 'div' ||
                          child.type === 'image' ||
                          (child.type === 'element' && child.tagName === 'img')
                      ) || false;

                    if (hasBlockChild) {
                      return <div className="mb-3 leading-relaxed">{children}</div>;
                    }
                    return <p className="mb-3 leading-relaxed">{children}</p>;
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#d4a359] bg-[#161d28]/80 p-4 rounded-r-2xl italic text-gray-300 my-4 shadow-sm">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 rounded-2xl border border-[#2b3548] bg-[#121720]">
                      <table className="w-full text-left text-xs border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2.5 bg-[#1a222e] border-b border-[#2b3548] font-bold text-[#f3cf8a] uppercase tracking-wider text-[11px]">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2.5 border-b border-[#1f2735] text-gray-300">
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <div className="my-6 rounded-2xl overflow-hidden border border-[#2b3548] shadow-lg">
                      <img src={src} alt={alt || ''} className="w-full object-cover max-h-96" />
                      {alt && (
                        <div className="px-3 py-1.5 bg-[#121720] text-[10px] text-gray-400 font-mono text-center">
                          {alt}
                        </div>
                      )}
                    </div>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f3cf8a] underline underline-offset-2 hover:text-white"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

          </div>
        )}

      </div>

      {/* Image Manager Modal */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        onInsertImage={(snippet) => insertTextAtCursor(`\n\n${snippet}\n\n`)}
      />

    </div>
  );
};
