
// Validate array fields
export const validateAllowedField = (field: any, fieldName: string, allowedValues: string[]) => {
  if (field) {
    if (allowedValues && !allowedValues.includes(field)) {
      throw new Error(`${fieldName} must be one of the following: ${allowedValues.join(", ")}`);
    }
  }
  return true;
};
  
  export const validateArrayField = <T>(field:[], fieldName: string, fieldType: T) => {
    const validateNestedArray = (array: [], depth = 0, parentIndex: number[]) => {
      if (!Array.isArray(array)) {
        throw new Error(
          `${fieldName} at depth ${depth} (${parentIndex.join(" -> ")}) must be an array.`
        );
      }

      array.forEach((item, index) => {
        const currentIndex = [...parentIndex, index];
        if (Array.isArray(item)) {
          // Recursively validate nested arrays
          validateNestedArray(item, depth + 1, currentIndex);
        } else if (typeof item !== fieldType) {
          throw new Error(
            `${item} in ${fieldName} at depth ${depth} (${currentIndex.join(" -> ")}) should be of type ${fieldType}.`
          );
        }
      });
    };

    if (field) {
      if (!Array.isArray(field)) {
        throw new Error(`${fieldName} must be an array.`);
      }
      // Start recursive validation
      validateNestedArray(field, 0, []);
    }
    return true; // Validation successful
  };
  
  export const validateAndNormalizeArrayField = <T>(field:[], fieldName: string, fieldType:T ) => {
    if (field) {
      if (!Array.isArray(field)) {
        throw new Error(`${fieldName} must be an array.`);
      }

      // Normalize the array (handle flat arrays and nested arrays)
      const normalizeArray = (arr:[]) => {
        if (arr.length === 0) return [[]]; // Ensure empty arrays are normalized as a single empty nested array
        return arr.every((item) => typeof item === fieldType) ? [arr] : arr;
      };

      const normalizedField = normalizeArray(field);

      // Validate each element in the normalized array
      normalizedField.forEach((subArray, subIndex) => {
        if (!Array.isArray(subArray)) {
          throw new Error(`${fieldName} must contain only nested arrays or flat values.`);
        }

        subArray.forEach((item, index) => {
          if (typeof item !== fieldType) {
            throw new Error(`Element "${item}" in ${fieldName} at [${subIndex}][${index}] should be of type ${fieldType}.`);
          }
        });
      });

      return normalizedField; // Return normalized array if validation is successful
    }

    return [[]]; // Return a default normalized empty nested array if the field is not provided
  };

  // Validate type specific fields
export const validateField = (field: any, fieldName: string, fieldType: string) => {
  if (field && typeof field !== fieldType) {
    throw new Error(`${fieldName} should be a ${fieldType}`);
  }
  return true;
};
  
  // Validate required fields
  export const validateRequiredField = (field: any, fieldName: string, fieldType: string) => {
    if (!field || typeof field !== fieldType) {
      throw new Error(`${fieldName} is required and should be a ${fieldType}`);
    }
    return true;
  };
  
  // Validate email field
  export const validateEmail = (email: string) => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error(`Invalid email: ${email}`);
      }
    }
    return true;
  };
  
  // Password validation strength
  export const validatePassword = (password: string) => {
    if (password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        );
      }
    }
    return true;
  };
  