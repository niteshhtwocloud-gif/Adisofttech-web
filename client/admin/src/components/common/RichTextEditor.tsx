"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  RemoveFormatting,
  FileCode2,
  Image as ImageIcon,
  Video,
  UploadCloud,
  X,
  Loader2,
  Check,
  Play,
  Film,
  Globe,
  Sparkles,
} from "lucide-react";
import adminApi from "@/services/api";
import { getAdminImageUrl } from "@/utils/image";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

// Convert markdown-like syntax to basic HTML
const formatToHtml = (raw: string) => {
  if (!raw) return "";
  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw;
  }
  return raw
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\n\n/g, "<p><br></p>")
    .replace(/\n/g, "<br/>");
};

// Extracts YouTube video ID
export const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

// Extracts Vimeo video ID
export const extractVimeoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+))/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content here... Select text and click formatting buttons to apply styles.",
  minHeight = "320px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSourceMode, setIsSourceMode] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  // Direct paste/drop upload state
  const [isDirectUploading, setIsDirectUploading] = useState(false);

  // Modals state
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Image Modal Form State
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  // Video Modal Form State
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");

  // Sync incoming value to contentEditable div
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      const formattedHtml = formatToHtml(value || "");
      if (editorRef.current.innerHTML !== formattedHtml && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = formattedHtml;
      }
    }
  }, [value, isSourceMode]);

  // Saves current selection so inserting modals don't lose the cursor position
  const saveSelection = () => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  // Restores selection and inserts HTML fragment at caret
  const insertHtmlAtCursor = (html: string) => {
    if (isSourceMode) {
      onChange((value || "") + "\n" + html + "\n");
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
    }

    const sel = window.getSelection();
    if (savedSelectionRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node: ChildNode | null;
      let lastNode: ChildNode | null = null;
      while ((node = tempDiv.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (editorRef.current) {
      editorRef.current.innerHTML += html;
    }

    updateContent();
    savedSelectionRef.current = null;
  };

  // Execute standard formatting commands
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (isSourceMode) return;

    if (editorRef.current) {
      editorRef.current.focus();
    }

    if (command === "createLink") {
      const url = prompt("Enter hyperlink URL (e.g. https://adisofttech.com):", "https://");
      if (url && url !== "https://") {
        document.execCommand(command, false, url);
      }
    } else if (command === "formatBlock") {
      document.execCommand("formatBlock", false, arg);
    } else {
      document.execCommand(command, false, arg);
    }

    updateContent();
    checkActiveFormats();
  };

  // Detect current active styles under cursor
  const checkActiveFormats = () => {
    if (typeof document === "undefined" || isSourceMode) return;
    try {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
      });
    } catch {
      // queryCommandState may throw in certain edge cases
    }
  };

  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  // Handle direct file upload (from paste, drop, or modal)
  const uploadAndInsertFile = async (file: File, customAlt = "") => {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image size must be less than 10MB.");
    }

    const res = await adminApi.uploadImage(file);
    const finalUrl = res.url || getAdminImageUrl(res.path);
    const altText = customAlt.trim() || file.name.replace(/\.[^/.]+$/, "");

    const htmlToInsert = `<img src="${finalUrl}" alt="${altText}" style="max-width: 100%; height: auto; border-radius: 14px; margin: 20px auto; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.08);" /><p><br></p>`;
    insertHtmlAtCursor(htmlToInsert);
  };

  // Clipboard Paste Handler (e.g. Ctrl+V screenshot directly into editor)
  const handlePaste = async (e: React.ClipboardEvent) => {
    const files = e.clipboardData?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        saveSelection();
        setIsDirectUploading(true);
        try {
          await uploadAndInsertFile(file);
        } catch (err: any) {
          alert(err.message || "Failed to upload pasted image.");
        } finally {
          setIsDirectUploading(false);
        }
      }
    }
  };

  // Drag & Drop Handler (e.g. Drag image file directly into editor)
  const handleDrop = async (e: React.DragEvent) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        saveSelection();
        setIsDirectUploading(true);
        try {
          await uploadAndInsertFile(file);
        } catch (err: any) {
          alert(err.message || "Failed to upload dropped image.");
        } finally {
          setIsDirectUploading(false);
        }
      }
    }
  };

  // Handle Image Modal Submit
  const handleInsertImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageError("");

    if (imageTab === "upload") {
      if (!selectedImageFile) {
        setImageError("Please choose an image file from your computer.");
        return;
      }
      setIsUploadingImage(true);
      try {
        await uploadAndInsertFile(selectedImageFile, imageAlt);
        closeImageModal();
      } catch (err: any) {
        setImageError(err.message || "Failed to upload image.");
      } finally {
        setIsUploadingImage(false);
      }
    } else {
      if (!imageUrl.trim()) {
        setImageError("Please enter a valid image web URL.");
        return;
      }
      const altText = imageAlt.trim() || "Article illustration";
      const htmlToInsert = `<img src="${imageUrl.trim()}" alt="${altText}" style="max-width: 100%; height: auto; border-radius: 14px; margin: 20px auto; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.08);" /><p><br></p>`;
      insertHtmlAtCursor(htmlToInsert);
      closeImageModal();
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    setSelectedImageFile(null);
    setImagePreview("");
    setImageError("");
  };

  // Handle Video Modal Submit
  const handleInsertVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoError("");

    const url = videoUrl.trim();
    if (!url) {
      setVideoError("Please enter a video URL (YouTube, Vimeo, or direct MP4 link).");
      return;
    }

    const ytId = extractYoutubeId(url);
    const vimeoId = extractVimeoId(url);

    let htmlToInsert = "";

    if (ytId) {
      htmlToInsert = `
        <div class="ast-video-container" style="position: relative; width: 100%; aspect-ratio: 16/9; margin: 24px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); background: #000;">
          <iframe
            src="https://www.youtube.com/embed/${ytId}"
            title="YouTube video player"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p><br></p>
      `;
    } else if (vimeoId) {
      htmlToInsert = `
        <div class="ast-video-container" style="position: relative; width: 100%; aspect-ratio: 16/9; margin: 24px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); background: #000;">
          <iframe
            src="https://player.vimeo.com/video/${vimeoId}"
            title="Vimeo video player"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p><br></p>
      `;
    } else if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
      htmlToInsert = `
        <div class="ast-video-container" style="margin: 24px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); background: #000;">
          <video src="${url}" controls style="width: 100%; border-radius: 16px; display: block;" preload="metadata"></video>
        </div>
        <p><br></p>
      `;
    } else {
      // Fallback: Embed as an iframe or generic video container
      htmlToInsert = `
        <div class="ast-video-container" style="position: relative; width: 100%; aspect-ratio: 16/9; margin: 24px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); background: #000;">
          <iframe src="${url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
        </div>
        <p><br></p>
      `;
    }

    insertHtmlAtCursor(htmlToInsert);
    setShowVideoModal(false);
    setVideoUrl("");
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden focus-within:border-[#0b57d0] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
      {/* Direct Uploading Floating Notification */}
      {isDirectUploading && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 rounded-full bg-[#0b57d0] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 animate-pulse">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Uploading Image...</span>
        </div>
      )}

      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/80 p-2 sm:px-3">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("bold");
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeFormats.bold
                ? "bg-[#0b57d0] text-white shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0]"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-3.5 w-3.5" />
            <span className="text-[11px]">Bold</span>
          </button>

          {/* Italic */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("italic");
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeFormats.italic
                ? "bg-[#0b57d0] text-white shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0]"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3.5 w-3.5" />
            <span className="text-[11px]">Italic</span>
          </button>

          {/* Underline */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("underline");
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeFormats.underline
                ? "bg-[#0b57d0] text-white shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0]"
            }`}
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* Heading 1 */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("formatBlock", "<h1>");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0] cursor-pointer"
            title="Large Heading (H1)"
          >
            <Heading1 className="h-3.5 w-3.5" />
            <span>H1</span>
          </button>

          {/* Heading 2 */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("formatBlock", "<h2>");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0] cursor-pointer"
            title="Subheading (H2)"
          >
            <Heading2 className="h-3.5 w-3.5" />
            <span>H2</span>
          </button>

          {/* Heading 3 */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("formatBlock", "<h3>");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0] cursor-pointer"
            title="Section Heading (H3)"
          >
            <Heading3 className="h-3.5 w-3.5" />
            <span>H3</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* Bullet List */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("insertUnorderedList");
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeFormats.insertUnorderedList
                ? "bg-[#0b57d0] text-white shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0]"
            }`}
            title="Bullet List"
          >
            <List className="h-3.5 w-3.5" />
            <span className="text-[11px] hidden sm:inline">Bullets</span>
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("insertOrderedList");
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeFormats.insertOrderedList
                ? "bg-[#0b57d0] text-white shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0]"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          {/* Quote */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("formatBlock", "<blockquote>");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0] cursor-pointer"
            title="Quote Block"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          {/* Link */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("createLink");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0b57d0] cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* ==================== NEW: INSERT IMAGE (FILE UPLOAD OR URL) ==================== */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              setShowImageModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-2.5 py-1.5 text-xs font-bold text-[#0b57d0] hover:bg-[#0b57d0] hover:text-white transition-all cursor-pointer shadow-2xs"
            title="Add Image (File Upload or URL)"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span className="text-[11px]">Image</span>
          </button>

          {/* ==================== NEW: INSERT VIDEO (YOUTUBE / VIMEO / MP4) ==================== */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              setShowVideoModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/70 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-600 hover:text-white transition-all cursor-pointer shadow-2xs"
            title="Add Video Link (YouTube, Vimeo, MP4)"
          >
            <Video className="h-3.5 w-3.5" />
            <span className="text-[11px]">Video</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* Clear Format */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("removeFormat");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Source / Visual Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsSourceMode(!isSourceMode)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
            isSourceMode
              ? "bg-slate-900 text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          }`}
          title="Toggle HTML Source Mode"
        >
          <FileCode2 className="h-3.5 w-3.5" />
          <span>{isSourceMode ? "Visual Editor" : "HTML Source"}</span>
        </button>
      </div>

      {/* Visual Editor (True WYSIWYG ContentEditable) */}
      {!isSourceMode ? (
        <div className="relative">
          {(!value || value.trim() === "" || value === "<br>" || value === "<p><br></p>") && (
            <div className="pointer-events-none absolute top-5 left-5 text-sm text-slate-400 select-none">
              {placeholder}
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            onInput={updateContent}
            onKeyUp={() => {
              updateContent();
              checkActiveFormats();
            }}
            onMouseUp={() => {
              checkActiveFormats();
              saveSelection();
            }}
            onBlur={() => {
              updateContent();
              saveSelection();
            }}
            onPaste={handlePaste}
            onDrop={handleDrop}
            style={{ minHeight }}
            className="p-5 text-sm text-slate-800 outline-none leading-relaxed font-sans
              [&_b]:font-bold [&_strong]:font-bold
              [&_i]:italic [&_em]:italic
              [&_u]:underline
              [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-[#0f172a] [&_h1]:my-3 [&_h1]:leading-tight
              [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[#0f172a] [&_h2]:my-2.5 [&_h2]:leading-snug
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#0f172a] [&_h3]:my-2
              [&_p]:my-2.5 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul_li]:my-1
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol_li]:my-1
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/40 [&_blockquote]:py-2 [&_blockquote]:px-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:my-3
              [&_a]:text-blue-600 [&_a]:underline [&_a]:font-semibold
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-4 [&_img]:shadow-sm
              [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl [&_iframe]:my-4 [&_iframe]:shadow-sm
              [&_video]:w-full [&_video]:rounded-xl [&_video]:my-4 [&_video]:shadow-sm"
          />
        </div>
      ) : (
        /* Raw HTML Source Area for developers */
        <textarea
          rows={14}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Raw HTML content..."
          style={{ minHeight }}
          className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-50/50 outline-none leading-relaxed border-none resize-y"
        />
      )}

      {/* ============================== MODAL 1: INSERT IMAGE ============================== */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#0b57d0]">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0f172a]">Article Image Add Karein</h3>
              </div>
              <button
                type="button"
                onClick={closeImageModal}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  imageTab === "upload" ? "bg-white text-[#0b57d0] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UploadCloud className="h-3.5 w-3.5" />
                <span>Computer se Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  imageTab === "url" ? "bg-white text-[#0b57d0] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Image Web URL</span>
              </button>
            </div>

            {imageError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 font-medium">
                {imageError}
              </div>
            )}

            <form onSubmit={handleInsertImageSubmit} className="space-y-4">
              {imageTab === "upload" ? (
                /* Tab 1: File Upload */
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setSelectedImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  {imagePreview ? (
                    <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2 text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-xl object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImageFile(null);
                          setImagePreview("");
                        }}
                        className="absolute top-3 right-3 rounded-full bg-slate-900/70 p-1 text-white hover:bg-black"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-blue-50/30 transition cursor-pointer"
                    >
                      <UploadCloud className="h-8 w-8 text-[#0b57d0] mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">Click to choose image file</p>
                      <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, WEBP, GIF, SVG (Max 10MB)</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Tab 2: URL */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0b57d0] focus:bg-white"
                    />
                  </div>
                  {imageUrl && (
                    <div className="rounded-xl border border-slate-200 p-1.5 bg-slate-50 text-center">
                      <img
                        src={imageUrl}
                        alt="URL Preview"
                        className="max-h-36 mx-auto rounded-lg object-contain"
                        onError={() => {}}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Alt Text Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image Alt Text / Caption (Optional)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Cloud architecture diagram"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#0b57d0] focus:bg-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeImageModal}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingImage || (imageTab === "upload" && !selectedImageFile) || (imageTab === "url" && !imageUrl)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading to Server...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Insert Image</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================== MODAL 2: INSERT VIDEO ============================== */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Film className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Video Link Add Karein</h3>
                  <p className="text-[11px] text-slate-400">Website par actual video player ki tarah display hoga</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowVideoModal(false);
                  setVideoUrl("");
                  setVideoError("");
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {videoError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 font-medium">
                {videoError}
              </div>
            )}

            <form onSubmit={handleInsertVideoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Video URL (YouTube, Vimeo, ya MP4 Link) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... ya https://youtu.be/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Supported Platforms Notice */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 space-y-1.5 text-[11px] text-slate-500">
                <p className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Play className="h-3 w-3 text-rose-600" />
                  Supported Video Platforms:
                </p>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>YouTube</strong>: Normal video, Shorts, ya youtu.be shortlinks</li>
                  <li><strong>Vimeo</strong>: Vimeo video link (vimeo.com/...)</li>
                  <li><strong>Direct Video</strong>: .mp4, .webm direct file URLs</li>
                </ul>
              </div>

              {/* Live Preview if YouTube ID detected */}
              {extractYoutubeId(videoUrl) && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(videoUrl)}`}
                    title="Preview"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    setVideoUrl("");
                    setVideoError("");
                  }}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!videoUrl.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition disabled:opacity-50 cursor-pointer shadow-md shadow-rose-600/20"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Insert Video Player</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
