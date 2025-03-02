import type React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { Feather, MaterialIcons } from "@expo/vector-icons"

// Types
interface FoodItem {
  name: string
  daysLeft: number
  color: string
}

interface FoodItemProps extends FoodItem {}

const FoodItem: React.FC<FoodItemProps> = ({ name, daysLeft, color }) => (
  <View style={[styles.foodItem, { borderColor: color }]}>
    <Text style={styles.foodName}>{name}</Text>
    <Text style={styles.daysLeft}>{daysLeft}</Text>
  </View>
)

export default function App() {
  const foodItems: FoodItem[] = [
    { name: "AVOCADO", daysLeft: 1, color: "#ff4444" }, // Red - urgent
    { name: "BANANA", daysLeft: 2, color: "#ffa000" }, // Orange - soon
    { name: "CHICKEN", daysLeft: 3, color: "#ffa000" }, // Orange - soon
    { name: "TOMATO", daysLeft: 8, color: "#4caf50" }, // Green - good
    { name: "POTATO", daysLeft: 15, color: "#4caf50" }, // Green - good
    { name: "CARROT", daysLeft: 15, color: "#ec407a" }, // Pink
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>MY KITCHEN</Text>
        <Text style={styles.subtitle}>Days until spoiled</Text>
      </View>

      <View style={styles.content}>
        {foodItems.map((item, index) => (
          <FoodItem key={index} name={item.name} daysLeft={item.daysLeft} color={item.color} />
        ))}
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.actionButton}>
          <Feather name="activity" size={24} color="white" />
        </View>
        <View style={styles.actionButton}>
          <Feather name="camera" size={24} color="white" />
        </View>
        <View style={styles.actionButton}>
          <MaterialIcons name="restaurant" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#005c45",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  content: {
    flex: 1,
    gap: 12,
    paddingTop: 10,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "white",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  daysLeft: {
    fontSize: 18,
    fontWeight: "700",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#005c45",
    alignItems: "center",
    justifyContent: "center",
  },
})

