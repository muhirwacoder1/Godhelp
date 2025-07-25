"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Calculator, 
  Apple, 
  Heart, 
  X, 
  Play, 
  CheckCircle,
  Activity,
  User,
  Settings,
  Shield,
  Trash2,
  Bell,
  BellOff,
  Globe,
  Smartphone,
  Key,
  AlertTriangle
} from "lucide-react"

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
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/icons/user.png",
    greeting: getGreeting()
  })
  
  // More features state
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [activeFeature, setActiveFeature] = useState<'bmi' | 'nutrition' | 'heartrate' | null>(null)
  
  // BMI Calculator states
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmiResult, setBmiResult] = useState<number | null>(null)
  
  // Heart Rate Measurement states
  const [isHeartRateMeasuring, setIsHeartRateMeasuring] = useState(false)
  const [heartRateProgress, setHeartRateProgress] = useState(0)
  const [measuredHeartRate, setMeasuredHeartRate] = useState<number | null>(null)
  
  // Blood glucose state for nutrition recommendations
  const [bloodGlucose, setBloodGlucose] = useState('')
  const [showGlucoseInput, setShowGlucoseInput] = useState(true)
  
  // Profile editing state
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [editingProfile, setEditingProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar
  })
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [show2FASetup, setShow2FASetup] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

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

  // BMI Calculator functions
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100
      const weightInKg = parseFloat(weight)
      const bmi = weightInKg / (heightInMeters * heightInMeters)
      setBmiResult(Math.round(bmi * 10) / 10)
    }
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' }
    if (bmi < 25) return { category: 'Normal', color: '#10B981' }
    if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' }
    return { category: 'Obese', color: '#EF4444' }
  }

  // Heart Rate Measurement with 6-second duration
  const startHeartRateMeasurement = () => {
    setIsHeartRateMeasuring(true)
    setHeartRateProgress(0)
    setMeasuredHeartRate(null)

    const interval = setInterval(() => {
      setHeartRateProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsHeartRateMeasuring(false)
          // Simulate measured heart rate (70-100 bpm) - always show "Normal"
          const simulatedRate = Math.floor(Math.random() * 20) + 75 // 75-95 bpm (normal range)
          setMeasuredHeartRate(simulatedRate)
          return 100
        }
        return prev + (100 / 60) // 6 seconds = 60 intervals of 100ms
      })
    }, 100)
  }

  // Get blood glucose category
  const getGlucoseCategory = (glucose: number) => {
    if (glucose < 70) return 'low'
    if (glucose <= 99) return 'normal'
    if (glucose <= 125) return 'prediabetic'
    return 'diabetic'
  }

  // Nutritional recommendations based on blood glucose
  const getNutritionalRecommendations = () => {
    if (!bloodGlucose) return []
    
    const glucoseLevel = parseFloat(bloodGlucose)
    const category = getGlucoseCategory(glucoseLevel)
    
    const recommendations = {
      low: [
        {
          title: "Quick Carbohydrates",
          description: "Consume 15-20g of fast-acting carbs (glucose tablets, juice)",
          icon: "🍯",
          priority: "high"
        },
        {
          title: "Follow-up Snack",
          description: "Eat a protein + complex carb snack after 15 minutes",
          icon: "🥜",
          priority: "high"
        },
        {
          title: "Monitor Closely",
          description: "Check blood sugar every 15 minutes until normal",
          icon: "⏰",
          priority: "high"
        },
        {
          title: "Avoid Exercise",
          description: "Rest until blood sugar stabilizes above 100 mg/dL",
          icon: "🛑",
          priority: "high"
        }
      ],
      normal: [
        {
          title: "Balanced Meals",
          description: "Maintain 45-65% carbs, 20-35% fats, 10-35% protein",
          icon: "⚖️",
          priority: "medium"
        },
        {
          title: "Regular Meal Timing",
          description: "Eat every 3-4 hours to maintain stable glucose",
          icon: "🕐",
          priority: "medium"
        },
        {
          title: "Complex Carbohydrates",
          description: "Choose whole grains, vegetables, and legumes",
          icon: "🌾",
          priority: "medium"
        },
        {
          title: "Stay Hydrated",
          description: "Drink 8-10 glasses of water daily",
          icon: "💧",
          priority: "medium"
        }
      ],
      prediabetic: [
        {
          title: "Reduce Simple Carbs",
          description: "Limit sugary drinks, white bread, and processed foods",
          icon: "🚫",
          priority: "high"
        },
        {
          title: "Increase Fiber",
          description: "Aim for 25-35g daily from vegetables and whole grains",
          icon: "🥬",
          priority: "high"
        },
        {
          title: "Portion Control",
          description: "Use smaller plates and measure serving sizes",
          icon: "🍽️",
          priority: "high"
        },
        {
          title: "Lean Proteins",
          description: "Include fish, chicken, tofu, and legumes",
          icon: "🐟",
          priority: "medium"
        },
        {
          title: "Regular Exercise",
          description: "30 minutes of moderate activity 5 days/week",
          icon: "🏃",
          priority: "high"
        }
      ],
      diabetic: [
        {
          title: "Carb Counting",
          description: "Track carbohydrates: 45-60g per meal, 15-20g per snack",
          icon: "🔢",
          priority: "high"
        },
        {
          title: "Low Glycemic Foods",
          description: "Choose foods with GI < 55 (oats, quinoa, sweet potato)",
          icon: "📊",
          priority: "high"
        },
        {
          title: "Consistent Meal Times",
          description: "Eat at the same times daily to match medication",
          icon: "⏰",
          priority: "high"
        },
        {
          title: "Healthy Fats",
          description: "Include nuts, olive oil, avocado (limit saturated fats)",
          icon: "🥑",
          priority: "medium"
        },
        {
          title: "Monitor Blood Sugar",
          description: "Check levels before meals and 2 hours after",
          icon: "🩸",
          priority: "high"
        },
        {
          title: "Limit Sodium",
          description: "Keep under 2,300mg daily to protect heart health",
          icon: "🧂",
          priority: "medium"
        }
      ]
    }
    
    return recommendations[category] || recommendations.normal
  }

  // Handle More button click
  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMoreMenu(true)
  }

  // Handle profile click
  const handleProfileClick = () => {
    setEditingProfile({
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar
    })
    setShowProfileEdit(true)
  }

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditingProfile(prev => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Save profile changes
  const saveProfile = () => {
    setUser(prev => ({
      ...prev,
      name: editingProfile.name,
      email: editingProfile.email,
      phone: editingProfile.phone,
      avatar: editingProfile.avatar
    }))
    setShowProfileEdit(false)
  }

  // Settings functions
  const handleSettingsClick = () => {
    setShowSettings(true)
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // Here you would typically save to backend/localStorage
  }

  const toggle2FA = () => {
    if (!twoFactorEnabled) {
      setShow2FASetup(true)
    } else {
      setTwoFactorEnabled(false)
      // Here you would disable 2FA on backend
    }
  }

  const setup2FA = () => {
    setTwoFactorEnabled(true)
    setShow2FASetup(false)
    // Here you would enable 2FA on backend
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDeleteAccount = () => {
    // Here you would delete account on backend
    alert('Account deletion would be processed here')
    setShowDeleteConfirm(false)
    setShowSettings(false)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setShowLanguageModal(false)
    // Here you would save language preference
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' }
  ]

  return (
    <>
      {/* Top Header with Profile and Icons - Mobile Only */}
      <div className="lg:hidden bg-gradient-to-r from-[#F8FAFC] via-white to-[#F8FAFC] px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-3">
          {/* Left: Profile Photo - Clickable */}
          <button onClick={handleProfileClick} className="relative">
            <Avatar className="w-12 h-12 border-2 border-white shadow-[0_4px_12px_rgba(74,144,226,0.15)] hover:shadow-[0_6px_16px_rgba(74,144,226,0.25)] transition-all duration-200 cursor-pointer">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] text-white font-semibold text-[16px]">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {/* Edit indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[8px]">✏️</span>
            </div>
          </button>

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
            <button onClick={handleSettingsClick}>
              <Image
                src="/icons/settings.svg"
                alt="Settings"
                width={24}
                height={24}
                className="icon-hover icon-filter-inactive hover:icon-filter-active transition-all duration-200 cursor-pointer"
              />
            </button>
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
              item.id === 'more' ? (
                <button
                  key={item.id}
                  onClick={handleMoreClick}
                  className={cn(
                    // Base styles - circle buttons by default
                    "nav-item-tap relative flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]",
                    // Default state - small circles
                    "w-10 h-10 rounded-full text-white/70 hover:text-white/90 hover:scale-110"
                  )}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="brightness-0 invert transition-all duration-300"
                    />
                  </div>
                </button>
              ) : (
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
              )
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

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border-t border-white/30 rounded-t-[24px] p-6 w-full max-w-md shadow-[0_-20px_40px_rgba(0,0,0,0.15)] animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                Health Tools
              </h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveFeature('bmi')
                  setShowMoreMenu(false)
                }}
                className="w-full flex items-center gap-4 p-4 rounded-[16px] bg-gradient-to-r from-[#3B82F6]/10 to-[#1D4ED8]/10 border border-[#3B82F6]/20 hover:from-[#3B82F6]/20 hover:to-[#1D4ED8]/20 transition-all"
              >
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-[12px] flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div className="text-left">
                  <p className="text-[16px] font-semibold text-[#1E293B]">BMI Calculator</p>
                  <p className="text-[12px] text-[#64748B]">Calculate your body mass index</p>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setActiveFeature('nutrition')
                  setShowMoreMenu(false)
                  setShowGlucoseInput(true)
                  setBloodGlucose('')
                }}
                className="w-full flex items-center gap-4 p-4 rounded-[16px] bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 hover:from-[#10B981]/20 hover:to-[#059669]/20 transition-all"
              >
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-[12px] flex items-center justify-center">
                  <Apple className="h-6 w-6 text-[#10B981]" />
                </div>
                <div className="text-left">
                  <p className="text-[16px] font-semibold text-[#1E293B]">Nutrition Guide</p>
                  <p className="text-[12px] text-[#64748B]">Personalized recommendations</p>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setActiveFeature('heartrate')
                  setShowMoreMenu(false)
                }}
                className="w-full flex items-center gap-4 p-4 rounded-[16px] bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 hover:from-[#EF4444]/20 hover:to-[#DC2626]/20 transition-all"
              >
                <div className="w-12 h-12 bg-[#EF4444]/10 rounded-[12px] flex items-center justify-center">
                  <Heart className="h-6 w-6 text-[#EF4444]" />
                </div>
                <div className="text-left">
                  <p className="text-[16px] font-semibold text-[#1E293B]">Heart Rate Test</p>
                  <p className="text-[12px] text-[#64748B]">Measure your pulse with animation</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Modals */}
      {activeFeature && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] max-h-[80vh] overflow-y-auto">
            {/* BMI Calculator */}
            {activeFeature === 'bmi' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-[12px] flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                      BMI Calculator
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height in cm"
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight in kg"
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    />
                  </div>

                  <Button
                    onClick={calculateBMI}
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                    disabled={!height || !weight}
                  >
                    Calculate BMI
                  </Button>

                  {bmiResult && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-[#3B82F6]/10 to-[#1D4ED8]/10 rounded-[16px] border border-[#3B82F6]/20">
                      <div className="text-center">
                        <p className="text-[24px] font-bold text-[#1E293B] mb-1">{bmiResult}</p>
                        <p className="text-[14px] font-medium" style={{ color: getBMICategory(bmiResult).color }}>
                          {getBMICategory(bmiResult).category}
                        </p>
                        <div className="mt-3 text-[12px] text-[#64748B]">
                          <p>Normal range: 18.5 - 24.9</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Nutrition Recommendations */}
            {activeFeature === 'nutrition' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#10B981]/10 rounded-[12px] flex items-center justify-center">
                      <Apple className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                      Nutrition Guide
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {showGlucoseInput ? (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-[24px]">🩸</span>
                      </div>
                      <p className="text-[14px] text-[#64748B]">
                        Enter your current blood glucose level for personalized nutrition recommendations
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">
                        Blood Glucose (mg/dL)
                      </label>
                      <input
                        type="number"
                        value={bloodGlucose}
                        onChange={(e) => setBloodGlucose(e.target.value)}
                        placeholder="Enter glucose level (e.g., 95)"
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                      <p className="text-[12px] text-[#64748B] mt-1">
                        Normal range: 70-99 mg/dL (fasting)
                      </p>
                    </div>

                    <Button
                      onClick={() => setShowGlucoseInput(false)}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white"
                      disabled={!bloodGlucose}
                    >
                      Get Nutrition Guide
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Blood Glucose Status */}
                    {bloodGlucose && (
                      <div className={`p-4 rounded-[16px] border text-center ${
                        getGlucoseCategory(parseFloat(bloodGlucose)) === 'low' ? 'bg-[#EF4444]/10 border-[#EF4444]/20' :
                        getGlucoseCategory(parseFloat(bloodGlucose)) === 'normal' ? 'bg-[#10B981]/10 border-[#10B981]/20' :
                        getGlucoseCategory(parseFloat(bloodGlucose)) === 'prediabetic' ? 'bg-[#F59E0B]/10 border-[#F59E0B]/20' :
                        'bg-[#EF4444]/10 border-[#EF4444]/20'
                      }`}>
                        <p className="text-[18px] font-bold text-[#1E293B] mb-1">{bloodGlucose} mg/dL</p>
                        <p className={`text-[14px] font-medium capitalize ${
                          getGlucoseCategory(parseFloat(bloodGlucose)) === 'low' ? 'text-[#EF4444]' :
                          getGlucoseCategory(parseFloat(bloodGlucose)) === 'normal' ? 'text-[#10B981]' :
                          getGlucoseCategory(parseFloat(bloodGlucose)) === 'prediabetic' ? 'text-[#F59E0B]' :
                          'text-[#EF4444]'
                        }`}>
                          {getGlucoseCategory(parseFloat(bloodGlucose)).replace('diabetic', 'Diabetic')}
                        </p>
                        <button
                          onClick={() => {
                            setShowGlucoseInput(true)
                            setBloodGlucose('')
                          }}
                          className="text-[12px] text-[#64748B] underline mt-2"
                        >
                          Change glucose level
                        </button>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {getNutritionalRecommendations().map((rec, index) => (
                        <div key={index} className={`p-4 rounded-[16px] border ${
                          rec.priority === 'high' 
                            ? 'bg-[#EF4444]/5 border-[#EF4444]/20' 
                            : 'bg-[#F59E0B]/5 border-[#F59E0B]/20'
                        }`}>
                          <div className="flex items-start gap-3">
                            <span className="text-[20px]">{rec.icon}</span>
                            <div>
                              <h4 className="text-[14px] font-semibold text-[#1E293B] mb-1">{rec.title}</h4>
                              <p className="text-[12px] text-[#64748B]">{rec.description}</p>
                              <span className={`inline-block mt-2 px-2 py-1 rounded-full text-[10px] font-medium ${
                                rec.priority === 'high' 
                                  ? 'bg-[#EF4444] text-white' 
                                  : 'bg-[#F59E0B] text-white'
                              }`}>
                                {rec.priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Heart Rate Measurement with Animation */}
            {activeFeature === 'heartrate' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EF4444]/10 rounded-[12px] flex items-center justify-center">
                      <Heart className="h-5 w-5 text-[#EF4444]" />
                    </div>
                    <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                      Heart Rate Test
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="text-center space-y-6">
                  {!isHeartRateMeasuring && !measuredHeartRate && (
                    <>
                      <div className="w-24 h-24 bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-12 w-12 text-[#EF4444]" />
                      </div>
                      <p className="text-[14px] text-[#64748B] mb-4">
                        Place your finger on the camera and flash to measure your heart rate
                      </p>
                      <Button
                        onClick={startHeartRateMeasurement}
                        className="bg-[#EF4444] hover:bg-[#DC2626] text-white w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Measurement
                      </Button>
                    </>
                  )}

                  {isHeartRateMeasuring && (
                    <>
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        {/* Pulsing heart with rhythm animation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center animate-pulse">
                          <Heart className="h-12 w-12 text-white animate-bounce" />
                        </div>
                        {/* Heart rhythm waves */}
                        <div className="absolute -inset-4">
                          <div className="w-full h-full border-2 border-[#EF4444]/30 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute -inset-8">
                          <div className="w-full h-full border-2 border-[#EF4444]/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        {/* ECG-like line animation */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Activity className="h-6 w-6 text-[#EF4444] animate-pulse" />
                        </div>
                      </div>
                      <p className="text-[14px] text-[#64748B] mb-4">
                        Measuring... Keep your finger steady
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] h-3 rounded-full transition-all duration-100"
                          style={{ width: `${heartRateProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-[12px] text-[#64748B]">{Math.round(heartRateProgress)}% complete</p>
                    </>
                  )}

                  {measuredHeartRate && !isHeartRateMeasuring && (
                    <>
                      <div className="w-24 h-24 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-12 w-12 text-[#10B981]" />
                      </div>
                      <div className="p-6 bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 rounded-[16px] border border-[#10B981]/20">
                        <p className="text-[36px] font-bold text-[#1E293B] mb-1">{measuredHeartRate}</p>
                        <p className="text-[16px] font-medium text-[#10B981] mb-2">BPM</p>
                        <p className="text-[14px] font-semibold text-[#10B981]">Normal</p>
                        <p className="text-[12px] text-[#64748B] mt-2">
                          Your heart rate is within the normal range
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setMeasuredHeartRate(null)
                          setHeartRateProgress(0)
                        }}
                        variant="outline"
                        className="mt-4 w-full"
                      >
                        Measure Again
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4A90E2]/10 rounded-[12px] flex items-center justify-center">
                  <User className="h-5 w-5 text-[#4A90E2]" />
                </div>
                <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                  Edit Profile
                </h3>
              </div>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={editingProfile.avatar} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] text-white font-semibold text-[20px]">
                      {editingProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4A90E2] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3A7BD5] transition-colors shadow-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-white text-[12px]">📷</span>
                  </label>
                </div>
                <p className="text-[12px] text-[#64748B] mt-2">Tap camera to change photo</p>
              </div>

              {/* Name Field */}
              <div>
                <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={editingProfile.email}
                  onChange={(e) => setEditingProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={editingProfile.phone}
                  onChange={(e) => setEditingProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-[16px] text-[16px] text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowProfileEdit(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveProfile}
                  className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BD5] text-white"
                  disabled={!editingProfile.name.trim() || !editingProfile.email.trim()}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[400] flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border-t border-white/30 rounded-t-[24px] p-6 w-full max-w-md shadow-[0_-20px_40px_rgba(0,0,0,0.15)] animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Two Factor Authentication */}
              <div className="flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-[10px] flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1E293B]">Two-Factor Auth</p>
                    <p className="text-[12px] text-[#64748B]">
                      {twoFactorEnabled ? 'Enabled' : 'Add extra security'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggle2FA}
                  className={`px-4 py-2 rounded-[12px] text-[12px] font-medium transition-colors ${
                    twoFactorEnabled 
                      ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]' 
                      : 'bg-[#10B981] text-white hover:bg-[#059669]'
                  }`}
                >
                  {twoFactorEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#3B82F6]/10 to-[#1D4ED8]/10 border border-[#3B82F6]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-[10px] flex items-center justify-center">
                    {notificationsEnabled ? (
                      <Bell className="h-5 w-5 text-[#3B82F6]" />
                    ) : (
                      <BellOff className="h-5 w-5 text-[#3B82F6]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1E293B]">Notifications</p>
                    <p className="text-[12px] text-[#64748B]">
                      {notificationsEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleNotifications}
                  className={`px-4 py-2 rounded-[12px] text-[12px] font-medium transition-colors ${
                    notificationsEnabled 
                      ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]' 
                      : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                  }`}
                >
                  {notificationsEnabled ? 'Turn Off' : 'Turn On'}
                </button>
              </div>

              {/* Language */}
              <button
                onClick={() => setShowLanguageModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 hover:from-[#8B5CF6]/20 hover:to-[#7C3AED]/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-[10px] flex items-center justify-center">
                    <Globe className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-semibold text-[#1E293B]">Language</p>
                    <p className="text-[12px] text-[#64748B]">{selectedLanguage}</p>
                  </div>
                </div>
                <div className="text-[16px]">
                  {languages.find(lang => lang.name === selectedLanguage)?.flag}
                </div>
              </button>

              {/* Delete Account */}
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-3 p-4 rounded-[16px] bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 hover:from-[#EF4444]/20 hover:to-[#DC2626]/20 transition-all"
              >
                <div className="w-10 h-10 bg-[#EF4444]/10 rounded-[10px] flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-[#EF4444]" />
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-[#EF4444]">Delete Account</p>
                  <p className="text-[12px] text-[#64748B]">Permanently remove your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-[12px] flex items-center justify-center">
                  <Globe className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                  Select Language
                </h3>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all ${
                    selectedLanguage === language.name
                      ? 'bg-[#8B5CF6]/20 border-2 border-[#8B5CF6]/30'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <span className="text-[24px]">{language.flag}</span>
                  <div className="text-left flex-1">
                    <p className="text-[16px] font-medium text-[#1E293B]">{language.name}</p>
                  </div>
                  {selectedLanguage === language.name && (
                    <CheckCircle className="h-5 w-5 text-[#8B5CF6]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-[12px] flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#10B981]" />
                </div>
                <h3 className="text-[20px] leading-[24px] font-semibold text-[#1E293B] tracking-[-0.2px]">
                  Setup 2FA
                </h3>
              </div>
              <button
                onClick={() => setShow2FASetup(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="h-10 w-10 text-[#10B981]" />
              </div>
              
              <div>
                <h4 className="text-[16px] font-semibold text-[#1E293B] mb-2">Secure Your Account</h4>
                <p className="text-[14px] text-[#64748B] mb-4">
                  Two-factor authentication adds an extra layer of security to your account
                </p>
              </div>

              <div className="bg-gray-50 rounded-[16px] p-4 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="h-5 w-5 text-[#10B981]" />
                  <span className="text-[14px] font-medium text-[#1E293B]">Setup Steps:</span>
                </div>
                <ol className="text-[12px] text-[#64748B] space-y-1 ml-8">
                  <li>1. Download an authenticator app</li>
                  <li>2. Scan the QR code</li>
                  <li>3. Enter the verification code</li>
                </ol>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShow2FASetup(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={setup2FA}
                  className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white"
                >
                  Enable 2FA
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 w-full max-w-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-10 w-10 text-[#EF4444]" />
              </div>
              
              <div>
                <h4 className="text-[18px] font-bold text-[#EF4444] mb-2">Delete Account?</h4>
                <p className="text-[14px] text-[#64748B] mb-4">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <div className="bg-[#EF4444]/5 rounded-[16px] p-4 border border-[#EF4444]/20">
                <p className="text-[12px] text-[#EF4444] font-medium">
                  ⚠️ This will permanently delete:
                </p>
                <ul className="text-[11px] text-[#64748B] mt-2 space-y-1">
                  <li>• Your profile and personal data</li>
                  <li>• All health records and analytics</li>
                  <li>• Device connections and settings</li>
                  <li>• Appointment history</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteAccount}
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}