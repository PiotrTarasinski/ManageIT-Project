const validators = {
  isValidEmail: (test: string) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(test)) return true;
    return false;
  },
  isLengthBetween: (test: string, minLength: number, maxLength: number) => {
    if (test.length < minLength || test.length > maxLength) return true;
    return false;
  },
  isContainLowercase: (test: string) => {
    if (/[a-z]/.test(test)) return true;
    return false;
  },
  isContainUppercase: (test: string) => {
    if (/[A-Z]/.test(test)) return true;
    return false;
  },
  isContainNumber: (test: string) => {
    if (/\d/.test(test)) return true;
    return false;
  },
  isContainSpecialCharacter: (test: string) => {
    if (/[\W]/.test(test)) return true;
    return false;
  },
};

export { validators };
