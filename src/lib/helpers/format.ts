import dayjs from 'dayjs';

export const serialize = (payload: any) => payload ? JSON.parse(JSON.stringify(payload)) : null;

export const slugify = (str: string) =>
{
    const split = str.toLowerCase().replace('?', '').split(' ');
    return split.join('-');
};

export const formatDate = (date: Date) =>
{
    return dayjs(date).format('MMM D, YYYY HH:mm');
};