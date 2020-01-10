import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { RoleLabelInstance } from '../../../database/models/RoleLabel';

export type RoleLabelResponseFormat = {
  id: string;
  name: string;
  color: string;
};

class RoleLabelFormatter implements ResponseFormatter<RoleLabelInstance, RoleLabelResponseFormat> {
  async format(role: RoleLabelInstance) {
    const { id, name, color }: RoleLabelInstance = role;
    return {
      id: <string>id,
      name,
      color
    };
  }
}

export default RoleLabelFormatter;
