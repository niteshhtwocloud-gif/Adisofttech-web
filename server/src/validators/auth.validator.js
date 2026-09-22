// Validates presence of email and password in login requests.
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both email and password are required",
    });
  }
  next();
};
