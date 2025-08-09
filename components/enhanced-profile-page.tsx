"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { LanguageSettings } from "@/components/language-settings"
import { DeviceManagement } from "@/components/device-management"
import { ReadAloudButton } from "@/components/read-aloud-button"

export function EnhancedProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        <ReadAloudButton 
          text="Profile Settings. Manage your profile, devices, and language preferences"
          size="md"
        />
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileForm />
        </TabsContent>
        
        <TabsContent value="devices" className="mt-6">
          <DeviceManagement />
        </TabsContent>
        
        <TabsContent value="language" className="mt-6">
          <LanguageSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
