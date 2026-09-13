
import {
  AlertTriangle,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const alerts = [
  {
    id: 1,
    title: 'Unknown Vessel Detected',
    location: 'Offshore Zone A',
    severity: 'High',
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'AIS Signal Lost',
    location: 'Surveillance Zone B',
    severity: 'Medium',
    time: '8 min ago',
  },
  {
    id: 3,
    title: 'Route Deviation Detected',
    location: 'Offshore Zone C',
    severity: 'Medium',
    time: '15 min ago',
  },
  {
    id: 4,
    title: 'Unusual Vessel Activity',
    location: 'Surveillance Zone A',
    severity: 'Low',
    time: '24 min ago',
  },
]

const severityStyles = {
  High: {
    icon: 'bg-red-500/10 text-red-400',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    indicator: 'bg-red-500',
  },
  Medium: {
    icon: 'bg-amber-500/10 text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    indicator: 'bg-amber-400',
  },
  Low: {
    icon: 'bg-slate-800 text-slate-400',
    badge: 'bg-slate-800 text-slate-400 border-slate-700',
    indicator: 'bg-slate-500',
  },
}

function RecentAlerts() {
  const navigate = useNavigate()

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

            <h2 className="text-base font-semibold text-white">
              Recent Alerts
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Latest incidents requiring analyst attention
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/alerts')}
          className="flex items-center gap-1 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          View all

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Alerts */}
      <div className="divide-y divide-slate-800">
        {alerts.map((alert) => {
          const styles = severityStyles[alert.severity]

          return (
            <button
              key={alert.id}
              type="button"
              onClick={() => navigate('/incident-details')}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-800/40"
            >
              {/* Severity icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
              >
                <AlertTriangle className="h-4.5 w-4.5" />
              </div>

              {/* Main information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {alert.title}
                  </p>

                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${styles.badge}`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${styles.indicator}`}
                />

                <span className="text-[10px] uppercase tracking-wider text-slate-600">
                  Active
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default RecentAlerts
