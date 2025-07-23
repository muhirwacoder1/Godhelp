"use client"

import { useState, useEffect } from "react"
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Footprints 
} from "lucide-react"

// Define the data structure from the API
interface HealthData {
  heel: number
  middle: number
  toe: number
  heartRate: number
  temperature: number
  timestamp: string
  // Add status fields from the API
  heelStatus?: string
  middleStatus?: string
  toeStatus?: string
}

// Since we're running a front-end demo without a live backend, we'll generate
// synthetic – but realistic – data in the browser.

export function RealTimeMonitor() {
  const [isActive, setIsActive] = useState(true)
  const [data, setData] = useState<HealthData>({
    heel: 73,
    middle: 137,
    toe: 120,
    heartRate: 67,
    temperature: 36.8,
    timestamp: new Date().toISOString(),
    heelStatus: "No data",
    middleStatus: "No data",
    toeStatus: "No data"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Produce a new set of demo vitals that look believable for a person who is
  // lightly walking. Values are jittered a little from the previous sample so
  // they feel alive.
  const generateFakeData = () => {
    if (!isActive) return

    setIsLoading(true)
    setError(null)

    setData(prev => {
      const rand = (min: number, max: number) => Math.random() * (max - min) + min

      // Heart rate: 85-110 bpm for walking
      const heartRate = Math.round(rand(85, 110))

      // Body temp: 36.5-37.1 °C with slight variation
      const temperature = +(rand(36.5, 37.1).toFixed(1))

      // Foot pressure (mmHg). Heel usually > mid > toe when walking.
      const heel = Math.round(rand(900, 1200))
      const middle = Math.round(rand(600, 900))
      const toe = Math.round(rand(400, 700))

      // Simple status logic – you can tweak thresholds later
      const statusFor = (p: number) => {
        if (p < 500) return "Low"
        if (p < 1000) return "Normal"
        if (p < 1500) return "Elevated"
        return "High"
      }

      return {
        heel,
        middle,
        toe,
        heartRate,
        temperature,
        timestamp: new Date().toISOString(),
        heelStatus: statusFor(heel),
        middleStatus: statusFor(middle),
        toeStatus: statusFor(toe)
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    // Generate data immediately on mount
    generateFakeData()

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      generateFakeData()
    }, 4000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0F4F8] p-4 lg:p-6">
      {/* Header Section - Hidden on mobile since we have greeting in mobile nav */}
      <div className="mb-6 hidden lg:block">
        <h1 className="text-[28px] leading-[34px] font-bold text-[#1E293B] tracking-[-0.5px] mb-2">
          Health Dashboard
        </h1>
        <p className="text-[14px] leading-[20px] text-[#64748B] font-medium tracking-[0.1px]">
          Real-time monitoring of your foot health and vitals
        </p>
      </div>

      {/* Mobile Header - Only visible on mobile */}
      <div className="mb-6 lg:hidden">
        <h1 className="text-[22px] leading-[28px] font-semibold text-[#1E293B] tracking-[-0.3px] mb-2">
          Your Health Today
        </h1>
        <p className="text-[14px] leading-[20px] text-[#64748B] font-medium tracking-[0.1px]">
          Real-time monitoring active
        </p>
      </div>

      {error && (
        <div className="bg-white/80 backdrop-blur-sm border border-[#F59E0B]/20 rounded-[20px] p-6 mb-6 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <span className="text-[#F59E0B] text-[16px] font-medium">{error}</span>
          <button onClick={() => setError(null)} className="text-[#F59E0B] font-bold text-xl hover:bg-[#F59E0B]/10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200">
            ×
          </button>
        </div>
      )}

      {/* Status Card */}
<div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4A90E2] rounded-[12px] flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                Monitoring Status
              </h3>
              <p className="text-[12px] leading-[16px] text-[#64748B] font-medium tracking-[0.1px]">
                {isActive
                  ? `Last update: ${new Date(data.timestamp).toLocaleTimeString()}`
                  : "Monitoring paused"}
              </p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-[999px] cursor-pointer transition-all duration-200 ${
              isActive 
                ? "bg-[#10B981] text-white" 
                : "bg-[#E2E8F0] text-[#64748B]"
            }`}
            onClick={() => setIsActive(!isActive)}
          >
            <span className="text-[14px] font-medium">
              {isLoading ? "Updating..." : isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Health Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Heart Rate Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#EC4899] bg-opacity-10 rounded-[12px] flex items-center justify-center">
              <Heart className="h-6 w-6 text-[#EC4899]" />
            </div>
            <div>
              <h3 className="text-[14px] leading-[20px] font-medium text-[#64748B] tracking-[0.1px]">
                Heart Rate
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] leading-[34px] font-bold text-[#1E293B] tracking-[-0.5px]">
                  {data.heartRate}
                </span>
                <span className="text-[14px] leading-[20px] font-medium text-[#64748B]">bpm</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#F8FAFC] rounded-[8px] h-2">
            <div 
              className="bg-[#EC4899] h-2 rounded-[8px] transition-all duration-300"
              style={{ width: `${Math.min((data.heartRate / 120) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Temperature Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4A90E2] bg-opacity-10 rounded-[12px] flex items-center justify-center">
              <Thermometer className="h-6 w-6 text-[#4A90E2]" />
            </div>
            <div>
              <h3 className="text-[14px] leading-[20px] font-medium text-[#64748B] tracking-[0.1px]">
                Temperature
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] leading-[34px] font-bold text-[#1E293B] tracking-[-0.5px]">
                  {data.temperature}
                </span>
                <span className="text-[14px] leading-[20px] font-medium text-[#64748B]">°C</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#F8FAFC] rounded-[8px] h-2">
            <div 
              className="bg-[#4A90E2] h-2 rounded-[8px] transition-all duration-300"
              style={{ width: `${Math.min(((data.temperature - 35) / 3) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Foot Pressure Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#8B5CF6] bg-opacity-10 rounded-[12px] flex items-center justify-center">
            <Footprints className="h-5 w-5 text-[#8B5CF6]" />
          </div>
          <h2 className="text-[22px] leading-[28px] font-semibold text-[#1E293B] tracking-[-0.3px]">
            Foot Pressure Analysis
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Heel Pressure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
            <div className="text-center mb-4">
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px] mb-1">
                Heel
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[24px] leading-[28px] font-semibold text-[#4A90E2]">
                  {data.heel}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#64748B] tracking-[0.1px]">
                  mmHg
                </span>
              </div>
            </div>
            <div className="w-full bg-[#F8FAFC] rounded-[8px] h-3 mb-3">
              <div 
                className="bg-[#4A90E2] h-3 rounded-[8px] transition-all duration-300"
                style={{ width: `${Math.min((data.heel / 2000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${
                data.heelStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
                data.heelStatus === 'High' ? 'bg-[#EF4444] bg-opacity-10 text-[#EF4444]' :
                'bg-[#F59E0B] bg-opacity-10 text-[#F59E0B]'
              }`}>
                {data.heelStatus || "No data"}
              </span>
            </div>
          </div>

          {/* Middle Pressure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
            <div className="text-center mb-4">
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px] mb-1">
                Middle
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[24px] leading-[28px] font-semibold text-[#F59E0B]">
                  {data.middle}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#64748B] tracking-[0.1px]">
                  mmHg
                </span>
              </div>
            </div>
            <div className="w-full bg-[#F8FAFC] rounded-[8px] h-3 mb-3">
              <div 
                className="bg-[#F59E0B] h-3 rounded-[8px] transition-all duration-300"
                style={{ width: `${Math.min((data.middle / 2000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${
                data.middleStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
                data.middleStatus === 'High' ? 'bg-[#EF4444] bg-opacity-10 text-[#EF4444]' :
                'bg-[#F59E0B] bg-opacity-10 text-[#F59E0B]'
              }`}>
                {data.middleStatus || "No data"}
              </span>
            </div>
          </div>

          {/* Toe Pressure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_8_32px_rgba(0,0,0,0.08)] border border-white/20">
            <div className="text-center mb-4">
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px] mb-1">
                Toe
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[24px] leading-[28px] font-semibold text-[#10B981]">
                  {data.toe}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#64748B] tracking-[0.1px]">
                  mmHg
                </span>
              </div>
            </div>
            <div className="w-full bg-[#F8FAFC] rounded-[8px] h-3 mb-3">
              <div 
                className="bg-[#10B981] h-3 rounded-[8px] transition-all duration-300"
                style={{ width: `${Math.min((data.toe / 2000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${
                data.toeStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
                data.toeStatus === 'High' ? 'bg-[#EF4444] bg-opacity-10 text-[#EF4444]' :
                'bg-[#F59E0B] bg-opacity-10 text-[#F59E0B]'
              }`}>
                {data.toeStatus || "No data"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
