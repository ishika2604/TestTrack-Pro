import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // const res = await fetch('http://localhost:4000/api/auth/login', { ... })
      // For now, mock success if email contains test
      const emailLower = email.toLowerCase();
      if (emailLower.includes('admin')) {
        login('mock-jwt-token', { id: '1', name: 'Admin User', email, role: 'ADMIN' });
        toast.success("Logged in as Admin");
        navigate('/dashboard');
      } else if (emailLower.includes('tester')) {
        login('mock-jwt-token', { id: '2', name: 'QA Tester', email, role: 'TESTER' });
        toast.success("Logged in as Tester");
        navigate('/dashboard');
      } else if (emailLower.includes('dev')) {
        login('mock-jwt-token', { id: '3', name: 'Software Developer', email, role: 'DEVELOPER' });
        toast.success("Logged in as Developer");
        navigate('/dashboard');
      } else {
        toast.error("Mock email must contain 'admin', 'tester', or 'dev'");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">TestTrack Pro</CardTitle>
          <CardDescription className="text-center">Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Register here</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
