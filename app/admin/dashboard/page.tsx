// app/dashboard/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { PanelLeft, Home, Copy, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type DashboardSection = 'overview' | 'users';

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<any[]>([]);
  const [notificationLog, setNotificationLog] = useState<string>('');

  const router = useRouter();

  const addNotification = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setNotificationLog(prevLog => `${timestamp}: ${message}\n${prevLog}`);
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin');
    } else {
      addNotification('Admin session active. Fetching user data...');
      const fetchUsers = async () => {
        try {
          const res = await fetch('/api/list-users');
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          if (data.users) {
            setUsers(data.users);
            addNotification(`Successfully fetched ${data.users.length} users.`);
            setRegistrationData([
              { name: 'Jan', users: 400 },
              { name: 'Feb', users: 300 },
              { name: 'Mar', users: 600 },
              { name: 'Apr', users: 800 },
              { name: 'May', users: 750 },
              { name: 'Jun', users: 1000 },
            ]);
          } else {
             addNotification('Fetched data but no users array found.');
          }
        } catch (error) {
          addNotification(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
          console.error("Failed to fetch users:", error);
        }
      };
      fetchUsers();
    }
  }, [router]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.phone.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [users, searchTerm]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addNotification(`Copied '${label}' to clipboard.`);
  };

  const handleCopyAllVisible = () => {
    if (filteredUsers.length === 0) {
      addNotification('No users to copy. The current filtered list is empty.');
      return;
    }
    const dataToCopy = filteredUsers.map(u =>
      `${u.firstName} ${u.lastName}, ${u.email}, ${u.phone}`
    ).join('\n');
    navigator.clipboard.writeText(dataToCopy);
    addNotification(`Copied data for ${filteredUsers.length} visible users.`);
  };

  const navItems = [
    { name: 'Overview', section: 'overview' as DashboardSection, icon: Home },
    { name: 'Users', section: 'users' as DashboardSection, icon: UserIcon, iconColor: 'text-red-500' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden fixed top-4 left-4 z-50">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          <nav className="grid gap-6 text-lg font-medium p-4 pt-10">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
            {navItems.map((item) => (
              <a
                key={item.name}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsMobileSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground cursor-pointer",
                  { "text-foreground": activeSection === item.section }
                )}
              >
                <item.icon className={cn("h-5 w-5", item.iconColor)} />
                {item.name}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col gap-4 p-4 lg:p-6">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <UserIcon className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer",
                { "bg-muted text-primary": activeSection === item.section }
              )}
            >
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-72">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-xl font-semibold md:text-2xl">
            {activeSection === 'overview' ? 'Dashboard Overview' : 'Registered Users'}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {activeSection === 'overview' && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Total Users Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month (example)
                  </p>
                </CardContent>
              </Card>

              {/* User Registration Growth Chart (using shadcn/ui ChartContainer) */}
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>User Registration Growth</CardTitle>
                  <CardDescription>Monthly new user registrations.</CardDescription>
                </CardHeader>
                <CardContent>
                  {registrationData.length > 0 ? (
                    <ChartContainer
                      config={{
                        users: {
                          label: 'Users',
                          color: 'hsl(var(--primary))',
                        },
                      }}
                      className="h-[300px]"
                    >
                      <BarChart data={registrationData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <p className="text-center text-gray-500 py-10">No chart data available.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="p-0 sm:p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Registered Users</CardTitle>
                  <CardDescription>
                    Manage and view details of all registered users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Input
                      type="text"
                      placeholder="Search users by name, email, or phone..."
                      className="max-w-sm flex-grow"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={handleCopyAllVisible} className="gap-2">
                      <Copy className="h-4 w-4" /> Copy All Visible
                    </Button>
                  </div>

                  <div className="rounded-xl border shadow-sm overflow-auto mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>First Name</TableHead>
                          <TableHead>Last Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length ? (
                          filteredUsers.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell>{u.firstName}</TableCell>
                              <TableCell>{u.lastName}</TableCell>
                              <TableCell>{u.email}</TableCell>
                              <TableCell>{u.phone}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopy(u.email, `Email (${u.email})`)}
                                  title="Copy Email"
                                >
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Copy Email</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopy(`${u.firstName} ${u.lastName} ${u.email} ${u.phone}`, `User Data (${u.firstName})`)}
                                  title="Copy User Data"
                                >
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Copy User Data</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              No users found matching your search.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Notification Log Textarea */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Activity Log</CardTitle>
                      <CardDescription>Recent actions and system messages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        readOnly
                        value={notificationLog}
                        className="w-full h-40 p-3 text-sm font-mono bg-muted border border-border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent overflow-y-auto"
                        placeholder="Activity log will appear here..."
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}