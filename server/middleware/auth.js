export const localVariables = (req, res, next) => {
  req.app.locals = {
    email: null,
    hashedOTP: null,
    resetSession: false,
    otpExpiry: null,
  };
  next();
};
