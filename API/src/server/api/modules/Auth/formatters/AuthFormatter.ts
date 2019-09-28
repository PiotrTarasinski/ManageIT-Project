import ResponseFormatter from '../../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../../database/models/User';

type AuthResponseFormat = {
  id: string;
  email: string;
};

class AuthFormatter implements ResponseFormatter<UserInstance, AuthResponseFormat> {
  async format(user: UserInstance) {
    return {
        id: <string>user.id,
        email: user.email
    };
  }
}

export default AuthFormatter;
