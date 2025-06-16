export interface Player {
    id: number
    name: string
    number: number
    position: string
    age: number
    birthYear: number
    height: string
    weight: string
    heightCm: number
    weightLbs: number
    birthplace: string
    nationality: string
    team: string
    league: string
    status: string
    contract: string
    contractExpiry: number
    rating: string
    drafted: string
    draftYear: number | null
    draftRound: number | null
    draftOverall: number | null
    draftTeam: string | null
    shoots: string
    salary: string
    salaryValue: number
    // Performance stats
    gamesPlayed: number
    goals: number
    assists: number
    points: number
    plusMinus: number
    penaltyMinutes: number
    // Advanced attributes
    playerStyle: string
    yearsInLeague: number
    previousLeagues: string[]
    draftEligible: boolean
}

// Helper function to convert height string to cm
const heightToCm = (height: string): number => {
    const [feet, inches] = height.split("'").map(s => parseInt(s.replace('"', '')))
    return Math.round((feet * 30.48) + (inches * 2.54))
}

// Helper function to get league logo
export const getLeagueLogo = (league: string): string => {
    const logoMap: { [key: string]: string } = {
        'NHL': '/nhl.svg',
        'AHL': '/ahl.png',
        'OHL': '/ohl.jpg',
        'WHL': '/whl.png',
        'QMJHL': '/qmjhl.png',
        'SHL': '/shl.png',
        'Liiga': '/shl.png', // Using SHL logo as placeholder
        'NCAA': '/placeholder-logo.png',
        'Junior': '/placeholder-logo.png'
    }
    return logoMap[league] || '/placeholder-logo.png'
}

