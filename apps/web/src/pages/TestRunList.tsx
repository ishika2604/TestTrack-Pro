import {} from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const mockTestRuns = [
  { id: '1', name: 'Sprint 5 Regression', suiteName: 'Regression Suite', status: 'In Progress', progress: 45, total: 120 },
  { id: '2', name: 'Beta Smoke Tests', suiteName: 'Smoke Test', status: 'Pending', progress: 0, total: 20 }
];

export default function TestRunList() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Test Runs</h1>
        <Button>Create Test Run</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTestRuns.map(run => (
          <Card key={run.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{run.name}</CardTitle>
              <CardDescription>{run.suiteName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span>{run.progress} / {run.total} Executed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(run.progress / run.total) * 100}%` }}></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className={`text-sm px-2 py-1 rounded border ${run.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700'}`}>
                  {run.status}
                </span>
                <Link to={`/executions/${run.id}`}>
                  <Button variant="outline" size="sm">Resume Execution</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
