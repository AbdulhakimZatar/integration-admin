export default (err, req, res, next) => {
  res.status(res.status || 500);
  res.statusMessage = 'Server Error';
  res.json({ error: err.message });
};
