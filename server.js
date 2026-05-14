const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const scraperManager = require('./scrapers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/dashboard', (req, res) => {
  const leads = scraperManager.getLeads();
  res.json({
    totalLeads: leads.length,
    status: scraperManager.getStatus(),
    leads: leads
  });
});

app.post('/api/scrape', async (req, res) => {
  try {
    const { scraperType = 'directory' } = req.body;

    res.json({
      status: 'scraping',
      message: 'Le scraping a démarré...',
      leadsFound: 0
    });

    // Le scraping continue en arrière-plan
    scraperProcess(scraperType);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.post('/api/scrape/stop', (req, res) => {
  scraperManager.stopScraper();
  res.json({
    status: 'stopped',
    message: 'Scraping arrêté'
  });
});

app.get('/api/leads', (req, res) => {
  const leads = scraperManager.getLeads();
  res.json(leads);
});

app.post('/api/leads/add', (req, res) => {
  try {
    const lead = req.body;
    scraperManager.addLead(lead);
    res.json({
      status: 'success',
      message: 'Lead ajouté',
      totalLeads: scraperManager.getLeads().length
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

app.post('/api/leads/reset', (req, res) => {
  scraperManager.reset();
  res.json({
    status: 'success',
    message: 'Tous les leads ont été supprimés'
  });
});

app.get('/api/status', (req, res) => {
  res.json(scraperManager.getStatus());
});

// Processus de scraping asynchrone
async function scraperProcess(scraperType) {
  try {
    console.log(`🚀 Démarrage du scraper: ${scraperType}`);
    await scraperManager.startScraper(scraperType);
    console.log('✅ Scraping terminé');
  } catch (error) {
    console.error('❌ Erreur lors du scraping:', error);
  }
}

app.listen(PORT, () => {
  console.log(`\n🎯 Trinity Leads Scraper running on http://localhost:${PORT}`);
  console.log(`📊 Interface: http://localhost:${PORT}`);
  console.log(`\nDémarrage du serveur...`);
});
