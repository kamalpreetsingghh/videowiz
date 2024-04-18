import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";
import FavoriteVideos from "../../components/FavoriteVideos";

const Favorites = () => {
  const { isLoggedIn, user } = useGlobalContext();

  if (!isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <FavoriteVideos userId={user.$id} />
    </SafeAreaView>
  );
};

export default Favorites;
