# BluesOps - St. Louis Blues Hockey Operations Platform

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/blakethaselbergers-projects/v0-blues-saas-design)

## 🏒 Overview

BluesOps is a comprehensive hockey operations management platform designed specifically for the St. Louis Blues organization. This enterprise-grade SaaS application provides advanced analytics, player management, scouting tools, and team operations features to streamline hockey operations and enhance decision-making.

## ✨ Features

### Core Functionality

- **🔐 Authentication System** - Secure login/logout flow with session management
- **📊 Analytics Dashboard** - Advanced metrics, player comparisons, and team performance analytics
- **👥 Player Management** - Comprehensive player profiles, stats, contracts, and notes
- **🔍 Scouting Tools** - Scouting reports, trip planning, and prospect tracking
- **📹 Video Analysis** - Video library with tracking data integration
- **📝 Notes System** - Meeting notes, draft notes, and player-specific documentation
- **🤖 AI Assistant** - Integrated AI chatbot for operational assistance
- **📱 Responsive Design** - Fully responsive interface optimized for desktop and mobile

### Technical Features

- **🎨 Modern UI/UX** - Clean, professional interface with St. Louis Blues branding
- **🌓 Theme Support** - Light mode with dark mode infrastructure (coming soon)
- **⚡ Performance** - Optimized loading with dynamic imports and lazy loading
- **🔄 Real-time Updates** - Live data synchronization across the platform
- **📱 Mobile-First** - Responsive design that works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/BluesOps.git
cd BluesOps
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

To explore the platform, use these demo credentials:
- **Email:** coach@bluesops.com
- **Password:** test1234

## 📁 Project Structure

```
BluesOps/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard/home page
│   ├── login/             # Authentication pages
│   ├── logout/            # Logout flow
│   ├── players/           # Player management
│   ├── analytics/         # Analytics dashboard
│   ├── scouting/          # Scouting tools
│   ├── video/             # Video analysis
│   ├── notes/             # Notes system
│   ├── settings/          # User settings
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout-wrapper.tsx # Main layout wrapper
│   ├── header.tsx        # Navigation header
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── analytics/        # Analytics components
│   ├── players/          # Player components
│   ├── scouting/         # Scouting components
│   └── ai-assistant/     # AI chatbot components
├── lib/                   # Utility functions
├── data/                  # Mock data and constants
├── public/                # Static assets
│   ├── st-louis-blues.svg # Team logo
│   └── ...               # Other assets
└── styles/                # Global styles
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Custom components with [Radix UI](https://www.radix-ui.com/) primitives
- **State Management:** React Context API
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📱 Key Pages

### Dashboard (`/`)
The main dashboard provides an overview of team operations, including:
- Team roster overview
- Recent activity feed
- Upcoming events
- System notes

### Players (`/players`)
Comprehensive player management with:
- Searchable player database
- Advanced filtering options
- Detailed player profiles
- Contract information
- Performance analytics

### Analytics (`/analytics`)
Advanced analytics dashboard featuring:
- Team performance metrics
- Player comparisons
- Goalie statistics
- Advanced metrics visualization

### Scouting (`/scouting`)
Scouting operations management:
- Scouting reports database
- Trip planning tools
- Prospect tracking
- Regional scouting maps

### Video Analysis (`/video`)
Video library and analysis tools:
- Game footage library
- Player highlight reels
- Tracking data integration
- Performance analysis

### Notes (`/notes`)
Comprehensive note-taking system:
- Meeting notes
- Draft preparation notes
- Player-specific notes
- Searchable note database

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any required environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Customization

The application can be customized through:
- Theme configuration in `tailwind.config.ts`
- Component styling in individual component files
- Global styles in `app/globals.css`

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

The application will automatically deploy on push to the main branch.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for the St. Louis Blues organization. All rights reserved.

## 🏆 Acknowledgments

- St. Louis Blues Hockey Operations Team
- Built with [v0.dev](https://v0.dev)
- Deployed on [Vercel](https://vercel.com)

---

**BluesOps** - Empowering hockey operations with cutting-edge technology 🏒💙💛
