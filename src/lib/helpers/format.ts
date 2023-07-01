import dayjs from 'dayjs';

export const serialize = (payload: any) => payload ? JSON.parse(JSON.stringify(payload)) : null;

export const formatDate = (date: Date) =>
{
    return dayjs(date).format('DD/MM/YYYY');
};