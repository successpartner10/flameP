import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Plus,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { UploadedImage } from '../../types/cms';
import { fetchUploadedImages, deleteUploadedImage } from '../../services/cmsService';
import { uploadImageToStorage } from '../../lib/firebase';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage?: (markdownSnippet: string) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  onInsertImage,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadImages();
    }
  }, [isOpen]);

  const loadImages = async () => {
    const list = await fetchUploadedImages();
    setImages(list);
  };

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    setStatusMessage(null);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      try {
        await uploadImageToStorage(file);
        successCount++;
      } catch (err: any) {
        console.error('Failed to upload image:', err);
      }
    }

    await loadImages();
    setIsUploading(false);
    setStatusMessage(`Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm(`Are you sure you want to delete "${filename}"?`)) return;
    const ok = await deleteUploadedImage(filename);
    if (ok) {
      setImages((prev) => prev.filter((img) => img.filename !== filename));
    }
  };

  const handleInsert = (img: UploadedImage) => {
    const alt = img.filename.replace(/^[0-9]+-/, '').replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const snippet = `![${alt}](${img.url})`;
    if (onInsertImage) {
      onInsertImage(snippet);
      onClose();
    } else {
      handleCopy(snippet, img.url);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Raleway']">
      <div className="relative w-full max-w-4xl bg-[#11151c] border-2 border-[#d4a359]/60 text-[#f5f1ea] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#232b38] flex items-center justify-between bg-[#171d26]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
              <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center text-[#f3cf8a]">
                <ImageIcon size={18} />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a359] font-bold block">
                CMS Asset Library
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-bold">
                Image &amp; Media Manager
              </h3>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={loadImages}
              title="Refresh images"
              className="p-2 rounded-xl bg-black/40 hover:bg-[#222c3b] text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/40 hover:bg-[#222c3b] text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-[#f3cf8a] bg-[#d4a359]/15 scale-[1.01]'
                : 'border-[#323d4e] hover:border-[#d4a359]/70 bg-[#161c24]/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
              }}
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9e1c38]/40 to-[#d4a359]/40 border border-[#d4a359]/50 text-[#f3cf8a] flex items-center justify-center mx-auto shadow-inner">
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-[#d4a359] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload size={24} />
                )}
              </div>

              <div>
                <h4 className="font-serif text-base text-white font-bold">
                  {isUploading ? 'Uploading images...' : 'Drag & Drop Images Here'}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  or click to select from your device (PNG, JPG, WEBP, GIF, SVG)
                </p>
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-black/50 text-[10px] uppercase font-mono text-[#d4a359] border border-[#d4a359]/30">
                Saves to /public/uploads &amp; returns instant public URLs
              </span>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
              <Sparkles size={16} />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Uploaded Images Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4a359]">
                Uploaded Images ({images.length})
              </span>
              <span className="text-[11px] text-gray-400">
                Click any image to copy Markdown snippet or insert
              </span>
            </div>

            {images.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-[#141922] border border-[#242c38] text-gray-400 space-y-2">
                <ImageIcon size={32} className="mx-auto text-gray-600" />
                <p className="text-xs">No uploaded images yet. Drag and drop your photos above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img) => {
                  const alt = img.filename.replace(/^[0-9]+-/, '').replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                  const markdownSnippet = `![${alt}](${img.url})`;
                  const isCopied = copiedUrl === img.url;

                  return (
                    <div
                      key={img.filename}
                      className="group relative rounded-2xl overflow-hidden bg-[#161c24] border border-[#283242] hover:border-[#d4a359] transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Thumbnail Preview */}
                      <div className="relative h-36 bg-black/60 overflow-hidden">
                        <img
                          src={img.url}
                          alt={alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-gray-300 backdrop-blur-sm">
                          {formatFileSize(img.size)}
                        </span>
                      </div>

                      {/* Info & Action Controls */}
                      <div className="p-3.5 space-y-2.5">
                        <div className="text-xs font-mono text-gray-200 truncate" title={img.filename}>
                          {img.filename}
                        </div>

                        <div className="text-[10px] font-mono text-gray-400 truncate bg-black/40 px-2 py-1 rounded-md border border-white/5" title={img.url}>
                          {img.url}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {onInsertImage && (
                            <button
                              onClick={() => handleInsert(img)}
                              className="flex-1 py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b3833b] hover:brightness-110 text-black font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer"
                            >
                              <Plus size={12} />
                              <span>Insert</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleCopy(img.url, img.url)}
                            title="Copy Public URL"
                            className="p-1.5 rounded-xl bg-[#202836] hover:bg-[#2d384c] text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                          >
                            {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>

                          <button
                            onClick={() => handleCopy(markdownSnippet, img.url + '_md')}
                            title="Copy Markdown ![Alt](url)"
                            className="px-2 py-1.5 rounded-xl bg-[#202836] hover:bg-[#2d384c] text-[10px] font-mono text-[#f3cf8a] transition-colors cursor-pointer border border-white/10"
                          >
                            {copiedUrl === img.url + '_md' ? '✓ Copied' : 'MD'}
                          </button>

                          <button
                            onClick={() => handleDelete(img.filename)}
                            title="Delete Image"
                            className="p-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 transition-colors cursor-pointer border border-red-500/30 ml-auto"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
