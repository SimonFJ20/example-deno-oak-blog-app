import { Database } from "../database/Database.ts";
import { Router, Status } from "../deps.ts";
import { registerUser } from "../users/register.ts";
import { bodyOrHandleError } from "./utils.ts";

export const setUsersRoutes = (router: Router, db: Database) => {

    router.post('/api/users/register', async (ctx) => {
        const bodyRes = await bodyOrHandleError(ctx);
        if (!bodyRes.ok)
            return;
        const body = bodyRes.unwrap();
        const [
            email,
            username,
            password1st,
            password2nd,
        ] = await body.value;
        const res = await registerUser({
            email,
            username,
            password1st,
            password2nd,
        }, db);
        if (!res.ok) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body =  {ok: false, error: res.error.message};
        }
        ctx.response.status = Status.OK;
        ctx.response.body = {ok: true, user: res.value};
    });

}


