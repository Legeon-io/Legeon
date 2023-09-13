import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verify = await jwt.verify(token, process.env.JWT_KEY);
      req.user = verify;

      next();
    } else {
      res.status(498).json({ error: "Invalid Token", err });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export default verifyToken;
