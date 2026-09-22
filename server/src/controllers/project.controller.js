// Handles portfolio case studies and project showcase endpoints.
import * as projectService from "../services/project.service.js";

// Returns list of showcase projects with optional featured filter.
export const getProjects = async (req, res, next) => {
  try {
    const { featuredOnly } = req.query;
    const projects = await projectService.getAllProjects({ featuredOnly: featuredOnly === "true" });
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Returns a single portfolio project by slug.
export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await projectService.getProjectBySlug(slug);
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Creates a new portfolio project entry.
export const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Updates project case study details by ID.
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.updateProject(id, req.body);
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Removes a project case study by ID.
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Seeds or resets default portfolio projects.
export const seedStarterProjects = async (req, res, next) => {
  try {
    const projects = await projectService.seedStarterProjects();
    res.status(200).json({
      success: true,
      message: "Default projects synchronized successfully",
      projects,
    });
  } catch (error) {
    next(error);
  }
};


