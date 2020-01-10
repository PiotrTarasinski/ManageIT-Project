
export const Validator = {
  errorMessage(key: string, message: string) {
    return { key, message };
  },

  isEmail(toTest: string, key: string): { key: string; message: string } | null {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(toTest)) {
      return this.errorMessage(key, 'email is invalid.');
    }
    return null;
  },

  isString(toTest: string, key: string): { key: string; message: string } | null {
    if (typeof toTest !== 'string') {
      return this.errorMessage(key, `${key} must be a string.`);
    }
    return null;
  },

  isNumber(toTest: number | string, key: string): { key: string; message: string } | null {
    if (typeof toTest !== 'number') {
      if (/^[0-9]+$/.test(toTest)) {
        return null;
      }
      return this.errorMessage(key, `${key} must be a number.`);
    }
    return null;
  },

  includes(toTest: string, key: string, array: string[]): { key: string; message: string } | null {
    if (!array.includes(toTest)) {
      return this.errorMessage(key, `${key} must be in enum.`);
    }
    return null;
  },

  lengthMin(toTest: string, key: string, value: number): { key: string; message: string } | null {
    if (toTest) {
      if (toTest.length < value) {
        return this.errorMessage(key, `${key} min length is ${value} characters.`);
      }
    }
    return null;
  },

  lengthMax(toTest: string, key: string, value: number): { key: string; message: string } | null {
    if (toTest) {
      if (toTest.length > value) {
        return this.errorMessage(key, `${key} max length is ${value} characters.`);
      }
    }
    return null;
  },

  required(toTest: any, key: string): { key: string; message: string } | null {
    if (!toTest && toTest !== 0) {
      return this.errorMessage(key, `${key} is required.`);
    }
    return null;
  },

  containsLowercase(toTest: string, key: string): { key: string; message: string } | null {
    if (!/[a-z]/.test(toTest)) {
      return this.errorMessage(key, `${key} must contain a lowercase letter.`);
    }
    return null;
  },

  containsUppercase(toTest: string, key: string): { key: string; message: string } | null {
    if (!/[A-Z]/.test(toTest)) {
      return this.errorMessage(key, `${key} must contain an uppercase letter.`);
    }
    return null;
  },

  containsNumber(toTest: string, key: string): { key: string; message: string } | null {
    if (!/\d/.test(toTest)) {
      return this.errorMessage(key, `${key} must contain a number.`);
    }
    return null;
  },

  containsSpecialChar(toTest: string, key: string): { key: string; message: string } | null {
    if (!/[\W]/.test(toTest)) {
      return this.errorMessage(key, `${key} must contain a special character.`);
    }
    return null;
  },

  ref(toTest: string, key: string, toRef: string, keyRef: string) {
    if (toTest !== toRef) {
      return this.errorMessage(key, `${key} must be the same as ${keyRef}.`);
    }
    return null;
  },

  uuid(toTest: string, key: string) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(toTest)) {
      return this.errorMessage(key, `${key} must be UUID.`);
    }
    return null;
  }

};

export default Validator;
