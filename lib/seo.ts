import type { Metadata } from "next";
import { SITE_URL, contacts, doctor, locations, social } from "./site";

export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: doctor.fullName,
      locale: "it_IT",
      type: "website",
      images: [{ url: "/media/ritratto-poltrona-1280.webp", width: 1280, height: 1600, alt: doctor.fullName }],
    },
  };
}

export function dentistJsonLd() {
  const napoli = locations.find((l) => l.slug === "napoli")!;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `Studio ${doctor.fullName}`,
    url: SITE_URL,
    image: `${SITE_URL}/media/studio-reception-1280.webp`,
    telephone: "+39 081 5453461",
    email: contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: napoli.address,
      postalCode: napoli.postalCode,
      addressLocality: "Napoli",
      addressRegion: "NA",
      addressCountry: "IT",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    sameAs: [social.instagram.href, social.tiktok.href],
    founder: { "@type": "Person", name: doctor.fullName, jobTitle: doctor.title },
  };
}
