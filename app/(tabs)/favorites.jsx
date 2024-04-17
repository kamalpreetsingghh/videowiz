import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";

const Favorites = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <Text>Favorites</Text>
    </SafeAreaView>
  );
};

export default Favorites;
