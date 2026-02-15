export interface SearchdParams {
    ip: string,
    page: number,
    geo: {
        city: string;
        region: string;
        country: string;
    }[],
    kw: Keyword[]
}

interface Keyword {
    type: "unknown" | "tex" | "term",
    op: "OR" | "AND" | "NOT",
    field: string,
    str: string
}