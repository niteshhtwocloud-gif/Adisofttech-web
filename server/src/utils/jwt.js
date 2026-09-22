// JSON Web Token signing and verification helpers for authentication.
import jwt from "jsonwebtoken";
import config from "../config/env.js";

// Signs payload using the configured JWT secret.
export const generateToken = (payload, expiresIn = config.jwtExpiresIn) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

// Verifies token authenticity and decodes payload.
export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export default {
  generateToken,
  verifyToken,
};
