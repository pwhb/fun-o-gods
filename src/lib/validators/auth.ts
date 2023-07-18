interface IAuthPayload
{
    username: FormDataEntryValue;
    password: FormDataEntryValue;
    confirmPassword?: FormDataEntryValue;
}

interface IChangePasswordPayload
{

    newPassword: FormDataEntryValue;
    confirmPassword: FormDataEntryValue;
}

export function validateLogin({ username, password }: IAuthPayload)
{
    let ok = true;
    const invalid = { username: '', password: '' };
    const previous = { username };
    if (!username)
    {
        ok = false;
        invalid.username = 'username cannot be empty';
    }
    if (!password)
    {
        ok = false;
        invalid.password = 'password cannot be empty';
    }

    return {
        ok: ok,
        invalid: invalid,
        previous: previous
    };
}

export function validateChangePassword({ newPassword, confirmPassword }: IChangePasswordPayload)
{
    let ok = true;
    const invalid = { newPassword: '', confirmPassword: '', password: "" };
    const previous = { newPassword };
    if (!newPassword)
    {
        ok = false;
        invalid.newPassword = 'password cannot be empty';
    }
    if (!confirmPassword)
    {
        ok = false;
        invalid.confirmPassword = 'password cannot be empty';
    }
    if (newPassword !== confirmPassword)
    {
        ok = false;
        invalid.confirmPassword = 'passwords do not match';
    }

    return {
        ok: ok,
        invalid: invalid,
        previous: previous
    };
}

export function validateRegister({ username, password, confirmPassword }: IAuthPayload)
{
    let ok = true;
    const invalid = { username: '', password: '' };
    const previous = { username };
    if (!username)
    {
        ok = false;
        invalid.username = 'username cannot be empty';
    }
    if (!password)
    {
        ok = false;
        invalid.password = 'password cannot be empty';
    }
    if (password !== confirmPassword)
    {
        ok = false;
        invalid.password = 'passwords do not match';
    }

    return {
        ok: ok,
        invalid: invalid,
        previous: previous
    };
}

