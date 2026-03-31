import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tripController } from '@/controllers/tripController';
import TripCard from '@/components/TripCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const categories = ['all', 'beach', 'mountain', 'city', 'adventure'];

const TripsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('all');
  const [trips, setTrips] = useState(tripController.getAllTrips());

  useEffect(() => {
    setTrips(tripController.searchTrips(query, category));
  }, [query, category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Explore Trips</h1>
        <p className="text-muted-foreground mb-8">Find your perfect getaway from our curated collection</p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search destinations..." value={query} onChange={e => setQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" onClick={() => setCategory(cat)} className="capitalize">
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {trips.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No trips found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setQuery(''); setCategory('all'); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TripsPage;
