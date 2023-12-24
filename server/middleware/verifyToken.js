import jwt from "jsonwebtoken";
//middleware to verify a user my taking token from cookie
export const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "login error" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
      if (err) return res.status(403).json({ error: "token invalid" });
      req.user = tokenData;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
