import * as contentful from 'contentful';
import type { Entry } from 'contentful';
import type { Job, Department, TeamMember, Benefit, GgVegasGame, FinancialInfo } from '@/types';
import type { HistoryEvent, HistoryYear } from '@/types'; // 아래에서 만들 타입을 미리 import
import type { GlobalLicense } from '@/types'; // ✅ 파일 상단 import 목록에 추가



const SPACE_ID = import.meta.env.VITE_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error("Contentful environment variables VITE_SPACE_ID and VITE_ACCESS_TOKEN must be set in a .env file.");
}

// Contentful 클라이언트 생성
export const contentfulClient = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export const parseContentfulJob = (entry: Entry<any>): Job => {
    const fields = entry.fields;
    
    // Rich Text 또는 일반 Text 필드를 줄바꿈 기준의 문자열 배열로 변환하는 함수
    const parseTextToArray = (field: any): string[] => {
        if (!field) return [];
        // 일반 텍스트 필드 처리 (Markdown)
        if (typeof field === 'string') {
            return field.split('\n').filter(line => line.trim() !== '');
        }
        // Rich Text 필드 처리
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
    if (response.items.length > 0) {
        return parseContentfulJob(response.items[0]);
    }
    return null;
}




// "추천 채용"을 위해 최신순으로 4개의 공고만 가져오는 함수
export const fetchFeaturedJobs = async (): Promise<Job[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'job',
    order: ['-fields.postedDate'], // '-'는 내림차순(최신순) 정렬을 의미
    limit: 4,
  });
  return response.items.map(parseContentfulJob);
};

// 특정 부서에 속한 모든 채용 공고를 가져오는 함수
export const fetchJobsByDepartment = async (departmentName: string): Promise<Job[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'job',
    'fields.department': departmentName, // 'department' 필드 값으로 필터링
  });
  return response.items.map(parseContentfulJob);
};

// Contentful의 Department Entry를 우리 앱의 Department 타입으로 변환
export const parseContentfulDepartment = (entry: Entry<any>): Department => {
  const fields = entry.fields;
  const imageUrlAsset = fields.imageUrl as contentful.Asset;
  return {
    id: entry.sys.id, // <-- 이 줄을 추가하세요.
    name: fields.name as string,
    slug: fields.slug as string,
    description: fields.description as string,
    // Media 필드는 file.url 경로에 실제 이미지 주소가 있습니다.
    imageUrl: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
    vision: fields.vision as string,
  };
};

// 모든 부서 목록을 가져오는 함수
export const fetchAllDepartments = async (): Promise<Department[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'department',
  });
  return response.items.map(parseContentfulDepartment);
};

// slug로 특정 부서 하나만 가져오는 함수
export const fetchDepartmentBySlug = async (slug: string): Promise<Department | null> => {
  const response = await contentfulClient.getEntries({
    content_type: 'department',
    'fields.slug': slug,
    limit: 1,
  });
  if (response.items.length > 0) {
    return parseContentfulDepartment(response.items[0]);
  }
  return null;
};

// Contentful의 TeamMember Entry를 우리 앱의 TeamMember 타입으로 변환
export const parseContentfulTeamMember = (entry: Entry<any>): TeamMember => {
  const fields = entry.fields;
  const imageUrlAsset = fields.imageUrl as contentful.Asset;
  return {
    id: entry.sys.id,
    name: fields.name as string,
    slug: fields.slug as string,
    role: fields.role as string,
    department: fields.department as string,
    quote: fields.quote as string,
    imageUrl: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
    // JSON 필드는 이미 자바스크립트 객체/배열이므로 그대로 사용
    fullStory: fields.fullStory as { q: string; a: string }[],
  };
};

// 모든 팀원 목록을 가져오는 함수
export const fetchAllTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await contentfulClient.getEntries({ content_type: 'teamMember' });
  return response.items.map(parseContentfulTeamMember);
};

// slug로 특정 팀원 한 명만 가져오는 함수
export const fetchTeamMemberBySlug = async (slug: string): Promise<TeamMember | null> => {
  const response = await contentfulClient.getEntries({
    content_type: 'teamMember',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items.length > 0 ? parseContentfulTeamMember(response.items[0]) : null;
};

// 특정 부서에 속한 모든 팀원을 가져오는 함수
export const fetchTeamMembersByDepartment = async (departmentName: string): Promise<TeamMember[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'teamMember',
    'fields.department': departmentName,
  });
  return response.items.map(parseContentfulTeamMember);
};

// 파일 하단에 아래 두 함수 추가
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


export const parseContentfulGgVegasGame = (entry: Entry<any>): GgVegasGame => {
  const fields = entry.fields;
  const imageUrlAsset = fields.gameImage as contentful.Asset;
  return {
    id: entry.sys.id,
    displayNumber: fields.displayNumber as string,
    title: fields.title as string,
    releaseYear: fields.releaseYear as string,
    gameImage: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
  };
};

export const parseContentfulGlobalLicense = (entry: Entry<any>): GlobalLicense => {
  const fields = entry.fields;
  const imageUrlAsset = fields.image as contentful.Asset;
  return {
    id: entry.sys.id,
    imageUrl: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
    text: entry.fields.text as string,
  };
};




// lib/contentful.ts 파일에 아래 fetch 함수를 추가하세요.

export const fetchAllGgVegasGames = async (): Promise<GgVegasGame[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'ggVegasGame', // Contentful 모델의 API ID와 일치해야 합니다.
    order: ['fields.displayNumber'], // 'number' 필드 기준으로 정렬
  });
  return response.items.map(parseContentfulGgVegasGame);
};


export const parseContentfulFinancialInfo = (entry: Entry<any>): FinancialInfo => {
  const fields = entry.fields;
  const imageUrlAsset = fields.imageUrl as contentful.Asset;
  return {
    id: entry.sys.id,
    title: fields.title as string,
    imageUrl: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
  };
};


export const fetchAllFinancialInfo = async (): Promise<FinancialInfo[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'financialInfo', // Contentful 모델의 API ID와 일치해야 합니다.
  });
  return response.items.map(parseContentfulFinancialInfo);
};

// History 데이터를 가져오는 함수 추가
export const fetchAllHistory = async (): Promise<HistoryYear[]> => {
    const entries = await contentfulClient.getEntries({
        // ✅ 'history'를 실제 API ID (예: 'historyList')로 수정합니다.
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

export const fetchAllGlobalLicenses = async (): Promise<GlobalLicense[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'globalLicense', // Contentful 모델의 API ID와 일치해야 합니다.
  });
  return response.items.map(parseContentfulGlobalLicense);
};
