"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="player-updates">Player Updates</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about player status changes</p>
            </div>
            <Switch id="player-updates" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="scouting-reports">Scouting Reports</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when new scouting reports are added</p>
            </div>
            <Switch id="scouting-reports" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="meeting-notes">Meeting Notes</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when you're mentioned in meeting notes
              </p>
            </div>
            <Switch id="meeting-notes" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics-updates">Analytics Updates</Label>
              <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
            </div>
            <Switch id="analytics-updates" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">In-App Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">Notify when someone mentions you</p>
            </div>
            <Switch id="mentions" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments">Comments</Label>
              <p className="text-sm text-muted-foreground">Notify when someone comments on your notes</p>
            </div>
            <Switch id="comments" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="assignments">Assignments</Label>
              <p className="text-sm text-muted-foreground">Notify when you're assigned to a task</p>
            </div>
            <Switch id="assignments" defaultChecked />
          </div>
        </div>
      </div>
      <Button>Save Preferences</Button>
    </div>
  )
}
