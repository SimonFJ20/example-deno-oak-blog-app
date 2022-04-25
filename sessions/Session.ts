import { UserId } from "../users/User.ts";

export type SessionId = number;

export type Session = {
    id: SessionId,
    user: UserId,
    token: string,
};
