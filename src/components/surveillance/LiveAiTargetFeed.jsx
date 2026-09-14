import { Camera, Circle, ScanLine, Wifi } from 'lucide-react'

const mockDetection = {
  target: 'Unknown Vessel',
  type: 'Vessel',
  confidence: 94,
  status: 'AI Detection Active',
  timestamp: 'Just now',
  boundingBox: {
    top: '28%',
    left: '32%',
    width: '36%',
    height: '30%',
  },
}

function LiveAITargetFeed() {
  const detection = mockDetection

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <Camera className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              Live AI Target Feed
            </h3>

            <p className="text-xs text-slate-500">
              Visual detection stream
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />

          <span className="text-xs font-medium text-emerald-400">
            LIVE
          </span>
        </div>
      </div>

      {/* Feed */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {/* Simulated camera view */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(51, 65, 85, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(51, 65, 85, 0.25) 1px, transparent 1px),
              radial-gradient(circle at 50% 55%, rgba(30, 64, 175, 0.35), transparent 45%),
              linear-gradient(160deg, #0f172a 0%, #172554 50%, #020617 100%)
            `,
            backgroundSize: '40px 40px, 40px 40px, auto, auto',
          }}
        />

        {/* Water / horizon simulation */}
        <div className="absolute inset-x-0 top-[42%] h-px bg-slate-500/30" />

        {/* Camera label */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-950/80 px-2.5 py-1.5 backdrop-blur-sm">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />

          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
            Drone Camera 01
          </span>
        </div>

        {/* Detection bounding box */}
        <div
          className="absolute border-2 border-emerald-400"
          style={{
            top: detection.boundingBox.top,
            left: detection.boundingBox.left,
            width: detection.boundingBox.width,
            height: detection.boundingBox.height,
          }}
        >
          {/* Detection label */}
          <div className="absolute -top-7 left-0 flex items-center gap-2 whitespace-nowrap rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-semibold text-slate-950">
            <ScanLine className="h-3 w-3" />

            <span>
              {detection.type} {detection.confidence}%
            </span>
          </div>

          {/* Corner markers */}
          <span className="absolute -left-0.5 -top-0.5 h-2.5 w-2.5 border-l-2 border-t-2 border-emerald-300" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 border-r-2 border-t-2 border-emerald-300" />
          <span className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 border-b-2 border-l-2 border-emerald-300" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 border-b-2 border-r-2 border-emerald-300" />
        </div>

        {/* Scan line */}
        <div className="absolute inset-x-0 top-[58%] h-px bg-emerald-400/30" />

        {/* Feed timestamp */}
        <div className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-slate-400">
            {detection.timestamp}
          </span>
        </div>

        {/* Detection status */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-slate-950/80 px-2.5 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[10px] font-medium text-emerald-400">
            {detection.status}
          </span>
        </div>
      </div>

      {/* Detection information */}
      <div className="grid grid-cols-2 divide-x divide-slate-800 border-t border-slate-800">
        <div className="min-w-0 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Detected Target
          </p>

          <p className="mt-1 truncate text-sm font-medium text-white">
            {detection.target}
          </p>
        </div>

        <div className="min-w-0 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Confidence
          </p>

          <p className="mt-1 text-sm font-medium text-emerald-400">
            {detection.confidence}%
          </p>
        </div>
      </div>
    </section>
  )
}

export default LiveAITargetFeed