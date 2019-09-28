import * as _ from 'lodash';
import * as Hapi from '@hapi/hapi';
import { UserInstance } from '../../../database/models/User';
import { SessionTokenInstance } from '../../../database/models/SessionToken';

type FindingQuery = {
  where: any;
  include: any[];
};

export type SearchParams = {
  limit: number;
  offset: number;
  order?: any;
  where?: any;
  include?: any[];
};

class Controller {

  public user: UserInstance;
  public req: Hapi.Request & { payload: any };

  protected res: (value?: Hapi.ResponseValue) => Hapi.ResponseObject;
  protected token: SessionTokenInstance;

  constructor(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    this.req = req;
    this.res = (value?: any) => res.response(value);

    this.user = _.get(req, 'auth.credentials.user', {});
    this.token = _.get(req, 'auth.credentials.token', {});

  }
}

export default Controller;
