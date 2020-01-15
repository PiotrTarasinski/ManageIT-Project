import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserProjectLabelInstance } from '../../../database/models/UserProjectLabel';
import { RoleLabelInstance } from '../../../database/models/RoleLabel';

export type UserProjectLabelResponseFormat = {
  id: string;
  name: string;
  color: string;
};

class UserProjectLabelFormatter implements ResponseFormatter<UserProjectLabelInstance, UserProjectLabelResponseFormat> {
  async format(userProjectLabel: UserProjectLabelInstance) {
    const { id, name, color }: RoleLabelInstance = <RoleLabelInstance>userProjectLabel.roleLabel;
    return {
      id: <string>id,
      name,
      color
    };
  }
}

export default UserProjectLabelFormatter;
