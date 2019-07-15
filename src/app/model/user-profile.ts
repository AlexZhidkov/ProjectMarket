import { UserShort } from './user-short';

export interface UserProfile extends UserShort {
    fcmToken?: string;
    email: string;
    photoURL: string;
    roles: Roles;
}

interface Roles {
    isAdmin?: boolean;
    isStudent?: boolean;
    isBusiness?: boolean;
}
