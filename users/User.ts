
export type UserId = number;

export type User = {
    id: UserId,
    username: string,
    passwordHash: string,
    email: string,
};
