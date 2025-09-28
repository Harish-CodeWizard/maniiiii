"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { ArrowLeft, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminKey: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        alert('Admin user created successfully! You can now log in with these credentials.')
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <BandNavigation />

        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary neon-text">
                  Admin User Created!
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  The admin user has been successfully created. You can now access the admin dashboard.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400 font-medium mb-2">Login Credentials:</p>
                  <p className="text-sm text-muted-foreground">Email: {formData.email}</p>
                  <p className="text-sm text-muted-foreground">Password: {formData.password}</p>
                </div>

                <div className="space-y-3">
                  <Link href="/login">
                    <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                      Login as Admin
                    </Button>
                  </Link>
                  <Link href="/admin">
                    <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                      Go to Admin Dashboard
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
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary neon-text">
                Create Admin User
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Set up the first administrator account for the Electric Pulse website.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter admin name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-input border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-input border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-input border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminKey" className="text-foreground">
                    Admin Key
                  </Label>
                  <Input
                    id="adminKey"
                    name="adminKey"
                    type="password"
                    placeholder="Enter admin key"
                    value={formData.adminKey}
                    onChange={handleInputChange}
                    className="bg-input border-border focus:border-primary"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Admin key: electric-pulse-admin-2024
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 pulse-glow"
                  disabled={loading}
                >
                  {loading ? 'Creating Admin...' : 'Create Admin User'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <BandFooter />
    </div>
  )
}