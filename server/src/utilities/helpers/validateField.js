


    // Validate required fields

const validateField = (value, fieldName, datatype) => {
    if (!value || typeof value !== datatype) {
        return { isValid: false, message: `${fieldName} should be a ${datatype}` };
    }
    return { isValid: true };
};

module.exports = validateField;


    // // Validate fields using validateField function
    // const usernameValidation = validateField(username, "Username", "string");
    // if (!usernameValidation.isValid) {
    //     return res.status(400).json({ message: usernameValidation.message });
    // }