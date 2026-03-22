import { Request, Response } from 'express';
import prisma from '../prisma';

export const createTestCase = async (req: Request, res: Response) => {
  try {
    const { title, description, moduleId, priority, severity, type, projectId, createdById, steps } = req.body;
    
    const count = await prisma.testCase.count() + 1;
    const customId = `TC-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;

    const testCase = await prisma.testCase.create({
      data: {
        customId,
        title,
        description,
        moduleId,
        priority,
        severity,
        type,
        projectId,
        createdById,
        steps: {
          create: steps?.map((step: any, index: number) => ({
            stepNumber: index + 1,
            action: step.action,
            testData: step.testData,
            expectedResult: step.expectedResult
          })) || []
        }
      },
      include: { steps: true }
    });

    res.status(201).json(testCase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Test Case' });
  }
};

export const getTestCases = async (req: Request, res: Response) => {
  try {
    const { projectId, search, priority, severity } = req.query;
    
    // Build query filters
    const whereClause: any = {};
    if (projectId) whereClause.projectId = String(projectId);
    if (priority) whereClause.priority = String(priority);
    if (severity) whereClause.severity = String(severity);
    if (search) {
      whereClause.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { customId: { contains: String(search), mode: 'insensitive' } }
      ];
    }

    const testCases = await prisma.testCase.findMany({
      where: whereClause,
      include: {
        createdBy: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(testCases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Test Cases' });
  }
};

export const getTestCaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testCase = await prisma.testCase.findUnique({
      where: { id },
      include: { steps: true, preconditions: true, postconditions: true }
    });
    
    if (!testCase) {
      return res.status(404).json({ error: 'Test Case not found' });
    }
    
    res.json(testCase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Test Case' });
  }
};

export const updateTestCase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, severity, status, lastModifiedById } = req.body;
    
    const testCase = await prisma.testCase.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        severity,
        status,
        lastModifiedById,
        version: { increment: 1 }
      }
    });

    res.json(testCase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Test Case' });
  }
};

export const deleteTestCase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Requirements say soft delete only, so we mark it archived
    const testCase = await prisma.testCase.update({
      where: { id },
      data: { status: 'Archived' }
    });
    
    res.json({ message: 'Test Case archived', testCase });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Test Case' });
  }
};
