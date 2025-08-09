"use client"

import React, { ReactNode, cloneElement, isValidElement } from "react"
import { useTTS } from "@/context/tts-context"
import { ReadAloudButton } from "@/components/read-aloud-button"

interface AutoTTSWrapperProps {
  children: ReactNode
  enabled?: boolean
}

// Text elements that should get TTS buttons
const TEXT_ELEMENTS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'div', 'label', 'button',
  'li', 'td', 'th', 'caption', 'figcaption'
]

// Elements to skip
const SKIP_ELEMENTS = [
  'script', 'style', 'meta', 'link', 'title',
  'svg', 'path', 'circle', 'rect', 'line'
]

// Extract text content from element
const getTextContent = (element: any): string => {
  if (typeof element === 'string') return element
  if (typeof element === 'number') return element.toString()
  if (!element) return ''
  
  if (isValidElement(element)) {
    if (element.props.children) {
      if (typeof element.props.children === 'string') {
        return element.props.children
      }
      if (Array.isArray(element.props.children)) {
        return element.props.children
          .map(child => getTextContent(child))
          .join(' ')
          .trim()
      }
      return getTextContent(element.props.children)
    }
  }
  
  return ''
}

// Check if element should get TTS button
const shouldAddTTS = (element: any, textContent: string): boolean => {
  if (!isValidElement(element)) return false
  if (!textContent || textContent.trim().length < 5) return false
  
  const elementType = element.type as string
  
  // Skip certain elements
  if (SKIP_ELEMENTS.includes(elementType)) return false
  
  // Skip if already has ReadAloudButton
  if (elementType === ReadAloudButton) return false
  
  // Skip if element has data-no-tts attribute
  if (element.props['data-no-tts']) return false
  
  // Add to text elements
  if (TEXT_ELEMENTS.includes(elementType)) return true
  
  // Add to elements with specific classes that contain text
  const className = element.props.className || ''
  if (className.includes('text-') && textContent.length > 10) return true
  
  return false
}

// Add TTS button to element
const addTTSToElement = (element: any, textContent: string): any => {
  if (!isValidElement(element)) return element
  
  const ttsButton = (
    <ReadAloudButton 
      key={`tts-${Math.random()}`}
      text={textContent}
      size="sm"
      className="ml-2 opacity-60 hover:opacity-100 transition-opacity inline-flex"
    />
  )
  
  // Clone element and add TTS button
  return cloneElement(element, {
    ...element.props,
    className: `${element.props.className || ''} inline-flex items-center gap-1`.trim(),
    children: [
      element.props.children,
      ttsButton
    ]
  })
}

// Recursively process children
const processChildren = (children: ReactNode, isEnabled: boolean): ReactNode => {
  if (!isEnabled) return children
  
  if (Array.isArray(children)) {
    return children.map((child, index) => processChild(child, isEnabled, index))
  }
  
  return processChild(children, isEnabled)
}

// Process individual child
const processChild = (child: ReactNode, isEnabled: boolean, key?: number | string): ReactNode => {
  if (!isEnabled) return child
  if (!isValidElement(child)) return child
  
  const textContent = getTextContent(child)
  
  // If this element should get TTS, add it
  if (shouldAddTTS(child, textContent)) {
    const enhancedElement = addTTSToElement(child, textContent)
    
    // Also process children recursively
    if (child.props.children) {
      return cloneElement(enhancedElement, {
        ...enhancedElement.props,
        key: key,
        children: processChildren(child.props.children, isEnabled)
      })
    }
    
    return enhancedElement
  }
  
  // If element has children, process them recursively
  if (child.props.children) {
    return cloneElement(child, {
      ...child.props,
      key: key,
      children: processChildren(child.props.children, isEnabled)
    })
  }
  
  return child
}

export function AutoTTSWrapper({ children, enabled = true }: AutoTTSWrapperProps) {
  const { isEnabled, isSupported } = useTTS()
  
  // Only process if TTS is enabled and supported
  const shouldProcess = enabled && isEnabled && isSupported
  
  return (
    <>
      {processChildren(children, shouldProcess)}
    </>
  )
}