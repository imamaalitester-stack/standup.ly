import React from 'react';
import { ProjectStatus, Blocker } from '../types';

interface SidebarProps {
  projectStatus: ProjectStatus;
  topBlockers: Blocker[];
  weeklyTrend: Array<{ day: string; progress: number }>;
}

const Sidebar: React.FC<SidebarProps> = ({ projectStatus, topBlockers, weeklyTrend }) => {
  const getHealthScore = () => {
    return Math.round(
      (projectStatus.activeDevs / (projectStatus.activeDevs + projectStatus.atRiskDevs)) * 100
    );
  };

  return (
    <aside className="space-y-6">
      {/* Today's Metrics */}
      <div className="bg-white rounded-lg p-5 shadow-lg">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          📊 Today's Metrics
        </h3>

        <div className="space-y-4">
          {/* Team Health Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600 font-semibold">Team Health Score</span>
              <span className="text-sm font-bold text-purple-600">{getHealthScore()}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full"
                style={{ width: `${getHealthScore()}%` }}
              />
            </div>
          </div>

          {/* Hours Summary */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-bold text-gray-900">52.5h</span> Total Hours Logged
            </p>
            <p className="text-xs text-gray-600">Expected: 64h</p>
          </div>

          {/* Tasks Summary */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-600">
              <span className="font-bold text-green-600">{projectStatus.completedTasks}</span> /
              <span className="font-bold text-gray-900">
                {projectStatus.completedTasks + projectStatus.inProgressTasks + projectStatus.blockedTasks}
              </span>{' '}
              Tasks Complete
            </p>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                ✅ {projectStatus.completedTasks}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                🔄 {projectStatus.inProgressTasks}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                🔴 {projectStatus.blockedTasks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Blockers */}
      <div className="bg-white rounded-lg p-5 shadow-lg">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          🔴 Top Blockers
        </h3>

        <div className="space-y-2">
          {topBlockers.map((blocker, index) => (
            <div
              key={blocker.id}
              className="p-3 bg-red-50 border-l-3 border-red-500 rounded text-xs text-red-800"
            >
              <span className="font-bold">{index + 1}.</span> {blocker.title}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-lg p-5 shadow-lg">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          📈 Weekly Trend
        </h3>

        <div className="space-y-2">
          {weeklyTrend.map((day) => (
            <div key={day.day} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700 w-10">{day.day}:</span>
              <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    day.progress >= 80
                      ? 'bg-green-500'
                      : day.progress >= 60
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${day.progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-900 w-8 text-right">{day.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Overview */}
      <div className="bg-white rounded-lg p-5 shadow-lg">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          👥 Team Overview
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Active Developers:</span>
            <span className="font-bold text-green-600">{projectStatus.activeDevs}</span>
          </div>
          <div className="flex justify-between text-xs border-t pt-2">
            <span className="text-gray-600">At Risk:</span>
            <span className="font-bold text-amber-600">{projectStatus.atRiskDevs}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Blocked:</span>
            <span className="font-bold text-red-600">{projectStatus.blockedDevs}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
