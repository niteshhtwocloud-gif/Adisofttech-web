// Handles authentication HTTP endpoints for admin login and profile retrieval.
import * as authService from "../services/auth.service.js";

// Authenticates admin credentials and returns a JWT bearer token.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieves authenticated user profile from verified JWT.
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Dispatches a 6-digit OTP to the administrator's email for password reset.
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.requestPasswordReset(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Verifies the 6-digit OTP and updates the administrator's password.
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPasswordWithOtp({ email, otp, newPassword });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Updates authenticated administrator profile.
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const user = await authService.updateProfile(req.user.id, { name, email, avatar });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Changes authenticated administrator password.
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.id, {
      currentPassword,
      newPassword,
    });
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


