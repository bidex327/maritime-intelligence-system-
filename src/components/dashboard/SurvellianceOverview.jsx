
import {
  Crosshair,
  Radio,
  Video,
  Navigation,
  Activity,
} from 'lucide-react'
import { useState } from 'react'

import LiveAITargetFeed from '../surveillance/LiveAiTargetFeed'

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
  const [detectionData, setDetectionData] = useState(null)

  function handleDetectionResult(result, isVideo) {
    setDetectionData({ result, isVideo })
  }

  const result = detectionData?.result
  const isVideo = detectionData?.isVideo ?? false

  const detections = result?.detections ?? []
  const frames = result?.frames ?? []

  const totalDetections = isVideo
    ? (result?.total_detections ??
      frames.reduce(
        (total, frame) =>
          total + (frame.detections?.length ?? 0),
        0
      ))
    : (result?.detection_count ?? detections.length)

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 shrink-0 text-emerald-400" />

            <h2 className="text-base font-semibold text-white">
              Surveillance Overview
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Live maritime activity monitoring and AI-assisted target detection
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FeedStatus icon={Radio} label="AIS" status="Online" />
          <FeedStatus icon={Video} label="Drone" status="Online" />
        </div>
      </div>

      {/* Map + AI Monitor */}
      <div className="grid gap-4 bg-slate-950 p-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Operational Map */}
        <div className="relative h-[420px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
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

          {/* Operational area */}
          <div className="absolute left-5 top-5 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-widest text-slate-600">
              Operational Area
            </p>
            <p className="mt-1 text-xs font-medium text-slate-300">
              Gulf of Guinea
            </p>
          </div>

          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
            <Navigation className="h-3 w-3 shrink-0 text-emerald-400" />
            <span className="text-[10px] text-slate-500">
              LIVE TRACKING
            </span>
          </div>

          {/* Detection summary */}
          <div className="absolute left-5 top-24 z-10 w-56 rounded-lg border border-slate-800 bg-slate-900/95 p-3 shadow-xl">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-white">
                AI Detections
              </p>
              <span className="rounded bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                {isVideo ? 'VIDEO' : 'IMAGE'}
              </span>
            </div>

            <p className="mt-2 text-2xl font-semibold text-white">
              {result ? totalDetections : '--'}
            </p>

            <p className="text-[10px] text-slate-500">
              {result
                ? 'Objects detected by the AI model'
                : 'Waiting for image or video analysis'}
            </p>

            {result?.model && (
              <p className="mt-2 truncate text-[10px] text-slate-500">
                Model: {result.model}
              </p>
            )}
          </div>

          {/* Actual detection markers */}
          {detections.map((detection, index) => {
            const bbox = detection.bbox

            // These are visual indicators only. They are not
            // geographic vessel coordinates.
            const left = bbox
              ? Math.min(
                  88,
                  Math.max(12, ((bbox.x1 + bbox.x2) / 2 /
                    (result?.image?.width || 1)) * 100)
                )
              : 20 + (index % 4) * 18

            const top = bbox
              ? Math.min(
                  85,
                  Math.max(25, ((bbox.y1 + bbox.y2) / 2 /
                    (result?.image?.height || 1)) * 100)
                )
              : 40 + (index % 3) * 12

            return (
              <div
                key={`${detection.class_id}-${index}`}
                className="absolute z-10"
                style={{ left: `${left}%`, top: `${top}%` }}
                title={`${detection.class_name} - ${(detection.confidence * 100).toFixed(1)}% confidence`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 ring-2 ring-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </span>
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
        </div>

        {/* AI Monitor and detection results */}
        <div className="flex min-w-0 flex-col gap-3">
          <LiveAITargetFeed
            onDetectionResult={handleDetectionResult}
          />

          {/* Detection list */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white">
                Detection Results
              </h3>

              {result && (
                <span className="text-[10px] text-slate-400">
                  {totalDetections} total
                </span>
              )}
            </div>

            {!result ? (
              <p className="text-xs text-slate-500">
                Upload an image or video using the AI Monitor to see results.
              </p>
            ) : isVideo ? (
              frames.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No video frames were returned.
                </p>
              ) : (
                <div className="max-h-72 space-y-3 overflow-y-auto">
                  {frames.map((frame, frameIndex) => (
                    <div
                      key={`${frame.timestamp}-${frameIndex}`}
                      className="border-b border-slate-800 pb-3 last:border-b-0"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-300">
                          Timestamp: {frame.timestamp ?? 0}s
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {frame.detection_count ??
                            frame.detections?.length ??
                            0}{' '}
                          detected
                        </span>
                      </div>

                      {frame.detections?.length ? (
                        frame.detections.map((detection, index) => (
                          <DetectionItem
                            key={`${detection.class_id}-${index}`}
                            detection={detection}
                          />
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">
                          No vessels detected in this frame.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : detections.length === 0 ? (
              <p className="text-xs text-slate-500">
                The model analysed the image but found no objects above its confidence threshold.
              </p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto">
                {detections.map((detection, index) => (
                  <DetectionItem
                    key={`${detection.class_id}-${index}`}
                    detection={detection}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status legend below AI Monitor */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-3 text-xs font-semibold text-slate-300">
              Status Legend
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-3">
              <LegendItem color="bg-emerald-400" label="Normal" />
              <LegendItem color="bg-amber-400" label="Monitoring" />
              <LegendItem color="bg-red-500" label="Alert" />
            </div>

            <p className="mt-3 text-[10px] text-slate-500">
              Risk statuses require separate maritime risk rules.
              Detection confidence alone does not establish risk.
            </p>
          </div>
        </div>
      </div>

      {/* Footer metrics */}
      <div className="grid border-t border-slate-800 sm:grid-cols-3">
        <OverviewMetric
          label="Detected Objects"
          value={result ? totalDetections : '--'}
        />

        <OverviewMetric label="Active Zones" value="06" />

        <OverviewMetric
          label="Detection Status"
          value={result ? 'Analysis received' : 'Awaiting analysis'}
          valueClass={result ? 'text-emerald-400' : 'text-amber-400'}
        />
      </div>
    </section>
  )
}

function DetectionItem({ detection }) {
  const confidence = Number(detection.confidence)

  return (
    <div className="mb-2 rounded-md border border-slate-800 bg-slate-800/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-white">
          {detection.class_name ?? 'Unknown vessel'}
        </p>

        <span className="shrink-0 text-[10px] text-emerald-400">
          {Number.isFinite(confidence)
            ? `${(confidence * 100).toFixed(1)}%`
            : 'N/A'}
        </span>
      </div>

      <p className="mt-1 text-[10px] text-slate-500">
        Class ID: {detection.class_id ?? 'N/A'}
      </p>

      {detection.bbox && (
        <p className="mt-1 text-[10px] text-slate-500">
          Bounding box: {Math.round(detection.bbox.x1)},{' '}
          {Math.round(detection.bbox.y1)} –{' '}
          {Math.round(detection.bbox.x2)},{' '}
          {Math.round(detection.bbox.y2)}
        </p>
      )}
    </div>
  )
}

function FeedStatus({ icon: Icon, label, status }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

      <span className="text-xs text-slate-400">{label}</span>

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
      <span className="text-[10px] text-slate-400">{label}</span>
    </div>
  )
}

function OverviewMetric({
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

export default SurveillanceOverview
