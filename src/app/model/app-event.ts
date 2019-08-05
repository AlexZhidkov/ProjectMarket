import { UserShort } from './user-short';

export interface AppEvent {
    id?: string;
    title: string;
    data: any;
    created: Date;
    user: UserShort;
}
