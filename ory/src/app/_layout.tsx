import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";

export default function RootStackLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          tabBarIcon: () => <Ionicons name="list" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
