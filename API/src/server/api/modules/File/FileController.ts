import Controller from '../../shared/controller/Controller';
import { join } from 'path';
import FileMethods from './methods/FileMethods';
import CustomResponse from '../../error/CustomError';

class FileController extends Controller {
  protected avatarFolder = join(this.fileFolder, 'avatar');

  async setAvatar() {
    const { file } = this.req.payload;
    console.log(file);
    if (!file) {
      return this.res(CustomResponse(400, 'There is no file.', { file: 'There is no file.' })).code(400);
    }
    const user = this.user;

    const fileResponse = await new FileMethods().updateAvatar(this.avatarFolder, user, file);

    if (fileResponse.response.statusCode === 200) {
      return this.res(fileResponse.response).code(fileResponse.response.statusCode).header('access_token', fileResponse.accessToken as string);
    }

    return this.res(fileResponse.response).code(fileResponse.response.statusCode);
  }

  async deleteAvatar() {
    const user = this.user;

    const fileResponse = await new FileMethods().deleteAvatar(this.avatarFolder, user);

    if (fileResponse.response.statusCode === 200) {
      return this.res(fileResponse.response).code(fileResponse.response.statusCode).header('access_token', fileResponse.accessToken as string);
    }

    return this.res(fileResponse.response).code(fileResponse.response.statusCode);
  }
}

export default FileController;
