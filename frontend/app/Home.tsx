import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabPosition] = useState(new Animated.Value(0));
  const [isActiveTab, setIsActiveTab] = useState(true);

  const handleTabPress = (tabIndex: number) => {
    setIsActiveTab(tabIndex === 0);
    Animated.spring(tabPosition, {
      toValue: tabIndex,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <View style={styles.tabToggleContainer}>
        <View style={styles.tabToggle}>
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                transform: [
                  {
                    translateX: tabPosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, screenWidth * 0.47],
                    }),
                  },
                ],
              },
            ]}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(0)}
          >
            <Text style={styles.tabText}>ACTIVE TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(1)}
          >
            <Text style={styles.tabText}>COMPLETED TASKS</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TaskList isActive={isActiveTab} />
        </ScrollView>
      </View>
      <TaskModal
        onClose={() => {
          setIsModalOpen(!isModalOpen);
          handleTabPress(0);
        }}
        visible={isModalOpen}
        title={"Add new task"}
        onCreate={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 960,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: "100%",
  },
  tabToggleContainer: {
    alignItems: "center",
    marginVertical: 70,
  },
  tabToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6495ED",
    borderRadius: 50,
    width: "85%",
    height: 80,
    overflow: "hidden",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 80,
    width: "45%",
  },
  tabText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 20,
  },
  tabIndicator: {
    position: "absolute",
    backgroundColor: "#007FFF",
    height: "100%",
    width: "45%",
    borderRadius: 50,
  },
});

export default Home;
