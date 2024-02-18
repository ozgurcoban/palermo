export async function getNews() {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type&access_token=${process.env.INSTAGRAM_KEY}`;

  const data = await fetch(url, { next: { revalidate: 60 } });
  if (!data.ok) return [];
  return data.json();
}
