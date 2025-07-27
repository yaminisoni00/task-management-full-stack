import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import teamRoutes from './routes/team.routes';
import taskRoutes from './routes/task.routes';
import projectRoutes from './routes/project.routes';
import activityLogsRoutes from './routes/activityLogs.routes';
import messagesRoutes from './routes/message.routes';
// import './types/express'
/// <reference path="./types/express/index.d.ts" />

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (will be added later)
app.get('/', ( req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/activityLogs', activityLogsRoutes);
app.use('/api/messages', messagesRoutes);

export default app;
