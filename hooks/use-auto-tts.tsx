"use client"

import { useEffect } from "react"
import { useTTS } from "@/context/tts-context"

// Automatically enhance text elements with TTS when enabled
export function useAutoTTS() {
  const { isEnabled, isSupported } = useTTS()

  useEffect(() => {
    if (!isEnabled || !isSupported) return

    // Function to add TTS buttons to text elements
    const enhanceTextElements = () => {
      // Select text elements that should get TTS buttons
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p:not([data-no-tts])',
        '.text-lg', '.text-xl', '.text-2xl', '.text-3xl',
        '[class*="font-semibold"]:not([data-no-tts])',
        '[class*="font-bold"]:not([data-no-tts])'
      ]

      textSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        
        elements.forEach(element => {
          // Skip if already has TTS button or is marked to skip
          if (element.querySelector('.tts-button') || 
              element.hasAttribute('data-no-tts') ||
              element.hasAttribute('data-tts-enhanced')) {
            return
          }

          const textContent = element.textContent?.trim()
          if (!textContent || textContent.length < 5) return

          // Create TTS button
          const ttsButton = document.createElement('button')
          ttsButton.className = 'tts-button ml-2 opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100'
          ttsButton.innerHTML = '🔊'
          ttsButton.setAttribute('aria-label', 'Read aloud')
          ttsButton.setAttribute('title', 'Read aloud')
          
          // Add click handler
          ttsButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            
            // Use the TTS speak function
            if (window.speechSynthesis) {
              window.speechSynthesis.cancel()
              const utterance = new SpeechSynthesisUtterance(textContent)
              window.speechSynthesis.speak(utterance)
            }
          })

          // Add button to element
          if (element.style.display !== 'flex') {
            element.style.display = 'inline-flex'
            element.style.alignItems = 'center'
            element.style.gap = '0.25rem'
          }
          
          element.appendChild(ttsButton)
          element.setAttribute('data-tts-enhanced', 'true')
        })
      })
    }

    // Initial enhancement
    enhanceTextElements()

    // Re-enhance when content changes (for dynamic content)
    const observer = new MutationObserver((mutations) => {
      let shouldEnhance = false
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldEnhance = true
        }
      })
      
      if (shouldEnhance) {
        setTimeout(enhanceTextElements, 100) // Small delay to ensure DOM is ready
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
      
      // Remove all TTS buttons when disabled
      const ttsButtons = document.querySelectorAll('.tts-button')
      ttsButtons.forEach(button => button.remove())
      
      // Remove enhancement markers
      const enhancedElements = document.querySelectorAll('[data-tts-enhanced]')
      enhancedElements.forEach(element => {
        element.removeAttribute('data-tts-enhanced')
      })
    }
  }, [isEnabled, isSupported])
}

// Component to automatically enhance a container
export function AutoTTSContainer({ children, className = "" }: { 
  children: React.ReactNode
  className?: string 
}) {
  useAutoTTS()
  
  return (
    <div className={className} data-auto-tts-container>
      {children}
    </div>
  )
}