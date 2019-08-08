import { UserShort } from './user-short';

export interface BaseEntity {
    id?: string;
    createdOn?: Date;
    modifiedOn?: Date;
    createdBy?: UserShort;
}
