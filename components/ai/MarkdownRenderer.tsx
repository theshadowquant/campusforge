'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple code block copy handler
  const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <button
        onClick={handleCopy}
        className="btn btn-ghost btn-sm text-xs flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
        style={{ padding: '0.25rem 0.5rem', height: 'auto' }}
        title="Copy code"
      >
        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    );
  };

  // Render markdown lines into formatted React elements
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBlockBuffer: string[] = [];

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          const codeString = codeBlockBuffer.join('\n');
          elements.push(
            <div
              key={`code-${index}`}
              className="my-3 rounded-lg overflow-hidden border border-[var(--bd)] bg-[#0F1729] text-slate-100 text-xs font-mono"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#18181F] border-b border-[var(--bd)] text-[11px] text-slate-400">
                <span>{codeBlockLanguage || 'code'}</span>
                <CopyButton text={codeString} />
              </div>
              <pre className="p-3 overflow-x-auto whitespace-pre leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBlockBuffer = [];
          inCodeBlock = false;
        } else {
          // Open code block
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockBuffer.push(line);
        return;
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-base font-bold text-[var(--text-1)] mt-3 mb-1">
            {parseInline(line.slice(4))}
          </h3>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-lg font-extrabold text-[var(--text-1)] mt-4 mb-1">
            {parseInline(line.slice(3))}
          </h2>
        );
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-xl font-black text-[var(--text-1)] mt-4 mb-2">
            {parseInline(line.slice(2))}
          </h1>
        );
        return;
      }

      // Unordered lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().slice(2);
        elements.push(
          <li key={index} className="ml-4 list-disc text-sm text-[var(--text-1)] leading-relaxed my-0.5">
            {parseInline(itemText)}
          </li>
        );
        return;
      }

      // Numbered lists
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        elements.push(
          <li key={index} className="ml-4 list-decimal text-sm text-[var(--text-1)] leading-relaxed my-0.5">
            {parseInline(numMatch[2])}
          </li>
        );
        return;
      }

      // Empty line -> paragraph break
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-2" />);
        return;
      }

      // Standard text paragraph
      elements.push(
        <p key={index} className="text-sm text-[var(--text-1)] leading-relaxed my-1">
          {parseInline(line)}
        </p>
      );
    });

    // In case code block wasn't closed properly
    if (inCodeBlock && codeBlockBuffer.length > 0) {
      const codeString = codeBlockBuffer.join('\n');
      elements.push(
        <div
          key="code-unclosed"
          className="my-3 rounded-lg overflow-hidden border border-[var(--bd)] bg-[#0F1729] text-slate-100 text-xs font-mono"
        >
          <pre className="p-3 overflow-x-auto whitespace-pre leading-relaxed">
            <code>{codeString}</code>
          </pre>
        </div>
      );
    }

    return elements;
  };

  // Inline formatting helper for bold, italic, code
  const parseInline = (text: string): React.ReactNode => {
    // Regex for inline elements: **bold**, `code`, *italic*
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-[var(--text-1)]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded text-xs font-mono bg-[var(--bg-overlay)] border border-[var(--bd)] text-[var(--accent)]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return <div className="space-y-0.5 w-full overflow-hidden break-words">{renderFormattedText(content)}</div>;
}
