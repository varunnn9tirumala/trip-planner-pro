import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, User, Bot, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-travel.jpg';

const variants = [
  {
    aiType: 'anthropogenic',
    condition: 'full',
    title: 'Anthropogenic AI',
    subtitle: 'Full Satisfaction',
    description: 'Human-like, warm AI assistant that finds hotels matching ALL your requirements perfectly.',
    icon: <User className="h-6 w-6" />,
    matched: true,
    isHuman: true,
  },
  {
    aiType: 'anthropogenic',
    condition: 'partial',
    title: 'Anthropogenic AI',
    subtitle: 'Partial Satisfaction',
    description: 'Human-like, warm AI assistant that cannot fully satisfy all your preferences.',
    icon: <User className="h-6 w-6" />,
    matched: false,
    isHuman: true,
  },
  {
    aiType: 'robotic',
    condition: 'full',
    title: 'Robotic AI',
    subtitle: 'Full Satisfaction',
    description: 'Machine-like, systematic AI that finds hotels matching ALL your requirements precisely.',
    icon: <Bot className="h-6 w-6" />,
    matched: true,
    isHuman: false,
  },
  {
    aiType: 'robotic',
    condition: 'partial',
    title: 'Robotic AI',
    subtitle: 'Partial Satisfaction',
    description: 'Machine-like, systematic AI that cannot fulfill all specified parameters.',
    icon: <Bot className="h-6 w-6" />,
    matched: false,
    isHuman: false,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={heroImage}
          alt="Beautiful Paris skyline at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Plane className="h-10 w-10 text-primary-foreground" />
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary-foreground">
                  TripMatch
                </h1>
              </div>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Hotel Search Experience — Research Platform
              </p>
              <p className="text-sm text-primary-foreground/70 mt-3 max-w-lg mx-auto">
                Compare how different AI personalities present hotel search results under varying satisfaction conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Research Condition Cards */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Choose a Research Condition
          </h2>
          <p className="text-muted-foreground mt-2">
            2 AI Types × 2 Satisfaction Levels = 4 Conditions
          </p>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-2 gap-6 mb-3 pl-0">
          <div className="text-center">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
              <Check className="h-3 w-3 mr-1" /> Full Satisfaction
            </Badge>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
              <X className="h-3 w-3 mr-1" /> Partial Satisfaction
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {variants.map((v, i) => (
            <motion.div
              key={`${v.aiType}-${v.condition}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  v.isHuman
                    ? 'border-accent/30 hover:border-accent'
                    : 'border-primary/30 hover:border-primary'
                }`}
                onClick={() => navigate(`/search/${v.aiType}/${v.condition}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center ${
                          v.isHuman
                            ? 'bg-accent/10 text-accent'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {v.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{v.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{v.subtitle}</p>
                      </div>
                    </div>
                    {v.matched ? (
                      <Badge className="bg-success text-success-foreground text-xs">
                        <Check className="h-3 w-3 mr-1" /> All Met
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <X className="h-3 w-3 mr-1" /> Partial
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{v.description}</p>
                  <Button
                    className="w-full"
                    variant={v.isHuman ? 'default' : 'outline'}
                  >
                    Start Simulation →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 text-xs text-muted-foreground">
          <p>This is a research tool for studying AI interaction design in hotel booking experiences.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
