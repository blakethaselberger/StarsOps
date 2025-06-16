"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Oct",
    wins: 4,
    losses: 2,
  },
  {
    name: "Nov",
    wins: 5,
    losses: 3,
  },
  {
    name: "Dec",
    wins: 6,
    losses: 2,
  },
  {
    name: "Jan",
    wins: 7,
    losses: 1,
  },
  {
    name: "Feb",
    wins: 5,
    losses: 4,
  },
  {
    name: "Mar",
    wins: 6,
    losses: 2,
  },
]

export function TeamOverview() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="wins" fill="#3b82f6" name="Wins" />
        <Bar dataKey="losses" fill="#ef4444" name="Losses" />
      </BarChart>
    </ResponsiveContainer>
  )
}
