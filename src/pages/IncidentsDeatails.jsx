import { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Crosshair,
  FileText,
  GitMerge,
  MapPin,
  Radio,
  ShieldAlert,
  UserCheck,
  Video,
  XCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function IncidentDetails() {
  const navigate = useNavigate()

  const [status, setStatus] = useState('Unreviewed')

  const isConfirmed = status === 'Confirmed'
  const isFalsePositive = status === 'False Positive'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => navigate('/alerts')}
          className="flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Alerts
        </button>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-emerald-400">
                Incident Investigation
              </p>

              <span className="text-slate-700">/</span>

              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
                INC-0001
              </span>
            </div>

            <h1 className="mt-1 text-2xl font-semibold text-white">
              Unknown Vessel Detected
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
              Review detection evidence, sensor correlation and vessel
              information before making an analyst decision.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <SeverityBadge severity="High" />
          </div>
        </div>
      </div>

      {/* Incident Summary */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
            <ShieldAlert className="h-4 w-4 text-red-400" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white">
              Incident Summary
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Core information associated with this detection event.
            </p>
          </div>
        </div>

        <div className="grid divide-y divide-slate-800 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <SummaryItem
            label="Incident ID"
            value="INC-0001"
            mono
          />

          <SummaryItem
            label="Detected"
            value="18:40:12"
            icon={Clock3}
          />

          <SummaryItem
            label="Location"
            value="Offshore Zone A"
            icon={MapPin}
          />

          <SummaryItem
            label="AI Confidence"
            value="94%"
            valueClass="text-emerald-400"
          />
        </div>
      </section>

      {/* Evidence */}
      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-white">
            Detection Evidence
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
            Evidence collected from independent surveillance sources and
            correlation analysis.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <EvidenceCard
            icon={Video}
            title="Drone Detection"
            label="AI Observation"
            description="Object detection identified a vessel within the monitored surveillance zone."
            status="Detected"
          />

          <EvidenceCard
            icon={Radio}
            title="AIS Correlation"
            label="Sensor Correlation"
            description="No matching AIS identity was found for the detected vessel at the observed position."
            status="No Match"
            statusClass="text-amber-400"
          />

          <EvidenceCard
            icon={GitMerge}
            title="Fusion Analysis"
            label="Cross-Sensor Analysis"
            description="Drone observation and AIS data indicate a vessel identity mismatch requiring analyst review."
            status="Mismatch"
            statusClass="text-red-400"
          />
        </div>
      </section>

      {/* Vessel Information */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
            <Crosshair className="h-4 w-4 text-slate-300" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white">
              Vessel Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Identity and movement information associated with the detected
              object.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem label="Vessel Name" value="Unknown" />
          <InfoItem label="Vessel Type" value="Unknown" />
          <InfoItem label="AIS Status" value="Not Detected" />
          <InfoItem label="Movement" value="12.4 knots" />
          <InfoItem label="Heading" value="184°" />
          <InfoItem label="Zone" value="Offshore Zone A" />
          <InfoItem label="Source" value="Drone + AIS" />
          <InfoItem label="Detection Class" value="Vessel" />
        </div>
      </section>

      {/* Analyst Review */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <UserCheck className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white">
                Analyst Review
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Human verification is required before this incident is
                confirmed.
              </p>
            </div>
          </div>

          <span className="flex w-fit shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-wider text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Human Verification Required
          </span>
        </div>

        <div className="p-5">
          {!isConfirmed && !isFalsePositive && (
            <>
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-sm font-medium text-white">
                      Automated systems have flagged this event.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      AI detection and sensor correlation provide supporting
                      evidence, but the platform does not automatically
                      determine whether the incident is confirmed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setStatus('False Positive')}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
                >
                  <XCircle className="h-4 w-4" />
                  Mark False Positive
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('Confirmed')}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm Incident
                </button>
              </div>
            </>
          )}

          {isConfirmed && (
            <ReviewResult
              icon={CheckCircle2}
              title="Incident Confirmed"
              description="The analyst has confirmed this incident based on the available detection and correlation evidence."
              className="border-emerald-500/20 bg-emerald-500/5"
              iconClass="text-emerald-400"
              titleClass="text-emerald-300"
            />
          )}

          {isFalsePositive && (
            <ReviewResult
              icon={XCircle}
              title="Marked as False Positive"
              description="The analyst has determined that the available evidence does not support this incident as a confirmed event."
              className="border-slate-700 bg-slate-950"
              iconClass="text-slate-400"
              titleClass="text-white"
            />
          )}
        </div>
      </section>

      {/* Investigation Note */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

        <div>
          <p className="text-xs font-medium text-slate-400">
            Investigation Note
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            This demonstration uses simulated surveillance data. In the
            production system, evidence would include timestamped drone
            frames, AIS track history, geolocation and rule-engine results.
          </p>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({
  label,
  value,
  icon: Icon,
  valueClass = 'text-white',
  mono = false,
}) {
  return (
    <div className="p-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" />}

        <p
          className={`text-sm font-medium ${valueClass} ${
            mono ? 'font-mono' : ''
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function EvidenceCard({
  icon: Icon,
  title,
  label,
  description,
  status,
  statusClass = 'text-emerald-400',
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-300" />
        </div>

        <span
          className={`text-[9px] font-medium uppercase tracking-wider ${statusClass}`}
        >
          {status}
        </span>
      </div>

      <p className="mt-4 text-[9px] uppercase tracking-widest text-slate-600">
        {label}
      </p>

      <h3 className="mt-1 text-sm font-medium text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Unreviewed:
      'border-amber-500/20 bg-amber-500/10 text-amber-400',
    Confirmed:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    'False Positive':
      'border-slate-700 bg-slate-800 text-slate-400',
  }

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function SeverityBadge({ severity }) {
  return (
    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-400">
      {severity} Severity
    </span>
  )
}

function ReviewResult({
  icon: Icon,
  title,
  description,
  className,
  iconClass,
  titleClass,
}) {
  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />

        <div>
          <p className={`text-sm font-medium ${titleClass}`}>
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default IncidentDetails