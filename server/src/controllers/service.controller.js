// Handles company service catalog endpoints for public and admin portals.
import * as serviceService from "../services/service.service.js";

// Returns list of company service offerings.
export const getServices = async (req, res, next) => {
  try {
    const { activeOnly } = req.query;
    const services = await serviceService.getAllServices({ activeOnly: activeOnly === "true" });
    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// Returns a single service offering by slug.
export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await serviceService.getServiceBySlug(slug);
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// Creates a new service offering.
export const createService = async (req, res, next) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

// Updates an existing service offering by ID.
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await serviceService.updateService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

// Removes a service offering by ID.
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceService.deleteService(id);
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

