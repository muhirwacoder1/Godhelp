"use client"

import React, { ReactNode } from "react"
import { ReadAloudButton } from "@/components/read-aloud-button"
import { useTTS } from "@/context/tts-context"
import { cn } from "@/lib/utils"

interface TTSTextProps {
  children: ReactNode
  className?: string
  readText?: string
  showAlways?: boolean // Show even when TTS is disabled
  iconClassName?: string
  wrapperClassName?: string
}

// Extract text from React children
const extractText = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return children.toString()
  if (React.isValidElement(children)) {
    if (children.props.children) {
      return extractText(children.props.children)
    }
  }
  if (Array.isArray(children)) {
    return children.map(child => extractText(child)).join(' ')
  }
  return ''
}

export function TTSText({ 
  children, 
  className = "",
  readText,
  showAlways = false,
  iconClassName = "",
  wrapperClassName = ""
}: TTSTextProps) {
  const { isEnabled, isSupported } = useTTS()
  
  const shouldShowTTS = showAlways || (isSupported && isEnabled)
  const textToRead = readText || extractText(children)
  
  if (!shouldShowTTS || !textToRead || textToRead.trim().length < 3) {
    return <span className={className}>{children}</span>
  }
  
  return (
    <span className={cn("inline-flex items-center gap-1", wrapperClassName)}>
      <span className={className}>{children}</span>
      <ReadAloudButton 
        text={textToRead}
        size="sm"
        className={cn("opacity-70 hover:opacity-100 transition-opacity", iconClassName)}
      />
    </span>
  )
}

// Convenience components for common elements
export function TTSH1({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <h1 className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </h1>
  )
}

export function TTSH2({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <h2 className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </h2>
  )
}

export function TTSH3({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <h3 className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </h3>
  )
}

export function TTSP({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <p className={cn("inline-flex items-center gap-1", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </p>
  )
}

export function TTSLabel({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <label className={cn("inline-flex items-center gap-1", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </label>
  )
}

export function TTSSpan({ children, className = "", readText, ...props }: TTSTextProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      <span>{children}</span>
      <TTSText readText={readText} iconClassName="ml-1">
        {children}
      </TTSText>
    </span>
  )
}