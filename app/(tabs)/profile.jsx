import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect, router } from "expo-router";
import useAppwrite from "../../hooks/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { EmptyList, InfoContainer, Loader, VideoCard } from "../../components";
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants";
import { useState } from "react";

const Profile = () => {
  const { user, isLoggedIn, isLoading, setUser, setIsLoggedIn } =
    useGlobalContext();
  const {
    data: posts,
    isLoading: isProfileLoading,
    refetch,
  } = useAppwrite(() => getUserPosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  if (!isLoggedIn && !isLoading) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      {isProfileLoading || isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
              video={item}
              user={user}
              isProfileScreen={true}
              onRefresh={onRefresh}
            />
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
            <EmptyList title="No videos found for your profile" />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
