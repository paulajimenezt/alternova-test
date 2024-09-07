import { Request, Response, Router } from "express";
import { TaskController } from "../controllers/tasks.controller";
import { taskValidator } from "../middlewares/task.validator";
import { statusValidator } from "../middlewares/taskStatus.validator";

const createTaskRouter = (taskController: TaskController) => {
  const router = Router();
  router.get("/", (req: Request, res: Response) =>
    taskController.getAllTasks(req, res)
  );
  router.delete("/:taskId", (req: Request, res: Response) =>
    taskController.deleteTask(req, res)
  );
  router.post("/:taskId/complete", (req: Request, res: Response) =>
    taskController.markTaskAsComplete(req, res)
  );

  // Validate task data before creating or editing a task
  router.use(taskValidator);
  router.post("/", (req: Request, res: Response) =>
    taskController.createTask(req, res)
  );
  router.use(statusValidator);
  router.post("/:taskId/edit", (req: Request, res: Response) =>
    taskController.updateTask(req, res)
  );
  return router;
};

export default createTaskRouter;
