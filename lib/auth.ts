import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

interface User {
  id: string
  name: string
  email: string
  password: string
  role?: 'user' | 'admin'
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: { id: string; email: string }): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export function readUsers(): User[] {
  ensureDataDir()
  if (!fs.existsSync(USERS_FILE)) {
    return []
  }
  const data = fs.readFileSync(USERS_FILE, 'utf-8')
  return JSON.parse(data)
}

export function writeUsers(users: User[]): void {
  ensureDataDir()
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export function findUserByEmail(email: string): User | undefined {
  const users = readUsers()
  return users.find(user => user.email === email)
}

export function createUser(name: string, email: string, hashedPassword: string, role: 'user' | 'admin' = 'user'): User {
  const users = readUsers()
  const id = Date.now().toString()
  const newUser: User = { id, name, email, password: hashedPassword, role }
  users.push(newUser)
  writeUsers(users)
  return newUser
}

export function isAdmin(userId: string): boolean {
  const users = readUsers()
  const user = users.find(u => u.id === userId)
  return user?.role === 'admin'
}

export function getUserById(userId: string): User | undefined {
  const users = readUsers()
  return users.find(u => u.id === userId)
}