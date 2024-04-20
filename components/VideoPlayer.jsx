import { TouchableOpacity, Image, View, Alert } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../constants";
import { router } from "expo-router";
import { useState } from "react";
import { deletePost, updateFavorites } from "../lib/appwrite";

const VideoPlayer = ({
  videoId,
  title,
  prompt,
  thumbnail,
  video,
  showInfo = true,
  user = null,
  isLoggedUserVideo = false,
  isProfileScreen = false,
  likedUsers = [],
  onRefresh,
}) => {
  const [play, setPlay] = useState(false);

  const isFavorite = () => {
    let isFavoriteVideo = false;

    if (user) {
      const userWithLikedVideo = likedUsers.find(
        (likedUser) => likedUser.$id === user.$id
      );
      if (userWithLikedVideo) {
        isFavoriteVideo = true;
      }
    }

    return isFavoriteVideo;
  };

  let isFavoriteVideo = isFavorite();

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

  const onInfoClick = () => {
    router.push({
      pathname: `/info/${videoId}`,
      params: {
        user,
        title,
        prompt,
        thumbnail,
        video,
        isLoggedUserVideo,
      },
    });
  };

  const onDeleteClick = async () => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deletePost(videoId);
          onRefresh();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-1"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-1 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />

          <View className="flex gap-y-2 absolute p-1 top-0 right-0 mt-1 mr-1">
            {user && (
              <TouchableOpacity
                onPress={onFavoriteClick}
                className="p-1 bg-white rounded-full"
              >
                <Image
                  source={icons.favorite}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor={isFavoriteVideo ? "#dc2626" : "#000000"}
                />
              </TouchableOpacity>
            )}

            {isProfileScreen && (
              <TouchableOpacity
                onPress={() => onDeleteClick()}
                className="p-1 bg-white rounded-full"
              >
                <Image
                  source={icons.deleteIcon}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor="#dc2626"
                />
              </TouchableOpacity>
            )}
          </View>

          {showInfo && (
            <TouchableOpacity
              onPress={onInfoClick}
              className="absolute bottom-0 right-0 mr-2 bg-white rounded-full"
            >
              <Image
                source={icons.info}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="#000000"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default VideoPlayer;
