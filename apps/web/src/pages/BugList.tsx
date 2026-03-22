import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';

const mockBugs = [
  { id: '1', customId: 'BUG-2024-0089', title: 'Login fails with valid credentials', priority: 'High', severity: 'Critical', status: 'In Progress', assignedTo: 'Mike Developer' },
  { id: '2', customId: 'BUG-2024-0090', title: 'Dashboard layout broken on mobile', priority: 'Medium', severity: 'Major', status: 'New', assignedTo: 'Unassigned' }
];

export default function BugList() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bug Tracker</h1>
        <Button>Report Bug</Button>
      </div>

      <div className="flex space-x-4">
        <Input 
          placeholder="Search bugs..." 
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
              <div className="w-32 text-center">Severity</div>
              <div className="w-32 text-center">Status</div>
              <div className="w-40">Assigned To</div>
            </div>
            {mockBugs.map(bug => (
              <div key={bug.id} className="flex p-4 text-sm items-center hover:bg-muted/50 transition-colors">
                <div className="w-32 font-medium text-primary hover:underline">
                  <Link to={`/bugs/${bug.id}`}>{bug.customId}</Link>
                </div>
                <div className="flex-1 font-medium">{bug.title}</div>
                <div className="w-32 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${bug.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                    {bug.severity}
                  </span>
                </div>
                <div className="w-32 text-center">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-200">
                    {bug.status}
                  </span>
                </div>
                <div className="w-40 text-muted-foreground">{bug.assignedTo}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
