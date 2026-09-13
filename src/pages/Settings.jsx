
import { useState } from 'react'
import {
  Activity,
  Bell,
  Database,
  Globe,
  Radio,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Video,
} from 'lucide-react'

function Settings() {
  const [highSeverity, setHighSeverity] = useState(90)
  const [aisTimeout, setAisTimeout] = useState(10)
  const [aisEnabled, setAisEnabled] = useState(true)
  const [droneEnabled, setDroneEnabled] = useState(true)
  const [highSeverityNotifications, setHighSeverityNotifications] = useState(true)
  const [aisNotifications, setAisNotifications] = useState(true)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4 text-emerald-400" />

            <p className="text-sm text-emerald-400">
              System Configuration
            </p>
          </div>

          <h1 className="mt-1 text-2xl font-semibold text-white">
            Settings
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Configure surveillance systems, alert thresholds, data sources,
            governance and operational notifications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          <Save className="h-4 w-4" />

          {saved ? 'Settings Saved' : 'Save Changes'}
        </button>
      </div>

      {/* System Status */}
      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-white">
            System Status
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Current operational status of connected surveillance services.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            icon={Radio}
            title="AIS Feed"
            status="Online"
            description="Vessel tracking data"
          />

          <StatusCard
            icon={Video}
            title="Drone Feed"
            status="Online"
            description="Aerial surveillance"
          />

          <StatusCard
            icon={Activity}
            title="Rule Engine"
            status="Active"
            description="Threat analysis rules"
          />

          <StatusCard
            icon={Globe}
            title="Geofencing"
            status="Active"
            description="Zone monitoring"
          />
        </div>
      </section>

      {/* Alert Configuration */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              <Bell className="h-4 w-4 text-red-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Alert Configuration
              </h2>

              <p className="text-xs text-slate-500">
                Configure thresholds used by the surveillance alert system.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          <RangeSetting
            title="High Severity Threshold"
            description="Minimum confidence required for a high-severity alert."
            value={highSeverity}
            min={50}
            max={100}
            unit="%"
            onChange={setHighSeverity}
          />

          <RangeSetting
            title="AIS Signal Timeout"
            description="Time without AIS transmission before an anomaly is generated."
            value={aisTimeout}
            min={1}
            max={30}
            unit="min"
            onChange={setAisTimeout}
          />
        </div>
      </section>

      {/* Data Sources */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <Database className="h-4 w-4 text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Data Sources
              </h2>

              <p className="text-xs text-slate-500">
                Control the surveillance feeds available to the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          <ToggleSetting
            title="AIS Data"
            description="Receive vessel identity, position, speed and heading data."
            enabled={aisEnabled}
            onChange={setAisEnabled}
          />

          <ToggleSetting
            title="Drone Surveillance"
            description="Receive aerial detection and observation data."
            enabled={droneEnabled}
            onChange={setDroneEnabled}
          />
        </div>
      </section>

      {/* Governance */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Governance & Data Sharing
              </h2>

              <p className="text-xs text-slate-500">
                Define operational region and information-sharing restrictions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          <SelectSetting
            label="Operational Region"
            defaultValue="Gulf of Guinea"
            options={[
              'Gulf of Guinea',
              'West African Coast',
              'Regional Operations',
            ]}
          />

          <SelectSetting
            label="Data Sharing"
            defaultValue="Restricted"
            options={[
              'Restricted',
              'Internal',
              'Authorized Agencies',
            ]}
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Bell className="h-4 w-4 text-amber-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Notifications
              </h2>

              <p className="text-xs text-slate-500">
                Control which operational events generate notifications.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          <ToggleSetting
            title="High Severity Alerts"
            description="Notify analysts when high-severity incidents are detected."
            enabled={highSeverityNotifications}
            onChange={setHighSeverityNotifications}
          />

          <ToggleSetting
            title="AIS Anomalies"
            description="Notify analysts when significant AIS irregularities are detected."
            enabled={aisNotifications}
            onChange={setAisNotifications}
          />
        </div>
      </section>

      {/* Configuration Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

        <div>
          <p className="text-sm font-medium text-amber-300">
            Configuration Notice
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Current configuration is stored locally for this demonstration.
            Production settings will be managed through the backend and
            protected by role-based access controls.
          </p>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ icon: Icon, title, status, description }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-300" />
        </div>

        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-medium text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  )
}

function RangeSetting({
  title,
  description,
  value,
  min,
  max,
  unit,
  onChange,
}) {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-medium text-white">
            {title}
          </h3>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex w-full items-center gap-4 md:w-72">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            className="w-full accent-emerald-500"
          />

          <span className="min-w-16 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-center text-xs font-medium text-slate-300">
            {value}
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

function ToggleSetting({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? 'bg-emerald-500' : 'bg-slate-700'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

function SelectSetting({ label, defaultValue, options }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <select
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none transition focus:border-emerald-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Settings
