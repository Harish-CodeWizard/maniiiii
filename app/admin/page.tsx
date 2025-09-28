"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Ticket, Users, DollarSign, TrendingUp, ChevronDown, ChevronUp, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface TicketStats {
  golden: number
  platinum: number
  standard: number
  economy: number
  total: number
  revenue: number
  bookings: Array<{
    id: string
    ticketType: string
    timestamp: string
    price: number
    date: string
    time: string
  }>
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<TicketStats>({
    golden: 0,
    platinum: 0,
    standard: 0,
    economy: 0,
    total: 0,
    revenue: 0,
    bookings: [],
  })
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setCheckingAuth(false)
        return
      }

      const response = await fetch('/api/admin/check-access', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setIsAdmin(true)
        fetchTicketStats()
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAdmin(false)
    } finally {
      setCheckingAuth(false)
    }
  }

  const toggleExpanded = (ticketId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(ticketId)) {
      newExpanded.delete(ticketId)
    } else {
      newExpanded.add(ticketId)
    }
    setExpandedSections(newExpanded)
  }

  const fetchTicketStats = async () => {
    try {
      const response = await fetch('/api/admin/ticket-stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching ticket stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <BandNavigation />

        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary neon-text">
                  Access Denied
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  You need administrator privileges to access this page.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">Admin Access Required</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        This page is restricted to administrators only. Please log in with an admin account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/login">
                    <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                      Login as Admin
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <BandFooter />
      </div>
    )
  }

  const ticketTypes = [
    { id: 'golden', name: 'Golden Ticket', price: 150, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'platinum', name: 'Platinum Ticket', price: 120, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'standard', name: 'Standard Ticket', price: 75, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'economy', name: 'Economy Ticket', price: 45, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary neon-text mb-4">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">Monitor ticket sales and performance metrics</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets Sold</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{loading ? '...' : stats.total}</div>
                <p className="text-xs text-muted-foreground">All ticket types combined</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">${loading ? '...' : stats.revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total earnings from tickets</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  ${loading ? '...' : stats.total > 0 ? Math.round(stats.revenue / stats.total) : 0}
                </div>
                <p className="text-xs text-muted-foreground">Per ticket sold</p>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Type Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Ticket Sales by Type</CardTitle>
              <CardDescription>Detailed breakdown of tickets sold for each category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketTypes.map((ticket) => {
                  const count = stats[ticket.id as keyof TicketStats] as number
                  const revenue = count * ticket.price
                  const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
                  const isExpanded = expandedSections.has(ticket.id)
                  const ticketBookings = stats.bookings.filter(b => b.ticketType === ticket.id)

                  return (
                    <div key={ticket.id} className="border border-border rounded-lg overflow-hidden">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleExpanded(ticket.id)}
                      >
                        <div className="flex items-center gap-4">
                          <Badge className={`${ticket.color} border`}>
                            {ticket.name}
                          </Badge>
                          <div>
                            <p className="font-semibold text-foreground">${ticket.price}</p>
                            <p className="text-sm text-muted-foreground">per ticket</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{loading ? '...' : count}</p>
                            <p className="text-sm text-muted-foreground">sold ({percentage}%)</p>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-400">${loading ? '...' : revenue.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">revenue</p>
                          </div>

                          {count > 0 && (
                            <div className="ml-4">
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {isExpanded && count > 0 && (
                        <div className="border-t border-border bg-muted/20">
                          <div className="p-4">
                            <h4 className="font-semibold text-foreground mb-3">Booking Details</h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {ticketBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between py-2 px-3 bg-background rounded border">
                                  <div className="flex items-center gap-3">
                                    <Ticket className="h-4 w-4 text-primary" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">Booking #{booking.id.slice(-6)}</p>
                                      <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-semibold text-green-400">${booking.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {ticketBookings.length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">No bookings found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Refresh Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={fetchTicketStats}
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh Stats'}
            </Button>
          </div>
        </div>
      </div>

      <BandFooter />
    </div>
  )
}