

import OperationalActivity from '../components/dashboard/OperationalActivity'
import RecentAlerts from '../components/dashboard/RecentAlerts'
import SurveillanceOverview from '../components/dashboard/SurvellianceOverview'
import StatCard from '../components/dashboard/StatCard'

const statistics = [
  {
    title: 'Active Vessels',
    value: '128',
    description: 'Vessels currently being tracked',
    type: 'vessels',
  },
  {
    title: 'Active Alerts',
    value: '12',
    description: 'Incidents requiring attention',
    type: 'alerts',
  },
  {
    title: 'High Severity',
    value: '4',
    description: 'Critical incidents detected',
    type: 'critical',
  },
  {
    title: 'Surveillance Coverage',
    value: '94%',
    description: 'Current monitoring coverage',
    type: 'coverage',
  },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm text-emerald-400">
          Live Operations
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-white">
          Surveillance Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor maritime activity, vessel movements and security alerts.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            type={stat.type}
          />
        ))}
      </div>

      {/* Surveillance Overview */}
      <SurveillanceOverview />

      {/*RecentAlerts*/}
      <RecentAlerts/>

      {/*OperationalActivity*/}
      <OperationalActivity/>
    </div>
  )
}

export default Dashboard