// Real Dallas Stars roster data (2024-25 season)
export const players: Player[] = [
    // NHL Players - Dallas Stars Forwards
    {
        id: 1, name: "Jason Robertson", number: 21, position: "Left Wing", age: 25, birthYear: 1999,
        height: "6'3\"", weight: "201 lbs", heightCm: 191, weightLbs: 201,
        birthplace: "Northville, MI", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2032,
        rating: "A+", drafted: "2nd Round 2019", draftYear: 2019, draftRound: 2,
        draftOverall: 39, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$7.75M", salaryValue: 7750000, gamesPlayed: 82, goals: 29,
        assists: 51, points: 80, plusMinus: 18, penaltyMinutes: 20,
        playerStyle: "Elite Sniper", yearsInLeague: 4, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 2, name: "Roope Hintz", number: 24, position: "Center", age: 28, birthYear: 1996,
        height: "6'3\"", weight: "215 lbs", heightCm: 191, weightLbs: 215,
        birthplace: "Tampere, FIN", nationality: "Finland", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2032,
        rating: "A", drafted: "2nd Round 2015", draftYear: 2015, draftRound: 2,
        draftOverall: 49, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$8.45M", salaryValue: 8450000, gamesPlayed: 82, goals: 30,
        assists: 35, points: 65, plusMinus: 15, penaltyMinutes: 26,
        playerStyle: "Two-Way Center", yearsInLeague: 7, previousLeagues: ["Liiga"],
        draftEligible: false
    },
    {
        id: 3, name: "Joe Pavelski", number: 16, position: "Center", age: 40, birthYear: 1984,
        height: "5'11\"", weight: "194 lbs", heightCm: 180, weightLbs: 194,
        birthplace: "Plover, WI", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "A-", drafted: "7th Round 2003", draftYear: 2003, draftRound: 7,
        draftOverall: 205, draftTeam: "San Jose Sharks", shoots: "Right",
        salary: "$5.5M", salaryValue: 5500000, gamesPlayed: 82, goals: 27,
        assists: 40, points: 67, plusMinus: 22, penaltyMinutes: 18,
        playerStyle: "Net-Front Presence", yearsInLeague: 19, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 4, name: "Tyler Seguin", number: 91, position: "Center", age: 32, birthYear: 1992,
        height: "6'1\"", weight: "200 lbs", heightCm: 185, weightLbs: 200,
        birthplace: "Brampton, ON", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "B+", drafted: "1st Round 2010", draftYear: 2010, draftRound: 1,
        draftOverall: 2, draftTeam: "Boston Bruins", shoots: "Right",
        salary: "$9.85M", salaryValue: 9850000, gamesPlayed: 82, goals: 20,
        assists: 33, points: 53, plusMinus: 8, penaltyMinutes: 22,
        playerStyle: "Playmaker", yearsInLeague: 14, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 5, name: "Jamie Benn", number: 14, position: "Left Wing", age: 35, birthYear: 1989,
        height: "6'2\"", weight: "210 lbs", heightCm: 188, weightLbs: 210,
        birthplace: "Victoria, BC", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B+", drafted: "5th Round 2007", draftYear: 2007, draftRound: 5,
        draftOverall: 129, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$9.5M", salaryValue: 9500000, gamesPlayed: 82, goals: 18,
        assists: 35, points: 53, plusMinus: 5, penaltyMinutes: 64,
        playerStyle: "Power Forward", yearsInLeague: 15, previousLeagues: ["WHL"],
        draftEligible: false
    },
    {
        id: 6, name: "Mason Marchment", number: 27, position: "Left Wing", age: 29, birthYear: 1995,
        height: "6'4\"", weight: "209 lbs", heightCm: 193, weightLbs: 209,
        birthplace: "Toronto, ON", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2028,
        rating: "B+", drafted: "Undrafted", draftYear: null, draftRound: null,
        draftOverall: null, draftTeam: null, shoots: "Left",
        salary: "$4.5M", salaryValue: 4500000, gamesPlayed: 82, goals: 16,
        assists: 37, points: 53, plusMinus: 12, penaltyMinutes: 42,
        playerStyle: "Power Forward", yearsInLeague: 6, previousLeagues: ["OHL", "AHL"],
        draftEligible: false
    },
    {
        id: 7, name: "Wyatt Johnston", number: 53, position: "Center", age: 21, birthYear: 2003,
        height: "6'1\"", weight: "185 lbs", heightCm: 185, weightLbs: 185,
        birthplace: "Toronto, ON", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "A-", drafted: "1st Round 2021", draftYear: 2021, draftRound: 1,
        draftOverall: 23, draftTeam: "Dallas Stars", shoots: "Right",
        salary: "$894K", salaryValue: 894167, gamesPlayed: 82, goals: 32,
        assists: 33, points: 65, plusMinus: 20, penaltyMinutes: 16,
        playerStyle: "Two-Way Forward", yearsInLeague: 2, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 8, name: "Matt Duchene", number: 95, position: "Center", age: 34, birthYear: 1991,
        height: "5'11\"", weight: "200 lbs", heightCm: 180, weightLbs: 200,
        birthplace: "Haliburton, ON", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B", drafted: "1st Round 2009", draftYear: 2009, draftRound: 1,
        draftOverall: 3, draftTeam: "Colorado Avalanche", shoots: "Left",
        salary: "$3M", salaryValue: 3000000, gamesPlayed: 80, goals: 25,
        assists: 40, points: 65, plusMinus: 10, penaltyMinutes: 14,
        playerStyle: "Speedster", yearsInLeague: 15, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 9, name: "Evgenii Dadonov", number: 63, position: "Right Wing", age: 35, birthYear: 1989,
        height: "5'11\"", weight: "185 lbs", heightCm: 180, weightLbs: 185,
        birthplace: "Chelyabinsk, RUS", nationality: "Russia", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B-", drafted: "3rd Round 2007", draftYear: 2007, draftRound: 3,
        draftOverall: 71, draftTeam: "Florida Panthers", shoots: "Right",
        salary: "$5M", salaryValue: 5000000, gamesPlayed: 76, goals: 20,
        assists: 27, points: 47, plusMinus: 8, penaltyMinutes: 12,
        playerStyle: "Sniper", yearsInLeague: 11, previousLeagues: ["KHL"],
        draftEligible: false
    },
    {
        id: 10, name: "Sam Steel", number: 8, position: "Center", age: 26, birthYear: 1998,
        height: "5'11\"", weight: "183 lbs", heightCm: 180, weightLbs: 183,
        birthplace: "Sherwood Park, AB", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "C+", drafted: "1st Round 2016", draftYear: 2016, draftRound: 1,
        draftOverall: 30, draftTeam: "Anaheim Ducks", shoots: "Left",
        salary: "$1M", salaryValue: 1000000, gamesPlayed: 65, goals: 8,
        assists: 15, points: 23, plusMinus: -2, penaltyMinutes: 8,
        playerStyle: "Playmaker", yearsInLeague: 6, previousLeagues: ["WHL"],
        draftEligible: false
    },
    {
        id: 11, name: "Radek Faksa", number: 12, position: "Center", age: 31, birthYear: 1994,
        height: "6'3\"", weight: "220 lbs", heightCm: 191, weightLbs: 220,
        birthplace: "Opava, CZE", nationality: "Czech Republic", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "C+", drafted: "1st Round 2012", draftYear: 2012, draftRound: 1,
        draftOverall: 13, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$3.25M", salaryValue: 3250000, gamesPlayed: 82, goals: 8,
        assists: 10, points: 18, plusMinus: -8, penaltyMinutes: 32,
        playerStyle: "Defensive Forward", yearsInLeague: 9, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 12, name: "Craig Smith", number: 15, position: "Right Wing", age: 35, birthYear: 1989,
        height: "6'1\"", weight: "208 lbs", heightCm: 185, weightLbs: 208,
        birthplace: "Madison, WI", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "C+", drafted: "4th Round 2009", draftYear: 2009, draftRound: 4,
        draftOverall: 98, draftTeam: "Nashville Predators", shoots: "Right",
        salary: "$1M", salaryValue: 1000000, gamesPlayed: 75, goals: 13,
        assists: 12, points: 25, plusMinus: 2, penaltyMinutes: 18,
        playerStyle: "Grinder", yearsInLeague: 14, previousLeagues: ["NCAA"],
        draftEligible: false
    },

    // NHL Players - Dallas Stars Defense
    {
        id: 13, name: "Miro Heiskanen", number: 4, position: "Defense", age: 25, birthYear: 1999,
        height: "6'1\"", weight: "205 lbs", heightCm: 185, weightLbs: 205,
        birthplace: "Espoo, FIN", nationality: "Finland", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2032,
        rating: "A+", drafted: "1st Round 2017", draftYear: 2017, draftRound: 1,
        draftOverall: 3, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$8.45M", salaryValue: 8450000, gamesPlayed: 82, goals: 14,
        assists: 50, points: 64, plusMinus: 25, penaltyMinutes: 24,
        playerStyle: "Elite Two-Way", yearsInLeague: 6, previousLeagues: ["Liiga"],
        draftEligible: false
    },
    {
        id: 14, name: "Esa Lindell", number: 23, position: "Defense", age: 30, birthYear: 1994,
        height: "6'3\"", weight: "215 lbs", heightCm: 191, weightLbs: 215,
        birthplace: "Vantaa, FIN", nationality: "Finland", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B+", drafted: "3rd Round 2012", draftYear: 2012, draftRound: 3,
        draftOverall: 74, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$5.8M", salaryValue: 5800000, gamesPlayed: 82, goals: 7,
        assists: 25, points: 32, plusMinus: 18, penaltyMinutes: 36,
        playerStyle: "Defensive Defenseman", yearsInLeague: 8, previousLeagues: ["Liiga"],
        draftEligible: false
    },
    {
        id: 15, name: "Ryan Suter", number: 20, position: "Defense", age: 40, birthYear: 1985,
        height: "6'1\"", weight: "196 lbs", heightCm: 185, weightLbs: 196,
        birthplace: "Madison, WI", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B", drafted: "1st Round 2003", draftYear: 2003, draftRound: 1,
        draftOverall: 7, draftTeam: "Nashville Predators", shoots: "Left",
        salary: "$3.65M", salaryValue: 3650000, gamesPlayed: 82, goals: 4,
        assists: 13, points: 17, plusMinus: 8, penaltyMinutes: 16,
        playerStyle: "Stay-at-Home", yearsInLeague: 19, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 16, name: "Thomas Harley", number: 55, position: "Defense", age: 23, birthYear: 2001,
        height: "6'3\"", weight: "196 lbs", heightCm: 191, weightLbs: 196,
        birthplace: "Syracuse, NY", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B+", drafted: "1st Round 2019", draftYear: 2019, draftRound: 1,
        draftOverall: 18, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$894K", salaryValue: 894167, gamesPlayed: 79, goals: 15,
        assists: 32, points: 47, plusMinus: 20, penaltyMinutes: 22,
        playerStyle: "Offensive Defenseman", yearsInLeague: 3, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 17, name: "Nils Lundkvist", number: 5, position: "Defense", age: 24, birthYear: 2000,
        height: "5'11\"", weight: "187 lbs", heightCm: 180, weightLbs: 187,
        birthplace: "Piteå, SWE", nationality: "Sweden", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B-", drafted: "1st Round 2018", draftYear: 2018, draftRound: 1,
        draftOverall: 28, draftTeam: "New York Rangers", shoots: "Right",
        salary: "$1.35M", salaryValue: 1350000, gamesPlayed: 70, goals: 8,
        assists: 20, points: 28, plusMinus: 12, penaltyMinutes: 18,
        playerStyle: "Puck-Moving Defenseman", yearsInLeague: 3, previousLeagues: ["SHL"],
        draftEligible: false
    },
    {
        id: 18, name: "Jani Hakanpaa", number: 2, position: "Defense", age: 32, birthYear: 1992,
        height: "6'7\"", weight: "222 lbs", heightCm: 201, weightLbs: 222,
        birthplace: "Kirkkonummi, FIN", nationality: "Finland", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "C+", drafted: "4th Round 2010", draftYear: 2010, draftRound: 4,
        draftOverall: 104, draftTeam: "St. Louis Blues", shoots: "Right",
        salary: "$1.47M", salaryValue: 1470000, gamesPlayed: 64, goals: 1,
        assists: 8, points: 9, plusMinus: 10, penaltyMinutes: 89,
        playerStyle: "Stay-at-Home", yearsInLeague: 8, previousLeagues: ["Liiga"],
        draftEligible: false
    },

    // NHL Players - Dallas Stars Goalies
    {
        id: 19, name: "Jake Oettinger", number: 29, position: "Goalie", age: 26, birthYear: 1998,
        height: "6'5\"", weight: "220 lbs", heightCm: 196, weightLbs: 220,
        birthplace: "Lakeville, MN", nationality: "USA", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2032,
        rating: "A", drafted: "1st Round 2017", draftYear: 2017, draftRound: 1,
        draftOverall: 26, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$8.25M", salaryValue: 8250000, gamesPlayed: 54, goals: 0,
        assists: 1, points: 1, plusMinus: 0, penaltyMinutes: 2,
        playerStyle: "Butterfly Goalie", yearsInLeague: 5, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 20, name: "Scott Wedgewood", number: 41, position: "Goalie", age: 32, birthYear: 1992,
        height: "6'2\"", weight: "209 lbs", heightCm: 188, weightLbs: 209,
        birthplace: "Brampton, ON", nationality: "Canada", team: "Dallas Stars",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B-", drafted: "3rd Round 2010", draftYear: 2010, draftRound: 3,
        draftOverall: 84, draftTeam: "New Jersey Devils", shoots: "Left",
        salary: "$1.5M", salaryValue: 1500000, gamesPlayed: 32, goals: 0,
        assists: 0, points: 0, plusMinus: 0, penaltyMinutes: 2,
        playerStyle: "Butterfly Goalie", yearsInLeague: 10, previousLeagues: ["OHL", "AHL"],
        draftEligible: false
    },

    // Prospect Players - Various Leagues
    {
        id: 21, name: "Lian Bichsel", number: 6, position: "Defense", age: 20, birthYear: 2004,
        height: "6'5\"", weight: "225 lbs", heightCm: 196, weightLbs: 225,
        birthplace: "Olten, SUI", nationality: "Switzerland", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2027,
        rating: "B+", drafted: "1st Round 2022", draftYear: 2022, draftRound: 1,
        draftOverall: 18, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$925K", salaryValue: 925000, gamesPlayed: 45, goals: 3,
        assists: 12, points: 15, plusMinus: 8, penaltyMinutes: 42,
        playerStyle: "Stay-at-Home", yearsInLeague: 2, previousLeagues: ["NLA"],
        draftEligible: false
    },
    {
        id: 22, name: "Logan Stankoven", number: 11, position: "Center", age: 21, birthYear: 2003,
        height: "5'8\"", weight: "170 lbs", heightCm: 173, weightLbs: 170,
        birthplace: "Kamloops, BC", nationality: "Canada", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2026,
        rating: "A-", drafted: "2nd Round 2021", draftYear: 2021, draftRound: 2,
        draftOverall: 47, draftTeam: "Dallas Stars", shoots: "Right",
        salary: "$925K", salaryValue: 925000, gamesPlayed: 24, goals: 15,
        assists: 22, points: 37, plusMinus: 12, penaltyMinutes: 8,
        playerStyle: "Speedster", yearsInLeague: 1, previousLeagues: ["WHL"],
        draftEligible: false
    },
    {
        id: 23, name: "Mavrik Bourque", number: 71, position: "Center", age: 22, birthYear: 2002,
        height: "5'10\"", weight: "179 lbs", heightCm: 178, weightLbs: 179,
        birthplace: "Plessisville, QC", nationality: "Canada", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2025,
        rating: "B+", drafted: "1st Round 2020", draftYear: 2020, draftRound: 1,
        draftOverall: 30, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$925K", salaryValue: 925000, gamesPlayed: 68, goals: 18,
        assists: 35, points: 53, plusMinus: 15, penaltyMinutes: 22,
        playerStyle: "Two-Way Forward", yearsInLeague: 3, previousLeagues: ["QMJHL"],
        draftEligible: false
    },
    {
        id: 24, name: "Arttu Hyry", number: 28, position: "Defense", age: 22, birthYear: 2002,
        height: "6'0\"", weight: "181 lbs", heightCm: 183, weightLbs: 181,
        birthplace: "Espoo, FIN", nationality: "Finland", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2026,
        rating: "B", drafted: "4th Round 2020", draftYear: 2020, draftRound: 4,
        draftOverall: 114, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$925K", salaryValue: 925000, gamesPlayed: 52, goals: 8,
        assists: 20, points: 28, plusMinus: 10, penaltyMinutes: 18,
        playerStyle: "Offensive Defenseman", yearsInLeague: 2, previousLeagues: ["Liiga"],
        draftEligible: false
    },
    {
        id: 25, name: "Antonio Stranges", number: 91, position: "Left Wing", age: 22, birthYear: 2002,
        height: "5'9\"", weight: "161 lbs", heightCm: 175, weightLbs: 161,
        birthplace: "London, ON", nationality: "Canada", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2025,
        rating: "B", drafted: "4th Round 2020", draftYear: 2020, draftRound: 4,
        draftOverall: 123, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$775K", salaryValue: 775000, gamesPlayed: 61, goals: 12,
        assists: 18, points: 30, plusMinus: 5, penaltyMinutes: 14,
        playerStyle: "Speedster", yearsInLeague: 2, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 26, name: "Matej Blumel", number: 64, position: "Right Wing", age: 24, birthYear: 2000,
        height: "6'0\"", weight: "172 lbs", heightCm: 183, weightLbs: 172,
        birthplace: "Ceske Budejovice, CZE", nationality: "Czech Republic", team: "Texas Stars",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2025,
        rating: "B-", drafted: "4th Round 2019", draftYear: 2019, draftRound: 4,
        draftOverall: 100, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "$775K", salaryValue: 775000, gamesPlayed: 58, goals: 14,
        assists: 16, points: 30, plusMinus: 8, penaltyMinutes: 12,
        playerStyle: "Sniper", yearsInLeague: 3, previousLeagues: ["OHL"],
        draftEligible: false
    },

    // Additional prospects and junior players
    {
        id: 27, name: "Emil Hemming", number: 19, position: "Right Wing", age: 19, birthYear: 2005,
        height: "6'1\"", weight: "183 lbs", heightCm: 185, weightLbs: 183,
        birthplace: "Espoo, FIN", nationality: "Finland", team: "TPS Turku",
        league: "Liiga", status: "Prospect", contract: "Unsigned", contractExpiry: 2026,
        rating: "B+", drafted: "1st Round 2023", draftYear: 2023, draftRound: 1,
        draftOverall: 29, draftTeam: "Dallas Stars", shoots: "Right",
        salary: "Junior", salaryValue: 0, gamesPlayed: 45, goals: 18,
        assists: 22, points: 40, plusMinus: 15, penaltyMinutes: 16,
        playerStyle: "Two-Way Forward", yearsInLeague: 2, previousLeagues: ["Jr. A Liiga"],
        draftEligible: false
    },
    {
        id: 28, name: "Francesco Pinelli", number: 9, position: "Center", age: 21, birthYear: 2003,
        height: "6'1\"", weight: "185 lbs", heightCm: 185, weightLbs: 185,
        birthplace: "Toronto, ON", nationality: "Canada", team: "Kitchener Rangers",
        league: "OHL", status: "Prospect", contract: "Unsigned", contractExpiry: 2025,
        rating: "B", drafted: "2nd Round 2021", draftYear: 2021, draftRound: 2,
        draftOverall: 42, draftTeam: "Dallas Stars", shoots: "Left",
        salary: "Junior", salaryValue: 0, gamesPlayed: 68, goals: 25,
        assists: 45, points: 70, plusMinus: 18, penaltyMinutes: 24,
        playerStyle: "Playmaker", yearsInLeague: 3, previousLeagues: ["OHL"],
        draftEligible: false
    }
]
