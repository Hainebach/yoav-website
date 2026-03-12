export function extractVimeoId(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export async function getVimeoThumbnail(url) {
  const res = await fetch(`https://vimeo.com/api/oembed.json?url=${url}`);
  const data = await res.json();
  return data.thumbnail_url;
}
