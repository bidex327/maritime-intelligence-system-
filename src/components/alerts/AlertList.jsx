import AlertCard from './AlertCard'

function AlertList({ alerts }) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
        />
      ))}
    </div>
  )
}

export default AlertList