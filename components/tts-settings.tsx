"use client"

import React from "react"
import { Volume2, VolumeX, Settings, Play, Pause, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTTS } from "@/context/tts-context"
import { useLanguage } from "@/context/language-context"

export function TTSSettings() {
  const { 
    isEnabled, 
    isSpeaking, 
    isSupported, 
    toggleTTS, 
    speak, 
    stop, 
    rate, 
    pitch, 
    volume,
    setRate,
    setPitch,
    setVolume
  } = useTTS()
  const { t } = useLanguage()

  if (!isSupported) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-500">
            <VolumeX className="h-5 w-5" />
            Text-to-Speech Not Available
          </CardTitle>
          <CardDescription>
            Your browser doesn't support text-to-speech functionality.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const testSpeech = () => {
    const testText = "This is a test of the text-to-speech functionality. You can adjust the speed, pitch, and volume to your preference."
    speak(testText)
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-600" />
          Text-to-Speech Settings
        </CardTitle>
        <CardDescription>
          Configure read-aloud functionality for better accessibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable TTS */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Enable Read Aloud</Label>
            <p className="text-xs text-gray-500 mt-1">
              Turn on text-to-speech for all content
            </p>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={toggleTTS}
            aria-label="Toggle text-to-speech"
          />
        </div>

        {isEnabled && (
          <>
            {/* Test Speech */}
            <div className="border-t pt-4">
              <Label className="text-sm font-medium mb-3 block">Test Speech</Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={testSpeech}
                  disabled={isSpeaking}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Test Voice
                </Button>
                {isSpeaking && (
                  <Button
                    onClick={stop}
                    variant="outline"
                    size="sm"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
            </div>

            {/* Speech Rate */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Speech Speed: {rate.toFixed(1)}x
              </Label>
              <Slider
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow (0.5x)</span>
                <span>Normal (1.0x)</span>
                <span>Fast (2.0x)</span>
              </div>
            </div>

            {/* Speech Pitch */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Voice Pitch: {pitch.toFixed(1)}
              </Label>
              <Slider
                value={[pitch]}
                onValueChange={(value) => setPitch(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (0.5)</span>
                <span>Normal (1.0)</span>
                <span>High (2.0)</span>
              </div>
            </div>

            {/* Speech Volume */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Volume: {Math.round(volume * 100)}%
              </Label>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                min={0.1}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">How to Use</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Look for the speaker icon 🔊 next to text content</li>
                <li>• Click the floating button to read the entire page</li>
                <li>• Text will be read in your selected language</li>
                <li>• Click again to stop reading</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}