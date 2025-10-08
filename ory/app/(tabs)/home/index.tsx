import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import Storyblok from "@/api/storyblok";

type Blok = {
  _uid: string;
  component: string;
  title?: string;
  description?: string;
  image?: { filename: string };
};

type Story = {
  name: string;
  content: {
    component: string;
    body: Blok[];
  };
};

export default function HomeScreen() {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const { data } = await Storyblok.get("cdn/stories/home", {
          version: "published",
        });
        setStory(data.story);
      } catch (error) {
        console.error("Storyblok error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!story) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No Storyblok content found.</Text>
      </View>
    );
  }

  const { content } = story;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold mb-4">{story.name}</Text>

      {content.body?.map((blok) => (
        <RenderBlok blok={blok} key={blok._uid} />
      ))}
    </ScrollView>
  );
}

const RenderBlok = ({ blok }: { blok: Blok }) => {
  switch (blok.component) {
    case "hero":
      return (
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-center">{blok.title}</Text>
          {blok.description && (
            <Text className="text-base text-gray-500 mt-2 text-center">
              {blok.description}
            </Text>
          )}
          {blok.image?.filename && (
            <Image
              source={{ uri: blok.image.filename }}
              className="w-80 h-48 mt-4 rounded-2xl"
              resizeMode="cover"
            />
          )}
        </View>
      );

    default:
      return (
        <Text className="text-red-500">
          Missing component renderer for: {blok.component}
        </Text>
      );
  }
};
