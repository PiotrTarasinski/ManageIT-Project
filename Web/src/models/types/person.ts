import { userPermission } from 'models/enums/userPermission';

export interface IPerson {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  dateOfJoin?: Date;
  roles?: IRoleLabel[];
  permissions?: userPermission;
}

export interface IRoleLabel {
  id: string;
  name: string;
  color: string;
}
