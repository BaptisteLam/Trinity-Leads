const scraperManager = require('./scrapers');
const GuillaumeAI = require('./services/guillaume-ai');
const googleSheetsDB = require('./services/google-sheets-db');

const apiKey = process.env.ANTHROPIC_API_KEY;
const guillaume = new GuillaumeAI(apiKey);

guillaume.setAppContext({ scraperManager });

export async function handleRequest(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // API Routes
    if (pathname === '/api/leads' && method === 'GET') {
      const leads = await googleSheetsDB.getLeads();
      return json({ leads }, corsHeaders);
    }

    if (pathname === '/api/leads/add' && method === 'POST') {
      const lead = await request.json();
      await googleSheetsDB.addLead(lead);
      const leads = await googleSheetsDB.getLeads();
      return json({ totalLeads: leads.length, leads }, corsHeaders);
    }

    if (pathname === '/api/dashboard' && method === 'GET') {
      const leads = await googleSheetsDB.getLeads();
      const stats = await googleSheetsDB.getStats();
      return json({ totalLeads: leads.length, status: scraperManager.getStatus(), stats }, corsHeaders);
    }

    if (pathname === '/api/guillaume/chat' && method === 'POST') {
      const { message } = await request.json();
      if (!message) {
        return json({ error: 'Message required' }, corsHeaders, 400);
      }
      const response = await guillaume.chat(message);
      const leads = await googleSheetsDB.getLeads();
      await googleSheetsDB.syncLeads(leads);
      return json({ response, timestamp: new Date().toISOString() }, corsHeaders);
    }

    if (pathname === '/api/scrape' && method === 'POST') {
      scraperManager.startScraper('directory');
      return json({ status: 'scraping', message: 'Scraping démarré' }, corsHeaders);
    }

    if (pathname === '/api/scrape/stop' && method === 'POST') {
      scraperManager.stopScraper();
      return json({ status: 'stopped' }, corsHeaders);
    }

    if (pathname === '/' || pathname === '/index.html') {
      return new Response(INDEX_HTML, { headers: { 'Content-Type': 'text/html', ...corsHeaders } });
    }

    return json({ error: 'Not found' }, corsHeaders, 404);
  } catch (error) {
    console.error(error);
    return json({ error: error.message }, corsHeaders, 500);
  }
}

function json(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers }
  });
}

const INDEX_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Trinity Leads</title>
  <style>body{font-family:sans-serif;text-align:center;padding:20px}h1{color:#667eea}</style>
</head>
<body>
  <h1>🎯 Trinity Leads Scraper</h1>
  <p>App déployée sur Cloudflare!</p>
  <button onclick="testAPI()">Test API</button>
  <script>
    async function testAPI() {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      alert('✅ ' + JSON.stringify(data, null, 2));
    }
  </script>
</body>
</html>`;
