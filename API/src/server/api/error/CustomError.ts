export interface CustomResponse {
  code: number;
  message: string;
  errors?: { [key: string]: string };
}

const CustomResponse = (code: number, message: string, errors?: { [key: string]: string }): CustomResponse => {
  if (errors) {
    return {
      code,
      message,
      errors
    };
  }
  return {
    code,
    message
  };
};

export default CustomResponse;
