interface XrayImagesProps {
  className?: string;
}

export default function XrayImages({ className = "" }: XrayImagesProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="flex flex-col items-center">
        <h3 className="mb-4 font-semibold text-lg">
          X-ray Comparison: VACOped vs Aircast
        </h3>
        <div className="relative w-full aspect-[16/9]">
          <img
            src="/images/aircast-vs-vacoped-xray.png"
            alt="X-ray comparison showing VACOped (left) and Aircast with wedges (right) ankle positioning"
            className="rounded-lg w-full h-full object-contain"
          />
        </div>
        <div className="gap-8 grid grid-cols-2 mt-4 w-full">
          <p className="text-gray-600 text-sm text-center">
            VACOped maintains consistent 48° ankle plantarflexion
          </p>
          <p className="text-gray-600 text-sm text-center">
            Aircast achieves 28° ankle plantarflexion with wedges
          </p>
        </div>
      </div>
    </div>
  );
}
