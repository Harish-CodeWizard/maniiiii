"use client"

import { useState } from "react"
import { BandNavigation } from "@/components/band-navigation"
import { BandFooter } from "@/components/band-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Search } from "lucide-react"

const categories = ["All", "Apparel", "Vinyl", "Digital", "Accessories", "Limited Edition"]

const products = [
  {
    id: 1,
    name: "Electric Dreams Tour T-Shirt",
    category: "Apparel",
    price: 29.99,
    originalPrice: null,
    image: "/merch-electric-dreams-tour-tshirt-black.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "Official tour merchandise featuring the Electric Dreams album artwork on premium cotton.",
  },
  {
    id: 2,
    name: "Electric Dreams Vinyl LP",
    category: "Vinyl",
    price: 34.99,
    originalPrice: null,
    image: "/vinyl-electric-dreams-album-neon-cover.jpg",
    rating: 5.0,
    reviews: 89,
    badge: "New Release",
    description: "Limited edition colored vinyl with exclusive artwork and liner notes.",
  },
  {
    id: 3,
    name: "Neon Pulse Hoodie",
    category: "Apparel",
    price: 54.99,
    originalPrice: 69.99,
    image: "/merch-neon-pulse-hoodie-electric-blue.jpg",
    rating: 4.7,
    reviews: 67,
    badge: "Sale",
    description: "Premium heavyweight hoodie with embroidered logo and glow-in-the-dark details.",
  },
  {
    id: 4,
    name: "Complete Discography Digital",
    category: "Digital",
    price: 19.99,
    originalPrice: null,
    image: "/digital-complete-discography-bundle.jpg",
    rating: 4.9,
    reviews: 203,
    badge: "Digital",
    description: "High-quality digital downloads of our entire catalog including exclusive B-sides.",
  },
  {
    id: 5,
    name: "Electric Pulse Snapback",
    category: "Accessories",
    price: 24.99,
    originalPrice: null,
    image: "/merch-electric-pulse-snapback-cap-black.jpg",
    rating: 4.6,
    reviews: 45,
    badge: null,
    description: "Adjustable snapback cap with embroidered logo and premium construction.",
  },
  {
    id: 6,
    name: "Signed Poster Set",
    category: "Limited Edition",
    price: 89.99,
    originalPrice: null,
    image: "/limited-signed-poster-set-band-photos.jpg",
    rating: 5.0,
    reviews: 12,
    badge: "Limited",
    description: "Hand-signed poster set featuring exclusive concert photography. Only 100 available.",
  },
  {
    id: 7,
    name: "Voltage Rising Single Vinyl",
    category: "Vinyl",
    price: 12.99,
    originalPrice: null,
    image: "/vinyl-voltage-rising-single-7-inch.jpg",
    rating: 4.8,
    reviews: 34,
    badge: null,
    description: "7-inch single featuring Voltage Rising with exclusive B-side track.",
  },
  {
    id: 8,
    name: "Band Logo Enamel Pin Set",
    category: "Accessories",
    price: 15.99,
    originalPrice: null,
    image: "/merch-enamel-pin-set-band-logos.jpg",
    rating: 4.5,
    reviews: 78,
    badge: null,
    description: "Collectible enamel pin set featuring various band logos and album artwork.",
  },
  {
    id: 9,
    name: "Electric Dreams Deluxe Box Set",
    category: "Limited Edition",
    price: 149.99,
    originalPrice: null,
    image: "/limited-electric-dreams-deluxe-box-set.jpg",
    rating: 5.0,
    reviews: 8,
    badge: "Exclusive",
    description: "Ultimate collector's edition with vinyl, CD, exclusive merchandise, and signed artwork.",
  },
]

const getBadgeColor = (badge: string | null) => {
  switch (badge) {
    case "Best Seller":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "New Release":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "Sale":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "Digital":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "Limited":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "Exclusive":
      return "bg-pink-500/20 text-pink-400 border-pink-500/30"
    default:
      return ""
  }
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId])
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BandNavigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary neon-text mb-6">Official Store</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Get your hands on exclusive Electric Pulse merchandise, limited edition vinyl, and digital downloads.
            Support the band and show your electric spirit!
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist ({wishlist.length})
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:scale-105 transition-all duration-300 bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg?height=300&width=300&query=band merchandise"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <Badge className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} border`}>
                        {product.badge}
                      </Badge>
                    )}

                    {/* Wishlist Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                      />
                    </Button>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="bg-primary hover:bg-primary/80 text-primary-foreground pulse-glow"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="bg-primary hover:bg-primary/80 text-primary-foreground"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Exclusive Merch Updates</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Be the first to know about new merchandise drops, limited editions, and exclusive fan-only items.
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
