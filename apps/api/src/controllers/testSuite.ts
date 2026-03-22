import { Request, Response } from 'express';
import prisma from '../prisma';

export const createTestSuite = async (req: Request, res: Response) => {
  try {
    const { name, description, projectId, testCaseIds } = req.body;

    const testSuite = await prisma.testSuite.create({
      data: {
        name,
        description,
        projectId,
        testCases: {
          create: testCaseIds?.map((id: string) => ({
            testCase: { connect: { id } }
          })) || []
        }
      },
      include: { testCases: true }
    });

    res.status(201).json(testSuite);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Test Suite' });
  }
};

export const getTestSuites = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    
    const testSuites = await prisma.testSuite.findMany({
      where: projectId ? { projectId: String(projectId) } : {},
      include: { testCases: { include: { testCase: { select: { id: true, title: true, status: true } } } } }
    });

    res.json(testSuites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Test Suites' });
  }
};
