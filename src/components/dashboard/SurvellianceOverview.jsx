
import {
  Crosshair,
  Radio,
  Video,
  Navigation,
  Activity,
} from 'lucide-react'

const vessels = [
  {
    id: 1,
    name: 'MT Ocean Star',
    type: 'Tanker',
    status: 'Normal',
    position: { left: '28%', top: '32%' },
  },
  {
    id: 2,
    name: 'MV Atlantic',
    type: 'Cargo',
    status: 'Monitoring',
    position: { left: '58%', top: '48%' },
  },
  {
    id: 3,
    name: 'Unknown Vessel',
    type: 'Unknown',
    status: 'Alert',
    position: { left: '76%', top: '68%' },
  },
]

const statusStyles = {
  Normal: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    ring: 'ring-emerald-400/20',
  },
  Monitoring: {
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    ring: 'ring-amber-400/20',
  },
  Alert: {
    dot: 'bg-red-500',
    text: 'text-red-400',
    ring: 'ring-red-500/20',
  },
}

function SurveillanceOverview() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />

            <h2 className="text-base font-semibold text-white">
              Surveillance Overview
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Live maritime activity monitoring and vessel tracking
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FeedStatus
            icon={Radio}
            label="AIS"
            status="Online"
          />

          <FeedStatus
            icon={Video}
            label="Drone"
            status="Online"
          />
        </div>
      </div>

      {/* Operational Map */}
      <div className="relative h-[420px] overflow-hidden bg-slate-950">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(51,65,85,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(51,65,85,0.35) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Zone boundaries */}
        <div className="absolute left-[12%] top-[18%] h-52 w-64 rounded-full border border-emerald-500/10" />

        <div className="absolute right-[10%] top-[30%] h-48 w-56 rounded-full border border-amber-500/10" />

        {/* Radar rings */}
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

        {/* Radar crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute h-px w-8 bg-emerald-400/30" />
            <span className="absolute h-8 w-px bg-emerald-400/30" />

            <Crosshair className="relative h-5 w-5 text-emerald-400" />
          </div>
        </div>

        {/* Coordinates */}
        <div className="absolute left-5 top-5 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
          <p className="text-[9px] uppercase tracking-widest text-slate-600">
            Operational Area
          </p>

          <p className="mt-1 text-xs font-medium text-slate-300">
            Gulf of Guinea
          </p>
        </div>

        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
          <Navigation className="h-3 w-3 text-emerald-400" />

          <span className="text-[10px] text-slate-500">
            LIVE TRACKING
          </span>
        </div>

        {/* Vessel markers */}
        {vessels.map((vessel) => {
          const styles = statusStyles[vessel.status]

          return (
            <div
              key={vessel.id}
              className="absolute"
              style={{
                left: vessel.position.left,
                top: vessel.position.top,
              }}
            >
              {/* Marker */}
              <div
                className={`relative flex h-5 w-5 items-center justify-center rounded-full ring-4 ${styles.ring}`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                />

                {vessel.status === 'Alert' && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-500/30" />
                )}
              </div>

              {/* Vessel information */}
              <div className="absolute left-7 top-[-8px] min-w-36 rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-white">
                    {vessel.name}
                  </p>

                  <span
                    className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                  />
                </div>

                <div className="mt-1 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-slate-500">
                    {vessel.type}
                  </p>

                  <p className={`text-[10px] font-medium ${styles.text}`}>
                    {vessel.status}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Bottom information */}
        <div className="absolute bottom-5 left-5">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Surveillance Zone
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Maritime Operations Area
          </p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-5 right-5 flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
          <LegendItem
            color="bg-emerald-400"
            label="Normal"
          />

          <LegendItem
            color="bg-amber-400"
            label="Monitoring"
          />

          <LegendItem
            color="bg-red-500"
            label="Alert"
          />
        </div>
      </div>

      {/* Footer metrics */}
      <div className="grid border-t border-slate-800 sm:grid-cols-3">
        <OverviewMetric
          label="Tracked Vessels"
          value="128"
        />

        <OverviewMetric
          label="Active Zones"
          value="06"
        />

        <OverviewMetric
          label="Detection Status"
          value="Operational"
          valueClass="text-emerald-400"
        />
      </div>
    </section>
  )
}

function FeedStatus({ icon: Icon, label, status }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
      <Icon className="h-3.5 w-3.5 text-emerald-400" />

      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {status}
      </span>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />

      <span className="text-[10px] text-slate-500">
        {label}
      </span>
    </div>
  )
}

function OverviewMetric({ label, value, valueClass = 'text-white' }) {
  return (
    <div className="border-b border-slate-800 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className={`mt-1 text-sm font-semibold ${valueClass}`}>
        {value}
      </p>
    </div>
  )
}

export default SurveillanceOverview
