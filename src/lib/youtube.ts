export function youtubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;

  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;

  const embed = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embed) return `https://www.youtube.com/embed/${embed[1]}`;

  return null;
}
