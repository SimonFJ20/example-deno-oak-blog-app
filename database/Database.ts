import { User, UserId } from "../users/User.ts";
import { Result } from "../utils/Result.ts";

export interface Database {
    uniqeUserId(): Promise<Result<UserId>>
    isUserEmailUnique(email: string): Promise<Result<boolean>>
    isUserUsernameUnique(username: string): Promise<Result<boolean>>
    user(id: UserId): Promise<Result<User>>
    userWithUsername(username: string): Promise<Result<User>>
    insertUser(user: User): Promise<Result<null>>
}

