const validators = {
  isValidEmail: (test: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(test);
  },
  isLengthBetween: (test: string, minLength: number, maxLength: number) => {
    return test.length < minLength || test.length > maxLength;
  },
  isContainLowercase: (test: string) => {
    return /[a-z]/.test(test);
  },
  isContainUppercase: (test: string) => {
    return /[A-Z]/.test(test);
  },
  isContainNumber: (test: string) => {
    return /\d/.test(test);
  },
  isContainSpecialCharacter: (test: string) => {
    return /[\W]/.test(test);
  },
};

export { validators };
