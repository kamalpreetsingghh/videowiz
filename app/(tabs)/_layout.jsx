import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { TabIcon } from "../../components";
import { useColorScheme } from "react-native";

const TabsLayout = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: isDarkMode ? "#bfbfbf" : "#8f8f8f",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
          borderTopWidth: 0.5,
          borderTopColor: isDarkMode ? "#1e1e1e" : "#e7e7e7",
          height: 76,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.favorite}
              color={color}
              name="Favorites"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
