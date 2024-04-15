import validator from 'express-joi-validation';
import joi from 'joi';

const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
});

export default validator.createValidator({}).body(userSchema);
