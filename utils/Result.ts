
export class Result<T> {

    private constructor(
        private _ok: boolean,
        private _value: T | null = null,
        private _error: Error | null = null,
    ) {}

    public static ok<T>(value: T): Result<T> {
        return new Result<T>(true, value, null);
    }

    public static fail<T>(error: Error): Result<T> {
        return new Result<T>(false, null, error);
    }

    public unwrap(): T {
        if (this._error !== null)
            throw new Error('result is null');
        return this._value!;
    }

    public transform<Y>(): Result<Y> {
        if (this._ok)
            throw new Error('cannot transform ok result');
        return new Result<Y>(this._ok, null, this._error);
    }

    public get ok(): boolean {
        return this._ok;
    }

    public get value(): T {
        return this._value!;
    }

    public get error(): Error {
        return this._error!;
    }
}

export const ok = <T>(value: T): Result<T> => Result.ok(value);
export const fail = <T>(message: string): Result<T> => Result.fail(new Error(message));
