import type React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

interface FoodItem {
  name: string
  quantity: number
  color: string
}

interface FoodItemProps extends FoodItem {}

interface ActionButtonProps {
  icon: keyof typeof Feather.glyphMap
}

const FoodItem: React.FC<FoodItemProps> = ({ name, quantity, color }) => (
  <View style={[styles.foodItem, { borderColor: color }]}>
    <Text style={styles.foodName}>{name}</Text>
    <Text style={styles.foodQuantity}>{quantity}</Text>
  </View>
)

// Action button component
const ActionButton: React.FC<ActionButtonProps> = ({ icon }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Feather name={icon} size={24} color="white" />
  </TouchableOpacity>
)

export default function App() {
  const foodItems: FoodItem[] = [
    { name: "AVOCADO", quantity: 1, color: "#ff4444" },
    { name: "BANANA", quantity: 2, color: "#ffbb33" },
    { name: "CHICKEN", quantity: 3, color: "#ffbb33" },
    { name: "TOMATO", quantity: 8, color: "#00C851" },
    { name: "POTATO", quantity: 15, color: "#00C851" },
    { name: "CARROT", quantity: 15, color: "#ff80ab" },
  ]

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>MY KITCHEN</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {foodItems.map((item, index) => (
          <FoodItem key={index} name={item.name} quantity={item.quantity} color={item.color} />
        ))}
      </ScrollView>

      <View style={styles.actionContainer}>
        <ActionButton icon="heart" />
        <ActionButton icon="camera" />
        <ActionButton icon="coffee" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d7a5d",
    textAlign: "center",
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodQuantity: {
    fontSize: 20,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2d7a5d",
    alignItems: "center",
    justifyContent: "center",
  },
})

