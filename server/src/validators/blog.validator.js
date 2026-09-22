// Validates required fields for blog post creation and updates.
export const validateBlog = (req, res, next) => {
  const { title, excerpt, content } = req.body;
  if (!title || !excerpt || !content) {
    return res.status(400).json({
      success: false,
      message: "Title, excerpt, and content are required fields",
    });
  }
  next();
};
