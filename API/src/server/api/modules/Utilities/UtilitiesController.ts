import Controller from '../../shared/controller/Controller';
import { app } from '../../../../config';

class UtilitiesController extends Controller {

  getVersion() {
    const { version } = app;

    return this.res(version);
  }
}

export default UtilitiesController;
