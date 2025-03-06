
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory buffer
const limits =  { fileSize: 5 * 1024 * 1024 };// 5MB file size limit
const upload = multer({ storage, limits });

module.exports = upload;



// import multer from 'multer'
// import path from 'path'
// import { v4 } from 'uuid';

// const fileUploadMiddleware = (fieldName: string, dir: string = 'user_image') => {

//     return multer({
//         storage: multer.diskStorage({
//             destination: 'assets/' + dir,
//             filename: (req, file, cb) => {
//                 cb(null, v4() + path.extname(file.originalname));
//             }
//         }),
//         limits: {
//             fileSize: 1024 * 1024 * 3
//         },
//         fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
//             if (
//                 file.mimetype === 'image/png' ||
//                 file.mimetype === 'image/jpg' ||
//                 file.mimetype === 'image/jpeg'
//             ) {
//                 cb(null, true);
//             } else {
//                 cb(new Error('Only JPEG and PNG images are allowed.'), false);
//             }
//         }
//     }).single(fieldName);
// }

// export default fileUploadMiddleware;
// Route file:

// router.patch('/', fileUploadMiddleware('profileIm