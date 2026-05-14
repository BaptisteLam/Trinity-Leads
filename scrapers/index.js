const BaseScraper = require('./base-scraper');
const DirectoryScraper = require('./directory-scraper');

class ScraperManager {
  constructor() {
    this.scrapers = {
      directory: new DirectoryScraper()
    };
    this.allLeads = [];
    this.activeScraper = null;
  }

  /**
   * Lance un scraper spécifique
   */
  async startScraper(scraperName = 'directory') {
    if (this.activeScraper) {
      console.warn('⚠️ Un scraper est déjà en cours');
      return;
    }

    const scraper = this.scrapers[scraperName];
    if (!scraper) {
      throw new Error(`Scraper '${scraperName}' non trouvé`);
    }

    this.activeScraper = scraper;
    this.allLeads = [];

    try {
      await scraper.start();
      this.allLeads = scraper.getLeads();
      console.log(`📊 Total: ${this.allLeads.length} leads collectés`);
    } finally {
      this.activeScraper = null;
    }

    return this.allLeads;
  }

  /**
   * Arrête le scraper actif
   */
  stopScraper() {
    if (this.activeScraper) {
      this.activeScraper.stop();
      this.activeScraper = null;
    }
  }

  /**
   * Retourne tous les leads
   */
  getLeads() {
    return this.allLeads;
  }

  /**
   * Ajoute un lead manuellement
   */
  addLead(lead) {
    if (this.activeScraper) {
      this.activeScraper.addLead(lead);
    } else {
      this.allLeads.push(lead);
    }
  }

  /**
   * Réinitialise les leads
   */
  reset() {
    this.allLeads = [];
    Object.values(this.scrapers).forEach(scraper => scraper.reset());
  }

  /**
   * Retourne le statut du scraping
   */
  getStatus() {
    return {
      isActive: !!this.activeScraper,
      totalLeads: this.allLeads.length,
      activeScraper: this.activeScraper ? 'directory' : null
    };
  }
}

module.exports = new ScraperManager();
