# DodoPayments Assignment

## [Frontend API Queue System Page Link](https://dodo-payment-assignment.vercel.app/queue-test)

A comprehensive financial dashboard application built with Next.js and TailwindCSS, featuring a UI implementation based on a Figma design and an API queue system to handle rate-limited requests.

## Features

### UI Implementation

- **Financial Dashboard**: Complete replication of the Figma design with:
  - My Cards widget with spending limits
  - Spending Summary with visual charts
  - Recent Transactions with filtering
  - My Subscriptions management
  - Exchange Card for currency conversion
  - Credit Score display
  - Total Expenses tracking
- **Responsive Design**: Fully responsive layout for both desktop and mobile screens
- **Modern UI Components**: Built with Radix UI and shadcn/ui components

### API Server

- **POST `/api/echo` Endpoint**:
  - Accepts JSON payload with a `message` field
  - Simulates 2-second processing delay
  - Returns `{ "status": "ok", "echo": "<message>" }`
  - Implements rate limiting (5 requests per minute)
  - Returns HTTP 429 when rate limit is exceeded

### Frontend API Queue System

- **Queue Management**: Sequential processing of API requests to prevent rate limit violations
- **Real-time Status**: Displays:
  - Number of queued requests
  - Current request status
  - All responses from the backend
- **Error Handling**: Properly handles rate limit errors (429) and network errors
- **Demo Page**: Accessible at `/queue-test` route

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
  - [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library
- **State Management**: React Hooks (useState, useEffect)
- **Data Fetching**: Native Fetch API
- **TypeScript**: Full type safety
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dodopaymentassi
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dodopaymentassi/
├── app/
│   ├── api/
│   │   └── echo/
│   │       └── route.ts          # API endpoint with rate limiting
│   ├── queue-test/
│   │   └── page.tsx              # Queue system demo page
│   ├── layout.tsx                # Root layout with sidebar
│   ├── page.tsx                  # Main dashboard page
│   └── providers.tsx             # React Query provider
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── my-card.tsx               # Cards widget
│   ├── spending-summary.tsx      # Spending summary widget
│   ├── recent-transactions.tsx   # Transactions widget
│   ├── my-subscriptions.tsx      # Subscriptions widget
│   └── RightSidecomponents/     # Right sidebar widgets
├── public/                       # Static assets
└── lib/
    └── utils.ts                 # Utility functions
```

## 🏗️ Architecture & Design Decisions

### API Rate Limiting

- **Implementation**: In-memory rate limiting using a simple counter
- **Limit**: 5 requests per minute per server instance
- **Reset**: Automatic reset every 60 seconds
- **Response**: HTTP 429 with JSON error message when limit exceeded

**Note**: For production, consider using:

- Redis-based rate limiting for multi-instance deployments
- Token bucket or sliding window algorithms
- Per-user/IP rate limiting

### Queue System

- **Architecture**: Client-side queue using React state management
- **Processing**: Sequential (FIFO) processing to prevent rate limit violations
- **Error Handling**:
  - Catches and displays network errors
  - Handles 429 responses gracefully
  - Continues processing remaining queue items
- **State Management**: Uses `useRef` to prevent race conditions in useEffect

### UI Components

- **Reusability**: All components are modular and reusable
- **Accessibility**: Built with Radix UI primitives for WCAG compliance
- **Responsive**: Mobile-first approach with TailwindCSS breakpoints
- **Design System**: Consistent spacing, colors, and typography throughout

## 🧪 Testing the Queue System

1. Navigate to `/queue-test` in your browser
2. Click "Add Request to Queue" multiple times quickly
3. Observe:
   - Requests are queued and processed sequentially
   - Each request takes ~2 seconds to process
   - Queue length decreases as requests are processed
   - Responses appear in real-time
   - Rate limit errors (429) are handled gracefully

## 📝 API Documentation

### POST `/api/echo`

Echoes back a message after a 2-second delay.

**Request:**

```json
{
  "message": "Hello, World!"
}
```

**Success Response (200):**

```json
{
  "status": "ok",
  "echo": "Hello, World!"
}
```

**Rate Limit Exceeded (429):**

```json
{
  "error": "Rate limit exceeded. Try again later."
}
```

**Error Responses:**

- `400`: Invalid JSON or missing `message` field
- `429`: Rate limit exceeded (5 requests/minute)
- `500`: Internal server error

## 🚢 Deployment

### Build for Production

```bash
pnpm build
pnpm start
```

### Recommended Platforms

- **Vercel**: Optimized for Next.js deployments
- **Netlify**: Great for static and serverless deployments
- **AWS/Azure/GCP**: For custom infrastructure needs
<!--

## 📄 License

This project is part of an assignment submission.

## 👤 Author

Built as part of the React Intern Assignment for DodoPayments. -->
