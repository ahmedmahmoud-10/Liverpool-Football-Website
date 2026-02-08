// Liverpool FC Player Performance Charts

class PlayerCharts {
  constructor() {
    this.init();
  }

  init() {
    this.renderPerformanceChart();
    this.renderFormChart();
  }

  renderPerformanceChart() {
    const canvas = document.getElementById('performance-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = '250px';
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = 250;
    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Demo data: player ratings for last 10 matches
    const data = [8.5, 9.2, 8.8, 9.5, 8.3, 9.0, 9.3, 8.7, 9.1, 9.2];
    const labels = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10'];

    const maxValue = 10;
    const minValue = 6;
    const range = maxValue - minValue;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = 'rgba(244, 244, 246, 0.6)';
      ctx.font = '11px Montserrat, sans-serif';
      ctx.textAlign = 'right';
      const value = (maxValue - (range / 4) * i).toFixed(1);
      ctx.fillText(value, padding.left - 10, y + 4);
    }

    // Plot data
    const pointSpacing = chartWidth / (data.length - 1);

    // Draw gradient area under line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(215, 178, 62, 0.3)');
    gradient.addColorStop(1, 'rgba(215, 178, 62, 0.05)');

    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);

    data.forEach((value, index) => {
      const x = padding.left + pointSpacing * index;
      const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding.left + pointSpacing * index;
      const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = 'rgba(215, 178, 62, 1)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points
    data.forEach((value, index) => {
      const x = padding.left + pointSpacing * index;
      const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(215, 178, 62, 1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(10, 10, 16, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Value labels
      ctx.fillStyle = 'rgba(215, 178, 62, 1)';
      ctx.font = 'bold 11px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(1), x, y - 12);
    });

    // X-axis labels
    ctx.fillStyle = 'rgba(244, 244, 246, 0.6)';
    ctx.font = '11px Montserrat, sans-serif';
    ctx.textAlign = 'center';

    labels.forEach((label, index) => {
      const x = padding.left + pointSpacing * index;
      ctx.fillText(label, x, height - padding.bottom + 20);
    });

    // Chart title
    ctx.fillStyle = 'rgba(244, 244, 246, 0.9)';
    ctx.font = '600 13px Montserrat, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Match Rating (out of 10)', padding.left, 20);
  }

  renderFormChart() {
    const canvas = document.getElementById('form-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 180 * dpr;
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = '180px';
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = 180;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Demo data: W=3 points, D=1 point, L=0 points
    const results = ['W', 'W', 'W', 'D', 'W', 'L', 'W', 'W', 'W', 'D', 'W', 'W', 'W', 'L', 'W'];
    const points = results.map(r => r === 'W' ? 3 : r === 'D' ? 1 : 0);

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 3; i++) {
      const y = padding.top + (chartHeight / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(244, 244, 246, 0.6)';
      ctx.font = '11px Montserrat, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(3 - i, padding.left - 10, y + 4);
    }

    // Draw bars
    const barWidth = (chartWidth / results.length) * 0.7;
    const barSpacing = chartWidth / results.length;

    results.forEach((result, index) => {
      const x = padding.left + barSpacing * index + (barSpacing - barWidth) / 2;
      const barHeight = (points[index] / 3) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      // Color based on result
      let color;
      if (result === 'W') color = 'rgba(76, 209, 55, 0.8)';
      else if (result === 'D') color = 'rgba(255, 193, 7, 0.8)';
      else color = 'rgba(200, 16, 46, 0.8)';

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Border
      ctx.strokeStyle = result === 'W' ? 'rgba(76, 209, 55, 1)' :
                        result === 'D' ? 'rgba(255, 193, 7, 1)' :
                        'rgba(200, 16, 46, 1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Result label
      ctx.fillStyle = 'rgba(244, 244, 246, 0.9)';
      ctx.font = 'bold 12px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(result, x + barWidth / 2, height - padding.bottom + 20);
    });

    // Legend
    const legendY = 15;
    const legendItems = [
      { label: 'Win', color: 'rgba(76, 209, 55, 0.8)' },
      { label: 'Draw', color: 'rgba(255, 193, 7, 0.8)' },
      { label: 'Loss', color: 'rgba(200, 16, 46, 0.8)' }
    ];

    let legendX = width - padding.right - 200;
    legendItems.forEach((item, i) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY - 6, 12, 12);

      ctx.fillStyle = 'rgba(244, 244, 246, 0.9)';
      ctx.font = '11px Montserrat, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.label, legendX + 18, legendY + 4);

      legendX += 70;
    });
  }
}

// Initialize charts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PlayerCharts());
} else {
  new PlayerCharts();
}

// Redraw charts on window resize
window.addEventListener('resize', () => {
  if (document.getElementById('performance-chart')) {
    new PlayerCharts();
  }
});
