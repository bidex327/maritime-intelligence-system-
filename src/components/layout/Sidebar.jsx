
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Bell,
  Map,
  BarChart3,
  Settings,
  ShieldCheck,
  Menu,
  X,
  Camera,
  Radio,
  ScanLine,
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Map', path: '/map', icon: Map },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 shadow-lg transition hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-sm font-semibold text-white">
                Surveillance
              </h1>

              <p className="text-xs text-slate-500">
                Intelligence Platform
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-900 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* AI Monitor */}
        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/70">
            {/* AI Monitor Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-emerald-400" />

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  AI Monitor
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[10px] font-semibold text-emerald-400">
                  LIVE
                </span>
              </div>
            </div>

            {/* Detection Summary */}
            <div className="space-y-3 p-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Active Target
                  </span>

                  <ScanLine className="h-3.5 w-3.5 text-emerald-400" />
                </div>

                <p className="truncate text-sm font-medium text-white">
                  Unknown Vessel
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Vessel detected
                </p>
              </div>

              {/* Detection Metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-slate-800 bg-slate-950/70 p-2">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Confidence
                  </p>

                  <p className="mt-1 text-xs font-semibold text-emerald-400">
                    94%
                  </p>
                </div>

                <div className="rounded-md border border-slate-800 bg-slate-950/70 p-2">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 text-xs font-semibold text-emerald-400">
                    Tracking
                  </p>
                </div>
              </div>

              {/* Camera Status */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-emerald-400" />

                  <span className="text-[10px] text-slate-400">
                    Drone Camera 01
                  </span>
                </div>

                <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-auto border-t border-slate-800 p-4">
          <div className="rounded-lg bg-slate-900 p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-slate-300">
                System Operational
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Monitoring active
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
