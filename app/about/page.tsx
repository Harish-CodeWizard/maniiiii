import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Guitar, Mic, Drum } from "lucide-react"

const bandMembers = [
  {
    name: "Alex Thunder",
    role: "Lead Vocals & Guitar",
    bio: "The driving force behind our sound, Alex brings raw energy and powerful vocals that ignite every performance.",
    icon: <Mic className="h-6 w-6" />,
    image: "/rock-singer-with-guitar-energetic-performance.jpg",
  },
  {
    name: "Maya Storm",
    role: "Bass & Backing Vocals",
    bio: "Maya's thunderous bass lines and harmonious backing vocals create the foundation that moves crowds.",
    icon: <Music className="h-6 w-6" />,
    image: "/female-bass-player-rock-concert-stage-lights.jpg",
  },
  {
    name: "Jake Lightning",
    role: "Lead Guitar",
    bio: "Jake's electrifying solos and intricate riffs define our signature sound with technical mastery and passion.",
    icon: <Guitar className="h-6 w-6" />,
    image: "/lead-guitarist-electric-guitar-solo-stage-performa.jpg",
  },
  {
    name: "Sam Pulse",
    role: "Drums & Percussion",
    bio: "Sam's explosive drumming and rhythmic precision provide the heartbeat that drives our high-energy performances.",
    icon: <Drum className="h-6 w-6" />,
    image: "/drummer-performing-energetic-rock-concert-stage.jpg",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary neon-text mb-6">
            About Electric Pulse
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Born from the underground music scene, Electric Pulse emerged as a force of raw energy and unbridled
            passion. We're not just a band – we're a movement that electrifies audiences and pushes the boundaries of
            modern rock.
          </p>
        </div>
      </section>

      {/* Band Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary neon-text mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Electric Pulse was formed in 2019 when four musicians from different backgrounds collided in a small
                  underground venue. What started as a jam session turned into an explosive chemistry that couldn't be
                  contained.
                </p>
                <p>
                  Our sound blends classic rock foundations with modern electronic elements, creating a unique sonic
                  experience that resonates with both longtime rock fans and new generation listeners.
                </p>
                <p>
                  With three studio albums and countless live performances, we've built a reputation for delivering
                  high-energy shows that leave audiences craving more. Our mission is simple: create music that moves
                  people and performances that create lasting memories.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  3 Studio Albums
                </Badge>
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                  200+ Live Shows
                </Badge>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
                  Est. 2019
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/rock-band-performing-on-stage-with-dramatic-lighti.jpg"
                alt="Electric Pulse performing live"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary neon-text mb-4">Meet the Band</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Four unique talents united by a shared passion for creating electrifying music experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-300 bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 p-2 rounded-full text-primary-foreground">
                      {member.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>

                  <Badge variant="outline" className="mb-4 border-secondary text-secondary">
                    {member.role}
                  </Badge>

                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary neon-text mb-12">Our Journey</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">2019</div>
              <div className="text-muted-foreground">Band Formation</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Monthly Listeners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Live Performances</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-muted-foreground">Studio Albums</div>
            </div>
          </div>
        </div>
      </section>

      <BandFooter />
    </div>
  )
}
