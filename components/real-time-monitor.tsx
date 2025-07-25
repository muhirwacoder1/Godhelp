"use client"

import { useState, useEffect } from "react"
import {
  Heart,
  Thermometer,
  Activity,
  Footprints,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Calculator,
  Apple,
  Zap,
  X,
  User,
  Ruler,
  Scale
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

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

// WiFi devices interface
interface WiFiDevice {
  id: string
  name: string
  signalStrength: number
  isConnected: boolean
  requiresPassword: boolean
  password?: string
  batteryLevel?: number
  showBattery?: boolean
}

// Analytics data interface
interface UlcerRiskData {
  hour: string
  leftFoot: number
  rightFoot: number
}

export function RealTimeMonitor() {
  const [isActive, setIsActive] = useState(false)
  const [showWiFiPopup, setShowWiFiPopup] = useState(false)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<WiFiDevice | null>(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null)
  const [successNotification, setSuccessNotification] = useState<string | null>(null)
  const [connectionStartTime, setConnectionStartTime] = useState<Date | null>(null)
  const [ulcerRiskData, setUlcerRiskData] = useState<UlcerRiskData[]>([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left')
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)
  const [activeFeature, setActiveFeature] = useState<'bmi' | 'nutrition' | 'heartrate' | null>(null)
  
  // BMI Calculator state
  const [bmiData, setBmiData] = useState({
    height: '',
    weight: '',
    bmi: 0,
    category: ''
  })
  
  // Heart rate measurement state
  const [isHeartRateMeasuring, setIsHeartRateMeasuring] = useState(false)
  const [heartRateProgress, setHeartRateProgress] = useState(0)
  const [measuredHeartRate, setMeasuredHeartRate] = useState(0)
  const [wifiDevices, setWifiDevices] = useState<WiFiDevice[]>([
    {
      id: '1',
      name: 'Neem Insole 1',
      signalStrength: 85,
      isConnected: false,
      requiresPassword: true,
      password: 'neemgroup1',
      batteryLevel: 78,
      showBattery: true
    },
    {
      id: '2',
      name: 'Neem Insole 2',
      signalStrength: 72,
      isConnected: false,
      requiresPassword: true,
      password: 'neemgroup2',
      batteryLevel: 65,
      showBattery: true
    },
    {
      id: '3',
      name: 'Samsung Galaxy A54',
      signalStrength: 90,
      isConnected: false,
      requiresPassword: false,
      showBattery: false
    }
  ])
  const [data, setData] = useState<HealthData>({
    heel: 0,
    middle: 0,
    toe: 0,
    heartRate: 0,
    temperature: 0,
    timestamp: new Date().toISOString(),
    heelStatus: "No data",
    middleStatus: "No data",
    toeStatus: "No data"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if any insole device is connected
  const isInsoleConnected = () => {
    return wifiDevices.some(device =>
      (device.name.includes('Insole') || device.name.includes('insole')) && device.isConnected
    )
  }

  // Check which specific insoles are connected
  const getConnectedInsoles = () => {
    const insole1Connected = wifiDevices.find(device => 
      device.name === 'Neem Insole 1' && device.isConnected
    )
    const insole2Connected = wifiDevices.find(device => 
      device.name === 'Neem Insole 2' && device.isConnected
    )
    
    return {
      rightFoot: insole1Connected ? true : false, // Insole 1 = Right foot
      leftFoot: insole2Connected ? true : false,  // Insole 2 = Left foot
      bothConnected: insole1Connected && insole2Connected
    }
  }

  // Generate ulcer risk analytics data
  const generateUlcerRiskData = () => {
    if (!connectionStartTime || !isInsoleConnected()) return

    const now = new Date()
    const hoursConnected = Math.floor((now.getTime() - connectionStartTime.getTime()) / (1000 * 60 * 60))

    const newData: UlcerRiskData[] = []

    for (let i = 0; i <= Math.min(hoursConnected, 12); i++) {
      const hour = new Date(connectionStartTime.getTime() + i * 60 * 60 * 1000)
      const hourStr = hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

      // Generate realistic ulcer risk data (keeping below 3%)
      const baseRisk = 0.5 + Math.random() * 1.5 // 0.5% to 2%
      const connectedInsoles = getConnectedInsoles()
      
      const leftFootRisk = connectedInsoles.leftFoot 
        ? Math.min(baseRisk + Math.random() * 0.5, 2.8)
        : 0
      const rightFootRisk = connectedInsoles.rightFoot 
        ? Math.min(baseRisk + Math.random() * 0.5, 2.8)
        : 0

      newData.push({
        hour: hourStr,
        leftFoot: Number(leftFootRisk.toFixed(2)),
        rightFoot: Number(rightFootRisk.toFixed(2))
      })
    }

    setUlcerRiskData(newData)
  }

  // Produce a new set of demo vitals that look believable for a person who is
  // lightly walking. Values are jittered a little from the previous sample so
  // they feel alive.
  const generateFakeData = () => {
    setIsLoading(true)
    setError(null)

    setData(prev => {
      // If no insole is connected, show all zeros
      if (!isActive || !isInsoleConnected()) {
        return {
          heel: 0,
          middle: 0,
          toe: 0,
          heartRate: 0,
          temperature: 0,
          timestamp: new Date().toISOString(),
          heelStatus: "No data",
          middleStatus: "No data",
          toeStatus: "No data"
        }
      }

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
        if (p === 0) return "No data"
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

  // Handle WiFi device connection
  const handleConnectDevice = async (device: WiFiDevice) => {
    if (device.requiresPassword) {
      setSelectedDevice(device)
      setShowPasswordPopup(true)
      setPasswordInput('')
      setPasswordError('')
      return
    }

    // Direct connection for devices without password
    await connectToDevice(device.id)
  }

  // Handle password submission
  const handlePasswordSubmit = async () => {
    if (!selectedDevice) return

    if (passwordInput === selectedDevice.password) {
      setShowPasswordPopup(false)
      await connectToDevice(selectedDevice.id)
    } else {
      setPasswordError('Incorrect password. Please try again.')
    }
  }

  // Connect to device
  const connectToDevice = async (deviceId: string) => {
    setConnectingDevice(deviceId)

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))

    const device = wifiDevices.find(d => d.id === deviceId)

    setWifiDevices(prev => prev.map(device => ({
      ...device,
      isConnected: device.id === deviceId ? true : false
    })))

    setConnectingDevice(null)
    setIsActive(true)
    setShowWiFiPopup(false)

    // Set connection start time for analytics
    if (device && device.name.includes('Insole')) {
      setConnectionStartTime(new Date())
    }

    // Show success notification
    if (device) {
      setSuccessNotification(`${device.name} connected successfully!`)
      setTimeout(() => setSuccessNotification(null), 3000)
    }
  }

  // Disconnect all devices
  const disconnectAllDevices = () => {
    setWifiDevices(prev => prev.map(device => ({
      ...device,
      isConnected: false
    })))
    setIsActive(false)
    setConnectionStartTime(null)
    setUlcerRiskData([])
    setSuccessNotification('All devices disconnected')
    setTimeout(() => setSuccessNotification(null), 3000)
  }

  useEffect(() => {
    // Generate data immediately on mount
    generateFakeData()
    generateUlcerRiskData()

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      generateFakeData()
      generateUlcerRiskData()
    }, 4000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [isActive, wifiDevices, connectionStartTime])

  // Auto-select foot when only one insole is connected
  useEffect(() => {
    const connectedInsoles = getConnectedInsoles()
    if (!connectedInsoles.bothConnected) {
      if (connectedInsoles.leftFoot) {
        setSelectedFoot('left')
      } else if (connectedInsoles.rightFoot) {
        setSelectedFoot('right')
      }
    }
  }, [wifiDevices])

  // BMI Calculator functions
  const calculateBMI = () => {
    const heightInM = parseFloat(bmiData.height) / 100
    const weightInKg = parseFloat(bmiData.weight)
    
    if (heightInM > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInM * heightInM)
      let category = ''
      
      if (bmi < 18.5) category = 'Underweight'
      else if (bmi < 25) category = 'Normal weight'
      else if (bmi < 30) category = 'Overweight'
      else category = 'Obese'
      
      setBmiData(prev => ({ ...prev, bmi: Number(bmi.toFixed(1)), category }))
    }
  }

  // Heart rate measurement simulation
  const startHeartRateMeasurement = () => {
    setIsHeartRateMeasuring(true)
    setHeartRateProgress(0)
    setMeasuredHeartRate(0)
    
    const interval = setInterval(() => {
      setHeartRateProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsHeartRateMeasuring(false)
          // Simulate measured heart rate (85-110 bpm)
          const simulatedRate = Math.round(85 + Math.random() * 25)
          setMeasuredHeartRate(simulatedRate)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  // Nutritional recommendations based on BMI and activity
  const getNutritionalRecommendations = () => {
    const recommendations = {
      underweight: [
        "Increase caloric intake with nutrient-dense foods",
        "Include healthy fats like avocados, nuts, and olive oil",
        "Eat frequent, smaller meals throughout the day",
        "Focus on protein-rich foods for muscle building"
      ],
      normal: [
        "Maintain balanced diet with fruits and vegetables",
        "Stay hydrated with 8-10 glasses of water daily",
        "Include lean proteins and whole grains",
        "Limit processed foods and added sugars"
      ],
      overweight: [
        "Create a moderate caloric deficit for weight loss",
        "Increase fiber intake with vegetables and fruits",
        "Choose lean proteins and reduce portion sizes",
        "Limit refined carbohydrates and sugary drinks"
      ],
      obese: [
        "Consult with a healthcare provider for a weight loss plan",
        "Focus on whole, unprocessed foods",
        "Increase physical activity gradually",
        "Consider meal planning and portion control"
      ]
    }
    
    const category = bmiData.category.toLowerCase().replace(' weight', '')
    return recommendations[category as keyof typeof recommendations] || recommendations.normal
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0F4F8] p-4">
      {/* Header Section - Hidden since we have greeting in mobile nav */}
      <div className="mb-6 hidden">
        <h1 className="text-[28px] leading-[34px] font-bold text-[#1E293B] tracking-[-0.5px] mb-2">
          Health Dashboard
        </h1>
        <p className="text-[14px] leading-[20px] text-[#64748B] font-medium tracking-[0.1px]">
          Real-time monitoring of your foot health and vitals
        </p>
      </div>

      {/* Mobile Header - Now visible on all screens */}
      <div className="mb-6">
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
              <img
                src="/icons/signal-stream.svg"
                alt="Signal Stream"
                className="h-6 w-6 text-white filter brightness-0 invert"
              />
            </div>
            <div>
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                Status
              </h3>
              <p className="text-[12px] leading-[16px] text-[#64748B] font-medium tracking-[0.1px]">
                {isActive && isInsoleConnected() ? "Active" : "Disconnected"}
              </p>
            </div>
          </div>
          {isActive && isInsoleConnected() ? (
            <div
              className="px-4 py-2 rounded-[999px] cursor-pointer transition-all duration-200 bg-[#EF4444] text-white hover:bg-[#DC2626]"
              onClick={disconnectAllDevices}
            >
              <span className="text-[14px] font-medium">
                Disconnect
              </span>
            </div>
          ) : (
            <div
              className="px-4 py-2 rounded-[999px] cursor-pointer transition-all duration-200 bg-[#4A90E2] text-white hover:bg-[#3A7BD5]"
              onClick={() => setShowWiFiPopup(true)}
            >
              <span className="text-[14px] font-medium">
                Connect
              </span>
            </div>
          )}
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
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${data.heelStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
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
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${data.middleStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
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
              <span className={`inline-block px-3 py-1 rounded-[999px] text-[12px] font-medium tracking-[0.1px] ${data.toeStatus === 'Normal' ? 'bg-[#10B981] bg-opacity-10 text-[#10B981]' :
                data.toeStatus === 'High' ? 'bg-[#EF4444] bg-opacity-10 text-[#EF4444]' :
                  'bg-[#F59E0B] bg-opacity-10 text-[#F59E0B]'
                }`}>
                {data.toeStatus || "No data"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Foot Ulcer Risk Analytics */}
      <div className="mb-6">
        <Card className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-[16px] flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-[24px] leading-[30px] font-bold text-[#1E293B] tracking-[-0.4px] mb-1">
                    Ulcer Risk Analytics
                  </CardTitle>
                  <CardDescription className="text-[14px] text-[#64748B] font-medium">
                    {isInsoleConnected() && ulcerRiskData.length > 0 
                      ? `Real-time monitoring • ${ulcerRiskData.length} data points`
                      : "Connect an insole to start predictive analysis"
                    }
                  </CardDescription>
                </div>
              </div>
              
              {isInsoleConnected() && ulcerRiskData.length > 0 && (
                <Button
                  variant={showAnalytics ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#667EEA] to-[#764BA2] hover:from-[#5A67D8] hover:to-[#6B46C1] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {showAnalytics ? <Eye className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                  {showAnalytics ? "Hide Charts" : "View Analytics"}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showAnalytics ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {!isInsoleConnected() || ulcerRiskData.length === 0 ? (
              <div className="h-[280px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
                    <Footprints className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1E293B] mb-2">No Data Available</h3>
                  <p className="text-[14px] text-[#64748B] mb-4 max-w-sm">
                    Connect your smart insole to start monitoring foot ulcer risk with AI-powered predictions
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[12px] text-[#94A3B8]">
                    <div className="w-2 h-2 bg-[#94A3B8] rounded-full"></div>
                    <span>Waiting for device connection</span>
                  </div>
                </div>
              </div>
            ) : !showAnalytics ? (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className={`grid grid-cols-1 gap-4 ${getConnectedInsoles().bothConnected ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {getConnectedInsoles().bothConnected && (
                    <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-[16px] p-4 border border-[#10B981]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#10B981] rounded-[8px] flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[12px] font-medium text-[#10B981] uppercase tracking-wide">Average Risk</span>
                      </div>
                      <p className="text-[24px] font-bold text-[#1E293B] mb-1">
                        {((ulcerRiskData.reduce((acc, curr) => acc + curr.leftFoot + curr.rightFoot, 0) / (ulcerRiskData.length * 2)) || 0).toFixed(2)}%
                      </p>
                      <p className="text-[12px] text-[#64748B]">Both feet combined</p>
                    </div>
                  )}

                  {getConnectedInsoles().leftFoot && (
                    <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#1D4ED8]/10 rounded-[16px] p-4 border border-[#3B82F6]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#3B82F6] rounded-[8px] flex items-center justify-center">
                          <Footprints className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[12px] font-medium text-[#3B82F6] uppercase tracking-wide">Left Foot</span>
                      </div>
                      <p className="text-[24px] font-bold text-[#1E293B] mb-1">
                        {ulcerRiskData[ulcerRiskData.length - 1]?.leftFoot || 0}%
                      </p>
                      <p className="text-[12px] text-[#64748B]">Current risk level</p>
                    </div>
                  )}

                  {getConnectedInsoles().rightFoot && (
                    <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#7C3AED]/10 rounded-[16px] p-4 border border-[#8B5CF6]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#8B5CF6] rounded-[8px] flex items-center justify-center">
                          <Footprints className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[12px] font-medium text-[#8B5CF6] uppercase tracking-wide">Right Foot</span>
                      </div>
                      <p className="text-[24px] font-bold text-[#1E293B] mb-1">
                        {ulcerRiskData[ulcerRiskData.length - 1]?.rightFoot || 0}%
                      </p>
                      <p className="text-[12px] text-[#64748B]">Current risk level</p>
                    </div>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="bg-gradient-to-r from-[#10B981]/5 to-[#059669]/5 rounded-[16px] p-4 border border-[#10B981]/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#1E293B]">Monitoring Active</p>
                        <p className="text-[12px] text-[#64748B]">
                          Started {connectionStartTime?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • 
                          {getConnectedInsoles().bothConnected 
                            ? ' Both feet monitored' 
                            : getConnectedInsoles().leftFoot 
                              ? ' Left foot monitored' 
                              : ' Right foot monitored'
                          } • All values below 3%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-[#10B981] text-white">
                        LOW RISK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Foot Toggle - Only show if both feet are connected */}
                {getConnectedInsoles().bothConnected ? (
                  <div className="flex items-center justify-center">
                    <div className="bg-gray-100 rounded-[12px] p-1 flex">
                      <Button
                        variant={selectedFoot === 'left' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedFoot('left')}
                        className={`rounded-[8px] px-4 py-2 text-[14px] font-medium transition-all duration-200 ${
                          selectedFoot === 'left' 
                            ? 'bg-[#3B82F6] text-white shadow-md' 
                            : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/50'
                        }`}
                      >
                        <Footprints className="h-4 w-4 mr-2" />
                        Left Foot
                      </Button>
                      <Button
                        variant={selectedFoot === 'right' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedFoot('right')}
                        className={`rounded-[8px] px-4 py-2 text-[14px] font-medium transition-all duration-200 ${
                          selectedFoot === 'right' 
                            ? 'bg-[#8B5CF6] text-white shadow-md' 
                            : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/50'
                        }`}
                      >
                        <Footprints className="h-4 w-4 mr-2" />
                        Right Foot
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-[16px] font-semibold text-[#1E293B] mb-1">
                      {getConnectedInsoles().leftFoot ? 'Left Foot Analysis' : 'Right Foot Analysis'}
                    </h3>
                    <p className="text-[12px] text-[#64748B]">
                      {getConnectedInsoles().leftFoot 
                        ? 'Monitoring left foot with Neem Insole 2' 
                        : 'Monitoring right foot with Neem Insole 1'
                      }
                    </p>
                  </div>
                )}

                {/* Enhanced Chart */}
                <div className="bg-white/50 rounded-[20px] p-6 border border-white/50 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[16px] font-semibold text-[#1E293B] mb-1">
                        {getConnectedInsoles().bothConnected 
                          ? (selectedFoot === 'left' ? 'Left' : 'Right') + ' Foot Risk Trend'
                          : getConnectedInsoles().leftFoot 
                            ? 'Left Foot Risk Trend'
                            : 'Right Foot Risk Trend'
                        }
                      </h3>
                      <p className="text-[12px] text-[#64748B]">
                        Current: {getConnectedInsoles().bothConnected 
                          ? (selectedFoot === 'left' 
                              ? ulcerRiskData[ulcerRiskData.length - 1]?.leftFoot 
                              : ulcerRiskData[ulcerRiskData.length - 1]?.rightFoot)
                          : getConnectedInsoles().leftFoot
                            ? ulcerRiskData[ulcerRiskData.length - 1]?.leftFoot
                            : ulcerRiskData[ulcerRiskData.length - 1]?.rightFoot
                        }% risk level
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        getConnectedInsoles().bothConnected 
                          ? (selectedFoot === 'left' ? 'bg-[#3B82F6]' : 'bg-[#8B5CF6]')
                          : getConnectedInsoles().leftFoot 
                            ? 'bg-[#3B82F6]' 
                            : 'bg-[#8B5CF6]'
                      }`}></div>
                      <span className="text-[12px] font-medium text-[#64748B]">Risk Percentage</span>
                    </div>
                  </div>

                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        [getConnectedInsoles().bothConnected 
                          ? selectedFoot + 'Foot'
                          : getConnectedInsoles().leftFoot 
                            ? 'leftFoot'
                            : 'rightFoot'
                        ]: {
                          label: `${getConnectedInsoles().bothConnected 
                            ? (selectedFoot === 'left' ? 'Left' : 'Right')
                            : getConnectedInsoles().leftFoot 
                              ? 'Left'
                              : 'Right'
                          } Foot Risk (%)`,
                          color: getConnectedInsoles().bothConnected 
                            ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                            : getConnectedInsoles().leftFoot 
                              ? '#3B82F6' 
                              : '#8B5CF6',
                        },
                      }}
                    >
                      <AreaChart
                        accessibilityLayer
                        data={ulcerRiskData}
                        margin={{
                          left: 20,
                          right: 20,
                          top: 20,
                          bottom: 20,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset="5%" 
                              stopColor={getConnectedInsoles().bothConnected 
                                ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                                : getConnectedInsoles().leftFoot 
                                  ? '#3B82F6' 
                                  : '#8B5CF6'
                              } 
                              stopOpacity={0.3}
                            />
                            <stop 
                              offset="95%" 
                              stopColor={getConnectedInsoles().bothConnected 
                                ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                                : getConnectedInsoles().leftFoot 
                                  ? '#3B82F6' 
                                  : '#8B5CF6'
                              } 
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                        <XAxis
                          dataKey="hour"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={12}
                          tick={{ fontSize: 12, fill: '#64748B' }}
                          tickFormatter={(value) => value}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={12}
                          domain={[0, 3]}
                          tick={{ fontSize: 12, fill: '#64748B' }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white/95 backdrop-blur-sm border border-white/50 rounded-[12px] p-3 shadow-xl">
                                  <p className="text-[12px] font-medium text-[#64748B] mb-1">{label}</p>
                                  <p className="text-[14px] font-semibold text-[#1E293B]">
                                    Risk: {payload[0].value}%
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Area
                          dataKey={getConnectedInsoles().bothConnected 
                            ? selectedFoot + 'Foot'
                            : getConnectedInsoles().leftFoot 
                              ? 'leftFoot'
                              : 'rightFoot'
                          }
                          type="monotone"
                          stroke={getConnectedInsoles().bothConnected 
                            ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                            : getConnectedInsoles().leftFoot 
                              ? '#3B82F6' 
                              : '#8B5CF6'
                          }
                          strokeWidth={3}
                          fill="url(#colorGradient)"
                          dot={{ 
                            fill: getConnectedInsoles().bothConnected 
                              ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                              : getConnectedInsoles().leftFoot 
                                ? '#3B82F6' 
                                : '#8B5CF6', 
                            strokeWidth: 2, 
                            stroke: '#fff',
                            r: 4 
                          }}
                          activeDot={{ 
                            r: 6, 
                            stroke: getConnectedInsoles().bothConnected 
                              ? (selectedFoot === 'left' ? '#3B82F6' : '#8B5CF6')
                              : getConnectedInsoles().leftFoot 
                                ? '#3B82F6' 
                                : '#8B5CF6',
                            strokeWidth: 2,
                            fill: '#fff'
                          }}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* WiFi Connection Popup */}
      {showWiFiPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[24px] p-6 w-full max-w-md shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                Available Devices
              </h3>
              <button
                onClick={() => setShowWiFiPopup(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-gray-600 text-lg font-bold">×</span>
              </button>
            </div>

            {/* WiFi Devices List */}
            <div className="space-y-3">
              {wifiDevices.map((device) => (
                <div
                  key={device.id}
                  className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Signal Strength Icon */}
                    <div className="w-10 h-10 bg-[#4A90E2]/10 rounded-[10px] flex items-center justify-center">
                      <img
                        src="/icons/signal-stream.svg"
                        alt="Signal"
                        className="h-5 w-5 opacity-70"
                      />
                    </div>

                    <div>
                      <h4 className="text-[16px] leading-[20px] font-medium text-[#1E293B] tracking-[-0.1px]">
                        {device.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Battery Level for Insoles */}
                    {device.batteryLevel && (
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[#64748B]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.67 4H14V2c0-0.55-0.45-1-1-1h-2c-0.55 0-1 0.45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c0.74 0 1.34-0.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                        </svg>
                        <span className="text-[12px] text-[#64748B] font-medium">
                          {device.batteryLevel}%
                        </span>
                      </div>
                    )}

                    {/* Connect Button */}
                    <button
                      onClick={() => handleConnectDevice(device)}
                      disabled={connectingDevice === device.id}
                      className={`px-4 py-2 rounded-[999px] text-[14px] font-medium transition-all duration-200 ${device.isConnected
                        ? 'bg-[#10B981] text-white'
                        : connectingDevice === device.id
                          ? 'bg-[#F59E0B] text-white'
                          : 'bg-[#4A90E2] text-white hover:bg-[#3A7BD5]'
                        }`}
                    >
                      {device.isConnected
                        ? 'Connected'
                        : connectingDevice === device.id
                          ? 'Connecting...'
                          : 'Connect'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-[12px] text-[#64748B] font-medium">
                Select a device to connect and start monitoring
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Password Input Popup */}
      {showPasswordPopup && selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px] mb-2">
                Enter Password
              </h3>
              <p className="text-[14px] text-[#64748B] font-medium">
                Connect to {selectedDevice.name}
              </p>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter device password"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              {passwordError && (
                <p className="text-[12px] text-red-500 mt-2 font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPasswordPopup(false)
                  setPasswordError('')
                  setPasswordInput('')
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-[#64748B] rounded-[16px] text-[14px] font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-3 bg-[#4A90E2] text-white rounded-[16px] text-[14px] font-medium hover:bg-[#3A7BD5] transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successNotification && (
        <div className="fixed top-4 right-4 z-50 bg-[#10B981] text-white px-6 py-4 rounded-[16px] shadow-[0_8px_32px_rgba(16,185,129,0.3)] backdrop-blur-sm animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-[14px] font-medium">
              {successNotification}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
