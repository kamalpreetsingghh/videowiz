import { View, Text } from "react-native";

const InfoContainer = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text
        className={`text-surface-light dark:text-surface-dark text-center font-psemibold ${titleStyles}`}
      >
        {title}
      </Text>
      <Text className="text-sm text-surface-light dark:text-surface-dark text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoContainer;
