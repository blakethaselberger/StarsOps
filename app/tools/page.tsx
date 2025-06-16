"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Calculator,
    Target,
    Users,
    TrendingUp,
    ExternalLink,
    BarChart3,
    Shuffle,
    DollarSign,
    FileSpreadsheet,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

interface ToolItem {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    status: 'available' | 'coming-soon' | 'beta'
    category: 'simulation' | 'analysis' | 'management'
    url?: string
    features: string[]
}

const tools: ToolItem[] = [
    {
        id: 'draft-simulator',
        title: 'Draft Simulator',
        description: 'Simulate NHL draft scenarios with real prospect data and team needs analysis',
        icon: <Target className="h-6 w-6" />,
        status: 'available',
        category: 'simulation',
        url: '#',
        features: [
            'Mock draft with 7 rounds',
            'Team needs analysis',
            'Prospect rankings integration',
            'Trade scenario modeling'
        ]
    },
    {
        id: 'roster-builder',
        title: 'Roster Builder',
        description: 'Build and optimize team rosters with salary cap constraints and player ratings',
        icon: <Users className="h-6 w-6" />,
        status: 'available',
        category: 'management',
        url: '#',
        features: [
            'Interactive roster construction',
            'Salary cap compliance',
            'Line combination optimization',
            'Performance projections'
        ]
    },
    {
        id: 'trade-checker',
        title: 'Trade Checker',
        description: 'Validate trades for salary cap compliance and fair value assessment',
        icon: <Shuffle className="h-6 w-6" />,
        status: 'available',
        category: 'analysis',
        url: '#',
        features: [
            'Real-time cap calculations',
            'Fair value analysis',
            'Multi-team trade support',
            'Contract details integration'
        ]
    },
    {
        id: 'buyout-calculator',
        title: 'Buyout Calculator',
        description: 'Calculate buyout costs and cap implications for player contracts',
        icon: <Calculator className="h-6 w-6" />,
        status: 'available',
        category: 'analysis',
        url: '#',
        features: [
            'Compliance & ordinary buyouts',
            'Cap savings calculation',
            'Multi-year impact analysis',
            'Optimal timing suggestions'
        ]
    },
    {
        id: 'cap-projector',
        title: 'Cap Projector',
        description: 'Project future salary cap space with contract expirations and RFA scenarios',
        icon: <TrendingUp className="h-6 w-6" />,
        status: 'beta',
        category: 'analysis',
        url: '#',
        features: [
            'Multi-year projections',
            'RFA/UFA tracking',
            'Bonus carryover calculations',
            'Scenario planning'
        ]
    },
    {
        id: 'performance-analyzer',
        title: 'Performance Analyzer',
        description: 'Advanced analytics dashboard for player and team performance metrics',
        icon: <BarChart3 className="h-6 w-6" />,
        status: 'coming-soon',
        category: 'analysis',
        features: [
            'Advanced statistics',
            'Performance trends',
            'Comparison tools',
            'Export capabilities'
        ]
    }
]

export default function ToolsPage() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-green-100 text-green-800">Available</Badge>
            case 'beta':
                return <Badge className="bg-yellow-100 text-yellow-800">Beta</Badge>
            case 'coming-soon':
                return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>
            default:
                return null
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'simulation':
                return <Zap className="h-4 w-4" />
            case 'analysis':
                return <BarChart3 className="h-4 w-4" />
            case 'management':
                return <FileSpreadsheet className="h-4 w-4" />
        }
    }

    const groupedTools = {
        simulation: tools.filter(tool => tool.category === 'simulation'),
        analysis: tools.filter(tool => tool.category === 'analysis'),
        management: tools.filter(tool => tool.category === 'management')
    }

    return (
        <PageLayout>
            <PageHeader
                title="Hockey Operations Tools"
                description="Access specialized tools for draft simulation, roster management, and salary cap analysis"
            />
            
            <PageSection>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tools.length}</p>
                                <p className="text-xs text-slate-600">Total Tools</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Zap className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tools.filter(t => t.status === 'available').length}</p>
                                <p className="text-xs text-slate-600">Available Now</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tools.filter(t => t.status === 'beta').length}</p>
                                <p className="text-xs text-slate-600">In Beta</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tools by Category */}
            <div className="space-y-8">
                {Object.entries(groupedTools).map(([category, categoryTools]) => (
                    <div key={category} className="space-y-4">
                        <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <h2 className="text-xl font-semibold text-slate-900 capitalize">
                                {category === 'simulation' ? 'Simulation Tools' :
                                    category === 'analysis' ? 'Analysis Tools' :
                                        'Management Tools'}
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {categoryTools.map((tool) => (
                                <Card key={tool.id} className="group hover:shadow-lg transition-all duration-200">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                                                    {tool.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                                                    {getStatusBadge(tool.status)}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-2">{tool.description}</p>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-slate-900 mb-2">Features:</h4>
                                                <ul className="space-y-1">
                                                    {tool.features.map((feature, index) => (
                                                        <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                                                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex gap-2">
                                                {tool.status === 'available' && (
                                                    <Button
                                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                                        onClick={() => window.open(tool.url, '_blank')}
                                                    >
                                                        Launch Tool
                                                        <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Button>
                                                )}
                                                {tool.status === 'beta' && (
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1"
                                                        onClick={() => window.open(tool.url, '_blank')}
                                                    >
                                                        Try Beta
                                                        <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Button>
                                                )}
                                                {tool.status === 'coming-soon' && (
                                                    <Button variant="ghost" className="flex-1" disabled>
                                                        Coming Soon
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Help Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-2">Need a Custom Tool?</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Can't find what you're looking for? Submit a feature request and our development team
                                will evaluate adding new tools based on team needs and priorities.
                            </p>
                            <Button variant="outline" className="bg-white/50 hover:bg-white/80">
                                Submit Feature Request
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </PageSection>
        </PageLayout>
    )
}
