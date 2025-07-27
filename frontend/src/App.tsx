import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersListPage';
import UserForm from './components/UserForm';
import TeamForm from './components/TeamForm';
import TeamListPage from './pages/TeamsListPage';
import ProjectList from './pages/ProjectListPage';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import TaskList from './pages/TasksListPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
        <Navbar />
      <div style={{ padding: '30px' }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<Navigate to="/users/create" />} /> {}
          <Route path="/users/create" element={<UserForm />} />
          <Route path="/user-list" element={<UsersPage />} /> 
          <Route path="/teams/create" element={<TeamForm />} />
          <Route path="/teams" element={<TeamListPage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
