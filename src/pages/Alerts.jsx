import { useMemo, useState } from 'react'

import AlertFilters from '../components/alerts/AlertFilter'
import AlertList from '../components/alerts/AlertList'

const alerts = [
  {
    id: 1,
    title: 'Unknown Vessel Detected',
    description:
      'AI detection identified a vessel operating without a matching AIS identity.',
    severity: 'High',
    status: 'Unreviewed',
    location: 'Offshore Zone A',
    time: '2 min ago',
    confidence: 94,
  },
  {
    id: 2,
    title: 'AIS Signal Lost',
    description:
      'A previously tracked vessel stopped transmitting AIS information.',
    severity: 'Medium',
    status: 'Under Review',
    location: 'Surveillance Zone B',
    time: '8 min ago',
    confidence: 87,
  },
  {
    id: 3,
    title: 'Route Deviation Detected',
    description:
      'Vessel movement differs significantly from its expected route.',
    severity: 'Medium',
    status: 'Unreviewed',
    location: 'Offshore Zone C',
    time: '15 min ago',
    confidence: 81,
  },
  {
    id: 4,
    title: 'Unusual Vessel Activity',
    description:
      'Movement pattern indicates extended activity within a monitored zone.',
    severity: 'Low',
    status: 'False Positive',
    location: 'Surveillance Zone A',
    time: '24 min ago',
    confidence: 72,
  },
]

function Alerts() {
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('all')
  const [status, setStatus] = useState('all')

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.title.toLowerCase().includes(search.toLowerCase()) ||
        alert.description.toLowerCase().includes(search.toLowerCase()) ||
        alert.location.toLowerCase().includes(search.toLowerCase())

      const matchesSeverity =
        severity === 'all' ||
        alert.severity.toLowerCase() === severity

      const matchesStatus =
        status === 'all' ||
        alert.status.toLowerCase().replace(' ', '-') === status

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      )
    })
  }, [search, severity, status])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm text-emerald-400">
          Incident Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-white">
          Alerts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review and investigate maritime surveillance alerts.
        </p>
      </div>

      {/* Filters */}
      <AlertFilters
        search={search}
        setSearch={setSearch}
        severity={severity}
        setSeverity={setSeverity}
        status={status}
        setStatus={setStatus}
      />

      {/* Alert List */}
      <AlertList alerts={filteredAlerts} />
    </div>
  )
}

export default Alerts