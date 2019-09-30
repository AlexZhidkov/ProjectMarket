import { NamedEntity } from './named-entity';
import { UserShort } from './user-short';

export interface Project extends NamedEntity {
    description: string;
    status: string;
    business: UserShort;
    student: UserShort;
    referrer?: UserShort;
    events: ProjectEvent[];
    isStudentAccepted: boolean;
    isBusinessAccepted: boolean;
    isDocumentationCompleted: boolean;
    isProjectStarted: boolean;
    isProjectFinished: boolean;
}

export interface ProjectEvent {
    title: string;
    createdOn: Date;
}
