const Anthropic = require('@anthropic-ai/sdk');
const validator = require('validator');

class GuillaumeAI {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
    this.model = 'claude-opus-4-7';
    this.conversationHistory = [];
    this.appContext = null;
  }

  setAppContext(context) {
    this.appContext = context;
  }

  /**
   * Crée les outils disponibles pour Claude
   */
  getTools() {
    return [
      {
        name: 'analyze_leads',
        description: 'Analyser les leads collectés pour identifier des patterns et tendances',
        input_schema: {
          type: 'object',
          properties: {
            analysis_type: {
              type: 'string',
              enum: ['sectors', 'quality', 'duplicates', 'all'],
              description: 'Type d\'analyse à effectuer'
            }
          },
          required: ['analysis_type']
        }
      },
      {
        name: 'validate_emails',
        description: 'Valider et nettoyer les emails des leads',
        input_schema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['validate', 'remove_invalid', 'check_format'],
              description: 'Action à effectuer'
            }
          },
          required: ['action']
        }
      },
      {
        name: 'classify_leads',
        description: 'Classifier les leads par secteur, taille d\'entreprise, etc.',
        input_schema: {
          type: 'object',
          properties: {
            criteria: {
              type: 'string',
              enum: ['sector', 'company_size', 'job_title', 'all'],
              description: 'Critère de classification'
            }
          },
          required: ['criteria']
        }
      },
      {
        name: 'generate_insights',
        description: 'Générer des insights et statistiques sur les leads',
        input_schema: {
          type: 'object',
          properties: {
            insight_type: {
              type: 'string',
              enum: ['stats', 'trends', 'recommendations', 'quality_report'],
              description: 'Type d\'insight à générer'
            }
          },
          required: ['insight_type']
        }
      },
      {
        name: 'enrich_leads',
        description: 'Enrichir les données des leads avec des informations supplémentaires',
        input_schema: {
          type: 'object',
          properties: {
            field: {
              type: 'string',
              enum: ['company_name', 'phone', 'company_size', 'website'],
              description: 'Champ à enrichir'
            }
          },
          required: ['field']
        }
      },
      {
        name: 'start_scraping',
        description: 'Lancer le processus de scraping',
        input_schema: {
          type: 'object',
          properties: {
            scraper_type: {
              type: 'string',
              default: 'directory',
              description: 'Type de scraper à utiliser'
            }
          }
        }
      },
      {
        name: 'stop_scraping',
        description: 'Arrêter le processus de scraping en cours',
        input_schema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_leads_data',
        description: 'Récupérer les leads actuels pour analyse',
        input_schema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Nombre maximum de leads à retourner'
            }
          }
        }
      }
    ];
  }

  /**
   * Exécute un outil
   */
  async executeTool(toolName, toolInput) {
    switch (toolName) {
      case 'analyze_leads':
        return this.analyzeLeads(toolInput.analysis_type);
      case 'validate_emails':
        return this.validateEmails(toolInput.action);
      case 'classify_leads':
        return this.classifyLeads(toolInput.criteria);
      case 'generate_insights':
        return this.generateInsights(toolInput.insight_type);
      case 'enrich_leads':
        return this.enrichLeads(toolInput.field);
      case 'start_scraping':
        return this.startScraping(toolInput.scraper_type);
      case 'stop_scraping':
        return this.stopScraping();
      case 'get_leads_data':
        return this.getLeadsData(toolInput.limit);
      default:
        return { error: `Outil inconnu: ${toolName}` };
    }
  }

  /**
   * Analyse les leads
   */
  analyzeLeads(type) {
    const leads = this.appContext.scraperManager.getLeads();
    const analysis = {};

    if (type === 'sectors' || type === 'all') {
      const sectors = {};
      leads.forEach(lead => {
        sectors[lead.secteur] = (sectors[lead.secteur] || 0) + 1;
      });
      analysis.sectors = sectors;
    }

    if (type === 'quality' || type === 'all') {
      const validEmails = leads.filter(l => validator.isEmail(l.email)).length;
      analysis.quality = {
        total: leads.length,
        validEmails,
        invalidEmails: leads.length - validEmails,
        completeness: leads.filter(l => l.nom && l.prenom && l.email).length
      };
    }

    if (type === 'duplicates' || type === 'all') {
      const emailSet = new Set();
      const duplicates = [];
      leads.forEach(lead => {
        if (emailSet.has(lead.email)) {
          duplicates.push(lead.email);
        }
        emailSet.add(lead.email);
      });
      analysis.duplicates = duplicates;
    }

    return analysis;
  }

  /**
   * Valide les emails
   */
  validateEmails(action) {
    const leads = this.appContext.scraperManager.getLeads();
    const results = {};

    if (action === 'validate' || action === 'check_format') {
      results.validation = leads.map(lead => ({
        email: lead.email,
        valid: validator.isEmail(lead.email),
        domain: lead.email.split('@')[1] || 'invalid'
      }));
    }

    if (action === 'remove_invalid') {
      const validLeads = leads.filter(l => validator.isEmail(l.email));
      results.removed = leads.length - validLeads.length;
      results.remaining = validLeads.length;
    }

    return results;
  }

  /**
   * Classifie les leads
   */
  classifyLeads(criteria) {
    const leads = this.appContext.scraperManager.getLeads();
    const classification = {};

    if (criteria === 'sector' || criteria === 'all') {
      classification.bySector = {};
      leads.forEach(lead => {
        const sector = lead.secteur || 'Non classifié';
        classification.bySector[sector] = (classification.bySector[sector] || 0) + 1;
      });
    }

    if (criteria === 'company_size' || criteria === 'all') {
      // Exemple de classification basée sur pattern du domaine email
      classification.byCompanySize = {
        'enterprise': leads.filter(l => l.email.includes('.com') || l.email.includes('.fr')).length,
        'sme': leads.filter(l => l.email.includes('pme') || l.email.includes('tpe')).length,
        'startup': leads.filter(l => l.email.includes('startup') || l.email.includes('tech')).length
      };
    }

    if (criteria === 'job_title' || criteria === 'all') {
      classification.byJobTitle = {
        'PDG': leads.filter(l => l.secteur && l.secteur.toLowerCase().includes('directeur')).length,
        'DG': leads.filter(l => l.secteur && l.secteur.toLowerCase().includes('général')).length
      };
    }

    return classification;
  }

  /**
   * Génère des insights
   */
  generateInsights(type) {
    const leads = this.appContext.scraperManager.getLeads();
    const insights = {};

    if (type === 'stats' || type === 'all') {
      insights.stats = {
        totalLeads: leads.length,
        uniqueEmails: new Set(leads.map(l => l.email)).size,
        uniqueSectors: new Set(leads.map(l => l.secteur)).size,
        averageCompleteness: (leads.filter(l => l.nom && l.prenom && l.email && l.secteur).length / leads.length * 100).toFixed(2) + '%'
      };
    }

    if (type === 'trends' || type === 'all') {
      const sectorTrends = {};
      leads.forEach(lead => {
        sectorTrends[lead.secteur] = (sectorTrends[lead.secteur] || 0) + 1;
      });
      const topSectors = Object.entries(sectorTrends)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      insights.trends = { topSectors: Object.fromEntries(topSectors) };
    }

    if (type === 'recommendations' || type === 'all') {
      const invalidEmails = leads.filter(l => !validator.isEmail(l.email)).length;
      const incompleteLeads = leads.filter(l => !l.nom || !l.prenom).length;

      insights.recommendations = [];
      if (invalidEmails > 0) {
        insights.recommendations.push(`⚠️ ${invalidEmails} emails invalides à nettoyer`);
      }
      if (incompleteLeads > 0) {
        insights.recommendations.push(`ℹ️ ${incompleteLeads} leads incomplets`);
      }
      if (leads.length < 100) {
        insights.recommendations.push(`🔍 Continuer le scraping pour atteindre 100+ leads`);
      }
      insights.recommendations.push(`✅ Exporter et valider les données`);
    }

    if (type === 'quality_report' || type === 'all') {
      const validEmails = leads.filter(l => validator.isEmail(l.email)).length;
      const complete = leads.filter(l => l.nom && l.prenom && l.email && l.secteur).length;

      insights.qualityReport = {
        score: ((validEmails / leads.length) * 100).toFixed(1) + '%',
        validEmails,
        completeLeads: complete,
        issuesFound: leads.length - validEmails,
        status: validEmails / leads.length > 0.9 ? '✅ Excellent' : '⚠️ À améliorer'
      };
    }

    return insights;
  }

  /**
   * Enrichit les données des leads
   */
  enrichLeads(field) {
    const leads = this.appContext.scraperManager.getLeads();
    const enriched = {
      field,
      processed: 0,
      suggestions: []
    };

    leads.forEach(lead => {
      if (field === 'company_name' && !lead.companyName) {
        const domain = lead.email.split('@')[1];
        if (domain) {
          lead.companyName = domain.split('.')[0];
          enriched.processed++;
        }
      }
    });

    enriched.suggestions = [
      'Les données ont été enrichies automatiquement',
      `${enriched.processed} leads ont reçu des informations supplémentaires`
    ];

    return enriched;
  }

  /**
   * Lance le scraping
   */
  startScraping(scraperType = 'directory') {
    this.appContext.scraperManager.startScraper(scraperType);
    return { status: 'scraping_started', scraperType };
  }

  /**
   * Arrête le scraping
   */
  stopScraping() {
    this.appContext.scraperManager.stopScraper();
    return { status: 'scraping_stopped' };
  }

  /**
   * Récupère les données des leads
   */
  getLeadsData(limit = 50) {
    const leads = this.appContext.scraperManager.getLeads();
    return {
      total: leads.length,
      returned: Math.min(limit, leads.length),
      leads: leads.slice(0, limit)
    };
  }

  /**
   * Sauvegarde les leads dans Google Sheets après une action
   */
  async saveToGoogleSheets() {
    try {
      const googleSheetsDB = require('./google-sheets-db');
      const leads = this.appContext.scraperManager.getLeads();
      if (leads.length > 0) {
        await googleSheetsDB.syncLeads(leads);
      }
    } catch (error) {
      console.error('Erreur sauvegarde Google Sheets:', error.message);
    }
  }

  /**
   * Envoie un message à Claude avec support des outils
   */
  async chat(userMessage) {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    let response = await this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: `Tu es Guillaume, un assistant IA spécialisé dans l'analyse et la gestion des leads pour Trinity Leads Scraper.
Tu as accès à tous les données et outils de l'application. Tu peux:
- Analyser les leads scrapés
- Valider et nettoyer les emails
- Classifier les leads
- Générer des insights et statistiques
- Enrichir les données
- Contrôler le processus de scraping

Sois proactif, donne des recommandations utiles et aide l'utilisateur à optimiser la qualité des leads.
Réponds toujours en français avec des emojis pour plus de clarté.`,
      tools: this.getTools(),
      messages: this.conversationHistory
    });

    while (response.stop_reason === 'tool_use') {
      const assistantMessage = {
        role: 'assistant',
        content: response.content
      };
      this.conversationHistory.push(assistantMessage);

      const toolResults = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const result = await this.executeTool(block.name, block.input);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result)
          });
        }
      }

      const userMessage = { role: 'user', content: toolResults };
      this.conversationHistory.push(userMessage);

      response = await this.client.messages.create({
        model: this.model,
        max_tokens: 4096,
        system: `Tu es Guillaume, un assistant IA spécialisé dans l'analyse et la gestion des leads pour Trinity Leads Scraper.
Tu as accès à tous les données et outils de l'application. Sois proactif et donne des recommandations utiles.
Réponds toujours en français avec des emojis.`,
        tools: this.getTools(),
        messages: this.conversationHistory
      });
    }

    const finalMessage = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    this.conversationHistory.push({
      role: 'assistant',
      content: finalMessage
    });

    // Sauvegarder dans Google Sheets après les actions
    await this.saveToGoogleSheets();

    return finalMessage;
  }

  /**
   * Réinitialise l'historique de conversation
   */
  resetHistory() {
    this.conversationHistory = [];
  }
}

module.exports = GuillaumeAI;
