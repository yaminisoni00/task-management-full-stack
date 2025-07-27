import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/TaskList.css';

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        if (Array.isArray(res.data.result.projects)) {
          setProjects(res.data.result.projects);
        } else {
          setProjects([]);
        }
      })
      .catch(() => setProjects([]));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Project List</h2>
        <Link to="/projects/create" className="create-button">Create Project</Link>
      </div>

      {projects.length === 0 ? (
        <p className="no-data">No projects found.</p>
      ) : (
        <ul className="card-list">
          {projects.map((project) => (
            <li className="card" key={project._id}>
              <h3>{project.name}</h3>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Team:</strong> {project?.teamId?.name || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
