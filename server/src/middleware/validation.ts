export default (schema, property) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[property]);
    if (error) throw { message: error, status: 400 };
    req[property] = value;
    next();
  };
};
