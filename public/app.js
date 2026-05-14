const API_URL = 'http://localhost:3000/api';

let isScrapingActive = false;
let leads = [];

// Éléments du DOM
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const exportBtn = document.getElementById('exportBtn');
const statusBar = document.getElementById('statusBar');
const leadsBody = document.getElementById('leadsBody');
const totalLeadsEl = document.getElementById('totalLeads');
const scrapingStatusEl = document.getElementById('scrapingStatus');
const lastUpdateEl = document.getElementById('lastUpdate');

// Event listeners
startBtn.addEventListener('click', startScraping);
stopBtn.addEventListener('click', stopScraping);
exportBtn.addEventListener('click', exportToCSV);

// Charger les leads au démarrage
loadLeads();

async function startScraping() {
  isScrapingActive = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusBar.className = 'status-bar loading';
  statusBar.textContent = '⏳ Scraping en cours...';
  scrapingStatusEl.textContent = 'En cours';

  try {
    const response = await fetch(`${API_URL}/scrape`, {
      method: 'POST'
    });

    const data = await response.json();

    if (data.status === 'scraping') {
      // Polling pour les mises à jour
      pollLeads();
    }
  } catch (error) {
    showError('Erreur lors du démarrage du scraping: ' + error.message);
    resetButtons();
  }
}

function stopScraping() {
  isScrapingActive = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusBar.className = 'status-bar';
  statusBar.textContent = '⏹ Scraping arrêté';
  scrapingStatusEl.textContent = 'Arrêté';
}

async function loadLeads() {
  try {
    const response = await fetch(`${API_URL}/leads`);
    leads = await response.json();
    renderLeads();
    updateDashboard();
  } catch (error) {
    console.error('Erreur au chargement des leads:', error);
  }
}

function renderLeads() {
  if (leads.length === 0) {
    leadsBody.innerHTML = '<tr><td colspan="5" class="empty">Aucun lead pour le moment</td></tr>';
    return;
  }

  leadsBody.innerHTML = leads.map((lead, index) => `
    <tr>
      <td>${lead.nom || '-'}</td>
      <td>${lead.prenom || '-'}</td>
      <td>${lead.secteur || '-'}</td>
      <td>${lead.email || '-'}</td>
      <td>
        <button class="btn-delete" onclick="deleteLead(${index})">Supprimer</button>
      </td>
    </tr>
  `).join('');
}

function updateDashboard() {
  totalLeadsEl.textContent = leads.length;
  lastUpdateEl.textContent = new Date().toLocaleTimeString('fr-FR');
}

function deleteLead(index) {
  leads.splice(index, 1);
  renderLeads();
  updateDashboard();
}

function pollLeads() {
  const interval = setInterval(async () => {
    if (!isScrapingActive) {
      clearInterval(interval);
      return;
    }

    await loadLeads();
  }, 2000);
}

function exportToCSV() {
  if (leads.length === 0) {
    alert('Aucun lead à exporter');
    return;
  }

  const headers = ['Nom', 'Prénom', 'Secteur', 'Email'];
  const csv = [
    headers.join(','),
    ...leads.map(lead =>
      [lead.nom, lead.prenom, lead.secteur, lead.email]
        .map(field => `"${field || ''}"`)
        .join(',')
    )
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `trinity-leads-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showSuccess(`${leads.length} leads exportés`);
}

function showError(message) {
  statusBar.className = 'status-bar error';
  statusBar.textContent = '❌ ' + message;
}

function showSuccess(message) {
  statusBar.className = 'status-bar success';
  statusBar.textContent = '✅ ' + message;
}

function resetButtons() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  isScrapingActive = false;
}

// Charger les leads toutes les 5 secondes pendant l'interface
setInterval(loadLeads, 5000);
