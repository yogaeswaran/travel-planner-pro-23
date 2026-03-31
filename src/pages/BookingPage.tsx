import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { tripController } from '@/controllers/tripController';
import { bookingController } from '@/controllers/bookingController';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const BookingPage = () => {
  const { tripId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const trip = tripController.getTripById(tripId || '');

  const [passengers, setPassengers] = useState(1);
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!trip) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 text-center"><p className="text-muted-foreground">Trip not found.</p></div>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 text-center">
        <p className="text-muted-foreground mb-4">Please login to book a trip.</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingController.createBooking({
      userId: user!.id,
      tripId: trip.id,
      passengers,
      totalPrice: trip.price * passengers,
      status: 'confirmed',
      contactEmail: email,
      contactPhone: phone,
    });
    if (result.success) {
      setBooked(true);
      toast.success('Booking confirmed!');
    } else {
      toast.error(result.error || 'Booking failed');
    }
  };

  if (booked) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center shadow-elevated">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-2">{trip.destination} · {passengers} passenger(s)</p>
            <p className="text-2xl font-bold text-primary mb-6">${trip.price * passengers}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/my-bookings')}>My Bookings</Button>
              <Button onClick={() => navigate('/trips')}>Browse More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trip Details */}
          <div>
            <div className="rounded-xl overflow-hidden mb-6">
              <img src={trip.image} alt={trip.destination} className="w-full h-72 object-cover" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">{trip.destination}</h1>
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />From {trip.origin}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{trip.duration}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-secondary" />{trip.rating}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{trip.seats} seats</span>
            </div>
            <Badge className="bg-primary text-primary-foreground capitalize mb-4">{trip.category}</Badge>
            <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Departure:</strong> {trip.departureDate}</p>
              <p><strong>Return:</strong> {trip.returnDate}</p>
            </div>
          </div>

          {/* Booking Form */}
          <Card className="shadow-elevated h-fit">
            <CardHeader>
              <CardTitle className="font-heading">Book This Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <Input type="number" min={1} max={trip.seats} value={passengers} onChange={e => setPassengers(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="text-foreground">${trip.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="text-foreground">× {passengers}</span>
                  </div>
                  <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary text-xl">${trip.price * passengers}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">Confirm Booking</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
