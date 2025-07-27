import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css'; // Changed to use UserForm.css

export default function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [message, setMessage] = useState<string | null>(null); // Added message state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(res => {
        if (Array.isArray(res.data.teams.teams)) {
          setTeams(res.data.teams.teams);
        }
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setMessage('Failed to load teams');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects/create', {
        name,
        description,
        teamId: selectedTeam,
      });
      setMessage('Project created successfully');
      setTimeout(() => navigate('/projects'), 500);
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage('Failed to create project');
    }
  };

  return (
    <div className="create-container"> {/* Changed from create-project-container */}
      <form onSubmit={handleSubmit} className="create-form"> {/* Changed from create-project-form */}
        <h2>Create Project</h2>

        <div className="form-group">
          <label>Name</label>
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Select Team</label>
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} required>
            <option value="">-- Select a Team --</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Create Project</button> {/* Changed from submit-btn */}
        {message && <p className="message-text">{message}</p>} {/* Added message display */}
      </form>
    </div>
  );
}