import { Schema } from 'joi';

export default (schema: Schema, property: 'body' | 'params' | 'query') => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[property]);
    if (error) throw { message: error.details[0].message, status: 400 };
    req[property] = value;
    next();
  };
};
