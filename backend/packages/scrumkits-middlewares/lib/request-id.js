const { v4: uuidv4 } = require('uuid');
const httpContext = require('./http-context');

const setRequestId = (req, res, next) => {
  const attributeName = 'requestId';
  const headerName = 'X-Request-Id';
  req[attributeName] = req.header(attributeName) || uuidv4();
  httpContext.set('requestId', req[attributeName]);
  res.setHeader(headerName, req[attributeName]);
  next();
};

module.exports = setRequestId;
