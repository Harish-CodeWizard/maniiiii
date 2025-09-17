"use client"

import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

const upcomingShows = [
  {
    date: "2024-03-15",
    venue: "Electric Arena",
    city: "Los Angeles, CA",
    time: "8:00 PM",
    capacity: "15,000",
    status: "On Sale",
    price: "$45 - $125",
    image: "/concert-venue-electric-arena-los-angeles.jpg",
    description:
      "Join us for an electrifying night at the iconic Electric Arena. This show promises to be our biggest production yet with stunning visuals and all your favorite hits.",
  },
  {
    date: "2024-03-22",
    venue: "Neon Palace",
    city: "New York, NY",
    time: "7:30 PM",
    capacity: "8,500",
    status: "Selling Fast",
    price: "$55 - $150",
    image: "/concert-venue-neon-palace-new-york.jpg",
    description:
      "Experience the energy of Electric Pulse in the heart of NYC. Special guest appearances and exclusive merchandise available.",
  },
  {
    date: "2024-03-29",
    venue: "Thunder Dome",
    city: "Chicago, IL",
    time: "8:30 PM",
    capacity: "12,000",
    status: "On Sale",
    price: "$40 - $110",
    image: "/concert-venue-thunder-dome-chicago.jpg",
    description:
      "Our Chicago debut! Don't miss this historic performance featuring songs from our latest album 'Electric Dreams'.",
  },
  {
    date: "2024-04-05",
    venue: "Voltage Stadium",
    city: "Austin, TX",
    time: "9:00 PM",
    capacity: "20,000",
    status: "VIP Only",
    price: "$65 - $200",
    image: "/concert-venue-voltage-stadium-austin.jpg",
    description:
      "The biggest show of our tour! Join us for an unforgettable night under the Texas stars with special effects and surprises.",
  },
  {
    date: "2024-04-12",
    venue: "Crystal Ballroom",
    city: "Portland, OR",
    time: "7:00 PM",
    capacity: "1,500",
    status: "Sold Out",
    price: "Sold Out",
    image: "/concert-venue-crystal-ballroom-portland.jpg",
    description:
      "An intimate acoustic set in Portland's legendary Crystal Ballroom. This rare acoustic performance sold out in minutes.",
  },
  {
    date: "2024-04-19",
    venue: "Pulse Festival",
    city: "Miami, FL",
    time: "10:00 PM",
    capacity: "50,000",
    status: "Festival Pass",
    price: "$89 - $299",
    image: "/festival-pulse-miami-main-stage.jpg",
    description:
      "Headlining the main stage at Pulse Festival! Three days of music, art, and unforgettable experiences by the beach.",
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "On Sale":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "Selling Fast":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "VIP Only":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "Sold Out":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "Festival Pass":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-secondary/20 text-secondary border-secondary/30"
  }
}

export default function TourPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary neon-text mb-6">
            Electric Dreams Tour 2024
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Experience the energy live! Join us on our biggest tour yet as we bring Electric Dreams to stages across the
            country. Don't miss your chance to be part of the electric experience.
          </p>
        </div>
      </section>

      {/* Tour Stats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary neon-text">15+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary neon-text">200K+</div>
              <div className="text-muted-foreground">Fans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary neon-text">6</div>
              <div className="text-muted-foreground">Months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary neon-text">Epic</div>
              <div className="text-muted-foreground">Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Upcoming Shows</h2>

          <div className="space-y-6">
            {upcomingShows.map((show, index) => (
              <Card
                key={index}
                className="group hover:border-primary/50 transition-all duration-300 bg-card border-border hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-4 gap-0">
                    {/* Show Image */}
                    <div className="lg:col-span-1">
                      <img
                        src={show.image || "/placeholder.svg?height=300&width=400&query=concert venue stage lights"}
                        alt={`${show.venue} - ${show.city}`}
                        className="w-full h-48 lg:h-full object-cover rounded-l-lg lg:rounded-r-none rounded-t-lg lg:rounded-t-lg"
                      />
                    </div>

                    {/* Show Details */}
                    <div className="lg:col-span-2 p-6">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">{show.venue}</h3>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{show.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(show.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{show.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(show.status)} border`}>{show.status}</Badge>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">{show.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Capacity: {show.capacity}</span>
                        </div>
                        <div className="font-semibold text-foreground">{show.price}</div>
                      </div>
                    </div>

                    {/* Ticket Actions */}
                    <div className="lg:col-span-1 p-6 flex flex-col justify-center space-y-3">
                      {show.status === "Sold Out" ? (
                        <Button disabled className="w-full bg-muted text-muted-foreground">
                          Sold Out
                        </Button>
                      ) : (
                        <>
                          <Link href="/login" className="w-full">
                            <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground pulse-glow">
                              Get Tickets
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Venue Info
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Never Miss a Show</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Be the first to know about new tour dates, presale tickets, and exclusive fan experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground px-8">Subscribe</Button>
          </div>
        </div>
      </section>

      <BandFooter />
    </div>
  )
}
