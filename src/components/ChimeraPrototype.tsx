import LazyIframe from "@/components/LazyIframe";

const CHIMERA_PROTOTYPE_URL =
  "https://embed.figma.com/proto/KsnMHMy2uUtQr5TCrGbd7M/chimera2?page-id=0%3A1&node-id=18-6566&p=f&viewport=82%2C206%2C0.4&scaling=scale-down&content-scaling=fixed&starting-point-node-id=18%3A6566&embed-host=share";

/** A responsive, lazy-loaded embed of the Chimera Figma prototype. */
export default function ChimeraPrototype() {
  return (
    <div className="bg-secondary/10 relative aspect-video w-full overflow-hidden rounded-2xl">
      <LazyIframe
        className="h-full w-full"
        src={CHIMERA_PROTOTYPE_URL}
        title="Chimera interactive prototype"
        allowFullScreen
      />
    </div>
  );
}
