# 🎯 Standup.ly - Daily Standup Tracker

A professional **Real-time Daily Standup Dashboard** that auto-fetches team standups from Slack and displays them on a beautiful, responsive web interface.

## ✨ Features

- 📊 **Live Slack Integration** - Auto-fetches daily standups from your #standup channel
- 👤 **Developer Tracking** - See what each team member completed, is working on, and blockers
- 📈 **Progress Visualization** - Real-time progress bars and team health metrics
- 🔴 **Blocker Alerts** - Instantly identify and prioritize blockers
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Automatically refreshes every 5 minutes
- 🎨 **Professional UI** - Clean, modern design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Slack workspace with a standup channel
- Slack bot token (created following the setup guide)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/imamaalitester-stack/standup.ly.git
cd standup.ly
```

**2. Install frontend dependencies**
```bash
npm install
```

**3. Install backend dependencies**
```bash
cd server && npm install && cd ..
```

**4. Set up environment variables**

Frontend: Create `.env` file in project root:
```env
VITE_API_URL=http://localhost:3001
```

Backend: Create `server/.env` file:
```env
SLACK_BOT_TOKEN=xoxb-YOUR-TOKEN-HERE
SLACK_CHANNEL_ID=C0C7GM1FQKT
PORT=3001
NODE_ENV=development
```

### Running the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server && npm run dev
```
Server runs on: `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 📊 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express + Slack Web API
- **Real-time Data**: Auto-refresh every 5 minutes

## 🎯 Live Integration with Slack

The dashboard fetches and parses standup messages from your Slack channel in real-time:

```
Project: OmegaNova | #dev-team
• Done today: Dashboard UI, Bug fixes
• Next: Payment integration
• Blockers: Waiting for design specs
• Ready for QA: Feature X
Capacity: Full
```

## 🔗 GitHub Repository

https://github.com/imamaalitester-stack/standup.ly

---

**Made with ❤️ for better team standups**
