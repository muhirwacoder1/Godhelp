"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Navigation items configuration - Simplified with pill expansion
const navItems = [
  {
    href: "/",
    icon: "/icons/house-chimney-heart.svg",
    label: "Home",
    id: "home"
  },
  {
    href: "/appointments",
    icon: "/icons/clock.svg",
    label: "Appointments",
    id: "appointments"
  },
  {
    href: "/register-insole",
    icon: "/icons/add1.svg",
    label: "Add Device",
    id: "register"
  },
  {
    href: "/more",
    icon: "/icons/more.png",
    label: "More",
    id: "more"
  }
]

export function MobileNav() {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasNotifications] = useState(false) // Set to true when there are notifications
  const [user] = useState({
    name: "John Doe",
    avatar: "/icons/user.png",
    greeting: getGreeting()
  })

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning,"
    if (hour < 17) return "Good afternoon,"
    return "Good evening,"
  }

  return (
    <>
      {/* Top Header with Profile and Icons - Mobile Only */}
      <div className="lg:hidden bg-gradient-to-r from-[#F8FAFC] via-white to-[#F8FAFC] px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-3">
          {/* Left: Profile Photo */}
          <Avatar className="w-12 h-12 border-2 border-white shadow-[0_4px_12px_rgba(74,144,226,0.15)]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] text-white font-semibold text-[16px]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Right: Notification Bell and Settings */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Image
                  src="/icons/bell.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                  className="icon-hover icon-filter-inactive hover:icon-filter-active transition-all duration-200"
                />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EC4899] rounded-full border-2 border-white"></div>
                )}
              </button>
            </div>
            <Image
              src="/icons/settings.svg"
              alt="Settings"
              width={24}
              height={24}
              className="icon-hover icon-filter-inactive hover:icon-filter-active transition-all duration-200 cursor-pointer"
            />
          </div>
        </div>

        {/* Greeting Below */}
        <div>
          <p className="text-[28px] leading-[34px] font-bold text-[#1E293B] tracking-[-0.5px]">
            {user.greeting} {user.name.split(' ')[user.name.split(' ').length - 1]} <span className="text-[32px]">👋</span>
          </p>
        </div>
      </div>

      {/* Bottom Navigation Bar - Compact with Pill Expansion */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        {/* Navigation Container - Reduced height, full width */}
        <nav className="bg-[#2563eb] backdrop-blur-[8px] px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          {/* Navigation Items Container */}
          <div className="flex items-center justify-around">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  // Base styles - circle buttons by default
                  "nav-item-tap relative flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]",
                  // Default state - small circles
                  !isActive(item.href) && [
                    "w-10 h-10 rounded-full text-white/70 hover:text-white/90 hover:scale-110"
                  ],
                  // Active state - expanded pill with label
                  isActive(item.href) && [
                    "bg-white text-[#2563eb] rounded-full px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
                    "pill-expanded"
                  ]
                )}
              >
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn(
                      "transition-all duration-300",
                      isActive(item.href)
                        ? "brightness-0 saturate-100" // Dark icon for active state
                        : "brightness-0 invert" // White icon for inactive state
                    )}
                  />

                  {/* Notification badge for appointments */}
                  {item.id === "appointments" && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#2563eb]"></div>
                  )}
                </div>

                {/* Label - only visible when active */}
                <span
                  className={cn(
                    "text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-all duration-300",
                    isActive(item.href)
                      ? "ml-2 opacity-100 max-w-[100px]"
                      : "ml-0 opacity-0 max-w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* No Notifications Full Screen Overlay */}
      {showNotifications && !hasNotifications && (
        <div
          className="notification-overlay fixed inset-0 z-[100]"
          onClick={() => setShowNotifications(false)}
        >
          {/* Full Screen Background Image */}
          <div className="relative w-full h-full">
            <Image
              src="/icons/no notification.jpg"
              alt="No notifications"
              fill
              className="object-cover"
              priority
            />

            {/* Black Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-black text-4xl font-bold mb-4 drop-shadow-lg">
                  No Notification
                </h1>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowNotifications(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
            >
              <span className="text-black text-2xl font-bold">×</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}