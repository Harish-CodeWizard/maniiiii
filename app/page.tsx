import { BandNavigation } from "@/components/band-navigation"
import { HeroSection } from "@/components/hero-section"
import { ConcertCard } from "@/components/concert-card"
import { GalleryGrid } from "@/components/gallery-grid"
import { BandFooter } from "@/components/band-footer"
import { NeonButton } from "@/components/neon-button"
import Link from "next/link"

const upcomingShows = [
  {
    date: "Dec 15, 2024",
    venue: "Electric Arena",
    city: "Los Angeles, CA",
    time: "8:00 PM",
    ticketUrl: "#",
  },
  {
    date: "Dec 22, 2024",
    venue: "Neon Palace",
    city: "New York, NY",
    time: "9:00 PM",
    soldOut: true,
  },
  {
    date: "Jan 5, 2025",
    venue: "Pulse Stadium",
    city: "Chicago, IL",
    time: "7:30 PM",
    ticketUrl: "#",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      <HeroSection />

      {/* Tour Dates Section */}
      <section id="upcoming-shows" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Link href="/tour">
              <h2 className="text-3xl sm:text-4xl font-bold text-accent neon-text mb-4 cursor-pointer hover:text-accent/80 transition-colors">Upcoming Shows</h2>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {"Experience the energy live. Get your tickets now."}
            </p>
          </div>

          <div className="space-y-4">
            {upcomingShows.map((show, index) => (
              <ConcertCard key={index} {...show} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/tour">
              <NeonButton variant="secondary" size="lg">
                View All Tour Dates
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary neon-text mb-4">Live Gallery</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {"Moments captured from our electrifying performances."}
            </p>
          </div>

          <GalleryGrid />
        </div>
      </section>

      <BandFooter />
    </div>
  )
}
