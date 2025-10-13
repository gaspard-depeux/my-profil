"use client"

import * as React from "react"
import Navbar from "@/components/navigation/navbar"
import Sidebar from "@/components/navigation/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Mock user data - will be replaced with real data from auth context
  const mockUser = {
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    level: 5,
    xp: 1250,
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <Navbar 
        onMenuClick={toggleSidebar}
        user={mockUser}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        
        {/* Main content */}
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}