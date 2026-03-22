import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function TestCaseCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Draft');
  const [steps, setSteps] = useState([{ action: '', expectedResult: '' }]);

  const handleAddStep = () => setSteps([...steps, { action: '', expectedResult: '' }]);
  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };
  const handleRemoveStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wrap with API post call
    toast.success("Test Case created successfully");
    navigate('/test-cases');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Test Case</h1>
        <Button variant="outline" onClick={() => navigate('/test-cases')}>Cancel</Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>General Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="e.g., Verify user login..." value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Detailed description..." value={description} onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-r-8" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-r-8" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Draft</option>
                  <option>Ready for Review</option>
                  <option>Approved</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Test Steps</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>Add Step</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex space-x-4 items-start border p-4 rounded-md relative group">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Action</Label>
                    <Input placeholder="What the tester should do" value={step.action} onChange={e => handleStepChange(index, 'action', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Result</Label>
                    <Input placeholder="What should happen" value={step.expectedResult} onChange={e => handleStepChange(index, 'expectedResult', e.target.value)} required />
                  </div>
                </div>
                {steps.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveStep(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end border-t p-6">
            <Button type="submit">Save Test Case</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
