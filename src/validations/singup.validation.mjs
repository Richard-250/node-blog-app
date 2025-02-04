import Joi from "joi";

const signupSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(8) 
    .max(15) 
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages({
        "string.pattern.base":
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
    }),
});

 const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  export default validateSignup