const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const scraperManager = require('./scrapers');
const GuillaumeAI = require('./services/guillaume-ai');
const googleSheetsDB = require('./services/google-sheets-db');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Guillaume AI
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.warn('⚠️ ANTHROPIC_API_KEY not found in environment');
}
const guillaume = new GuillaumeAI(apiKey);

// Set app context for Guillaume
guillaume.setAppContext({ scraperManager });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes - avec Google Sheets
app.get('/api/dashboard', async (req, res) => {
  try {
    const leads = await googleSheetsDB.getLeads();
    const stats = await googleSheetsDB.getStats();
    res.json({
      totalLeads: leads.length,
      status: scraperManager.getStatus(),
      stats,
      source: 'Google Sheets'
    });
  } catch (error) {
    res.json({
      totalLeads: 0,
      status: scraperManager.getStatus(),
      error: error.message
    });
  }
});

app.post('/api/scrape', async (req, res) => {
  try {
    const { scraperType = 'directory' } = req.body;

    res.json({
      status: 'scraping',
      message: 'Le scraping a démarré...',
      leadsFound: 0
    });

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
  res.json({ status: 'stopped', message: 'Scraping arrêté' });
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await googleSheetsDB.getLeads();
    res.json(leads);
  } catch (error) {
    res.json([]);
  }
});

app.post('/api/leads/add', async (req, res) => {
  try {
    const lead = req.body;
    scraperManager.addLead(lead);
    await googleSheetsDB.addLead(lead);
    const leads = await googleSheetsDB.getLeads();
    res.json({
      status: 'success',
      message: 'Lead ajouté à Google Sheets',
      totalLeads: leads.length
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.post('/api/leads/sync', async (req, res) => {
  try {
    const leads = scraperManager.getLeads();
    await googleSheetsDB.syncLeads(leads);
    res.json({
      status: 'success',
      message: 'Synchronisation effectuée',
      totalLeads: leads.length
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.post('/api/leads/reset', async (req, res) => {
  try {
    scraperManager.reset();
    res.json({ status: 'success', message: 'Données réinitialisées' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json(scraperManager.getStatus());
});

// Guillaume AI Routes
app.post('/api/guillaume/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Guillaume AI not configured',
        message: 'ANTHROPIC_API_KEY is missing'
      });
    }

    const response = await guillaume.chat(message);
    res.json({ response, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Guillaume AI error:', error);
    res.status(500).json({
      error: 'Guillaume chat error',
      message: error.message
    });
  }
});

app.post('/api/guillaume/reset', (req, res) => {
  guillaume.resetHistory();
  res.json({ status: 'reset', message: 'Historique de conversation réinitialisé' });
});

app.get('/api/guillaume/status', (req, res) => {
  res.json({
    configured: !!apiKey,
    conversationLength: guillaume.conversationHistory.length
  });
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
