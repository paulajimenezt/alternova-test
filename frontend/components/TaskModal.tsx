import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Task } from "./TaskCard";

interface CustomModalProps {
  task?: Task | null;
  visible: boolean;
  onClose: () => void;
  onDelete: (task: Task) => void;
  onSubmit: (task: Partial<Task> | Task) => void;
}

const TITLE_MAX_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 200;

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  task,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setTitleError("");
    setDescriptionError("");
  }, [task]);

  const handleCreate = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("Title cannot be empty");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description cannot be empty");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!valid) {
      return;
    }

    let updatedTask: Partial<Task> | null | undefined = task;
    if (!updatedTask) {
      updatedTask = {
        title: title,
        description: description,
      };
    } else {
      updatedTask.title = title;
      updatedTask.description = description;
    }
    onSubmit(updatedTask);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.closeIcon]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <AntDesign name="closecircle" size={26} color="#BA0021" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>
              {task ? "Edit Task" : "Add Task"}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <TextInput
            style={[styles.textInput, titleError ? styles.errorInput : null]}
            placeholderTextColor="#C0C0C0"
            placeholder="Task title"
            value={title}
            onChangeText={(text) => setTitle(text.slice(0, TITLE_MAX_LENGTH))}
          />
          {titleError ? (
            <Text style={styles.errorText}>{titleError}</Text>
          ) : null}
          <Text style={styles.charCount}>
            {title.length}/{TITLE_MAX_LENGTH}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              styles.multilineTextInput,
              descriptionError ? styles.errorInput : null,
            ]}
            multiline={true}
            blurOnSubmit={true}
            placeholderTextColor="#C0C0C0"
            placeholder="Task Description"
            value={description}
            onChangeText={(text) =>
              setDescription(text.slice(0, DESCRIPTION_MAX_LENGTH))
            }
          />
          {descriptionError ? (
            <Text style={styles.errorText}>{descriptionError}</Text>
          ) : null}
          <Text style={styles.charCount}>
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </Text>
          <View style={styles.buttonContainer}>
            {task && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => onDelete(task)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>
                {task ? "Edit task" : "Add Task"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 10,
  },

  closeIconPressed: {
    color: "lightgrey",
  },

  modalTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  horizontalLine: {
    width: "90%",
    height: 1,
    borderBottomColor: "#899499",
    borderBottomWidth: 0.5,
    marginBottom: 10,
    marginTop: 10,
  },

  textInput: {
    borderColor: "#899499",
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    color: "black",
    fontSize: 15,
    width: "95%",
    padding: 10,
  },

  multilineTextInput: {
    textAlignVertical: "top",
    maxHeight: 200,
    height: 80,
  },

  errorInput: {
    borderColor: "#BA0021",
  },

  errorText: {
    color: "#BA0021",
    alignSelf: "flex-start",
    marginLeft: "2.5%",
    marginBottom: 10,
  },

  charCount: {
    alignSelf: "flex-end",
    marginRight: "2.5%",
    color: "#899499",
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "95%",
    marginTop: 10,
  },

  button: {
    padding: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: "#006400",
    elevation: 2,
    minWidth: "35%",
    maxWidth: "60%",
  },

  deleteButton: {
    backgroundColor: "#BA0021",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
