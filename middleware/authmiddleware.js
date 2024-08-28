import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const AuthHeader = req.headers.authorization;

  if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    next("Auth Failed");
  }
  const token = AuthHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Auth Failed");
  }
};
export default userAuth;
