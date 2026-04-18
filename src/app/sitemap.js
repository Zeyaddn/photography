export default function sitemap() {
  const baseUrl = "https://lensofcreativity.com"; // Replace with real domain later
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1, // extremely low priority, should be blocked by robots anyway
    },
    // We would map actual dynamic projects here in the future
  ];
}
