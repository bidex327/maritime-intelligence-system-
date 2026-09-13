
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Radar,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const alertTrend = [
  { day: 'Mon', alerts: 8 },
  { day: 'Tue', alerts: 12 },
  { day: 'Wed', alerts: 9 },
  { day: 'Thu', alerts: 15 },
  { day: 'Fri', alerts: 11 },
  { day: 'Sat', alerts: 17 },
  { day: 'Sun', alerts: 14 },
]

const vesselActivity = [
  { zone: 'Zone A', vessels: 38 },
  { zone: 'Zone B', vessels: 27 },
  { zone: 'Zone C', vessels: 34 },
  { zone: 'Zone D', vessels: 29 },
]

const severityData = [
  { name: 'High', value: 18 },
  { name: 'Medium', value: 42 },
  { name: 'Low', value: 26 },
]

const detectionSources = [
  {
    name: 'AIS',
    value: 45,
    description: 'Vessel identity and movement data',
  },
  {
    name: 'Drone',
    value: 30,
    description: 'Aerial detection observations',
  },
  {
    name: 'Fusion',
    value: 25,
    description: 'Cross-sensor correlation',
  },
]

const severityColors = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#64748b',
}

function Analytics() {
  return (
    <div className="min-w-0 space-y-6">
      {/* Page Header */}
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 shrink-0 text-emerald-400" />

            <p className="text-sm text-emerald-400">
              Intelligence Analysis
            </p>
          </div>

          <h1 className="mt-1 text-2xl font-semibold text-white">
            Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
            Analyze surveillance activity, alert patterns and detection
            performance across the operational area.
          </p>
        </div>

        <div className="flex w-fit max-w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
          <Activity className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            Analysis Period
          </span>

          <span className="whitespace-nowrap text-xs font-medium text-slate-300">
            Last 7 Days
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={AlertTriangle}
          label="Total Alerts"
          value="86"
          description="Across monitored zones"
        />

        <MetricCard
          icon={Radar}
          label="Vessels Monitored"
          value="128"
          description="Currently tracked"
        />

        <MetricCard
          icon={CheckCircle2}
          label="Confirmed Incidents"
          value="21"
          description="Analyst verified"
          valueClass="text-emerald-400"
        />

        <MetricCard
          icon={TrendingUp}
          label="Detection Accuracy"
          value="91%"
          description="Current system performance"
          valueClass="text-emerald-400"
        />
      </div>

      {/* Alert Trend */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <SectionHeader
          icon={TrendingUp}
          title="Alert Trend"
          description="Number of surveillance alerts generated over the selected period."
          badge="7 Day Trend"
        />

        <div className="h-80 min-w-0 p-4 sm:p-6">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={alertTrend}>
              <CartesianGrid
                stroke="#1e293b"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />

              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />

              <Tooltip
                contentStyle={{
                  background: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                labelStyle={{
                  color: '#94a3b8',
                  fontSize: 11,
                }}
              />

              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#34d399"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: '#34d399',
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Activity + Severity */}
      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        {/* Vessel Activity */}
        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <SectionHeader
            icon={Radar}
            title="Vessel Activity"
            description="Tracked vessel distribution by surveillance zone."
            badge="128 Tracked"
          />

          <div className="h-72 min-w-0 p-4 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={vesselActivity}>
                <CartesianGrid
                  stroke="#1e293b"
                  vertical={false}
                />

                <XAxis
                  dataKey="zone"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip
                  contentStyle={{
                    background: '#020617',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />

                <Bar
                  dataKey="vessels"
                  fill="#38bdf8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Alert Severity */}
        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <SectionHeader
            icon={ShieldAlert}
            title="Alert Severity"
            description="Distribution of alerts by severity classification."
            badge="86 Alerts"
          />

          <div className="flex min-h-72 flex-col items-center justify-center gap-5 p-4 sm:flex-row sm:p-6">
            <div className="h-52 w-full max-w-xs shrink-0">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={severityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                  >
                    {severityData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={severityColors[entry.name]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: 11,
                      color: '#94a3b8',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full max-w-xs space-y-3 sm:w-auto">
              {severityData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        severityColors[item.name],
                    }}
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-300">
                      {item.name}
                    </p>

                    <p className="text-[10px] text-slate-600">
                      {item.value} alerts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Detection Sources */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <SectionHeader
          icon={Radar}
          title="Detection Sources"
          description="Contribution of each surveillance source to generated intelligence."
          badge="Source Contribution"
        />

        <div className="grid divide-y divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {detectionSources.map((source) => (
            <SourceCard
              key={source.name}
              source={source}
            />
          ))}
        </div>
      </section>

      {/* Intelligence Note */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-400">
            Analytics Note
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Current analytics are based on simulated surveillance data.
            Production analytics will be generated from historical AIS,
            drone detection, fusion and analyst review records.
          </p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  valueClass = 'text-white',
}) {
  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900 p-4 transition duration-200 hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <p
            className={`mt-2 text-2xl font-semibold tracking-tight ${valueClass}`}
          >
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-400 transition group-hover:text-slate-300" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-600">
        {description}
      </p>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  badge,
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-300" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <span className="w-fit shrink-0 rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-[9px] uppercase tracking-wider text-slate-600">
        {badge}
      </span>
    </div>
  )
}

function SourceCard({ source }) {
  return (
    <div className="min-w-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">
            {source.name}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            {source.description}
          </p>
        </div>

        <span className="shrink-0 text-lg font-semibold text-slate-300">
          {source.value}%
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${source.value}%` }}
        />
      </div>
    </div>
  )
}

export default Analytics
