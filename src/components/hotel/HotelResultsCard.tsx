import { Hotel, Condition } from '@/types/hotel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Building } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  hotels: Hotel[];
  condition: Condition;
}

const HotelResultsCard = ({ hotels, condition }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">
      {condition === 'full' ? 'Recommended Hotels' : 'Available Options'}
      <span className="text-muted-foreground text-sm font-normal ml-2">
        ({hotels.length} results)
      </span>
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hotels.map((hotel, i) => (
        <motion.div
          key={hotel.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className={`h-32 ${hotel.gradient} flex items-end p-3 relative`}>
              <Building className="absolute top-3 right-3 h-6 w-6 text-primary-foreground/30" />
              <Badge
                className={`text-xs font-semibold ${
                  hotel.matchPercentage >= 90
                    ? 'bg-success text-success-foreground'
                    : hotel.matchPercentage >= 60
                    ? 'bg-warning text-warning-foreground'
                    : 'bg-destructive text-destructive-foreground'
                }`}
              >
                {hotel.matchPercentage}% Match
              </Badge>
            </div>
            <CardContent className="pt-3 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-sm leading-tight">{hotel.name}</h4>
                <div className="flex items-center gap-1 text-accent shrink-0 ml-2">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-medium">{hotel.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <MapPin className="h-3 w-3" /> {hotel.location}
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {hotel.amenities.slice(0, 4).map((a) => (
                  <Badge key={a} variant="outline" className="text-[10px]">
                    {a}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <span className="text-xl font-bold text-primary">${hotel.price}</span>
                  <span className="text-muted-foreground text-xs"> /night</span>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HotelResultsCard;
