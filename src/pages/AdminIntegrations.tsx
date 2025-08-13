import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, RefreshCw, Settings, Database, Wifi, Calendar } from "lucide-react";

const AdminIntegrations = () => {
  // Mock data for integration status
  const isamsStatus = {
    connected: true,
    mode: "API",
    lastSync: "2024-01-12 03:00:15",
    recordsChanged: 3,
    status: "healthy"
  };

  const graphStatus = {
    connected: true,
    lastEmail: "2024-01-12 14:30:22",
    status: "healthy"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Manage external system connections and data synchronization
        </p>
      </div>

      {/* ISAMS Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>ISAMS Student Information System</CardTitle>
                <CardDescription>
                  Student roster synchronization and identity management
                </CardDescription>
              </div>
            </div>
            <Badge variant={isamsStatus.connected ? "default" : "destructive"}>
              {isamsStatus.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Connection Mode</p>
              <p className="text-sm text-muted-foreground">{isamsStatus.mode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Last Sync</p>
              <p className="text-sm text-muted-foreground">{isamsStatus.lastSync}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Records Changed</p>
              <p className="text-sm text-muted-foreground">{isamsStatus.recordsChanged} students</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            {isamsStatus.status === "healthy" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm">
              {isamsStatus.status === "healthy" ? "Connection healthy" : "Connection issues detected"}
            </span>
          </div>

          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              ISAMS sync runs automatically at 3:00 AM daily. Manual sync available for administrators.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Wifi className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" size="sm">
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Microsoft Graph Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Microsoft Graph API</CardTitle>
                <CardDescription>
                  Email notifications and calendar integration
                </CardDescription>
              </div>
            </div>
            <Badge variant={graphStatus.connected ? "default" : "destructive"}>
              {graphStatus.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Last Email Sent</p>
              <p className="text-sm text-muted-foreground">{graphStatus.lastEmail}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Email Template</p>
              <p className="text-sm text-muted-foreground">SFC Library Notifications</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            {graphStatus.status === "healthy" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm">
              Email service operational
            </span>
          </div>

          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Automatic notifications: Borrow receipts, due reminders (T-2 days), overdue alerts (T+1 day).
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Test Email
            </Button>
            <Button variant="outline" size="sm">
              View Templates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Configuration</CardTitle>
          <CardDescription>
            System-wide integration settings and environment configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">ISAMS Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode:</span>
                  <span>API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Endpoint:</span>
                  <span>https://isams.school.edu/api</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sync Schedule:</span>
                  <span>0 3 * * * (Daily 3 AM)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Email Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From Address:</span>
                  <span>noreply@school.edu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span>Microsoft Graph</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calendar Events:</span>
                  <span>Enabled</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure Integrations
            </Button>
            <Button variant="outline">
              View All Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIntegrations;