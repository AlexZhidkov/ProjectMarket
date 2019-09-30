import { NamedEntity } from './named-entity';

export interface Project extends NamedEntity {
    description: string;
    status: string;
    business: NamedEntity;
    student: NamedEntity;
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
