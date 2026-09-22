// Handles HTTP endpoints for public and admin blog management.
import * as blogService from "../services/blog.service.js";

// Returns paginated blog articles with filtering and search support.
export const getBlogs = async (req, res, next) => {
  try {
    const { page, limit, category, search, published } = req.query;
    const result = await blogService.getAllBlogs({
      page,
      limit,
      category,
      search,
      published,
    });
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Returns a single blog post by its unique URL slug.
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await blogService.getBlogBySlug(slug);
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// Creates a new blog publication.
export const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// Updates an existing blog post by its slug.
export const updateBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await blogService.updateBlog(slug, req.body);
    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// Deletes a blog post by its slug.
export const deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    await blogService.deleteBlog(slug);
    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Seeds initial starter blog posts into MongoDB Atlas.
export const seedBlogs = async (req, res, next) => {
  try {
    const count = await blogService.seedStarterBlogs();
    res.status(200).json({
      success: true,
      message: `Successfully seeded ${count} starter blog posts into MongoDB Atlas.`,
      count,
    });
  } catch (error) {
    next(error);
  }
};

