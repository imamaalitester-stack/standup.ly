import Dashboard from './components/Dashboard';
import {
  mockDevelopers,
  mockProjectStatus,
  mockTopBlockers,
  mockWeeklyTrend,
} from './data/mockData';
import './App.css';

function App() {
  return (
    <Dashboard
      developers={mockDevelopers}
      projectStatus={mockProjectStatus}
      topBlockers={mockTopBlockers}
      weeklyTrend={mockWeeklyTrend}
    />
  );
}

export default App;
