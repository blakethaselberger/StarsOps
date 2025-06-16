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

// Real St. Louis Blues roster data
export const players: Player[] = [
    // NHL Players - St. Louis Blues Forwards
    {
        id: 1, name: "Pavel Buchnevich", number: 89, position: "Left Wing", age: 30, birthYear: 1995,
        height: "6'1\"", weight: "196 lbs", heightCm: 185, weightLbs: 196,
        birthplace: "Cherepovets, RUS", nationality: "Russia", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2031,
        rating: "A", drafted: "3rd Round 2013", draftYear: 2013, draftRound: 3,
        draftOverall: 75, draftTeam: "New York Rangers", shoots: "Left",
        salary: "$5.8M", salaryValue: 5800000, gamesPlayed: 76, goals: 20,
        assists: 37, points: 57, plusMinus: 10, penaltyMinutes: 24,
        playerStyle: "Two-Way Forward", yearsInLeague: 8, previousLeagues: ["KHL"],
        draftEligible: false
    },
    {
        id: 2, name: "Robert Thomas", number: 18, position: "Center", age: 25, birthYear: 1999,
        height: "6'0\"", weight: "187 lbs", heightCm: 183, weightLbs: 187,
        birthplace: "Aurora, ON", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2031,
        rating: "A+", drafted: "1st Round 2017", draftYear: 2017, draftRound: 1,
        draftOverall: 20, draftTeam: "St. Louis Blues", shoots: "Right",
        salary: "$8.125M", salaryValue: 8125000, gamesPlayed: 70, goals: 21,
        assists: 60, points: 81, plusMinus: 20, penaltyMinutes: 18,
        playerStyle: "Playmaker", yearsInLeague: 6, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 3, name: "Jimmy Snuggerud", number: 21, position: "Right Wing", age: 21, birthYear: 2004,
        height: "6'2\"", weight: "187 lbs", heightCm: 188, weightLbs: 187,
        birthplace: "Chaska, MN", nationality: "USA", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "B", drafted: "1st Round 2022", draftYear: 2022, draftRound: 1,
        draftOverall: 23, draftTeam: "St. Louis Blues", shoots: "Right",
        salary: "$950K", salaryValue: 950000, gamesPlayed: 7, goals: 1,
        assists: 3, points: 4, plusMinus: 0, penaltyMinutes: 2,
        playerStyle: "Sniper", yearsInLeague: 1, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 4, name: "Jake Neighbours", number: 63, position: "Left Wing", age: 23, birthYear: 2002,
        height: "6'0\"", weight: "201 lbs", heightCm: 183, weightLbs: 201,
        birthplace: "Airdrie, AB", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "B+", drafted: "1st Round 2020", draftYear: 2020, draftRound: 1,
        draftOverall: 26, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$835K", salaryValue: 835834, gamesPlayed: 82, goals: 22,
        assists: 24, points: 46, plusMinus: 0, penaltyMinutes: 44,
        playerStyle: "Power Forward", yearsInLeague: 3, previousLeagues: ["WHL"],
        draftEligible: false
    },
    {
        id: 5, name: "Brayden Schenn", number: 10, position: "Center", age: 33, birthYear: 1991,
        height: "6'1\"", weight: "201 lbs", heightCm: 185, weightLbs: 201,
        birthplace: "Saskatoon, SK", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2028,
        rating: "B+", drafted: "1st Round 2009", draftYear: 2009, draftRound: 1,
        draftOverall: 5, draftTeam: "Los Angeles Kings", shoots: "Left",
        salary: "$6.5M", salaryValue: 6500000, gamesPlayed: 82, goals: 18,
        assists: 32, points: 50, plusMinus: 3, penaltyMinutes: 54,
        playerStyle: "Two-Way Forward", yearsInLeague: 14, previousLeagues: ["WHL"],
        draftEligible: false
    },
    {
        id: 6, name: "Jordan Kyrou", number: 25, position: "Right Wing", age: 27, birthYear: 1998,
        height: "6'1\"", weight: "196 lbs", heightCm: 185, weightLbs: 196,
        birthplace: "Toronto, ON", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2031,
        rating: "A", drafted: "2nd Round 2016", draftYear: 2016, draftRound: 2,
        draftOverall: 35, draftTeam: "St. Louis Blues", shoots: "Right",
        salary: "$8.125M", salaryValue: 8125000, gamesPlayed: 82, goals: 36,
        assists: 34, points: 70, plusMinus: 23, penaltyMinutes: 16,
        playerStyle: "Speedster", yearsInLeague: 6, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 7, name: "Mathieu Joseph", number: 71, position: "Left Wing", age: 28, birthYear: 1997,
        height: "6'1\"", weight: "190 lbs", heightCm: 185, weightLbs: 190,
        birthplace: "Laval, QC", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "C+", drafted: "4th Round 2015", draftYear: 2015, draftRound: 4,
        draftOverall: 120, draftTeam: "Tampa Bay Lightning", shoots: "Left",
        salary: "$2.95M", salaryValue: 2950000, gamesPlayed: 60, goals: 4,
        assists: 10, points: 14, plusMinus: -6, penaltyMinutes: 22,
        playerStyle: "Grinder", yearsInLeague: 6, previousLeagues: ["QMJHL"],
        draftEligible: false
    },
    {
        id: 8, name: "Dylan Holloway", number: 81, position: "Center", age: 23, birthYear: 2001,
        height: "6'1\"", weight: "205 lbs", heightCm: 185, weightLbs: 205,
        birthplace: "Calgary, AB", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B", drafted: "1st Round 2020", draftYear: 2020, draftRound: 1,
        draftOverall: 14, draftTeam: "Edmonton Oilers", shoots: "Left",
        salary: "$2.29M", salaryValue: 2290457, gamesPlayed: 77, goals: 26,
        assists: 37, points: 63, plusMinus: 21, penaltyMinutes: 32,
        playerStyle: "Two-Way Forward", yearsInLeague: 3, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 9, name: "Zack Bolduc", number: 76, position: "Right Wing", age: 22, birthYear: 2003,
        height: "6'0\"", weight: "187 lbs", heightCm: 183, weightLbs: 187,
        birthplace: "Trois-Rivières, QC", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B", drafted: "1st Round 2021", draftYear: 2021, draftRound: 1,
        draftOverall: 17, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$863K", salaryValue: 863343, gamesPlayed: 72, goals: 19,
        assists: 17, points: 36, plusMinus: 20, penaltyMinutes: 28,
        playerStyle: "Power Forward", yearsInLeague: 2, previousLeagues: ["QMJHL"],
        draftEligible: false
    },
    {
        id: 10, name: "Alexei Toropchenko", number: 13, position: "Left Wing", age: 25, birthYear: 1999,
        height: "6'6\"", weight: "223 lbs", heightCm: 198, weightLbs: 223,
        birthplace: "Moscow, RUS", nationality: "Russia", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "C+", drafted: "4th Round 2017", draftYear: 2017, draftRound: 4,
        draftOverall: 113, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$1.25M", salaryValue: 1250000, gamesPlayed: 80, goals: 4,
        assists: 14, points: 18, plusMinus: -1, penaltyMinutes: 42,
        playerStyle: "Grinder", yearsInLeague: 4, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 11, name: "Oskar Sundqvist", number: 70, position: "Center", age: 31, birthYear: 1994,
        height: "6'3\"", weight: "220 lbs", heightCm: 191, weightLbs: 220,
        birthplace: "Boden, SWE", nationality: "Sweden", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "C+", drafted: "3rd Round 2012", draftYear: 2012, draftRound: 3,
        draftOverall: 81, draftTeam: "Pittsburgh Penguins", shoots: "Right",
        salary: "$1.5M", salaryValue: 1500000, gamesPlayed: 67, goals: 6,
        assists: 14, points: 20, plusMinus: -6, penaltyMinutes: 38,
        playerStyle: "Defensive Forward", yearsInLeague: 9, previousLeagues: ["SHL"],
        draftEligible: false
    },
    {
        id: 12, name: "Nathan Walker", number: 26, position: "Right Wing", age: 31, birthYear: 1994,
        height: "5'9\"", weight: "187 lbs", heightCm: 175, weightLbs: 187,
        birthplace: "Cardiff, WAL", nationality: "Australia", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "C", drafted: "3rd Round 2014", draftYear: 2014, draftRound: 3,
        draftOverall: 89, draftTeam: "Washington Capitals", shoots: "Left",
        salary: "$775K", salaryValue: 775000, gamesPlayed: 73, goals: 8,
        assists: 8, points: 16, plusMinus: -5, penaltyMinutes: 26,
        playerStyle: "Energy Forward", yearsInLeague: 7, previousLeagues: ["AHL"],
        draftEligible: false
    },

    // NHL Players - St. Louis Blues Defense
    {
        id: 13, name: "Cam Fowler", number: 17, position: "Defense", age: 33, birthYear: 1991,
        height: "6'2\"", weight: "209 lbs", heightCm: 188, weightLbs: 209,
        birthplace: "Windsor, ON", nationality: "USA", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B+", drafted: "1st Round 2010", draftYear: 2010, draftRound: 1,
        draftOverall: 12, draftTeam: "Anaheim Ducks", shoots: "Left",
        salary: "$4M", salaryValue: 4000001, gamesPlayed: 68, goals: 9,
        assists: 31, points: 40, plusMinus: 12, penaltyMinutes: 20,
        playerStyle: "Offensive Defenseman", yearsInLeague: 14, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 14, name: "Colton Parayko", number: 55, position: "Defense", age: 32, birthYear: 1993,
        height: "6'6\"", weight: "229 lbs", heightCm: 198, weightLbs: 229,
        birthplace: "St. Albert, AB", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2030,
        rating: "A-", drafted: "3rd Round 2012", draftYear: 2012, draftRound: 3,
        draftOverall: 86, draftTeam: "St. Louis Blues", shoots: "Right",
        salary: "$6.5M", salaryValue: 6500000, gamesPlayed: 64, goals: 16,
        assists: 20, points: 36, plusMinus: 12, penaltyMinutes: 32,
        playerStyle: "Defensive Defenseman", yearsInLeague: 9, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 15, name: "Philip Broberg", number: 6, position: "Defense", age: 23, birthYear: 2001,
        height: "6'3\"", weight: "198 lbs", heightCm: 191, weightLbs: 198,
        birthplace: "Örebro, SWE", nationality: "Sweden", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B", drafted: "1st Round 2019", draftYear: 2019, draftRound: 1,
        draftOverall: 8, draftTeam: "Edmonton Oilers", shoots: "Left",
        salary: "$4.58M", salaryValue: 4580917, gamesPlayed: 68, goals: 8,
        assists: 21, points: 29, plusMinus: 21, penaltyMinutes: 24,
        playerStyle: "Two-Way Defenseman", yearsInLeague: 3, previousLeagues: ["SHL"],
        draftEligible: false
    },
    {
        id: 16, name: "Justin Faulk", number: 72, position: "Defense", age: 33, birthYear: 1992,
        height: "6'0\"", weight: "216 lbs", heightCm: 183, weightLbs: 216,
        birthplace: "South St. Paul, MN", nationality: "USA", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "B", drafted: "2nd Round 2010", draftYear: 2010, draftRound: 2,
        draftOverall: 37, draftTeam: "Carolina Hurricanes", shoots: "Right",
        salary: "$6.5M", salaryValue: 6500000, gamesPlayed: 78, goals: 4,
        assists: 28, points: 32, plusMinus: -9, penaltyMinutes: 46,
        playerStyle: "Offensive Defenseman", yearsInLeague: 13, previousLeagues: ["NCAA"],
        draftEligible: false
    },
    {
        id: 17, name: "Tyler Tucker", number: 75, position: "Defense", age: 25, birthYear: 2000,
        height: "6'2\"", weight: "205 lbs", heightCm: 188, weightLbs: 205,
        birthplace: "Longlac, ON", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "C+", drafted: "7th Round 2018", draftYear: 2018, draftRound: 7,
        draftOverall: 203, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$800K", salaryValue: 800000, gamesPlayed: 38, goals: 3,
        assists: 4, points: 7, plusMinus: 4, penaltyMinutes: 18,
        playerStyle: "Stay-at-Home", yearsInLeague: 2, previousLeagues: ["OHL"],
        draftEligible: false
    },
    {
        id: 18, name: "Nick Leddy", number: 4, position: "Defense", age: 34, birthYear: 1991,
        height: "6'0\"", weight: "205 lbs", heightCm: 183, weightLbs: 205,
        birthplace: "Eden Prairie, MN", nationality: "USA", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2026,
        rating: "B-", drafted: "1st Round 2009", draftYear: 2009, draftRound: 1,
        draftOverall: 16, draftTeam: "Minnesota Wild", shoots: "Left",
        salary: "$4M", salaryValue: 4000000, gamesPlayed: 31, goals: 2,
        assists: 3, points: 5, plusMinus: 6, penaltyMinutes: 8,
        playerStyle: "Puck-Moving Defenseman", yearsInLeague: 14, previousLeagues: ["NCAA"],
        draftEligible: false
    },

    // NHL Players - St. Louis Blues Goalies
    {
        id: 19, name: "Jordan Binnington", number: 50, position: "Goalie", age: 31, birthYear: 1993,
        height: "6'2\"", weight: "172 lbs", heightCm: 188, weightLbs: 172,
        birthplace: "Richmond Hill, ON", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "B+", drafted: "3rd Round 2011", draftYear: 2011, draftRound: 3,
        draftOverall: 88, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$6M", salaryValue: 6000000, gamesPlayed: 56, goals: 0,
        assists: 0, points: 0, plusMinus: 0, penaltyMinutes: 14,
        playerStyle: "Butterfly Goalie", yearsInLeague: 7, previousLeagues: ["AHL"],
        draftEligible: false
    },
    {
        id: 20, name: "Joel Hofer", number: 30, position: "Goalie", age: 24, birthYear: 2000,
        height: "6'5\"", weight: "179 lbs", heightCm: 196, weightLbs: 179,
        birthplace: "Winnipeg, MB", nationality: "Canada", team: "St. Louis Blues",
        league: "NHL", status: "Active", contract: "Signed", contractExpiry: 2025,
        rating: "B", drafted: "4th Round 2018", draftYear: 2018, draftRound: 4,
        draftOverall: 107, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$775K", salaryValue: 775000, gamesPlayed: 31, goals: 0,
        assists: 0, points: 0, plusMinus: 0, penaltyMinutes: 2,
        playerStyle: "Butterfly Goalie", yearsInLeague: 3, previousLeagues: ["WHL", "AHL"],
        draftEligible: false
    },

    // Prospect Players - Various Leagues
    {
        id: 21, name: "Matthew Schaefer", number: 2, position: "Defense", age: 18, birthYear: 2007,
        height: "6'2\"", weight: "185 lbs", heightCm: 188, weightLbs: 185,
        birthplace: "Oshawa, ON", nationality: "Canada", team: "Erie Otters",
        league: "OHL", status: "Prospect", contract: "Unsigned", contractExpiry: 2025,
        rating: "A", drafted: "Eligible 2025", draftYear: null, draftRound: null,
        draftOverall: null, draftTeam: null, shoots: "Right",
        salary: "Junior", salaryValue: 0, gamesPlayed: 45, goals: 12,
        assists: 38, points: 50, plusMinus: 28, penaltyMinutes: 22,
        playerStyle: "Offensive Defenseman", yearsInLeague: 2, previousLeagues: ["Minor Hockey"],
        draftEligible: true
    },
    {
        id: 22, name: "Jake O'Brien", number: 44, position: "Center", age: 18, birthYear: 2006,
        height: "6'0\"", weight: "180 lbs", heightCm: 183, weightLbs: 180,
        birthplace: "Toronto, ON", nationality: "Canada", team: "Brantford Bulldogs",
        league: "OHL", status: "Prospect", contract: "Unsigned", contractExpiry: 2025,
        rating: "B+", drafted: "Eligible 2025", draftYear: null, draftRound: null,
        draftOverall: null, draftTeam: null, shoots: "Left",
        salary: "Junior", salaryValue: 0, gamesPlayed: 52, goals: 28,
        assists: 42, points: 70, plusMinus: 18, penaltyMinutes: 30,
        playerStyle: "Two-Way Forward", yearsInLeague: 2, previousLeagues: ["Minor Hockey"],
        draftEligible: true
    },
    {
        id: 23, name: "Gavin McKenna", number: 9, position: "Center", age: 17, birthYear: 2007,
        height: "6'0\"", weight: "175 lbs", heightCm: 183, weightLbs: 175,
        birthplace: "Whitehorse, YT", nationality: "Canada", team: "Medicine Hat Tigers",
        league: "WHL", status: "Prospect", contract: "Unsigned", contractExpiry: 2026,
        rating: "A+", drafted: "Eligible 2026", draftYear: null, draftRound: null,
        draftOverall: null, draftTeam: null, shoots: "Left",
        salary: "Junior", salaryValue: 0, gamesPlayed: 61, goals: 34,
        assists: 63, points: 97, plusMinus: 42, penaltyMinutes: 16,
        playerStyle: "Elite Playmaker", yearsInLeague: 2, previousLeagues: ["Minor Hockey"],
        draftEligible: false
    },
    {
        id: 24, name: "Caleb Desnoyers", number: 17, position: "Center", age: 19, birthYear: 2005,
        height: "5'11\"", weight: "181 lbs", heightCm: 180, weightLbs: 181,
        birthplace: "Sherbrooke, QC", nationality: "Canada", team: "Moncton Wildcats",
        league: "QMJHL", status: "Prospect", contract: "Unsigned", contractExpiry: 2025,
        rating: "B+", drafted: "Eligible 2024", draftYear: null, draftRound: null,
        draftOverall: null, draftTeam: null, shoots: "Left",
        salary: "Junior", salaryValue: 0, gamesPlayed: 58, goals: 31,
        assists: 45, points: 76, plusMinus: 24, penaltyMinutes: 28,
        playerStyle: "Two-Way Forward", yearsInLeague: 3, previousLeagues: ["Minor Hockey"],
        draftEligible: true
    },
    {
        id: 25, name: "Danila Yurov", number: 24, position: "Right Wing", age: 21, birthYear: 2003,
        height: "6'1\"", weight: "178 lbs", heightCm: 185, weightLbs: 178,
        birthplace: "Chelyabinsk, RUS", nationality: "Russia", team: "Metallurg Magnitogorsk",
        league: "KHL", status: "Prospect", contract: "Signed", contractExpiry: 2026,
        rating: "A-", drafted: "1st Round 2022", draftYear: 2022, draftRound: 1,
        draftOverall: 24, draftTeam: "Minnesota Wild", shoots: "Left",
        salary: "$400K", salaryValue: 400000, gamesPlayed: 67, goals: 15,
        assists: 23, points: 38, plusMinus: 12, penaltyMinutes: 18,
        playerStyle: "Skilled Winger", yearsInLeague: 3, previousLeagues: ["MHL"],
        draftEligible: false
    },
    {
        id: 26, name: "Isaac Howard", number: 7, position: "Left Wing", age: 20, birthYear: 2004,
        height: "5'10\"", weight: "185 lbs", heightCm: 178, weightLbs: 185,
        birthplace: "Hudson, WI", nationality: "USA", team: "Minnesota Duluth",
        league: "NCAA", status: "Prospect", contract: "Unsigned", contractExpiry: 2026,
        rating: "B+", drafted: "1st Round 2022", draftYear: 2022, draftRound: 1,
        draftOverall: 31, draftTeam: "Tampa Bay Lightning", shoots: "Left",
        salary: "College", salaryValue: 0, gamesPlayed: 38, goals: 18,
        assists: 24, points: 42, plusMinus: 15, penaltyMinutes: 20,
        playerStyle: "Sniper", yearsInLeague: 2, previousLeagues: ["USHL"],
        draftEligible: false
    },

    // Additional league players to maintain variety
    {
        id: 27, name: "Macklin Celebrini", number: 71, position: "Center", age: 18, birthYear: 2006,
        height: "6'0\"", weight: "190 lbs", heightCm: 183, weightLbs: 190,
        birthplace: "North Vancouver, BC", nationality: "Canada", team: "Boston University",
        league: "NCAA", status: "Active", contract: "Signed", contractExpiry: 2027,
        rating: "A+", drafted: "1st Overall 2024", draftYear: 2024, draftRound: 1,
        draftOverall: 1, draftTeam: "San Jose Sharks", shoots: "Left",
        salary: "$950K", salaryValue: 950000, gamesPlayed: 38, goals: 32,
        assists: 32, points: 64, plusMinus: 25, penaltyMinutes: 16,
        playerStyle: "Elite Two-Way", yearsInLeague: 1, previousLeagues: ["USHL"],
        draftEligible: false
    },
    {
        id: 28, name: "Artyom Levshunov", number: 2, position: "Defense", age: 19, birthYear: 2005,
        height: "6'2\"", weight: "209 lbs", heightCm: 188, weightLbs: 209,
        birthplace: "Zhlobin, BLR", nationality: "Belarus", team: "Michigan State",
        league: "NCAA", status: "Prospect", contract: "Unsigned", contractExpiry: 2026,
        rating: "A", drafted: "2nd Overall 2024", draftYear: 2024, draftRound: 1,
        draftOverall: 2, draftTeam: "Chicago Blackhawks", shoots: "Right",
        salary: "College", salaryValue: 0, gamesPlayed: 38, goals: 9,
        assists: 26, points: 35, plusMinus: 18, penaltyMinutes: 24,
        playerStyle: "Two-Way Defenseman", yearsInLeague: 1, previousLeagues: ["USHL"],
        draftEligible: false
    },
    {
        id: 29, name: "Matvei Michkov", number: 39, position: "Right Wing", age: 20, birthYear: 2004,
        height: "5'10\"", weight: "172 lbs", heightCm: 178, weightLbs: 172,
        birthplace: "Perm, RUS", nationality: "Russia", team: "SKA St. Petersburg",
        league: "KHL", status: "Prospect", contract: "Signed", contractExpiry: 2026,
        rating: "A+", drafted: "7th Overall 2023", draftYear: 2023, draftRound: 1,
        draftOverall: 7, draftTeam: "Philadelphia Flyers", shoots: "Left",
        salary: "$500K", salaryValue: 500000, gamesPlayed: 48, goals: 19,
        assists: 22, points: 41, plusMinus: 16, penaltyMinutes: 20,
        playerStyle: "Elite Sniper", yearsInLeague: 3, previousLeagues: ["MHL"],
        draftEligible: false
    },
    {
        id: 30, name: "Dalibor Dvorsky", number: 54, position: "Center", age: 19, birthYear: 2005,
        height: "6'1\"", weight: "205 lbs", heightCm: 185, weightLbs: 205,
        birthplace: "Zvolen, SVK", nationality: "Slovakia", team: "Springfield Thunderbirds",
        league: "AHL", status: "Prospect", contract: "Signed", contractExpiry: 2028,
        rating: "B+", drafted: "10th Overall 2023", draftYear: 2023, draftRound: 1,
        draftOverall: 10, draftTeam: "St. Louis Blues", shoots: "Left",
        salary: "$918K", salaryValue: 918333, gamesPlayed: 2, goals: 0,
        assists: 0, points: 0, plusMinus: 0, penaltyMinutes: 0,
        playerStyle: "Two-Way Center", yearsInLeague: 1, previousLeagues: ["OHL"],
        draftEligible: false
    }
]

// Helper functions for league icons and logos
export const getLeagueIcon = (league: string): string => {
    const icons: Record<string, string> = {
        NHL: "🏒",
        AHL: "🏒",
        OHL: "🍁",
        WHL: "⛰️",
        QMJHL: "⚜️",
        NCAA: "🎓",
        KHL: "🇷🇺",
        SHL: "🇸🇪"
    }
    return icons[league] || "🏒"
}

export const getLeagueLogo = (league: string): string | null => {
    const logos: Record<string, string> = {
        NHL: "/nhl.svg",
        AHL: "/ahl.png",
        OHL: "/ohl.jpg",
        WHL: "/whl.png",
        QMJHL: "/qmjhl.png",
        SHL: "/shl.png"
    }
    return logos[league] || null
}
