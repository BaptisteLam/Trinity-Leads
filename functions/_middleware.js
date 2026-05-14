// Version Cloudflare Pages - Compatible
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Assets statiques
  if (pathname === '/' || pathname.endsWith('.html') || pathname.endsWith('.css') || pathname.endsWith('.js')) {
    return context.env.ASSETS.fetch(request);
  }

  // API simple
  if (pathname.startsWith('/api/')) {
    return handleAPI(request, context.env);
  }

  return new Response('Not found', { status: 404 });
}

async function handleAPI(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (pathname === '/api/leads' && request.method === 'GET') {
      // Lire depuis KV store
      const leads = await env.LEADS_KV.get('leads');
      const data = leads ? JSON.parse(leads) : [];
      return json(data, corsHeaders);
    }

    if (pathname === '/api/leads/add' && request.method === 'POST') {
      const lead = await request.json();
      const leads = await env.LEADS_KV.get('leads');
      const data = leads ? JSON.parse(leads) : [];
      data.push({ ...lead, dateAjout: new Date().toISOString() });
      await env.LEADS_KV.put('leads', JSON.stringify(data));
      return json({ status: 'success', total: data.length }, corsHeaders);
    }

    if (pathname === '/api/dashboard' && request.method === 'GET') {
      const leads = await env.LEADS_KV.get('leads');
      const data = leads ? JSON.parse(leads) : [];
      return json({
        totalLeads: data.length,
        status: 'ready',
        lastUpdate: new Date().toISOString()
      }, corsHeaders);
    }

    if (pathname === '/api/guillaume/chat' && request.method === 'POST') {
      const { message } = await request.json();

      // Appel Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-opus-4-7',
          max_tokens: 1024,
          messages: [{ role: 'user', content: message }]
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Erreur';

      return json({ response: reply }, corsHeaders);
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
