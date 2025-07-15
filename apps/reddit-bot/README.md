# Reddit Bot

An automated Reddit monitoring and response bot built with TypeScript. This bot monitors specified subreddits for posts and comments matching your topic filters and uses AI to generate helpful responses.

## Features

- **Multiple Reddit Account Support**: Rotate between multiple accounts to avoid rate limits
- **AI-Powered Responses**: Uses Google Gemini AI to analyze content and generate human-like responses
- **Smart Filtering**: Only responds to content directly related to your specified topics
- **Rate Limiting**: Built-in rate limiting to prevent spam (configurable)
- **Test Mode**: Simulate responses without actually posting
- **Comprehensive Logging**: Detailed logs for monitoring, analysis, and debugging
- **CLI Interface**: Easy-to-use command-line interface for all operations

## Prerequisites

- Node.js 18+ 
- Reddit Account(s) with API access
- Google Gemini API key

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Setup

### 1. Create Reddit App

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Fill in the details:
   - Name: Your bot name
   - App type: Select "script"
   - Description: Brief description
   - About URL: Can be blank
   - Redirect URI: http://localhost:8080 (not used but required)
4. Click "Create app"
5. Note down your:
   - Client ID (shown under "personal use script")
   - Client Secret

### 2. Get Google Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Save it securely

### 3. Add Reddit Account

```bash
npm run start -- account add \
  --client-id YOUR_CLIENT_ID \
  --client-secret YOUR_CLIENT_SECRET \
  --username YOUR_REDDIT_USERNAME \
  --password YOUR_REDDIT_PASSWORD \
  --api-key YOUR_GEMINI_API_KEY
```

## Usage

### Start Monitoring (Test Mode)

```bash
# Monitor r/AskReddit in test mode (default)
npm run start -- monitor --subreddit AskReddit --test

# Monitor with custom interval (in minutes)
npm run start -- monitor --subreddit AskReddit --interval 5
```

### Start Monitoring (Live Mode)

⚠️ **Warning**: Live mode will actually post replies to Reddit. Use with caution!

```bash
# Monitor and post real replies
npm run start -- monitor --subreddit AskReddit --no-test
```

### Account Management

```bash
# List all accounts
npm run start -- account list

# Remove an account
npm run start -- account remove USERNAME
```

### Configuration

```bash
# View current configuration
npm run start -- config --view

# Update a configuration value
npm run start -- config --set key=value

# Example: Change rate limit to 1 hour
npm run start -- config --set rate_limit_hours=1
```

### Scheduled Monitoring

For use with cron jobs or task schedulers:

```bash
# Run for 5 minutes then exit
npm run start -- schedule --subreddit AskReddit --duration 5
```

Example cron job (runs every hour for 5 minutes):
```cron
0 * * * * cd /path/to/reddit-bot && npm run start -- schedule --subreddit AskReddit --duration 5
```

## Configuration Options

The bot can be configured via `bot_config.json`:

- `subreddit`: Default subreddit to monitor
- `topic_filter`: Keywords/topics to look for
- `check_interval_minutes`: How often to check for new content (1-60)
- `test_mode`: Whether to simulate replies (true/false)
- `rate_limit_hours`: Minimum hours between replies (0.5-24)
- `max_posts_per_check`: Maximum posts to check per cycle (1-100)
- `max_comments_per_check`: Maximum comments to check per cycle (1-500)

## Log Files

The bot creates several log files:

- `monitored_posts.txt`: All posts that were checked
- `monitored_comments.txt`: All comments that were checked
- `ai_replies.txt`: Summary of AI decisions and replies
- `ai_analysis_log.txt`: Detailed AI analysis for each item
- `processed_posts.txt`: IDs of processed posts (persistent)
- `processed_comments.txt`: IDs of processed comments (persistent)
- `error.log`: Error logs
- `combined.log`: All logs in JSON format

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Check types
npm run typecheck

# Format code
npm run format

# Lint code
npm run lint
```

## Deployment

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the bot
pm2 start npm --name "reddit-bot" -- run start -- monitor --subreddit AskReddit

# View logs
pm2 logs reddit-bot

# Stop the bot
pm2 stop reddit-bot
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start", "--", "monitor"]
```

### Environment Variables

You can also use environment variables for sensitive data:

```bash
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_username
REDDIT_PASSWORD=your_password
GEMINI_API_KEY=your_api_key
```

## Safety Guidelines

1. **Always test in TEST MODE first** to see what the bot would post
2. **Monitor the logs** regularly to ensure appropriate responses
3. **Respect Reddit's rules** and individual subreddit rules
4. **Use rate limiting** to avoid being flagged as spam
5. **Review AI responses** periodically to ensure quality

## Troubleshooting

### Authentication Errors
- Verify your Reddit app credentials are correct
- Check that your Reddit account has verified email
- Ensure 2FA is disabled or use app-specific password

### Rate Limit Errors
- Increase the `check_interval_minutes` value
- Reduce `max_posts_per_check` and `max_comments_per_check`
- Add more Reddit accounts for rotation

### AI Not Responding
- Verify your Gemini API key is valid
- Check API quotas at Google Cloud Console
- Review the topic_filter to ensure it's specific enough

## License

MIT