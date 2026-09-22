import mongoose from "mongoose";

// Mongoose schema for editorial blog publications and case study articles.
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "General",
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "ADISOFTTECH Team",
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
