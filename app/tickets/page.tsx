import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary neon-text">
                Tickets Not Available
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We're sorry, but ticket sales are currently not available. Please check back later for updates on upcoming shows.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Stay tuned for announcements about our next tour dates and ticket releases.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BandFooter />
    </div>
  )
}