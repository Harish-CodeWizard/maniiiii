"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConcertCardProps {
  date: string
  venue: string
  city: string
  time: string
  ticketUrl?: string
  soldOut?: boolean
}

export function ConcertCard({ date, venue, city, time, ticketUrl, soldOut }: ConcertCardProps) {
  const router = useRouter()

  const handleTicketClick = () => {
    if (soldOut) return
    router.push("/login")
  }

  return (
    <Card className="group hover:scale-105 transition-all duration-300 bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              <span className="font-bold text-lg">{date}</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{venue}</span>
              </div>
              <p className="text-muted-foreground ml-6">{city}</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            {soldOut ? (
              <Button disabled className="bg-muted text-muted-foreground cursor-not-allowed">
                Sold Out
              </Button>
            ) : (
              <Button
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold group-hover:pulse-glow transition-all duration-300"
                onClick={handleTicketClick}
              >
                Get Tickets
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
