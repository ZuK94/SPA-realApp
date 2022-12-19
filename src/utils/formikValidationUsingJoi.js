import Joi from "joi";

const formikValidationUsingJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });
    const errors = {};
    if (!error) {
      return null;
    }
    for (const detail of error.details) {
      const errorKey = detail.path[0];
      errors[errorKey] = detail.message;
    }
    return errors;
  };
};
export default formikValidationUsingJoi;
