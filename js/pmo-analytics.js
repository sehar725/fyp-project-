document.addEventListener("DOMContentLoaded", function () {
  // Performance Bar Chart
  const ctxBar = document.getElementById('performanceChart');
  if (ctxBar) {
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Batch 2022', 'Batch 2023', 'Batch 2024', 'Batch 2025', 'Batch 2026'],
        datasets: [{
          label: 'Projects Completed',
          data: [42, 48, 55, 60, 68],
          backgroundColor: '#2563eb',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Grade Distribution Doughnut Chart
  const ctxDoughnut = document.getElementById('gradeChart');
  if (ctxDoughnut) {
    new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Grade A', 'Grade B', 'Grade C', 'Revision Required'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: ['#16a34a', '#2563eb', '#d97706', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // Export Report Button Action
  const exportBtn = document.getElementById('exportReportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert("Analytics Report PDF Exported Successfully!");
    });
  }
});