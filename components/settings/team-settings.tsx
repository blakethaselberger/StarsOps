"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamFormSchema = z.object({
  teamName: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  division: z.string({
    required_error: "Please select a division.",
  }),
  publicProfile: z.boolean().default(true),
  allowDataSharing: z.boolean().default(false),
})

type TeamFormValues = z.infer<typeof teamFormSchema>

const defaultValues: Partial<TeamFormValues> = {
  teamName: "St. Louis Blues",
  division: "Central",
  publicProfile: true,
  allowDataSharing: false,
}

const teamMembers = [
  {
    name: "John Smith",
    email: "john.smith@blues.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JS",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@blues.com",
    role: "Scout",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
  },
  {
    name: "Mike Wilson",
    email: "mike.wilson@blues.com",
    role: "Coach",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MW",
  },
  {
    name: "Lisa Chen",
    email: "lisa.chen@blues.com",
    role: "Analyst",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "LC",
  },
]

export function TeamSettings() {
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
  })

  function onSubmit(data: TeamFormValues) {
    // In a real app, you would update the team settings here
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Atlantic">Atlantic</SelectItem>
                      <SelectItem value="Metropolitan">Metropolitan</SelectItem>
                      <SelectItem value="Central">Central</SelectItem>
                      <SelectItem value="Pacific">Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="publicProfile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Public Profile</FormLabel>
                  <FormDescription>Allow other teams to view your public profile.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowDataSharing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Data Sharing</FormLabel>
                  <FormDescription>Allow sharing of anonymized data for league analytics.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Team Members</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      {member.name}
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline">Add Team Member</Button>
      </div>
    </div>
  )
}
