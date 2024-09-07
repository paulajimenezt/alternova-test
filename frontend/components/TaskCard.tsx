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

interface TaskCardProps extends Task {
  onCardClicked: () => void;
  onTaskCompleted: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  isCompleted,
  onCardClicked,
  onTaskCompleted,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onCardClicked()}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text>{description}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onTaskCompleted()}
      >
        {isCompleted ? (
          <AntDesign name="checkcircle" size={30} color="green" />
        ) : (
          <AntDesign name="checkcircleo" size={30} color="gray" />
        )}
      </TouchableOpacity>
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
