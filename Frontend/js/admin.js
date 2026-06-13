/* js/admin.js */

const BASE_URL = 'http://localhost:4003/api';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'admin-login.html';
        return;
    }

    const path = window.location.pathname;

    if (path.includes('admin-dashboard.html')) {
        loadDashboardData();
    } else if (path.includes('admin-applications.html')) {
        loadAllApplications();
    }
});

async function loadDashboardData() {
    try {
        const response = await fetch(`${BASE_URL}/dashboard/stats`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        const result = await response.json();
        
        if (result.success) {
            updateDashboardWidgets(result.data);
            initCharts(result.data);
        }

        const appResponse = await fetch(`${BASE_URL}/applications`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        const appResult = await appResponse.json();

        if (appResult.success) {
            const recentTable = document.getElementById('recentApplicationsBody');
            if (recentTable) {
                populateTable(recentTable, appResult.data.slice(0, 4));
            }
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

async function loadAllApplications() {
    try {
        const response = await fetch(`${BASE_URL}/applications`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        const result = await response.json();

        if (result.success) {
            const allTable = document.getElementById('allApplicationsBody');
            if (allTable) {
                populateTable(allTable, result.data);
            }
        }
    } catch (error) {
        console.error('Error loading applications:', error);
    }
}

function updateDashboardWidgets(stats) {
    const widgets = document.querySelectorAll('.widget-value');
    if (widgets.length >= 4) {
        widgets[0].textContent = stats.totalApplications || 0;
        widgets[1].textContent = stats.approved || 0;
        widgets[2].textContent = stats.underReview || 0;
        widgets[3].textContent = stats.rejected || 0;
    }
}

function getStatusBadge(status) {
    switch (status) {
        case 'APPROVED': return '<span class="badge badge-success">Approved</span>';
        case 'REJECTED': return '<span class="badge badge-danger">Rejected</span>';
        case 'UNDER_REVIEW': return '<span class="badge badge-warning">Under Review</span>';
        default: return '<span class="badge badge-primary">Submitted</span>';
    }
}

function populateTable(tbody, data) {
    tbody.innerHTML = '';
    data.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="font-medium">${app.full_name}</div>
                <div class="text-sm text-text-light">${app.email}</div>
            </td>
            <td class="font-medium text-sm">${app.course}</td>
            <td class="text-sm text-text-light">${new Date(app.created_at).toLocaleDateString()}</td>
            <td>${getStatusBadge(app.status)}</td>
            <td>
                <a href="admin-details.html?id=${app.id}" class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Review</a>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initCharts(stats) {
    const trendCanvas = document.getElementById('trendChart');
    const doughnutCanvas = document.getElementById('doughnutChart');

    if (!trendCanvas || !doughnutCanvas) return;

    const root = getComputedStyle(document.documentElement);
    const primary = root.getPropertyValue('--color-primary').trim() || '#2563eb';
    const success = root.getPropertyValue('--color-success').trim() || '#10b981';
    const warning = root.getPropertyValue('--color-warning').trim() || '#f59e0b';
    const danger = root.getPropertyValue('--color-danger').trim() || '#ef4444';
    const indigo = root.getPropertyValue('--color-indigo').trim() || '#4f46e5';

    const labels = stats.trends && stats.trends.length > 0 ? stats.trends.map(t => t.month) : ['No Data'];
    const newAppsData = stats.trends && stats.trends.length > 0 ? stats.trends.map(t => Number(t.new_applications) || 0) : [0];
    const admissionsData = stats.trends && stats.trends.length > 0 ? stats.trends.map(t => Number(t.admissions) || 0) : [0];

    // Trend Chart (Bar/Line) - using dynamic trend data from backend
    const ctxTrend = trendCanvas.getContext('2d');
    new Chart(ctxTrend, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'New Applications',
                data: newAppsData,
                backgroundColor: primary,
                borderRadius: 4,
            }, {
                label: 'Admissions',
                data: admissionsData,
                backgroundColor: indigo,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [2, 4] } },
                x: { grid: { display: false } }
            }
        }
    });

    // Doughnut Chart
    const ctxDoughnut = doughnutCanvas.getContext('2d');
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Approved', 'Under Review', 'Submitted', 'Rejected'],
            datasets: [{
                data: [
                    Number(stats.approved) || 0,
                    Number(stats.underReview) || 0,
                    Number(stats.submitted) || 0,
                    Number(stats.rejected) || 0
                ],
                backgroundColor: [success, warning, primary, danger],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
