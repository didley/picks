export const handleErrors = (err, _req, res, next) => {
  if (!err) return next();

  console.error(err);
  const statusCode = err?.code || 500;
  const errorMessage = err?.message || "Something went wrong.";
  res.status(statusCode).json({ error: errorMessage });
};
