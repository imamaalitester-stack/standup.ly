import { DeveloperStandup, ProjectStatus } from '../types';

export const mockDevelopers: DeveloperStandup[] = [
  {
    id: '1',
    name: 'Alex Kumar',
    role: 'Senior Frontend Developer',
    status: 'on-track',
    completed: [
      { id: '1', title: 'Dashboard responsive layout', duration: '4.5h', completed: true },
      { id: '2', title: 'Mobile menu bug fix', duration: '1.5h', completed: true },
      { id: '3', title: 'Code review & merge (2 PRs)', duration: '0.5h', completed: true },
    ],
    inProgress: [
      { id: '4', title: 'Payment gateway integration', completed: false },
      { id: '5', title: 'Test coverage improvement', completed: false },
    ],
    blockers: [],
    progressPercentage: 75,
    hoursLogged: 6.5,
    expectedHours: 8,
    updatedAt: '30 minutes ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567890',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Backend Engineering Lead',
    status: 'at-risk',
    completed: [
      { id: '1', title: 'Database optimization', duration: '4h', completed: true },
      { id: '2', title: 'API documentation update', duration: '1h', completed: true },
    ],
    inProgress: [
      { id: '3', title: 'Cache layer implementation', completed: false },
    ],
    blockers: [
      { id: '1', title: 'PR review pending (2 days)', completed: false },
      { id: '2', title: 'Waiting for design specs', completed: false },
    ],
    progressPercentage: 60,
    hoursLogged: 9,
    expectedHours: 8,
    updatedAt: '1 hour ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567891',
  },
  {
    id: '3',
    name: 'Raj Patel',
    role: 'Full Stack Developer',
    status: 'on-track',
    completed: [
      { id: '1', title: 'User profile page', duration: '3h', completed: true },
      { id: '2', title: 'Email templates', duration: '2h', completed: true },
      { id: '3', title: 'Database schema updates', duration: '1h', completed: true },
      { id: '4', title: 'API endpoints testing', duration: '1h', completed: true },
    ],
    inProgress: [
      { id: '5', title: 'Notification system integration', completed: false },
    ],
    blockers: [],
    progressPercentage: 85,
    hoursLogged: 7,
    expectedHours: 8,
    updatedAt: '45 minutes ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567892',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    role: 'QA Engineer',
    status: 'on-track',
    completed: [
      { id: '1', title: 'Test suite for payment module', duration: '2h', completed: true },
      { id: '2', title: 'Bug regression testing', duration: '1.5h', completed: true },
      { id: '3', title: 'Performance testing', duration: '1.5h', completed: true },
      { id: '4', title: 'Documentation review', duration: '1.5h', completed: true },
      { id: '5', title: 'User acceptance testing', duration: '1h', completed: true },
    ],
    inProgress: [],
    blockers: [],
    progressPercentage: 100,
    hoursLogged: 7.5,
    expectedHours: 8,
    updatedAt: '2 hours ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567893',
  },
  {
    id: '5',
    name: 'David Miller',
    role: 'DevOps Engineer',
    status: 'on-track',
    completed: [
      { id: '1', title: 'Infrastructure setup - AWS', duration: '2.5h', completed: true },
      { id: '2', title: 'CI/CD pipeline configuration', duration: '2h', completed: true },
      { id: '3', title: 'Monitoring dashboard setup', duration: '1.5h', completed: true },
    ],
    inProgress: [
      { id: '4', title: 'Load testing & optimization', completed: false },
      { id: '5', title: 'Documentation update', completed: false },
    ],
    blockers: [],
    progressPercentage: 70,
    hoursLogged: 6,
    expectedHours: 8,
    updatedAt: '3 hours ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567894',
  },
  {
    id: '6',
    name: 'Emma Wilson',
    role: 'Product Manager',
    status: 'on-track',
    completed: [
      { id: '1', title: 'Milestone planning & coordination', duration: '1.5h', completed: true },
      { id: '2', title: 'Stakeholder updates', duration: '1h', completed: true },
    ],
    inProgress: [
      { id: '3', title: 'Feature prioritization for v1.3', completed: false },
      { id: '4', title: 'Release notes preparation', completed: false },
    ],
    blockers: [],
    progressPercentage: 80,
    hoursLogged: 5,
    expectedHours: 8,
    updatedAt: '1.5 hours ago',
    slackThreadUrl: 'https://slack.com/archives/C123/p1234567895',
  },
];

export const mockProjectStatus: ProjectStatus = {
  totalProgress: 82,
  completedTasks: 19,
  inProgressTasks: 15,
  blockedTasks: 2,
  activeDevs: 6,
  atRiskDevs: 2,
  blockedDevs: 0,
};

export const mockTopBlockers = [
  { id: '1', title: 'PR Reviews Pending (2 days)', priority: 'high' as const },
  { id: '2', title: 'Design Specs Awaited', priority: 'high' as const },
  { id: '3', title: 'Testing Environment Issue', priority: 'medium' as const },
];

export const mockWeeklyTrend = [
  { day: 'Mon', progress: 88 },
  { day: 'Tue', progress: 78 },
  { day: 'Wed', progress: 68 },
  { day: 'Thu', progress: 85 },
  { day: 'Fri', progress: 82 },
];
