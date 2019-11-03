import * as httpStatus from 'http-status';
import db from '../../../../database';
import ApiError from '../../../error/ApiError';
import { UserInstance } from '../../../../database/models/User';
import * as fs from 'fs';
import { join, extname } from 'path';
import CustomResponse from '../../../error/CustomError';
import { reject, resolve } from 'bluebird';

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

  async updateAvatar(avatarFolder: string, user: UserInstance, file: any) {
    if (!this.extArray.includes(extname(file.hapi.filename))) {
      return CustomResponse(400, 'Wrong file extension', { formError: 'Wrong file extension.' });
    }

    const filename = join(avatarFolder, `${user.id}.jpg`);

    return await this.writeFilePromise(filename, file._data)
      .then(async () => {
        if (user.id) {
          if (
            await db.User.update(
              {
                avatar: `/api/v1/file/avatar/${user.id}.jpg`
              },
              {
                where: {
                  id: user.id
                }
              }
            )
          ) {
            return CustomResponse(200, 'Avatar removed successfully.'); // OK
          }
          return CustomResponse(500, 'Error writning to database.', { formError: 'Internal server error.' }); // DATABASE ERR
        }
        return CustomResponse(500, "Couldn't fetch user info.", { formError: 'Internal server error.' }); // FETCH USER ERR
      })
      .catch(err => {
        return CustomResponse(500, err, { formError: 'Internal server error.' }); // FILE WRITE ERR
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
