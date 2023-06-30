export const cookieOptions = {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 1 day
};