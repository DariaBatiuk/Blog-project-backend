import { body } from 'express-validator';
export const registerValidation = [
	body('email', 'Wrong email').isEmail(),
	body('password', 'Password should be minimum 5 symbols').isLength({ min:5 }),
	body('fullName', 'Please write your full name').isLength({ min:3 }),
	body('avatartUrl', 'Wrong URL link').optional().isURL(),
];

export const loginValidation = [
	body('email', 'Wrong email').isEmail(),
	body('password', 'Password should be minimum 5 symbols').isLength({ min:5 }),
];

export const postCreateValidation = [
	body('title', 'Enter title').isLength({ min: 3}).isString(),
	body('text', 'Enter text').isLength({ min:3 }).isString(),
	body('tags', 'Wrong tags format').optional().isString(),
	body('imageUrl', 'Wrong image URL').optional().isString(),
];