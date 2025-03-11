import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//const notFound = require("../middlewares/v1/notFound");
const app = express();

import userRoute from "../route/v1/userRoute";
import postRoute from "../route/v1/postRoute";
// import tagRoute  from "../route/v1/tagRoute"
// import categoryRoute from "../route/v1/categoryRoute";
// import commentRoute  from "../route/v1/commentRoute";
import profileRoute  from "../route/v1/profileRoute";
// import pageRoute   from "../route/v1/pageRoute";
// import imageRoute from "../route/v1/imageRoute";

// to restrict access to api for just a specific website and you can also
//specify what kind of operation they are allowed to use on the api
//middle wares
// const corsOptions = {
//   origin: "https://inventnexus.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
//app.use(cors(corsOptions));

// use these format if you want anyone to access your api
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//app.use(notFound);

//routes
app.use("/v1/users", userRoute);
app.use("/v1/post", postRoute);
// app.use("/v1/tag", tagRoute);
// app.use("/v1/categories", categoryRoute);
// app.use("/v1/comments", commentRoute);
app.use("/v1/profiles", profileRoute);
// app.use("/v1/pages", pageRoute);
// app.use("/v1/images", imageRoute);

export default  app;
