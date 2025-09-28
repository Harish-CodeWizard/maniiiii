"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User, CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const isTicketBooking = searchParams.get('tickets') === 'true'

  const [isSignUp, setIsSignUp] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const ticketOptions = [
    { id: 'golden', name: 'Golden Ticket', price: '$150', description: 'VIP access, meet & greet, exclusive merchandise' },
    { id: 'platinum', name: 'Platinum Ticket', price: '$120', description: 'Premium seating, backstage pass, special edition merch' },
    { id: 'standard', name: 'Standard Ticket', price: '$75', description: 'Great seating, concert access, digital program' },
    { id: 'economy', name: 'Economy Ticket', price: '$45', description: 'General admission, concert access' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isTicketBooking) {
      // Handle ticket booking
      if (!selectedTicket) {
        alert('Please select a ticket type')
        return
      }

      try {
        const response = await fetch('/api/book-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketType: selectedTicket }),
        })

        if (response.ok) {
          setBookingConfirmed(true)
        } else {
          const data = await response.json()
          alert(data.error || 'Booking failed')
        }
      } catch (error) {
        console.error('Booking error:', error)
        alert('An error occurred while booking. Please try again.')
      }
      return
    }

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login'
      const body = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        if (!isSignUp) {
          // Store token for logged in user
          localStorage.setItem('token', data.token)
          // Redirect to home or dashboard
          window.location.href = '/'
        } else {
          // Switch to login after signup
          setIsSignUp(false)
          setFormData({ email: formData.email, password: '', name: '' })
        }
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                {bookingConfirmed ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <User className="h-8 w-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-primary neon-text">
                {bookingConfirmed ? "Booking Confirmed!" : isTicketBooking ? "Book Your Tickets" : (isSignUp ? "Join the Band" : "Welcome Back")}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {bookingConfirmed ? "Your tickets have been successfully booked. Check your email for details." : isTicketBooking ? "Select your ticket type and complete your booking" : (isSignUp ? "Create your account to get exclusive access to tickets and content" : "Sign in to access exclusive content and purchase tickets")}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {bookingConfirmed ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Thank you for booking with Electric Pulse! We're excited to see you at the show.
                  </p>
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              ) : isTicketBooking ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <Label className="text-foreground text-lg font-semibold">Select Your Ticket Type</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {ticketOptions.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedTicket === ticket.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-foreground">{ticket.name}</h3>
                              <p className="text-sm text-muted-foreground">{ticket.description}</p>
                            </div>
                            <span className="text-lg font-bold text-primary">{ticket.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 pulse-glow"
                  >
                    Book Tickets
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 bg-input border-border focus:border-primary"
                          required={isSignUp}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-input border-border focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 bg-input border-border focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 pulse-glow"
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </form>
              )}

              {!isTicketBooking && !bookingConfirmed && (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-muted-foreground">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-border hover:bg-muted bg-transparent"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
                  </Button>
                </div>
              )}

              {!isTicketBooking && !bookingConfirmed && (
                <div className="text-center">
                  <Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BandFooter />
    </div>
  )
}
