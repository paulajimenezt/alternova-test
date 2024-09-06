import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: () => void;
  title: string;
  taskTitle?: string;
  taskDescription?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onCreate,
  title,
  taskTitle,
  taskDescription,
}) => {
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
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#C0C0C0"
            placeholder={taskTitle ?? "Task title"}
          />
          <TextInput
            style={[styles.textInput, styles.multilineTextInput]}
            multiline={true}
            blurOnSubmit={true}
            placeholderTextColor="#C0C0C0"
            placeholder={taskDescription ?? "Task Description"}
          />
          <TouchableOpacity style={styles.createButton} onPress={onCreate}>
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
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
    width: "90%",
    padding: 10,
  },

  multilineTextInput: {
    textAlignVertical: "top",
    maxHeight: 200,
    height: 80,
  },

  createButton: {
    backgroundColor: "#006400",
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
