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
          <View className="justify-start w-full absolute top-0 left-0 mx-4 my-6">
            <TouchableOpacity
              onPress={() => router.navigate("/")}
              className="w-[35px] h-[35px] items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50"
            >
              <Image
                source={icons.leftArrow}
                className="w-[25px] h-[25px] row-span-full"
                resizeMode="contain"
                tintColor="#FFA001"
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
              Unlock Infinite{"\n"}
              Creativity with <Text className="text-secondary-200">VidWiz</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-light dark:text-gray-dark mt-7 text-center">
            Explore, express, and share your stories, unlocking endless
            possibilities in the world of video creation.
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
