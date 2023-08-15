import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js";
import * as postController from './controllers/PostController.js';
import multer from 'multer';

mongoose
  .connect("mongodb+srv://dariab:wwwwww@cluster0.x3phn9n.mongodb.net/blog")
  .then(() => console.log("DB ok"))
  .catch(() => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) =>{
		cb(null, 'uploads');
	},
	filename: (_, file, cb) =>{
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post("/auth/login", loginValidation, userController.login);
app.post("/auth/register", registerValidation, userController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});	
});

app.get('/auth/me', checkAuth, userController.getMe);
app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts/', checkAuth, postCreateValidation, postController.create);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, postController.update);

app.listen(444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
