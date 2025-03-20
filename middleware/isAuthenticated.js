import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not Authenticated",
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;