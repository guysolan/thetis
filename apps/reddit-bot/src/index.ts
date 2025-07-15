#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { ConfigManager } from './config/index.js';
import { RedditService } from './services/reddit.js';
import { AIAnalyzer } from './services/ai-analyzer.js';
import { BotMonitor } from './services/bot-monitor.js';
import { AccountsConfig, RedditAccountSchema } from './types/index.js';
import logger from './utils/logger.js';

const program = new Command();

program
  .name('reddit-bot')
  .description('Automated Reddit monitoring and response bot')
  .version('1.0.0');

// Monitor command
program
  .command('monitor')
  .description('Start monitoring a subreddit')
  .option('-s, --subreddit <name>', 'Subreddit to monitor', 'AskReddit')
  .option('-t, --test', 'Run in test mode (simulate replies)', true)
  .option('-i, --interval <minutes>', 'Check interval in minutes', '2')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      
      // Load configurations
      const accountsConfig = await configManager.loadAccounts();
      if (!accountsConfig || accountsConfig.accounts.length === 0) {
        logger.error('No Reddit accounts found. Please add accounts first using "reddit-bot account add"');
        process.exit(1);
      }
      
      const botConfig = await configManager.loadBotConfig();
      
      // Override config with command options
      botConfig.subreddit = options.subreddit;
      botConfig.test_mode = options.test;
      botConfig.check_interval_minutes = parseInt(options.interval);
      
      // Initialize services
      logger.info('Initializing Reddit Bot...');
      const redditService = new RedditService(accountsConfig);
      
      // Use the first account's API key for AI
      const apiKey = accountsConfig.accounts[0].api_key;
      const medicalContent = configManager.getMedicalContent();
      const aiAnalyzer = new AIAnalyzer(apiKey, medicalContent);
      
      // Create and initialize bot monitor
      const botMonitor = new BotMonitor(botConfig, redditService, aiAnalyzer);
      await botMonitor.initialize();
      
      // Log startup info
      logger.info(chalk.green('Reddit Bot Started'));
      logger.info(`Mode: ${botConfig.test_mode ? chalk.yellow('TEST MODE') : chalk.red('LIVE MODE')}`);
      logger.info(`Subreddit: r/${botConfig.subreddit}`);
      logger.info(`Check Interval: ${botConfig.check_interval_minutes} minutes`);
      logger.info(`Active Accounts: ${redditService.getActiveAccountCount()}`);
      logger.info(`Rate Limit: ${botConfig.rate_limit_hours} hours between replies`);
      
      const rateLimitStatus = botMonitor.getRateLimitStatus();
      if (rateLimitStatus.isLimited) {
        logger.warn(`Rate Limited: Next reply allowed ${rateLimitStatus.timeRemaining}`);
      } else {
        logger.success('Rate Limit: Ready to reply');
      }
      
      // Handle graceful shutdown
      process.on('SIGINT', () => {
        logger.info('\nReceived SIGINT, shutting down gracefully...');
        botMonitor.stopMonitoring();
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        logger.info('\nReceived SIGTERM, shutting down gracefully...');
        botMonitor.stopMonitoring();
        process.exit(0);
      });
      
      // Start monitoring
      await botMonitor.startMonitoring(botConfig.subreddit);
      
    } catch (error) {
      logger.error('Failed to start monitoring:', error);
      process.exit(1);
    }
  });

// Account management commands
const account = program.command('account').description('Manage Reddit accounts');

account
  .command('add')
  .description('Add a new Reddit account')
  .requiredOption('-c, --client-id <id>', 'Reddit app client ID')
  .requiredOption('-s, --client-secret <secret>', 'Reddit app client secret')
  .requiredOption('-u, --username <username>', 'Reddit username')
  .requiredOption('-p, --password <password>', 'Reddit password')
  .requiredOption('-k, --api-key <key>', 'Google Gemini API key')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      
      // Validate account data
      const newAccount = RedditAccountSchema.parse({
        client_id: options.clientId,
        client_secret: options.clientSecret,
        username: options.username,
        password: options.password,
        api_key: options.apiKey
      });
      
      // Load existing accounts
      let accountsConfig = await configManager.loadAccounts();
      if (!accountsConfig) {
        accountsConfig = {
          version: '1.0',
          description: 'Reddit Bot Multiple Accounts Configuration',
          accounts: []
        };
      }
      
      // Check if account already exists
      if (accountsConfig.accounts.some(acc => acc.username === newAccount.username)) {
        logger.error(`Account ${newAccount.username} already exists`);
        process.exit(1);
      }
      
      // Test the account
      logger.info(`Testing account ${newAccount.username}...`);
      const redditService = new RedditService({ ...accountsConfig, accounts: [newAccount] });
      
      // Add to accounts
      accountsConfig.accounts.push(newAccount);
      await configManager.saveAccounts(accountsConfig);
      
      logger.success(`Account ${newAccount.username} added successfully!`);
      
    } catch (error) {
      logger.error('Failed to add account:', error);
      process.exit(1);
    }
  });

