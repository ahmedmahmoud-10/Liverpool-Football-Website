// Liverpool FC Live Dashboard
// Get your free API key from https://www.football-data.org/client/register

const CONFIG = {
  API_KEY: 'YOUR_API_KEY_HERE', // Replace with your API key
  LIVERPOOL_TEAM_ID: 64,
  PREMIER_LEAGUE_ID: 2021,
  UPDATE_INTERVAL: 60000, // 60 seconds
  USE_DEMO_DATA: true // Set to false when you have an API key
};

// Demo data for testing without API key
const DEMO_DATA = {
  standings: [
    { position: 1, team: { name: 'Liverpool FC' }, playedGames: 25, won: 19, draw: 4, lost: 2, goalsFor: 58, goalsAgainst: 20, goalDifference: 38, points: 61 },
    { position: 2, team: { name: 'Arsenal FC' }, playedGames: 25, won: 18, draw: 5, lost: 2, goalsFor: 54, goalsAgainst: 22, goalDifference: 32, points: 59 },
    { position: 3, team: { name: 'Manchester City FC' }, playedGames: 25, won: 17, draw: 6, lost: 2, goalsFor: 60, goalsAgainst: 25, goalDifference: 35, points: 57 },
    { position: 4, team: { name: 'Chelsea FC' }, playedGames: 25, won: 15, draw: 7, lost: 3, goalsFor: 48, goalsAgainst: 28, goalDifference: 20, points: 52 }
  ],
  nextMatch: {
    homeTeam: { name: 'Liverpool FC' },
    awayTeam: { name: 'Manchester United FC' },
    utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    competition: { name: 'Premier League' }
  },
  recentMatches: [
    { homeTeam: { name: 'Liverpool FC' }, awayTeam: { name: 'Everton FC' }, score: { fullTime: { home: 3, away: 1 } }, utcDate: '2026-02-05T20:00:00Z', status: 'FINISHED' },
    { homeTeam: { name: 'Newcastle United FC' }, awayTeam: { name: 'Liverpool FC' }, score: { fullTime: { home: 1, away: 2 } }, utcDate: '2026-02-01T15:00:00Z', status: 'FINISHED' },
    { homeTeam: { name: 'Liverpool FC' }, awayTeam: { name: 'Brighton & Hove Albion FC' }, score: { fullTime: { home: 2, away: 0 } }, utcDate: '2026-01-28T19:45:00Z', status: 'FINISHED' }
  ],
  upcomingMatches: [
    { homeTeam: { name: 'Liverpool FC' }, awayTeam: { name: 'Manchester United FC' }, utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), competition: { name: 'Premier League' } },
    { homeTeam: { name: 'Tottenham Hotspur FC' }, awayTeam: { name: 'Liverpool FC' }, utcDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), competition: { name: 'Premier League' } }
  ]
};

class LiverpoolDashboard {
  constructor() {
    this.liverpoolData = null;
    this.nextMatchInterval = null;
    this.updateInterval = null;
    this.init();
  }

  async init() {
    this.setupTabs();
    await this.loadAllData();
    this.startAutoUpdate();
  }

