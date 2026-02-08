import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-travel.jpg';
import humanAssistant from '@/assets/human-assistant.png';
import robotAssistant from '@/assets/robot-assistant.png';

const assistants = [
  {
    aiType: 'anthropogenic',
    name: 'Sara',
    subtitle: 'Your Human-like Travel Assistant',
    description:
      'Warm, friendly, and empathetic — Sara chats with you like a real travel advisor, using natural language and emotional cues to understand your needs.',
    image: humanAssistant,
  },
  {
    aiType: 'robotic',
    name: 'AI-X7',
    subtitle: 'Systematic AI Travel Unit',
    description:
      'Precise, efficient, and data-driven — AI-X7 processes your requirements methodically and delivers results with machine-like accuracy.',
    image: robotAssistant,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
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
                Find your perfect hotel with AI assistance
              </p>
              <p className="text-sm text-primary-foreground/70 mt-3 max-w-lg mx-auto">
                Choose your travel assistant and start chatting to discover the best hotels for your trip
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Assistant Selection */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Choose Your Travel Assistant
          </h2>
          <p className="text-muted-foreground mt-2">
            Each assistant has a unique personality — pick the one you'd like to chat with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assistants.map((a, i) => (
            <motion.div
              key={a.aiType}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${
                  a.aiType === 'anthropogenic'
                    ? 'border-accent/30 hover:border-accent'
                    : 'border-primary/30 hover:border-primary'
                }`}
                onClick={() => navigate(`/chat/${a.aiType}`)}
              >
                <CardHeader className="text-center pb-2 pt-8">
                  <motion.img
                    src={a.image}
                    alt={a.name}
                    className={`w-28 h-28 rounded-full object-cover mx-auto border-4 shadow-lg ${
                      a.aiType === 'anthropogenic' ? 'border-accent/50' : 'border-primary/50'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <CardTitle className={`text-2xl mt-4 ${
                    a.aiType === 'robotic' ? 'font-mono tracking-wider' : ''
                  }`}>
                    {a.name}
                  </CardTitle>
                  <p className={`text-sm ${
                    a.aiType === 'anthropogenic' ? 'text-accent' : 'text-primary'
                  }`}>
                    {a.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-muted-foreground text-sm mb-6">
                    {a.description}
                  </p>
                  <Button
                    size="lg"
                    className="w-full"
                    variant={a.aiType === 'anthropogenic' ? 'default' : 'outline'}
                  >
                    {a.aiType === 'anthropogenic'
                      ? 'Chat with Sara 💬'
                      : 'INITIALIZE AI-X7 ▶'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Admin link */}
        <div className="text-center mt-12">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={() => navigate('/admin')}
          >
            <Settings className="h-3 w-3 mr-1" /> Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
