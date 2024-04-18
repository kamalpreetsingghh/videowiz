import { FlatList } from "react-native";
import { getLikedPosts } from "../lib/appwrite";
import Loader from "./Loader";
import VideoCard from "./VideoCard";
import EmptyList from "./EmptyList";
import useAppwrite from "../hooks/useAppwrite";

const FavoriteVideos = ({ userId }) => {
  const { data: posts, isLoading } = useAppwrite(() => getLikedPosts(userId));

  return (
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
        />
      )}
    </>
  );
};

export default FavoriteVideos;
