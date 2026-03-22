import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const mockBug = {
  customId: 'BUG-2024-0089',
  title: 'Login fails with valid credentials',
  description: 'When attempting to login with valid credentials, the system shows "Invalid credentials" error.',
  stepsToReproduce: '1. Go to /login\n2. Enter valid email\n3. Click Sign In',
  status: 'In Progress',
  priority: 'High',
  severity: 'Critical',
  reporter: 'Jane Tester',
  assignedTo: 'Mike Developer',
  comments: [
    { id: 'c1', author: 'Mike Developer', text: 'Looking into this now.', createdAt: '2024-01-15T10:00:00Z' }
  ]
};

export default function BugDetail() {
  const [commentText, setCommentText] = useState('');

  const submitComment = () => {
    if (!commentText.trim()) return;
    toast.success("Comment added");
    setCommentText('');
  };

  const markFixed = () => {
    toast.success("Bug marked as Fixed");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 flex gap-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{mockBug.customId}</p>
            <h1 className="text-2xl font-bold tracking-tight">{mockBug.title}</h1>
          </div>
          <Button onClick={markFixed} className="bg-green-600 hover:bg-green-700">Mark as Fixed</Button>
        </div>

        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent><p className="whitespace-pre-wrap text-sm">{mockBug.description}</p></CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Steps to Reproduce</CardTitle></CardHeader>
          <CardContent><p className="whitespace-pre-wrap text-sm font-mono bg-slate-50 p-4 rounded-md">{mockBug.stepsToReproduce}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Comments</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mockBug.comments.map(c => (
              <div key={c.id} className="border-b pb-4">
                <p className="text-sm font-semibold">{c.author} <span className="text-xs text-muted-foreground font-normal ml-2">{new Date(c.createdAt).toLocaleString()}</span></p>
                <p className="text-sm mt-1">{c.text}</p>
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Label>Add a comment</Label>
              <textarea 
                className="w-full rounded-md border p-3 text-sm min-h-[100px]"
                placeholder="Type your comment here..."
                value={commentText} onChange={e => setCommentText(e.target.value)}
              />
              <Button onClick={submitComment}>Post Comment</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-80 space-y-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><span className="text-muted-foreground block text-xs">Status</span><span className="font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full border text-xs">{mockBug.status}</span></div>
            <div><span className="text-muted-foreground block text-xs">Priority</span><span className="font-medium">{mockBug.priority}</span></div>
            <div><span className="text-muted-foreground block text-xs">Severity</span><span className="font-medium">{mockBug.severity}</span></div>
            <div><span className="text-muted-foreground block text-xs">Assignee</span><span className="font-medium">{mockBug.assignedTo}</span></div>
            <div><span className="text-muted-foreground block text-xs">Reporter</span><span className="font-medium">{mockBug.reporter}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
