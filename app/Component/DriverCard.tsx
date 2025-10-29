
export function DriverCard({ driver, isSelected, onClick }: any) {
  const statusColor = driver.fatigueScore >= 85 ? 'red' : driver.fatigueScore >= 70 ? 'amber' : 'green';
  const borderColor = {
    red: 'border-l-red-600',
    amber: 'border-l-amber-500',
    green: 'border-l-green-600',
  }[statusColor] || 'border-l-gray-300';

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 border-l-4 cursor-pointer transition-all hover:bg-gray-50 ${borderColor} ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
            {driver.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          {driver.isActive && (
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              statusColor === 'red' ? 'bg-red-600' : 
              statusColor === 'amber' ? 'bg-amber-500' : 'bg-green-600'
            }`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{driver.name}</h3>
            {driver.isFavorite && <span className="text-amber-500">⭐</span>}
          </div>
          <p className="text-xs text-gray-500">#{driver.id}</p>
          
          {driver.isActive ? (
            <>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Fatigue: {driver.fatigueScore}/100</span>
                  <span className={`font-semibold ${
                    statusColor === 'red' ? 'text-red-600' :
                    statusColor === 'amber' ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    {driver.trend === 'rising' ? '📈' : '📉'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      statusColor === 'red' ? 'bg-red-600' :
                      statusColor === 'amber' ? 'bg-amber-500' : 'bg-green-600'
                    }`}
                    style={{ width: `${driver.fatigueScore}%` }}
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span>⏱️ Duration:</span>
                  <span className="font-medium">{driver.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>😴 Sleep:</span>
                  <span className={`font-medium ${driver.sleepHours < 5 ? 'text-red-600' : ''}`}>
                    {driver.sleepHours}hrs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>👁️ Drowsiness:</span>
                  <span className={`font-medium ${driver.drowsiness > 80 ? 'text-red-600' : ''}`}>
                    {driver.drowsiness}%
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <span>⚪</span>
                <span>INACTIVE</span>
              </div>
              <p className="mt-1">Last active: {driver.lastActive}</p>
              <p>Last score: {driver.fatigueScore}/100</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}