import z from "zod";
import { SearchdParams } from "./a0";
import { searchValidation } from "./schemas";

const replaceInterrogation = (str: string): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const available = alphabet.filter(c => !str.includes(c));
    if (available.length === 0) available.push("x");

    for (const letter of available) {
        const idx = str.indexOf("?");
        if (idx === -1) break;

        str =
            str.slice(0, idx) +
            `\\qvar{${letter}}` +
            str.slice(idx + 1);
    }

    return str;
};

const normalizeKeyword = (
    keyword: string,
    type: "tex" | "term"
): string => {
    if (type === "tex") {
        const trimmed = keyword.replace(/^\$+|\$+$/g, "");
        return replaceInterrogation(trimmed);
    }

    return keyword.trim();
};


export const parseForSearchD = (body: z.infer<typeof searchValidation>): SearchdParams => {
    const { keywords, page } = body
    return {
        ip: "0.0.0.0",
        page,
        geo: [{ city: "", country: "", region: "" }],
        kw: keywords.map(({ type, operator, inField, keyword }) => ({ str: normalizeKeyword(keyword, type), type, op: operator, field: inField }))
    };
}