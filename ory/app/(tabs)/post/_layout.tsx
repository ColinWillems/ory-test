import { Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Post" }} />
    </Stack>
  );
}