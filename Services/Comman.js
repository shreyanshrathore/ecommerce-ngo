const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.isAdmin = (req, res, done) => {
  return passport.authenticate("jwtadmin");
};

exports.isOwner = (req, res, done) => {
  return passport.authenticate("jwtowner");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role, addresses: user.addresses, orders: user.orders };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // TODO: This is temporary token for testing without cookie
  // Admin
  // token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDI2YTM1MjI0OTUzMzU3YTJmNDU5ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTQ2NjAxM30.cZNqODcQ6GHPRoBQ8Z8ACs39sGh-TZgE53aV4GHhw28"
  // User
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2NmNDgwMDhmOWI3NzU5MTZhMGVmYyIsInJvbGUiOiJ1c2VyIiwiYWRkcmVzc2VzIjpbeyJuYW1lIjoic2hyZXlhbnNoIHJhdGhvcmUiLCJlbWFpbCI6InNocmV5YW5zaHJhdGhvcmUyMDY3NUBhY3JvcG9saXMuaW4iLCJwaG9uZSI6IjA2MjYzODc4NTg4Iiwic3RyZWV0IjoiMjMiLCJjaXR5IjoiYmV0dWwiLCJzdGF0ZSI6Ik1hZGh5YSBQcmFkZXNoIiwicGluQ29kZSI6IjQ2MDAwNCJ9XSwib3JkZXJzIjpbXSwiaWF0IjoxNzAwMzc1MDE1fQ.eTMZwywer9noB4vNgSf40MUJwuh5ybZL51dLdr9tpe4"
  // Owner
  // token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDI2Zjg2ZjBiOGJjNjA5ODJhZGI2YiIsInJvbGUiOiJvd25lciIsImFkZHJlc3NlcyI6W10sIm9yZGVycyI6W10sImlhdCI6MTY5OTQ2NzAwMH0.LBaoLJ5-mpOt38njU5TdxYlxquBIrnWuXRx0le3_mQ4"

  return token;
};
