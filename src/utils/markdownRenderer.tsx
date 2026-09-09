import React from 'react';

/**
 * Strips markdown syntax like [text](url), **bold**, etc. for plain text card excerpts.
 */
export function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // [text](url) -> text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')   // ![alt](url) -> empty
    .replace(/\*\*([^*]+)\*\*/g, '$1')         // **bold** -> bold
    .replace(/\*([^*]+)\*/g, '$1')             // *italic* -> italic
    .replace(/^#+\s+/gm, '')                   // ## Heading -> Heading
    .replace(/^>\s+/gm, '')                    // > Quote -> Quote
    .replace(/`([^`]+)`/g, '$1');              // `code` -> code
}

/**
 * Parses markdown text into React elements with clean blue clickable links,
 * images, headings, lists, bold/italic, and blockquotes.
 */
export function renderFormattedContent(content: string): React.ReactNode[] {
  if (!content) return [];

  // Split by double newlines into blocks
  const blocks = content.split(/\n\s*\n/);

  return blocks.map((block, blockIdx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // 1. Horizontal rule / Divider
    if (trimmed === '---') {
      return <hr key={`hr-${blockIdx}`} className="my-6 border-gray-200" />;
    }

    // 2. Headings
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={`h2-${blockIdx}`} className="text-2xl font-bold font-serif text-gray-900 mt-6 mb-3 leading-tight">
          {parseInlineFormatting(trimmed.slice(3))}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={`h3-${blockIdx}`} className="text-xl font-bold font-serif text-gray-900 mt-5 mb-2 leading-tight">
          {parseInlineFormatting(trimmed.slice(4))}
        </h3>
      );
    }

    // 3. Blockquote
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={`bq-${blockIdx}`} className="border-l-4 border-rose-600 pl-4 py-2 my-4 bg-gray-50 text-gray-700 font-serif italic text-lg rounded-r-lg">
          {parseInlineFormatting(trimmed.slice(2))}
        </blockquote>
      );
    }

    // 4. Standalone Image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      return (
        <figure key={`img-${blockIdx}`} className="my-6 rounded-xl overflow-hidden shadow-sm">
          <img src={src} alt={alt || 'Article image'} className="w-full h-auto max-h-[500px] object-cover rounded-xl" />
          {alt && <figcaption className="text-xs text-center text-gray-500 mt-2 font-medium">{alt}</figcaption>}
        </figure>
      );
    }

    // 5. Video Embed: [video:url "caption"]
    const videoMatch = trimmed.match(/^\[video:([^"\s\]]+)(?:\s+"([^"]+)")?\]$/);
    if (videoMatch) {
      const [, vidUrl, caption] = videoMatch;
      let embedUrl = vidUrl;
      if (vidUrl.includes('youtube.com/watch?v=')) {
        const id = vidUrl.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${id}`;
      } else if (vidUrl.includes('youtu.be/')) {
        const id = vidUrl.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${id}`;
      }

      return (
        <figure key={`vid-${blockIdx}`} className="my-6 rounded-xl overflow-hidden shadow-sm">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
            <iframe
              src={embedUrl}
              title="Embedded Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {caption && <figcaption className="text-xs text-center text-gray-500 mt-2 font-medium">{caption}</figcaption>}
        </figure>
      );
    }

    // 6. Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s+/, ''));
      return (
        <ul key={`ul-${blockIdx}`} className="list-disc list-inside space-y-1.5 my-4 text-gray-800 font-normal">
          {items.map((it, i) => (
            <li key={i}>{parseInlineFormatting(it)}</li>
          ))}
        </ul>
      );
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split('\n').map(line => line.replace(/^\d+\.\s+/, ''));
      return (
        <ol key={`ol-${blockIdx}`} className="list-decimal list-inside space-y-1.5 my-4 text-gray-800 font-normal">
          {items.map((it, i) => (
            <li key={i}>{parseInlineFormatting(it)}</li>
          ))}
        </ol>
      );
    }

    // Default Paragraph (Sanitize any pasted/stored raw HTML figure tags & attributes)
    let cleanText = trimmed
      .replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, '$1') // strip figure tags
      .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, '') // strip empty/raw figcaption tags
      .replace(/<img[^>]*src="([^"]+)"[^>]*\/?>/gi, '![]($1)') // convert raw HTML img to markdown
      .replace(/<[^>]+>/g, ''); // strip any remaining raw HTML tags

    if (!cleanText.trim()) return null;

    return (
      <p key={`p-${blockIdx}`} className="leading-relaxed my-4 text-gray-800">
        {parseInlineFormatting(cleanText)}
      </p>
    );
  }).filter(Boolean);
}

/**
 * Parses inline formatting: [link text](url), **bold**, *italic*.
 */
export function parseInlineFormatting(text: string): React.ReactNode[] {
  if (!text) return [];

  const tokens: React.ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Add plain text before match
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }

    // Link: [text](url)
    if (match[2] && match[3]) {
      const linkText = match[2];
      const linkUrl = match[3];
      tokens.push(
        <a
          key={`link-${lastIndex}-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer transition-colors inline-block"
        >
          {linkText}
        </a>
      );
    }
    // Bold: **bold**
    else if (match[4]) {
      tokens.push(
        <strong key={`bold-${lastIndex}-${match.index}`} className="font-bold text-gray-950">
          {match[4]}
        </strong>
      );
    }
    // Italic: *italic*
    else if (match[5]) {
      tokens.push(
        <em key={`italic-${lastIndex}-${match.index}`} className="italic">
          {match[5]}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens;
}
