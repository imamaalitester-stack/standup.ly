export interface Task {
  id: string;
  title: string;
  duration?: string;
  completed: boolean;
}

export interface DeveloperStandup {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'on-track' | 'at-risk' | 'blocked';
  completed: Task[];
  inProgress: Task[];
  blockers: Task[];
  progressPercentage: number;
  hoursLogged: number;
  expectedHours: number;
  updatedAt: string;
  slackThreadUrl?: string;
}

export interface ProjectStatus {
  totalProgress: number;
  completedTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  activeDevs: number;
  atRiskDevs: number;
  blockedDevs: number;
}

export interface Blocker {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
}
