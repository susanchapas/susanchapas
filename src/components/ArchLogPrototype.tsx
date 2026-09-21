import LazyIframe from "@/components/LazyIframe";

const ARCHLOG_PROTOTYPE_URL =
  "https://embed.figma.com/proto/meQB0AK1p3EVTFgzb1v58l/ArchLog?page-id=1814%3A1217&node-id=2041-1390&p=f&viewport=554%2C390%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2041%3A1390&embed-host=share";

/** A responsive, lazy-loaded embed of the ArchLog Figma prototype. */
export default function ArchLogPrototype() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-secondary/10">
      <LazyIframe
        className="h-full w-full"
        src={ARCHLOG_PROTOTYPE_URL}
        title="ArchLog interactive prototype"
        allowFullScreen
      />
      <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 11.24V7.5a2.5 2.5 0 015 0v3.74c1.21-.81 2-2.18 2-3.74a4.5 4.5 0 00-9 0c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26a1.17 1.17 0 00-.54-.11H13v-6a1.5 1.5 0 00-3 0v10.74l-3.43-.72a.98.98 0 00-.24-.03c-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" />
        </svg>
        Interactive prototype
      </div>
    </div>
  );
}
