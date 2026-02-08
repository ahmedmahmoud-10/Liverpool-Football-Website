# Setup Guide

## Quick Start

The site is ready to use immediately with demo data. Open `index.html` in your browser.

## Features

### Live Dashboard
- Live Match Countdown - Real-time countdown to the next Liverpool match
- Live Scores - Shows live match scores when Liverpool is playing
- Quick Stats - League position, points, goal difference, and form
- Fixtures and Results - Upcoming matches and recent results
- League Table - Full Premier League standings with Liverpool highlighted
- Auto-refresh - Data updates every 60 seconds

### Players Page
- Player Spotlight - Featured player with detailed stats
- Performance Graphs - Last 10 matches ratings chart
- Team Form Graph - Visual 15-match form tracker
- Top Scorers and Assists - Leaderboards with numbers
- Player Cards - Key players with mini stats

### Visual Effects
- Floating Particles - Liverpool red and gold particles with connecting lines
- Scroll Animations - Smooth fade-in effects as you scroll
- Modern Design - Glassmorphism with backdrop blur
- Responsive Layout - Works on all devices

## Getting Real Live Data

To switch from demo data to real live data:

### 1. Get a Free API Key

1. Visit https://www.football-data.org/client/register
2. Register for a free account
3. Verify your email
4. Copy your API key

### 2. Configure the Dashboard

Open `dashboard.js` and update:

```javascript
const CONFIG = {
  API_KEY: 'paste_your_api_key_here',
  LIVERPOOL_TEAM_ID: 64,
  PREMIER_LEAGUE_ID: 2021,
  UPDATE_INTERVAL: 60000,
  USE_DEMO_DATA: false
};
```

### 3. Run

Refresh your browser and you'll get real live Premier League data.

## Free API Limits

- 10 requests per minute
- 30,000 requests per month
- Suitable for personal use

## Troubleshooting

### CORS Error in Browser

Use a local server instead of opening the file directly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

Or use VS Code Live Server extension

### No data showing

- Check browser console for errors
- Verify your API key is correct
- Ensure `USE_DEMO_DATA` is set to `false`

## Portfolio Notes

This project demonstrates:
- Real-time data fetching from APIs
- Modern UI/UX design
- Responsive layout
- JavaScript ES6+ classes
- State management
- Auto-updating content
