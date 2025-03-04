

// const validateField = (field, fieldName, datatype) => {
//     return (req, res, next) => {
//         if (!req.body[field] || typeof req.body[field] !== datatype) {
//             return res
//                 .status(400)
//                 .json({ message: `${fieldName} should be a ${datatype}` });
//         }
//         next(); // Proceed to the next middleware or route handler if validation passes
//     };
// };

// module.exports = validateField;
