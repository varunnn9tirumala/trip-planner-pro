import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionData } from '@/types/hotel';
import { getSessions, clearSessions, exportAsCSV, exportAsJSON, downloadFile } from '@/utils/sessionStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plane,
  Download,
  Trash2,
  FileSpreadsheet,
  FileJson,
  ArrowLeft,
  Users,
  BarChart3,
  Clock,
  Lock,
} from 'lucide-react';

const ADMIN_USERNAME = 'SRMAPresearch';
const ADMIN_PASSWORD = 'SRMAPuser123';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setSessions(getSessions());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground">Enter your credentials to access the research panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all session data?')) {
      clearSessions();
      setSessions([]);
    }
  };

  const handleExportCSV = () => {
    const csv = exportAsCSV(sessions);
    downloadFile(csv, `tripmatch-data-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
  };

  const handleExportJSON = () => {
    const json = exportAsJSON(sessions);
    downloadFile(json, `tripmatch-data-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  };

  // Stats
  const totalSessions = sessions.length;
  const proceedCount = sessions.filter((s) => s.decision === 'proceed').length;
  const discardCount = sessions.filter((s) => s.decision === 'discard').length;
  const anthropogenicCount = sessions.filter((s) => s.aiType === 'anthropogenic').length;
  const roboticCount = sessions.filter((s) => s.aiType === 'robotic').length;
  const fullCount = sessions.filter((s) => s.condition === 'full').length;
  const partialCount = sessions.filter((s) => s.condition === 'partial').length;
  const avgDuration = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / totalSessions)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 cursor-pointer text-primary-foreground"
              onClick={() => navigate('/')}
            >
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">TripMatch</span>
            </div>
            <Badge variant="secondary" className="text-xs">Admin Panel</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalSessions}</p>
                  <p className="text-xs text-muted-foreground">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-success">{proceedCount}</p>
                  <p className="text-xs text-muted-foreground">Proceeded</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">{discardCount}</p>
                  <p className="text-xs text-muted-foreground">Discarded</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{avgDuration}s</p>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">By AI Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Anthropogenic (Sara)</span>
                  <Badge>{anthropogenicCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Robotic (AI-X7)</span>
                  <Badge variant="secondary">{roboticCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">By Condition (Random)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Full Satisfaction</span>
                  <Badge className="bg-success text-success-foreground">{fullCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Partial Satisfaction</span>
                  <Badge variant="secondary">{partialCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export & Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExportCSV} disabled={totalSessions === 0}>
            <FileSpreadsheet className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" onClick={handleExportJSON} disabled={totalSessions === 0}>
            <FileJson className="h-4 w-4 mr-2" /> Export JSON
          </Button>
          <Button variant="destructive" onClick={handleClear} disabled={totalSessions === 0}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear All Data
          </Button>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4" /> Session Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalSessions === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No sessions recorded yet. Users need to complete the chatbot flow first.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>AI Type</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Decision</TableHead>
                      <TableHead>From → To</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Criteria</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((s, i) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-mono text-xs">{i + 1}</TableCell>
                        <TableCell>
                          <Badge variant={s.aiType === 'anthropogenic' ? 'default' : 'secondary'}>
                            {s.aiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={s.condition === 'full' ? 'border-success text-success' : ''}
                          >
                            {s.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              s.decision === 'proceed'
                                ? 'bg-success text-success-foreground'
                                : 'bg-destructive text-destructive-foreground'
                            }
                          >
                            {s.decision}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {s.searchParams.from} → {s.searchParams.to}
                        </TableCell>
                        <TableCell className="text-xs">{s.duration}s</TableCell>
                        <TableCell className="text-xs">
                          {s.criteriaMatched}/{s.criteriaTotal}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(s.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPanel;
