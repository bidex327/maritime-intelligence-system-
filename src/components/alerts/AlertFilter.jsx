import { Search, SlidersHorizontal } from 'lucide-react'

function AlertFilters({
  search,
  setSearch,
  severity,
  setSeverity,
  status,
  setStatus,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search alerts..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-emerald-500"
          >
            <option value="all">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="unreviewed">Unreviewed</option>
            <option value="under-review">Under Review</option>
            <option value="confirmed">Confirmed</option>
            <option value="false-positive">False Positive</option>
          </select>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 transition hover:border-slate-700 hover:text-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertFilters