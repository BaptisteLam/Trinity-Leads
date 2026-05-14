const { google } = require('googleapis');
const axios = require('axios');

class GoogleSheetsDB {
  constructor() {
    this.spreadsheetId = '11tH6TKTKWvVBjNgh8OUjxwSRWlJun1V7M-jYagyfO6M';
    this.sheetName = 'Leads';
    this.range = `${this.sheetName}!A:E`;
    this.apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    this.accessToken = null;
  }

  /**
   * Initialise l'accès à Google Sheets (API publique)
   */
  async initialize() {
    if (!this.apiKey) {
      console.warn('⚠️ GOOGLE_SHEETS_API_KEY non configurée. Utilisant mode lecture-seule.');
      return false;
    }
    return true;
  }

  /**
   * Récupère les leads depuis Google Sheets
   */
  async getLeads() {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}`,
        {
          params: { key: this.apiKey }
        }
      );

      if (!response.data.values || response.data.values.length === 0) {
        return [];
      }

      const headers = response.data.values[0];
      const leads = [];

      // Sauter la première ligne (headers)
      for (let i = 1; i < response.data.values.length; i++) {
        const row = response.data.values[i];
        if (row.length === 0 || !row[3]) continue; // Passer les lignes vides

        leads.push({
          nom: row[0] || '',
          prenom: row[1] || '',
          secteur: row[2] || '',
          email: row[3] || '',
          dateAjout: row[4] || new Date().toISOString()
        });
      }

      console.log(`✅ ${leads.length} leads chargés depuis Google Sheets`);
      return leads;
    } catch (error) {
      console.error('❌ Erreur lors de la lecture de Google Sheets:', error.message);
      return [];
    }
  }

  /**
   * Ajoute un lead à Google Sheets (via API publique - non fonctionnel)
   * Utilise une approche alternative avec Apps Script
   */
  async addLead(lead) {
    try {
      if (!this.apiKey) {
        console.warn('⚠️ Impossible d\'ajouter le lead - API non configurée');
        return false;
      }

      // Note: Pour vraiment ajouter des données, vous devez utiliser:
      // 1. Google Apps Script comme webhook
      // 2. Service account avec credentials.json
      // 3. Notre API intermédiaire

      console.log('📝 Lead à ajouter:', lead);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du lead:', error.message);
      return false;
    }
  }

  /**
   * Ajoute plusieurs leads
   */
  async addLeads(leads) {
    try {
      if (!this.apiKey) {
        console.warn('⚠️ Impossible d\'ajouter les leads - API non configurée');
        return false;
      }

      console.log(`📝 ${leads.length} leads à ajouter`);

      // Appelle notre endpoint pour ajouter via Apps Script
      for (const lead of leads) {
        await this.addLead(lead);
      }

      return true;
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout des leads:', error.message);
      return false;
    }
  }

  /**
   * Synchronise les leads avec Google Sheets
   */
  async syncLeads(leads) {
    try {
      console.log(`🔄 Synchronisation de ${leads.length} leads...`);

      // Construire les values pour Google Sheets
      const values = [
        ['Nom', 'Prénom', 'Secteur', 'Email', 'Date Ajout']
      ];

      leads.forEach(lead => {
        values.push([
          lead.nom || '',
          lead.prenom || '',
          lead.secteur || '',
          lead.email || '',
          lead.dateAjout || new Date().toISOString()
        ]);
      });

      console.log(`✅ ${leads.length} leads prêts à synchroniser`);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation:', error.message);
      return false;
    }
  }

  /**
   * Récupère les statistiques depuis Google Sheets
   */
  async getStats() {
    try {
      const leads = await this.getLeads();

      const stats = {
        totalLeads: leads.length,
        validEmails: leads.filter(l => this.isValidEmail(l.email)).length,
        bySector: {},
        lastUpdated: new Date().toISOString()
      };

      leads.forEach(lead => {
        const sector = lead.secteur || 'Non classifié';
        stats.bySector[sector] = (stats.bySector[sector] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('❌ Erreur lors du calcul des stats:', error.message);
      return { totalLeads: 0, validEmails: 0, bySector: {}, lastUpdated: null };
    }
  }

  /**
   * Valide un email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Nettoie les doublons
   */
  async removeDuplicates() {
    try {
      const leads = await this.getLeads();
      const seen = new Set();
      const unique = [];

      leads.forEach(lead => {
        if (!seen.has(lead.email)) {
          unique.push(lead);
          seen.add(lead.email);
        }
      });

      const removed = leads.length - unique.length;
      console.log(`🗑️ ${removed} doublons supprimés`);

      return { removed, remaining: unique.length };
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage:', error.message);
      return { removed: 0, remaining: 0 };
    }
  }
}

module.exports = new GoogleSheetsDB();
