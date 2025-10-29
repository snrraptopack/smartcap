export function DriverCompactCard({ driver }: any) {
  const getStatusColor = (score: number) => {
    if (score >= 85) return 'border-l-red-500 bg-red-500/5';
    if (score >= 70) return 'border-l-amber-500 bg-amber-500/5';
    return 'border-l-green-500 bg-green-500/5';
  };

  const status = driver.isActive ? getStatusColor(driver.fatigueScore) : 'border-l-slate-600 bg-slate-700/20';

  return (
    <div className={`bg-slate-800/30 backdrop-blur-sm border-l-4 ${status} rounded-lg p-4 hover:bg-slate-800/50 transition-all`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Name & Status */}
        <div className="col-span-3 flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border ${
            driver.isActive 
              ? driver.fatigueScore >= 85 ? 'border-red-500' : driver.fatigueScore >= 70 ? 'border-amber-500' : 'border-green-500'
              : 'border-slate-600'
          }`}>
            <span className={`text-sm font-bold ${
              driver.isActive 
                ? driver.fatigueScore >= 85 ? 'text-red-400' : driver.fatigueScore >= 70 ? 'text-amber-400' : 'text-green-400'
                : 'text-slate-400'
            }`}>
              {driver.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{driver.name}</p>
            <p className="text-xs text-slate-400">{driver.vehicle}</p>
          </div>
        </div>

        {/* Fatigue Score */}
        <div className="col-span-2">
          {driver.isActive ? (
            <div className="text-center">
              <p className={`text-3xl font-bold ${
                driver.fatigueScore >= 85 ? 'text-red-400' :
                driver.fatigueScore >= 70 ? 'text-amber-400' : 'text-green-400'
              }`}>
                {driver.fatigueScore}
              </p>
              <p className="text-xs text-slate-400">Fatigue</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-slate-500">—</p>
              <p className="text-xs text-slate-500">Inactive</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="col-span-4 grid grid-cols-3 gap-4">
          {driver.isActive ? (
            <>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{driver.drowsiness}%</p>
                <p className="text-xs text-slate-400">Drowsy</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{driver.alertness}%</p>
                <p className="text-xs text-slate-400">Alert</p>
              </div>
              <div className="text-center">
                <p className={`text-lg font-bold ${driver.sleepHours < 5 ? 'text-red-400' : 'text-white'}`}>
                  {driver.sleepHours}h
                </p>
                <p className="text-xs text-slate-400">Sleep</p>
              </div>
            </>
          ) : (
            <div className="col-span-3 text-center text-slate-500 text-sm">
              Last active: {driver.lastActive}
            </div>
          )}
        </div>

        {/* Duration & Location */}
        <div className="col-span-2">
          {driver.isActive ? (
            <>
              <p className="text-sm font-semibold text-white">{driver.duration}</p>
              <p className="text-xs text-slate-400 truncate">{driver.location}</p>
            </>
          ) : (
            <p className="text-xs text-slate-500">{driver.location}</p>
          )}
        </div>

        {/* Action */}
        <div className="col-span-1 text-right">
          {driver.isActive && driver.fatigueScore >= 85 && (
            <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all">
              ALERT
            </button>
          )}
          {driver.isActive && driver.fatigueScore >= 70 && driver.fatigueScore < 85 && (
            <button className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-all">
              WARN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}