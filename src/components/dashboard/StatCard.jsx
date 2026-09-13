
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

const accentMap = {
  vessels: 'text-sky-400 bg-sky-500/10',
  alerts: 'text-amber-400 bg-amber-500/10',
  critical: 'text-red-400 bg-red-500/10',
  coverage: 'text-emerald-400 bg-emerald-500/10',
}

function StatCard({ title, value, description, type }) {
  const Icon = iconMap[type]
  const accent = accentMap[type]

  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition duration-200 hover:border-slate-700 hover:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

        <p className="text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  )
}

export default StatCard
