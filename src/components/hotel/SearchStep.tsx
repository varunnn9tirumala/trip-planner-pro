import { useState } from 'react';
import { SearchParams } from '@/types/hotel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

interface Props {
  onNext: (params: SearchParams) => void;
}

const SearchStep = ({ onNext }: Props) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ from, to, checkIn, checkOut, guests });
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Where would you like to go?</CardTitle>
        <p className="text-muted-foreground">Tell us about your trip details</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-accent" /> From
              </Label>
              <Input
                id="from"
                placeholder="e.g., New Delhi, India"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-accent" /> To
              </Label>
              <Input
                id="to"
                placeholder="e.g., Paris, France"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkin" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-accent" /> Check-in
              </Label>
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-accent" /> Check-out
              </Label>
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 max-w-[200px]">
            <Label htmlFor="guests" className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-accent" /> Number of Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Continue to Preferences <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchStep;
