import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { getUserPosts, signOut } from "../lib/appwrite";
import { router } from "expo-router";
import { icons } from "../constants";
import EmptyList from "./EmptyList";
import InfoContainer from "./InfoContainer";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import useAppwrite from "../hooks/useAppwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const UserProfile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, isLoading } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item} user={user} isProfileScreen={true} />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                onPress={logout}
                className="flex w-full items-end mb-10"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-full flex justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-full"
                  resizeMode="cover"
                />
              </View>

              <InfoContainer
                title={user?.name}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />

              <View className="mt-5 flex flex-row">
                <InfoContainer
                  title={posts.length || 0}
                  subtitle="Posts"
                  titleStyles="text-xl"
                  containerStyles="mr-10"
                />
                <InfoContainer
                  title={`${(Math.random() * 100).toFixed(1)}k`}
                  subtitle="Followers"
                  titleStyles="text-xl"
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title="No Videos Found"
              subtitle="No videos found for this profile"
            />
          )}
        />
      )}
    </>
  );
};

export default UserProfile;
