import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

export default function SettingsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />
      
      <PageSection>
      <Tabs defaultValue="profile" className="space-y-4">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto gap-1 bg-transparent">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 md:py-3 font-medium text-xs md:text-sm"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 md:py-3 font-medium text-xs md:text-sm"
            >
              Team
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 md:py-3 font-medium text-xs md:text-sm"
            >
              <span className="md:hidden">Notifs</span>
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 md:py-3 font-medium text-xs md:text-sm"
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile" className="space-y-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4 p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-bold text-primary">Profile Settings</CardTitle>
              <CardDescription className="text-xs md:text-sm text-gray-800 font-medium">Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ProfileSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4 p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-bold text-primary">Team Settings</CardTitle>
              <CardDescription className="text-xs md:text-sm text-gray-800 font-medium">Manage team preferences and access</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <TeamSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4 p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-bold text-primary">Notification Settings</CardTitle>
              <CardDescription className="text-xs md:text-sm text-gray-800 font-medium">Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4 p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-bold text-primary">Security Settings</CardTitle>
              <CardDescription className="text-xs md:text-sm text-gray-800 font-medium">Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </PageSection>
    </PageLayout>
  )
}
