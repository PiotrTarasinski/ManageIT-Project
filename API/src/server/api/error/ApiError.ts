import * as Boom from 'boom';
import * as _ from 'lodash';
import { logger } from '../../../utils';

class ApiError {
  public static boom(error: Error | null, options: { statusCode?: number, message?: string }): Boom.BoomError {

    if (error) {
      logger.warn('Warning: an API Error occurred:', error.message, error.stack);
    }

    switch (options.statusCode) {
      case 400:
        return Boom.badRequest(options.message || 'Bad request.');
      case 401:
        return Boom.unauthorized(options.message || 'Unauthorized.');
      case 403:
        return Boom.forbidden(options.message || 'Forbidden action.');
      case 404:
        return Boom.notFound(options.message || 'Data not found.');
      case 412:
        return Boom.preconditionFailed(options.message || 'Precondition failed.');
      case 422:
        return Boom.badData(options.message || 'Invalid data provided.');
      case 500:
        return Boom.boomify(error || new Error());
      case 502:
        return Boom.badGateway(options.message || 'Bad gateway.');
      default:
        return Boom.badImplementation(options.message || '');
    }
  }

  public static fallbackError(e: any): Boom.BoomError {

    let message = _.get(e, 'output.payload.message');

    if (!message) {
      message = _.get(e, 'output.message', e.message);
    }

    return ApiError.boom(e, {
      message,
      statusCode: e.output ? e.output.statusCode : e.statusCode
    });
  }
}

export default ApiError;
