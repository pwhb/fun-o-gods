export function getQuery(searchParams: URLSearchParams)
{
    const filter: any = {};
    for (let [key, value] of searchParams)
    {
        filter[key] = value;
    }

    delete filter.sort_by;

    if (!!filter.active)
    {
        filter.active = filter.active === 'true';
    }
    return filter;
}

export function getSort(searchParams: URLSearchParams)
{
    const params = searchParams.get("sort_by");
    if (!params)
    {
        return {};
    }
    const [sort_by, order] = params.split("_");
    const sort: any = {};
    if (sort_by)
    {
        sort[sort_by] = order === "asc" ? 1 : -1;
    }
    return sort;

}