import { TouchableOpacity, Image } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../constants";
import { router } from "expo-router";

const VideoPlayer = ({
  play,
  setPlay,
  videoId,
  title,
  prompt,
  thumbnail,
  video,
  showInfo = true,
  isLoggedUserVideo = false,
}) => {
  if (play)
    return (
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
    );

  return (
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

      {showInfo && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/info/${videoId}`,
              params: {
                title,
                prompt,
                thumbnail,
                video,
                isLoggedUserVideo,
              },
            })
          }
          className="absolute top-0 right-0 mt-4 mr-3 bg-white rounded-full"
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
  );
};

export default VideoPlayer;
