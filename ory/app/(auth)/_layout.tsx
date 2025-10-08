import { Stack, useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { useEffect } from "react";

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)/home");
    }
  }, [loading, user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
