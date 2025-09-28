import { NextRequest, NextResponse } from 'next/server'
import { createUser, hashPassword, findUserByEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, adminKey } = await request.json()

    // Simple admin key check (in production, this should be more secure)
    if (adminKey !== 'electric-pulse-admin-2024') {
      return NextResponse.json({ error: 'Invalid admin key' }, { status: 403 })
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    const user = createUser(name, email, hashedPassword, 'admin')

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }, { status: 201 })

  } catch (error) {
    console.error('Create admin error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}