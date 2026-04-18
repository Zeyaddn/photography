import { projectsData } from "@/data/projectsData";

export async function generateMetadata({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Ziad El Asad',
    };
  }

  return {
    title: `${project.title} | Ziad El Asad`,
    description: project.desc,
    openGraph: {
      title: `${project.title} | Ziad El Asad Portfolio`,
      description: project.desc,
      images: [
        {
          url: `${project.img}?w=1200&q=80`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Ziad El Asad`,
      description: project.desc,
      images: [`${project.img}?w=1200&q=80`],
    },
  };
}

export default function ProjectLayout({ children }) {
  return <>{children}</>;
}
