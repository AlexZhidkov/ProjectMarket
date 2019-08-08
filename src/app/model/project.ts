import { NamedEntity } from './named-entity';

export interface Project extends NamedEntity {
    business: NamedEntity;
    student: NamedEntity;
}
