// Grid Card - Detailed View (Smaller Size)
export function DriverGridCard({ driver }: any) {
  const getStatusColor = (score: number) => {
    if (score >= 85) return { bg: 'bg-red-500/10', border: 'border-red-500/50', text: 'text-red-400', glow: 'shadow-red-500/20' };
    if (score >= 70) return { bg: 'bg-amber-500/10', border: 'border-amber-500/50', text: 'text-amber-400', glow: 'shadow-amber-500/20' };
    return { bg: 'bg-green-500/10', border: 'border-green-500/50', text: 'text-green-400', glow: 'shadow-green-500/20' };
  };

  const status = driver.isActive ? getStatusColor(driver.fatigueScore) : {
    bg: 'bg-slate-700/30',
    border: 'border-slate-600',
    text: 'text-slate-400',
    glow: 'shadow-slate-500/10'
  };

  return (
    <div className={`${status.bg} backdrop-blur-sm border ${status.border} rounded-lg p-3 transition-all hover:shadow-xl ${status.glow} ${driver.isActive && driver.fatigueScore >= 85 ? 'animate-pulse' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border ${status.border}`}>
            <span className={`text-sm font-bold ${status.text}`}>
              {driver.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-xs truncate">{driver.name}</h3>
            <p className="text-[10px] text-slate-400 truncate">{driver.vehicle}</p>
          </div>
        </div>
        
        {driver.isActive ? (
          <div className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${status.text} ${status.bg} border ${status.border}`}>
            LIVE
          </div>
        ) : (
          <div className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-400 bg-slate-700/30 border border-slate-600">
            OFF
          </div>
        )}
      </div>

      {driver.isActive ? (
        <>
          {/* Fatigue Score - Compact Display */}
          <div className="mb-2">
            <div className="flex items-end justify-between mb-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">Fatigue</span>
              <span className={`text-2xl font-bold ${status.text}`}>{driver.fatigueScore}</span>
            </div>
            <div className="relative w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${
                  driver.fatigueScore >= 85 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                  driver.fatigueScore >= 70 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                  'bg-gradient-to-r from-green-600 to-green-400'
                }`}
                style={{ width: `${driver.fatigueScore}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <div className="bg-slate-800/50 rounded p-1.5">
              <p className="text-[10px] text-slate-400">Duration</p>
              <p className="text-xs font-semibold text-white">{driver.duration}</p>
            </div>
            <div className="bg-slate-800/50 rounded p-1.5">
              <p className="text-[10px] text-slate-400">Sleep</p>
              <p className={`text-xs font-semibold ${driver.sleepHours < 5 ? 'text-red-400' : 'text-white'}`}>
                {driver.sleepHours}h
              </p>
            </div>
          </div>

          {/* Biosignals - Compact */}
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Drowsy</span>
              <span className={`font-semibold ${driver.drowsiness > 80 ? 'text-red-400' : 'text-slate-300'}`}>
                {driver.drowsiness}%
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Alert</span>
              <span className={`font-semibold ${driver.alertness < 30 ? 'text-red-400' : 'text-slate-300'}`}>
                {driver.alertness}%
              </span>
            </div>
          </div>

          {/* Action Button */}
          {driver.fatigueScore >= 70 && (
            <button className={`w-full px-2 py-1.5 rounded font-semibold text-[10px] transition-all ${
              driver.fatigueScore >= 85 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}>
              {driver.fatigueScore >= 85 ? '🚨 URGENT' : '⚠️ MONITOR'}
            </button>
          )}
        </>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-slate-700/30 flex items-center justify-center border border-slate-600">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <p className="text-[10px] text-slate-400 mb-0.5">Cap Inactive</p>
          <p className="text-[10px] text-slate-500">{driver.lastActive}</p>
        </div>
      )}
    </div>
  );
}