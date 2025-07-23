"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MobileNav() {
  const pathname = usePathname()
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
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <>
      {/* Top Header with Greeting and Avatar - Mobile Only */}
      <div className="lg:hidden bg-gradient-to-r from-[#F8FAFC] via-white to-[#F8FAFC] px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[22px] leading-[28px] font-semibold text-[#1E293B] tracking-[-0.3px]">
                👋 {user.greeting},
              </p>
              <p className="text-[16px] leading-[22px] text-[#4A90E2] font-medium">
                {user.name.split(' ')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image 
                src="/icons/bell.svg" 
                alt="Notifications" 
                width={24} 
                height={24} 
                className="icon-hover icon-filter-inactive hover:icon-filter-active transition-all duration-200"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EC4899] rounded-full border-2 border-white"></div>
            </div>
            <Avatar className="w-11 h-11 border-2 border-white shadow-[0_4px_12px_rgba(74,144,226,0.15)]">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] text-white font-semibold text-[14px]">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Floating Island Style - Mobile Only */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[24px] px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] mx-auto max-w-sm">
          <div className="flex items-center justify-between">
            {/* Dashboard Icon */}
            <Link
              href="/"
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-[16px] transition-all duration-300 transform hover:scale-105",
                isActive("/") 
                  ? "bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] shadow-[0_4px_16px_rgba(74,144,226,0.3)]" 
                  : "hover:bg-white/50"
              )}
            >
              <Image 
                src="/icons/house-chimney-heart.svg" 
                alt="Dashboard" 
                width={24} 
                height={24} 
                className={cn(
                  "transition-all duration-300",
                  isActive("/") ? "icon-filter-active" : "icon-filter-inactive"
                )}
              />
              <span 
                className={cn(
                  "text-[11px] leading-[14px] font-medium tracking-[0.1px]",
                  isActive("/") ? "text-white" : "text-[#64748B]"
                )}
              >
                Dashboard
              </span>
            </Link>

            {/* Center Plus Button - Glowing */}
            <Link
              href="/register-insole"
              className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] rounded-[20px] shadow-[0_8px_24px_rgba(74,144,226,0.4)] transform hover:scale-110 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] rounded-[20px] animate-pulse opacity-75"></div>
              <Image 
                src="/icons/add1.svg" 
                alt="Add Device" 
                width={32} 
                height={32} 
                className="icon-filter-active relative z-10"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] rounded-[22px] opacity-20 blur-sm"></div>
            </Link>

            {/* Appointments Icon */}
            <Link
              href="/appointments"
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-[16px] transition-all duration-300 transform hover:scale-105",
                isActive("/appointments") 
                  ? "bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] shadow-[0_4px_16px_rgba(139,92,246,0.3)]" 
                  : "hover:bg-white/50"
              )}
            >
              <Image 
                src="/icons/clock.svg" 
                alt="Appointments" 
                width={24} 
                height={24} 
                className={cn(
                  "transition-all duration-300",
                  isActive("/appointments") ? "icon-filter-active" : "icon-filter-inactive"
                )}
              />
              <span 
                className={cn(
                  "text-[11px] leading-[14px] font-medium tracking-[0.1px]",
                  isActive("/appointments") ? "text-white" : "text-[#64748B]"
                )}
              >
                Appointments
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}