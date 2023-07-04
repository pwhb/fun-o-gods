import type { ObjectId } from "mongodb";
import type { IUser } from "./user";

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

export interface IGenreForm
{
    _id?: ObjectId,
    label: string;
    value: string;
    description: string;
    active: boolean;
}

export interface IConfigForm
{
    _id?: ObjectId,
    name: string;
    config: any;
}

export interface IEntityForm extends IConfigForm
{
    icon: string;
}

export interface IStoryForm
{
    _id?: ObjectId,
    title: string;
    creator?: IUser;
    editors?: [ObjectId?];
    genres?: any;
    heroImage?: string;
    description?: string;
    root?: string;
    published: boolean;
    active: boolean;
}

export interface ISceneForm
{
    _id?: ObjectId,
    title: string;
    story?: string;
    creator?: IUser;
    editors?: [ObjectId?];
    heroImage?: string;
    body?: string;
    endpoints?: [ObjectId?];
    published: boolean;
    active: boolean;
}



