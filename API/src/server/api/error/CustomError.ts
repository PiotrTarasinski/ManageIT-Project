export interface CustomResponseType {
  statusCode: number;
  message: string;
  errors?: { [key: string]: string };
  accessToken?: string;
}

const CustomResponse = (statusCode: number, message: string, errors?: { [key: string]: string }, accessToken?: string): CustomResponseType => {
  if (errors) {
    return {
      statusCode,
      message,
      errors
    };
  }
  return {
    statusCode,
    message
  };
};

export default CustomResponse;
