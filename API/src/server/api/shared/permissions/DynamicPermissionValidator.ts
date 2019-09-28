import { ApiRequest } from '../../../../typings/Hapi';

interface DynamicPermissionValidator {
  validate(request: ApiRequest): boolean | Promise<boolean>;
}

export default DynamicPermissionValidator;
