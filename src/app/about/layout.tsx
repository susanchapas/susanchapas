export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/assets/misc/lake-erie.webp" as="image" type="image/webp" />
      {children}
    </>
  );
}
