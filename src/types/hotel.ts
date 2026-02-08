export type AIType = 'anthropogenic' | 'robotic';
export type Condition = 'full' | 'partial';

export interface SearchParams {
  from: string;
  to: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface HotelFilters {
  priceRange: string;
  starRating: number[];
  rooms: number;
  location: string;
  amenities: string[];
}

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  rating: number;
  price: number;
  location: string;
  city: string;
  country: string;
  continent: string;
  amenities: string[];
  matchPercentage: number;
  gradient: string;
}

export interface CriteriaMatch {
  label: string;
  matched: boolean;
}

export type ChatStep =
  | 'greeting'
  | 'ask-from'
  | 'ask-to'
  | 'ask-checkin'
  | 'ask-checkout'
  | 'ask-guests'
  | 'ask-price'
  | 'ask-stars'
  | 'ask-rooms'
  | 'ask-location'
  | 'ask-amenities'
  | 'searching'
  | 'results'
  | 'decision';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  options?: ChatOption[];
  type?: 'text' | 'hotels' | 'checklist' | 'decision';
}

export interface ChatOption {
  label: string;
  value: string;
}

export interface SessionData {
  id: string;
  aiType: AIType;
  condition: Condition;
  searchParams: SearchParams;
  filters: HotelFilters;
  decision: 'proceed' | 'discard';
  timestamp: string;
  duration: number; // seconds spent
  criteriaMatched: number;
  criteriaTotal: number;
}
