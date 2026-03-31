import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { bookingController } from '@/controllers/bookingController';
import { tripController } from '@/controllers/tripController';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, MapPin, X } from 'lucide-react';
import { toast } from 'sonner';

const MyBookingsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(user ? bookingController.getUserBookings(user.id) : []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-muted-foreground mb-4">Please login to view your bookings.</p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    );
  }

  const handleCancel = (id: string) => {
    bookingController.cancelBooking(id);
    setBookings(bookingController.getUserBookings(user!.id));
    toast.success('Booking cancelled');
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
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Ticket className="h-8 w-8 text-primary" /> My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">You don't have any bookings yet.</p>
            <Button onClick={() => navigate('/trips')}>Explore Trips</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => {
              const trip = tripController.getTripById(booking.tripId);
              return (
                <Card key={booking.id} className="shadow-card">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {trip && <img src={trip.image} alt={trip.destination} className="w-24 h-20 rounded-lg object-cover" loading="lazy" />}
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">{trip?.destination || 'Unknown Trip'}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{trip?.origin}</p>
                      <p className="text-sm text-muted-foreground">{booking.passengers} passengers · Booked {booking.bookedAt}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <Badge className={statusColor(booking.status)}>{booking.status}</Badge>
                      <span className="text-xl font-bold text-primary">${booking.totalPrice}</span>
                      {booking.status === 'confirmed' && (
                        <Button variant="outline" size="sm" onClick={() => handleCancel(booking.id)}>
                          <X className="h-3 w-3 mr-1" />Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