  setupTabs() {
    const tabs = [
      { btn: document.getElementById('tab-fixtures'), panel: document.getElementById('panel-fixtures') },
      { btn: document.getElementById('tab-results'), panel: document.getElementById('panel-results') },
      { btn: document.getElementById('tab-standings'), panel: document.getElementById('panel-standings') }
    ];

    const activate = (index) => {
      tabs.forEach((t, i) => {
        const on = i === index;
        t.btn.setAttribute('aria-selected', on ? 'true' : 'false');
        t.panel.classList.toggle('active', on);
      });
    };

    tabs.forEach((t, idx) => {
      t.btn.addEventListener('click', () => activate(idx));
      t.btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') activate((idx + 1) % tabs.length);
        if (e.key === 'ArrowLeft') activate((idx - 1 + tabs.length) % tabs.length);
      });
    });
  }

  async loadAllData() {
    try {
      if (CONFIG.USE_DEMO_DATA) {
        this.renderDemoData();
      } else {
        await Promise.all([
          this.fetchStandings(),
          this.fetchMatches(),
          this.fetchTeamData()
        ]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.showError();
    }
  }

  renderDemoData() {
    this.renderStandings(DEMO_DATA.standings);
    this.renderNextMatch(DEMO_DATA.nextMatch);
    this.renderFixtures(DEMO_DATA.upcomingMatches);
    this.renderResults(DEMO_DATA.recentMatches);
    this.updateQuickStats(DEMO_DATA.standings[0]);
  }

  async fetchStandings() {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${CONFIG.PREMIER_LEAGUE_ID}/standings`,
      { headers: { 'X-Auth-Token': CONFIG.API_KEY } }
    );
    const data = await response.json();
    const standings = data.standings[0].table;
    this.renderStandings(standings);

    const liverpoolStanding = standings.find(t => t.team.id === CONFIG.LIVERPOOL_TEAM_ID);
    if (liverpoolStanding) {
      this.updateQuickStats(liverpoolStanding);
    }
  }

  async fetchMatches() {
    const response = await fetch(
      `https://api.football-data.org/v4/teams/${CONFIG.LIVERPOOL_TEAM_ID}/matches?status=SCHEDULED,FINISHED,IN_PLAY`,
      { headers: { 'X-Auth-Token': CONFIG.API_KEY } }
    );
    const data = await response.json();

    const now = new Date();
    const upcoming = data.matches.filter(m => new Date(m.utcDate) > now && m.status === 'SCHEDULED');
    const finished = data.matches.filter(m => m.status === 'FINISHED').slice(-5).reverse();
    const live = data.matches.find(m => m.status === 'IN_PLAY');

    if (live) {
      this.renderLiveMatch(live);
    } else if (upcoming.length > 0) {
      this.renderNextMatch(upcoming[0]);
    }

    this.renderFixtures(upcoming.slice(0, 5));
    this.renderResults(finished);
  }

  async fetchTeamData() {
    const response = await fetch(
      `https://api.football-data.org/v4/teams/${CONFIG.LIVERPOOL_TEAM_ID}`,
      { headers: { 'X-Auth-Token': CONFIG.API_KEY } }
    );
    const data = await response.json();
    this.liverpoolData = data;
  }

  renderStandings(standings) {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = standings.map(team => `
      <tr class="${team.team.name.includes('Liverpool') ? 'liverpool-row' : ''}">
        <td><strong>${team.position}</strong></td>
        <td>${team.team.name}</td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
        <td><strong>${team.points}</strong></td>
      </tr>
    `).join('');
  }

  renderNextMatch(match) {
    const section = document.getElementById('next-match-section');
    const matchDate = new Date(match.utcDate);

    document.getElementById('next-home').textContent = match.homeTeam.name;
    document.getElementById('next-away').textContent = match.awayTeam.name;
    document.getElementById('next-match-info').textContent =
      `${match.competition?.name || 'Match'} • ${matchDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`;

    section.style.display = 'block';
    this.startCountdown(matchDate);
  }

  renderLiveMatch(match) {
    const section = document.getElementById('live-match-section');

    document.getElementById('live-home').textContent = match.homeTeam.name;
    document.getElementById('live-away').textContent = match.awayTeam.name;
    document.getElementById('live-home-score').textContent = match.score.fullTime.home || 0;
    document.getElementById('live-away-score').textContent = match.score.fullTime.away || 0;
    document.getElementById('live-status-text').textContent = 'LIVE NOW';

    section.style.display = 'block';
    document.getElementById('next-match-section').style.display = 'none';
  }

  startCountdown(targetDate) {
    if (this.nextMatchInterval) clearInterval(this.nextMatchInterval);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(this.nextMatchInterval);
        document.getElementById('countdown-timer').innerHTML =
          '<div class="match-status">Match has started!</div>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    };

    updateCountdown();
    this.nextMatchInterval = setInterval(updateCountdown, 1000);
  }

  renderFixtures(matches) {
    const container = document.getElementById('fixtures-list');

    if (!matches || matches.length === 0) {
      container.innerHTML = '<div class="loading">No upcoming fixtures</div>';
      return;
    }

    container.innerHTML = matches.map(match => {
      const date = new Date(match.utcDate);
      const homeTeam = this.highlightLiverpool(match.homeTeam.name);
      const awayTeam = this.highlightLiverpool(match.awayTeam.name);

      return `
        <div class="fixture-item">
          <div class="fixture-date">${date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</div>
          <div class="fixture-teams">${homeTeam} vs ${awayTeam}</div>
          <div class="fixture-venue">${match.competition?.name || 'Match'}</div>
        </div>
      `;
    }).join('');
  }

  renderResults(matches) {
    const container = document.getElementById('results-list');

    if (!matches || matches.length === 0) {
      container.innerHTML = '<div class="loading">No recent results</div>';
      return;
    }

    container.innerHTML = matches.map(match => {
      const date = new Date(match.utcDate);
      const homeTeam = this.highlightLiverpool(match.homeTeam.name);
      const awayTeam = this.highlightLiverpool(match.awayTeam.name);
      const score = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;

      return `
        <div class="fixture-item">
          <div class="fixture-date">${date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</div>
          <div class="fixture-teams">${homeTeam} vs ${awayTeam}</div>
          <div class="fixture-score">${score}</div>
        </div>
      `;
    }).join('');
  }

  highlightLiverpool(teamName) {
    if (teamName.includes('Liverpool')) {
      return `<span class="liverpool-highlight">${teamName}</span>`;
    }
    return teamName;
  }

  updateQuickStats(standing) {
    document.getElementById('position-stat').textContent = `#${standing.position}`;
    document.getElementById('points-stat').textContent = standing.points;
    document.getElementById('gd-stat').textContent =
      standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference;

    // Generate form from recent results (simplified - using W/D/L pattern)
    const form = this.generateForm(standing);
    document.getElementById('form-stat').textContent = form;
  }

  generateForm(standing) {
    // This is a simplified form generator
    // In real scenario, you'd get this from match results
    const forms = ['WWWDW', 'WWWWL', 'WDWWW', 'WWDWW'];
    return forms[Math.floor(Math.random() * forms.length)];
  }

  startAutoUpdate() {
    this.updateInterval = setInterval(() => {
      console.log('Refreshing data...');
      this.loadAllData();
    }, CONFIG.UPDATE_INTERVAL);
  }

  showError() {
    document.getElementById('fixtures-list').innerHTML =
      '<div class="loading">Unable to load data. Check your API key or try demo mode.</div>';
    document.getElementById('results-list').innerHTML =
      '<div class="loading">Unable to load data.</div>';
    document.getElementById('standings-body').innerHTML =
      '<tr><td colspan="8" class="loading">Unable to load standings.</td></tr>';
  }
}

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LiverpoolDashboard());
} else {
  new LiverpoolDashboard();
}
