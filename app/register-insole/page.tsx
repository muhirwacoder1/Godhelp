import { Plus } from "lucide-react"

export default function RegisterInsolePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Register New Insole</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Connect a New Device</h2>
          <p className="text-gray-500">Follow these steps to connect your new smart insole device</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              1
            </div>
            <div>
              <h3 className="font-medium">Power on your insole device</h3>
              <p className="text-gray-500">
                Press and hold the power button for 3 seconds until the LED light turns blue
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              2
            </div>
            <div>
              <h3 className="font-medium">Enable Bluetooth on your phone</h3>
              <p className="text-gray-500">Make sure your phone's Bluetooth is turned on and discoverable</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              3
            </div>
            <div>
              <h3 className="font-medium">Scan for devices</h3>
              <p className="text-gray-500">Click the button below to scan for available insole devices</p>
            </div>
          </div>
        </div>

        <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Scan for Devices
        </button>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Available Devices</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
            No devices found. Make sure your device is powered on and in pairing mode.
          </div>
        </div>
      </div>
    </div>
  )
}

