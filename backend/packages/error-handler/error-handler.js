const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  const reqUrl = `${req.method} ${req.url}`;
  logger.error(
    `\n [Scrumkits][error-handler]:errName:${err.name}\n URL: ${reqUrl}\n Error status: ${statusCode}\n errorBody: ${err.body}\n error stack:${err.stack}`
  );

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = { errorHandler };
