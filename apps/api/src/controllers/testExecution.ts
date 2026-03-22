import { Request, Response } from 'express';
import prisma from '../prisma';

export const createTestRun = async (req: Request, res: Response) => {
  try {
    const { name, suiteId, projectId, targetStartDate, targetEndDate } = req.body;
    
    // Fetch test cases in the suite to create pending executions
    const testSuitesWithCases = await prisma.testSuite.findUnique({
      where: { id: suiteId },
      include: { testCases: { include: { testCase: { include: { steps: true } } } } }
    });

    if (!testSuitesWithCases) {
      return res.status(404).json({ error: 'Test Suite not found' });
    }

    const testRun = await prisma.testRun.create({
      data: {
        name,
        suiteId,
        projectId,
        targetStartDate: targetStartDate ? new Date(targetStartDate) : null,
        targetEndDate: targetEndDate ? new Date(targetEndDate) : null,
        executions: {
          create: testSuitesWithCases.testCases.map(mapping => ({
            testCaseId: mapping.testCase.id,
            status: 'Pending',
            stepResults: {
              create: mapping.testCase.steps.map(step => ({
                stepId: step.id,
                status: 'Pending'
              }))
            }
          }))
        }
      },
      include: { executions: true }
    });

    res.status(201).json(testRun);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Test Run' });
  }
};

export const getTestRuns = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    const runs = await prisma.testRun.findMany({
      where: projectId ? { projectId: String(projectId) } : {},
      include: { 
        executions: {
          select: { id: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Test Runs' });
  }
};

export const getTestExecutionById = async (req: Request, res: Response) => {
  try {
    const { executionId } = req.params;
    const execution = await prisma.testExecution.findUnique({
      where: { id: executionId },
      include: { 
        testCase: { include: { steps: true } },
        stepResults: { include: { step: true } }
      }
    });

    if (!execution) return res.status(404).json({ error: 'Execution not found' });
    res.json(execution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Execution' });
  }
};

export const updateTestExecution = async (req: Request, res: Response) => {
  try {
    const { executionId } = req.params;
    const { status, executedById, duration } = req.body;

    const data: any = { status, executedById, duration };
    if (status === 'Pass' || status === 'Fail' || status === 'Skipped') {
      data.endTime = new Date();
    }
    if (status === 'In Progress' && !data.startTime) {
      data.startTime = new Date();
    }

    const execution = await prisma.testExecution.update({
      where: { id: executionId },
      data
    });
    res.json(execution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Execution' });
  }
};

export const updateStepExecution = async (req: Request, res: Response) => {
  try {
    const { stepExecutionId } = req.params;
    const { status, actualResult, notes } = req.body;

    const stepExec = await prisma.stepExecution.update({
      where: { id: stepExecutionId },
      data: { status, actualResult, notes }
    });
    res.json(stepExec);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Step Execution' });
  }
};
