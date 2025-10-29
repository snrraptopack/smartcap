
export function AlertCenter({ drivers }: any) {
  const criticalDrivers = drivers.filter((d: any) => d.isActive && d.fatigueScore >= 85);
  
  return (
    <>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
          <span>🔴 CRITICAL ALERTS</span>
          <span className="text-red-600 text-xl font-bold">{criticalDrivers.length}</span>
        </h3>
        
        <div className="space-y-3">
          {criticalDrivers.map((driver: any) => (
            <div key={driver.id} className="p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{driver.name}</p>
                  <p className="text-xs text-gray-600">#{driver.id}</p>
                </div>
                <span className="text-xs text-red-600 font-medium">LIVE</span>
              </div>
              <div className="text-xs space-y-1 text-gray-700">
                <p>Score: <span className="font-bold text-red-600">{driver.fatigueScore}</span> 📈</p>
                <p>Drowsiness: <span className="font-bold text-red-600">{driver.drowsiness}%</span></p>
                <p>Duration: {driver.duration}</p>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 px-2 py-1 bg-red-600 text-white text-xs rounded font-semibold hover:bg-red-700">
                  Emergency
                </button>
                <button className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded font-semibold hover:bg-blue-700">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">📋 Recent Activity</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <p>• Driver #1234 fatigue → CRITICAL 🔴</p>
          <p>• Driver #5678 fatigue increased by 15</p>
          <p>• Driver #9012 now INACTIVE (cap off)</p>
          <p>• Alert sent to Driver #1234</p>
          <p>• Driver #3456 fatigue → SAFE 🟢</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">📡 Cap Connection Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">🟢 Active:</span>
            <span className="font-semibold text-green-600">142 drivers</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">⚪ Inactive:</span>
            <span className="font-semibold text-gray-600">68 drivers</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">🔴 Issues:</span>
            <span className="font-semibold text-red-600">2 drivers</span>
          </div>
        </div>
      </div>
    </>
  );
}