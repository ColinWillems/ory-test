import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";
import { login } from "../../src/api/ory";
import { useAuth } from "../../src/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refreshSession } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      await refreshSession();
      router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Login failed", err.response?.data?.error?.message || err.message);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Go to Register" onPress={() => router.push("/register")} />
    </View>
  );
}
