"use client";

const stack = [
  { name: "React", src: "/assets/stack/react.ico" },
  { name: "TypeScript", src: "/assets/stack/typescript.ico" },
  { name: "Next.js", src: "/assets/stack/nextjs.ico" },
  { name: "Tailwind CSS", src: "/assets/stack/tailwindcss.ico" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-accent-blue/20 border-t px-6 py-3 lg:sticky lg:bottom-0 lg:z-40 lg:px-12 landscape:sticky landscape:bottom-0 landscape:z-40 landscape:py-1.5">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-body text-secondary/70 flex items-center gap-2 text-sm">
          <span>Built with:</span>
          <ul className="flex items-center gap-1.5" aria-label="Project technologies">
            {stack.map(({ name, src }) => (
              <li key={name}>
                <img
                  className="h-[1lh] w-[1lh] opacity-90 mix-blend-screen drop-shadow-[0_0_4px_rgba(187,205,243,0.24)] saturate-[.7] transition-[filter,opacity] duration-200 hover:opacity-100 hover:saturate-100"
                  src={src}
                  alt={name}
                  title={name}
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="font-body text-secondary/70 self-center text-center text-sm sm:self-auto">
          © {currentYear} Susan Chapas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
