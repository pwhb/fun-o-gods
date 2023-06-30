export async function fetchData(collection: string)
{
    const res = await fetch(`/api/v1/${collection}`);
    const data = await res.json();
    return data;
}