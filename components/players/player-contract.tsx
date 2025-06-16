import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

interface PlayerContractProps {
  player: any
}

export function PlayerContract({ player }: PlayerContractProps) {
  // Mock contract data
  const contractData = {
    currentContract: "$5.75M x 3 years",
    expires: "2026-27",
    ufaStatus: "2027",
    signingBonuses: [
      { year: "2024", amount: "$1.5M" },
      { year: "2025", amount: "$1M" },
    ],
    capHit: "$5.75M",
    totalValue: "$17.25M",
    noTradeClause: true,
    noMovementClause: false,
    performanceBonuses: "$500K for 30+ goals",
    contractType: "Standard Player Contract (SPC)",
    signingDate: "July 1, 2023",
    agent: "Pat Brisson",
    previousContract: "$4.5M x 4 years (2019-2023)",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Current Contract
          </CardTitle>
          <CardDescription>Contract details and financial information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Contract Overview</h3>
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Current Deal</span>
                    <span className="text-xl font-bold">{contractData.currentContract}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Cap Hit</span>
                      <p className="font-medium">{contractData.capHit}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Total Value</span>
                      <p className="font-medium">{contractData.totalValue}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Expires</span>
                      <p className="font-medium">{contractData.expires}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">UFA Status</span>
                      <p className="font-medium">{contractData.ufaStatus}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Contract Clauses</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={contractData.noTradeClause ? "default" : "outline"}>No-Trade Clause</Badge>
                  <Badge variant={contractData.noMovementClause ? "default" : "outline"}>No-Movement Clause</Badge>
                  <Badge variant="outline">Performance Bonuses</Badge>
                  <Badge variant="outline">Standard SPC</Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {contractData.performanceBonuses && (
                    <p className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Performance Bonus: {contractData.performanceBonuses}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Signing Bonuses</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 divide-x border-b">
                    <div className="p-2 text-center text-sm font-medium">Year</div>
                    <div className="p-2 text-center text-sm font-medium">Amount</div>
                  </div>
                  {contractData.signingBonuses.map((bonus, i) => (
                    <div key={i} className="grid grid-cols-2 divide-x border-b last:border-0">
                      <div className="p-2 text-center">{bonus.year}</div>
                      <div className="p-2 text-center font-medium">{bonus.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Additional Information</h3>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between py-1">
                    <dt className="font-medium text-muted-foreground">Contract Type</dt>
                    <dd>{contractData.contractType}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-medium text-muted-foreground">Signing Date</dt>
                    <dd className="flex items-center gap-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {contractData.signingDate}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-medium text-muted-foreground">Agent</dt>
                    <dd>{contractData.agent}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-medium text-muted-foreground">Previous Contract</dt>
                    <dd>{contractData.previousContract}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Cap Implications
          </CardTitle>
          <CardDescription>How this contract affects the team's salary cap</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/30 p-4">
            <p className="mb-4 text-sm">
              This contract represents <strong>7.1%</strong> of the team's total salary cap. The Blues are currently{" "}
              <strong>$2.3M</strong> under the cap with <strong>22/23</strong> roster spots filled.
            </p>
            <div className="h-4 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[7.1%] bg-primary" />
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span>0%</span>
              <span>7.1% of cap</span>
              <span>15%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
