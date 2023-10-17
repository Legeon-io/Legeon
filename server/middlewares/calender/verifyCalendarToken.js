import jwt from "jsonwebtoken";

const verifyCalendarToken = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const data = req.headers.cookie.split(";");
      let token;
      data.map((item) => {
        if (item.split("=")[0] == "token") {
          token = item.split("=")[1];
        }
      });
      const verify = await jwt.verify(token, process.env.JWT_KEY);

      req.user = verify;

      next();
    } else {
      res.status(498).json({ error: "Invalid Calendar Token", err });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export default verifyCalendarToken;
