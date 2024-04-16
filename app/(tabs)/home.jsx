import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import {
  EmptyList,
  Loader,
  SearchField,
  Trending,
  VideoCard,
} from "../../components";
import { useState } from "react";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import useAppwrite from "../../hooks/useAppwrite";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-surface-light dark:text-surface-dark">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-surface-light dark:text-surface-dark">
                    {user?.name}
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchField />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-surface-light dark:text-surface-dark mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title="No Videos Found"
              subtitle="No videos created yet"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
