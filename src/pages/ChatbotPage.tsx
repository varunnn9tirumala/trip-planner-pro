import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AIType,
  Condition,
  ChatMessage,
  ChatStep,
  SearchParams,
  HotelFilters,
  Hotel,
  CriteriaMatch,
} from '@/types/hotel';
import { fullMatchHotels, partialMatchHotels, getFullCriteria, getPartialCriteria } from '@/data/hotels';
import { saveSession } from '@/utils/sessionStorage';
import ChatMessageComponent from '@/components/hotel/ChatMessage';
import HotelResultsCard from '@/components/hotel/HotelResultsCard';
import CriteriaChecklist from '@/components/hotel/CriteriaChecklist';
import DecisionButtons from '@/components/hotel/DecisionButtons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plane, Send } from 'lucide-react';
import humanAssistant from '@/assets/human-assistant.png';
import robotAssistant from '@/assets/robot-assistant.png';

const ChatbotPage = () => {
  const { aiType } = useParams<{ aiType: string }>();
  const navigate = useNavigate();

  const validAiType: AIType =
    aiType === 'anthropogenic' || aiType === 'robotic' ? aiType : 'anthropogenic';

  // Randomly assign condition
  const [condition] = useState<Condition>(() =>
    Math.random() < 0.5 ? 'full' : 'partial'
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [inputValue, setInputValue] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [sessionStart] = useState(Date.now());

  // Collected data
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });
  const [filters, setFilters] = useState<HotelFilters>({
    priceRange: '',
    starRating: [],
    rooms: 1,
    location: '',
    amenities: [],
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const addAIMessage = (text: string, options?: { label: string; value: string }[], type?: ChatMessage['type']) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'ai',
      text,
      timestamp: new Date(),
      options,
      type,
    };
    setMessages((prev) => [...prev, msg]);
    scrollToBottom();
  };

  const addUserMessage = (text: string) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    scrollToBottom();
  };

  // Personality-based text
  const t = (human: string, robot: string) =>
    validAiType === 'anthropogenic' ? human : robot;

  // Start greeting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addAIMessage(
        t(
          "Hey there! 👋 Welcome to TripMatch!\n\nI'm Sara, and I'll be your personal travel buddy today. I absolutely love helping people plan their dream getaways — there's nothing better than finding that perfect hotel, right? 😄\n\nSo tell me, where are you flying out from? Drop me your city and let's get this adventure started! ✈️",
          "⚡ SYSTEM ONLINE — AI-X7 Travel Module v3.2 activated.\n\nGreetings, traveler. I am AI-X7, your intelligent hotel search companion. My neural networks have been trained on millions of travel data points to find you the optimal accommodation.\n\nLet's begin the search sequence.\n📍 First, I need your departure city — where will you be traveling from?"
        )
      );
      setCurrentStep('ask-from');
      setInputDisabled(false);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || inputDisabled) return;
    const value = inputValue.trim();
    setInputValue('');
    addUserMessage(value);
    setInputDisabled(true);

    setTimeout(() => processStep(value), 600);
  };

  const handleOptionSelect = (value: string) => {
    addUserMessage(value);
    setInputDisabled(true);
    // Remove options from the last AI message
    setMessages((prev) =>
      prev.map((m, i) => (i === prev.length - 2 ? { ...m, options: undefined } : m))
    );
    setTimeout(() => processStep(value), 600);
  };

  const processStep = (value: string) => {
    switch (currentStep) {
      case 'ask-from':
        setSearchParams((p) => ({ ...p, from: value }));
        addAIMessage(
          t(
            `Oh nice, ${value}! I love that area 😊\n\nNow here's the fun part — where do you want to escape to? 🌴 Give me your dream destination and I'll work my magic!`,
            `📡 Origin locked in: ${value} ✓\n\nExcellent. Now, let's pinpoint your destination.\n🎯 Where would you like to travel to? I'll cross-reference it against my global hotel database.`
          )
        );
        setCurrentStep('ask-to');
        setInputDisabled(false);
        break;

      case 'ask-to':
        setSearchParams((p) => ({ ...p, to: value }));
        addAIMessage(
          t(
            `${value}?! Oh you have GREAT taste! 😍 That's going to be an incredible trip.\n\nOkay, let's nail down the timing — when are you planning to check in? You can say something like "March 15" or "next Friday"!`,
            `🗺️ Destination confirmed: ${value}\n\nSolid choice — my data shows excellent hotel availability in that region.\n\n📅 Next up: What's your check-in date? (Any format works — I'll parse it.)`
          )
        );
        setCurrentStep('ask-checkin');
        setInputDisabled(false);
        break;

      case 'ask-checkin':
        setSearchParams((p) => ({ ...p, checkIn: value }));
        addAIMessage(
          t(
            `Noted — checking in on ${value}! ✅\n\nAnd when do you want to wrap up the trip? What's your check-out date? 🗓️`,
            `✓ Check-in date registered: ${value}\n\n📅 Now I need your check-out date to calculate the optimal stay duration.`
          )
        );
        setCurrentStep('ask-checkout');
        setInputDisabled(false);
        break;

      case 'ask-checkout':
        setSearchParams((p) => ({ ...p, checkOut: value }));
        addAIMessage(
          t(
            `Perfect, ${value} it is! This is shaping up to be an amazing trip already 🙌\n\nQuick question — how many people are joining? Including yourself! 👥`,
            `✓ Check-out date set: ${value}\n\nTravel window established. Now configuring occupancy.\n👥 How many guests total? (Include yourself in the count.)`
          )
        );
        setCurrentStep('ask-guests');
        setInputDisabled(false);
        break;

      case 'ask-guests':
        setSearchParams((p) => ({ ...p, guests: parseInt(value) || 2 }));
        addAIMessage(
          t(
            `${parseInt(value) === 1 ? "A solo adventure — love it! 🧳" : parseInt(value) === 2 ? "A trip for two — how lovely! 💑" : `A group of ${value} — this is going to be so much fun! 🎊`}\n\nNow let's talk about your budget. No judgment here — whether you're backpacking or going all-out luxury, I've got you covered! 💸\n\nWhat's your price range per night?`,
            `👥 Guest count: ${value} — acknowledged.\n\nNow entering preference calibration phase.\n💰 What's your budget per night? Select a tier below to optimize my search algorithm.`
          ),
          [
            { label: '💰 Budget ($0–$100)', value: 'budget' },
            { label: '💵 Mid-Range ($100–$250)', value: 'mid-range' },
            { label: '💎 Luxury ($250+)', value: 'luxury' },
          ]
        );
        setCurrentStep('ask-price');
        break;

      case 'ask-price':
        setFilters((f) => ({ ...f, priceRange: value }));
        addAIMessage(
          t(
            `${value === 'luxury' ? "Ooh, treating yourself — I love it! 💎✨" : value === 'mid-range' ? "Smart choice — great value without compromising quality! 👌" : "Budget-friendly is the way to go — there are some hidden gems out there! 🔑"}\n\nWhat about star rating? How fancy are we going? ⭐`,
            `💰 Budget tier: ${value.toUpperCase()} — locked in.\n\nNext parameter: Hotel classification.\n⭐ Select your preferred star rating to refine the search matrix.`
          ),
          [
            { label: '⭐⭐⭐ 3-Star', value: '3' },
            { label: '⭐⭐⭐⭐ 4-Star', value: '4' },
            { label: '⭐⭐⭐⭐⭐ 5-Star', value: '5' },
            { label: '4 & 5 Star', value: '4,5' },
          ]
        );
        setCurrentStep('ask-stars');
        break;

      case 'ask-stars':
        const stars = value.split(',').map(Number).filter(Boolean);
        setFilters((f) => ({ ...f, starRating: stars.length ? stars : [4, 5] }));
        addAIMessage(
          t(
            `${stars.includes(5) ? "Five stars — going all out! 🌟" : "Great pick!"} Almost there, I promise! 😄\n\nHow many rooms will you need? Just type a number! 🏨`,
            `⭐ Star classification set: ${value}-star properties.\n\nConfiguration progress: 70% complete.\n🏨 How many rooms do you require? Enter a number.`
          )
        );
        setCurrentStep('ask-rooms');
        setInputDisabled(false);
        break;

      case 'ask-rooms':
        setFilters((f) => ({ ...f, rooms: parseInt(value) || 1 }));
        addAIMessage(
          t(
            `${parseInt(value) > 1 ? `${value} rooms — noted! 📝` : "Just one cozy room — perfect! 🛏️"}\n\nNow, location matters a LOT for a great trip. Where do you want your hotel to be? Right in the action, or somewhere more peaceful? 🗺️`,
            `🏨 Rooms: ${value} — confirmed.\n\nNow optimizing for location. Your hotel's position can significantly impact travel efficiency.\n📍 Select your preferred zone within the destination.`
          ),
          [
            { label: '🏙️ City Center', value: 'city-center' },
            { label: '✈️ Near Airport', value: 'near-airport' },
            { label: '📸 Tourist Area', value: 'tourist-area' },
            { label: '🏡 Suburban', value: 'suburban' },
          ]
        );
        setCurrentStep('ask-location');
        break;

      case 'ask-location':
        setFilters((f) => ({ ...f, location: value }));
        addAIMessage(
          t(
            `${value === 'city-center' ? "City center — you'll be right in the heart of everything! 🏙️" : value === 'tourist-area' ? "Tourist area — close to all the must-see spots! 📸" : value === 'near-airport' ? "Near the airport — super convenient! ✈️" : "Suburban — peaceful and relaxing! 🏡"}\n\nOkay, last question — I promise! 🤞 Which amenities would make your stay extra special? Pick as many as you want!`,
            `📍 Location zone: ${value.toUpperCase()} — registered.\n\n🔧 Final calibration step.\nSelect desired amenities to complete your search profile. Multiple selections permitted.`
          ),
          [
            { label: '📶 WiFi', value: 'wifi' },
            { label: '🏊 Pool', value: 'pool' },
            { label: '💪 Gym', value: 'gym' },
            { label: '🧖 Spa', value: 'spa' },
          ]
        );
        setCurrentStep('ask-amenities');
        break;

      case 'ask-amenities':
        const selectedAmenities = value.split(',').map((a) => a.trim().toLowerCase());
        setFilters((f) => ({ ...f, amenities: selectedAmenities }));
        setInputDisabled(true);

        addAIMessage(
          t(
            `You've got great taste! 🎉 Alright, I've got everything I need.\n\nSit tight while I search through our worldwide hotel database to find your PERFECT match... 🔍✨`,
            `✅ All parameters received. Search profile complete.\n\n🚀 Initiating deep search across 180+ hotels in 50+ countries...\nRunning match algorithm... Please stand by.`
          )
        );
        setCurrentStep('searching');

        // Simulate searching delay then show results
        setTimeout(() => {
          showSearchResults();
        }, 2500);
        break;
    }
  };

  const showSearchResults = () => {
    const hotels = condition === 'full' ? fullMatchHotels : partialMatchHotels;
    const criteria = condition === 'full'
      ? getFullCriteria(filters)
      : getPartialCriteria(filters);
    const matchedCount = criteria.filter((c) => c.matched).length;

    addAIMessage(
      t(
        condition === 'full'
          ? `🎉 Oh wow — you're going to LOVE this!\n\nI found hotels that match EVERY single thing you asked for. Seriously, it's like these places were made for you! 💯\n\nCheck out your perfect matches below:`
          : `Okay, so I want to be upfront with you 😊\n\nI searched far and wide, and while I couldn't find hotels that tick ALL your boxes, I did find some really great options that come close! Sometimes the best trips come from unexpected finds, right? 🌟\n\nHere's what I've got for you:`,
        condition === 'full'
          ? `🔍 SEARCH COMPLETE — Results are in.\n\n✅ Status: FULL MATCH ACHIEVED\n📊 Criteria satisfied: ${matchedCount}/${criteria.length} (100%)\n\nAll specified parameters met. Displaying optimal selections below.`
          : `🔍 SEARCH COMPLETE — Results compiled.\n\n⚠️ Status: PARTIAL MATCH\n📊 Criteria satisfied: ${matchedCount}/${criteria.length} (${Math.round((matchedCount / criteria.length) * 100)}%)\n\nNot all parameters could be satisfied. Showing closest available matches.`
      ),
      undefined,
      'text'
    );

    setCurrentStep('results');

    setTimeout(() => {
      setShowChecklist(true);
      scrollToBottom();
    }, 800);

    setTimeout(() => {
      setShowResults(true);
      scrollToBottom();
    }, 1500);

    setTimeout(() => {
      addAIMessage(
        t(
          `So... what do you think? 🤔\n\nAre these hotels speaking to you? Would you like to go ahead and proceed with booking, or would you rather we scrap this and try a different search?\n\nNo pressure at all — I'm here to help either way! 💙`,
          `⏳ AWAITING USER INPUT\n\nPlease review the results above and make your decision:\n\n→ PROCEED — Lock in these results and continue to booking\n→ DISCARD — Clear results and terminate this search session\n\nYour feedback is critical for system optimization.`
        ),
        undefined,
        'decision'
      );
      setShowDecision(true);
      scrollToBottom();
    }, 2500);
  };

  const handleDecision = (decision: 'proceed' | 'discard') => {
    addUserMessage(decision === 'proceed' ? 'I want to proceed!' : 'I\'ll discard this search.');

    const duration = Math.round((Date.now() - sessionStart) / 1000);
    const criteria = condition === 'full'
      ? getFullCriteria(filters)
      : getPartialCriteria(filters);

    saveSession({
      id: crypto.randomUUID(),
      aiType: validAiType,
      condition,
      searchParams,
      filters,
      decision,
      timestamp: new Date().toISOString(),
      duration,
      criteriaMatched: criteria.filter((c) => c.matched).length,
      criteriaTotal: criteria.length,
    });

    setTimeout(() => {
      addAIMessage(
        t(
          decision === 'proceed'
            ? `YES! 🎊🎉 That's amazing! I'm so happy we found the right fit for you!\n\nYour response has been recorded. Thank you so much for using TripMatch — I hope you have the most incredible trip ever! Don't forget sunscreen! 😄☀️`
            : `Totally understandable! 😊 Not every search hits the jackpot, and that's okay.\n\nYour feedback has been recorded and it helps us get better. Feel free to come back anytime — I'll be right here ready to help! Safe travels! 👋✈️`,
          decision === 'proceed'
            ? `✅ DECISION: PROCEED — Logged successfully.\n\n📦 Session data archived. All parameters saved.\nThank you for using TripMatch AI-X7.\n\n🔒 SESSION CLOSED.`
            : `❌ DECISION: DISCARD — Logged successfully.\n\n📦 Session data archived. Feedback recorded for system improvement.\n\n🔒 SESSION CLOSED.`
        )
      );
      setShowDecision(false);
      setInputDisabled(true);
    }, 600);
  };

  useEffect(() => {
    if (!inputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  const hotels = condition === 'full' ? fullMatchHotels : partialMatchHotels;
  const criteria = condition === 'full'
    ? getFullCriteria(filters)
    : getPartialCriteria(filters);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary shadow-lg shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer text-primary-foreground"
            onClick={() => navigate('/')}
          >
            <Plane className="h-5 w-5" />
            <span className="text-lg font-bold">TripMatch</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={validAiType === 'anthropogenic' ? humanAssistant : robotAssistant}
              alt={validAiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary-foreground/30"
            />
            <span className={`text-sm font-semibold text-primary-foreground ${
              validAiType === 'robotic' ? 'font-mono tracking-wider' : ''
            }`}>
              {validAiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
            </span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <ChatMessageComponent
                key={msg.id}
                message={msg}
                aiType={validAiType}
                onOptionSelect={handleOptionSelect}
              />
            ))}
          </AnimatePresence>

          {/* Criteria Checklist */}
          {showChecklist && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="ml-13"
            >
              <CriteriaChecklist criteria={criteria} aiType={validAiType} />
            </motion.div>
          )}

          {/* Hotel Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="ml-13"
            >
              <HotelResultsCard hotels={hotels} condition={condition} />
            </motion.div>
          )}

          {/* Decision Buttons */}
          {showDecision && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="ml-13"
            >
              <DecisionButtons
                aiType={validAiType}
                onDecision={handleDecision}
              />
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Input Bar */}
      <div className="shrink-0 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                inputDisabled
                  ? validAiType === 'anthropogenic'
                    ? 'Sara is thinking...'
                    : 'PROCESSING...'
                  : 'Type your answer...'
              }
              disabled={inputDisabled}
              className={`flex-1 ${validAiType === 'robotic' ? 'font-mono' : ''}`}
            />
            <Button type="submit" disabled={inputDisabled || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
