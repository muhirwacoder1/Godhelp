"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useLanguage } from "./language-context"

// Define the TTS context type
type TTSContextType = {
  isEnabled: boolean
  isSpeaking: boolean
  isSupported: boolean
  toggleTTS: () => void
  speak: (text: string, options?: SpeechSynthesisUtteranceOptions) => void
  stop: () => void
  pause: () => void
  resume: () => void
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setVolume: (volume: number) => void
  rate: number
  pitch: number
  volume: number
}

// Speech synthesis utterance options
interface SpeechSynthesisUtteranceOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice | null
}

// Create the context with default values
const TTSContext = createContext<TTSContextType>({
  isEnabled: false,
  isSpeaking: false,
  isSupported: false,
  toggleTTS: () => {},
  speak: () => {},
  stop: () => {},
  pause: () => {},
  resume: () => {},
  setRate: () => {},
  setPitch: () => {},
  setVolume: () => {},
  rate: 1,
  pitch: 1,
  volume: 1
})

// Custom hook to use the TTS context
export const useTTS = () => useContext(TTSContext)

// Provider component
export const TTSProvider = ({ children }: { children: ReactNode }) => {
  const { currentLanguage } = useLanguage()
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(1)
  const [pitch, setPitch] = useState<number>(1)
  const [volume, setVolume] = useState<number>(1)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supported = 'speechSynthesis' in window
      setIsSupported(supported)
      
      if (supported) {
        // Load saved preferences
        const savedEnabled = localStorage.getItem('tts-enabled') === 'true'
        const savedRate = parseFloat(localStorage.getItem('tts-rate') || '1')
        const savedPitch = parseFloat(localStorage.getItem('tts-pitch') || '1')
        const savedVolume = parseFloat(localStorage.getItem('tts-volume') || '1')
        
        setIsEnabled(savedEnabled)
        setRate(savedRate)
        setPitch(savedPitch)
        setVolume(savedVolume)

        // Load available voices
        const loadVoices = () => {
          const availableVoices = speechSynthesis.getVoices()
          setVoices(availableVoices)
        }

        loadVoices()
        speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [])

  // Monitor speaking state
  useEffect(() => {
    if (!isSupported) return

    const checkSpeaking = () => {
      setIsSpeaking(speechSynthesis.speaking)
    }

    const interval = setInterval(checkSpeaking, 100)
    return () => clearInterval(interval)
  }, [isSupported])

  // Get the best voice for current language
  const getVoiceForLanguage = (lang: string): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null

    // Language mapping
    const langMap: { [key: string]: string[] } = {
      'en': ['en-US', 'en-GB', 'en'],
      'fr': ['fr-FR', 'fr-CA', 'fr'],
      'rw': ['rw', 'sw'] // Fallback to Swahili if Kinyarwanda not available
    }

    const preferredLangs = langMap[lang] || ['en-US', 'en']
    
    for (const prefLang of preferredLangs) {
      const voice = voices.find(v => v.lang.startsWith(prefLang))
      if (voice) return voice
    }

    // Fallback to default voice
    return voices.find(v => v.default) || voices[0] || null
  }

  // Toggle TTS on/off
  const toggleTTS = () => {
    const newEnabled = !isEnabled
    setIsEnabled(newEnabled)
    localStorage.setItem('tts-enabled', newEnabled.toString())
    
    if (!newEnabled) {
      stop()
    }
  }

  // Speak text
  const speak = (text: string, options: SpeechSynthesisUtteranceOptions = {}) => {
    if (!isSupported || !isEnabled || !text.trim()) return

    // Stop any current speech
    speechSynthesis.cancel()

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set voice based on current language
    const voice = getVoiceForLanguage(currentLanguage)
    if (voice) {
      utterance.voice = voice
    }

    // Set speech parameters
    utterance.rate = options.rate || rate
    utterance.pitch = options.pitch || pitch
    utterance.volume = options.volume || volume

    // Event handlers
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    // Speak
    speechSynthesis.speak(utterance)
  }

  // Stop speaking
  const stop = () => {
    if (isSupported) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // Pause speaking
  const pause = () => {
    if (isSupported && speechSynthesis.speaking) {
      speechSynthesis.pause()
    }
  }

  // Resume speaking
  const resume = () => {
    if (isSupported && speechSynthesis.paused) {
      speechSynthesis.resume()
    }
  }

  // Set rate and save to localStorage
  const setRateAndSave = (newRate: number) => {
    setRate(newRate)
    localStorage.setItem('tts-rate', newRate.toString())
  }

  // Set pitch and save to localStorage
  const setPitchAndSave = (newPitch: number) => {
    setPitch(newPitch)
    localStorage.setItem('tts-pitch', newPitch.toString())
  }

  // Set volume and save to localStorage
  const setVolumeAndSave = (newVolume: number) => {
    setVolume(newVolume)
    localStorage.setItem('tts-volume', newVolume.toString())
  }

  // Context value
  const contextValue: TTSContextType = {
    isEnabled,
    isSpeaking,
    isSupported,
    toggleTTS,
    speak,
    stop,
    pause,
    resume,
    setRate: setRateAndSave,
    setPitch: setPitchAndSave,
    setVolume: setVolumeAndSave,
    rate,
    pitch,
    volume
  }

  return (
    <TTSContext.Provider value={contextValue}>
      {children}
    </TTSContext.Provider>
  )
}