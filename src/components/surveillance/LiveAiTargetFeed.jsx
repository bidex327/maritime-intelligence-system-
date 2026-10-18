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
  Film,
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const MAX_VIDEO_SIZE = 100 * 1024 * 1024
const MAX_VIDEO_DURATION = 30
const VIDEO_EXTENSIONS = ['mp4', 'mov', 'avi']

function LiveAITargetFeed({ onDetectionResult }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)

  const isVideo = selectedFile
    ? VIDEO_EXTENSIONS.includes(
        selectedFile.name.split('.').pop()?.toLowerCase(),
      )
    : false

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  async function handleFileChange(event) {
    const file = event.target.files?.[0]

    // Allow selecting the same file again.
    event.target.value = ''

    if (!file) return

    const extension = file.name.split('.').pop()?.toLowerCase()
    const video = VIDEO_EXTENSIONS.includes(extension)
    const image = file.type.startsWith('image/')

    if (!image && !video) {
      setError('Please select an image or an MP4, MOV, or AVI video.')
      return
    }

    if (video && file.type && !file.type.startsWith('video/')) {
      setError('The selected video file type is not supported.')
      return
    }

    // Match the Python API limits: images 10 MB, videos 100 MB.
    const maxSize = video ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE

    if (file.size > maxSize) {
      setError(
        video
          ? 'Video size must not exceed 100 MB.'
          : 'Image size must not exceed 10 MB.',
      )
      return
    }

    if (video) {
      const temporaryUrl = URL.createObjectURL(file)

      try {
        const duration = await new Promise((resolve, reject) => {
          const videoElement = document.createElement('video')
          videoElement.preload = 'metadata'

          videoElement.onloadedmetadata = () => {
            resolve(videoElement.duration)
          }

          videoElement.onerror = () => {
            reject(new Error('The video could not be opened.'))
          }

          videoElement.src = temporaryUrl
        })

        if (!Number.isFinite(duration)) {
          setError('Could not determine the video duration.')
          return
        }

        if (duration > MAX_VIDEO_DURATION) {
          setError('Please choose a video that is 30 seconds or shorter.')
          return
        }
      } catch {
        setError(
          'Could not read this video. Try another MP4, MOV, or AVI file.',
        )
        return
      } finally {
        URL.revokeObjectURL(temporaryUrl)
      }
    }

    setSelectedFile(file)
    setResult(null)
    setError('')
  }

  async function handleDetection() {
    if (!selectedFile) {
      setError('Please select an image or video first.')
      return
    }

    if (!API_BASE_URL) {
      setError(
        'API URL is missing. Check your frontend environment settings.',
      )
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    const video = VIDEO_EXTENSIONS.includes(
      selectedFile.name.split('.').pop()?.toLowerCase(),
    )

    const endpoint = video ? '/detect-video' : '/detect'

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post(
        `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`,
        formData,
      )

      const data = response.data

      setResult(data)

      // Send real API results to the parent surveillance dashboard.
      onDetectionResult?.(data, video)
    } catch (err) {
      const detail = err.response?.data?.detail

      setError(
        typeof detail === 'string'
          ? detail
          : err.message || 'Detection failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const detections = result?.detections ?? []
  const frames = result?.frames ?? []
  const imageWidth = result?.image?.width ?? 0
  const imageHeight = result?.image?.height ?? 0

  const detectionCount = isVideo
    ? (result?.total_detections ?? 0)
    : (result?.detection_count ?? detections.length)

  function formatTimestamp(value) {
    if (typeof value === 'string' && value.includes(':')) {
      return value
    }

    const seconds = Number(value ?? 0)

    if (!Number.isFinite(seconds)) {
      return 'Unknown time'
    }

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = (seconds % 60).toFixed(1).padStart(4, '0')

    return `${minutes}:${remainingSeconds}`
  }

  function formatConfidence(confidence) {
    const value = Number(confidence)

    return Number.isFinite(value)
      ? `${(value * 100).toFixed(1)}%`
      : '—'
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            {isVideo ? (
              <Film className="h-5 w-5 text-emerald-400" />
            ) : (
              <Camera className="h-5 w-5 text-emerald-400" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              AI Vessel Detection
            </h3>
            <p className="text-xs text-slate-500">
              Analyse vessel images or short videos
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Circle
            className={`h-2.5 w-2.5 ${
              loading
                ? 'animate-pulse fill-amber-400 text-amber-400'
                : result?.success
                  ? 'fill-emerald-400 text-emerald-400'
                  : 'fill-slate-500 text-slate-500'
            }`}
          />

          <span className="text-xs font-medium text-slate-400">
            {loading
              ? 'ANALYSING'
              : result?.success
                ? 'ANALYSED'
                : 'READY'}
          </span>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {previewUrl ? (
          isVideo ? (
            <video
              src={previewUrl}
              controls
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <>
              <img
                src={previewUrl}
                alt="Selected vessel for AI detection"
                className="absolute inset-0 h-full w-full object-contain"
              />

              {result?.success &&
                imageWidth > 0 &&
                imageHeight > 0 &&
                detections.map((detection, index) => {
                  const { x1, y1, x2, y2 } = detection.bbox ?? {}

                  if (![x1, y1, x2, y2].every(Number.isFinite)) {
                    return null
                  }

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
                        {formatConfidence(detection.confidence)})
                      </span>

                      <ScanLine className="absolute right-1 top-1 h-3 w-3 text-emerald-300" />
                    </div>
                  )
                })}
            </>
          )
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Camera className="h-12 w-12 opacity-50" />
            <p className="text-sm">Select an image or video to begin</p>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-950/80 px-2.5 py-1.5 backdrop-blur-sm">
          {isVideo ? (
            <Film className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          )}

          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
            {isVideo ? 'Video Analysis' : 'Image Analysis'}
          </span>
        </div>

        {result?.success && (
          <div className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2 py-1">
            <span className="text-[10px] font-medium text-emerald-400">
              {detectionCount} detection(s)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-800 p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
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
            Choose Image / Video
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

        <p className="text-xs text-slate-500">
          Images up to 10 MB · MP4, MOV, AVI videos up to 30 seconds and 100 MB
        </p>

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

        {result?.success && (
          <>
            <div className="grid grid-cols-2 divide-x divide-slate-800 rounded-lg border border-slate-800">
              <div className="min-w-0 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  {isVideo ? 'Total Frame Detections' : 'Detected Targets'}
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  {detectionCount}
                </p>
              </div>

              <div className="min-w-0 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Model
                </p>

                <p className="mt-1 truncate text-sm font-medium text-emerald-400">
                  {result.model ?? 'Unknown'}
                </p>
              </div>
            </div>

            {isVideo ? (
              frames.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Video Frame Results
                  </h4>

                  {result.video?.frames_analysed != null && (
                    <p className="text-xs text-slate-500">
                      Frames analysed: {result.video.frames_analysed}
                    </p>
                  )}

                  {result.video?.duration_seconds != null && (
                    <p className="text-xs text-slate-500">
                      Video duration: {result.video.duration_seconds} seconds
                    </p>
                  )}

                  {frames.map((frame, frameIndex) => {
                    const frameDetections = frame.detections ?? []

                    return (
                      <div
                        key={`${frame.timestamp ?? frameIndex}`}
                        className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/70 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h5 className="text-sm font-semibold text-white">
                            Frame {frameIndex + 1}
                          </h5>

                          <span className="text-xs text-emerald-400">
                            {formatTimestamp(frame.timestamp)}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500">
                          {frame.detection_count ?? frameDetections.length}{' '}
                          detection(s)
                        </p>

                        {frameDetections.length > 0 ? (
                          frameDetections.map((detection, index) => (
                            <div
                              key={`${detection.class_id}-${index}`}
                              className="flex items-center justify-between gap-3 border-t border-slate-800 pt-2"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm text-white">
                                  {detection.class_name ?? 'Unknown vessel'}
                                </p>

                                {detection.class_id != null && (
                                  <p className="text-xs text-slate-500">
                                    Class ID: {detection.class_id}
                                  </p>
                                )}
                              </div>

                              <span className="shrink-0 text-sm font-semibold text-emerald-400">
                                {formatConfidence(detection.confidence)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500">
                            No vessels detected in this frame.
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  {detectionCount > 0
                    ? `${detectionCount} detections were returned, but the API response did not include a frames list.`
                    : 'No vessels were detected in this video.'}
                </p>
              )
            ) : detections.length > 0 ? (
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
                        {detection.class_name ?? 'Unknown vessel'}
                      </p>

                      <p className="text-xs text-slate-500">
                        Class ID: {detection.class_id ?? 'Unknown'}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-emerald-400">
                      {formatConfidence(detection.confidence)}
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