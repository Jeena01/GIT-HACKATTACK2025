"use client"

import { useState } from "react"
import React from 'react'
import KitchenList from "@/components/KitchenList"
import CameraModal from "@/components/CameraLink"
import BottomNavigation from "@/components/Bottom-Nav"
import type { KitchenItem } from "@/types/kitchen"

export default function Home() {
  const [showCamera, setShowCamera] = useState(false)
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([
    { id: "1", name: "AVOCADO", daysUntilSpoiled: 1 },
    { id: "2", name: "BANANA", daysUntilSpoiled: 2 },
    { id: "3", name: "CHICKEN", daysUntilSpoiled: 3 },
    { id: "4", name: "TOMATO", daysUntilSpoiled: 8 },
    { id: "5", name: "POTATO", daysUntilSpoiled: 15 },
    { id: "6", name: "CARROT", daysUntilSpoiled: 15 },
  ])

  const handleCameraClick = () => {
    setShowCamera(true)
  }

  const handleCloseCamera = () => {
    setShowCamera(false)
  }

  const handleAddItem = (item: KitchenItem) => {
    setKitchenItems([...kitchenItems, { ...item, id: Date.now().toString() }])
    setShowCamera(false)
  }

  const handleRemoveItem = (id: string) => {
    setKitchenItems(kitchenItems.filter((i) => i.id !== id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-md flex flex-col h-screen">
        <div className="p-4 bg-white flex-1 overflow-hidden flex flex-col">
          <h1 className="text-4xl font-bold text-center text-emerald-800 mb-4">MY KITCHEN</h1>
          <div className="flex-1 overflow-auto">
            <KitchenList items={kitchenItems} onRemoveItem={handleRemoveItem} />
          </div>
        </div>
        <BottomNavigation OnCameraClick={handleCameraClick} />
      </div>

      {showCamera && <CameraModal onClose={handleCloseCamera} onAddItem={handleAddItem} />}
    </main>
  )
}

