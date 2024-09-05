import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "GET /tasks" });
});
router.post("/", (req: Request, res: Response) => {
  return res.json({ message: "POST /tasks" });
});

export default router;
