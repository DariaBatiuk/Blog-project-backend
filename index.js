import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { userController, postController} from './controllers/index.js';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) =>{
		if(!fs.existsSync('uploads')){
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (_, file, cb) =>{
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors({
  origin: 'https://blog-project-frontend-ijetzrtzz-dariabatiuk.vercel.app',
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true, 
}));

app.use('/uploads', express.static('uploads'));

app.post("/auth/login", loginValidation, handleValidationErrors, userController.login);
app.post("/auth/register", registerValidation,  handleValidationErrors,userController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});	
});

app.get('/auth/me', checkAuth, userController.getMe);
app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts/', checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, postController.update);

app.get('/tags', postController.getLastTags);
app.get('/posts/tags', postController.getLastTags);

app.listen(process.env.PORT || 444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
