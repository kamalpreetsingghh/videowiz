import { Redirect } from "expo-router";
import { CreatePost, Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      {isLoading ? <Loader /> : <CreatePost user={user} />}
    </SafeAreaView>
  );
};

export default Create;
