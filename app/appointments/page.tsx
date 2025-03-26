import { Calendar } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="bg-gray-100 p-10 rounded-lg flex flex-col items-center justify-center">
        <Calendar className="w-16 h-16 text-blue-600 mb-4" />
        <p className="text-gray-500">No upcoming appointments</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Schedule New Appointment</button>
      </div>
    </div>
  )
}

