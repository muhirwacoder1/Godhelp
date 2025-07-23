"use client"

import { useState } from "react"
import { Heart, Bell, User, Calendar, LogOut, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div 
      className={cn(
        "border-r border-[#E2E8F0] flex flex-col h-full transition-all duration-300 ease-in-out relative bg-white shadow-[0_4px_6px_rgba(0,0,0,0.07)]",
        collapsed ? "w-[80px]" : "w-[310px]"
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-4 top-6 h-12 w-12 rounded-[12px] border-none bg-[#4A90E2] text-white shadow-[0_4px_6px_rgba(0,0,0,0.07)] z-10 hover:bg-[#2563EB] transition-all duration-200"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className={cn(
        "p-6 flex flex-col h-full", 
        collapsed ? "items-center" : ""
      )}>
        <div className={cn(
          "flex items-center gap-2 mb-10", 
          collapsed ? "justify-center" : ""
        )}>
          {collapsed ? (
            <div className="w-12 h-12 relative">
              <Image 
                src="/appo-logo.png" 
                alt="Appo Logo" 
                width={48} 
                height={48} 
                className="object-contain"
              />
            </div>
          ) : (
            <div className="h-12 relative">
              <Image 
                src="/appo-logo.png" 
                alt="Appo Logo" 
                width={120} 
                height={48} 
                className="object-contain"
              />
            </div>
          )}
        </div>

        <nav className="flex-1 flex flex-col gap-3 w-full">
          <Link
            href="/"
            className={cn(
              "flex items-center rounded-[12px] font-medium transition-all duration-200 text-[16px]",
              isActive("/") 
                ? "text-white bg-[#4A90E2] shadow-[0_4px_6px_rgba(0,0,0,0.07)]" 
                : "text-[#1E293B] hover:bg-[#F8FAFC] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
              collapsed 
                ? "justify-center p-3" 
                : "p-4 gap-3"
            )}
            title="Dashboard"
          >
            <Heart className={cn("h-6 w-6", isActive("/") ? "text-white" : "text-[#4A90E2]")} />
            {!collapsed && <span className="font-semibold">Dashboard</span>}
          </Link>
          <Link
            href="/appointments"
            className={cn(
              "flex items-center rounded-[12px] font-medium transition-all duration-200 text-[16px]",
              isActive("/appointments") 
                ? "text-white bg-[#4A90E2] shadow-[0_4px_6px_rgba(0,0,0,0.07)]" 
                : "text-[#1E293B] hover:bg-[#F8FAFC] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
              collapsed 
                ? "justify-center p-3" 
                : "p-4 gap-3"
            )}
            title="Appointments"
          >
            <Calendar className={cn("h-6 w-6", isActive("/appointments") ? "text-white" : "text-[#8B5CF6]")} />
            {!collapsed && <span className="font-semibold">Appointments</span>}
          </Link>
          <Link
            href="/notifications"
            className={cn(
              "flex items-center rounded-[12px] font-medium transition-all duration-200 text-[16px]",
              isActive("/notifications") 
                ? "text-white bg-[#4A90E2] shadow-[0_4px_6px_rgba(0,0,0,0.07)]" 
                : "text-[#1E293B] hover:bg-[#F8FAFC] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
              collapsed 
                ? "justify-center p-3" 
                : "p-4 gap-3"
            )}
            title="Notifications"
          >
            <Bell className={cn("h-6 w-6", isActive("/notifications") ? "text-white" : "text-[#F59E0B]")} />
            {!collapsed && <span className="font-semibold">Notifications</span>}
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center rounded-[12px] font-medium transition-all duration-200 text-[16px]",
              isActive("/profile") 
                ? "text-white bg-[#4A90E2] shadow-[0_4px_6px_rgba(0,0,0,0.07)]" 
                : "text-[#1E293B] hover:bg-[#F8FAFC] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
              collapsed 
                ? "justify-center p-3" 
                : "p-4 gap-3"
            )}
            title="Profile"
          >
            <User className={cn("h-6 w-6", isActive("/profile") ? "text-white" : "text-[#10B981]")} />
            {!collapsed && <span className="font-semibold">Profile</span>}
          </Link>
          <Link
            href="/register-insole"
            className={cn(
              "flex items-center rounded-[12px] font-medium transition-all duration-200 text-[16px]",
              isActive("/register-insole") 
                ? "text-white bg-[#4A90E2] shadow-[0_4px_6px_rgba(0,0,0,0.07)]" 
                : "text-[#1E293B] hover:bg-[#F8FAFC] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
              collapsed 
                ? "justify-center p-3" 
                : "p-4 gap-3"
            )}
            title="Register New Insole"
          >
            <Plus className={cn("h-6 w-6", isActive("/register-insole") ? "text-white" : "text-[#EC4899]")} />
            {!collapsed && <span className="font-semibold">Register New Insole</span>}
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          {!collapsed && (
            <div className="bg-[#4A90E2] bg-opacity-10 rounded-[16px] p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[16px] font-semibold text-[#1E293B]">New Appointment</h3>
                <div className="w-8 h-8 rounded-[8px] bg-[#4A90E2] bg-opacity-20 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-[#4A90E2]" />
                </div>
              </div>
              <p className="text-[14px] text-[#64748B] mb-4 leading-[20px]">
                Book your next appointment quickly and easily
              </p>
              <Button 
                size="sm" 
                className="w-full bg-[#4A90E2] hover:bg-[#2563EB] text-white rounded-[12px] h-12 text-[16px] font-semibold transition-all duration-200 shadow-none border-none"
                asChild
              >
                <Link href="/appointments">Book Now</Link>
              </Button>
            </div>
          )}
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] rounded-[12px] h-12 text-[16px] font-medium transition-all duration-200",
              collapsed ? "justify-center p-3" : "gap-3"
            )}
          >
            <LogOut className="h-6 w-6" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
