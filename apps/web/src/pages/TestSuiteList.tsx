import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

// Mock Suites
const mockSuites = [
  { id: '1', name: 'Authentication Suite', description: 'Tests covering login, register, password reset.', testCaseCount: 15 },
  { id: '2', name: 'Checkout Flow', description: 'E-commerce checkout regression.', testCaseCount: 42 }
];

export default function TestSuiteList() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Test Suites</h1>
        <Button>Create Suite</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuites.map(suite => (
          <Card key={suite.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{suite.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{suite.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium">{suite.testCaseCount} Test Cases</span>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {mockSuites.length === 0 && (
          <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-lg">
            No test suites found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
