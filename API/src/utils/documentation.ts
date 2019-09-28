import { env } from '../config';

export default function documentation(type: 'private' | 'public', tagName: string) {

  if (env.NODE_ENV === 'development' || type === 'public') {
    return ['api', tagName];
  }

  return [];
}
