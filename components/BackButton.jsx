import { router } from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const BackButton = () => {
  return (
    <View className="my-2 justify-start w-full">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-[35px] h-[35px] items-center justify-center rounded-full
        bg-orange-100 dark:bg-orange-900/50"
      >
        <Image
          source={icons.leftArrow}
          className="w-[25px] h-[25px] row-span-full"
          resizeMode="contain"
          tintColor="#FFA001"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
