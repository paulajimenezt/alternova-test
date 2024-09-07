export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
}
