import React from 'react'



interface BottomNav {
  OnCameraClick: () => void
}

export default function BottomNavigation({ OnCameraClick }: BottomNav) {
  return (
    <div className="w-full bg-emerald-700 p-4 flex justify-around items-center">
      <button
        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center"
        aria-label="Health"
      >
      </button>

      <button
        onClick={OnCameraClick}
        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center"
        aria-label="Camera"
      >
      </button>

      <button
        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center"
        aria-label="Recipes"
      >
      </button>
    </div>
  )
}

