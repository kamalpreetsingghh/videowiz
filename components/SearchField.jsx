import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchField = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className="flex flex-row items-center space-x-4 w-full h-14 px-4 
     bg-container-light dark:bg-container-dark rounded-full"
    >
      <TextInput
        className="text-base mt-0.5 text-surface-light dark:text-surface-dark flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#6b7280"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Input",
              "Provide the video name to search"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          tintColor="#6b7280"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
