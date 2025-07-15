import fs from 'fs/promises';
import path from 'path';
import { 
  AccountsConfig, 
  AccountsConfigSchema, 
  BotConfig, 
  BotConfigSchema,
  MedicalContent 
} from '../types/index.js';
import logger from '../utils/logger.js';

export class ConfigManager {
  private accountsPath: string;
  private botConfigPath: string;
  
  constructor(basePath: string = '.') {
    this.accountsPath = path.join(basePath, 'accounts.json');
    this.botConfigPath = path.join(basePath, 'bot_config.json');
  }
  
  async loadAccounts(): Promise<AccountsConfig | null> {
    try {
      const data = await fs.readFile(this.accountsPath, 'utf-8');
      const parsed = JSON.parse(data);
      const validated = AccountsConfigSchema.parse(parsed);
      logger.info(`Loaded ${validated.accounts.length} Reddit account(s)`);
      return validated;
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        logger.warn(`Accounts file not found: ${this.accountsPath}`);
      } else {
        logger.error('Error loading accounts:', error);
      }
      return null;
    }
  }
  
  async saveAccounts(config: AccountsConfig): Promise<void> {
    try {
      await fs.writeFile(
        this.accountsPath, 
        JSON.stringify(config, null, 2),
        'utf-8'
      );
      logger.success(`Saved ${config.accounts.length} account(s) to ${this.accountsPath}`);
    } catch (error) {
      logger.error('Error saving accounts:', error);
      throw error;
    }
  }
  
  async loadBotConfig(): Promise<BotConfig> {
    try {
      const data = await fs.readFile(this.botConfigPath, 'utf-8');
      const parsed = JSON.parse(data);
      const validated = BotConfigSchema.parse(parsed);
      logger.info('Loaded bot configuration');
      return validated;
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        logger.info('Bot config file not found, using defaults');
      } else {
        logger.warn('Error loading bot config, using defaults:', error);
      }
      return BotConfigSchema.parse({});
    }
  }
  
  async saveBotConfig(config: BotConfig): Promise<void> {
    try {
      await fs.writeFile(
        this.botConfigPath,
        JSON.stringify(config, null, 2),
        'utf-8'
      );
      logger.success(`Saved bot configuration to ${this.botConfigPath}`);
    } catch (error) {
      logger.error('Error saving bot config:', error);
      throw error;
    }
  }
  
  getMedicalContent(): MedicalContent {
    return {
      thetis_splint: `
    Thetis Medical Achilles Rupture Splint (https://thetismedical.com/splint):
    - The only splint specifically designed for Achilles tendon rupture
    - Comfortable alternative to sleeping in a walking boot
    - Lightweight and breathable design for better sleep quality
    - Surgeon-approved for night-time protection
    - Maintains proper foot position (plantar flexion) during healing
    - 3000+ patients with no complications
    - Available in Small and Large sizes (EU <42/≥42, UK <8/≥8, US Men <9/≥9, US Women <10.5/≥10.5)
    - Made in the UK with free shipping
    - Perfect for night-time use and rest periods
    - DO NOT walk or stand in this splint
    - Wait 2 weeks post-surgery before use (consult your surgeon)
    - Easy to put on and remove with adjustable straps
    - Ventilated design keeps foot comfortable and cool
    `,
      
      achilles_recovery: `
    Achilles Rupture Recovery Information (https://achilles-rupture.com):
    - Understanding the recovery timeline and process
    - Physical therapy exercises for rehabilitation
    - Prevention of re-rupture through proper care
    - Walking recovery after surgery
    - Evidence-based recovery protocols
    - Global treatment trends and outcomes
    - The science behind tendon healing
    - Rehabilitation and return-to-sport guidelines
    - 7 Best Physical Therapy Exercises for Achilles Rupture Recovery
    - How to walk again after Achilles rupture surgery
    - How to Prevent Achilles Tendon Re-Rupture
    - Rehabilitation & Return-to-Sport After Achilles Tendon Repair
    - Evidence-Based Achilles Rupture Recovery
    - The Science of Achilles Tendon Healing
    - Global Trends in Achilles Rupture Treatment
    - Blood Thinners After Achilles Rupture Recovery
    - Six Essential Items to Make Achilles Rupture Recovery Easier
    - Five Small Purchases to Make Achilles Rupture Recovery Easier
    `,
      
      faqs: `
    Frequently Asked Questions about Achilles Rupture (https://thetismedical.com/faqs):
    - When to use the splint: Perfect for night-time and rest periods
    - Proper sizing and fitting instructions: Point toes, place shell on leg, fasten straps firmly but not too tight
    - Safety guidelines: DO NOT walk or stand in splint, DO NOT overtighten straps
    - Recovery timeline and milestones: Evidence-based recovery protocols
    - Treatment options: Surgery vs non-surgical treatment options
    - Prevention strategies: How to prevent re-rupture through proper rehabilitation
    - Sleep quality: Better sleep compared to wearing walking boot
    - Comfort: Lightweight alternative to heavy boot for night-time use
    - Medical approval: Trusted by medical professionals and surgeons
    - Patient testimonials: 184+ reviews from satisfied patients worldwide
    `
    };
  }
}