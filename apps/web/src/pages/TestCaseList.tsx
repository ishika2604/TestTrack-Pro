import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';

// Simple mockup array
const mockTestCases = [
  { id: '1', customId: 'TC-2024-0001', title: 'Verify user login with valid credentials', priority: 'High', status: 'Approved' },
  { id: '2', customId: 'TC-2024-0002', title: 'Verify password reset flow', priority: 'Medium', status: 'Draft' }
];

export default function TestCaseList() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Test Cases</h1>
        <Link to="/test-cases/new">
          <Button>Create Test Case</Button>
        </Link>
      </div>

      <div className="flex space-x-4">
        <Input 
          placeholder="Search test cases..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="max-w-sm"
        />
        <Button variant="outline">Filters</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y rounded-md border">
            <div className="flex bg-muted/50 p-4 font-medium text-sm">
              <div className="w-32">ID</div>
              <div className="flex-1">Title</div>
              <div className="w-24 text-center">Priority</div>
              <div className="w-32 text-center">Status</div>
              <div className="w-24 text-right">Actions</div>
            </div>
            {mockTestCases.map(tc => (
              <div key={tc.id} className="flex p-4 text-sm items-center hover:bg-muted/50 transition-colors">
                <div className="w-32 font-medium text-muted-foreground">{tc.customId}</div>
                <div className="flex-1 font-medium">{tc.title}</div>
                <div className="w-24 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${tc.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {tc.priority}
                  </span>
                </div>
                <div className="w-32 text-center">
                  <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs">
                    {tc.status}
                  </span>
                </div>
                <div className="w-24 text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            {mockTestCases.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">No test cases found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
