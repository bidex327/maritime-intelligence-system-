
import {
  Radio,
  Video,
  BrainCircuit,
  GitMerge,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

const systems = [
  {
    name: 'AIS Feed',
    description: 'Vessel tracking data',
    status: 'Online',
    icon: Radio,
    category: 'Data Source',
  },
  {
    name: 'Drone Feed',
    description: 'Live aerial surveillance',
    status: 'Online',
    icon: Video,
    category: 'Data Source',
  },
  {
    name: 'AI Detection',
    description: 'Object detection engine',
    status: 'Active',
    icon: BrainCircuit,
    category: 'Analysis',
  },
  {
    name: 'Fusion Engine',
    description: 'AIS and drone correlation',
    status: 'Active',
    icon: GitMerge,
    category: 'Analysis',
  },
]

function OperationalActivity() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <h2 className="text-base font-semibold text-white">
              Operational Activity
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Current surveillance system status and processing activity
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          All Systems Operational
        </div>
      </div>

      {/* Systems */}
      <div className="grid gap-px bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
        {systems.map((system) => {
          const Icon = system.icon

          return (
            <div
              key={system.name}
              className="group bg-slate-900 p-5 transition hover:bg-slate-900/80"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition group-hover:bg-slate-700">
                  <Icon className="h-5 w-5 text-slate-300" />
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <span className="text-[9px] font-medium uppercase tracking-wide text-emerald-400">
                    {system.status}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-[9px] uppercase tracking-widest text-slate-600">
                {system.category}
              </p>

              <h3 className="mt-1 text-sm font-medium text-white">
                {system.name}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {system.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Last Update */}
      <div className="flex flex-col gap-2 border-t border-slate-800 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="h-3.5 w-3.5 text-slate-500" />

          <span className="text-xs text-slate-500">
            Last system update
          </span>

          <span className="font-mono text-xs text-slate-400">
            18:42:31
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-wider text-slate-600">
          Monitoring active
        </span>
      </div>
    </section>
  )
}

export default OperationalActivity
