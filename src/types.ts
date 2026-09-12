export type Category = 
  | 'admissions' 
  | 'fees' 
  | 'timetable' 
  | 'examinations' 
  | 'departments' 
  | 'facilities' 
  | 'general';

export interface QuickLink {
  label: string;
  action: 'modal' | 'link' | 'query';
  target: string;
  icon?: string;
}

export interface ExtractedEntity {
  name: string;
  value: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: Category;
  confidence?: number;
  entities?: ExtractedEntity[];
  quickReplies?: string[];
  links?: QuickLink[];
  feedback?: 'like' | 'dislike' | null;
  isStreaming?: boolean;
}

export interface StudentProfile {
  name: string;
  studentType: 'prospective' | 'undergraduate' | 'postgraduate' | 'international';
  major: string;
  semester: number;
}

export interface FAQItem {
  id: string;
  question: string;
  category: Category;
  shortAnswer: string;
  fullAnswer: string;
  tags: string[];
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  hod: string;
  email: string;
  location: string;
  phone: string;
  programs: string[];
  labs: string[];
  description: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  code: string;
  instructor: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface ExamInfo {
  code: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
  duration: string;
}

export interface FacilityInfo {
  id: string;
  name: string;
  category: 'academic' | 'residential' | 'sports' | 'medical' | 'dining' | 'tech';
  hours: string;
  location: string;
  contact: string;
  highlights: string[];
  rules: string;
}
