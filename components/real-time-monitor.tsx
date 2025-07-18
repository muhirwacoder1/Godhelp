"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import { HealthStat } from "@/components/health-stat"
import { Heart, Thermometer } from "lucide-react"

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
    <div>
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-yellow-700 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Foot Pressures Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Foot Pressures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <ProgressBar
              value={data.heel}
              max={2000}
              color="#60A5FA" // blue-400
              label="Heel"
              unit="mmHg"
            />
            <div className="mt-2 text-center font-medium text-blue-600">
              Status: {data.heelStatus || "No data"}
            </div>
          </div>

          <div className="flex flex-col">
            <ProgressBar
              value={data.middle}
              max={2000}
              color="#FBBF24" // yellow-400
              label="Middle"
              unit="mmHg"
            />
            <div className="mt-2 text-center font-medium text-yellow-600">
              Status: {data.middleStatus || "No data"}
            </div>
          </div>

          <div className="flex flex-col">
            <ProgressBar
              value={data.toe}
              max={2000}
              color="#4ADE80" // green-400
              label="Toe"
              unit="mmHg"
            />
            <div className="mt-2 text-center font-medium text-green-600">
              Status: {data.toeStatus || "No data"}
            </div>
          </div>
        </div>
      </section>

      {/* Health Stats Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Health Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HealthStat
            icon={Heart}
            iconColor="#F87171" // red-400
            iconBgColor="#FEE2E2" // red-100
            label="Heart Rate"
            value={data.heartRate}
            unit="bpm"
            min={60}
            max={100}
            current={data.heartRate}
          />

          <HealthStat
            icon={Thermometer}
            iconColor="#60A5FA" // blue-400
            iconBgColor="#DBEAFE" // blue-100
            label="Temperature"
            value={data.temperature}
            unit="°C"
            min={36.1}
            max={37.2}
            current={data.temperature}
          />
        </div>
      </section>

      {/* Foot Health Monitoring Section */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold">Foot Health Monitoring</h2>
          <Badge
            className={isActive ? "bg-green-400 text-white" : "bg-gray-400 text-white"}
            onClick={() => setIsActive(!isActive)}
            style={{ cursor: "pointer" }}
          >
            {isLoading ? "Updating..." : isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-gray-500">
          {isActive
            ? `Real-time monitoring active. Data updates every 4 seconds. Last update: ${new Date(data.timestamp).toLocaleTimeString()}`
            : "Monitoring is paused. Click 'Inactive' to resume."}
        </p>
      </section>
    </div>
  )
}
