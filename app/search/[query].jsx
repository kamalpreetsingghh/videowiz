import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSearchPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import { SearchField, EmptyList, VideoCard, Loader } from "../../components";
import { useEffect } from "react";
import { icons } from "../../constants";

const Search = () => {
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => getSearchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View className="p-4 justify-start w-full">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-[35px] h-[35px] items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50"
            >
              <Image
                source={icons.leftArrow}
                className="w-[25px] h-[25px] row-span-full"
                resizeMode="contain"
                tintColor="#FFA001"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCard video={item} />}
            ListHeaderComponent={() => (
              <View className="flex mt-6 mb-4 px-4">
                <Text className="font-pmedium text-sm text-surface-light dark:text-surface-dark">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-surface-light dark:text-surface-dark">
                  {query}
                </Text>
                <View className="my-4">
                  <SearchField initialQuery={query} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyList
                title="No Videos Found"
                subtitle="No videos found for this search query"
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;
