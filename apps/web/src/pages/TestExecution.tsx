import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const mockExecution = {
  id: 'exec-123',
  testCase: {
    title: 'Verify user login with valid credentials',
    customId: 'TC-2024-00142',
    description: 'This test verifies that a user can login...',
    steps: [
      { id: 's1', stepNumber: 1, action: 'Open login page', expectedResult: 'Page loads' },
      { id: 's2', stepNumber: 2, action: 'Enter valid credentials', expectedResult: 'Inputs accepted' },
      { id: 's3', stepNumber: 3, action: 'Click Sign In', expectedResult: 'Redirected to dashboard' }
    ]
  }
};

export default function TestExecution() {
  const navigate = useNavigate();
  const [stepResults, setStepResults] = useState<Record<string, { status: string, actualResult: string, attachment?: File }>>({});

  const handleStatusUpdate = (stepId: string, status: string) => {
    setStepResults(prev => ({ ...prev, [stepId]: { ...prev[stepId], status } }));
  };

  const handleActualResultUpdate = (stepId: string, actualResult: string) => {
    setStepResults(prev => ({ ...prev, [stepId]: { ...prev[stepId], actualResult } }));
  };

  const handleFileUpload = (stepId: string, file: File | null) => {
    if (file) {
      setStepResults(prev => ({ ...prev, [stepId]: { ...prev[stepId], attachment: file } }));
      toast.success(`Attached ${file.name}`);
    }
  };

  const completeExecution = () => {
    toast.success("Test execution saved");
    navigate('/test-runs');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{mockExecution.testCase.customId}</p>
          <h1 className="text-3xl font-bold tracking-tight">{mockExecution.testCase.title}</h1>
        </div>
        <div className="space-x-2">
          <Button variant="destructive">Fail & Create Bug</Button>
          <Button onClick={completeExecution}>Complete Execution</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Execution Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockExecution.testCase.steps.map((step) => (
            <div key={step.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Step {step.stepNumber}</h3>
                  <p className="text-sm mt-1 border-l-2 pl-3 py-1 bg-slate-50 italic">{step.action}</p>
                  <p className="text-sm mt-3 font-medium text-slate-700">Expected: {step.expectedResult}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant={stepResults[step.id]?.status === 'Pass' ? 'default' : 'outline'} className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate(step.id, 'Pass')}>Pass</Button>
                  <Button size="sm" variant={stepResults[step.id]?.status === 'Fail' ? 'default' : 'outline'} className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleStatusUpdate(step.id, 'Fail')}>Fail</Button>
                  <Button size="sm" variant={stepResults[step.id]?.status === 'Blocked' ? 'default' : 'outline'} className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => handleStatusUpdate(step.id, 'Blocked')}>Blocked</Button>
                </div>
              </div>
              <div className="pt-4 border-t space-y-4">
                <div>
                  <Label>Actual Result</Label>
                  <Input 
                    className="mt-1" 
                    placeholder="What actually happened..." 
                    value={stepResults[step.id]?.actualResult || ''}
                    onChange={e => handleActualResultUpdate(step.id, e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Evidence Attachment</Label>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-slate-600">
                    <Input 
                      type="file" 
                      className="max-w-[300px]" 
                      onChange={e => handleFileUpload(step.id, e.target.files?.[0] || null)}
                    />
                    {stepResults[step.id]?.attachment && (
                      <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Attached: {stepResults[step.id]?.attachment?.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
