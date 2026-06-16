export interface NewsEntry {
    date: string;
    title: string;
    content: string;
    images?: string[];
}

/** News entries grouped by year (keys are 4-digit year strings). */
export type NewsByYear = Record<string, NewsEntry[]>;
