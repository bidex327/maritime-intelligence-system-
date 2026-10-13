
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  Camera,
  Circle,
  ScanLine,
  Wifi,
  Upload,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function LiveAITargetFeed() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    setSelectedFile(file)
    setResult(null)
    setError('')
  }

  async function handleDetection() {
    if (!selectedFile) {
      setError('Please select a vessel image first.')
      return
    }

    if (!API_BASE_URL) {
      setError('API URL is missing. Check your frontend .env.local file.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post(
        `${API_BASE_URL.replace(/\/$/, '')}/detect`,
        formData,
      )

      setResult(response.data)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          'Detection failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const detections = result?.detections ?? []
  const imageWidth = result?.image?.width ?? 0
  const imageHeight = result?.image?.height ?? 0

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <Camera className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              AI Vessel Detection
            </h3>
            <p className="text-xs text-slate-500">
              Upload an image for analysis
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Circle
            className={`h-2.5 w-2.5 ${
              result
                ? 'fill-emerald-400 text-emerald-400'
                : 'fill-slate-500 text-slate-500'
            }`}
          />
          <span className="text-xs font-medium text-slate-400">
            {loading ? 'ANALYSING' : result ? 'ANALYSED' : 'READY'}
          </span>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Selected vessel for AI detection"
              className="absolute inset-0 h-full w-full object-contain"
            />

            {result &&
              imageWidth > 0 &&
              imageHeight > 0 &&
              detections.map((detection, index) => {
                const { x1, y1, x2, y2 } = detection.bbox

                return (
                  <div
                    key={`${detection.class_id}-${index}`}
                    className="absolute border-2 border-emerald-400"
                    style={{
                      left: `${(x1 / imageWidth) * 100}%`,
                      top: `${(y1 / imageHeight) * 100}%`,
                      width: `${((x2 - x1) / imageWidth) * 100}%`,
                      height: `${((y2 - y1) / imageHeight) * 100}%`,
                    }}
                  >
                    <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-emerald-400 px-1.5 py-1 text-[10px] font-semibold text-slate-950">
                      {detection.class_name} (
                      {(detection.confidence * 100).toFixed(1)}%)
                    </span>

                    <ScanLine className="absolute right-1 top-1 h-3 w-3 text-emerald-300" />
                  </div>
                )
              })}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Camera className="h-12 w-12 opacity-50" />
            <p className="text-sm">Select an image to begin detection</p>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-950/80 px-2.5 py-1.5 backdrop-blur-sm">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
            Image Analysis
          </span>
        </div>

        {result && (
          <div className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2 py-1">
            <span className="text-[10px] font-medium text-emerald-400">
              {result.detection_count} detection(s)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-800 p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            Choose Image
          </button>

          <button
            type="button"
            onClick={handleDetection}
            disabled={!selectedFile || loading}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ScanLine className="h-4 w-4" />
            )}
            {loading ? 'Analysing...' : 'Detect Vessels'}
          </button>
        </div>

        {selectedFile && (
          <p className="truncate text-xs text-slate-400">
            Selected: {selectedFile.name}
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <>
            <div className="grid grid-cols-2 divide-x divide-slate-800 rounded-lg border border-slate-800">
              <div className="min-w-0 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Detected Targets
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {result.detection_count}
                </p>
              </div>

              <div className="min-w-0 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Model
                </p>
                <p className="mt-1 truncate text-sm font-medium text-emerald-400">
                  {result.model}
                </p>
              </div>
            </div>

            {detections.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Detection Results
                </h4>

                {detections.map((detection, index) => (
                  <div
                    key={`${detection.class_id}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {detection.class_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Class ID: {detection.class_id}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-emerald-400">
                      {(detection.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No vessels were detected in this image.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default LiveAITargetFeed
