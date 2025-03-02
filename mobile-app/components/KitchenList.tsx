"use client"

import type { KitchenItem } from "@/types/kitchen"
import { motion } from "framer-motion"
import React from "react"


interface KitchenListProps {
  items: KitchenItem[]
  onRemoveItem: (id: string) => void
}

export default function KitchenList({ items, onRemoveItem }: KitchenListProps) {
  // Define border colors for different items
  const getBorderColor = (index: number) => {
    const colors = [
      "border-red-600", // AVOCADO
      "border-yellow-500", // BANANA
      "border-yellow-600", // CHICKEN
      "border-green-500", // TOMATO
      "border-emerald-700", // POTATO
      "border-emerald-700", // CARROT
    ]
    return colors[index % colors.length]
  }

  // Get text color based on days until spoiled
  const getSpoilageColor = (days: number) => {
    if (days <= 2) return "text-red-600"
    if (days <= 5) return "text-yellow-600"
    return "text-emerald-700"
  }

  return (
    <div className="space-y-3 px-2">
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No items in your kitchen</p>
      ) : (
        items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`flex justify-between items-center p-3 rounded-lg border-2 ${getBorderColor(index)} bg-white`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold text-xl">{item.name}</span>
            <div className="flex items-center gap-4">
              <span className={`font-bold text-2xl ${getSpoilageColor(item.daysUntilSpoiled)}`}>
                {item.daysUntilSpoiled}
              </span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
              
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}

