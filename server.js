const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const scraperManager = require('./scrapers');
const GuillaumeAI = require('./services/guillaume-ai');

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
