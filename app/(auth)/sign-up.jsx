import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { CustomButton, FormField } from "../../components";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onNameChange = (newValue) => {
    setName(newValue);
    if (newValue === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

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

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!isValidForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await createUser(name, email, password);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isValidForm = () => {
    let isError = false;

    if (name === "") {
      setNameError("Name is required");
      isError = true;
    }

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
          <Text className="text-4xl font-semibold text-surface-light dark:text-surface-dark mt-10 font-psemibold">
            Lets get you started
          </Text>

          <Text className="text-2xl font-semibold text-surface-light dark:text-surface-dark mt-6 font-plight">
            Hi there, Embark on a journey of boundless creativity with Al.
          </Text>

          <FormField
            placeholder="Name"
            value={name}
            handleChangeText={(e) => onNameChange(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
            errorMessage={nameError}
          />

          <FormField
            placeholder="Email"
            value={email}
            handleChangeText={(e) => onEmailChange(e)}
            otherStyles="mt-4"
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
            title="Create Account"
            handlePress={submit}
            containerStyles="mt-4"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-light dark:text-gray-dark font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
