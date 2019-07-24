import { Student } from './student';
import { UserShort } from './user-short';

export interface UserProfile extends UserShort {
    id?: string;
    fcmToken?: string;
    authName: string;
    email: string;
    authEmail: string;
    photoURL: string;
    roles: Roles;
    student?: Student;
}

interface Roles {
    isAdmin?: boolean;
    isStudent?: boolean;
    isBusiness?: boolean;
}
