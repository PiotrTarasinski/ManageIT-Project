import { IPerson } from './person';

export interface ProjectsListData {
  id: string;
  name: string;
  createdAt: Date;
  lead: IPerson;
  state: ProjectState;
}

export type ProjectState = 'Completed' | 'In Development' | 'Planning' | 'Cancelled';
