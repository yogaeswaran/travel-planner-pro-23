import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripController } from '@/controllers/tripController';
import TripCard from '@/components/TripCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-travel.jpg';
import { Search, MapPin, Shield, Headphones } from 'lucide-react';

const HomePage = () => {
  const featured = tripController.getFeaturedTrips();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/trips?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Travel destinations" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in">
          <Badge className="bg-secondary text-secondary-foreground mb-4">✈️ Explore the World</Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
            Your Journey<br />Starts Here
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Discover extraordinary destinations with SSK Travel. Handcrafted trips, unbeatable prices, unforgettable memories.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/95 backdrop-blur-sm border-none h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-6">Search</Button>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">Why Travel With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: 'Curated Destinations', desc: 'Hand-picked locations vetted by travel experts for the best experience.' },
            { icon: Shield, title: 'Secure Booking', desc: 'Your payments and personal data are protected with industry-standard security.' },
            { icon: Headphones, title: '24/7 Support', desc: 'Our dedicated team is available around the clock to assist you.' },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 rounded-xl bg-card shadow-card">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground">Featured Trips</h2>
            <Button variant="outline" onClick={() => navigate('/trips')}>View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
