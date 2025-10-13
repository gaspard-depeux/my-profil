"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface NavbarProps {
  onMenuClick?: () => void
  user?: {
    name: string
    email: string
    avatar?: string
    level: number
    xp: number
  }
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, user }) => {
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = React.useState(3)
  const [isDark, setIsDark] = React.useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // TODO: Implement theme switching logic
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
              F
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white">
              FlowTrack
            </span>
          </Link>
        </div>

        {/* Center section - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User level (desktop only) */}
          {user && (
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Niveau {user.level}
              </span>
              <Badge variant="secondary" size="sm">
                {user.xp} XP
              </Badge>
            </div>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="danger" 
                size="sm"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>

          {/* User menu */}
          <div className="relative">
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name || 'Utilisateur'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar