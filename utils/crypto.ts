import { hash, compare } from '../deps.ts'

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password);
}

export const comparePasswordHash = async (password: string, hash: string): Promise<boolean> => {
    return await compare(password, hash);
}
