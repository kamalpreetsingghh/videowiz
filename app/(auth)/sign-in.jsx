import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";

const SignIn = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const onEmailChange = (newValue) => {
    setEmail(newValue);
    if (newValue === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const onPasswordChange = (newValue) => {
    setPassword(newValue);
    if (newValue === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const submit = async () => {
    if (!isValidForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await signIn(email, password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error.message);
      setPasswordError("Incorrect Email or Password");
    } finally {
      setSubmitting(false);
    }
  };

  const isValidForm = () => {
    let isError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email Address");
      isError = true;
    }

    if (email === "") {
      setEmailError("Email is required");
      isError = true;
    }

    if (password === "") {
      setPasswordError("Password is required");
      isError = true;
    }

    return !isError;
  };

  return (
    <SafeAreaView className="bg-primary-light dark:bg-primary-dark h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[80vh] px-4 my-6">
          <View className="justify-start w-full absolute top-0 left-0 mx-4">
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.navigate("/home");
                }
              }}
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
          <Text className="text-4xl font-semibold text-surface-light dark:text-surface-dark mt-10 font-psemibold">
            Lets Sign you in
          </Text>

          <Text className="text-2xl font-semibold text-surface-light dark:text-surface-dark mt-6 font-plight">
            Welcome back,{"\n"}
            you have been missed
          </Text>

          <FormField
            placeholder="Email"
            value={email}
            handleChangeText={(e) => onEmailChange(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
            errorMessage={emailError}
          />

          <FormField
            placeholder="Password"
            value={password}
            handleChangeText={(e) => onPasswordChange(e)}
            isPassword={true}
            otherStyles="mt-4"
            errorMessage={passwordError}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-4"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-light dark:text-gray-dark font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
