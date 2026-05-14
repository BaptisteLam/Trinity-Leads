const axios = require('axios');
const cheerio = require('cheerio');

class BaseScraper {
  constructor() {
    this.leads = [];
    this.isActive = false;
  }

  /**
   * Structure un lead avec les données requises
   */
  structureLead(data) {
    return {
      nom: data.nom || '',
      prenom: data.prenom || '',
      secteur: data.secteur || '',
      email: data.email || '',
      source: data.source || 'unknown',
      dateAjout: new Date().toISOString()
    };
  }

  /**
   * Valide un email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Extrait le nom et prénom d'une chaîne
   */
  extractNames(fullName) {
    if (!fullName) return { nom: '', prenom: '' };

    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) return { nom: '', prenom: '' };
    if (parts.length === 1) return { nom: parts[0], prenom: '' };

    return {
      prenom: parts[0],
      nom: parts.slice(1).join(' ')
    };
  }

  /**
   * Récupère le contenu HTML d'une page
   */
  async fetchPage(url, headers = {}) {
    try {
      const defaultHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      };

      const response = await axios.get(url, {
        headers: { ...defaultHeaders, ...headers },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Parse HTML avec Cheerio
   */
  parseHTML(html) {
    return cheerio.load(html);
  }

  /**
   * Ajoute un lead unique
   */
  addLead(lead) {
    // Vérifier si le lead existe déjà (par email)
    const exists = this.leads.some(l => l.email === lead.email && lead.email !== '');
    if (!exists) {
      this.leads.push(this.structureLead(lead));
    }
  }

  /**
   * Démarre le scraping (à implémenter dans les sous-classes)
   */
  async start() {
    throw new Error('start() doit être implémenté dans la sous-classe');
  }

  /**
   * Arrête le scraping
   */
  stop() {
    this.isActive = false;
  }

  /**
   * Retourne les leads trouvés
   */
  getLeads() {
    return this.leads;
  }

  /**
   * Réinitialise les leads
   */
  reset() {
    this.leads = [];
  }
}

module.exports = BaseScraper;
