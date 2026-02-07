import { AIType, Condition, SearchParams, HotelFilters, Hotel, CriteriaMatch } from '@/types/hotel';
import { fullMatchHotels, partialMatchHotels, getFullCriteria, getPartialCriteria } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  RotateCcw,
  Star,
  MapPin,
  Check,
  X,
  Building,
} from 'lucide-react';
import { motion } from 'framer-motion';
import humanAssistant from '@/assets/human-assistant.png';
import robotAssistant from '@/assets/robot-assistant.png';

interface Props {
  aiType: AIType;
  condition: Condition;
  searchParams: SearchParams;
  filters: HotelFilters;
  onBack: () => void;
  onReset: () => void;
}

const getAIMessage = (
  aiType: AIType,
  condition: Condition,
  destination: string,
  matchedCount: number,
  totalCount: number
) => {
  if (aiType === 'anthropogenic') {
    if (condition === 'full') {
      return {
        title: 'Great news! 🎉',
        message: `I've found some wonderful hotels in ${destination} that match everything you're looking for! Your trip is going to be amazing — all your preferences, from the star rating to your budget and amenities, have been perfectly matched. Here are my top recommendations for you and your family:`,
      };
    }
    return {
      title: 'Hi there! 😊',
      message: `I've searched through many options for your trip to ${destination}, and I want to be honest with you — I wasn't able to find hotels that match all of your preferences perfectly. But don't worry! I've found some lovely alternatives that come really close. Let me show you what's available:`,
    };
  }

  if (condition === 'full') {
    return {
      title: 'SEARCH ANALYSIS COMPLETE',
      message: `Status: ALL CRITERIA SATISFIED ✓ | Requirements matched: ${matchedCount}/${totalCount} (100%) | Processing complete. Displaying optimal hotel selections for destination: ${destination}.`,
    };
  }
  return {
    title: 'SEARCH ANALYSIS COMPLETE',
    message: `Status: PARTIAL CRITERIA MATCH | Requirements matched: ${matchedCount}/${totalCount} (${Math.round(
      (matchedCount / totalCount) * 100
    )}%) | Unable to satisfy all specified parameters for destination: ${destination}. Displaying best available options within given constraints.`,
  };
};

const HotelCard = ({ hotel, index }: { hotel: Hotel; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 + index * 0.1 }}
  >
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`h-40 ${hotel.gradient} flex items-end p-4 relative`}>
        <Building className="absolute top-4 right-4 h-8 w-8 text-primary-foreground/30" />
        <Badge
          className={`text-sm font-semibold ${
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
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-lg leading-tight">{hotel.name}</h4>
          <div className="flex items-center gap-1 text-accent shrink-0 ml-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-3 w-3" /> {hotel.location}
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
          ))}
          {Array.from({ length: 5 - hotel.stars }).map((_, i) => (
            <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-muted" />
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {hotel.amenities.map((a) => (
            <Badge key={a} variant="outline" className="text-xs">
              {a}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">${hotel.price}</span>
            <span className="text-muted-foreground text-sm"> /night</span>
          </div>
          <Button size="sm">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ResultsStep = ({ aiType, condition, searchParams, filters, onBack, onReset }: Props) => {
  const hotels = condition === 'full' ? fullMatchHotels : partialMatchHotels;
  const criteria =
    condition === 'full' ? getFullCriteria(filters) : getPartialCriteria(filters);
  const matchedCount = criteria.filter((c) => c.matched).length;

  const aiMsg = getAIMessage(aiType, condition, searchParams.to, matchedCount, criteria.length);

  return (
    <div className="space-y-6">
      {/* AI Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card
          className={`overflow-hidden border-2 ${
            aiType === 'anthropogenic' ? 'border-accent/30' : 'border-primary/30'
          }`}
        >
          <div
            className={`p-6 ${
              aiType === 'anthropogenic' ? 'ai-bg-anthropogenic' : 'ai-bg-robotic'
            }`}
          >
            <div className="flex items-start gap-5">
              {/* Assistant Avatar */}
              <div className="shrink-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <img
                    src={aiType === 'anthropogenic' ? humanAssistant : robotAssistant}
                    alt={aiType === 'anthropogenic' ? 'Human AI Assistant' : 'Robot AI Assistant'}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-card shadow-lg"
                  />
                </motion.div>
                <p className={`text-xs text-center mt-2 font-semibold ${
                  aiType === 'anthropogenic' ? 'text-accent' : 'text-primary'
                }`}>
                  {aiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
                </p>
              </div>

              {/* Chat Bubble */}
              <div className="flex-1 relative">
                <div
                  className={`absolute left-[-10px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ${
                    aiType === 'anthropogenic'
                      ? 'border-r-[10px] border-r-card'
                      : 'border-r-[10px] border-r-card'
                  }`}
                />
                <div className="bg-card rounded-2xl p-5 shadow-md">
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      aiType === 'robotic' ? 'font-mono tracking-wider' : ''
                    }`}
                  >
                    {aiMsg.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      aiType === 'robotic'
                        ? 'font-mono text-sm tracking-wide'
                        : 'text-base'
                    }`}
                  >
                    {aiMsg.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Criteria Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Requirements Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {criteria.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    c.matched
                      ? 'bg-success/10 border border-success/20'
                      : 'bg-destructive/10 border border-destructive/20'
                  }`}
                >
                  {c.matched ? (
                    <Check className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-destructive shrink-0" />
                  )}
                  <span
                    className={`text-sm capitalize ${
                      c.matched ? 'text-foreground' : 'text-destructive'
                    }`}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border text-sm text-muted-foreground">
              {matchedCount}/{criteria.length} criteria satisfied (
              {Math.round((matchedCount / criteria.length) * 100)}%)
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hotel Cards */}
      <div>
        <h3 className="font-semibold text-lg mb-4">
          {condition === 'full' ? 'Recommended Hotels' : 'Available Options'}
          <span className="text-muted-foreground text-sm font-normal ml-2">
            ({hotels.length} results)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 pb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Modify Filters
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" /> New Search
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
