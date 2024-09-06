import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TaskCard, { Task } from "@/components/TaskCard";

interface TaskListProps {
  isActive: boolean;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  isActive,
  onAddTask,
  onEditTask,
}) => {
  const activeData: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Description of task 1",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description of task 2",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description of task 3",
      isCompleted: false,
    },
  ];

  const completedData: Task[] = [
    {
      id: 4,
      title: "Task 4",
      description: "Complete task 4",
      isCompleted: true,
    },
    {
      id: 5,
      title: "Task 5",
      description: "Complete task 5",
      isCompleted: true,
    },
  ];

  return (
    <View style={styles.taskList}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {isActive ? "Active tasks" : "Completed tasks"}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
          <Text style={styles.addTaskText}>Add new task</Text>
        </TouchableOpacity>
      </View>
      {isActive
        ? activeData.map((task: any) => (
            <TaskCard key={task.id} {...task} onEdit={() => onEditTask(task)} />
          ))
        : completedData.map((task: any) => (
            <TaskCard key={task.id} {...task} onEdit={() => onEditTask(task)} />
          ))}
    </View>
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
