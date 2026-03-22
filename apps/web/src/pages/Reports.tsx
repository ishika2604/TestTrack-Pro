import {} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Reports() {
  // Mock data representing the aggregation query results
  const executionData = { total: 145, passed: 128, failed: 12, blocked: 3, skipped: 2, passRate: 88.3 };
  const bugData = { total: 42, open: 15, fixed: 20, criticalOpen: 2 };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Execution Metrics */}
        <Card>
          <CardHeader><CardTitle>Test Execution Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600">{executionData.passRate}%</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Total Executed</p>
                <p className="text-3xl font-bold">{executionData.total}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold text-green-600">{executionData.passed}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{executionData.failed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bug Metrics */}
        <Card>
          <CardHeader><CardTitle>Bug Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Open Bugs</p>
                <p className="text-3xl font-bold text-blue-600">{bugData.open}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Critical Open</p>
                <p className="text-3xl font-bold text-red-600">{bugData.criticalOpen}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Fixed</p>
                <p className="text-2xl font-bold text-green-600">{bugData.fixed}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground">Total Logged</p>
                <p className="text-2xl font-bold">{bugData.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
