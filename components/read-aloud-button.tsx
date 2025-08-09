"use client"

import React from "react"
import { Volume2, VolumeX, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTTS } from "@/context/tts-context"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"

interface ReadAloudButtonProps {
  text: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ghost" | "outline" | "floating"
  showLabel?: boolean
  ariaLabel?: string
}

export function ReadAloudButton({ 
  text, 
  className = "",
  size = "sm",
  variant = "ghost",
  showLabel = false,
  ariaLabel
}: ReadAloudButtonProps) {
  const { isEnabled, isSpeaking, isSupported, speak, stop, pause, resume } = useTTS()
  const { t } = useLanguage()

  if (!isSupported || !isEnabled) {
    return null
  }

  const handleClick = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8 p-1"
      case "md":
        return "h-10 w-10 p-2"
      case "lg":
        return "h-12 w-12 p-3"
      default:
        return "h-8 w-8 p-1"
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "floating":
        return "fixed bottom-20 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full"
      case "outline":
        return "border border-gray-300 hover:bg-gray-50"
      case "default":
        return "bg-blue-600 hover:bg-blue-700 text-white"
      default:
        return "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
    }
  }

  const buttonLabel = ariaLabel || (isSpeaking ? "Stop reading" : "Read aloud")

  return (
    <Button
      onClick={handleClick}
      className={cn(
        getSizeClasses(),
        getVariantClasses(),
        "transition-all duration-200 flex items-center gap-2",
        className
      )}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {isSpeaking ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="text-sm font-medium">
          {isSpeaking ? "Stop" : "Read"}
        </span>
      )}
    </Button>
  )
}

// Floating Read Aloud Button for entire page
export function FloatingReadAloudButton() {
  const { isEnabled, isSupported } = useTTS()

  if (!isSupported || !isEnabled) {
    return null
  }

  // Get all readable text from the page
  const getPageText = () => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, label, input[placeholder], textarea[placeholder]')
    const textContent: string[] = []
    
    elements.forEach(element => {
      const text = element.textContent?.trim()
      if (text && text.length > 0) {
        // Skip if element is hidden or has display: none
        const style = window.getComputedStyle(element)
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          textContent.push(text)
        }
      }
      
      // Also get placeholder text
      const placeholder = (element as HTMLInputElement).placeholder
      if (placeholder) {
        textContent.push(placeholder)
      }
    })
    
    return textContent.join('. ')
  }

  return (
    <ReadAloudButton
      text={getPageText()}
      variant="floating"
      size="lg"
      ariaLabel="Read entire page aloud"
    />
  )
}