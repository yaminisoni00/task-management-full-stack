import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#222' }}>
      <Link to="/users/create" style={{ margin: '10px', color: 'white' }}>Register</Link>
      <Link to="/user-list" style={{ margin: '10px', color: 'white' }}>Users</Link>
      <Link to="/teams" style={{ margin: '10px', color: 'white' }}>Teams</Link>
      <Link to="/projects" style={{ margin: '10px', color: 'white' }}>Projects</Link>
      <Link to="/tasks" style={{ margin: '10px', color: 'white' }}>Tasks</Link>
    </nav>
  );
}
