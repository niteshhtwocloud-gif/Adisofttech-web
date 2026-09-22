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
  Code,
  FileCode2,
  Sparkles,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const formatToHtml = (raw: string) => {
  if (!raw) return "";
  // If already contains HTML tags, use as is
  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw;
  }
  // Convert standard markdown patterns into visual HTML
  return raw
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\n\n/g, "<p><br></p>")
    .replace(/\n/g, "<br/>");
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content here... Select text and click formatting buttons to apply styles.",
  minHeight = "320px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  // Sync incoming value to contentEditable div if changed externally
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      const formattedHtml = formatToHtml(value || "");
      if (editorRef.current.innerHTML !== formattedHtml && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = formattedHtml;
      }
    }
  }, [value, isSourceMode]);

  // Execute formatting command while preserving cursor selection
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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden focus-within:border-[#0b57d0] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
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
            onMouseUp={checkActiveFormats}
            onBlur={updateContent}
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
              [&_a]:text-blue-600 [&_a]:underline [&_a]:font-semibold"
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
    </div>
  );
}
