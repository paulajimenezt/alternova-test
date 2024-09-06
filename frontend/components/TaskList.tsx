// TaskList.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskCard, { Task } from "@/components/TaskCard";

interface TaskListProps {
  isActive: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ isActive }) => {
  const activeData: Task[] = [
    {
      title: "Task 1",
      description: "Description of task 1",
      isCompleted: false,
    },
    {
      title: "Task 2",
      description: "Description of task 2",
      isCompleted: false,
    },
    {
      title: "Task 3",
      description: "Description of task 3",
      isCompleted: false,
    },
  ];

  const completedData: Task[] = [
    {
      title: "Task 4",
      description: "Complete task 4",
      isCompleted: true,
    },
    {
      title: "Task 5",
      description: "Complete task 5",
      isCompleted: true,
    },
  ];

  return (
    <View style={styles.taskList}>
      <Text style={styles.subtitle}>
        {isActive ? "Your active tasks:" : "Your completed tasks:"}
      </Text>
      {isActive
        ? activeData.map((task: any) => <TaskCard key={task.id} {...task} />)
        : completedData.map((task: any) => (
            <TaskCard key={task.id} {...task} />
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskList: {
    margin: 10,
    maxWidth: 860,
  },
  subtitle: {
    fontSize: 20,
    padding: 10,
    color: "#38434D",
    textAlign: "center",
  },
});

export default TaskList;
