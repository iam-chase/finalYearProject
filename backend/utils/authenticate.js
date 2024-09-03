import { verifyToken } from "./token";

export const authenticateUser = async (req, res, next) => {
  /**
   * Authentication mechanism
   * @function:Ensures a user is logged to access certain services
   * @params:Takes token from request header
   * @verify:Verify token using a signed jwt key
   * @return:Returns a user if token is valid
   */
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("Authentication failed: Token missing");
  }
  const token = authHeader.split(" ")[1];
  try {
    const { email, id, role } = verifyToken({ payload: token });
    req.user = { email, id, role };
    next();
  } catch (err) {
    return res.status(401).json("Token invalid");
  }
};



export const authorizePermissions = (...roles) => {
  /**
   * Authorization mechanism
   * @function:Gives permission to specified user
   * return:Returns true if user is allow otherwise denies user
   */
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("Unauthorized to access this route", 403));
    }
    next();
  };
};

