const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  //console.log(token)
  if (!token) {
    return res.status(401).json({ errors: "token is required" });
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenData);
    req.user = {
      id: tokenData.id,
      role: tokenData.role,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const authorizeUser = (permittedUser) => {
  return (req, res, next) => {
    if (permittedUser.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(404)
        .json({ errors: "You are not authorized to access" });
    }
  };
};
module.exports = {
  authenticateUser,
  authorizeUser,
};

/*const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json("token is required");
  }
  try {
    const data = jwt.verify(token, process.env.SEACREAT_KEY);
    req.currentUser = {
      id: data.id,
      role: data.role,
    };
    console.log("current user", req.currentUser);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "invalid token" });
  }
};

const authorizeUser = (permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.includes(req.currentUser.role)) {
      next();
    } else {
      res.status(403).json({ errors: "Unauthorized" });
    }
  };
};

module.exports = {
  authenticateUser: authenticateUser,
  authorizeUser: authorizeUser,
};
*/
