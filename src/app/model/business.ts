import { BaseEntity } from './base-entity';

export interface Business extends BaseEntity {
    abn?: string;
    name: string;
    template?: string;
    supervisor?: string;
    address: string;
    fteNumber: string;
    additionalEmployees: string;
    isMentorAvailable: boolean;
    mentor: string;
    website: string;
    industry: string;
    description: string;
    startDate?: firebase.firestore.Timestamp;
    endDate?: firebase.firestore.Timestamp;
    supervisorRole: string;
    supervisorExperience: string;
    why: {
        completeProject: boolean;
        testStudent: boolean;
        gainIdeas: boolean;
        developMentors: boolean;
        other: string;
    };
    isSubmitted: boolean;
    submittedOn: Date;
}
