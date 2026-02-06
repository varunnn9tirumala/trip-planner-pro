import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AIType, Condition, SearchParams, HotelFilters } from '@/types/hotel';
import SearchStep from '@/components/hotel/SearchStep';
import FilterStep from '@/components/hotel/FilterStep';
import ResultsStep from '@/components/hotel/ResultsStep';
import { Plane, User, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HotelSearch = () => {
  const { aiType, condition } = useParams<{ aiType: string; condition: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [filters, setFilters] = useState<HotelFilters | null>(null);

  const validAiType: AIType =
    aiType === 'anthropogenic' || aiType === 'robotic' ? aiType : 'anthropogenic';
  const validCondition: Condition =
    condition === 'full' || condition === 'partial' ? condition : 'full';

  const handleSearchNext = (params: SearchParams) => {
    setSearchParams(params);
    setStep(2);
  };

  const handleFilterNext = (f: HotelFilters) => {
    setFilters(f);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSearchParams(null);
    setFilters(null);
  };

  const steps = ['Search', 'Preferences', 'Results'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer text-primary-foreground"
            onClick={() => navigate('/')}
          >
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">TripMatch</span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    i + 1 <= step
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary-foreground/20 text-primary-foreground/60'
                  }`}
                >
                  {i + 1}
                </div>
                <span className="ml-1.5 mr-3 hidden sm:inline text-sm text-primary-foreground/80">
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-6 h-px bg-primary-foreground/30 mr-2" />
                )}
              </div>
            ))}
          </div>

          {/* Active Condition Badge */}
          <Badge
            variant="secondary"
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            {validAiType === 'anthropogenic' ? (
              <User className="h-3 w-3" />
            ) : (
              <Bot className="h-3 w-3" />
            )}
            {validAiType === 'anthropogenic' ? 'Human AI' : 'Robotic AI'} ·{' '}
            {validCondition === 'full' ? 'Full' : 'Partial'}
          </Badge>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchStep onNext={handleSearchNext} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="filter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FilterStep onNext={handleFilterNext} onBack={() => setStep(1)} />
            </motion.div>
          )}
          {step === 3 && searchParams && filters && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsStep
                aiType={validAiType}
                condition={validCondition}
                searchParams={searchParams}
                filters={filters}
                onBack={() => setStep(2)}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HotelSearch;
