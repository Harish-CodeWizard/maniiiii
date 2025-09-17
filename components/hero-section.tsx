"use client"

import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/energetic-rock-band-performing-on-stage-with-drama.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-background/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-accent neon-text">NEON</span>
          <span className="block text-secondary neon-text">PULSE</span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          {"Experience the electrifying energy of live rock music. Join us on our world tour."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold text-lg px-8 py-4 pulse-glow group"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Latest Video
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold text-lg px-8 py-4 transition-all duration-300 bg-transparent"
          >
            <Calendar className="mr-2 h-5 w-5" />
            View Tour Dates
          </Button>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
