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
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="flex flex-col items-center">
            <img
              src="/images/wedges-xray.png"
              alt="X-ray showing Aircast with wedges ankle positioning"
              className="rounded-lg w-full h-[250px] object-contain"
            />
            <p className="mt-2 text-gray-600 text-sm text-center">
              Aircast achieves 28° ankle plantarflexion with wedges
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images/vacoped-xray.webp"
              alt="X-ray showing VACOped ankle positioning"
              className="rounded-lg w-full h-[250px] object-contain"
            />
            <p className="mt-2 text-gray-600 text-sm text-center">
              VACOped maintains consistent 48° ankle plantarflexion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
