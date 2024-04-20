import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { updateFavorites } from "../lib/appwrite";
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
}) => {
  const [play, setPlay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  let isFavoriteVideo = false;

  if (user) {
    const userWithLikedVideo = likedUsers.find(
      (likedUser) => likedUser.$id === user.$id
    );
    if (userWithLikedVideo) {
      isFavoriteVideo = true;
    }
  }

  const onFavoriteClick = async () => {
    if (isFavoriteVideo) {
      const updatedUsers = likedUsers.filter(
        (likedUser) => likedUser.$id !== user.$id
      );
      await updateFavorites(updatedUsers, videoId);
    } else {
      const updatedUsers = [...likedUsers, user];
      await updateFavorites(updatedUsers, videoId);
    }
  };

  const onDeleteClick = async () => {
    console.log("Delete Function");
    console.log(videoId);
    console.log(creatorId);
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

        <View className="flex flex-row gap-x-4 items-center justify-center h-full">
          {user && (
            <TouchableOpacity onPress={() => onFavoriteClick()}>
              <Image
                source={icons.favorite}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor={isFavoriteVideo ? "#dc2626" : "#4b5563"}
              />
            </TouchableOpacity>
          )}

          {isProfileScreen && (
            <TouchableOpacity onPress={() => onDeleteClick()}>
              <Image
                source={icons.deleteIcon}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="#dc2626"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <VideoPlayer
        play={play}
        setPlay={(value) => setPlay(value)}
        videoId={videoId}
        title={title}
        prompt={prompt}
        thumbnail={thumbnail}
        video={video}
        isLoggedUserVideo={user ? user.$id === creatorId : false}
      />
    </View>
  );
};

export default VideoCard;
