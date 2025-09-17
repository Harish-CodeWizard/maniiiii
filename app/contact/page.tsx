"use client"

import type React from "react"

import { useState } from "react"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Clock, Instagram, Twitter, Facebook, Youtube, Music, Calendar, Users, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "General Inquiries",
    details: "info@electricpulseband.com",
    description: "For general questions and fan mail",
  },
  {
    icon: Calendar,
    title: "Booking & Events",
    details: "booking@electricpulseband.com",
    description: "Concert bookings and event inquiries",
  },
  {
    icon: Music,
    title: "Press & Media",
    details: "press@electricpulseband.com",
    description: "Interview requests and media kits",
  },
  {
    icon: Users,
    title: "Management",
    details: "management@electricpulseband.com",
    description: "Business partnerships and collaborations",
  },
]

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@electricpulseband",
    url: "#",
    color: "hover:text-pink-400",
  },
  {
    icon: Twitter,
    name: "Twitter",
    handle: "@electricpulse",
    url: "#",
    color: "hover:text-blue-400",
  },
  {
    icon: Facebook,
    name: "Facebook",
    handle: "Electric Pulse Official",
    url: "#",
    color: "hover:text-blue-600",
  },
  {
    icon: Youtube,
    name: "YouTube",
    handle: "Electric Pulse Music",
    url: "#",
    color: "hover:text-red-500",
  },
]

const inquiryTypes = [
  "General Inquiry",
  "Booking Request",
  "Press/Media",
  "Collaboration",
  "Fan Mail",
  "Technical Support",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
    eventDate: "",
    venue: "",
    budget: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
        eventDate: "",
        venue: "",
        budget: "",
      })
    }, 3000)
  }

  const isBookingInquiry = formData.inquiryType === "Booking Request"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary neon-text mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ready to bring the electric energy to your event? Have questions about our music? We'd love to hear from
            you. Reach out and let's make something amazing happen.
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thanks for reaching out. We'll get back to you within 24-48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-background border-border text-foreground"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-foreground">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-background border-border text-foreground"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-foreground">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-background border-border text-foreground"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="inquiryType" className="text-foreground">
                            Inquiry Type *
                          </Label>
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select type</option>
                            {inquiryTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {isBookingInquiry && (
                        <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                          <div>
                            <Label htmlFor="eventDate" className="text-foreground">
                              Event Date
                            </Label>
                            <Input
                              id="eventDate"
                              name="eventDate"
                              type="date"
                              value={formData.eventDate}
                              onChange={handleInputChange}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div>
                            <Label htmlFor="venue" className="text-foreground">
                              Venue/Location
                            </Label>
                            <Input
                              id="venue"
                              name="venue"
                              value={formData.venue}
                              onChange={handleInputChange}
                              className="bg-background border-border text-foreground"
                              placeholder="Venue name or city"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Label htmlFor="budget" className="text-foreground">
                              Budget Range
                            </Label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="">Select budget range</option>
                              <option value="under-5k">Under $5,000</option>
                              <option value="5k-10k">$5,000 - $10,000</option>
                              <option value="10k-25k">$10,000 - $25,000</option>
                              <option value="25k-50k">$25,000 - $50,000</option>
                              <option value="50k-plus">$50,000+</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="subject" className="text-foreground">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border text-foreground"
                          placeholder="Brief subject line"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-foreground">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="bg-background border-border text-foreground resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground pulse-glow"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon
                    return (
                      <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{info.title}</h3>
                              <p className="text-primary font-medium">{info.details}</p>
                              <p className="text-muted-foreground text-sm">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Office Hours */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Response Times</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">General Inquiries:</span> 24-48 hours
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Booking Requests:</span> 2-5 business days
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Press/Media:</span> Same day (weekdays)
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Emergency:</span> Call management directly
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Follow Us</h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <Card
                        key={index}
                        className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <IconComponent
                              className={`h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors ${social.color}`}
                            />
                            <div>
                              <p className="font-medium text-foreground">{social.name}</p>
                              <p className="text-sm text-muted-foreground">{social.handle}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Location */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Based In</h3>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Los Angeles, California</p>
                    <p>Available for worldwide bookings</p>
                    <p className="text-sm mt-2">
                      We're based on the West Coast but love to travel. Distance is no barrier to bringing our electric
                      energy to your event.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <BandFooter />
    </div>
  )
}
