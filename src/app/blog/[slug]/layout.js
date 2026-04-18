import { blogData } from "@/data/blogData";

export async function generateMetadata({ params }) {
  const post = blogData.find((b) => b.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Ziad El Asad',
    };
  }

  return {
    title: `${post.title} | Ziad El Asad`,
    description: post.desc,
    openGraph: {
      title: `${post.title} | Ziad El Asad Blog`,
      description: post.desc,
      images: [
        {
          url: `${post.img}?w=1200&q=80`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Ziad El Asad`,
      description: post.desc,
      images: [`${post.img}?w=1200&q=80`],
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
