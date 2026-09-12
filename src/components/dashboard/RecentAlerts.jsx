import { AlertTriangle, Clock, MapPin, ChevronRight } from 'lucide-react'
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

function RecentAlerts() {
  const navigate = useNavigate()

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Recent Alerts
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest incidents requiring monitoring
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/alerts')}
          className="text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          View all
        </button>
      </div>

      {/* Alerts */}
      <div className="divide-y divide-slate-800">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            type="button"
            onClick={() => navigate('/incident-details')}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-800/40"
          >
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>

            {/* Main Information */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-white">
                  {alert.title}
                </p>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    alert.severity === 'High'
                      ? 'bg-red-500/10 text-red-400'
                      : alert.severity === 'Medium'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {alert.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default RecentAlerts