import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";
import useAppwrite from "../../hooks/useAppwrite";
import { getFavoritePosts } from "../../lib/appwrite";
import { FlatList, RefreshControl } from "react-native";
import { EmptyList, Loader, VideoCard } from "../../components";
import { useState } from "react";

const Favorites = () => {
  const { isLoggedIn, user } = useGlobalContext();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getFavoritePosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  if (!isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCard video={item} />}
            ListEmptyComponent={() => (
              <EmptyList
                title="No Videos Found"
                subtitle="No videos found for this profile"
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </>
    </SafeAreaView>
  );
};

export default Favorites;
