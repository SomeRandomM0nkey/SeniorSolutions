# CareConnect - Senior Care Home Referral Platform

An Airbnb-inspired platform for finding and comparing senior care facilities with advanced filtering and search capabilities.

## Features

- **Advanced Search & Filtering**: Filter by care type, bed availability, amenities, room types, and price range
- **Keyword Search**: Search across facility names, descriptions, and amenities
- **Professional Design**: Clean, trustworthy interface with responsive layout
- **Comparison Tools**: Compare up to 3 care homes side-by-side
- **Real-time Data**: Live availability status and pricing information

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI, Shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter

## Local Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd careconnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── pages/          # Page components
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                 # Shared types and schemas
└── components.json         # Shadcn/ui configuration
```

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### API Endpoints

- `GET /api/care-homes` - Get care homes with filtering
- `GET /api/care-homes/:id` - Get specific care home
- `POST /api/inquiries` - Create inquiry

## Deployment

The application is configured for easy deployment on platforms like Vercel, Netlify, or traditional hosting providers.

For production builds:
1. Run `npm run build`
2. Serve the `dist` folder as static files
3. Ensure the backend API is accessible

## Sample Data

The application includes 6 sample care homes in the San Francisco area with realistic data including:
- Pricing information
- Amenities and care types
- Availability status
- Contact information
- High-quality facility images