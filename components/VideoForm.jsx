import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { icons } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { createVideoPost, updateVideoPost } from "../lib/appwrite";
import { router } from "expo-router";

const VideoForm = ({
  user,
  formType = "Upload",
  videoId,
  videoTitle = "",
  videoPrompt = "",
  videoThumbnail = null,
  videoUrl = null,
}) => {
  const [title, setTitle] = useState(videoTitle);
  const [prompt, setPrompt] = useState(videoPrompt);
  const [thumbnail, setThumbnail] = useState(videoThumbnail);
  const [video, setVideo] = useState(videoUrl);

  const [isThumbnailUpdate, setIsThumbnailUpdate] = useState(false);
  const [isVideoUpdate, setIsVideoUpdate] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [promptError, setPromptError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [videoError, setVideoError] = useState("");

  const onTitleChange = (newValue) => {
    setTitle(newValue);
    if (newValue === "") {
      setTitleError("Title is required");
    } else {
      setTitleError("");
    }
  };

  const onPromptChange = (newValue) => {
    setPrompt(newValue);
    if (newValue === "") {
      setPromptError("Prompt is required");
    } else {
      setPromptError("");
    }
  };

  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setThumbnail(result.assets[0]);
        setThumbnailError("");
        if (formType === "Update") {
          setIsThumbnailUpdate(true);
        }
      }

      if (selectType === "video") {
        setVideo(result.assets[0]);
        setVideoError("");
        if (formType === "Update") {
          setIsVideoUpdate(true);
        }
      }
    }
  };

  const submit = async () => {
    if (!isValidForm()) {
      return;
    }

    setUploading(true);

    try {
      if (formType === "Upload") {
        await createVideoPost(title, prompt, video, thumbnail, user.$id);

        Alert.alert("Success", "Post uploaded successfully");
        router.push("/home");
      } else {
        if (isThumbnailUpdate && isVideoUpdate) {
          await updateVideoPost(videoId, title, prompt, video, thumbnail);
        }

        if (isThumbnailUpdate) {
          await updateVideoPost(videoId, title, prompt, null, thumbnail);
        }

        if (isVideoUpdate) {
          await updateVideoPost(videoId, title, prompt, video, null);
        }

        if (!isThumbnailUpdate && !isVideoUpdate) {
          await updateVideoPost(videoId, title, prompt, null, null);
        }

        Alert.alert("Success", "Post updated successfully");
        router.push("/home");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setTitle("");
      setPrompt("");
      setVideo(null);
      setThumbnail(null);
      setUploading(false);
    }
  };

  const isValidForm = () => {
    let isError = false;

    if (title === "") {
      setTitleError("Title is required");
      isError = true;
    }

    if (prompt === "") {
      setPromptError("Prompt is required");
      isError = true;
    }

    if (!video) {
      setVideoError("Video is required");
      isError = true;
    }

    if (!thumbnail) {
      setThumbnailError("Thumbnail is required");
      isError = true;
    }

    return !isError;
  };

  return (
    <ScrollView className="px-4">
      <Text className="mt-4 pl-2 text-2xl text-surface-light dark:text-surface-dark font-psemibold">
        {formType} Video
      </Text>

      <FormField
        value={title}
        placeholder="Video Title"
        handleChangeText={(e) => onTitleChange(e)}
        otherStyles="mt-6"
        errorMessage={titleError}
      />

      <View className="mt-4 space-y-2">
        <View className="mb-4">
          {formType === "Upload" ? (
            <TouchableOpacity onPress={() => openPicker("video")}>
              {video ? (
                <Video
                  source={{ uri: video.uri }}
                  className="w-full h-40 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <View className="w-full h-40 px-4 bg-container-light dark:bg-container-dark rounded-2xl flex justify-center items-center">
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    alt="upload"
                    className="w-10 h-10"
                    tintColor="#FF9D00"
                  />
                  <Text className="text-sm mt-4 text-gray-500 font-pmedium">
                    Select a video
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openPicker("video")}>
              {video ? (
                <Video
                  source={{ uri: isVideoUpdate ? video.uri : video }}
                  className="w-full h-40 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <View className="w-full h-40 px-4 bg-container-light dark:bg-container-dark rounded-2xl flex justify-center items-center">
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    alt="upload"
                    className="w-10 h-10"
                    tintColor="#FF9D00"
                  />
                  <Text className="text-sm mt-4 text-gray-500 font-pmedium">
                    Select a video
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
        {videoError && (
          <Text className="text-red-600 pl-4 absolute bottom-0 left-0">
            {videoError}
          </Text>
        )}
      </View>

      <View className="mt-4 space-y-2">
        <View className="mb-4">
          {formType === "Upload" ? (
            <TouchableOpacity onPress={() => openPicker("image")}>
              {thumbnail ? (
                <Image
                  source={{ uri: thumbnail.uri }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-2xl"
                />
              ) : (
                <View className="w-full h-40 px-4 relative bg-container-light dark:bg-container-dark rounded-2xl flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-10 h-10"
                  />
                  <Text className="text-sm mt-4 text-gray-500 font-pmedium">
                    Select a thumbnail
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openPicker("image")}>
              {thumbnail ? (
                <Image
                  source={{
                    uri: isThumbnailUpdate ? thumbnail.uri : thumbnail,
                  }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-2xl"
                />
              ) : (
                <View className="w-full h-40 px-4 relative bg-container-light dark:bg-container-dark rounded-2xl flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-10 h-10"
                  />
                  <Text className="text-sm mt-4 text-gray-500 font-pmedium">
                    Select a thumbnail
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>

        {thumbnailError && (
          <Text className="text-red-600 pl-4 absolute bottom-0 left-0">
            {thumbnailError}
          </Text>
        )}
      </View>

      <FormField
        value={prompt}
        placeholder="The AI prompt of your video...."
        handleChangeText={(e) => onPromptChange(e)}
        otherStyles="mt-4"
        errorMessage={promptError}
      />

      <CustomButton
        title={formType}
        handlePress={submit}
        containerStyles="mt-4"
        isLoading={uploading}
      />
    </ScrollView>
  );
};

export default VideoForm;
