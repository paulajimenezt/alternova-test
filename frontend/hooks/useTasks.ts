import { Task } from "@/components/TaskCard";
import { useState, useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/tasks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        console.error(error.stack);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask: Partial<Task>) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      console.error(error.stack);
    }
  };

  const deleteTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/tasks/${updatedTask.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== updatedTask.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTask = async (updatedTask: Task) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/tasks/${updatedTask.id}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete task");
      }
      const savedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
      );
    } catch (error) {
      console.error("Error completing task:", error);
      setTasks(tasks);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      const response = await fetch(
        `${process.env.API_URL}/tasks/${updatedTask.id}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const savedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(tasks);
    }
  };

  return { tasks, addTask, updateTask, deleteTask, completeTask };
};

export default useTasks;
