import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import TaskModal from "./TaskModal";

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskCard = (task: Task) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTask = () => {
    setIsModalOpen(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsModalOpen(!isModalOpen)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{task.title}</Text>
        <Text>{task.description}</Text>
      </View>
      <View style={styles.checkbox}>
        {task.isCompleted ? (
          <AntDesign name="checkcircle" size={30} color="green" />
        ) : (
          <AntDesign name="checkcircleo" size={30} color="gray" />
        )}
      </View>

      <TaskModal
        onClose={() => setIsModalOpen(!isModalOpen)}
        visible={isModalOpen}
        title={"Edit task"}
        taskTitle={task.title}
        taskDescription={task.description}
        onCreate={() => {}}
        showDeleteButton={true}
        onDelete={handleDeleteTask}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    maxWidth: 860,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgrey",
  },
});

export default TaskCard;
