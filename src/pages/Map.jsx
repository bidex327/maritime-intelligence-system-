import {
  AlertTriangle,
  Crosshair,
  Layers3,
  MapPin,
  Navigation,
  Radio,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Video,
} from 'lucide-react'

const vessels = [
  {
    id: 1,
    name: 'MT Ocean Star',
    type: 'Tanker',
    status: 'Normal',
    speed: '11.8 kn',
    position: { left: '23%', top: '34%' },
  },
  {
    id: 2,
    name: 'MV Atlantic',
    type: 'Cargo',
    status: 'Monitoring',
    speed: '8.4 kn',
    position: { left: '57%', top: '27%' },
  },
  {
    id: 3,
    name: 'Unknown Vessel',
    type: 'Unknown',
    status: 'Alert',
    speed: '12.4 kn',
    position: { left: '72%', top: '64%' },
  },
  {
    id: 4,
    name: 'MT Horizon',
    type: 'Tanker',
    status: 'Normal',
    speed: '9.7 kn',
    position: { left: '39%', top: '72%' },
  },
]

const zones = [
  {
    name: 'Zone A',
    status: 'Monitored',
    position: 'left-[13%] top-[22%]',
    size: 'h-44 w-60',
  },
  {
    name: 'Zone B',
    status: 'Restricted',
    position: 'right-[14%] top-[24%]',
    size: 'h-48 w-64',
  },
  {
    name: 'Zone C',
    status: 'Monitored',
    position: 'left-[31%] bottom-[12%]',
    size: 'h-36 w-56',
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

function Map() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 shrink-0 text-emerald-400" />

            <p className="text-sm text-emerald-400">
              Operational Picture
            </p>
          </div>

          <h1 className="mt-1 text-2xl font-semibold text-white">
            Maritime Map
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
            Monitor vessel positions, surveillance zones and active incidents
            across the operational area.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <FeedIndicator
            icon={Radio}
            label="AIS"
          />

          <FeedIndicator
            icon={Video}
            label="Drone"
          />
        </div>
      </div>

      {/* Operational Map */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {/* Map Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

              <span className="text-xs font-medium text-slate-300">
                Gulf of Guinea
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-wider text-slate-600">
              Live Operational View
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapControl icon={ZoomIn} label="Zoom in" />
            <MapControl icon={ZoomOut} label="Zoom out" />
            <MapControl icon={Crosshair} label="Center map" />
            <MapControl icon={RotateCcw} label="Reset view" />
          </div>
        </div>

        {/* Map Surface */}
        <div className="relative h-[560px] overflow-hidden bg-slate-950">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(51,65,85,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(51,65,85,0.35) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Subtle map lines */}
          <div className="absolute left-[-10%] top-[40%] h-px w-[120%] rotate-[-8deg] bg-slate-800" />
          <div className="absolute left-[-10%] top-[62%] h-px w-[120%] rotate-[6deg] bg-slate-800" />
          <div className="absolute left-[42%] top-[-10%] h-[120%] w-px rotate-[12deg] bg-slate-800" />

          {/* Radar rings */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />
          <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

          {/* Surveillance Zones */}
          {zones.map((zone) => (
            <div
              key={zone.name}
              className={`absolute ${zone.position} ${zone.size} rounded-full border border-emerald-500/10 bg-emerald-500/[0.015]`}
            >
              <div className="absolute left-4 top-4 rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1 backdrop-blur-sm">
                <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                  {zone.name}
                </p>

                <p className="mt-0.5 text-[9px] text-emerald-400">
                  {zone.status}
                </p>
              </div>
            </div>
          ))}

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute h-px w-12 bg-emerald-400/20" />
              <span className="absolute h-12 w-px bg-emerald-400/20" />

              <Crosshair className="relative h-6 w-6 text-emerald-400/70" />
            </div>
          </div>

          {/* Vessel Markers */}
          {vessels.map((vessel) => {
            const styles = statusStyles[vessel.status]
            const leftValue = parseFloat(vessel.position.left)
            const opensLeft = leftValue > 55

            return (
              <div
                key={vessel.id}
                className="absolute"
                style={{
                  left: vessel.position.left,
                  top: vessel.position.top,
                }}
              >
                {/* Track Line */}
                <div className="absolute left-2 top-2 h-20 w-px origin-top rotate-[-55deg] bg-slate-700/60" />

                {/* Marker */}
                <div
                  className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 ring-4 ${styles.ring}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                  />

                  {vessel.status === 'Alert' && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500/25" />
                  )}
                </div>

                {/* Vessel Card */}
                <div
                  className={`absolute top-[-8px] z-20 w-40 rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-sm ${
                    opensLeft ? 'right-8' : 'left-8'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-white">
                        {vessel.name}
                      </p>

                      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
                        {vessel.type}
                      </p>
                    </div>

                    <span
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2">
                    <span className="text-[9px] text-slate-600">
                      Speed
                    </span>

                    <span className="font-mono text-[10px] text-slate-400">
                      {vessel.speed}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[9px] text-slate-600">
                      Status
                    </span>

                    <span
                      className={`text-[9px] font-medium ${styles.text}`}
                    >
                      {vessel.status}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Active Incident */}
          <div className="absolute bottom-6 left-6 w-64 max-w-[calc(100%-3rem)] rounded-xl border border-red-500/20 bg-slate-950/90 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-white">
                  Active Incident
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Unknown vessel detected in Offshore Zone A.
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                  <span className="text-[9px] uppercase tracking-wider text-red-400">
                    High Severity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-6 right-6 hidden rounded-lg border border-slate-800 bg-slate-950/85 px-3 py-2 backdrop-blur-sm sm:block">
            <p className="font-mono text-[10px] text-slate-500">
              04° 15′ N / 07° 31′ E
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
              Operational Reference
            </p>
          </div>

          {/* Map Label */}
          <div className="absolute left-6 top-6 rounded-lg border border-slate-800 bg-slate-950/85 px-3 py-2 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-widest text-slate-600">
              Surveillance Area
            </p>

            <p className="mt-1 text-xs font-medium text-slate-300">
              Maritime Operations Zone
            </p>
          </div>

          {/* Legend */}
          <div className="absolute right-6 top-6 rounded-lg border border-slate-800 bg-slate-950/90 p-3 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Layers3 className="h-3.5 w-3.5 text-slate-500" />

              <span className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                Map Legend
              </span>
            </div>

            <div className="space-y-2">
              <LegendItem color="bg-emerald-400" label="Normal" />
              <LegendItem color="bg-amber-400" label="Monitoring" />
              <LegendItem color="bg-red-500" label="Alert" />
            </div>
          </div>
        </div>

        {/* Map Metrics */}
        <div className="grid border-t border-slate-800 sm:grid-cols-3">
          <MapMetric label="Tracked Vessels" value="128" />

          <MapMetric
            label="Active Surveillance Zones"
            value="06"
          />

          <MapMetric
            label="Active Incidents"
            value="04"
            valueClass="text-red-400"
          />
        </div>
      </section>
    </div>
  )
}

function FeedIndicator({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </div>
  )
}

function MapControl({ icon: Icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-500 transition hover:border-slate-700 hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />

      <span className="text-[10px] text-slate-500">
        {label}
      </span>
    </div>
  )
}

function MapMetric({
  label,
  value,
  valueClass = 'text-white',
}) {
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

export default Map