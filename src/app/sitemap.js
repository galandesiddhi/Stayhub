export default function sitemap() {
  const baseUrl = 'https://solstay.in';

  // Define static routes
  const routes = [
    '',
    '/about',
    '/amenities',
    '/pricing',
    '/gallery',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
