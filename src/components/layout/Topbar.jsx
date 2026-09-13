import { Bell, Search } from 'lucide-react'

function Topbar() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6 pl-18 lg:pl-6">
      {/* Page Context */}
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
          Operations Center
        </p>

        <h2 className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
          Maritime Surveillance
        </h2>
      </div>

      {/* Actions */}
      <div className="ml-4 flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Analyst */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Analyst
            </p>

            <p className="text-xs text-slate-500">
              Operations
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar