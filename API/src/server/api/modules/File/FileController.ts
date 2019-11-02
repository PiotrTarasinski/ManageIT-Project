import Controller from '../../shared/controller/Controller';
import { join } from 'path';
import FileMethods from './methods/FileMethods';
import ApiError from '../../error/ApiError';

class FileController extends Controller {
  protected avatarFolder = join(this.fileFolder, 'avatar');

  async setAvatar() {
    const { file } = this.req.payload;
    const user = this.user;
    if (await new FileMethods().updateAvatar(this.avatarFolder, user, file)) {
      return this.res({ message: 'Avatar changed successfully.' });
    }
    throw ApiError.boom(null, { message: 'Unknown server error.', statusCode: httpStatus.INTERNAL_SERVER_ERROR });
  }

  async deleteAvatar() {
    const user = this.user;
    if (await new FileMethods().deleteAvatar(this.avatarFolder, user)) {
      return this.res({ message: 'Avatar removed successfully.' });
    }
    throw ApiError.boom(null, { message: 'Unknown server error.', statusCode: httpStatus.INTERNAL_SERVER_ERROR });
  }
}

export default FileController;
