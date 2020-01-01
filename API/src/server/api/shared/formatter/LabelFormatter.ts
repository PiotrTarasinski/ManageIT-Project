import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { SprintInstance } from '../../../database/models/Sprint';
import { SprintEntryAttributes, SprintEntryInstance } from '../../../database/models/SprintEntry';
import bulkFormat from '../../../../utils/bulkFormat';
import SprintEntriesFormatter, { SprintEntriesResponseFormat } from './SprintEntriesFormatter';
import { LabelInstance } from '../../../database/models/Label';

export type LabelResponseFormat = {
  id: string;
  name: string;
  color: string;
};

class LabelFormatter implements ResponseFormatter<LabelInstance, LabelResponseFormat> {
  async format(label: LabelInstance) {
    return {
      id: <string>label.id,
      name: label.name,
      color: label.color
    };
  }
}

export default LabelFormatter;
