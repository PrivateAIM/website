export interface ReferenceLink {
    label: string;
    url: string;
}

export interface ReferenceTalk {
    /** Localized display date, e.g. 'Nov 2021' / 'Nov. 2021'. */
    date: string;
    title: string;
    venue: string;
    link: string;
}

export interface ReferenceSection {
    title: string;
    /** Markdown, rendered with marked. */
    body: string;
}

export interface ReferencePublication {
    authors: string;
    title: string;
    citation: string;
    year: number;
    link: string;
}

export interface ReferenceProjectContent {
    /** Display name, e.g. 'Personal Health Train (PHT)'. */
    name: string;
    /** One sentence shown under the title. */
    tagline: string;
    /** Markdown: how the project lives on in FLAME / PrivateAIM. */
    successorNote: string;
    sections: ReferenceSection[];
    talks: ReferenceTalk[];
    /** Archived code, docs, manifesto etc. */
    links: ReferenceLink[];
}

export interface ReferenceProject {
    /** URL slug, rendered at /references/<slug>. */
    slug: string;
    /** Optional activity period, only if supported by sources. */
    period?: string;
    /** Localized content keyed by locale ('en', 'de'). */
    content: Record<string, ReferenceProjectContent>;
    /** Locale-independent publication list. */
    publications: ReferencePublication[];
}
