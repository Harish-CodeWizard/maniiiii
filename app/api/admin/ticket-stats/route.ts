import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json')

interface Booking {
  id: string
  ticketType: 'golden' | 'platinum' | 'standard' | 'economy'
  timestamp: string
  price: number
}

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export function readBookings(): Booking[] {
  ensureDataDir()
  if (!fs.existsSync(BOOKINGS_FILE)) {
    return []
  }
  const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8')
  return JSON.parse(data)
}

export function saveBooking(booking: Booking): void {
  ensureDataDir()
  const bookings = readBookings()
  bookings.push(booking)
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2))
}

export async function GET() {
  try {
    const bookings = readBookings()

    // Calculate statistics
    const stats = {
      golden: bookings.filter(b => b.ticketType === 'golden').length,
      platinum: bookings.filter(b => b.ticketType === 'platinum').length,
      standard: bookings.filter(b => b.ticketType === 'standard').length,
      economy: bookings.filter(b => b.ticketType === 'economy').length,
      total: bookings.length,
      revenue: bookings.reduce((sum, booking) => sum + booking.price, 0),
      bookings: bookings.map(booking => ({
        id: booking.id,
        ticketType: booking.ticketType,
        timestamp: booking.timestamp,
        price: booking.price,
        date: new Date(booking.timestamp).toLocaleDateString(),
        time: new Date(booking.timestamp).toLocaleTimeString(),
      }))
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching ticket stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}