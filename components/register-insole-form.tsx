"use client"

import { useState, useCallback, useMemo } from "react"
import { 
  Bluetooth, 
  Power, 
  Search, 
  Check, 
  Smartphone, 
  Loader2, 
  ArrowRight,
  Info
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReadAloudButton } from "@/components/read-aloud-button"
import { TTSText, TTSLabel } from "@/components/tts-text"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

// Lazy-loaded mock devices for demonstration
const getMockDevices = () => [
  { id: "SI-2023-001", name: "Smart Insole #1", signal: "Strong", batteryLevel: 100 },
  { id: "SI-2023-002", name: "Smart Insole #2", signal: "Medium", batteryLevel: 85 }
]

type Device = {
  id: string
  name: string
  signal: string
  batteryLevel: number
}

export function RegisterInsoleForm() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("setup")
  const [isScanning, setIsScanning] = useState(false)
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [deviceName, setDeviceName] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  
  // Optimized scanning for devices with useCallback
  const scanForDevices = useCallback(() => {
    setIsScanning(true)
    setDevices([])
    
    // Simulate finding devices after a shorter delay for better UX
    setTimeout(() => {
      setDevices(getMockDevices())
      setIsScanning(false)
    }, 1500) // Reduced from 3000ms to 1500ms
  }, [])
  
  // Optimized device selection with useCallback
  const selectDevice = useCallback((deviceId: string) => {
    setSelectedDevice(deviceId)
    const mockDevices = getMockDevices()
    const device = mockDevices.find(d => d.id === deviceId)
    if (device) {
      setDeviceName(device.name)
    }
    setActiveTab("configure")
  }, [])
  
  // Optimized device registration with useCallback
  const registerDevice = useCallback(() => {
    // Here you would typically send the registration data to your backend
    setRegistrationComplete(true)
    setActiveTab("complete")
  }, [])
  
  // Optimized form reset with useCallback
  const resetForm = useCallback(() => {
    setIsScanning(false)
    setDevices([])
    setSelectedDevice(null)
    setDeviceName("")
    setRegistrationComplete(false)
    setActiveTab("setup")
  }, [])
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup" disabled={activeTab === "configure" || activeTab === "complete"}>
            1. Setup
          </TabsTrigger>
          <TabsTrigger value="configure" disabled={!selectedDevice || activeTab === "complete"}>
            2. Configure
          </TabsTrigger>
          <TabsTrigger value="complete" disabled={!registrationComplete}>
            3. Complete
          </TabsTrigger>
        </TabsList>
        
        {/* Setup Tab */}
        <TabsContent value="setup" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">Connect Your Smart Insole</CardTitle>
                <ReadAloudButton 
                  text="Connect Your Smart Insole. Follow these steps to connect your new smart insole device to the app"
                  size="sm"
                />
              </div>
              <CardDescription className="text-gray-600 text-base">
                Follow these steps to connect your new smart insole device to the app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                  1
                </div>
                <div className="space-y-2">
                  <TTSText className="text-xl font-medium text-gray-800">Power on your insole device</TTSText>
                  <TTSText className="text-gray-600">
                    Press and hold the power button for 3 seconds until the LED light turns blue
                  </TTSText>
                  <div className="flex items-center mt-2 text-blue-600">
                    <Power className="w-5 h-5 mr-2" />
                    <TTSText className="text-sm font-medium">Make sure the device is charged</TTSText>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                  2
                </div>
                <div className="space-y-2">
                  <TTSText className="text-xl font-medium text-gray-800">Enable Bluetooth on your device</TTSText>
                  <TTSText className="text-gray-600">
                    Make sure your device's Bluetooth is turned on and discoverable
                  </TTSText>
                  <div className="flex items-center mt-2 text-blue-600">
                    <Bluetooth className="w-5 h-5 mr-2" />
                    <TTSText className="text-sm font-medium">Bluetooth must be enabled for pairing</TTSText>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                  3
                </div>
                <div className="space-y-2">
                  <TTSText className="text-xl font-medium text-gray-800">Scan for available devices</TTSText>
                  <TTSText className="text-gray-600">
                    Click the button below to scan for available insole devices in range
                  </TTSText>
                  <div className="flex items-center mt-2 text-blue-600">
                    <Search className="w-5 h-5 mr-2" />
                    <TTSText className="text-sm font-medium">Keep the device within 10 meters</TTSText>
                  </div>
                </div>
              </motion.div>
              
              {/* Scan Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button 
                  onClick={scanForDevices} 
                  disabled={isScanning}
                  className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <TTSText>Scanning for Devices...</TTSText>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      <TTSText>Scan for Devices</TTSText>
                    </>
                  )}
                </Button>
              </motion.div>
              
              {/* Available Devices */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Available Devices</h3>
                
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-blue-50 p-6 rounded-lg flex items-center justify-center"
                    >
                      <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
                      <p className="text-blue-600 font-medium">Scanning for devices...</p>
                    </motion.div>
                  )}
                  
                  {!isScanning && devices.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-50 p-6 rounded-lg text-center"
                    >
                      <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <TTSText className="text-gray-600">
                        No devices found. Make sure your device is powered on and in pairing mode.
                      </TTSText>
                    </motion.div>
                  )}
                  
                  {!isScanning && devices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      {devices.map((device) => (
                        <motion.div
                          key={device.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.01 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer flex justify-between items-center ${
                            selectedDevice === device.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => selectDevice(device.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Bluetooth className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <TTSText className="font-medium text-gray-800">{device.name}</TTSText>
                              <TTSText className="text-sm text-gray-500">ID: {device.id}</TTSText>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <TTSText className="text-sm font-medium text-gray-700">Signal</TTSText>
                              <TTSText className="text-sm text-gray-500">{device.signal}</TTSText>
                            </div>
                            
                            <div className="text-right">
                              <TTSText className="text-sm font-medium text-gray-700">Battery</TTSText>
                              <TTSText className="text-sm text-gray-500">{device.batteryLevel}%</TTSText>
                            </div>
                            
                            {selectedDevice === device.id && (
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Check className="w-5 h-5 text-blue-600" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      
                      <div className="flex justify-end mt-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => setActiveTab("configure")} 
                                disabled={!selectedDevice}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Continue to Configuration
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            {!selectedDevice && (
                              <TooltipContent>
                                <p>Please select a device first</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configure Tab */}
        <TabsContent value="configure" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">Configure Your Device</CardTitle>
                <ReadAloudButton 
                  text="Configure Your Device. Customize your smart insole settings"
                  size="sm"
                />
              </div>
              <CardDescription className="text-gray-600 text-base">
                Customize your smart insole settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800">Device Selected</AlertTitle>
                <AlertDescription className="text-blue-700">
                  You've selected {devices.find(d => d.id === selectedDevice)?.name} (ID: {selectedDevice})
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                {/* Serial Number */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TTSLabel htmlFor="serialNumber" className="text-gray-700">
                      {t.registerInsole.serialNumber}
                    </TTSLabel>
                  </div>
                  <Input 
                    id="serialNumber" 
                    placeholder={t.registerInsole.enterSerialNumber}
                    className="h-11"
                  />
                  <TTSText className="text-sm text-gray-500">
                    Enter the serial number found on your device
                  </TTSText>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TTSLabel htmlFor="email" className="text-gray-700">
                      {t.registerInsole.email}
                    </TTSLabel>
                  </div>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder={t.registerInsole.enterEmail}
                    className="h-11"
                  />
                  <TTSText className="text-sm text-gray-500">
                    Your email address for device notifications
                  </TTSText>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TTSLabel htmlFor="phone" className="text-gray-700">
                      {t.registerInsole.phone}
                    </TTSLabel>
                  </div>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder={t.registerInsole.enterPhone}
                    className="h-11"
                  />
                  <TTSText className="text-sm text-gray-500">
                    Your phone number for emergency alerts
                  </TTSText>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TTSLabel htmlFor="fullName" className="text-gray-700">
                      {t.registerInsole.fullName}
                    </TTSLabel>
                  </div>
                  <Input 
                    id="fullName" 
                    placeholder={t.registerInsole.enterFullName}
                    className="h-11"
                  />
                  <TTSText className="text-sm text-gray-500">
                    Your full name for device registration
                  </TTSText>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TTSLabel htmlFor="deviceName" className="text-gray-700">
                      Device Name
                    </TTSLabel>
                  </div>
                  <Input 
                    id="deviceName" 
                    value={deviceName} 
                    onChange={(e) => setDeviceName(e.target.value)} 
                    placeholder="Enter a name for your device"
                    className="h-11"
                  />
                  <TTSText className="text-sm text-gray-500">
                    Choose a name that will help you identify this device
                  </TTSText>
                </div>
                
                <div className="space-y-2">
                  <TTSLabel className="text-gray-700">Device Type</TTSLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-500 bg-blue-50 rounded-lg p-4 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <TTSText className="font-medium text-gray-800">Smart Insole</TTSText>
                        <TTSText className="text-sm text-gray-500">Foot pressure monitoring</TTSText>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center opacity-50">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-400">Other Device</div>
                        <div className="text-sm text-gray-400">Not available</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <TTSLabel className="text-gray-700">Notification Preferences</TTSLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <TTSText className="font-medium text-gray-800">Pressure Alerts</TTSText>
                        <TTSText className="text-sm text-gray-500">Notify when pressure is abnormal</TTSText>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <TTSText className="font-medium text-gray-800">Battery Alerts</TTSText>
                        <TTSText className="text-sm text-gray-500">Notify when battery is low</TTSText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("setup")}
              >
                <TTSText>Back</TTSText>
              </Button>
              <Button 
                onClick={registerDevice} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!deviceName.trim()}
              >
                <TTSText>{t.registerInsole.register}</TTSText>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Complete Tab */}
        <TabsContent value="complete" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">Registration Complete!</CardTitle>
                <ReadAloudButton 
                  text="Registration Complete! Your smart insole has been successfully registered"
                  size="sm"
                />
              </div>
              <CardDescription className="text-gray-600 text-base">
                Your smart insole has been successfully registered
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <Check className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <TTSText className="text-xl font-medium text-gray-800 mb-2">
                {deviceName} is now connected
              </TTSText>
              <TTSText className="text-gray-600 text-center max-w-md mb-6">
                Your smart insole is now connected and ready to use. You can start monitoring your foot pressure data immediately.
              </TTSText>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full max-w-md">
                <TTSText className="font-medium text-blue-800 mb-2">What's Next?</TTSText>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                    <TTSText>View your real-time foot pressure data on the dashboard</TTSText>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                    <TTSText>Set up custom alerts for pressure thresholds</TTSText>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                    <TTSText>Schedule appointments with healthcare professionals</TTSText>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={resetForm}
                variant="outline"
                className="mr-4"
              >
                <TTSText>{t.registerInsole.register}</TTSText>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <TTSText>Go to Dashboard</TTSText>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
