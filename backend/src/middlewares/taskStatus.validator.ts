import { Request, Response, NextFunction } from "express";
import { TaskStatus } from "../db/models/Task.model";

const statusValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.status) {
    return res.status(400).json({ error: "Status is required" });
  }
  if (!Object.values(TaskStatus).includes(req.body.status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  next();
};

export { statusValidator };
