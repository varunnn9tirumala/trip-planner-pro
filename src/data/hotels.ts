import { Hotel, CriteriaMatch, HotelFilters } from '@/types/hotel';

// ═══════════════════════════════════════════════════════════════
// WORLDWIDE HOTEL DATABASE
// ═══════════════════════════════════════════════════════════════

const gradients = [
  'hotel-gradient-1', 'hotel-gradient-2', 'hotel-gradient-3',
  'hotel-gradient-4', 'hotel-gradient-5', 'hotel-gradient-6',
];
const g = (i: number) => gradients[i % gradients.length];

export const worldHotels: Hotel[] = [
  // ─── ASIA ─────────────────────────────────────────────────────

  // India
  { id: 1, name: "The Taj Mahal Palace", stars: 5, rating: 4.9, price: 350, location: "Colaba, Gateway of India", city: "Mumbai", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Concierge"], matchPercentage: 100, gradient: g(0) },
  { id: 2, name: "The Oberoi Udaivilas", stars: 5, rating: 4.9, price: 500, location: "Lake Pichola Waterfront", city: "Udaipur", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Lake View"], matchPercentage: 98, gradient: g(1) },
  { id: 3, name: "ITC Grand Chola", stars: 5, rating: 4.7, price: 280, location: "Guindy, Near Airport", city: "Chennai", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Breakfast"], matchPercentage: 95, gradient: g(2) },
  { id: 4, name: "The Leela Palace", stars: 5, rating: 4.8, price: 420, location: "Diplomatic Enclave", city: "New Delhi", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Butler Service"], matchPercentage: 97, gradient: g(3) },
  { id: 5, name: "Taj Lake Palace", stars: 5, rating: 4.9, price: 550, location: "Lake Pichola Island", city: "Udaipur", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Boat Transfer", "Heritage"], matchPercentage: 100, gradient: g(4) },
  { id: 6, name: "Rambagh Palace", stars: 5, rating: 4.8, price: 480, location: "Bhawani Singh Road", city: "Jaipur", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Heritage"], matchPercentage: 96, gradient: g(5) },
  { id: 7, name: "The Oberoi Amarvilas", stars: 5, rating: 4.9, price: 600, location: "Near Taj Mahal", city: "Agra", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Taj View"], matchPercentage: 100, gradient: g(0) },
  { id: 8, name: "ITC Maurya", stars: 5, rating: 4.6, price: 250, location: "Sardar Patel Marg", city: "New Delhi", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Breakfast"], matchPercentage: 90, gradient: g(1) },
  { id: 9, name: "Taj Falaknuma Palace", stars: 5, rating: 4.8, price: 520, location: "Falaknuma Hills", city: "Hyderabad", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Heritage", "Butler Service"], matchPercentage: 97, gradient: g(2) },
  { id: 10, name: "The Lalit Grand Palace", stars: 5, rating: 4.5, price: 200, location: "Gupkar Road", city: "Srinagar", country: "India", continent: "Asia", amenities: ["WiFi", "Spa", "Restaurant", "Garden", "Lake View"], matchPercentage: 88, gradient: g(3) },
  { id: 11, name: "Vivanta by Taj", stars: 4, rating: 4.3, price: 150, location: "MG Road", city: "Bengaluru", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Breakfast"], matchPercentage: 75, gradient: g(4) },
  { id: 12, name: "Radisson Blu", stars: 4, rating: 4.1, price: 120, location: "Rajiv Gandhi Nagar", city: "Pune", country: "India", continent: "Asia", amenities: ["WiFi", "Pool", "Gym", "Restaurant"], matchPercentage: 68, gradient: g(5) },
  { id: 13, name: "Lemon Tree Premier", stars: 3, rating: 3.9, price: 75, location: "Bani Park", city: "Jaipur", country: "India", continent: "Asia", amenities: ["WiFi", "Breakfast", "Parking"], matchPercentage: 45, gradient: g(0) },
  { id: 14, name: "Ginger Hotel", stars: 3, rating: 3.5, price: 45, location: "Whitefield", city: "Bengaluru", country: "India", continent: "Asia", amenities: ["WiFi", "Breakfast"], matchPercentage: 35, gradient: g(1) },
  { id: 15, name: "OYO Townhouse", stars: 2, rating: 3.2, price: 25, location: "Connaught Place", city: "New Delhi", country: "India", continent: "Asia", amenities: ["WiFi"], matchPercentage: 25, gradient: g(2) },

  // Japan
  { id: 16, name: "The Ritz-Carlton Tokyo", stars: 5, rating: 4.9, price: 700, location: "Roppongi, Midtown Tower", city: "Tokyo", country: "Japan", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "City View"], matchPercentage: 100, gradient: g(3) },
  { id: 17, name: "Park Hyatt Tokyo", stars: 5, rating: 4.8, price: 650, location: "Shinjuku, Nishi-Shinjuku", city: "Tokyo", country: "Japan", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"], matchPercentage: 98, gradient: g(4) },
  { id: 18, name: "Aman Tokyo", stars: 5, rating: 4.9, price: 900, location: "Otemachi Tower", city: "Tokyo", country: "Japan", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Onsen", "Concierge"], matchPercentage: 100, gradient: g(5) },
  { id: 19, name: "Four Seasons Kyoto", stars: 5, rating: 4.9, price: 800, location: "Higashiyama Ward", city: "Kyoto", country: "Japan", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Garden", "Tea Ceremony"], matchPercentage: 100, gradient: g(0) },
  { id: 20, name: "Hotel Granvia Osaka", stars: 4, rating: 4.3, price: 180, location: "Namba Station Area", city: "Osaka", country: "Japan", continent: "Asia", amenities: ["WiFi", "Restaurant", "Gym", "Breakfast"], matchPercentage: 72, gradient: g(1) },
  { id: 21, name: "Toyoko Inn Hiroshima", stars: 3, rating: 3.6, price: 60, location: "Near Peace Park", city: "Hiroshima", country: "Japan", continent: "Asia", amenities: ["WiFi", "Breakfast"], matchPercentage: 38, gradient: g(2) },

  // China
  { id: 22, name: "The Peninsula Shanghai", stars: 5, rating: 4.8, price: 550, location: "The Bund Waterfront", city: "Shanghai", country: "China", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "River View"], matchPercentage: 98, gradient: g(3) },
  { id: 23, name: "Waldorf Astoria Beijing", stars: 5, rating: 4.7, price: 400, location: "Wangfujing", city: "Beijing", country: "China", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"], matchPercentage: 95, gradient: g(4) },
  { id: 24, name: "Mandarin Oriental Guangzhou", stars: 5, rating: 4.8, price: 350, location: "Tianhe District", city: "Guangzhou", country: "China", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "City View"], matchPercentage: 93, gradient: g(5) },
  { id: 25, name: "W Hotel Xi'an", stars: 5, rating: 4.5, price: 280, location: "Qujiang New District", city: "Xi'an", country: "China", continent: "Asia", amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Bar"], matchPercentage: 88, gradient: g(0) },
  { id: 26, name: "Holiday Inn Chengdu", stars: 3, rating: 3.8, price: 70, location: "Near Chunxi Road", city: "Chengdu", country: "China", continent: "Asia", amenities: ["WiFi", "Restaurant", "Breakfast"], matchPercentage: 42, gradient: g(1) },

  // Thailand
  { id: 27, name: "Mandarin Oriental Bangkok", stars: 5, rating: 4.9, price: 450, location: "Riverside, Charoenkrung", city: "Bangkok", country: "Thailand", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "River View"], matchPercentage: 100, gradient: g(2) },
  { id: 28, name: "Anantara Golden Triangle", stars: 5, rating: 4.8, price: 600, location: "Chiang Saen", city: "Chiang Rai", country: "Thailand", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Elephant Camp", "Jungle View"], matchPercentage: 97, gradient: g(3) },
  { id: 29, name: "Banyan Tree Phuket", stars: 5, rating: 4.7, price: 380, location: "Laguna Beach", city: "Phuket", country: "Thailand", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Golf"], matchPercentage: 95, gradient: g(4) },
  { id: 30, name: "Centara Grand Krabi", stars: 4, rating: 4.2, price: 150, location: "Ao Nang Beach", city: "Krabi", country: "Thailand", continent: "Asia", amenities: ["WiFi", "Pool", "Restaurant", "Beach"], matchPercentage: 70, gradient: g(5) },
  { id: 31, name: "Ibis Bangkok Sathorn", stars: 3, rating: 3.5, price: 40, location: "Sathorn Road", city: "Bangkok", country: "Thailand", continent: "Asia", amenities: ["WiFi", "Breakfast"], matchPercentage: 30, gradient: g(0) },

  // Singapore
  { id: 32, name: "Marina Bay Sands", stars: 5, rating: 4.7, price: 550, location: "Marina Bay", city: "Singapore", country: "Singapore", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Casino", "Infinity Pool"], matchPercentage: 98, gradient: g(1) },
  { id: 33, name: "Raffles Hotel Singapore", stars: 5, rating: 4.9, price: 750, location: "Beach Road, Civic District", city: "Singapore", country: "Singapore", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Heritage", "Butler Service"], matchPercentage: 100, gradient: g(2) },
  { id: 34, name: "Capella Singapore", stars: 5, rating: 4.8, price: 650, location: "Sentosa Island", city: "Singapore", country: "Singapore", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach"], matchPercentage: 97, gradient: g(3) },

  // UAE
  { id: 35, name: "Burj Al Arab Jumeirah", stars: 5, rating: 4.9, price: 1500, location: "Jumeirah Beach", city: "Dubai", country: "UAE", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Butler Service", "Helipad"], matchPercentage: 100, gradient: g(4) },
  { id: 36, name: "Atlantis The Palm", stars: 5, rating: 4.6, price: 450, location: "Palm Jumeirah", city: "Dubai", country: "UAE", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Waterpark", "Aquarium"], matchPercentage: 92, gradient: g(5) },
  { id: 37, name: "Emirates Palace", stars: 5, rating: 4.8, price: 800, location: "Corniche Road West", city: "Abu Dhabi", country: "UAE", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Gold ATM"], matchPercentage: 98, gradient: g(0) },
  { id: 38, name: "Address Downtown", stars: 5, rating: 4.5, price: 350, location: "Downtown, Near Burj Khalifa", city: "Dubai", country: "UAE", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant"], matchPercentage: 88, gradient: g(1) },
  { id: 39, name: "Rove City Centre", stars: 3, rating: 3.8, price: 80, location: "Deira City Centre", city: "Dubai", country: "UAE", continent: "Asia", amenities: ["WiFi", "Pool", "Breakfast"], matchPercentage: 42, gradient: g(2) },

  // South Korea
  { id: 40, name: "The Shilla Seoul", stars: 5, rating: 4.8, price: 400, location: "Jangchung-dong", city: "Seoul", country: "South Korea", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Garden"], matchPercentage: 96, gradient: g(3) },
  { id: 41, name: "Lotte Hotel Seoul", stars: 5, rating: 4.6, price: 300, location: "Myeongdong, Jung-gu", city: "Seoul", country: "South Korea", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Shopping"], matchPercentage: 90, gradient: g(4) },
  { id: 42, name: "Park Hyatt Busan", stars: 5, rating: 4.7, price: 320, location: "Haeundae Beach", city: "Busan", country: "South Korea", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Ocean View"], matchPercentage: 93, gradient: g(5) },

  // Maldives
  { id: 43, name: "Soneva Fushi", stars: 5, rating: 4.9, price: 2000, location: "Baa Atoll", city: "Kunfunadhoo", country: "Maldives", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Diving", "Cinema", "Observatory"], matchPercentage: 100, gradient: g(0) },
  { id: 44, name: "Conrad Maldives Rangali", stars: 5, rating: 4.8, price: 1200, location: "South Ari Atoll", city: "Rangali Island", country: "Maldives", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Underwater Restaurant", "Diving"], matchPercentage: 100, gradient: g(1) },
  { id: 45, name: "Anantara Veli", stars: 5, rating: 4.7, price: 800, location: "South Malé Atoll", city: "Veligandu Huraa", country: "Maldives", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Diving"], matchPercentage: 97, gradient: g(2) },

  // Sri Lanka
  { id: 46, name: "Heritance Kandalama", stars: 5, rating: 4.6, price: 180, location: "Dambulla", city: "Kandalama", country: "Sri Lanka", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Nature Trails", "Lake View"], matchPercentage: 88, gradient: g(3) },
  { id: 47, name: "Galle Face Hotel", stars: 4, rating: 4.3, price: 150, location: "Galle Face Green", city: "Colombo", country: "Sri Lanka", continent: "Asia", amenities: ["WiFi", "Pool", "Restaurant", "Bar", "Heritage", "Ocean View"], matchPercentage: 75, gradient: g(4) },

  // Vietnam
  { id: 48, name: "InterContinental Danang", stars: 5, rating: 4.8, price: 350, location: "Son Tra Peninsula", city: "Da Nang", country: "Vietnam", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Golf"], matchPercentage: 95, gradient: g(5) },
  { id: 49, name: "Sofitel Legend Metropole", stars: 5, rating: 4.7, price: 300, location: "Hoàn Kiếm District", city: "Hanoi", country: "Vietnam", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage"], matchPercentage: 92, gradient: g(0) },

  // Indonesia
  { id: 50, name: "Ayana Resort Bali", stars: 5, rating: 4.7, price: 320, location: "Jimbaran Bay", city: "Bali", country: "Indonesia", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Rock Bar"], matchPercentage: 95, gradient: g(1) },
  { id: 51, name: "The Mulia Nusa Dua", stars: 5, rating: 4.8, price: 450, location: "Nusa Dua Beach", city: "Bali", country: "Indonesia", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Butler Service"], matchPercentage: 97, gradient: g(2) },

  // ─── EUROPE ───────────────────────────────────────────────────

  // France
  { id: 52, name: "Le Méridien Étoile", stars: 5, rating: 4.8, price: 320, location: "City Center, Champs-Élysées", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Gym", "Spa", "Breakfast"], matchPercentage: 100, gradient: g(0) },
  { id: 53, name: "Hôtel Plaza Athénée", stars: 5, rating: 4.9, price: 900, location: "Avenue Montaigne", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Gym", "Spa", "Breakfast", "Restaurant", "Bar"], matchPercentage: 100, gradient: g(1) },
  { id: 54, name: "The Ritz Paris", stars: 5, rating: 4.9, price: 1200, location: "Place Vendôme", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Gym", "Spa", "Breakfast", "Restaurant", "Bar", "Concierge"], matchPercentage: 100, gradient: g(2) },
  { id: 55, name: "Sofitel Le Faubourg", stars: 5, rating: 4.7, price: 280, location: "Rue Boissy d'Anglas", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Breakfast", "Bar"], matchPercentage: 95, gradient: g(3) },
  { id: 56, name: "InterContinental Carlton Cannes", stars: 5, rating: 4.6, price: 500, location: "La Croisette Boulevard", city: "Cannes", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Sea View"], matchPercentage: 92, gradient: g(4) },
  { id: 57, name: "Hôtel Negresco Nice", stars: 5, rating: 4.7, price: 420, location: "Promenade des Anglais", city: "Nice", country: "France", continent: "Europe", amenities: ["WiFi", "Pool", "Restaurant", "Beach", "Heritage"], matchPercentage: 90, gradient: g(5) },
  { id: 58, name: "Ibis Paris Gare de Lyon", stars: 3, rating: 3.8, price: 95, location: "Near Gare de Lyon", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Breakfast"], matchPercentage: 45, gradient: g(0) },
  { id: 59, name: "Novotel Tour Eiffel", stars: 4, rating: 4.2, price: 180, location: "Near Eiffel Tower", city: "Paris", country: "France", continent: "Europe", amenities: ["WiFi", "Gym", "Breakfast", "Parking"], matchPercentage: 65, gradient: g(1) },

  // United Kingdom
  { id: 60, name: "The Savoy", stars: 5, rating: 4.9, price: 800, location: "The Strand, Covent Garden", city: "London", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Butler Service", "Heritage"], matchPercentage: 100, gradient: g(2) },
  { id: 61, name: "Claridge's", stars: 5, rating: 4.9, price: 950, location: "Mayfair, Brook Street", city: "London", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Concierge", "Heritage"], matchPercentage: 100, gradient: g(3) },
  { id: 62, name: "The Dorchester", stars: 5, rating: 4.8, price: 750, location: "Park Lane, Mayfair", city: "London", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Park View"], matchPercentage: 97, gradient: g(4) },
  { id: 63, name: "The Balmoral", stars: 5, rating: 4.7, price: 450, location: "Princes Street", city: "Edinburgh", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Castle View"], matchPercentage: 93, gradient: g(5) },
  { id: 64, name: "The Midland", stars: 4, rating: 4.3, price: 180, location: "Peter Street, City Centre", city: "Manchester", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"], matchPercentage: 72, gradient: g(0) },
  { id: 65, name: "Premier Inn London", stars: 3, rating: 3.7, price: 90, location: "Southwark, Near London Eye", city: "London", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Breakfast", "Parking"], matchPercentage: 40, gradient: g(1) },

  // Italy
  { id: 66, name: "Hotel Hassler Roma", stars: 5, rating: 4.8, price: 600, location: "Piazza Trinità dei Monti", city: "Rome", country: "Italy", continent: "Europe", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Rooftop", "City View"], matchPercentage: 97, gradient: g(2) },
  { id: 67, name: "Belmond Hotel Cipriani", stars: 5, rating: 4.9, price: 900, location: "Giudecca Island", city: "Venice", country: "Italy", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Boat Transfer", "Garden"], matchPercentage: 100, gradient: g(3) },
  { id: 68, name: "Four Seasons Firenze", stars: 5, rating: 4.9, price: 850, location: "Borgo Pinti", city: "Florence", country: "Italy", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Garden", "Heritage"], matchPercentage: 100, gradient: g(4) },
  { id: 69, name: "Hotel Excelsior Amalfi", stars: 5, rating: 4.7, price: 500, location: "Amalfi Coast Cliff", city: "Amalfi", country: "Italy", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Sea View", "Beach"], matchPercentage: 93, gradient: g(5) },
  { id: 70, name: "Grand Hotel Tremezzo", stars: 5, rating: 4.8, price: 650, location: "Lake Como Shoreline", city: "Tremezzo", country: "Italy", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Garden", "Lake View"], matchPercentage: 97, gradient: g(0) },
  { id: 71, name: "Armani Hotel Milano", stars: 5, rating: 4.6, price: 550, location: "Via Manzoni, Fashion District", city: "Milan", country: "Italy", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Concierge"], matchPercentage: 90, gradient: g(1) },

  // Spain
  { id: 72, name: "Hotel Ritz Madrid", stars: 5, rating: 4.8, price: 500, location: "Plaza de la Lealtad", city: "Madrid", country: "Spain", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Heritage", "Garden"], matchPercentage: 96, gradient: g(2) },
  { id: 73, name: "Hotel Arts Barcelona", stars: 5, rating: 4.7, price: 400, location: "Port Olímpic Waterfront", city: "Barcelona", country: "Spain", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Sea View"], matchPercentage: 94, gradient: g(3) },
  { id: 74, name: "Alhambra Palace Hotel", stars: 5, rating: 4.6, price: 280, location: "Near Alhambra Fortress", city: "Granada", country: "Spain", continent: "Europe", amenities: ["WiFi", "Restaurant", "Bar", "Heritage", "Mountain View"], matchPercentage: 85, gradient: g(4) },
  { id: 75, name: "Hotel Alfonso XIII", stars: 5, rating: 4.7, price: 350, location: "San Fernando Street", city: "Seville", country: "Spain", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Garden", "Heritage"], matchPercentage: 92, gradient: g(5) },

  // Germany
  { id: 76, name: "Hotel Adlon Kempinski", stars: 5, rating: 4.8, price: 450, location: "Unter den Linden, Brandenburg Gate", city: "Berlin", country: "Germany", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Heritage"], matchPercentage: 96, gradient: g(0) },
  { id: 77, name: "Bayerischer Hof", stars: 5, rating: 4.7, price: 400, location: "Promenadeplatz", city: "Munich", country: "Germany", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Rooftop", "Cinema"], matchPercentage: 94, gradient: g(1) },
  { id: 78, name: "Fairmont Vier Jahreszeiten", stars: 5, rating: 4.6, price: 380, location: "Neuer Jungfernstieg", city: "Hamburg", country: "Germany", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Lake View"], matchPercentage: 90, gradient: g(2) },

  // Switzerland
  { id: 79, name: "The Dolder Grand", stars: 5, rating: 4.8, price: 700, location: "Adlisberg Hills", city: "Zurich", country: "Switzerland", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Golf", "Art Collection"], matchPercentage: 98, gradient: g(3) },
  { id: 80, name: "Badrutt's Palace Hotel", stars: 5, rating: 4.9, price: 1000, location: "Via Serlas", city: "St. Moritz", country: "Switzerland", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Ski", "Mountain View"], matchPercentage: 100, gradient: g(4) },
  { id: 81, name: "Beau-Rivage Palace", stars: 5, rating: 4.7, price: 600, location: "Ouchy Lakefront", city: "Lausanne", country: "Switzerland", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Lake View", "Garden"], matchPercentage: 95, gradient: g(5) },

  // Greece
  { id: 82, name: "Grace Hotel Santorini", stars: 5, rating: 4.9, price: 700, location: "Imerovigli Caldera", city: "Santorini", country: "Greece", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Infinity Pool", "Caldera View"], matchPercentage: 100, gradient: g(0) },
  { id: 83, name: "Cavo Tagoo Mykonos", stars: 5, rating: 4.8, price: 600, location: "Mykonos Town", city: "Mykonos", country: "Greece", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Sea View"], matchPercentage: 97, gradient: g(1) },
  { id: 84, name: "Hotel Grande Bretagne", stars: 5, rating: 4.7, price: 350, location: "Syntagma Square", city: "Athens", country: "Greece", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Acropolis View"], matchPercentage: 93, gradient: g(2) },

  // Turkey
  { id: 85, name: "Çırağan Palace Kempinski", stars: 5, rating: 4.8, price: 500, location: "Beşiktaş, Bosphorus", city: "Istanbul", country: "Turkey", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage", "Bosphorus View"], matchPercentage: 97, gradient: g(3) },
  { id: 86, name: "Museum Hotel Cappadocia", stars: 5, rating: 4.9, price: 450, location: "Uçhisar Castle", city: "Cappadocia", country: "Turkey", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Cave Rooms", "Balloon View"], matchPercentage: 100, gradient: g(4) },

  // Portugal
  { id: 87, name: "Belmond Reid's Palace", stars: 5, rating: 4.8, price: 450, location: "Estrada Monumental Cliff", city: "Funchal", country: "Portugal", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Garden", "Ocean View", "Heritage"], matchPercentage: 96, gradient: g(5) },
  { id: 88, name: "Four Seasons Ritz Lisbon", stars: 5, rating: 4.7, price: 400, location: "Rua Rodrigo da Fonseca", city: "Lisbon", country: "Portugal", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"], matchPercentage: 93, gradient: g(0) },

  // Netherlands
  { id: 89, name: "Waldorf Astoria Amsterdam", stars: 5, rating: 4.8, price: 500, location: "Herengracht Canal", city: "Amsterdam", country: "Netherlands", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Canal View"], matchPercentage: 96, gradient: g(1) },
  { id: 90, name: "Hotel De L'Europe", stars: 5, rating: 4.7, price: 420, location: "Nieuwe Doelenstraat", city: "Amsterdam", country: "Netherlands", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "River View"], matchPercentage: 92, gradient: g(2) },

  // Austria
  { id: 91, name: "Hotel Sacher Wien", stars: 5, rating: 4.8, price: 500, location: "Philharmoniker Straße", city: "Vienna", country: "Austria", continent: "Europe", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Heritage", "Café Sacher"], matchPercentage: 95, gradient: g(3) },

  // Czech Republic
  { id: 92, name: "Four Seasons Prague", stars: 5, rating: 4.8, price: 400, location: "Veleslavínova, Old Town", city: "Prague", country: "Czech Republic", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "River View", "Castle View"], matchPercentage: 95, gradient: g(4) },

  // Russia
  { id: 93, name: "Four Seasons Lion Palace", stars: 5, rating: 4.7, price: 380, location: "Admiralteysky, Near Hermitage", city: "St. Petersburg", country: "Russia", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage"], matchPercentage: 92, gradient: g(5) },

  // Scandinavia
  { id: 94, name: "Grand Hôtel Stockholm", stars: 5, rating: 4.7, price: 450, location: "Södra Blasieholmshamnen", city: "Stockholm", country: "Sweden", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Waterfront View", "Heritage"], matchPercentage: 93, gradient: g(0) },
  { id: 95, name: "Hotel d'Angleterre", stars: 5, rating: 4.8, price: 500, location: "Kongens Nytorv Square", city: "Copenhagen", country: "Denmark", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Heritage"], matchPercentage: 95, gradient: g(1) },

  // ─── NORTH AMERICA ────────────────────────────────────────────

  // United States
  { id: 96, name: "The Plaza Hotel", stars: 5, rating: 4.8, price: 800, location: "Fifth Avenue, Central Park", city: "New York", country: "United States", continent: "North America", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Butler Service", "Heritage", "Park View"], matchPercentage: 100, gradient: g(2) },
  { id: 97, name: "The Beverly Hills Hotel", stars: 5, rating: 4.8, price: 750, location: "Sunset Boulevard", city: "Los Angeles", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Cabanas"], matchPercentage: 98, gradient: g(3) },
  { id: 98, name: "The Bellagio", stars: 5, rating: 4.7, price: 350, location: "Las Vegas Strip", city: "Las Vegas", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Casino", "Fountain Show"], matchPercentage: 95, gradient: g(4) },
  { id: 99, name: "Four Seasons Chicago", stars: 5, rating: 4.8, price: 550, location: "Magnificent Mile", city: "Chicago", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Lake View"], matchPercentage: 97, gradient: g(5) },
  { id: 100, name: "Fontainebleau Miami Beach", stars: 5, rating: 4.6, price: 400, location: "Collins Avenue, Oceanfront", city: "Miami", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Nightclub"], matchPercentage: 92, gradient: g(0) },
  { id: 101, name: "The Fairmont San Francisco", stars: 5, rating: 4.7, price: 450, location: "Nob Hill, Mason Street", city: "San Francisco", country: "United States", continent: "North America", amenities: ["WiFi", "Gym", "Restaurant", "Bar", "Heritage", "City View"], matchPercentage: 90, gradient: g(1) },
  { id: 102, name: "Aulani Disney Resort", stars: 5, rating: 4.6, price: 500, location: "Ko Olina Beach", city: "Honolulu", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Waterpark", "Kids Club"], matchPercentage: 93, gradient: g(2) },
  { id: 103, name: "The Breakers Palm Beach", stars: 5, rating: 4.8, price: 600, location: "South County Road", city: "Palm Beach", country: "United States", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Golf", "Beach", "Heritage"], matchPercentage: 98, gradient: g(3) },
  { id: 104, name: "Marriott Times Square", stars: 4, rating: 4.2, price: 250, location: "Broadway & 45th St", city: "New York", country: "United States", continent: "North America", amenities: ["WiFi", "Gym", "Restaurant", "Bar"], matchPercentage: 70, gradient: g(4) },
  { id: 105, name: "Hampton Inn Chicago", stars: 3, rating: 3.8, price: 120, location: "Michigan Avenue", city: "Chicago", country: "United States", continent: "North America", amenities: ["WiFi", "Gym", "Breakfast"], matchPercentage: 45, gradient: g(5) },
  { id: 106, name: "Motel 6 Los Angeles", stars: 2, rating: 2.8, price: 55, location: "Hollywood Blvd", city: "Los Angeles", country: "United States", continent: "North America", amenities: ["WiFi", "Parking"], matchPercentage: 20, gradient: g(0) },

  // Canada
  { id: 107, name: "Fairmont Château Frontenac", stars: 5, rating: 4.8, price: 400, location: "Old Quebec, Dufferin Terrace", city: "Quebec City", country: "Canada", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage", "River View"], matchPercentage: 97, gradient: g(1) },
  { id: 108, name: "Fairmont Banff Springs", stars: 5, rating: 4.7, price: 450, location: "Banff National Park", city: "Banff", country: "Canada", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Golf", "Ski", "Mountain View"], matchPercentage: 96, gradient: g(2) },
  { id: 109, name: "Four Seasons Toronto", stars: 5, rating: 4.7, price: 500, location: "Yorkville, Bay Street", city: "Toronto", country: "Canada", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"], matchPercentage: 93, gradient: g(3) },
  { id: 110, name: "Fairmont Pacific Rim", stars: 5, rating: 4.8, price: 480, location: "Canada Place Waterfront", city: "Vancouver", country: "Canada", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Harbour View"], matchPercentage: 95, gradient: g(4) },

  // Mexico
  { id: 111, name: "Four Seasons Mexico City", stars: 5, rating: 4.7, price: 350, location: "Paseo de la Reforma", city: "Mexico City", country: "Mexico", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Garden"], matchPercentage: 93, gradient: g(5) },
  { id: 112, name: "Grand Velas Riviera Maya", stars: 5, rating: 4.8, price: 600, location: "Playa del Carmen Beachfront", city: "Playa del Carmen", country: "Mexico", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "All-Inclusive"], matchPercentage: 97, gradient: g(0) },
  { id: 113, name: "One&Only Palmilla", stars: 5, rating: 4.9, price: 800, location: "San José del Cabo", city: "Los Cabos", country: "Mexico", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Golf", "Butler Service"], matchPercentage: 100, gradient: g(1) },

  // Caribbean
  { id: 114, name: "Sandy Lane Barbados", stars: 5, rating: 4.9, price: 1000, location: "St. James Parish Beach", city: "Holetown", country: "Barbados", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Golf", "Butler Service"], matchPercentage: 100, gradient: g(2) },
  { id: 115, name: "Jade Mountain St. Lucia", stars: 5, rating: 4.9, price: 1200, location: "Soufrière, Piton View", city: "Soufrière", country: "Saint Lucia", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Infinity Pool", "Mountain View"], matchPercentage: 100, gradient: g(3) },

  // ─── SOUTH AMERICA ────────────────────────────────────────────

  // Brazil
  { id: 116, name: "Copacabana Palace", stars: 5, rating: 4.8, price: 500, location: "Avenida Atlântica, Copacabana", city: "Rio de Janeiro", country: "Brazil", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Heritage"], matchPercentage: 98, gradient: g(4) },
  { id: 117, name: "Hotel Fasano São Paulo", stars: 5, rating: 4.7, price: 350, location: "Rua Vittorio Fasano, Jardins", city: "São Paulo", country: "Brazil", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Rooftop"], matchPercentage: 93, gradient: g(5) },
  { id: 118, name: "Ponta dos Ganchos", stars: 5, rating: 4.9, price: 700, location: "Governador Celso Ramos", city: "Santa Catarina", country: "Brazil", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Private Bungalows"], matchPercentage: 100, gradient: g(0) },

  // Argentina
  { id: 119, name: "Alvear Palace Hotel", stars: 5, rating: 4.8, price: 350, location: "Recoleta, Avenida Alvear", city: "Buenos Aires", country: "Argentina", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Heritage"], matchPercentage: 96, gradient: g(1) },
  { id: 120, name: "Llao Llao Resort", stars: 5, rating: 4.7, price: 400, location: "Lago Nahuel Huapi", city: "Bariloche", country: "Argentina", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Golf", "Ski", "Lake View"], matchPercentage: 94, gradient: g(2) },

  // Peru
  { id: 121, name: "Belmond Hotel Monasterio", stars: 5, rating: 4.8, price: 350, location: "Plazoleta Nazarenas", city: "Cusco", country: "Peru", continent: "South America", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Heritage", "Courtyard", "Oxygen-Enriched Rooms"], matchPercentage: 95, gradient: g(3) },
  { id: 122, name: "Belmond Sanctuary Lodge", stars: 5, rating: 4.9, price: 800, location: "Adjacent to Machu Picchu", city: "Machu Picchu", country: "Peru", continent: "South America", amenities: ["WiFi", "Spa", "Restaurant", "Garden", "Ruins View"], matchPercentage: 100, gradient: g(4) },

  // Chile
  { id: 123, name: "The Singular Patagonia", stars: 5, rating: 4.7, price: 500, location: "Puerto Bories", city: "Puerto Natales", country: "Chile", continent: "South America", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Fjord View", "Excursions"], matchPercentage: 94, gradient: g(5) },

  // Colombia
  { id: 124, name: "Sofitel Legend Santa Clara", stars: 5, rating: 4.7, price: 300, location: "Walled City, Calle del Torno", city: "Cartagena", country: "Colombia", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Heritage", "Garden"], matchPercentage: 92, gradient: g(0) },

  // ─── AFRICA ───────────────────────────────────────────────────

  // South Africa
  { id: 125, name: "The Table Bay Hotel", stars: 5, rating: 4.7, price: 300, location: "V&A Waterfront", city: "Cape Town", country: "South Africa", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Mountain View", "Harbour View"], matchPercentage: 93, gradient: g(1) },
  { id: 126, name: "One&Only Cape Town", stars: 5, rating: 4.8, price: 500, location: "V&A Waterfront Marina", city: "Cape Town", country: "South Africa", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Island Suite"], matchPercentage: 97, gradient: g(2) },
  { id: 127, name: "The Saxon Hotel", stars: 5, rating: 4.9, price: 600, location: "Sandhurst, Sandown Road", city: "Johannesburg", country: "South Africa", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Heritage"], matchPercentage: 100, gradient: g(3) },
  { id: 128, name: "Sabi Sabi Earth Lodge", stars: 5, rating: 4.9, price: 1500, location: "Sabi Sand Game Reserve", city: "Kruger", country: "South Africa", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Safari", "Bush View", "Private Plunge Pool"], matchPercentage: 100, gradient: g(4) },

  // Kenya
  { id: 129, name: "Giraffe Manor", stars: 5, rating: 4.9, price: 900, location: "Langata, Karen", city: "Nairobi", country: "Kenya", continent: "Africa", amenities: ["WiFi", "Restaurant", "Garden", "Giraffe Feeding", "Heritage"], matchPercentage: 100, gradient: g(5) },
  { id: 130, name: "Angama Mara", stars: 5, rating: 4.9, price: 1200, location: "Great Rift Valley Edge", city: "Maasai Mara", country: "Kenya", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Safari", "Hot Air Balloon"], matchPercentage: 100, gradient: g(0) },
  { id: 131, name: "Hemingways Nairobi", stars: 5, rating: 4.6, price: 350, location: "Karen, Mbagathi Ridge", city: "Nairobi", country: "Kenya", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Garden"], matchPercentage: 90, gradient: g(1) },

  // Tanzania
  { id: 132, name: "Four Seasons Safari Lodge", stars: 5, rating: 4.8, price: 1000, location: "Serengeti National Park", city: "Serengeti", country: "Tanzania", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Safari", "Watering Hole View"], matchPercentage: 98, gradient: g(2) },
  { id: 133, name: "Zanzibar Serena Hotel", stars: 5, rating: 4.5, price: 250, location: "Stone Town Waterfront", city: "Stone Town", country: "Tanzania", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Heritage"], matchPercentage: 85, gradient: g(3) },

  // Morocco
  { id: 134, name: "La Mamounia", stars: 5, rating: 4.8, price: 500, location: "Avenue Bab Jdid", city: "Marrakech", country: "Morocco", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Garden", "Heritage"], matchPercentage: 97, gradient: g(4) },
  { id: 135, name: "Royal Mansour Marrakech", stars: 5, rating: 4.9, price: 900, location: "Rue Abou Abbas El Sebti", city: "Marrakech", country: "Morocco", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Riad", "Garden", "Butler Service"], matchPercentage: 100, gradient: g(5) },

  // Egypt
  { id: 136, name: "Sofitel Winter Palace", stars: 5, rating: 4.6, price: 200, location: "Corniche El Nile", city: "Luxor", country: "Egypt", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Garden", "Nile View", "Heritage"], matchPercentage: 88, gradient: g(0) },
  { id: 137, name: "Marriott Mena House", stars: 5, rating: 4.7, price: 250, location: "Pyramids Road, Giza", city: "Cairo", country: "Egypt", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Pyramid View", "Heritage"], matchPercentage: 92, gradient: g(1) },

  // Rwanda
  { id: 138, name: "One&Only Gorilla's Nest", stars: 5, rating: 4.8, price: 1500, location: "Volcanoes National Park Edge", city: "Kinigi", country: "Rwanda", continent: "Africa", amenities: ["WiFi", "Spa", "Restaurant", "Gorilla Trekking", "Mountain View", "Fireplace"], matchPercentage: 100, gradient: g(2) },

  // Botswana
  { id: 139, name: "Mombo Camp", stars: 5, rating: 4.9, price: 2500, location: "Chief's Island, Okavango", city: "Okavango Delta", country: "Botswana", continent: "Africa", amenities: ["WiFi", "Pool", "Restaurant", "Safari", "Private Deck", "Guided Walks"], matchPercentage: 100, gradient: g(3) },

  // ─── OCEANIA ──────────────────────────────────────────────────

  // Australia
  { id: 140, name: "Park Hyatt Sydney", stars: 5, rating: 4.8, price: 600, location: "The Rocks, Harbour", city: "Sydney", country: "Australia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Opera House View", "Harbour View"], matchPercentage: 98, gradient: g(4) },
  { id: 141, name: "Crown Towers Melbourne", stars: 5, rating: 4.7, price: 400, location: "Southbank, Yarra River", city: "Melbourne", country: "Australia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Casino", "City View"], matchPercentage: 94, gradient: g(5) },
  { id: 142, name: "Qualia Hamilton Island", stars: 5, rating: 4.9, price: 1000, location: "Great Barrier Reef", city: "Hamilton Island", country: "Australia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Golf", "Reef Tours"], matchPercentage: 100, gradient: g(0) },
  { id: 143, name: "Southern Ocean Lodge", stars: 5, rating: 4.8, price: 800, location: "Kangaroo Island Clifftop", city: "Kangaroo Island", country: "Australia", continent: "Oceania", amenities: ["WiFi", "Spa", "Restaurant", "Nature Tours", "Ocean View"], matchPercentage: 97, gradient: g(1) },
  { id: 144, name: "The Langham Melbourne", stars: 5, rating: 4.6, price: 350, location: "Southbank, Flinders Street", city: "Melbourne", country: "Australia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"], matchPercentage: 90, gradient: g(2) },

  // New Zealand
  { id: 145, name: "Huka Lodge", stars: 5, rating: 4.9, price: 700, location: "Waikato River Banks", city: "Taupo", country: "New Zealand", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fishing", "Nature Walks", "River View"], matchPercentage: 100, gradient: g(3) },
  { id: 146, name: "The Lodge at Kauri Cliffs", stars: 5, rating: 4.8, price: 800, location: "Matauri Bay Clifftop", city: "Matauri Bay", country: "New Zealand", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Golf", "Beach", "Ocean View"], matchPercentage: 98, gradient: g(4) },
  { id: 147, name: "Eichardt's Private Hotel", stars: 5, rating: 4.7, price: 500, location: "Marine Parade Lakefront", city: "Queenstown", country: "New Zealand", continent: "Oceania", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Lake View", "Mountain View"], matchPercentage: 95, gradient: g(5) },

  // Fiji
  { id: 148, name: "Laucala Island Resort", stars: 5, rating: 4.9, price: 3000, location: "Private Island, Fiji", city: "Laucala Island", country: "Fiji", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Golf", "Diving", "Private Villa"], matchPercentage: 100, gradient: g(0) },
  { id: 149, name: "Likuliku Lagoon Resort", stars: 5, rating: 4.8, price: 800, location: "Malolo Island", city: "Mamanuca Islands", country: "Fiji", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Overwater Bure", "Snorkeling"], matchPercentage: 98, gradient: g(1) },

  // French Polynesia
  { id: 150, name: "The Brando", stars: 5, rating: 4.9, price: 3500, location: "Tetiaroa Private Atoll", city: "Tetiaroa", country: "French Polynesia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Diving", "Eco-Luxury", "Private Island"], matchPercentage: 100, gradient: g(2) },
  { id: 151, name: "Four Seasons Bora Bora", stars: 5, rating: 4.9, price: 1500, location: "Motu Tehotu", city: "Bora Bora", country: "French Polynesia", continent: "Oceania", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Overwater Bungalow", "Lagoon View"], matchPercentage: 100, gradient: g(3) },

  // ─── ADDITIONAL WORLDWIDE ─────────────────────────────────────

  // Iceland
  { id: 152, name: "The Retreat at Blue Lagoon", stars: 5, rating: 4.8, price: 800, location: "Grindavík Lava Fields", city: "Grindavík", country: "Iceland", continent: "Europe", amenities: ["WiFi", "Spa", "Restaurant", "Lagoon Access", "Lava View", "In-Water Bar"], matchPercentage: 98, gradient: g(4) },

  // Bhutan
  { id: 153, name: "Amankora Paro", stars: 5, rating: 4.9, price: 1500, location: "Paro Valley Pine Forest", city: "Paro", country: "Bhutan", continent: "Asia", amenities: ["WiFi", "Spa", "Restaurant", "Meditation", "Mountain View", "Cultural Tours"], matchPercentage: 100, gradient: g(5) },

  // Nepal
  { id: 154, name: "Dwarika's Hotel", stars: 5, rating: 4.7, price: 200, location: "Battisputali", city: "Kathmandu", country: "Nepal", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Heritage", "Garden"], matchPercentage: 88, gradient: g(0) },

  // Jordan
  { id: 155, name: "Kempinski Ishtar Dead Sea", stars: 5, rating: 4.6, price: 280, location: "Dead Sea Shoreline", city: "Dead Sea", country: "Jordan", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Dead Sea Access"], matchPercentage: 85, gradient: g(1) },

  // Israel
  { id: 156, name: "King David Hotel", stars: 5, rating: 4.7, price: 400, location: "King David Street", city: "Jerusalem", country: "Israel", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage", "Old City View"], matchPercentage: 93, gradient: g(2) },

  // Costa Rica
  { id: 157, name: "Nayara Springs", stars: 5, rating: 4.9, price: 700, location: "Arenal Volcano Area", city: "La Fortuna", country: "Costa Rica", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Hot Springs", "Volcano View", "Rainforest"], matchPercentage: 100, gradient: g(3) },

  // Seychelles
  { id: 158, name: "Four Seasons Seychelles", stars: 5, rating: 4.8, price: 1000, location: "Petite Anse Bay", city: "Mahé", country: "Seychelles", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Diving", "Tree-Top Villa"], matchPercentage: 98, gradient: g(4) },

  // Mauritius
  { id: 159, name: "One&Only Le Saint Géran", stars: 5, rating: 4.8, price: 800, location: "Belle Mare Peninsula", city: "Belle Mare", country: "Mauritius", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Golf", "Water Sports"], matchPercentage: 98, gradient: g(5) },

  // Cuba
  { id: 160, name: "Gran Hotel Manzana Kempinski", stars: 5, rating: 4.5, price: 300, location: "Old Havana, Manzana de Gómez", city: "Havana", country: "Cuba", continent: "North America", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage", "Rooftop"], matchPercentage: 87, gradient: g(0) },

  // Mongolia
  { id: 161, name: "Three Camel Lodge", stars: 4, rating: 4.6, price: 400, location: "Gobi Desert, Bulagtai", city: "South Gobi", country: "Mongolia", continent: "Asia", amenities: ["WiFi", "Restaurant", "Ger Camp", "Camel Rides", "Desert View", "Stargazing"], matchPercentage: 88, gradient: g(1) },

  // Madagascar
  { id: 162, name: "Constance Tsarabanjina", stars: 5, rating: 4.7, price: 500, location: "Tsarabanjina Island", city: "Nosy Be", country: "Madagascar", continent: "Africa", amenities: ["WiFi", "Restaurant", "Beach", "Diving", "Snorkeling", "Private Island"], matchPercentage: 93, gradient: g(2) },

  // Antarctica (Cruise Ship Hotel)
  { id: 163, name: "White Desert Whichaway Camp", stars: 5, rating: 4.9, price: 5000, location: "Schirmacher Oasis", city: "Antarctica", country: "Antarctica", continent: "Antarctica", amenities: ["WiFi", "Restaurant", "Heated Pods", "Ice Climbing", "Penguin Colony", "Scenic Flights"], matchPercentage: 100, gradient: g(3) },

  // Oman
  { id: 164, name: "Alila Jabal Akhdar", stars: 5, rating: 4.8, price: 500, location: "Jabal Akhdar Gorge Edge", city: "Al Jabal Al Akhdar", country: "Oman", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Mountain View", "Infinity Pool"], matchPercentage: 96, gradient: g(4) },

  // Cambodia
  { id: 165, name: "Amansara", stars: 5, rating: 4.9, price: 900, location: "Near Angkor Wat", city: "Siem Reap", country: "Cambodia", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Temple Tours", "Bicycle", "Butler Service"], matchPercentage: 100, gradient: g(5) },

  // Malaysia
  { id: 166, name: "The Datai Langkawi", stars: 5, rating: 4.8, price: 500, location: "Datai Bay Rainforest", city: "Langkawi", country: "Malaysia", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Rainforest", "Nature Walks"], matchPercentage: 97, gradient: g(0) },
  { id: 167, name: "Mandarin Oriental KL", stars: 5, rating: 4.7, price: 250, location: "KLCC, Near Petronas Towers", city: "Kuala Lumpur", country: "Malaysia", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "City View"], matchPercentage: 90, gradient: g(1) },

  // Philippines
  { id: 168, name: "Amanpulo", stars: 5, rating: 4.9, price: 1000, location: "Pamalican Island", city: "Cuyo Islands", country: "Philippines", continent: "Asia", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Diving", "Private Island"], matchPercentage: 100, gradient: g(2) },

  // Myanmar
  { id: 169, name: "The Strand Yangon", stars: 5, rating: 4.5, price: 200, location: "Strand Road, Downtown", city: "Yangon", country: "Myanmar", continent: "Asia", amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Heritage"], matchPercentage: 82, gradient: g(3) },

  // Croatia
  { id: 170, name: "Hotel Excelsior Dubrovnik", stars: 5, rating: 4.7, price: 400, location: "Frana Supila, Old Town", city: "Dubrovnik", country: "Croatia", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beach", "Sea View"], matchPercentage: 93, gradient: g(4) },

  // Hungary
  { id: 171, name: "Four Seasons Gresham Palace", stars: 5, rating: 4.8, price: 450, location: "Széchenyi tér, Danube Bank", city: "Budapest", country: "Hungary", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Heritage", "River View"], matchPercentage: 95, gradient: g(5) },

  // Ireland
  { id: 172, name: "Ashford Castle", stars: 5, rating: 4.9, price: 600, location: "Cong Village, Lough Corrib", city: "Cong", country: "Ireland", continent: "Europe", amenities: ["WiFi", "Spa", "Restaurant", "Golf", "Falconry", "Heritage", "Lake View"], matchPercentage: 100, gradient: g(0) },

  // Scotland
  { id: 173, name: "Gleneagles", stars: 5, rating: 4.8, price: 550, location: "Auchterarder, Perthshire", city: "Auchterarder", country: "United Kingdom", continent: "Europe", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Golf", "Falconry", "Equestrian"], matchPercentage: 97, gradient: g(1) },

  // Finland
  { id: 174, name: "Kakslauttanen Arctic Resort", stars: 4, rating: 4.7, price: 500, location: "Saariselkä, Lapland", city: "Saariselkä", country: "Finland", continent: "Europe", amenities: ["WiFi", "Restaurant", "Glass Igloo", "Northern Lights", "Husky Safaris", "Sauna"], matchPercentage: 95, gradient: g(2) },

  // Norway
  { id: 175, name: "The Thief", stars: 5, rating: 4.6, price: 350, location: "Tjuvholmen, Waterfront", city: "Oslo", country: "Norway", continent: "Europe", amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Art Collection", "Fjord View"], matchPercentage: 90, gradient: g(3) },

  // Poland
  { id: 176, name: "Hotel Copernicus", stars: 5, rating: 4.6, price: 200, location: "Kanonicza Street, Old Town", city: "Kraków", country: "Poland", continent: "Europe", amenities: ["WiFi", "Spa", "Restaurant", "Heritage", "Rooftop Terrace", "Wawel View"], matchPercentage: 88, gradient: g(4) },

  // Ecuador
  { id: 177, name: "Mashpi Lodge", stars: 5, rating: 4.8, price: 600, location: "Mashpi Cloud Forest Reserve", city: "Mashpi", country: "Ecuador", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Birdwatching", "Canopy Rides", "Rainforest"], matchPercentage: 97, gradient: g(5) },

  // Bolivia
  { id: 178, name: "Palacio de Sal", stars: 4, rating: 4.5, price: 150, location: "Uyuni Salt Flats Edge", city: "Uyuni", country: "Bolivia", continent: "South America", amenities: ["WiFi", "Restaurant", "Salt Architecture", "Salt Flat Tours", "Stargazing"], matchPercentage: 82, gradient: g(0) },

  // Uruguay
  { id: 179, name: "Hotel Fasano Punta del Este", stars: 5, rating: 4.6, price: 350, location: "Ruta 10 Beach", city: "Punta del Este", country: "Uruguay", continent: "South America", amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach", "Golf"], matchPercentage: 90, gradient: g(1) },

  // Ethiopia
  { id: 180, name: "Sheraton Addis", stars: 5, rating: 4.4, price: 200, location: "Taitu Street", city: "Addis Ababa", country: "Ethiopia", continent: "Africa", amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Garden"], matchPercentage: 80, gradient: g(2) },
];

// ═══════════════════════════════════════════════════════════════
// STUDY CONDITION ARRAYS (used in results display)
// ═══════════════════════════════════════════════════════════════

export const fullMatchHotels: Hotel[] = worldHotels.filter(h => h.matchPercentage >= 95).slice(0, 4);
export const partialMatchHotels: Hotel[] = worldHotels.filter(h => h.matchPercentage >= 30 && h.matchPercentage <= 65).slice(0, 4);

// ═══════════════════════════════════════════════════════════════
// CRITERIA HELPERS
// ═══════════════════════════════════════════════════════════════

export const getFullCriteria = (filters: HotelFilters): CriteriaMatch[] => [
  { label: `Price Range: ${filters.priceRange.replace('-', ' ')}`, matched: true },
  { label: `Star Rating: ${filters.starRating.join(', ')} star(s)`, matched: true },
  { label: `Location: ${filters.location.replace(/-/g, ' ')}`, matched: true },
  { label: `Rooms Available: ${filters.rooms}`, matched: true },
  { label: `Amenities: ${filters.amenities.join(', ')}`, matched: true },
];

export const getPartialCriteria = (filters: HotelFilters): CriteriaMatch[] => [
  { label: `Price Range: ${filters.priceRange.replace('-', ' ')}`, matched: false },
  { label: `Star Rating: ${filters.starRating.join(', ')} star(s)`, matched: false },
  { label: `Location: ${filters.location.replace(/-/g, ' ')}`, matched: true },
  { label: `Rooms Available: ${filters.rooms}`, matched: true },
  { label: `Amenities: ${filters.amenities.join(', ')}`, matched: false },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getAllCountries = (): string[] => {
  return [...new Set(worldHotels.map(h => h.country))].sort();
};

export const getAllCities = (): string[] => {
  return [...new Set(worldHotels.map(h => h.city))].sort();
};

export const getAllContinents = (): string[] => {
  return [...new Set(worldHotels.map(h => h.continent))].sort();
};

export const getHotelsByCountry = (country: string): Hotel[] => {
  return worldHotels.filter(h => h.country.toLowerCase() === country.toLowerCase());
};

export const getHotelsByCity = (city: string): Hotel[] => {
  return worldHotels.filter(h => h.city.toLowerCase() === city.toLowerCase());
};

export const getHotelsByContinent = (continent: string): Hotel[] => {
  return worldHotels.filter(h => h.continent.toLowerCase() === continent.toLowerCase());
};

export const searchHotels = (query: string): Hotel[] => {
  const q = query.toLowerCase();
  return worldHotels.filter(
    h =>
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      h.country.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q)
  );
};
