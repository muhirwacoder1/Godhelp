"use client"

import React, { ReactNode } from "react"
import { ReadAloudButton } from "@/components/read-aloud-button"
import { useTTS } from "@/context/tts-context"
import { cn } from "@/lib/utils"

interface SmartTextProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  readText?: string // Custom text to read (if different from display text)
  showIcon?: boolean // Force show/hide icon
  iconPosition?: "left" | "right"
  iconSize?: "sm" | "md" | "lg"
}

// Extract text content from React children
const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children
  }
  
  if (typeof children === 'number') {
    return children.toString()
  }
  
  if (React.isValidElement(children)) {
    if (children.props.children) {
      return extractTextFromChildren(children.props.children)
    }
    return ''
  }
  
  if (Array.isArray(children)) {
    return children.map(child => extractTextFromChildren(child)).join(' ')
  }
  
  return ''
}

export function SmartText({ 
  children, 
  className = "",
  as: Component = "span",
  readText,
  showIcon = true,
  iconPosition = "right",
  iconSize = "sm"
}: SmartTextProps) {
  const { isEnabled, isSupported } = useTTS()
  
  // Don't show icon if TTS is not enabled/supported
  if (!isSupported || !isEnabled || !showIcon) {
    return <Component className={className}>{children}</Component>
  }
  
  // Extract text content for TTS
  const textToRead = readText || extractTextFromChildren(children)
  
  // Don't show icon if no meaningful text
  if (!textToRead || textToRead.trim().length < 3) {
    return <Component className={className}>{children}</Component>
  }
  
  const iconElement = (
    <ReadAloudButton 
      text={textToRead}
      size={iconSize}
      className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
    />
  )
  
  return (
    <Component className={cn("inline-flex items-center gap-1", className)}>
      {iconPosition === "left" && iconElement}
      <span>{children}</span>
      {iconPosition === "right" && iconElement}
    </Component>
  )
}

// Specialized components for common use cases
export function SmartHeading({ 
  children, 
  level = 1, 
  className = "",
  readText,
  ...props 
}: SmartTextProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <SmartText 
      as={HeadingComponent}
      className={className}
      readText={readText}
      iconSize="md"
      {...props}
    >
      {children}
    </SmartText>
  )
}

export function SmartParagraph({ 
  children, 
  className = "",
  readText,
  ...props 
}: SmartTextProps) {
  return (
    <SmartText 
      as="p"
      className={className}
      readText={readText}
      {...props}
    >
      {children}
    </SmartText>
  )
}

export function SmartLabel({ 
  children, 
  className = "",
  readText,
  ...props 
}: SmartTextProps) {
  return (
    <SmartText 
      as="label"
      className={className}
      readText={readText}
      iconSize="sm"
      {...props}
    >
      {children}
    </SmartText>
  )
}

export function SmartButton({ 
  children, 
  className = "",
  readText,
  onClick,
  ...props 
}: SmartTextProps & { onClick?: () => void }) {
  return (
    <SmartText 
      as="button"
      className={cn("cursor-pointer", className)}
      readText={readText}
      iconSize="sm"
      onClick={onClick}
      {...props}
    >
      {children}
    </SmartText>
  )
}