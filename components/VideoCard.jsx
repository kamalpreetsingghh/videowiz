import { View, Text, Image } from "react-native";
import VideoPlayer from "./VideoPlayer";

const VideoCard = ({
  video: {
    $id: videoId,
    title,
    prompt,
    thumbnail,
    video,
    creator: { $id: creatorId, avatar, name },
    likedUsers,
  },
  user,
  isProfileScreen = false,
  onRefresh,
}) => {
  return (
    <View className="flex flex-col items-center px-4 mb-10">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          {!isProfileScreen && (
            <View className="w-[40px] h-[40px] rounded-full border border-secondary flex justify-center items-center p-0.5">
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>
          )}

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-surface-light dark:text-surface-dark"
              numberOfLines={1}
            >
              {title}
            </Text>
            {!isProfileScreen && (
              <Text
                className="text-xs font-pregular text-surface-light dark:text-surface-dark"
                numberOfLines={1}
              >
                {name}
              </Text>
            )}
          </View>
        </View>
      </View>

      <VideoPlayer
        videoId={videoId}
        title={title}
        prompt={prompt}
        thumbnail={thumbnail}
        video={video}
        user={user}
        isLoggedUserVideo={user ? user.$id === creatorId : false}
        isProfileScreen={isProfileScreen}
        likedUsers={likedUsers}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default VideoCard;
