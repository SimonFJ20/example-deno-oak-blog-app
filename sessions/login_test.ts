import { MemoryDB } from "../database/MemoryDB.ts"
import { assertEquals } from "../deps.ts";
import { login, LoginRequest } from "./login.ts";

const validLoginRequest = (): LoginRequest => ({
    username: 'testuser',
    password: 'password1234',
});

Deno.test('should fail if no username is specified', async () => {
    const db = new MemoryDB();
    const res = await login({
        ...validLoginRequest(),
        username: '',
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'username must be specified');
});

Deno.test("should fail if user doesn't exist", async () => {
    const db = new MemoryDB();
    const res = await login(validLoginRequest(), db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'unknown user');
});
