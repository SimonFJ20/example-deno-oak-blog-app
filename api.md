
# API

## In general

Failable responses have an `ok: boolean` field, that can be checked reliably.

## Users

### Register

```
/api/users/register
```

#### Request

Username and email must be unique from any other registered user.
Paswords must match.

```ts
{
    email: string,
    username: string,
    password1st: string,
    password2nd: string,
}
```

#### Response OK

```ts
{
    ok: true,
    user: {
        id: number,
        email: string,
        username: string,
        passwordHash: string,
    },
}
```

#### Response BadRequest

```ts
{
    ok: false,
    error: 'email must be specified'
        | 'username must be specified'
        | 'passwords must be specified'
        | 'passwords must match'
        | 'email must be valid'
        | 'email must be unique'
        | 'username must be unique'
        | string,
}
```
