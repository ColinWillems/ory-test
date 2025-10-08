import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../../src/context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.traits?.email || "User"} 👋</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
