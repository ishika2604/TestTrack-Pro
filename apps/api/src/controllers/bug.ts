import { Request, Response } from 'express';
import prisma from '../prisma';

export const createBug = async (req: Request, res: Response) => {
  try {
    const { title, description, stepsToReproduce, expectedBehavior, actualBehavior, severity, priority, environment, projectId, reporterId, assignedToId, linkedTestCaseId, linkedStepExecutionId } = req.body;

    const count = await prisma.bug.count() + 1;
    const customId = `BUG-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;

    const bug = await prisma.bug.create({
      data: {
        customId,
        title,
        description,
        stepsToReproduce,
        expectedBehavior,
        actualBehavior,
        severity,
        priority,
        environment,
        projectId,
        reporterId,
        assignedToId,
        linkedTestCaseId,
        linkedStepExecutionId
      }
    });

    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Bug' });
  }
};

export const getBugs = async (req: Request, res: Response) => {
  try {
    const { projectId, assignedToId, status, priority, severity } = req.query;

    const where: any = {};
    if (projectId) where.projectId = String(projectId);
    if (assignedToId) where.assignedToId = String(assignedToId);
    if (status) where.status = String(status);
    if (priority) where.priority = String(priority);
    if (severity) where.severity = String(severity);

    const bugs = await prisma.bug.findMany({
      where,
      include: {
        assignedTo: { select: { id: true, name: true } },
        reporter: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Bugs' });
  }
};

export const getBugById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await prisma.bug.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        reporter: true,
        comments: { include: { author: true }, orderBy: { createdAt: 'asc' } }
      }
    });

    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Bug' });
  }
};

export const updateBugStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, fixNotes, linkedCommit } = req.body;

    const bug = await prisma.bug.update({
      where: { id },
      data: { status, fixNotes, linkedCommit }
    });

    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Bug status' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, authorId } = req.body; // In real app, authorId comes from token

    const comment = await prisma.comment.create({
      data: {
        entityType: 'Bug',
        entityId: id,
        text,
        authorId,
        bugId: id
      },
      include: { author: { select: { name: true } } }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
