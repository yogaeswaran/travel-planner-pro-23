import { Trip } from '@/models/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip }: { trip: Trip }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 group">
      <div className="relative h-52 overflow-hidden">
        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={1024} height={720} />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">{trip.category}</Badge>
          {trip.featured && <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>}
        </div>
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
          <span className="text-xs font-semibold text-foreground">{trip.rating}</span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{trip.destination}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
          <MapPin className="h-3.5 w-3.5" /> From {trip.origin}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{trip.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{trip.duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{trip.seats} seats left</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${trip.price}</span>
            <span className="text-xs text-muted-foreground">/person</span>
          </div>
          <Button size="sm" onClick={() => navigate(`/book/${trip.id}`)}>Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
