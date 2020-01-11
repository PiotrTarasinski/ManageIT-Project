import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { BacklogInstance } from '../../../database/models/Backlog';
import bulkFormat from '../../../../utils/bulkFormat';
import BacklogFormatter, { BacklogResponseFormat } from './BacklogFormatter';

export type BacklogsResponseFormat = {
  logs: BacklogResponseFormat[];
};

class BacklogsFormatter implements ResponseFormatter<BacklogInstance[], BacklogsResponseFormat> {
  async format(backlogs: BacklogInstance[]) {
    return {
      logs: await bulkFormat(new BacklogFormatter(), backlogs)
    };
  }
}

export default BacklogsFormatter;
