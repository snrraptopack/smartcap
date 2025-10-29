import { useState } from "react";
import { NavLink } from "react-router";
import { DriverCompactCard } from "~/Component/DriverCompact";
import { DriverGridCard } from "~/Component/DriverGrid";
import { drivers } from "~/utils/driversData";

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'duration'>('score');


  const criticalCount = drivers.filter(d => d.isActive && d.fatigueScore >= 85).length;
  const warningCount = drivers.filter(d => d.isActive && d.fatigueScore >= 70 && d.fatigueScore < 85).length;
  const safeCount = drivers.filter(d => d.isActive && d.fatigueScore < 70).length;
  const activeCount = drivers.filter(d => d.isActive).length;

  const sortedDrivers = [...drivers].sort((a, b) => {
    // Always put inactive drivers last
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    
    // Sort active drivers by selected criteria
    if (sortBy === 'score') return b.fatigueScore - a.fatigueScore;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'duration') {
      const getDurationMinutes = (d: any) => {
        if (!d.isActive) return 0;
        const [hours, mins] = d.duration.split('h ');
        return parseInt(hours) * 60 + parseInt(mins);
      };
      return getDurationMinutes(b) - getDurationMinutes(a);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Fatigue Monitoring Command Center</h1>
                <p className="text-xs text-slate-400">Real-time driver safety oversight</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-slate-700" />
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-300">System Online</span>
              </div>
              <div className="text-slate-400">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-700 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-400">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-xs rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1 text-xs rounded ${viewMode === 'compact' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-600'}`}
              >
                Compact
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-slate-700 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-600 text-slate-200 text-xs rounded px-2 py-1 border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="score">Risk Level</option>
                <option value="name">Name</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            <div className="relative">
              <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {criticalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                    {criticalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-white">{activeCount}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Active</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700" />

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div>
                <p className="text-2xl font-bold text-red-400">{criticalCount}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Critical</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700" />

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-amber-400">{warningCount}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Warning</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700" />

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-green-400">{safeCount}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Safe</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-400">Fleet Compliance</p>
            <p className="text-2xl font-bold text-white">{((safeCount / activeCount) * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {sortedDrivers.map((driver) => (
              <NavLink key={driver.id} to={`/driver/${driver.id}`}>
              <DriverGridCard  driver={driver} />
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {sortedDrivers.map((driver) => (
              <NavLink key={driver.id} to={`/driver/${driver.id}`}>
                <DriverCompactCard  driver={driver} />
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



