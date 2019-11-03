import Controller from '../../shared/controller/Controller';
import { join } from 'path';
import FileMethods from './methods/FileMethods';
import ApiError from '../../error/ApiError';
import CustomResponse from '../../error/CustomError';

class FileController extends Controller {
  protected avatarFolder = join(this.fileFolder, 'avatar');

  async setAvatar() {
    const { file } = this.req.payload;
    if (!file) {
      return this.res(CustomResponse(400, 'There is no file.', { file: 'There is no file.' })).code(400);
    }
    const user = this.user;
    const response = await new FileMethods().updateAvatar(this.avatarFolder, user, file);

    return this.res(response).code(response.code);
  }

  async deleteAvatar() {
    const user = this.user;
    const response = await new FileMethods().deleteAvatar(this.avatarFolder, user);

    return this.res(response).code(response.code);
  }
}

export default FileController;
