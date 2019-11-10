import { UserInstance } from '../../../database/models/User';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import UserFormatter, { UserResponseFormat } from '../formatter/UserFormatter';

export class Token {
  async generateTokenForUserInstance(user: UserInstance) {
    const privateKey = await new Promise((resolve, reject) => {
      fs.readFile('src/server/key/cert_priv.pub', 'UTF-8', (err, content) => {
        if (err) {
          reject(err);
        }
        resolve(content);
      });
    });

    const signed = jwt.sign(await new UserFormatter().format(user), privateKey as string, { algorithm: 'RS256', noTimestamp: true });

    return signed;
  }
}

export default Token;
