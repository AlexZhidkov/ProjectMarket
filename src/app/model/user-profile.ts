import { Student } from './student';
import { UserShort } from './user-short';

export interface UserProfile extends UserShort {
    id?: string;
    fcmToken?: string;
    authName: string;
    email: string;
    authEmail: string;
    photoURL: string;
    role: 'student' | 'business' | 'referrer' | 'admin';
    student?: Student;
    isFormSubmitted: boolean;
    formSubmittedOn?: Date;
}
