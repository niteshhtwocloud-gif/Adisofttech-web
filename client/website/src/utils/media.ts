import { getWebsiteImageUrl } from "./image";

/**
 * Extracts YouTube video ID from various standard YouTube URL formats.
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Extracts Vimeo video ID from various Vimeo URL formats.
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+))/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Checks if a URL points directly to a video file.
 */
export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url.trim());
}

/**
 * Transforms raw blog content (HTML or Markdown) into enhanced HTML with
 * responsive embedded video players, resolved image URLs, and clean formatting.
 */
export function enhanceBlogHtml(rawContent: string): string {
  if (!rawContent) return "";

  let html = rawContent;

  // 1. If content is markdown without HTML tags, convert basic markdown to HTML
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    html = html
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/\n\n/g, "<p><br></p>")
      .replace(/\n/g, "<br/>");
  }

  // 2. Automatically convert standalone YouTube links (in paragraph or anchor tags) to embedded players
  // e.g. <p>https://www.youtube.com/watch?v=XXXXX</p> or <p><a href="https://www.youtube.com/watch?v=XXXXX">...</a></p>
  html = html.replace(
    /<p>(?:<a[^>]+href=["']([^"']+)["'][^>]*>.*?<\/a>|(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s<]+))<\/p>/gi,
    (match, hrefUrl, plainUrl) => {
      const targetUrl = hrefUrl || plainUrl;
      const ytId = extractYoutubeId(targetUrl);
      if (ytId) {
        return `
          <div class="ast-video-container my-8 relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <iframe
              src="https://www.youtube.com/embed/${ytId}"
              title="YouTube Video Player"
              class="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        `;
      }
      return match;
    }
  );

  // 3. Automatically convert standalone Vimeo links to embedded players
  html = html.replace(
    /<p>(?:<a[^>]+href=["']([^"']+)["'][^>]*>.*?<\/a>|(https?:\/\/(?:www\.)?vimeo\.com\/[^\s<]+))<\/p>/gi,
    (match, hrefUrl, plainUrl) => {
      const targetUrl = hrefUrl || plainUrl;
      const vimeoId = extractVimeoId(targetUrl);
      if (vimeoId) {
        return `
          <div class="ast-video-container my-8 relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <iframe
              src="https://player.vimeo.com/video/${vimeoId}"
              title="Vimeo Video Player"
              class="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        `;
      }
      return match;
    }
  );

  // 4. Automatically convert standalone direct video links (.mp4, .webm) into HTML5 video player
  html = html.replace(
    /<p>(?:<a[^>]+href=["']([^"']+)["'][^>]*>.*?<\/a>|(https?:\/\/[^\s<]+\.(?:mp4|webm|ogg|mov)(?:\?[^\s<]*)?))<\/p>/gi,
    (match, hrefUrl, plainUrl) => {
      const targetUrl = hrefUrl || plainUrl;
      if (isDirectVideoUrl(targetUrl)) {
        return `
          <div class="ast-video-container my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <video src="${targetUrl}" controls class="w-full rounded-2xl block" preload="metadata"></video>
          </div>
        `;
      }
      return match;
    }
  );

  // 5. Ensure relative image sources (/uploads/...) are resolved to backend domain
  html = html.replace(
    /<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi,
    (match, prefix, src, suffix) => {
      const resolvedSrc = getWebsiteImageUrl(src);
      return `<img${prefix}src="${resolvedSrc}"${suffix} loading="lazy" class="rounded-2xl shadow-md my-6 max-w-full mx-auto h-auto block" />`;
    }
  );

  return html;
}
