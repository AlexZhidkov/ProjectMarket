import { BaseEntity } from './base-entity';
import { UserShort } from './user-short';

export interface AppEvent extends BaseEntity {
    title: string;
    data: any;
    user: UserShort;
    student?: UserShort;
    business?: UserShort;
    referrer?: UserShort;
    university?: UserShort;
}
