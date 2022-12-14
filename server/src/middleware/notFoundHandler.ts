export default (req, res, next) => {
  const error = new Error('Not Found');
  res.status(404);
  res.statusMessage = 'Not Found';
  res.json({ error: error.message });
};
