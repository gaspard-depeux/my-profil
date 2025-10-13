"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home,
  CreditCard,
  Target,
  PieChart,
  TrendingUp,
  Gift,
  Settings,
  MessageCircle,
  Wallet,
  Calendar,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Tableau de bord",
    href: "/",
    icon: Home,
    badge: null,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
    badge: null,
  },
  {
    title: "Objectifs",
    href: "/goals",
    icon: Target,
    badge: "2",
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: PieChart,
    badge: null,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
    badge: null,
  },
  {
    title: "Récompenses",
    href: "/rewards",
    icon: Gift,
    badge: "Nouveau",
  },
]

const bottomItems = [
  {
    title: "Assistant IA",
    href: "/ai-chat",
    icon: MessageCircle,
    badge: null,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
  {
    title: "Aide",
    href: "/help",
    icon: HelpCircle,
    badge: null,
  },
]

export interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onToggle,
  className 
}) => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:sticky lg:top-16",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Collapse button (desktop only) */}
          <div className="hidden lg:flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-8 w-8"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "text-gray-700 dark:text-gray-300",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "mr-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badge === "Nouveau" ? "success" : "secondary"} 
                            size="sm"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

            {/* Bottom items */}
            <div className="space-y-1">
              {bottomItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "text-gray-700 dark:text-gray-300",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "mr-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User stats (when not collapsed) */}
          {!isCollapsed && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Niveau 5
                  </span>
                  <Badge variant="secondary" size="sm">
                    1,250 XP
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                    style={{ width: '75%' }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  250 XP pour le niveau suivant
                </p>
              </div>
            </div>
          )}

          {/* Logout button */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400",
                isCollapsed && "justify-center px-2"
              )}
            >
              <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && "Se déconnecter"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar