import { Redirect } from "expo-router";
import { Loader, VideoForm } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      {isLoading ? <Loader /> : <VideoForm user={user} />}
    </SafeAreaView>
  );
};

export default Create;
