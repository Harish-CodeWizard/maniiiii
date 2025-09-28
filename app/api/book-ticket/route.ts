import { NextRequest, NextResponse } from 'next/server'
import { saveBooking } from '../admin/ticket-stats/route'

const TICKET_PRICES = {
  golden: 150,
  platinum: 120,
  standard: 75,
  economy: 45,
}

export async function POST(request: NextRequest) {
  try {
    const { ticketType } = await request.json()

    if (!ticketType || !TICKET_PRICES[ticketType as keyof typeof TICKET_PRICES]) {
      return NextResponse.json({ error: 'Invalid ticket type' }, { status: 400 })
    }

    const booking = {
      id: Date.now().toString(),
      ticketType,
      timestamp: new Date().toISOString(),
      price: TICKET_PRICES[ticketType as keyof typeof TICKET_PRICES],
    }

    saveBooking(booking)

    return NextResponse.json({
      message: 'Ticket booked successfully',
      booking
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}