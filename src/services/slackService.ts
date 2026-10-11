const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface StandupData {
  project: string;
  devChannel: string;
  doneTasks: string[];
  nextTasks: string[];
  blockers: string;
  readyForQA: string;
  capacity: string;
  developer: {
    name: string;
    email: string;
    avatar?: string;
  };
  timestamp: string;
}

export interface DeveloperStandupGroup {
  id: string;
  name: string;
  email: string;
  projects: StandupData[];
  status: 'on-track' | 'at-risk' | 'blocked';
  progressPercentage: number;
  hoursLogged: number;
  expectedHours: number;
  completed: { title: string; duration?: string }[];
  inProgress: { title: string }[];
  blockers: { title: string }[];
}

export async function fetchStandups(): Promise<StandupData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/standups`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch standups:', error);
    return [];
  }
}

export async function refreshStandups(): Promise<StandupData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/standups/refresh`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to refresh standups:', error);
    return [];
  }
}

// Transform Slack data to dashboard format
export function transformToDevStandups(
  standups: StandupData[]
): DeveloperStandupGroup[] {
  const groupedByDev = new Map<string, StandupData[]>();

  // Group by developer
  standups.forEach((standup) => {
    const devKey = standup.developer.email || standup.developer.name;
    if (!groupedByDev.has(devKey)) {
      groupedByDev.set(devKey, []);
    }
    groupedByDev.get(devKey)!.push(standup);
  });

  // Transform to developer standup groups
  return Array.from(groupedByDev.entries()).map(([_, devStandups]) => {
    const dev = devStandups[0].developer;
    const allDoneTasks = devStandups.flatMap((s) =>
      s.doneTasks.map((task) => ({ title: task, duration: undefined }))
    );
    const allInProgressTasks = devStandups.flatMap((s) =>
      s.nextTasks.map((task) => ({ title: task }))
    );
    const allBlockers = devStandups.flatMap((s) =>
      s.blockers.split(',').map((b) => ({ title: b.trim() }))
    );

    const completedCount = allDoneTasks.length;
    const totalTasks =
      completedCount + allInProgressTasks.length + allBlockers.length;
    const progressPercentage =
      totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    let status: 'on-track' | 'at-risk' | 'blocked' = 'on-track';
    if (allBlockers.length > 0) status = 'blocked';
    else if (progressPercentage < 50) status = 'at-risk';

    return {
      id: dev.email || dev.name,
      name: dev.name,
      email: dev.email,
      projects: devStandups,
      status,
      progressPercentage,
      hoursLogged: 7.5, // TODO: Extract from standup data
      expectedHours: 8,
      completed: allDoneTasks,
      inProgress: allInProgressTasks,
      blockers: allBlockers,
    };
  });
}
