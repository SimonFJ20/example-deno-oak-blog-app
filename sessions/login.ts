import { Database } from "../database/Database.ts";
import { Result, ok, fail } from "../utils/Result.ts";
import { Session } from "./Session.ts";

export type LoginRequest = {
    username: string,
    password: string,
};

export const login = async (req: LoginRequest, db: Database): Promise<Result<Session>> => {
    if (req.username === '')
        return fail('username must be specified');
    const findUserRes = await db.userWithUsername(req.username);
    if (!findUserRes.ok)
        return fail('unknown user');
    return fail('not implemented');
}
