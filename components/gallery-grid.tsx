"use client"

import { useState } from "react"

interface GalleryItem {
  id: number
  src: string
  alt: string
  title: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/rock-band-performing-with-neon-lights-and-smoke-ef.jpg",
    alt: "Live performance with neon lights",
    title: "Electric Night Tour",
  },
  {
    id: 2,
    src: "/close-up-of-guitarist-with-purple-stage-lighting.jpg",
    alt: "Guitarist in purple lighting",
    title: "Guitar Solo Moment",
  },
  {
    id: 3,
    src: "/drummer-with-blue-neon-backdrop-and-energetic-crow.jpg",
    alt: "Drummer with blue neon backdrop",
    title: "Rhythm Section",
  },
  {
    id: 4,
    src: "/band-members-silhouetted-against-bright-stage-ligh.jpg",
    alt: "Band silhouettes against stage lights",
    title: "Stage Presence",
  },
  {
    id: 5,
    src: "/crowd-with-hands-up-at-rock-concert-with-colorful-.jpg",
    alt: "Energetic crowd at concert",
    title: "Fan Energy",
  },
  {
    id: 6,
    src: "/bass-player-with-neon-purple-and-blue-stage-effect.jpg",
    alt: "Bass player with neon effects",
    title: "Bass Lines",
  },
]

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedImage(item)}
          >
            <img
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-foreground font-bold text-lg neon-text">{item.title}</h3>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-lg transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-foreground hover:text-accent text-2xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
