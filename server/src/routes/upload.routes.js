import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Upload a single image file (Protected: authenticated admin)
router.post("/", authenticate, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file provided. Please select an image to upload.",
    });
  }

  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    url,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

export default router;
