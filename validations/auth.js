import { body } from 'express-validator';
export const registerValidation = [
	body('email', 'Wrong email').isEmail(),
	body('password', 'Password should be minimum 5 symbols').isLength({ min:5 }),
	body('fullName', 'Please write your full name').isLength({ min:3 }),
	body('avatartUrl', 'Wrong URL link').optional().isURL(),
];