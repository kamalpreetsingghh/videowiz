import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { router } from "expo-router";

const EmptyList = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-surface-light dark:text-surface-dark">
        {title}
      </Text>
      <Text className="text-xl text-center font-psemibold text-surface-light dark:text-surface-dark mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyList;
