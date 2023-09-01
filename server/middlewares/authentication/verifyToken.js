import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = await jwt.verify(token, process.env.JWT_KEY);
    req.user = verify;
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

export default verifyToken;
