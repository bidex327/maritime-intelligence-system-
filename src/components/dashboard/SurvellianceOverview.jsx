import { Crosshair, Radio, Video } from 'lucide-react'

const vessels = [
  {
    id: 1,
    name: 'MT Ocean Star',
    type: 'Tanker',
    status: 'Normal',
    position: '32%',
  },
  {
    id: 2,
    name: 'MV Atlantic',
    type: 'Cargo',
    status: 'Monitoring',
    position: '58%',
  },
  {
    id: 3,
    name: 'Unknown Vessel',
    type: 'Unknown',
    status: 'Alert',
    position: '76%',
  },
]

function SurveillanceOverview() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Surveillance Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Live maritime activity monitoring
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Radio className="h-4 w-4 text-emerald-400" />
            AIS Online
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Video className="h-4 w-4 text-emerald-400" />
            Drone Online
          </div>
        </div>
      </div>

      {/* Surveillance Area */}
      <div className="relative h-420px overflow-hidden bg-slate-950">
        {/* Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size:50px_50px" />
        </div>

        {/* Radar rings */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Crosshair className="h-6 w-6 text-emerald-400" />
        </div>

        {/* Vessel markers */}
        {vessels.map((vessel) => (
          <div
            key={vessel.id}
            className="absolute"
            style={{
              left: vessel.position,
              top: `${25 + vessel.id * 18}%`,
            }}
          >
            <div
              className={`h-3 w-3 rounded-full ${
                vessel.status === 'Alert'
                  ? 'bg-red-500'
                  : vessel.status === 'Monitoring'
                    ? 'bg-yellow-400'
                    : 'bg-emerald-400'
              }`}
            />

            <div className="absolute left-5 top-0 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900/90 px-2 py-1">
              <p className="text-xs font-medium text-white">
                {vessel.name}
              </p>

              <p className="text-[10px] text-slate-500">
                {vessel.type}
              </p>
            </div>
          </div>
        ))}

        {/* Map Labels */}
        <div className="absolute left-5 top-5 text-[10px] uppercase tracking-wider text-slate-600">
          Maritime Surveillance Zone
        </div>

        <div className="absolute bottom-5 left-5 text-xs text-slate-500">
          Gulf of Guinea
        </div>

        <div className="absolute bottom-5 right-5 flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Normal
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            Monitoring
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Alert
          </div>
        </div>
      </div>
    </section>
  )
}

export default SurveillanceOverview