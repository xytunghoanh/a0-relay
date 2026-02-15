import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { searchValidation } from "./schemas";

const app = new Hono<{ Bindings: Env }>();

app.get("/search/", zValidator("json", searchValidation), (c) => {
    return c.json({})
});

export default app;
