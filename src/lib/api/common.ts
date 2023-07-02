export async function fetchData(collection: string)
{
    const res = await fetch(`/api/v1/${collection}`);
    const data = await res.json();
    return data;
}

export async function upload(file: File)
{
    try
    {
        const formData = new FormData();
        formData.append('file', file);
        const url = '/api/v1/uploads';
        const res = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        return data;
    } catch (err)
    {
        console.error(err);
        return null;

    }
}