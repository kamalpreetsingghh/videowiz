import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  isPassword = false,
  errorMessage = "",
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && (
        <Text className="text-base text-surface-light dark:text-surface-dark font-pregular">
          {title}
        </Text>
      )}

      <View
        className="w-full h-14 px-4 mb-4 bg-container-light dark:bg-container-dark rounded-full 
       flex flex-row items-center"
      >
        <TextInput
          className="flex-1 text-surface-light dark:text-surface-dark font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text className="text-red-600 pl-4 absolute bottom-0 left-0">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormField;
