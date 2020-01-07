import ResponseFormatter from '../../shared/template/ResponseFormatter';
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
