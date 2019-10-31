import * as httpStatus from 'http-status';
import db from '../../../../database';
import ApiError from '../../../error/ApiError';
import { UserInstance } from '../../../../database/models/User';
import * as fs from 'fs';
import { reject, resolve } from 'bluebird';
import { join, extname } from 'path';

class FileMethods {
  public extArray = ['.png', '.jpg', '.jpeg'];

  async updateAvatar(avatarFolder: string, user: UserInstance, file: any) {
    if (!user.id) {
      throw ApiError.boom(null, { message: 'Unknown server error.', statusCode: httpStatus.INTERNAL_SERVER_ERROR });
    }

    if (!this.extArray.includes(extname(file.hapi.filename))) {
      throw ApiError.boom(null, { message: 'Wrong file extension.', statusCode: httpStatus.BAD_REQUEST });
    }

    const filename = join(avatarFolder, `${user.id}.jpg`);

    fs.writeFile(filename, file._data, err => {
      if (err) {
        reject(err);
      }
      resolve({ message: 'File saved successfully.' });
    });

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
      return true;
    }
    return false;
  }

  async deleteAvatar(avatarFolder: string, user: UserInstance) {
    if (!user.id) {
      throw ApiError.boom(null, { message: 'Unknown server error.', statusCode: httpStatus.INTERNAL_SERVER_ERROR });
    }
    fs.unlink(join(avatarFolder, `${user.id}.jpg`), err => {
      if (err) {
        reject(err);
      }
      resolve({ message: 'File removed successfully' });
    });
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
      return true;
    }
    return false;
  }
}

export default FileMethods;
