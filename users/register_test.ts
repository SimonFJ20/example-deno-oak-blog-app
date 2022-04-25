import { MemoryDB } from "../database/MemoryDB.ts"
import { registerUser, RegisterUserRequest } from "./register.ts";
import { hashPassword, comparePasswordHash } from "../utils/crypto.ts"
import { assertEquals, assertNotEquals, assert } from "../deps.ts"

const validCreateUserRequest = (): RegisterUserRequest => ({
    email: 'testuser@mail.com',
    username: 'testuser',
    password1st: 'password1234',
    password2nd: 'password1234'
});

Deno.test("should fail if no email is specified", async () => {
    const db = new MemoryDB();
    const res = await registerUser({
        ...validCreateUserRequest(),
        email: ''
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'email must be specified');
});

Deno.test("should fail if no username is specified", async () => {
    const db = new MemoryDB();
    const res = await registerUser({
        ...validCreateUserRequest(),
        username: ''
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'username must be specified');
});

Deno.test("should fail if no passwords are specified", async () => {
    const db = new MemoryDB();
    const res = await registerUser({
        ...validCreateUserRequest(),
        password1st: '',
        password2nd: '',
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'passwords must be specified');
});

Deno.test("should fail if passwords doesn't match", async () => {
    const db = new MemoryDB();
    const res = await registerUser({
        ...validCreateUserRequest(),
        password1st: 'first',
        password2nd: 'second'
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'passwords must match');
});

Deno.test('should fail if mail is syntatically invalid', async () => {
    const db = new MemoryDB();
    const res = await registerUser({
        ...validCreateUserRequest(),
        email: 'nonvalidemail',
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'email must be valid');
});

Deno.test('should fail if email is not unique', async () => {
    const db = new MemoryDB();
    await db.insertUser({
        id: (await db.uniqeUserId()).unwrap(),
        email: 'testuser@mail.com',
        username: 'testuser',
        passwordHash: 'password1234',
    })
    const res = await registerUser({
        email: 'testuser@mail.com',
        username: 'testuser1',
        password1st: 'password1234',
        password2nd: 'password1234'
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'email must be unique');
});

Deno.test('should fail if username is not unique', async () => {
    const db = new MemoryDB();
    await db.insertUser({
        id: (await db.uniqeUserId()).unwrap(),
        email: 'testuser@mail.com',
        username: 'testuser',
        passwordHash: await hashPassword('password1234'),
    })
    const res = await registerUser({
        email: 'testuser1@mail.com',
        username: 'testuser',
        password1st: 'password1234',
        password2nd: 'password1234'
    }, db);
    assertEquals(res.ok, false);
    assertEquals(res.error.message, 'username must be unique');
});

Deno.test('should fail if user is not in database', async () => {
    const db = new MemoryDB();
    const createUserRes = await registerUser(validCreateUserRequest(), db);
    const findUserRes = await db.user(createUserRes.unwrap().id);
    assertEquals(findUserRes.ok, true);
    assertEquals(createUserRes.unwrap().username, findUserRes.value.username);
});

Deno.test('should fail if password in db is not hashed', async () => {
    const db = new MemoryDB();
    const createUserReq = validCreateUserRequest();
    const createUserRes = await registerUser(createUserReq, db);
    const findUserRes = await db.user(createUserRes.unwrap().id);
    assertNotEquals(createUserReq.password1st, findUserRes.value.passwordHash);
    assert(await comparePasswordHash(createUserReq.password1st, findUserRes.value.passwordHash));
});
