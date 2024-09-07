import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TaskCard, { Task, TaskStatus } from "@/components/TaskCard";
import useTasks from "@/hooks/useTasks";
import TaskModal from "./TaskModal";

interface TaskListProps {
  isActive: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ isActive }) => {
  const { tasks, updateTask, addTask, deleteTask, completeTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const activeTasks = tasks.filter((task) => task.status === TaskStatus.Active);
  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.Complete
  );

  const handleCardClicked = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleSubmitTask = (task: Partial<Task> | Task) => {
    console.log("updating task", task);
    if (task.id) {
      updateTask(task as Task);
    } else {
      addTask(task);
    }
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleTaskCompleted = (task: Task) => {
    completeTask(task);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(null);
    setIsModalOpen(false);
    deleteTask(task);
  };

  return (
    <>
      <View style={styles.taskList}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            {isActive ? "Active tasks" : "Completed tasks"}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddTask()}
          >
            <Text style={styles.addTaskText}>Add new task</Text>
          </TouchableOpacity>
        </View>
        {isActive
          ? activeTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                {...task}
                onCardClicked={() => handleCardClicked(task)}
                onTaskCompleted={() => handleTaskCompleted(task)}
              />
            ))
          : completedTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                {...task}
                onCardClicked={() => handleCardClicked(task)}
                onTaskCompleted={() => handleTaskCompleted(task)}
              />
            ))}
      </View>

      <TaskModal
        task={selectedTask}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(task) => handleSubmitTask(task)}
        onDelete={(task) => handleDeleteTask(task)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  taskList: {
    maxWidth: 860,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlignVertical: "center",
    marginHorizontal: 10,
    color: "#38434D",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  addTaskText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskList;
