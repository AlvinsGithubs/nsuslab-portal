import * as contentful from 'contentful';
import type { Entry } from 'contentful';
import type { 
  Job, 
  Department, 
  TeamMember, 
  Benefit, 
  GgVegasGame, 
  FinancialInfo,
  HistoryEvent, 
  HistoryYear,
  GlobalLicense 
} from '@/types';

// --- 환경 변수 설정 ---
const SPACE_ID = import.meta.env.VITE_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error("Contentful environment variables VITE_SPACE_ID and VITE_ACCESS_TOKEN must be set in a .env file.");
}

// --- Contentful 클라이언트 생성 ---
export const contentfulClient = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// 이미지 자산(Asset)에서 URL을 안전하게 추출하는 헬퍼 함수
const getAssetUrl = (asset: any): string => {
  return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : '';
};

// --- 1. Jobs  ---

export const parseContentfulJob = (entry: Entry<any>): Job => {
    const fields = entry.fields;
    const parseTextToArray = (field: any): string[] => {
        if (!field) return [];
        if (typeof field === 'string') {
            return field.split('\n').filter(line => line.trim() !== '');
        }
        if (field.content) {
            return field.content.map((node: any) => 
                node.content.map((innerNode: any) => innerNode.value).join('')
            ).filter((string: string) => string.trim() !== '');
        }
        return [];
    };

    return {
        id: entry.sys.id,
        slug: fields.slug as string,
        title: fields.title as string,
        department: fields.department as string,
        location: fields.location as string,
        employmentType: fields.employmentType as string,
        careerLevel: fields.careerLevel as string,
        postedDate: fields.postedDate as string,
        deadline: fields.deadline as string,
        responsibilities: parseTextToArray(fields.responsibilities),
        qualifications: parseTextToArray(fields.qualifications),
        preferred: parseTextToArray(fields.preferred),
    };
};

export const fetchAllJobs = async (): Promise<Job[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'job',
    order: ['-fields.postedDate'],
  });
  return response.items.map(parseContentfulJob);
};

export const fetchJobBySlug = async (slug: string): Promise<Job | null> => {
    const response = await contentfulClient.getEntries({
        content_type: 'job',
        'fields.slug': slug,
        limit: 1,
    });
    return response.items.length > 0 ? parseContentfulJob(response.items[0]) : null;
};

// "추천 채용" (최신순 4개)
export const fetchFeaturedJobs = async (): Promise<Job[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'job',
    order: ['-fields.postedDate'],
    limit: 4,
  });
  return response.items.map(parseContentfulJob);
};

// 특정 부서 채용 공고
export const fetchJobsByDepartment = async (departmentName: string): Promise<Job[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'job',
    'fields.department': departmentName,
  });
  return response.items.map(parseContentfulJob);
};


// --- 2. Departments  ---
export const parseContentfulDepartment = (entry: Entry<any>): Department => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    name: fields.name as string,
    slug: fields.slug as string,
    description: fields.description as string,
    imageUrl: getAssetUrl(fields.imageUrl),
    vision: fields.vision as string,
  };
};

export const fetchAllDepartments = async (): Promise<Department[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'department',
  });
  return response.items.map(parseContentfulDepartment);
};

export const fetchDepartmentBySlug = async (slug: string): Promise<Department | null> => {
  const response = await contentfulClient.getEntries({
    content_type: 'department',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items.length > 0 ? parseContentfulDepartment(response.items[0]) : null;
};


// --- 3. Team Members ---

export const parseContentfulTeamMember = (entry: Entry<any>): TeamMember => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    name: fields.name as string,
    slug: fields.slug as string,
    role: fields.role as string,
    department: fields.department as string,
    quote: fields.quote as string,
    imageUrl: getAssetUrl(fields.imageUrl),
    fullStory: fields.fullStory as { q: string; a: string }[],
    content: fields.content, 
  };
};

export const fetchAllTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await contentfulClient.getEntries({ content_type: 'teamMember' });
  return response.items.map(parseContentfulTeamMember);
};

export const fetchTeamMemberBySlug = async (slug: string): Promise<TeamMember | null> => {
  const response = await contentfulClient.getEntries({
    content_type: 'teamMember',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items.length > 0 ? parseContentfulTeamMember(response.items[0]) : null;
};

export const fetchTeamMembersByDepartment = async (departmentName: string): Promise<TeamMember[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'teamMember',
    'fields.department': departmentName,
  });
  return response.items.map(parseContentfulTeamMember);
};


// --- 4. Benefits ---

export const parseContentfulBenefit = (entry: Entry<any>): Benefit => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    title: fields.title as string,
    description: fields.description as string,
    icon: fields.icon as string,
    category: fields.category as string,
  };
};

export const fetchAllBenefits = async (): Promise<Benefit[]> => {
  const response = await contentfulClient.getEntries({ content_type: 'benefit' });
  return response.items.map(parseContentfulBenefit);
};


// --- 5. GG Vegas Games ---

export const parseContentfulGgVegasGame = (entry: Entry<any>): GgVegasGame => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    displayNumber: fields.displayNumber as string,
    title: fields.title as string,
    releaseYear: fields.releaseYear as string,
    gameImage: getAssetUrl(fields.gameImage),
  };
};

export const fetchAllGgVegasGames = async (): Promise<GgVegasGame[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'ggVegasGame', 
    order: ['fields.displayNumber'], 
  });
  return response.items.map(parseContentfulGgVegasGame);
};


// --- 6. Financial Info ---

export const parseContentfulFinancialInfo = (entry: Entry<any>): FinancialInfo => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    title: fields.title as string,
    imageUrl: getAssetUrl(fields.imageUrl),
  };
};

export const fetchAllFinancialInfo = async (): Promise<FinancialInfo[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'financialInfo', 
  });
  return response.items.map(parseContentfulFinancialInfo);
};


// --- 7. Global Licenses ---

export const parseContentfulGlobalLicense = (entry: Entry<any>): GlobalLicense => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    imageUrl: getAssetUrl(fields.image),
    text: entry.fields.text as string,
  };
};

export const fetchAllGlobalLicenses = async (): Promise<GlobalLicense[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'globalLicense', 
  });
  return response.items.map(parseContentfulGlobalLicense);
};


// --- 8. History (연혁) ---

export const fetchAllHistory = async (): Promise<HistoryYear[]> => {
    const entries = await contentfulClient.getEntries({
        content_type: 'historyList', 
        order: ['-fields.year', 'fields.month'],
    });

    const historyMap = new Map<string, HistoryEvent[]>();

    entries.items.forEach(item => {
        const year = String(item.fields.year);
        const event: HistoryEvent = {
            month: item.fields.month as string,
            description: item.fields.description as string,
        };

        if (historyMap.has(year)) {
            historyMap.get(year)!.push(event);
        } else {
            historyMap.set(year, [event]);
        }
    });

    return Array.from(historyMap.entries()).map(([year, events]) => ({
        year,
        events,
    }));
};