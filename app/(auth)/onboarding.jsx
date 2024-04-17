import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { CustomButton } from "../../components";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4">
          <View className="justify-start w-full ">
            <TouchableOpacity
              onPress={() => router.navigate("/")}
              className="w-[35px] h-[35px] items-center justify-center rounded-full bg-orange-200 dark:bg-orange-900/50"
            >
              <Image
                source={icons.leftArrow}
                className="w-[25px] h-[25px] row-span-full"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Image
            source={images.logo}
            className="w-[230px] h-[100px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-surface-light dark:text-surface-dark font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">VidWiz</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-light dark:text-gray-dark mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with VidWiz
          </Text>

          <CustomButton
            title="Sign In"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          <CustomButton
            title="Create Account"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
