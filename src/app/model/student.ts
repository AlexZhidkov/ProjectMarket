import { BaseEntity } from './base-entity';

export interface Student extends BaseEntity {
    template: string;
    studyArea: string;
    isStudying: boolean;
    university: string;
    year: string;
    course: string;
    interests: string;
    why: string;
    resumeUrl: string;
    transcriptUrl: string;
}
