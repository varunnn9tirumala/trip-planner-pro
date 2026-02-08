import { SessionData } from '@/types/hotel';

const STORAGE_KEY = 'tripmatch_sessions';

export const saveSession = (session: SessionData): void => {
  const existing = getSessions();
  existing.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getSessions = (): SessionData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearSessions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportAsCSV = (sessions: SessionData[]): string => {
  if (sessions.length === 0) return '';
  const headers = [
    'ID', 'AI Type', 'Condition', 'Decision', 'Timestamp',
    'Duration (s)', 'From', 'To', 'Check-in', 'Check-out',
    'Guests', 'Price Range', 'Star Rating', 'Rooms', 'Location',
    'Amenities', 'Criteria Matched', 'Criteria Total',
  ];
  const rows = sessions.map(s => [
    s.id,
    s.aiType,
    s.condition,
    s.decision,
    s.timestamp,
    s.duration,
    s.searchParams.from,
    s.searchParams.to,
    s.searchParams.checkIn,
    s.searchParams.checkOut,
    s.searchParams.guests,
    s.filters.priceRange,
    s.filters.starRating.join(';'),
    s.filters.rooms,
    s.filters.location,
    s.filters.amenities.join(';'),
    s.criteriaMatched,
    s.criteriaTotal,
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};

export const exportAsJSON = (sessions: SessionData[]): string => {
  return JSON.stringify(sessions, null, 2);
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