account
  .command('list')
  .description('List all Reddit accounts')
  .action(async () => {
    try {
      const configManager = new ConfigManager();
      const accountsConfig = await configManager.loadAccounts();
      
      if (!accountsConfig || accountsConfig.accounts.length === 0) {
        logger.info('No Reddit accounts configured');
        return;
      }
      
      console.log(chalk.blue('\nConfigured Reddit Accounts:'));
      console.log(chalk.gray('─'.repeat(50)));
      
      accountsConfig.accounts.forEach((account, index) => {
        console.log(`${index + 1}. ${chalk.green(account.username)}`);
        console.log(`   Client ID: ${account.client_id.substring(0, 10)}...`);
        console.log(`   API Key: ${account.api_key ? '✓ Configured' : '✗ Missing'}`);
      });
      
      console.log(chalk.gray('─'.repeat(50)));
      console.log(`Total: ${accountsConfig.accounts.length} account(s)\n`);
      
    } catch (error) {
      logger.error('Failed to list accounts:', error);
      process.exit(1);
    }
  });

account
  .command('remove')
  .description('Remove a Reddit account')
  .argument('<username>', 'Username of the account to remove')
  .action(async (username) => {
    try {
      const configManager = new ConfigManager();
      const accountsConfig = await configManager.loadAccounts();
      
      if (!accountsConfig) {
        logger.error('No accounts configured');
        process.exit(1);
      }
      
      const index = accountsConfig.accounts.findIndex(acc => acc.username === username);
      if (index === -1) {
        logger.error(`Account ${username} not found`);
        process.exit(1);
      }
      
      if (accountsConfig.accounts.length === 1) {
        logger.error('Cannot remove the last account');
        process.exit(1);
      }
      
      accountsConfig.accounts.splice(index, 1);
      await configManager.saveAccounts(accountsConfig);
      
      logger.success(`Account ${username} removed successfully`);
      
    } catch (error) {
      logger.error('Failed to remove account:', error);
      process.exit(1);
    }
  });

// Config command
program
  .command('config')
  .description('View or modify bot configuration')
  .option('-v, --view', 'View current configuration')
  .option('-s, --set <key=value>', 'Set a configuration value')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      const config = await configManager.loadBotConfig();
      
      if (options.view) {
        console.log(chalk.blue('\nBot Configuration:'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(JSON.stringify(config, null, 2));
        console.log(chalk.gray('─'.repeat(50)));
        return;
      }
      
      if (options.set) {
        const [key, value] = options.set.split('=');
        if (!key || !value) {
          logger.error('Invalid format. Use key=value');
          process.exit(1);
        }
        
        // Update config
        (config as any)[key] = isNaN(Number(value)) ? value : Number(value);
        await configManager.saveBotConfig(config);
        logger.success(`Configuration updated: ${key} = ${value}`);
      }
      
    } catch (error) {
      logger.error('Failed to manage configuration:', error);
      process.exit(1);
    }
  });

// Cron job command for scheduled monitoring
program
  .command('schedule')
  .description('Run bot on a schedule (for use with cron or task scheduler)')
  .option('-s, --subreddit <name>', 'Subreddit to monitor', 'AskReddit')
  .option('-d, --duration <minutes>', 'Duration to run in minutes', '5')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      
      // Load configurations
      const accountsConfig = await configManager.loadAccounts();
      if (!accountsConfig || accountsConfig.accounts.length === 0) {
        logger.error('No Reddit accounts found');
        process.exit(1);
      }
      
      const botConfig = await configManager.loadBotConfig();
      botConfig.subreddit = options.subreddit;
      
      // Initialize services
      const redditService = new RedditService(accountsConfig);
      const apiKey = accountsConfig.accounts[0].api_key;
      const medicalContent = configManager.getMedicalContent();
      const aiAnalyzer = new AIAnalyzer(apiKey, medicalContent);
      
      // Create bot monitor
      const botMonitor = new BotMonitor(botConfig, redditService, aiAnalyzer);
      await botMonitor.initialize();
      
      logger.info(`Starting scheduled monitoring for ${options.duration} minutes...`);
      
      // Start monitoring
      const monitorPromise = botMonitor.startMonitoring(botConfig.subreddit);
      
      // Stop after duration
      setTimeout(() => {
        logger.info('Scheduled duration reached, stopping...');
        botMonitor.stopMonitoring();
      }, parseInt(options.duration) * 60 * 1000);
      
      await monitorPromise;
      process.exit(0);
      
    } catch (error) {
      logger.error('Failed to run scheduled monitoring:', error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);