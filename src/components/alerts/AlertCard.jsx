import {
  AlertTriangle,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AlertCard({ alert }) {
  const navigate = useNavigate()

  const severityStyles = {
    High: 'bg-red-500/10 text-red-400 border-red-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Low: 'bg-slate-800 text-slate-400 border-slate-700',
  }

  return (
    <button
      type="button"
      onClick={() => navigate('/incident-details')}
      className="w-full rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-700 hover:bg-slate-900/80"
    >
      <div className="flex items-start gap-4">
        {/* Alert Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-white">
              {alert.title}
            </h3>

            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                severityStyles[alert.severity]
              }`}
            >
              {alert.severity}
            </span>

            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
              {alert.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {alert.description}
          </p>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {alert.location}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {alert.time}
            </span>

            <span>
              Confidence: {alert.confidence}%
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-600" />
      </div>
    </button>
  )
}

export default AlertCard