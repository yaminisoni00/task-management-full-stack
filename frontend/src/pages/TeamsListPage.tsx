// src/components/TeamList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskList.css';

export default function TeamList() {
  const [teams, setTeams] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}api/teams` || 'http://localhost:5000/api/teams')
      .then(res => {
        setTeams(res.data.teams.teams || []);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Teams</h2>
        <button onClick={() => navigate('/teams/create')} className="create-button">
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <p className="no-data">No teams found</p>
      ) : (
        <ul className="card-list">
          {teams.map((team) => (
            <li key={team._id} className="card">
              <h3>{team.name}</h3>
              <p><strong>Description:</strong> {team.description}</p>
              <p><strong>Members:</strong>{' '}
                {team.members?.length > 0 ? (
                  team.members.map((m: any, i: number) => (
                    <span key={m._id}>
                      {m.name}{i !== team.members.length - 1 ? ', ' : ''}
                    </span>
                  ))
                ) : (
                  'No members'
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
