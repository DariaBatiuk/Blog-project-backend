import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js";

mongoose
  .connect("mongodb+srv://dariab:wwwwww@cluster0.x3phn9n.mongodb.net/blog")
  .then(() => console.log("DB ok"))
  .catch(() => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, userController.login);

app.post("/auth/register", registerValidation, userController.register);

app.get('/auth/me', checkAuth, userController.getMe);

app.listen(444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
