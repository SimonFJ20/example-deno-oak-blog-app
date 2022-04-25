// deno-lint-ignore-file require-await
import { User, UserId } from "../users/User.ts";
import { fail, ok, Result } from "../utils/Result.ts";
import { Database } from "./Database.ts";

export class MemoryDB implements Database {

    private nextUserId = 0;
    private users: User[] = [];

    public async uniqeUserId(): Promise<Result<UserId>> {
        return ok(this.nextUserId++);
    }

    public async isUserEmailUnique(email: string): Promise<Result<boolean>> {
        return ok(this.users.find(u => u.email === email) === undefined);
    }

    public async isUserUsernameUnique(username: string): Promise<Result<boolean>> {
        return ok(this.users.find(u => u.username === username) === undefined);
    }

    public async user(id: UserId): Promise<Result<User>> {
        const r = this.users.find(u => u.id === id);
        if (r === undefined)
            return fail('user with id not found');
        return ok(r);
    }

    public async userWithUsername(username: string): Promise<Result<User>> {
        const r = this.users.find(u => u.username === username);
        if (r === undefined)
            return fail('user with id not found');
        return ok(r);
    }

    public async insertUser(user: User): Promise<Result<null>> {
        this.users.push(user);
        return ok(null);
    }

}
