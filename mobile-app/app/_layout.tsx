import { Tabs } from "expo-router"
import { Stack } from "expo-router"
import { Feather, MaterialIcons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#005c45",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kitchen",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="kitchen" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => <Feather name="camera" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
