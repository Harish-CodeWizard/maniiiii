"use client"

import { Button } from "@/components/ui/button"
import { Music, Instagram, Twitter, Youtube, Facebook } from "lucide-react"

export function BandFooter() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ]

  const footerLinks = [
    { title: "Music", items: ["Albums", "Singles", "Streaming"] },
    { title: "Tour", items: ["Dates", "Venues", "VIP Packages"] },
    { title: "Band", items: ["About", "Members", "Press Kit"] },
    { title: "Contact", items: ["Booking", "Press", "Support"] },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-accent neon-text">NEON PULSE</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {"Electrifying rock music that ignites the soul. Join our journey through sound and energy."}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="border-border hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground font-bold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">Get the latest news, tour dates, and exclusive content.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2024 Neon Pulse. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
