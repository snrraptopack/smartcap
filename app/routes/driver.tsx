import { useParams, NavLink } from "react-router";
import { useState } from "react";
import { drivers } from "~/utils/driversData";

export default function DriverDetail() {
    const { id } = useParams(); 
    const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'sleep' | 'messages'>('overview');

    const driver = drivers.find(d => d.id === id);
    if (!driver) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Driver Not Found</h1>
                    <p className="text-slate-400 mb-6">The driver with ID "{id}" does not exist.</p>
                    <NavLink to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                        Back to Dashboard
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <NavLink to="/" className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </NavLink>
                        
                        <div>
                            <h1 className="text-2xl font-bold text-white">Driver Details</h1>
                            <p className="text-sm text-slate-400">Real-time monitoring and history</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Call Driver</span>
                        </button>
                        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>Send Message</span>
                        </button>
                        {driver.fatigueScore >= 85 && (
                            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2 animate-pulse">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>Emergency Alert</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Panel - Driver Info */}
                    <div className="col-span-3 space-y-6">
                        {/* Driver Profile Card */}
                        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                    {driver.name.split(' ').map((n: string) => n[0]).join('')}
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{driver.name}</h2>
                                <p className="text-sm text-slate-400 mb-2">Driver ID: #{driver.id}</p>
                                <p className="text-sm text-slate-400 mb-4">Vehicle: {driver.vehicle}</p>
                                
                                {driver.isActive ? (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/50">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                        ACTIVE - CAP ON
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-400 border border-slate-600">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                                        INACTIVE
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-700 space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Location:</span>
                                    <span className="text-white">{driver.location}</span>
                                </div>
                                {driver.isActive && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Duration:</span>
                                            <span className="text-white">{driver.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Heart Rate:</span>
                                            <span className="text-white">{driver.heartRate} bpm</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Current Status Card */}
                        {driver.isActive ? (
                            <div className={`rounded-lg p-6 border ${
                                driver.fatigueScore >= 85 ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/50' :
                                driver.fatigueScore >= 70 ? 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/50' :
                                'bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/50'
                            }`}>
                                <h3 className="text-sm font-semibold text-slate-400 mb-4">CURRENT STATUS</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-slate-400">Fatigue Level</span>
                                            <span className={`text-3xl font-bold ${
                                                driver.fatigueScore >= 85 ? 'text-red-400' :
                                                driver.fatigueScore >= 70 ? 'text-amber-400' : 'text-green-400'
                                            }`}>{driver.fatigueScore}</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                            <div className={`h-full ${
                                                driver.fatigueScore >= 85 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                                                driver.fatigueScore >= 70 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                'bg-gradient-to-r from-green-600 to-green-400'
                                            }`} style={{ width: `${driver.fatigueScore}%` }}></div>
                                        </div>
                                        <p className={`text-xs font-semibold mt-1 ${
                                            driver.fatigueScore >= 85 ? 'text-red-400' :
                                            driver.fatigueScore >= 70 ? 'text-amber-400' : 'text-green-400'
                                        }`}>
                                            {driver.fatigueScore >= 85 ? 'CRITICAL - IMMEDIATE ACTION REQUIRED' :
                                             driver.fatigueScore >= 70 ? 'WARNING - MONITOR CLOSELY' : 
                                             'SAFE - NORMAL OPERATION'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-slate-800/50 rounded p-2">
                                            <p className="text-[10px] text-slate-400">Duration</p>
                                            <p className="text-sm font-bold text-white">{driver.duration}</p>
                                        </div>
                                        <div className="bg-slate-800/50 rounded p-2">
                                            <p className="text-[10px] text-slate-400">Sleep</p>
                                            <p className={`text-sm font-bold ${driver.sleepHours < 5 ? 'text-red-400' : 'text-white'}`}>
                                                {driver.sleepHours}h
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                                <h3 className="text-sm font-semibold text-slate-400 mb-4">LAST STATUS</h3>
                                <p className="text-sm text-slate-400">Last active: {driver.lastActive}</p>
                                <p className="text-sm text-slate-400 mt-2">Last fatigue score: {driver.fatigueScore}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Details */}
                    <div className="col-span-9">
                        {/* Tabs */}
                        <div className="bg-slate-800 rounded-lg border border-slate-700 mb-6">
                            <div className="flex border-b border-slate-700">
                                <button
                                    onClick={() => setSelectedTab('overview')}
                                    className={`px-6 py-4 text-sm font-semibold transition-colors ${
                                        selectedTab === 'overview'
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setSelectedTab('history')}
                                    className={`px-6 py-4 text-sm font-semibold transition-colors ${
                                        selectedTab === 'history'
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Fatigue History
                                </button>
                                <button
                                    onClick={() => setSelectedTab('sleep')}
                                    className={`px-6 py-4 text-sm font-semibold transition-colors ${
                                        selectedTab === 'sleep'
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Sleep Analysis
                                </button>
                                <button
                                    onClick={() => setSelectedTab('messages')}
                                    className={`px-6 py-4 text-sm font-semibold transition-colors ${
                                        selectedTab === 'messages'
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Messages & Alerts
                                </button>
                            </div>

                            <div className="p-6">
                                {selectedTab === 'overview' && driver.isActive && (
                                    <div className="space-y-6">
                                        {/* Real-time Biosignals */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4">Real-time Biosignals</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-900/50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-slate-400">Eye Closure</span>
                                                        <span className="text-2xl font-bold text-red-400">82%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-600" style={{ width: '82%' }}></div>
                                                    </div>
                                                    <p className="text-xs text-red-400 mt-1">🔴 Critical</p>
                                                </div>

                                                <div className="bg-slate-900/50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-slate-400">Drowsiness</span>
                                                        <span className="text-2xl font-bold text-red-400">{driver.drowsiness}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-500" style={{ width: `${driver.drowsiness}%` }}></div>
                                                    </div>
                                                    <p className="text-xs text-red-400 mt-1">🔴 Critical</p>
                                                </div>

                                                <div className="bg-slate-900/50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-slate-400">Alertness</span>
                                                        <span className="text-2xl font-bold text-red-400">{driver.alertness}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-600" style={{ width: `${driver.alertness}%` }}></div>
                                                    </div>
                                                    <p className="text-xs text-red-400 mt-1">🔴 Very Low</p>
                                                </div>

                                                <div className="bg-slate-900/50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-slate-400">Heart Rate</span>
                                                        <span className="text-2xl font-bold text-amber-400">{driver.heartRate} bpm</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-red-400" style={{ width: '75%' }}></div>
                                                    </div>
                                                    <p className="text-xs text-amber-400 mt-1">🟡 Elevated</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Risk Factors */}
                                        {driver.fatigueScore >= 70 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-4">Contributing Risk Factors</h3>
                                                <div className={`${
                                                    driver.fatigueScore >= 85 ? 'bg-red-500/10 border-red-500/50' :
                                                    'bg-amber-500/10 border-amber-500/50'
                                                } border rounded-lg p-4`}>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2 text-sm">
                                                            <span className={driver.fatigueScore >= 85 ? 'text-red-400' : 'text-amber-400'}>
                                                                {driver.fatigueScore >= 85 ? '🔴' : '🟡'}
                                                            </span>
                                                            <span className="text-white">{driver.duration} continuous activity</span>
                                                        </div>
                                                        {driver.sleepHours < 6 && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <span className="text-red-400">🔴</span>
                                                                <span className="text-white">Sleep deprivation ({driver.sleepHours}h)</span>
                                                            </div>
                                                        )}
                                                        {driver.drowsiness && driver.drowsiness > 80 && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <span className="text-red-400">🔴</span>
                                                                <span className="text-white">High drowsiness indicators</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedTab === 'overview' && !driver.isActive && (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-700/30 flex items-center justify-center border border-slate-600">
                                            <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Driver Inactive</h3>
                                        <p className="text-slate-400">Smart cap is not currently being worn</p>
                                        <p className="text-sm text-slate-500 mt-4">Last active: {driver.lastActive}</p>
                                    </div>
                                )}

                                {selectedTab === 'history' && (
                                    <div className="text-center py-12">
                                        <p className="text-slate-400">Fatigue history chart and data would be displayed here</p>
                                    </div>
                                )}

                                {selectedTab === 'sleep' && (
                                    <div className="text-center py-12">
                                        <p className="text-slate-400">Sleep analysis and patterns would be displayed here</p>
                                    </div>
                                )}

                                {selectedTab === 'messages' && (
                                    <div className="text-center py-12">
                                        <p className="text-slate-400">Message history and alert log would be displayed here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}