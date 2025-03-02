"use client"

import React, { useState, useRef, useEffect } from "react"
import type { KitchenItem } from "@/types/kitchen"


interface CameraModalProps {
  onClose: () => void
  onAddItem: (item: KitchenItem) => void
}

export default function CameraModal({ onClose, onAddItem }: CameraModalProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [itemName, setItemName] = useState("")
  const [daysUntilSpoiled, setDaysUntilSpoiled] = useState(1)
  const [cameraError, setCameraError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Start camera when component mounts
    startCamera()

    // Clean up when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError(true)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && stream) {
      const canvas = canvasRef.current
      const video = videoRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/png")
        setCapturedImage(imageDataUrl)

        // In a real app, you would send this image to an API for food recognition
        // For demo purposes, we'll just show a form to manually enter the item
      }
    }
  }

  const handleAddItem = () => {
    if (itemName.trim()) {
      onAddItem({
        id: Date.now().toString(),
        name: itemName.toUpperCase(),
        daysUntilSpoiled: daysUntilSpoiled,
      })
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setItemName("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-4 bg-emerald-700 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Item to Kitchen</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200" aria-label="Close">

          </button>
        </div>

        <div className="p-4">
          {cameraError ? (
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">Camera access denied or not available</p>
              <p>Please enter item details manually:</p>
            </div>
          ) : capturedImage ? (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured food item"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="w-full p-2 border rounded-md"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="daysUntilSpoiled" className="block text-sm font-medium text-gray-700 mb-1">
                    Days Until Spoiled
                  </label>
                  <input
                    type="number"
                    id="daysUntilSpoiled"
                    value={daysUntilSpoiled}
                    onChange={(e) => setDaysUntilSpoiled(Number.parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={resetCapture}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center gap-2"
                  >
                
                    Retake
                  </button>

                  <button
                    onClick={handleAddItem}
                    className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md flex items-center justify-center gap-2"
                    disabled={!itemName.trim()}
                  >
                  
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <button
                onClick={captureImage}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md flex items-center justify-center gap-2"
              >
               
                Capture Item
              </button>

              <p className="text-sm text-gray-500 text-center">
                Take a photo of the food item you want to add to your kitchen
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

