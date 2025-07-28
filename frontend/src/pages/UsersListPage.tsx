// src/pages/UsersPage.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/TaskList.css'; // ✅ reuse task list styling

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}api/users` || '/users')
      .then(res => setUsers(res.data.users || []))
      .catch(() => setMessage('Failed to load users'));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Users</h2>
      </div>

      {message && <p className="no-data">{message}</p>}

      <ul className="card-list">
        {users.map((user: any) => (
          <li className="card" key={user._id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
