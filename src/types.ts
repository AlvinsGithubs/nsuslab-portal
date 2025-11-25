

export interface MegaMenuLink {
  nameKey: string;
  href: string;
}

export interface MegaMenuColumn {
  titleKey: string;
  links: MegaMenuLink[];
}

export interface NavLink {
  nameKey: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
}

export interface Job {
  id?: number | string;
  slug?: string;
  title?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  careerLevel?: string;
  postedDate?: string;
  deadline?: string;
  responsibilities?: string[];
  qualifications?: string[];
  preferred?: string[];
}

export interface Department {
  id?: string; // <-- 이 줄을 추가하세요.
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  vision: string;
}

export interface TeamMember {
  id?: string; // <-- 이 줄을 추가하세요.
  name:string;
  slug: string;
  role: string;
  department: string;
  quote: string;
  imageUrl: string;
  fullStory: { q: string; a: string }[];
  content?: any;
}

export interface Benefit {
  id?: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface JobFilterCheckboxState {
  [key: string]: boolean;
}

export interface FilterState {
  keyword: string;
  jobGroup: JobFilterCheckboxState;
  careerLevel: JobFilterCheckboxState;
  employmentType: JobFilterCheckboxState;
  location: JobFilterCheckboxState;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Press Release' | 'Business Highlight';
  publicationDate: string;
  summary: string;
  featuredImageUrl: string;
  content: any; // For Contentful Rich Text JSON
}

// types.ts 파일에 아래 내용을 추가하세요.

export interface GgVegasGame {
  id: string;
  displayNumber: string;
  title: string;
  releaseYear: string;
  gameImage: string; // imageUrl에서 이름을 gameImage로 변경했습니다.
}

export interface FinancialInfo {
  id?: string; // 
  title: string; // <-- 이 줄을 추가하세요.
  imageUrl: string;
}

// History 타입을 추가합니다.
export interface HistoryEvent {
  month: string;
  description: string;
}

export interface HistoryYear {
  year: string;
  events: HistoryEvent[];
}

// ✅ Global License 타입을 추가합니다.
export interface GlobalLicense {
  id: string;
  imageUrl: string;
  text: string;
}