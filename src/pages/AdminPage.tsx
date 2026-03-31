import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { tripController } from '@/controllers/tripController';
import { bookingController } from '@/controllers/bookingController';
import { db } from '@/models/data';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Settings, Users, Plane, Ticket, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState(tripController.getAllTrips());
  const [bookings, setBookings] = useState(bookingController.getAllBookings());
  const [users, setUsers] = useState(db.users.getAll());

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-destructive font-semibold mb-4">Access Denied. Admin privileges required.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleDeleteTrip = (id: string) => {
    tripController.deleteTrip(id);
    setTrips(tripController.getAllTrips());
    toast.success('Trip deleted');
  };

  const handleDeleteBooking = (id: string) => {
    bookingController.deleteBooking(id);
    setBookings(bookingController.getAllBookings());
    toast.success('Booking deleted');
  };

  const statusColor = (s: string) => {
    if (s === 'confirmed') return 'bg-accent text-accent-foreground';
    if (s === 'cancelled') return 'bg-destructive text-destructive-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" /> Admin Panel
        </h1>
        <p className="text-muted-foreground mb-8">Manage trips, bookings, and users</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Trips', value: trips.length, icon: Plane, color: 'text-primary' },
            { label: 'Total Bookings', value: bookings.length, icon: Ticket, color: 'text-secondary' },
            { label: 'Total Users', value: users.length, icon: Users, color: 'text-accent' },
          ].map(stat => (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trips">
          <TabsList>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="mt-6">
            <Card>
              <CardHeader><CardTitle>All Trips</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 px-2 text-muted-foreground font-medium">Destination</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Category</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Price</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Seats</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trips.map(trip => (
                        <tr key={trip.id} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium text-foreground">{trip.destination}</td>
                          <td className="py-3 px-2"><Badge variant="outline" className="capitalize">{trip.category}</Badge></td>
                          <td className="py-3 px-2 text-foreground">${trip.price}</td>
                          <td className="py-3 px-2 text-foreground">{trip.seats}</td>
                          <td className="py-3 px-2">
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteTrip(trip.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader><CardTitle>All Bookings</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 px-2 text-muted-foreground font-medium">Booking ID</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Trip</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Passengers</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Total</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Status</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => {
                        const trip = tripController.getTripById(b.tripId);
                        return (
                          <tr key={b.id} className="border-b border-border/50">
                            <td className="py-3 px-2 text-foreground font-mono text-xs">{b.id}</td>
                            <td className="py-3 px-2 text-foreground">{trip?.destination || 'N/A'}</td>
                            <td className="py-3 px-2 text-foreground">{b.passengers}</td>
                            <td className="py-3 px-2 font-medium text-foreground">${b.totalPrice}</td>
                            <td className="py-3 px-2"><Badge className={statusColor(b.status)}>{b.status}</Badge></td>
                            <td className="py-3 px-2">
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteBooking(b.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 px-2 text-muted-foreground font-medium">Name</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Email</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Role</th>
                        <th className="py-3 px-2 text-muted-foreground font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium text-foreground">{u.name}</td>
                          <td className="py-3 px-2 text-foreground">{u.email}</td>
                          <td className="py-3 px-2"><Badge variant={u.role === 'admin' ? 'default' : 'outline'}>{u.role}</Badge></td>
                          <td className="py-3 px-2 text-muted-foreground">{u.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
