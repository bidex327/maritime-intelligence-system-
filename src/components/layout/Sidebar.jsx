import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Bell,
  Map,
  BarChart3,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Alerts',
    path: '/alerts',
    icon: Bell,
  },
  {
    name: 'Map',
    path: '/map',
    icon: Map,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
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

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
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

      {/* System Status */}
      <div className="border-t border-slate-800 p-4">
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
  )
}

export default Sidebar