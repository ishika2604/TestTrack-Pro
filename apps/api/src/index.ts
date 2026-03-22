import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import testCaseRoutes from './routes/testCase';
import testSuiteRoutes from './routes/testSuite';
import testExecutionRoutes from './routes/testExecution';
import bugRoutes from './routes/bug';
import reportRoutes from './routes/report';
import attachmentRoutes from './routes/attachment';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve uploaded static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test-cases', testCaseRoutes);
app.use('/api/test-suites', testSuiteRoutes);
app.use('/api/executions', testExecutionRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/attachments', attachmentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'TestTrack Pro API is running' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
