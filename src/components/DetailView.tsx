import React from 'react';
import { DeveloperStandup } from '../types';

interface DetailViewProps {
  developer: DeveloperStandup;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ developer, onBack }) => {
  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'from-green-500 to-emerald-600';
      case 'at-risk':
        return 'from-amber-500 to-orange-600';
      case 'blocked':
        return 'from-red-500 to-red-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getStatusBadgeText = (status: string) => {
    switch (status) {
      case 'on-track':
        return '✅ ON TRACK';
      case 'at-risk':
        return '⚠️ AT RISK';
      case 'blocked':
        return '🔴 BLOCKED';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-lg font-semibold transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className={`bg-gradient-to-r ${getStatusGradient(developer.status)} text-white rounded-lg p-8 mb-6 shadow-lg`}>
          <h1 className="text-3xl font-bold mb-2">👤 {developer.name}</h1>
          <p className="text-lg opacity-90">{developer.role}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold">{getStatusBadgeText(developer.status)}</span>
            <span className="text-sm opacity-90">Updated: {developer.updatedAt}</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Completed Tasks */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-green-500">
                ✓ Completed ({developer.completed.length} items) • {' '}
                <span className="text-green-600">
                  {developer.completed.reduce((acc, task) => {
                    const match = task.duration?.match(/(\d+\.?\d*)/);
                    return acc + (match ? parseFloat(match[1]) : 0);
                  }, 0)}
                  h
                </span>
              </h2>

              <div className="space-y-3">
                {developer.completed.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{task.title}</p>
                      {task.duration && <p className="text-sm text-gray-600 mt-1">⏱️ {task.duration}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Tasks */}
            {developer.inProgress.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-500">
                  🔄 In Progress ({developer.inProgress.length} items)
                </h2>

                <div className="space-y-3">
                  {developer.inProgress.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-blue-600 font-bold text-lg mt-0.5">→</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{task.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blockers */}
            {developer.blockers.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-red-500">
                  🔴 Blockers ({developer.blockers.length} items)
                </h2>

                <div className="space-y-3">
                  {developer.blockers.map((blocker) => (
                    <div key={blocker.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-red-600 font-bold text-lg mt-0.5">⊘</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{blocker.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {developer.blockers.length === 0 && developer.inProgress.length === 0 && (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="text-green-800 font-semibold">✓ All tasks on track - no blockers!</p>
              </div>
            )}
          </div>

          {/* Sidebar Metrics */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                📊 Progress
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="font-bold text-gray-900">{developer.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all"
                      style={{ width: `${developer.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm mb-2">
                    <span className="text-gray-600">Daily Goal Status:</span>
                  </div>
                  <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                    {developer.progressPercentage >= 75
                      ? '✅ On track to meet daily standup'
                      : '⚠️ May need support to meet goals'}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                ⏱️ Hours Logged
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{developer.hoursLogged}h</div>
                  <div className="text-xs text-gray-600">logged today</div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected:</span>
                    <span className="font-bold text-gray-900">{developer.expectedHours}h</span>
                  </div>
                  <div
                    className={`mt-2 p-2 rounded text-xs font-semibold text-center ${
                      developer.hoursLogged > developer.expectedHours
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {developer.hoursLogged > developer.expectedHours
                      ? `⚠️ ${developer.hoursLogged - developer.expectedHours}h overtime`
                      : `✓ ${developer.expectedHours - developer.hoursLogged}h remaining`}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                ⚡ Quick Actions
              </h3>

              <div className="space-y-2">
                {developer.slackThreadUrl && (
                  <a
                    href={developer.slackThreadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-semibold rounded transition-colors text-center"
                  >
                    💬 View Slack Thread
                  </a>
                )}
                <button className="w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-semibold rounded transition-colors">
                  📧 Send Message
                </button>
                <button className="w-full px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold rounded transition-colors">
                  📊 Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
