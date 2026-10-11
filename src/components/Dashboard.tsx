import React, { useState } from 'react';
import { DeveloperStandup, ProjectStatus, Blocker } from '../types';
import DeveloperCard from './DeveloperCard';
import Sidebar from './Sidebar';
import DetailView from './DetailView';

interface DashboardProps {
  developers: DeveloperStandup[];
  projectStatus: ProjectStatus;
  topBlockers: Blocker[];
  weeklyTrend: Array<{ day: string; progress: number }>;
}

const Dashboard: React.FC<DashboardProps> = ({
  developers,
  projectStatus,
  topBlockers,
  weeklyTrend,
}) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'on-track' | 'at-risk' | 'blocked'>('all');

  const selectedDev = developers.find((d) => d.id === selectedDeveloper);

  const filteredDevelopers =
    filter === 'all'
      ? developers
      : developers.filter((d) => d.status === filter);

  if (selectedDev) {
    return (
      <DetailView
        developer={selectedDev}
        onBack={() => setSelectedDeveloper(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            🎯 Daily Standup Tracker
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Track daily progress • Monitor blockers • Team health
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-purple-600">
            <div className="text-2xl font-bold text-purple-600">
              {projectStatus.totalProgress}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Overall Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-full"
                style={{ width: `${projectStatus.totalProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-green-600">
            <div className="text-2xl font-bold text-green-600">
              ✅ {projectStatus.activeDevs}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              On Track • <span className="font-semibold">⚠️ {projectStatus.atRiskDevs}</span> At
              Risk
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-blue-600">
            <div className="text-2xl font-bold text-blue-600">
              {projectStatus.completedTasks + projectStatus.inProgressTasks + projectStatus.blockedTasks}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ✓ {projectStatus.completedTasks} • 🔄 {projectStatus.inProgressTasks} • 🔴{' '}
              {projectStatus.blockedTasks}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
            }`}
          >
            All Developers
          </button>
          <button
            onClick={() => setFilter('on-track')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'on-track'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
            }`}
          >
            ✅ On Track
          </button>
          <button
            onClick={() => setFilter('at-risk')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'at-risk'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
            }`}
          >
            ⚠️ At Risk
          </button>
          <button
            onClick={() => setFilter('blocked')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'blocked'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
            }`}
          >
            🔴 Blocked
          </button>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Developer Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDevelopers.map((dev) => (
                <DeveloperCard
                  key={dev.id}
                  developer={dev}
                  onExpand={setSelectedDeveloper}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              projectStatus={projectStatus}
              topBlockers={topBlockers}
              weeklyTrend={weeklyTrend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
