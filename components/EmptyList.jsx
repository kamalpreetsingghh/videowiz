import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { router } from "expo-router";

const EmptyList = ({ title }) => {
  return (
    <View className="flex flex-1 justify-between items-center px-4">
      <View className="flex justify-center items-center">
        <Image
          source={images.logoSmall}
          resizeMode="contain"
          className="w-24 h-24"
        />

        <Text className=" my-4 font-pmedium text-surface-light dark:text-surface-dark">
          {title}
        </Text>
      </View>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyList;
