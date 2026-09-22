// Handles contact inquiry submissions and admin lead management.
import * as contactService from "../services/contact.service.js";

// Validates Turnstile verification and records incoming contact inquiry.
export const submitContact = async (req, res, next) => {
  try {
    const remoteIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket.remoteAddress ||
      "";

    const contact = await contactService.createContact(req.body, remoteIp);
    res.status(201).json({
      success: true,
      message: "Thank you! We have received your inquiry and will be in touch shortly.",
      contactId: contact._id,
    });
  } catch (error) {
    next(error);
  }
};

// Returns paginated contact inquiries for authenticated admins.
export const getContacts = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await contactService.getAllContacts({
      page,
      limit,
      search,
      status,
    });
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Updates lead triage status (new, contacted, in-progress, resolved).
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const contact = await contactService.updateContactStatus(id, status);
    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// Deletes a contact inquiry by ID.
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await contactService.deleteContact(id);
    res.status(200).json({
      success: true,
      message: "Contact inquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

