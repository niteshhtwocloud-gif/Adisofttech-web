// Validates required fields and Turnstile CAPTCHA token on incoming contact inquiries.
export const validateContact = (req, res, next) => {
  const { name, phone, company, message, turnstileToken } = req.body;

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      message: "Cloudflare security verification (CAPTCHA) is required",
    });
  }

  if (!name || !phone || !company || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, phone, company name, and message are required fields",
    });
  }

  next();
};
