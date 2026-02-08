# Liverpool FC Live Dashboard

A personal project combining two of my interests: Liverpool FC and web development. This real-time dashboard features live scores, fixtures, player statistics, and custom visualizations built from scratch using vanilla JavaScript, HTML5, and CSS3.

## Features

### Live Dashboard
- Real-time match countdown with animated timer
- Live scores when Liverpool is playing
- Quick stats: league position, points, goal difference, form
- Fixtures and results with interactive tabs
- League table with Liverpool highlighted
- Auto-refresh every 60 seconds

### Players Page
- Player spotlight with detailed stats
- Top scorers and assists leaderboards
- Performance graphs with match ratings
- Team form visualization over last 15 matches
- Featured players with mini stats cards

### Visual Effects
- Floating particles in Liverpool colors
- Smooth scroll animations with fade-in effects
- Glassmorphism design with backdrop blur
- Responsive layout for all devices
- Modern UI/UX with hover effects and transitions

### Data
- Powered by Football-Data.org API
- Works with demo data out of the box
- Easy switch to live data
- 60-second auto-refresh

## Quick Start

1. Clone the repository
2. Open `index.html` in your browser
3. Site works immediately with demo data

## Setup for Live Data

### Get API Key
1. Visit https://www.football-data.org/client/register
2. Register for a free account
3. Verify your email
4. Copy your API key

### Configure
1. Copy `dashboard.example.js` to `dashboard.js`
2. Open `dashboard.js` and update:
```javascript
const CONFIG = {
  API_KEY: 'YOUR_API_KEY_HERE',
  LIVERPOOL_TEAM_ID: 64,
  PREMIER_LEAGUE_ID: 2021,
  UPDATE_INTERVAL: 60000,
  USE_DEMO_DATA: false
};
```

### Run
For development, use a local server:
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

Or use VS Code Live Server extension

## Project Structure

```
├── index.html              # Live dashboard homepage
├── players.html            # Player stats and graphs
├── squad.html              # Full squad list
├── stadium.html            # Anfield photos
├── champions.html          # Trophy cabinet
├── style.css               # All styles
├── dashboard.js            # Live data handler (gitignored)
├── dashboard.example.js    # Template for git
├── particles.js            # Particle effects
├── scroll-animations.js    # Scroll animations
├── player-charts.js        # Performance charts
├── .gitignore             # Protects API keys
└── README.md              # Documentation
```

## Security

Never commit your API key to git.

- `dashboard.js` is in `.gitignore` to protect your key
- Use `dashboard.example.js` as the template for git
- Keep your personal `dashboard.js` local only

## Tech Stack

- HTML5 Canvas for custom charts
- Vanilla JavaScript (ES6+)
- CSS3 with custom properties
- Intersection Observer API for scroll animations
- Fetch API for data retrieval
- No frameworks - pure performance

## Responsive Design

- Desktop (1100px+) - Full experience
- Tablet (900px-1100px) - Optimized layout
- Mobile (< 900px) - Mobile-first design

## API Free Tier Limits

- 10 requests per minute
- 30,000 requests per month
- Suitable for personal projects

## Credits

- Data: Football-Data.org
- Fonts: Google Fonts (Montserrat)
- Images: Wikimedia Commons

## License

Free to use for personal projects.
