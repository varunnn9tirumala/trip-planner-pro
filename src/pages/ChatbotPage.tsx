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
          "Hi there! 👋 I'm Sara, your personal travel assistant. I'm so excited to help you find the perfect hotel! Let's start — where will you be traveling from?",
          "SYSTEM INITIALIZED. UNIT AI-X7 ONLINE.\n\nPROCESSING REQUEST: Hotel search query initiated.\n\nINPUT REQUIRED: Origin location. Please specify departure city."
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
            `Lovely! Coming from ${value} 🌍 And where would you like to go? What's your dream destination?`,
            `ORIGIN REGISTERED: ${value}\n\nINPUT REQUIRED: Destination city. Specify target location.`
          )
        );
        setCurrentStep('ask-to');
        setInputDisabled(false);
        break;

      case 'ask-to':
        setSearchParams((p) => ({ ...p, to: value }));
        addAIMessage(
          t(
            `${value} — what a wonderful choice! 😍 Now, when would you like to check in? Please share your check-in date.`,
            `DESTINATION LOGGED: ${value}\n\nINPUT REQUIRED: Check-in date. Format: YYYY-MM-DD or natural language.`
          )
        );
        setCurrentStep('ask-checkin');
        setInputDisabled(false);
        break;

      case 'ask-checkin':
        setSearchParams((p) => ({ ...p, checkIn: value }));
        addAIMessage(
          t(
            `Got it! Check-in on ${value} ✅ And when do you plan to check out?`,
            `CHECK-IN DATE SET: ${value}\n\nINPUT REQUIRED: Check-out date.`
          )
        );
        setCurrentStep('ask-checkout');
        setInputDisabled(false);
        break;

      case 'ask-checkout':
        setSearchParams((p) => ({ ...p, checkOut: value }));
        addAIMessage(
          t(
            `Perfect! 📅 How many guests will be staying? (including yourself)`,
            `CHECK-OUT DATE SET: ${value}\n\nINPUT REQUIRED: Total number of guests. Enter integer value.`
          )
        );
        setCurrentStep('ask-guests');
        setInputDisabled(false);
        break;

      case 'ask-guests':
        setSearchParams((p) => ({ ...p, guests: parseInt(value) || 2 }));
        addAIMessage(
          t(
            `${value} guests — sounds like a great trip! 🎉 Now let's talk about your budget. What's your preferred price range per night?`,
            `GUEST COUNT REGISTERED: ${value}\n\nPROCESSING PREFERENCE MODULE...\nINPUT REQUIRED: Price range per night.`
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
            `Great choice! ✨ What star rating hotels are you looking for?`,
            `PRICE PARAMETER SET: ${value}\n\nINPUT REQUIRED: Star rating preference.`
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
            `Wonderful! 🏨 How many rooms do you need?`,
            `STAR RATING CONFIGURED: ${value}\n\nINPUT REQUIRED: Number of rooms needed. Enter integer.`
          )
        );
        setCurrentStep('ask-rooms');
        setInputDisabled(false);
        break;

      case 'ask-rooms':
        setFilters((f) => ({ ...f, rooms: parseInt(value) || 1 }));
        addAIMessage(
          t(
            `Got it! Where would you prefer the hotel to be located?`,
            `ROOM COUNT SET: ${value}\n\nINPUT REQUIRED: Location preference within destination.`
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
            `Last question! 🎯 Which amenities are important to you? (Pick all that apply or type them)`,
            `LOCATION PREFERENCE SET: ${value}\n\nFINAL INPUT REQUIRED: Amenities selection. Select applicable options.`
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
            `Thank you so much! 🔍 Let me search through thousands of hotels to find the best options for you...`,
            `ALL PARAMETERS RECEIVED.\n\nINITIATING SEARCH ALGORITHM...\nSCANNING DATABASE: 180+ hotels across 50+ countries...\nPLEASE STAND BY.`
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
          ? `Great news! 🎉 I've found some wonderful hotels that match ALL your requirements! Your trip is going to be amazing — every single preference has been matched perfectly. Here's what I found:`
          : `Hi there! 😊 I've searched through many options, and I want to be honest with you — I wasn't able to find hotels that match all of your preferences perfectly. But don't worry! I've found some lovely alternatives that come really close. Let me show you:`,
        condition === 'full'
          ? `SEARCH ANALYSIS COMPLETE\n\nStatus: ALL CRITERIA SATISFIED ✓\nRequirements matched: ${matchedCount}/${criteria.length} (100%)\n\nDisplaying optimal hotel selections.`
          : `SEARCH ANALYSIS COMPLETE\n\nStatus: PARTIAL CRITERIA MATCH\nRequirements matched: ${matchedCount}/${criteria.length} (${Math.round((matchedCount / criteria.length) * 100)}%)\n\nUnable to satisfy all specified parameters. Displaying best available options.`
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
          `So, what do you think? Would you like to proceed with booking one of these hotels, or would you prefer to start a new search? 😊`,
          `AWAITING USER DECISION.\n\nOptions:\n[PROCEED] — Continue to booking\n[DISCARD] — Terminate current search and reset`
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
            ? `Wonderful! 🎊 Thank you for choosing TripMatch! Your response has been recorded. Have an amazing trip!`
            : `No worries at all! 😊 Your feedback has been noted. Feel free to try again anytime. Safe travels!`,
          decision === 'proceed'
            ? `DECISION LOGGED: PROCEED\n\nSession data recorded. Thank you for using TripMatch.\nSESSION TERMINATED.`
            : `DECISION LOGGED: DISCARD\n\nSession data recorded. Search parameters cleared.\nSESSION TERMINATED.`
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
