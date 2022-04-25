import { BodyJson, RouteParams, RouterContext, State, Status } from "../deps.ts";
import { ok, fail, Result } from "../utils/Result.ts";

export const bodyOrHandleError = async <
    R extends string,
    P extends RouteParams<R> = RouteParams<R>,
    S extends State = Record<string, unknown>
>(ctx: RouterContext<R, P, S>): Promise<Result<BodyJson>> => {
    if (!ctx.request.hasBody) {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = 'invalid request, no body';
        return fail('invalid request, no body');
    }
    const body = ctx.request.body();
    if (body.type !== 'json') {
        ctx.response.status = Status.BadRequest;
        ctx.response.type = 'json';
        ctx.response.body = 'invalid request, incorrect body type';
        return fail('invalid request, incorrect body type');
    }
    return ok(await body.value);
}
