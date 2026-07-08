export type ArtCategory =
  | "Traditional Art"
  | "Design"
  | "Motion"
  | "Photography"
  | "UX/UI"
  | "Digital Design";

export type MediaType = "image" | "video";

export interface ArtworkLink {
  label: string;
  href: string;
}

export interface Artwork {
  id: number;
  title: string;
  category: ArtCategory;
  year: string;
  description: string;
  medium: string;
  award?: string;
  links?: ArtworkLink[];
  src: string;
  type: MediaType;
  width: number;
  height: number;
  hero?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  imageClassName?: string;
}

export function tileCols(artwork: Artwork): 1 | 2 | 3 {
  const ratio = artwork.width / artwork.height;
  if (ratio >= 2.2) return 3;
  if (ratio >= 1.3) return 2;
  return 1;
}

export const categories: readonly ("All" | ArtCategory)[] = [
  "All",
  "UX/UI",
  "Digital Design",
  "Motion",
  "Photography",
  "Traditional Art",
];

export const artworks: readonly Artwork[] = [
  {
    id: 1,
    title: "Mindless Mirth",
    category: "Digital Design",
    year: "2025",
    width: 703,
    height: 1008,
    description:
      "A memory of my younger sister and my godson, caught mid-laugh on the E train in 2018. Loud, silly, and entirely themselves, with no one watching and no reason to care.\n\nIn the years since, puberty, social pressure, and a pandemic have changed them in ways I couldn't have predicted. Their laughter is quieter now; they second-guess things they once did without a thought.\n\nSo this piece is less a record than a wish: to see them smile that carelessly again. Joy like that doesn't vanish. It waits for permission to return.\n\nThe original was selected for the HCCC Foundation's permanent installation.",
    medium: "iPad Procreate",
    award: "HCCC Foundation Art Award, 2025",
    src: "/gallery/Mindless-Mirth-final.webp",
    type: "image",
    hero: true,
    objectFit: "cover",
  },
  {
    id: 5,
    title: "EOP Explainer",
    category: "Motion",
    year: "2023",
    width: 3840,
    height: 2160,
    description:
      "An animated explainer for Spring Bank's Employee Opportunity Program, a B2B benefit that gives employees affordable small-dollar loans and free financial counseling at no cost to their employers.\n\nThe program is genuinely useful but unfamiliar and a little complex, and flyers weren't landing. Too much to read, too easy to skip. So we tried motion instead, breaking the offer into a few digestible beats people could actually follow and act on.",
    medium: "Motion graphics, Canva",
    links: [
      {
        label: "Watch the full explainer",
        href: "https://www.youtube.com/watch?v=NP3hYS5kLbs",
      },
    ],
    src: "/gallery/EOP Explainer.mp4",
    type: "video",
    hero: true,
  },
  {
    id: 16,
    title: "ArchLog Overview",
    category: "UX/UI",
    year: "2026",
    width: 2926,
    height: 1748,
    description:
      "ArchLog is an interactive, low-friction tool that helps architecture students develop concepts with more clarity inside the studio. Research surfaced a recurring problem: students had no shared design process and no consistent way to capture why they made the moves they made, so their design narrative got reconstructed from memory hours before a critique.\n\nBuilt as a team effort, ArchLog lets students log each design move with its intent, what changed, why, and what it trades off, then generates a critique-ready story from that log so they walk into reviews prepared rather than panicked.",
    medium: "Product UI, designed in Figma",
    links: [{ label: "View case study", href: "/projects/archlog" }],
    src: "/gallery/ArchLog Overview page.webp",
    type: "image",
  },
  {
    id: 18,
    title: "Chimera 2.0",
    category: "UX/UI",
    year: "2026",
    width: 1280,
    height: 720,
    description:
      "Chimera 2.0 is a mobile-first redesign of a self-built home security camera app. The original infrastructure was solid, but the app had grown feature by feature until everyday tasks like finding an event or exporting a clip felt like work.\n\nGrounded in a deep heuristic analysis, the redesign rebuilds the app around a central timeline so the core actions take fewer taps and less guesswork.",
    medium: "Product UI, designed in Figma",
    links: [{ label: "View case study", href: "/projects/chimera" }],
    src: "/assets/projects/chimera/chimera security camera app.png",
    type: "image",
  },
  {
    id: 8,
    title: "Watercolor Painting",
    category: "Traditional Art",
    year: "2017",
    width: 1200,
    height: 1306,
    description:
      "A portrait of Louis Comfort Tiffany set against a stained glass background, a nod to his own work as a stained glass artist. I painted it for fun after getting a new set of Koi watercolors.\n\nI broke from the stained glass on some of the shards on purpose, using them to practice gradients instead.",
    medium: "Koi watercolors on paper",
    src: "/gallery/Watercolor Painting.webp",
    type: "image",
  },
  {
    id: 15,
    title: "Posing at Gallery",
    category: "Photography",
    year: "2019",
    width: 2237,
    height: 2531,
    description:
      "Shot in a Soho gallery, where my friend looked impossibly cool against an indie artist's stained glass. I leaned into the contrast of light and dark already in the scene.\n\nIn Adobe Lightroom I pushed the colors and sharpened his outline against the glass, letting the silhouette and the stained glass play off each other.",
    medium: "Digital photography, edited in Adobe Lightroom",
    src: "/gallery/Posing at a Gallery Photo.webp",
    type: "image",
  },
  {
    id: 3,
    title: "A Bike for Every Rider",
    category: "Digital Design",
    year: "2023",
    width: 2016,
    height: 792,
    description:
      "A banner for the bike shops Spring Bank partners with on its GoGreen cycle loan, designed to pull more attention than a stack of flyers on the checkout counter.\n\nThe loan makes higher-priced bikes accessible, so in NYC it nudges riders toward fire-safe e-bikes, which cost more but are far safer.",
    medium: "Adobe Illustrator and iPad Procreate",
    src: "/gallery/A bike for every rider.webp",
    type: "image",
  },
  {
    id: 7,
    title: "The NTL",
    category: "Photography",
    year: "2019",
    width: 1200,
    height: 886,
    description:
      "Shot at The National's Forest Hills Stadium concert in Queens in 2019. An unassuming couple in the stands, just vibing with the music.\n\nI was once again enamored with the contrast of light and dark.",
    medium: "Digital photography, edited in Adobe Lightroom",
    src: "/gallery/THE NTL photo.webp",
    type: "image",
  },
  {
    id: 2,
    title: "ATM Home Screen",
    category: "Motion",
    year: "2025",
    width: 3324,
    height: 2494,
    description:
      "Made for a new ATM at Spring Bank's new Red Hook branch. The upgrade to a newer model meant the machine could finally play video, so Spring Bank capitalized on the opportunity to introduce itself to the community through this street-facing screen.\n\nThe video was shot by Spring Bank's videography partner and edited by me in Adobe After Effects.",
    medium: "UI motion, edited in Adobe After Effects",
    src: "/gallery/ATM home screen video.mp4",
    type: "video",
  },
  {
    id: 4,
    title: "Eat, Drink, & Be Merry",
    category: "Digital Design",
    year: "2025",
    width: 612,
    height: 792,
    description:
      "Made for a holiday party I planned and executed for the Spring Bank team in 2025. We held it at a restaurant without buying out the venue, so I created this sign to point Spring Bank employees toward where they should go.",
    medium: "Printed graphic, made in Adobe Illustrator",
    src: "/gallery/eat, drink, & be merry.webp",
    type: "image",
  },
  {
    id: 9,
    title: "Red Hook Launch",
    category: "Photography",
    year: "2024",
    width: 5712,
    height: 4284,
    description:
      "Shot in 2024 as Spring Bank prepared for the grand opening of its Red Hook branch. I took the branch manager team out for a stroll through the neighborhood and captured a series of warm summer frames, building a visual case for how invested Spring Bank is in the community it serves.",
    medium: "Event photography, edited in Adobe Lightroom",
    src: "/gallery/Red Hook Launch Photo.webp",
    type: "image",
  },
  {
    id: 10,
    title: "Binnoy Feature",
    category: "Photography",
    year: "2023",
    width: 1200,
    height: 900,
    description:
      "Shot for the employee features Spring Bank publishes. The piece emphasizes how much Binnoy loves taking active steps to grow the Bronx community, so I posed him in the South Bronx neighborhood the bank is headquartered in and supports.",
    medium: "Portrait photography, edited in Adobe Lightroom",
    links: [
      {
        label: "Read the feature",
        href: "https://www.spring.bank/community-banking-binnoy-amin/",
      },
    ],
    src: "/gallery/Binnoy Feature Photo.webp",
    type: "image",
  },
  {
    id: 13,
    title: "Jason Feature",
    category: "Photography",
    year: "2023",
    width: 4032,
    height: 3024,
    description:
      "Posed in the Astoria office for his employee feature, since Jason's story leaned toward career growth. He was really proud of his then in-progress MBA, which he has since earned. A hard-working employee proud of all his business deals and how hard he worked on them, Jason consistently went above and beyond, so the desk portrait felt right for him.",
    medium: "Portrait photography, edited in Adobe Lightroom",
    links: [
      {
        label: "Read the feature",
        href: "https://www.spring.bank/jason-leads-with-integrity/",
      },
    ],
    src: "/gallery/Jason Feature Photo.webp",
    type: "image",
  },
  {
    id: 17,
    title: "Spring Bank Nonprofit Banking",
    category: "Digital Design",
    year: "2026",
    width: 1545,
    height: 1999,
    description:
      "One page from a multi-page PDF that Spring Bank sends to nonprofit leads in the community, laying out its nonprofit banking offering.",
    medium: "Print and digital layout, made in Adobe Illustrator",
    links: [
      {
        label: "View the PDF",
        href: "/gallery/Spring Bank Nonprofit Banking.pdf",
      },
    ],
    src: "/gallery/Spring Bank Nonprofit Banking.webp",
    type: "image",
  },
];
