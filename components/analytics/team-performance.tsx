"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Oct", goalsFor: 28, goalsAgainst: 22, pointsPercentage: 0.625 },
  { month: "Nov", goalsFor: 32, goalsAgainst: 25, pointsPercentage: 0.583 },
  { month: "Dec", goalsFor: 35, goalsAgainst: 30, pointsPercentage: 0.667 },
  { month: "Jan", goalsFor: 40, goalsAgainst: 28, pointsPercentage: 0.75 },
  { month: "Feb", goalsFor: 30, goalsAgainst: 32, pointsPercentage: 0.458 },
  { month: "Mar", goalsFor: 33, goalsAgainst: 27, pointsPercentage: 0.625 },
]

export function TeamPerformance() {
  return (
    <div className="space-y-8">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#1f2937" }} />
            <YAxis yAxisId="left" tick={{ fill: "#1f2937" }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tick={{ fill: "#1f2937" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                fontFamily: "var(--font-manrope)",
              }}
              formatter={(value) => [value, undefined, { className: "tabular-nums font-medium" }]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="goalsFor"
              name="Goals For"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="goalsAgainst"
              name="Goals Against"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pointsPercentage"
              name="Points %"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-800">Goals For</div>
          <div className="text-2xl font-bold text-primary tabular-nums">198</div>
          <div className="mt-2 flex items-center text-xs text-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tabular-nums">+12 from last season</span>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-800">Goals Against</div>
          <div className="text-2xl font-bold text-primary tabular-nums">164</div>
          <div className="mt-2 flex items-center text-xs text-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tabular-nums">-8 from last season</span>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-800">Points Percentage</div>
          <div className="text-2xl font-bold text-primary tabular-nums">0.618</div>
          <div className="mt-2 flex items-center text-xs text-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tabular-nums">+0.042 from last season</span>
          </div>
        </div>
      </div>
    </div>
  )
}
