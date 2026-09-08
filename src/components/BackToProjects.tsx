import Link from "next/link";

export default function BackToProjects() {
  return (
    <Link
      href="/projects"
      className="text-accent-lime font-body mb-6 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm transition-all hover:gap-4"
    >
      <svg
        className="h-4 w-4 rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
      Back to Projects
    </Link>
  );
}
