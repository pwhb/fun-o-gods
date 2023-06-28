import type { ObjectId } from "mongodb";

export interface IUpload
{
    _id: ObjectId,
    Key: string;
    createdAt: Date;
    updatedAt: Date;
}