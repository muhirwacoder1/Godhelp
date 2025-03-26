const express = require("express")
const cors = require("cors")
const axios = require("axios")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000

// Enable CORS for all routes
app.use(cors())

// Parse JSON request bodies
app.use(express.json())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")))

// Endpoint to fetch the latest health data
app.get("/api/health-data", async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get("https://testit-theta.vercel.app/api/latest", {
      timeout: 5000, // 5 second timeout
    })
    
    // Transform the data to match the frontend's expected format
    const transformedData = {
      heel: response.data.fsr1 || 0,
      middle: response.data.fsr2 || 0,
      toe: response.data.fsr3 || 0,
      // Set heart rate between 89-91
      heartRate: Math.floor(Math.random() * (92 - 89) + 89),
      // Set temperature between 36.5-36.8
      temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
      timestamp: response.data.timestamp,
      // Include the original status values from the API
      heelStatus: response.data.status1,
      middleStatus: response.data.status2,
      toeStatus: response.data.status3
    }

    // Return the transformed data to the client
    res.json(transformedData)
  } catch (error) {
    console.error("Error fetching health data:", error.message)

    // If the external API fails, return fallback data
    const fallbackData = generateFallbackData()
    res.json(fallbackData)
  }
})

// Endpoint to fetch historical health data
app.get("/api/historical-data", async (req, res) => {
  try {
    // Try to fetch from the external API once to check if it's available
    const response = await axios.get("https://testit-theta.vercel.app/api/latest", {
      timeout: 5000, // 5 second timeout
    })

    // Generate historical data based on the latest data point
    const historicalData = generateHistoricalData(response.data)
    res.json(historicalData)
  } catch (error) {
    console.error("Error fetching historical data:", error.message)

    // If the external API fails, return fallback historical data
    const fallbackData = generateFallbackHistoricalData()
    res.json(fallbackData)
  }
})

// Helper function to generate fallback data
function generateFallbackData() {
  return {
    heel: Math.floor(Math.random() * 100) + 50,
    middle: Math.floor(Math.random() * 100) + 100,
    toe: Math.floor(Math.random() * 100) + 75,
    // Set heart rate between 89-91
    heartRate: Math.floor(Math.random() * (92 - 89) + 89),
    // Set temperature between 36.5-36.8
    temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
    timestamp: new Date().toISOString(),
  }
}

// Helper function to generate historical data based on latest data
function generateHistoricalData(latestData) {
  const historicalData = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now)
    time.setHours(now.getHours() - i)

    // Create a variation of the latest data
    const variation = 0.15 // 15% variation
    const dataPoint = {
      heel: Math.max(10, Math.round(latestData.heel * (1 + (Math.random() * 2 - 1) * variation))),
      middle: Math.max(10, Math.round(latestData.middle * (1 + (Math.random() * 2 - 1) * variation))),
      toe: Math.max(10, Math.round(latestData.toe * (1 + (Math.random() * 2 - 1) * variation))),
      // Set heart rate between 89-91 with minimal variation
      heartRate: Math.floor(Math.random() * (92 - 89) + 89),
      // Set temperature between 36.5-36.8 with minimal variation
      temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
      timestamp: time.toISOString(),
    }

    historicalData.push(dataPoint)
  }

  return historicalData
}

// Helper function to generate fallback historical data
function generateFallbackHistoricalData() {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now)
    time.setHours(now.getHours() - i)

    data.push({
      heel: Math.floor(Math.random() * 100) + 50,
      middle: Math.floor(Math.random() * 100) + 100,
      toe: Math.floor(Math.random() * 100) + 75,
      // Set heart rate between 89-91
      heartRate: Math.floor(Math.random() * (92 - 89) + 89),
      // Set temperature between 36.5-36.8
      temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
      timestamp: time.toISOString(),
    })
  }

  return data
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health data API available at http://localhost:${PORT}/api/health-data`)
  console.log(`Historical data API available at http://localhost:${PORT}/api/historical-data`)
})
