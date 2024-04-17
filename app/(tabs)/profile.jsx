import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfile } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";

const Profile = () => {
  const { isLoggedIn, isLoading } = useGlobalContext();

  if (!isLoggedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <UserProfile />
    </SafeAreaView>
  );
};

export default Profile;
