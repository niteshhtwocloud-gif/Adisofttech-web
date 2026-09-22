import Contact from "../models/contact.model.js";
import config from "../config/env.js";
import { sendContactNotification } from "./email.service.js";

// Cloudflare Turnstile verification to prevent spam submissions.
export const verifyTurnstileToken = async (token, remoteIp = "") => {
  const secretKey = config.turnstileSecretKey;
  if (!secretKey) {
    console.error("Cloudflare Turnstile secret key is not configured.");
    return false;
  }

  if (!token || typeof token !== "string") {
    return false;
  }


  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await res.json();
    if (!data.success) {
      console.warn("Cloudflare Turnstile verification rejected:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification API network error:", err.message);
    return false;
  }
};

export const createContact = async (data, remoteIp = "") => {
  const { name, email, phone, company, service, message, turnstileToken } = data;

  // Turnstile CAPTCHA validation - mandatory manual verification
  if (!turnstileToken) {
    const error = new Error("Security verification (Cloudflare Turnstile) is required before submitting.");
    error.statusCode = 400;
    throw error;
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!isValidToken) {
    const error = new Error("Security verification failed or expired. Please complete the verification challenge again.");
    error.statusCode = 403;
    throw error;
  }

  // Validate fields: name, phone, company, message required
  if (!name || !phone || !company || !message) {
    const error = new Error("Name, phone, company name, and message are required fields");
    error.statusCode = 400;
    throw error;
  }

  // Trim and validate email if provided
  const cleanEmail = email ? email.trim().toLowerCase() : "";
  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    const error = new Error("Please enter a valid email address");
    error.statusCode = 400;
    throw error;
  }

  // Create lead in MongoDB
  const contact = await Contact.create({
    name: name.trim(),
    email: cleanEmail || undefined,
    phone: phone.trim(),
    company: company.trim(),
    service: service ? service.trim() : "Technical Consultation",
    message: message.trim(),
  });

  // Asynchronously dispatch email notification (non-blocking)
  sendContactNotification({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company,
    service: contact.service,
    message: contact.message,
  }).catch((err) => console.error("Email notification background error:", err));

  return contact;
};

export const getAllContacts = async ({ page = 1, limit = 50, search = "", status = "" } = {}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    const regex = { $regex: search, $options: "i" };
    query.$or = [{ name: regex }, { company: regex }, { phone: regex }, { email: regex }];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [contacts, total] = await Promise.all([
    Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Contact.countDocuments(query),
  ]);

  return {
    contacts,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

export const updateContactStatus = async (id, status) => {
  const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!contact) {
    const error = new Error("Contact inquiry not found");
    error.statusCode = 404;
    throw error;
  }
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    const error = new Error("Contact inquiry not found");
    error.statusCode = 404;
    throw error;
  }
  return contact;
};
