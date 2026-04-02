type MockAthletePortraitProps = {
  name: string;
  sport: string;
  country: string;
  large?: boolean;
};

export default function MockAthletePortrait({
  name,
  sport,
  country,
  large = false,
}: MockAthletePortraitProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#d7d7da,#efeff1)] ${
        large ? "h-[520px]" : "h-52"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.08),transparent_35%)]" />

      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />

      <div className="absolute left-1/2 top-[16%] h-[34%] w-[34%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#f9f9fb,#d9d9de)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.9)]" />

      <div className="absolute bottom-[18%] left-1/2 h-[32%] w-[56%] -translate-x-1/2 rounded-t-[999px] bg-[linear-gradient(180deg,#f9f9fb,#d1d1d6)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.85)]" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <div className="rounded-[24px] bg-white/78 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
            {sport}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#1d1d1f] break-words leading-tight">
            {name}
          </h3>
          <p className="mt-1 text-sm text-[#6e6e73]">{country}</p>
        </div>
      </div>
    </div>
  );
}
