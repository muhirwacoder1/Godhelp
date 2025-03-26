import { User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">Patient ID: 12345</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span>john.doe@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date of Birth</span>
                <span>January 1, 1980</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Medical Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Type</span>
                <span>A+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Height</span>
                <span>175 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weight</span>
                <span>70 kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-medium mb-2">Insole Devices</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Smart Insole v2</p>
                <p className="text-sm text-gray-500">Connected since: March 15, 2025</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg">Edit Profile</button>
      </div>
    </div>
  )
}

