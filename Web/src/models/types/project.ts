export interface ProjectLead {
  id: string;
  name: string;
  avatar?: string;
}

export interface ProjectsListData {
  id: string;
  name: string;
  createdAt: Date;
  lead: ProjectLead;
  state: ProjectState;
}

export type ProjectState = 'Completed' | 'In Development' | 'Planning' | 'Cancelled';
