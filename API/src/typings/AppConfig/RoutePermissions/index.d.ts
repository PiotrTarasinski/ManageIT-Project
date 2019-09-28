import { ApiRequest } from '../../Hapi';

export type DynamicPermissionValidation = ((request: ApiRequest) => Promise<boolean>);

type CrudPermissions = {
  view?: boolean | DynamicPermissionValidation;
  create?: boolean | DynamicPermissionValidation;
  edit?: boolean | DynamicPermissionValidation;
  delete?: boolean | DynamicPermissionValidation;
};

export type RoutePermissions = {
  notes: CrudPermissions;
};
