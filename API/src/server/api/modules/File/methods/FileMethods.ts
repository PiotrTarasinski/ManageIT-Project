import db from '../../../../database';
import { UserInstance } from '../../../../database/models/User';
import * as fs from 'fs';
import { join, extname } from 'path';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import Token from '../../../shared/token/Token';

interface FileResponse {
  response: CustomResponseType;
  accessToken?: string;
}

class FileMethods {
  public extArray = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'];

  writeFilePromise = (file: string, data: Buffer) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if (err) {
          reject(err);
        }
        resolve({ message: 'File created successfully.' });
      });
    });
  }

  unlinkFilePromise = (file: string) => {
    return new Promise((resolve, reject) => {
      fs.unlink(file, err => {
        if (err) {
          reject(err);
        }
        resolve({ message: 'File removed successfully.' });
      });
    });
  }

  async updateAvatar(avatarFolder: string, user: UserInstance, file: any): Promise<FileResponse> {
    if (!this.extArray.includes(extname(file.hapi.filename))) {
      return {
        response: CustomResponse(400, 'Wrong file extension', { formError: 'Wrong file extension.' })
      };
    }

    const filename = join(avatarFolder, `${user.id}.jpg`);

    return await this.writeFilePromise(filename, file._data)
      .then(async () => {
        if (user.id) {
          const updated = await db.User.update(
            {
              avatar: `/api/v1/file/avatar/${user.id}.jpg`
            },
            {
              where: {
                id: user.id
              },
              returning: true
            }
          );
          if (updated[0]) {
            const token = await new Token().generateTokenForUserInstance(updated[1][0]);
            return {
              response: CustomResponse(200, 'Avatar changed successfully.'),
              accessToken: token
            }; // OK
          }
          return {
            response: CustomResponse(500, 'Error writning to database.', { formError: 'Internal server error.' })
          };
        }
        return {
          response: CustomResponse(500, "Couldn't fetch user info.", { formError: 'Internal server error.' })
        };
      })
      .catch(err => {
        return {
          response: CustomResponse(500, err, { formError: 'Internal server error.' })
        };
      });
  }

  async deleteAvatar(avatarFolder: string, user: UserInstance) {
    const filename = join(avatarFolder, `${user.id}.jpg`);

    return await this.unlinkFilePromise(filename)
      .then(async () => {
        if (user.id) {
          if (
            db.User.update(
              {
                avatar: null
              },
              {
                where: {
                  id: user.id
                }
              }
            )
          ) {
            return CustomResponse(200, 'Avatar changed successfully.'); // OK
          }
          return CustomResponse(500, 'Error writning to database.', { formError: 'Internal server error.' }); // DATABASE ERR
        }
        return CustomResponse(500, "Couldn't fetch user info.", { formError: 'Internal server error.' }); // FETCH USER ERR
      })
      .catch(err => {
        return CustomResponse(500, err, { formError: 'Internal server error.' }); // FILE REMOVAL ERR
      });
  }
}

export default FileMethods;
