function allowHeaders(req, res, next) {
  res.set("Access-Control-Expose-Headers", ["x-auth-token", "ui-session"]);
  res.set("Server", "scrumkits-server");
  res.set("X-Frame-Options", "deny");
  res.set("X-XSS-Protection", "1; mode=block");
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
}

module.exports = allowHeaders;
