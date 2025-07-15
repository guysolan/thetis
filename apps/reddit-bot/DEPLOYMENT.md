# Reddit Bot Deployment Guide

This guide covers how to deploy and run the Reddit bot in various environments.

## Local Development Setup

### Prerequisites

1. Install [Bun](https://bun.sh/) (required for this monorepo):
```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install dependencies from the workspace root:
```bash
cd /path/to/thetis
bun install
```

3. Navigate to the Reddit bot directory:
```bash
cd apps/reddit-bot
```

### Configuration

1. Copy the example accounts file:
```bash
cp accounts.example.json accounts.json
```

2. Edit `accounts.json` with your credentials:
```json
{
  "accounts": [{
    "client_id": "YOUR_REDDIT_CLIENT_ID",
    "client_secret": "YOUR_REDDIT_CLIENT_SECRET",
    "username": "YOUR_REDDIT_USERNAME",
    "password": "YOUR_REDDIT_PASSWORD",
    "api_key": "YOUR_GEMINI_API_KEY"
  }]
}
```

### Running the Bot

From the `apps/reddit-bot` directory:

```bash
# Development mode (with auto-reload)
bun run dev

# Production mode
bun run start -- monitor --subreddit AskReddit

# Test mode (default, simulates replies)
bun run start -- monitor --subreddit AskReddit --test

# Live mode (actually posts to Reddit)
bun run start -- monitor --subreddit AskReddit --no-test
```

## Production Deployment

### Option 1: VPS/Cloud Server

1. **Install Node.js 18+** on your server
2. **Install Bun**:
```bash
curl -fsSL https://bun.sh/install | bash
```

3. **Clone the repository**:
```bash
git clone https://github.com/yourusername/thetis.git
cd thetis
```

4. **Install dependencies**:
```bash
bun install
```

5. **Configure the bot**:
```bash
cd apps/reddit-bot
cp accounts.example.json accounts.json
# Edit accounts.json with your credentials
```

6. **Run with PM2**:
```bash
# Install PM2
npm install -g pm2

# Start the bot
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'reddit-bot',
    script: 'bun',
    args: 'run start -- monitor --subreddit AskReddit --no-test',
    cwd: '/path/to/thetis/apps/reddit-bot',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### Option 2: Docker Deployment

Create a `Dockerfile` in the project root:

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY apps/reddit-bot/package.json ./apps/reddit-bot/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
WORKDIR /app/apps/reddit-bot
RUN bun run build

# Runtime stage
FROM oven/bun:1-slim
WORKDIR /app

# Copy built application
COPY --from=base /app/apps/reddit-bot/dist ./dist
COPY --from=base /app/apps/reddit-bot/package.json ./
COPY --from=base /app/node_modules ./node_modules

# Create volume for config and logs
VOLUME ["/app/config", "/app/logs"]

# Set environment
ENV NODE_ENV=production

# Run the bot
CMD ["bun", "run", "dist/index.js", "monitor"]
```

Build and run:
```bash
# Build the image
docker build -t reddit-bot .

# Run the container
docker run -d \
  --name reddit-bot \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  reddit-bot
```

### Option 3: Systemd Service (Linux)

Create `/etc/systemd/system/reddit-bot.service`:

```ini
[Unit]
Description=Reddit Bot
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/thetis/apps/reddit-bot
ExecStart=/home/youruser/.bun/bin/bun run start -- monitor --subreddit AskReddit --no-test
Restart=on-failure
RestartSec=10

# Logging
StandardOutput=append:/var/log/reddit-bot/output.log
StandardError=append:/var/log/reddit-bot/error.log

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable reddit-bot
sudo systemctl start reddit-bot
sudo systemctl status reddit-bot
```

## Environment Variables

For production, use environment variables instead of storing credentials in files:

```bash
# .env file
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_username
REDDIT_PASSWORD=your_password
GEMINI_API_KEY=your_api_key
```

Update the code to read from environment variables:
```typescript
// In src/config/index.ts
const account = {
  client_id: process.env.REDDIT_CLIENT_ID || account.client_id,
  client_secret: process.env.REDDIT_CLIENT_SECRET || account.client_secret,
  username: process.env.REDDIT_USERNAME || account.username,
  password: process.env.REDDIT_PASSWORD || account.password,
  api_key: process.env.GEMINI_API_KEY || account.api_key
};
```

## Monitoring and Maintenance

### Logs

Monitor the following log files:
- `error.log` - Application errors
- `combined.log` - All logs
- `ai_analysis_log.txt` - AI decision details
- `monitored_posts.txt` - Processed posts
- `ai_replies.txt` - Reply history

### Health Checks

Create a health check endpoint or script:

```typescript
// src/health.ts
import { RedditService } from './services/reddit.js';
import { ConfigManager } from './config/index.js';

async function healthCheck() {
  try {
    const configManager = new ConfigManager();
    const accounts = await configManager.loadAccounts();
    
    if (!accounts || accounts.accounts.length === 0) {
      throw new Error('No accounts configured');
    }
    
    const reddit = new RedditService(accounts);
    const canAccess = await reddit.testSubredditAccess('test');
    
    console.log('Health check passed');
    process.exit(0);
  } catch (error) {
    console.error('Health check failed:', error);
    process.exit(1);
  }
}

healthCheck();
```

### Backup

Regularly backup:
- `accounts.json` (encrypted)
- `processed_posts.txt`
- `processed_comments.txt`
- Log files

### Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** in production
3. **Encrypt sensitive files** at rest
4. **Use a firewall** to restrict access
5. **Keep dependencies updated**
6. **Monitor for unusual activity**
7. **Set up alerts** for errors

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   ```bash
   # Rebuild from workspace root
   cd /path/to/thetis
   bun install --force
   ```

2. **Permission errors**:
   ```bash
   # Fix file permissions
   chmod -R 755 apps/reddit-bot
   chown -R youruser:youruser apps/reddit-bot
   ```

3. **Rate limiting**:
   - Increase check intervals
   - Add more Reddit accounts
   - Check Reddit API status

4. **Memory issues**:
   - Increase Node.js memory limit:
   ```bash
   NODE_OPTIONS="--max-old-space-size=2048" bun run start
   ```

### Debug Mode

Run with debug logging:
```bash
LOG_LEVEL=debug bun run start -- monitor --subreddit test
```

## Scaling

For high-volume monitoring:

1. **Use multiple instances** with different subreddits
2. **Implement a job queue** (Redis + Bull)
3. **Use a database** instead of text files
4. **Add metrics collection** (Prometheus)
5. **Set up distributed tracing**

## Support

For issues:
1. Check the logs first
2. Verify credentials are correct
3. Test in a small subreddit first
4. Review Reddit API documentation
5. Check Gemini API quotas