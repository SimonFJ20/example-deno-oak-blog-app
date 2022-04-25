import { Database } from "../database/Database.ts";
import { Application, Router } from "../deps.ts";
import { setUsersRoutes } from "./users.ts";

export const runWebServer = async (db: Database) => {
    const app = new Application();

    const router = new Router();
    setUsersRoutes(router, db);
    
    router.get('/', async (ctx) => {
        await ctx.send({
            root: `${Deno.cwd()}/public`,
            index: "index.html",
        });
    })

    router.get('/:path', async (ctx) => {
        await ctx.send({
            root: `${Deno.cwd()}/public`,
            index: "index.html",
            path: ctx.params.path ?? undefined,
        });
    })

    app.use(router.routes());
    app.use(router.allowedMethods());
    
    app.addEventListener('listen', () => console.log(`Listening on http://localhost:8000/`));
    return await app.listen({ port: 8000 });
}
