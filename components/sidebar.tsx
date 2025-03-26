"use client"

import { Heart, Bell, User, Calendar, LogOut, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="w-[310px] border-r p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold">
          a
        </div>
        <span className="text-2xl font-bold">appo</span>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg font-medium",
            isActive("/") ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <Heart className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/appointments"
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg font-medium",
            isActive("/appointments") ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <Calendar className="h-5 w-5" />
          Appointments
        </Link>
        <Link
          href="/notifications"
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg font-medium",
            isActive("/notifications") ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <Bell className="h-5 w-5" />
          Notifications
        </Link>
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg font-medium",
            isActive("/profile") ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <User className="h-5 w-5" />
          Profile
        </Link>
        <Link
          href="/register-insole"
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg font-medium",
            isActive("/register-insole") ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <Plus className="h-5 w-5" />
          Register New Insole
        </Link>
      </nav>

      <Link
        href="#"
        className="flex items-center gap-3 text-red-500 p-4 rounded-lg font-medium hover:bg-gray-100 mt-auto"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Link>
    </div>
  )
}

