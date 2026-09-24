// Mongoose schema definition for portfolio case studies and featured client projects.
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "Web Development",
    },
    client: {
      type: String,
      default: "",
    },
    metrics: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    technologies: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    tagline: {
      type: String,
      default: "",
    },
    timeline: {
      type: String,
      default: "",
    },
    fullOverview: {
      type: String,
      default: "",
    },
    challenge: {
      type: String,
      default: "",
    },
    solution: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    caseMetrics: [
      {
        label: { type: String, default: "" },
        value: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    techStack: [
      {
        name: { type: String, default: "" },
        role: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
