"use client"

import { useState } from "react"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, Download, ExternalLink } from "lucide-react"

const albums = [
  {
    title: "Electric Dreams",
    year: "2024",
    cover: "/album-cover-electric-dreams-neon-style.jpg",
    description: "Our latest album featuring 12 tracks of pure energy and innovation.",
    tracks: [
      { name: "Voltage Rising", duration: "3:45" },
      { name: "Neon Nights", duration: "4:12" },
      { name: "Thunder Strike", duration: "3:28" },
      { name: "Electric Dreams", duration: "5:03" },
    ],
  },
  {
    title: "Pulse of the City",
    year: "2022",
    cover: "/album-cover-pulse-city-urban-rock.jpg",
    description: "An exploration of urban energy and metropolitan rhythms.",
    tracks: [
      { name: "City Lights", duration: "3:33" },
      { name: "Concrete Jungle", duration: "4:01" },
      { name: "Rush Hour", duration: "3:17" },
      { name: "Midnight Drive", duration: "4:45" },
    ],
  },
  {
    title: "First Spark",
    year: "2020",
    cover: "/album-cover-first-spark-debut-rock.jpg",
    description: "Our debut album that started it all - raw, powerful, and authentic.",
    tracks: [
      { name: "Ignition", duration: "3:22" },
      { name: "Breaking Free", duration: "3:55" },
      { name: "First Spark", duration: "4:18" },
      { name: "Revolution", duration: "3:41" },
    ],
  },
]

const videos = [
  {
    title: "Electric Dreams - Official Music Video",
    thumbnail: "/music-video-electric-dreams-performance.jpg",
    duration: "4:12",
    views: "2.3M",
  },
  {
    title: "Live at Electric Arena - Full Concert",
    thumbnail: "/live-concert-electric-arena-full-show.jpg",
    duration: "1:45:30",
    views: "890K",
  },
  {
    title: "Behind the Scenes - Studio Sessions",
    thumbnail: "/behind-scenes-studio-recording-session.jpg",
    duration: "12:45",
    views: "456K",
  },
  {
    title: "Neon Nights - Acoustic Version",
    thumbnail: "/acoustic-version-neon-nights-intimate.jpg",
    duration: "3:58",
    views: "1.1M",
  },
]

export default function MusicPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"albums" | "videos">("albums")

  const togglePlay = (trackName: string) => {
    if (currentlyPlaying === trackName) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(trackName)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary neon-text mb-6">Music & Media</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Dive into our sonic universe. Stream our latest tracks, watch exclusive videos, and experience the energy
            that defines Electric Pulse.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4">
            <Button
              variant={activeTab === "albums" ? "default" : "outline"}
              onClick={() => setActiveTab("albums")}
              className={activeTab === "albums" ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
            >
              Albums & Tracks
            </Button>
            <Button
              variant={activeTab === "videos" ? "default" : "outline"}
              onClick={() => setActiveTab("videos")}
              className={activeTab === "videos" ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
            >
              Videos
            </Button>
          </div>
        </div>
      </section>

      {/* Albums Section */}
      {activeTab === "albums" && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {albums.map((album, albumIndex) => (
              <Card
                key={albumIndex}
                className="bg-card border-border hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Album Cover */}
                    <div className="lg:col-span-1">
                      <div className="relative group">
                        <img
                          src={album.cover || "/placeholder.svg"}
                          alt={album.title}
                          className="w-full aspect-square object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/80 text-primary-foreground pulse-glow"
                          >
                            <Play className="h-6 w-6 mr-2" />
                            Play Album
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Album Info & Tracks */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">{album.title}</h3>
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                            {album.year}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{album.description}</p>
                      </div>

                      {/* Track List */}
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground mb-4">Track List</h4>
                        {album.tracks.map((track, trackIndex) => (
                          <div
                            key={trackIndex}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => togglePlay(`${album.title}-${track.name}`)}
                                className="h-8 w-8 p-0 hover:bg-primary/20"
                              >
                                {currentlyPlaying === `${album.title}-${track.name}` ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <span className="font-medium text-foreground">{track.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-muted-foreground text-sm">{track.duration}</span>
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Album Actions */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Stream Now
                        </Button>
                        <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Spotify
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Videos Section */}
      {activeTab === "videos" && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <Card
                  key={index}
                  className="group hover:scale-105 transition-all duration-300 bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground pulse-glow">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-muted-foreground text-sm">{video.views} views</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <BandFooter />
    </div>
  )
}
