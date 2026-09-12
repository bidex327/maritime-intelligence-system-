import {
  Radio,
  Video,
  BrainCircuit,
  GitMerge,
  Clock3,
} from 'lucide-react'

const systems = [
  {
    name: 'AIS Feed',
    description: 'Vessel tracking data',
    status: 'Online',
    icon: Radio,
  },
  {
    name: 'Drone Feed',
    description: 'Live aerial surveillance',
    status: 'Online',
    icon: Video,
  },
  {
    name: 'AI Detection',
    description: 'Object detection engine',
    status: 'Active',
    icon: BrainCircuit,
  },
  {
    name: 'Fusion Engine',
    description: 'AIS and drone correlation',
    status: 'Active',
    icon: GitMerge,
  },
]

function OperationalActivity() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-base font-semibold text-white">
          Operational Activity
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Current surveillance system status
        </p>
      </div>

      {/* Systems */}
      <div className="grid gap-px bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
        {systems.map((system) => {
          const Icon = system.icon

          return (
            <div
              key={system.name}
              className="bg-slate-900 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <Icon className="h-5 w-5 text-slate-300" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-[10px] font-medium text-emerald-400">
                    {system.status}
                  </span>
                </div>
              </div>

              <h3 className="mt-4 text-sm font-medium text-white">
                {system.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {system.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Last Update */}
      <div className="flex items-center gap-2 border-t border-slate-800 px-5 py-3">
        <Clock3 className="h-3.5 w-3.5 text-slate-500" />

        <span className="text-xs text-slate-500">
          Last system update: 18:42:31
        </span>
      </div>
    </section>
  )
}

export default OperationalActivity