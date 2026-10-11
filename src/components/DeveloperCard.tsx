import React from 'react';
import { DeveloperStandup } from '../types';

interface DeveloperCardProps {
  developer: DeveloperStandup;
  onExpand?: (id: string) => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, onExpand }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'at-risk':
        return 'bg-gradient-to-r from-amber-500 to-orange-600';
      case 'blocked':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
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

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const isOvertime = developer.hoursLogged > developer.expectedHours;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Header */}
      <div className={`${getStatusColor(developer.status)} text-white p-4`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">👤 {developer.name}</h3>
            <p className="text-sm opacity-90">{developer.role}</p>
          </div>
          <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
            {getStatusBadgeText(developer.status)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Completed Section */}
        <div>
          <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 pb-2 border-b">
            ✓ Completed ({developer.completed.length})
          </h4>
          <div className="space-y-1">
            {developer.completed.slice(0, 2).map((task) => (
              <div key={task.id} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="font-bold text-green-600">✓</span>
                <span>
                  {task.title}
                  {task.duration && <span className="text-gray-500"> ({task.duration})</span>}
                </span>
              </div>
            ))}
            {developer.completed.length > 2 && (
              <p className="text-xs text-gray-500">+{developer.completed.length - 2} more</p>
            )}
          </div>
        </div>

        {/* In Progress Section */}
        {developer.inProgress.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 pb-2 border-b">
              🔄 In Progress ({developer.inProgress.length})
            </h4>
            <div className="space-y-1">
              {developer.inProgress.map((task) => (
                <div key={task.id} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="font-bold text-blue-600">→</span>
                  <span>{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blockers Section */}
        {developer.blockers.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 pb-2 border-b">
              🔴 Blockers ({developer.blockers.length})
            </h4>
            <div className="space-y-1">
              {developer.blockers.map((blocker) => (
                <div key={blocker.id} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="font-bold text-red-600">⊘</span>
                  <span>{blocker.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {developer.blockers.length === 0 && developer.inProgress.length === 0 && (
          <div className="text-xs text-gray-500 italic">No blockers</div>
        )}

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-700">Progress</span>
            <span className="text-xs font-bold text-gray-900">{developer.progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`${getProgressBarColor(developer.progressPercentage)} h-full transition-all duration-300`}
              style={{ width: `${developer.progressPercentage}%` }}
            />
          </div>

          {/* Hours Info */}
          <div className="mt-3 p-2 bg-gray-100 rounded-md text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Hours:</span>
              <span className={`font-bold ${isOvertime ? 'text-red-600' : 'text-green-600'}`}>
                {developer.hoursLogged}h / {developer.expectedHours}h {isOvertime ? '⚠️ Overtime' : '✓'}
              </span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-2 text-xs text-gray-500">Last updated: {developer.updatedAt}</div>

          {/* Expand Button */}
          <button
            onClick={() => onExpand?.(developer.id)}
            className="w-full mt-3 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-semibold rounded transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
