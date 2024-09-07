import { Request, Response, NextFunction } from "express";

const taskValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }
  if (
    typeof req.body.title !== "string" ||
    typeof req.body.description !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Title and description must be strings" });
  }
  if (req.body.title.length < 1 || req.body.title.length > 50) {
    return res
      .status(400)
      .json({ error: "Title must be between 1 and 50 characters" });
  }
  if (req.body.description.length > 200) {
    return res
      .status(400)
      .json({ error: "Description must have less than 200 characters" });
  }

  next();
};

export { taskValidator };
