import { Request, Response } from 'express';
import prisma from '../prisma';

export const getExecutionReport = async (req: Request, res: Response) => {
  try {
    const totalExecutions = await prisma.testExecution.count();
    const passed = await prisma.testExecution.count({ where: { status: 'Pass' } });
    const failed = await prisma.testExecution.count({ where: { status: 'Fail' } });
    const blocked = await prisma.testExecution.count({ where: { status: 'Blocked' } });
    const skipped = await prisma.testExecution.count({ where: { status: 'Skipped' } });

    res.json({
      total: totalExecutions,
      passed,
      failed,
      blocked,
      skipped,
      passRate: totalExecutions > 0 ? (passed / totalExecutions) * 100 : 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate execution report' });
  }
};

export const getBugMetrics = async (req: Request, res: Response) => {
  try {
    const totalBugs = await prisma.bug.count();
    const openBugs = await prisma.bug.count({ where: { status: { in: ['New', 'Open', 'In Progress'] } } });
    const fixedBugs = await prisma.bug.count({ where: { status: 'Fixed' } });
    const criticalBugs = await prisma.bug.count({ where: { severity: 'Critical', status: { not: 'Closed' } } });

    res.json({
      total: totalBugs,
      open: openBugs,
      fixed: fixedBugs,
      criticalOpen: criticalBugs
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate bug metrics' });
  }
};
