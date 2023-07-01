import type { ObjectId } from "mongodb";

export interface IUserForm
{
    _id?: ObjectId,
    username: string;
    role: string;
    active: boolean;
}

export interface IRoleForm
{
    _id?: ObjectId,
    name: string;
    level: number;
    active: boolean;
}

export interface IConfigForm
{
    _id?: ObjectId,
    name: string;
    config: any;
}