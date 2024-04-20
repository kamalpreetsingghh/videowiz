import { SafeAreaView } from "react-native-safe-area-context";
import { VideoForm } from "../../components";
import { useLocalSearchParams } from "expo-router";

const Update = () => {
  const { user, videoId, title, prompt, thumbnail, video } =
    useLocalSearchParams();

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <VideoForm
        user={user}
        formType="Update"
        videoId={videoId}
        videoTitle={title}
        videoPrompt={prompt}
        videoThumbnail={thumbnail}
        videoUrl={video}
      />
    </SafeAreaView>
  );
};

export default Update;
