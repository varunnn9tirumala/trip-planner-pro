import { useState } from 'react';
import { HotelFilters } from '@/types/hotel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, Star, MapPin, Wifi, Search } from 'lucide-react';

interface Props {
  onNext: (filters: HotelFilters) => void;
  onBack: () => void;
}

const FilterStep = ({ onNext, onBack }: Props) => {
  const [priceRange, setPriceRange] = useState('mid-range');
  const [starRating, setStarRating] = useState<number[]>([4, 5]);
  const [rooms, setRooms] = useState(1);
  const [location, setLocation] = useState('city-center');
  const [amenities, setAmenities] = useState<string[]>(['wifi', 'breakfast']);

  const toggleStar = (star: number) => {
    setStarRating((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ priceRange, starRating, rooms, location, amenities });
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          ✅ Your Preferences Checklist
        </CardTitle>
        <p className="text-muted-foreground">
          Help us find the perfect hotel — select your requirements below
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-accent" /> Price Range (per night)
            </Label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'budget', label: 'Budget ($0–$100)' },
                { value: 'mid-range', label: 'Mid-Range ($100–$250)' },
                { value: 'luxury', label: 'Luxury ($250+)' },
              ].map((opt) => (
                <Badge
                  key={opt.value}
                  variant={priceRange === opt.value ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm transition-colors"
                  onClick={() => setPriceRange(opt.value)}
                >
                  {opt.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" /> Star Rating
            </Label>
            <div className="flex flex-wrap gap-5">
              {[3, 4, 5].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <Checkbox
                    id={`star-${star}`}
                    checked={starRating.includes(star)}
                    onCheckedChange={() => toggleStar(star)}
                  />
                  <Label htmlFor={`star-${star}`} className="cursor-pointer flex items-center gap-1">
                    {star}
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Rooms */}
          <div className="space-y-3">
            <Label htmlFor="rooms" className="text-base font-semibold">
              Number of Rooms
            </Label>
            <Input
              id="rooms"
              type="number"
              min={1}
              max={10}
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="max-w-32"
            />
          </div>

          {/* Location Preference */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" /> Preferred Location
            </Label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'city-center', label: 'City Center' },
                { value: 'near-airport', label: 'Near Airport' },
                { value: 'tourist-area', label: 'Tourist Area' },
                { value: 'suburban', label: 'Suburban' },
              ].map((opt) => (
                <Badge
                  key={opt.value}
                  variant={location === opt.value ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm transition-colors"
                  onClick={() => setLocation(opt.value)}
                >
                  {opt.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Wifi className="h-5 w-5 text-accent" /> Amenities
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['wifi', 'pool', 'gym', 'spa', 'breakfast', 'parking', 'restaurant', 'bar'].map(
                (amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer capitalize text-sm">
                      {amenity}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button type="submit" size="lg">
              <Search className="h-4 w-4 mr-2" /> Search Hotels
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FilterStep;
