import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/TaskList.css';

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/tasks` || 'http://localhost:5000/api/tasks')
      .then(res => {
        if (Array.isArray(res.data.tasks.tasks)) {
          setTasks(res.data.tasks.tasks);
        } else {
          console.error('Unexpected tasks format:', res.data);
        }
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Task List</h2>
        <Link to="/tasks/create" className="create-button">Create Task</Link>
      </div>

      {tasks.length === 0 ? (
        <p className="no-data">No tasks found.</p>
      ) : (
        <ul className="card-list">
          {tasks.map((task) => (
            <li className="card" key={task._id}>
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Project:</strong> {task.projectId?.name || 'N/A'}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo?.name || 'Unassigned'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
