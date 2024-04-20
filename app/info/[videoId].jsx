import { Text, ScrollView, View, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, CustomButton, VideoPlayer } from "../../components";
import { deletePost } from "../../lib/appwrite";

const Info = () => {
  const { videoId, title, prompt, thumbnail, video, isLoggedUserVideo } =
    useLocalSearchParams();

  const onDeleteClick = async () => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => await deletePost(videoId),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <ScrollView className="px-4">
        <View className="my-2 justify-start w-full">
          <BackButton />
        </View>

        <VideoPlayer
          videoId={videoId}
          title={title}
          prompt={prompt}
          thumbnail={thumbnail}
          video={video}
          showInfo={false}
        />

        <Text className="px-4 mt-6 font-psemibold text-surface-light dark:text-surface-dark">
          Title
        </Text>

        <View className="rounded-xl my-4 p-4 bg-container-light dark:bg-container-dark">
          <Text className="text-surface-light dark:text-surface-dark">
            {title}
          </Text>
        </View>

        <Text className="px-4 mt-2 font-psemibold text-surface-light dark:text-surface-dark">
          Prompt
        </Text>

        <View className="rounded-xl my-4 p-4 bg-container-light dark:bg-container-dark">
          <Text className="text-surface-light dark:text-surface-dark">
            {prompt}
          </Text>
        </View>

        {isLoggedUserVideo && (
          <>
            <CustomButton
              title="Update"
              handlePress={() =>
                router.push({
                  pathname: `/update/${videoId}`,
                  params: {
                    title,
                    prompt,
                    thumbnail,
                    video,
                  },
                })
              }
              containerStyles="mt-4"
              isLoading={false}
            />

            <CustomButton
              title="Delete"
              handlePress={onDeleteClick}
              containerStyles="mt-4"
              isLoading={false}
              bgColorClass="bg-red-600"
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Info;
