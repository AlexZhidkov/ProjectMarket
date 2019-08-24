import { NamedEntity } from './named-entity';

export interface Project extends NamedEntity {
    description: string;
    status: string;
    business: NamedEntity;
    student: NamedEntity;
}
