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
  amenities: string[];
  matchPercentage: number;
  gradient: string;
}

export interface CriteriaMatch {
  label: string;
  matched: boolean;
}
