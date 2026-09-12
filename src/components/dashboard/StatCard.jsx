import {
  Ship,
  AlertTriangle,
  ShieldAlert,
  Radar,
} from 'lucide-react'

const iconMap = {
  vessels: Ship,
  alerts: AlertTriangle,
  critical: ShieldAlert,
  coverage: Radar,
}

function StatCard({ title, value, description, type }) {
  const Icon = iconMap[type]

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-semibold text-white">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <Icon className="h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {description}
      </p>
    </div>
  )
}

export default StatCard