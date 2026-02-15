import * as z from 'zod'

export const searchValidation = z.object({
    keywords: z.array(z.object({
        keyword: z.string(),
        type: z.enum(["tex", "term"]),
        operator: z.enum(["AND", "OR", "NOT"]),
        inField: z.string()
    })),
    page: z.number()
})