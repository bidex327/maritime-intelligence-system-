import {
  AlertTriangle,
  MapPin,
  Clock,
  Ship,
  Radio,
  Video,
  BrainCircuit,
} from 'lucide-react'

function IncidentDetails() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm text-emerald-400">
          Incident Investigation
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-white">
            Unknown Vessel Detected
          </h1>

          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
            High
          </span>

          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
            Unreviewed
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Review the evidence and intelligence associated with this incident.
        </p>
      </div>

      {/* Incident Summary */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Incident Summary
          </h2>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Incident ID</p>
            <p className="mt-1 text-sm font-medium text-white">
              INC-2026-001
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Detected</p>
            <div className="mt-1 flex items-center gap-2 text-sm text-white">
              <Clock className="h-4 w-4 text-slate-500" />
              18:40:12
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500">Location</p>
            <div className="mt-1 flex items-center gap-2 text-sm text-white">
              <MapPin className="h-4 w-4 text-slate-500" />
              Offshore Zone A
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500">Confidence</p>
            <p className="mt-1 text-sm font-medium text-emerald-400">
              94%
            </p>
          </div>
        </div>
      </section>

      {/* Detection Evidence */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Detection Evidence
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Sources contributing to this incident
          </p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <Video className="h-5 w-5 text-emerald-400" />

            <h3 className="mt-3 text-sm font-medium text-white">
              Drone Detection
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Vessel detected from aerial surveillance footage.
            </p>

            <p className="mt-3 text-xs font-medium text-emerald-400">
              Confidence: 96%
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <Radio className="h-5 w-5 text-emerald-400" />

            <h3 className="mt-3 text-sm font-medium text-white">
              AIS Correlation
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              No matching AIS identity was found for the detected vessel.
            </p>

            <p className="mt-3 text-xs font-medium text-yellow-400">
              Mismatch detected
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <BrainCircuit className="h-5 w-5 text-emerald-400" />

            <h3 className="mt-3 text-sm font-medium text-white">
              Fusion Analysis
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Multiple surveillance signals contributed to the alert.
            </p>

            <p className="mt-3 text-xs font-medium text-emerald-400">
              Confidence: 94%
            </p>
          </div>
        </div>
      </section>

      {/* Vessel Information */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Vessel Information
          </h2>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Vessel Name</p>
            <p className="mt-1 text-sm font-medium text-white">
              Unknown
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Vessel Type</p>
            <div className="mt-1 flex items-center gap-2 text-sm text-white">
              <Ship className="h-4 w-4 text-slate-500" />
              Unknown
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500">AIS Status</p>
            <p className="mt-1 text-sm font-medium text-red-400">
              No Signal
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Zone</p>
            <p className="mt-1 text-sm font-medium text-white">
              Offshore Zone A
            </p>
          </div>
        </div>
      </section>

      {/* Analyst Review */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Analyst Review
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Human verification is required before final classification.
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />

            <div>
              <p className="text-sm font-medium text-white">
                Human verification required
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                This incident has been automatically detected by the
                surveillance system. An analyst must review the available
                evidence before confirming or dismissing the alert.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IncidentDetails