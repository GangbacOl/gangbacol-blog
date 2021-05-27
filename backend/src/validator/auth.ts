import { Request, Response } from 'express';
import _passwordValidator from 'password-validator';
import { validationResult } from 'express-validator';

export const passwordValidator = (password: string) => {
    const schema = new _passwordValidator();
    schema.is().min(8).is().max(50).has().uppercase().has().lowercase().has().not().spaces();

    return !schema.validate(password);
};

export const bodyValidator = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};
