import React, { useState, useEffect } from 'react';
import {
  Plus,
  FileText,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Search,
  Trash2,
  FolderOpen,
  ArrowRight,
  X,
  Layers,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { CMSPage, AdminUser } from '../../types/cms';
import { fetchAllPages, savePage, deletePage } from '../../services/cmsService';
import { PageEditor } from './PageEditor';
import { ImageManagerModal } from './ImageManagerModal';
import { signOutUser } from '../../lib/firebase';

interface AdminPanelProps {
  user: AdminUser;
  onCloseAdmin: () => void;
  onSignOut: () => void;
  onViewPageOnSite: (slug: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  user,
  onCloseAdmin,
  onSignOut,
  onViewPageOnSite,
}) => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState<boolean>(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState<boolean>(false);

  // New Page State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newNavTitle, setNewNavTitle] = useState<string>('');
  const [newSlug, setNewSlug] = useState<string>('');
  const [newTemplate, setNewTemplate] = useState<string>('standard');
  const [isCreatingPage, setIsCreatingPage] = useState<boolean>(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    const list = await fetchAllPages();
    setPages(list);
    if (list.length > 0 && !list.some((p) => p.slug === selectedSlug)) {
      setSelectedSlug(list[0].slug);
    }
    setIsLoading(false);
  };

  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    setNewNavTitle(val);
    setNewSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    );
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSlug) return;

    setIsCreatingPage(true);

    let templateContent = `# ${newTitle}\n\nWelcome to the ${newTitle} page.\n\nWrite your content here using markdown.`;
    let templateCover = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80';

    if (newTemplate === 'menu') {
      templateCover = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80';
      templateContent = `# ${newTitle}\n\nOur seasonal chef offerings and royal charbroiled specialties.\n\n## Featured Offerings\n\n| Item | Description | Price |\n| :--- | :--- | :--- |\n| Koobideh Skewer | Prime charbroiled ground beef | $26.95 |\n| Saffron Basmati Rice | Crisp golden Tahdig | $12.00 |\n`;
    } else if (newTemplate === 'event') {
      templateCover = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80';
      templateContent = `# ${newTitle}\n\nLive stage performances, cabaret evenings, and dinner galas.\n\n## Show Details\n* **Schedule**: Friday & Saturday Nights\n* **Doors Open**: 8:00 PM\n* **Tickets**: Reserved Stage Seating\n\n> For table reservations, call (310) 444-0045.\n`;
    }

    try {
      const maxOrder = pages.reduce((max, p) => Math.max(max, p.frontmatter.order || 0), 0);
      const created = await savePage({
        slug: newSlug,
        frontmatter: {
          title: newTitle,
          navTitle: newNavTitle || newTitle,
          subtitle: `Explore ${newTitle} at Flame International`,
          slug: newSlug,
          order: maxOrder + 1,
          coverImage: templateCover,
          metaDescription: `Discover ${newTitle} at Flame International Restaurant in West Los Angeles.`,
        },
        content: templateContent,
      });

      await loadPages();
      setSelectedSlug(created.slug);
      setIsNewPageModalOpen(false);
      setNewTitle('');
      setNewNavTitle('');
      setNewSlug('');
    } catch (err: any) {
      alert('Error creating page: ' + err.message);
    } finally {
      setIsCreatingPage(false);
    }
  };

  const handlePageSaved = (updatedPage: CMSPage) => {
    setPages((prev) =>
      prev.map((p) => (p.slug === updatedPage.slug || p.slug === selectedSlug ? updatedPage : p))
    );
    setSelectedSlug(updatedPage.slug);
  };

  const handlePageDeleted = (deletedSlug: string) => {
    setPages((prev) => prev.filter((p) => p.slug !== deletedSlug));
    setSelectedSlug('home');
  };

  const filteredPages = pages.filter(
    (p) =>
      p.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.frontmatter.navTitle && p.frontmatter.navTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedPage = pages.find((p) => p.slug === selectedSlug);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0d12] text-[#f5f1ea] flex flex-col font-['Raleway'] overflow-hidden animate-in fade-in duration-200">
      
      {/* Global Admin Header */}
      <header className="h-16 px-5 sm:px-8 bg-[#11151c] border-b border-[#212836] flex items-center justify-between z-30 shrink-0">
        
        {/* Brand & Admin Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-[#f3cf8a] font-bold text-xs">
              CMS
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                Flame Markdown CMS
              </h1>
              <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-medium">
                <ShieldCheck size={11} />
                <span>Authenticated Admin</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 hidden sm:block">
              Logged in as: <strong className="text-[#f3cf8a]">{user.email}</strong>
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* New Page Button */}
          <button
            onClick={() => setIsNewPageModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 active:scale-95 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <Plus size={14} />
            <span>New Page</span>
          </button>

          {/* Media Manager Button */}
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1b222e] hover:bg-[#253040] text-gray-200 hover:text-white border border-[#2b3648] text-xs font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <ImageIcon size={14} className="text-[#d4a359]" />
            <span className="hidden sm:inline">Images</span>
          </button>

          {/* Live Site View Button */}
          <button
            onClick={() => {
              if (selectedSlug) onViewPageOnSite(selectedSlug);
              else onCloseAdmin();
            }}
            className="px-3.5 py-2 rounded-xl bg-[#1b222e] hover:bg-[#253040] text-gray-200 hover:text-white border border-[#2b3648] text-xs font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Globe size={14} className="text-[#d4a359]" />
            <span className="hidden sm:inline">View Site</span>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            title="Sign Out of Admin"
            className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 border border-red-500/30 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>

          {/* Close Admin View */}
          <button
            onClick={onCloseAdmin}
            title="Close Admin Panel"
            className="p-2 rounded-xl bg-black/40 hover:bg-[#222b3a] text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

        </div>

      </header>

      {/* Main Admin Workspace (Sidebar + Editor) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar: Detected Pages List */}
        <aside className="w-72 sm:w-80 bg-[#0d1016] border-r border-[#202735] flex flex-col shrink-0">
          
          {/* Sidebar Search & Info */}
          <div className="p-4 border-b border-[#1d2432] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase font-bold tracking-widest text-[#d4a359] text-[10px] flex items-center space-x-1.5">
                <FolderOpen size={12} />
                <span>Pages in /content/ ({pages.length})</span>
              </span>
              <button
                onClick={() => setIsNewPageModalOpen(true)}
                className="text-[10px] text-[#f3cf8a] hover:underline flex items-center space-x-0.5"
              >
                <Plus size={11} />
                <span>Add</span>
              </button>
            </div>

            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search markdown pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#161c26] border border-[#263142] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a359]"
              />
            </div>
          </div>

          {/* Pages List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="p-6 text-center text-xs text-gray-500">
                <div className="w-5 h-5 border-2 border-[#d4a359] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span>Loading pages...</span>
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500">
                No matching pages found.
              </div>
            ) : (
              filteredPages.map((p) => {
                const isSelected = p.slug === selectedSlug;
                return (
                  <div
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`w-full p-3 rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#1e2634] border border-[#d4a359]/60 shadow-md ring-1 ring-[#d4a359]/30'
                        : 'hover:bg-[#141922] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${
                          isSelected
                            ? 'bg-[#d4a359] text-black'
                            : 'bg-[#18202c] text-gray-400 group-hover:text-white'
                        }`}
                      >
                        {p.frontmatter.order ?? '#'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h3 className={`font-serif text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                            {p.frontmatter.navTitle || p.frontmatter.title}
                          </h3>
                          {p.slug === 'home' && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-950 text-[#f3cf8a] text-[8px] font-bold uppercase">
                              Home
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 block truncate">
                          /{p.slug}.md
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isSelected ? 'text-[#d4a359] translate-x-0.5' : 'text-gray-600 group-hover:text-gray-400'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-3 bg-[#0a0d12] border-t border-[#1a202c] text-[10px] font-mono text-gray-400 flex items-center justify-between">
            <span>Storage: /content</span>
            <span className="text-[#d4a359]">Markdown + Frontmatter</span>
          </div>

        </aside>

        {/* Main Content: Active Page Editor */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {selectedPage ? (
            <PageEditor
              key={selectedPage.slug}
              page={selectedPage}
              onSaveSuccess={handlePageSaved}
              onDeleteSuccess={handlePageDeleted}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-500">
              <div>
                <FileText size={48} className="mx-auto mb-3 text-gray-600" />
                <h3 className="font-serif text-lg text-white">Select a page to edit</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Choose any Markdown file from the sidebar or click &ldquo;New Page&rdquo; above.
                </p>
              </div>
            </div>
          )}
        </main>

      </div>

      {/* New Page Creation Modal */}
      {isNewPageModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#12161f] border-2 border-[#d4a359]/60 text-[#f5f1ea] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
            
            <div className="px-6 py-5 border-b border-[#232c3c] flex items-center justify-between bg-[#181f2b]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
                  <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center text-[#f3cf8a]">
                    <Plus size={18} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a359] font-bold block">
                    One-Click Creation
                  </span>
                  <h3 className="font-serif text-lg text-white font-bold">
                    Create New Markdown Page
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsNewPageModalOpen(false)}
                className="p-2 rounded-xl bg-black/40 hover:bg-[#253040] text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="p-6 space-y-5">
              
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#d4a359] block mb-1.5">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wine &amp; Cocktails, Private Banquets, Chef Story"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#19202b] border border-[#2b3749] text-white text-xs focus:border-[#d4a359] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                    Navigation Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wine List"
                    value={newNavTitle}
                    onChange={(e) => setNewNavTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#19202b] border border-[#2b3749] text-white text-xs focus:border-[#d4a359] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                    File Slug (.md) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="wine-cocktails"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#19202b] border border-[#2b3749] text-white font-mono text-xs focus:border-[#d4a359] focus:outline-none"
                  />
                </div>
              </div>

              {/* Template Presets */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                  Starter Template Preset
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setNewTemplate('standard')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newTemplate === 'standard'
                        ? 'bg-[#232c3c] border-[#d4a359] text-white shadow-sm'
                        : 'bg-[#151b24] border-[#252f3e] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <FileText size={18} className="mx-auto mb-1 text-[#d4a359]" />
                    <span className="text-[11px] font-bold block">Editorial</span>
                    <span className="text-[9px] text-gray-400">Story &amp; text</span>
                  </div>

                  <div
                    onClick={() => setNewTemplate('menu')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newTemplate === 'menu'
                        ? 'bg-[#232c3c] border-[#d4a359] text-white shadow-sm'
                        : 'bg-[#151b24] border-[#252f3e] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Layers size={18} className="mx-auto mb-1 text-[#d4a359]" />
                    <span className="text-[11px] font-bold block">Menu / Food</span>
                    <span className="text-[9px] text-gray-400">Pricing tables</span>
                  </div>

                  <div
                    onClick={() => setNewTemplate('event')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newTemplate === 'event'
                        ? 'bg-[#232c3c] border-[#d4a359] text-white shadow-sm'
                        : 'bg-[#151b24] border-[#252f3e] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Sparkles size={18} className="mx-auto mb-1 text-[#d4a359]" />
                    <span className="text-[11px] font-bold block">Live Event</span>
                    <span className="text-[9px] text-gray-400">Concerts &amp; shows</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewPageModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1e2634] hover:bg-[#293447] text-gray-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingPage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isCreatingPage ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Create Page (.md)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Image Manager Modal */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
      />

    </div>
  );
};
