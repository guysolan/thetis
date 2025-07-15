# Reddit Bot for Achilles Recovery

An automated Reddit bot that monitors subreddits for Achilles rupture and sports injury discussions, using AI to provide helpful responses about recovery equipment and treatment.

## Features

- **Automated Monitoring**: Scans multiple subreddits for relevant posts and comments
- **AI Analysis**: Uses OpenAI GPT-4 to analyze content relevance and generate helpful responses
- **Rate Limiting**: Responsible posting with built-in rate limits
- **Dashboard**: Real-time monitoring dashboard with activity logs and statistics
- **Vercel Integration**: Runs entirely on Vercel with cron jobs for automation

## Architecture

- **Next.js 14** with App Router
- **Vercel Cron Jobs** for automated scheduling
- **Vercel KV** for data storage and rate limiting
- **OpenAI GPT-4** for content analysis and reply generation
- **snoowrap** for Reddit API interaction

## Quick Deploy to Vercel

1. **Clone and Deploy**:
   ```bash
   git clone <your-repo>
   cd thetis/apps/reddit-bot
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - `REDDIT_CLIENT_ID`
   - `REDDIT_CLIENT_SECRET`
   - `REDDIT_USER_AGENT`
   - `REDDIT_USERNAME`
   - `REDDIT_PASSWORD`
   - `OPENAI_API_KEY`
   - `CRON_SECRET`

3. **Add Vercel KV Storage**:
   - Go to Vercel Dashboard → Storage → Create KV Database
   - Connect it to your project (automatically sets KV environment variables)

## Configuration

### Reddit Setup

1. Create a Reddit application at https://www.reddit.com/prefs/apps
2. Choose "script" type
3. Note down the client ID and secret
4. Create a dedicated Reddit account for the bot

### OpenAI Setup

1. Get API key from https://platform.openai.com/
2. Ensure you have access to GPT-4

### Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Fill in all required values.

## Monitored Subreddits

The bot monitors these subreddits for relevant content:

- r/AchillesInjuries
- r/physicaltherapy
- r/sportsinjuries
- r/MedicalAdvice
- r/AskDocs
- r/orthopedics
- r/recovery
- r/running
- r/basketball
- r/tennis
- r/soccer

## Cron Jobs

The bot runs three automated tasks:

1. **Monitor Posts** (every 15 minutes): Scans for new relevant posts
2. **Monitor Comments** (every 10 minutes): Analyzes comments on monitored posts
3. **Reply to Posts** (every 30 minutes): Generates and posts helpful replies

## Rate Limiting

- Maximum 3 replies per hour
- Tracks processed posts/comments to avoid duplicates
- Respects Reddit's API rate limits

## Dashboard

Access the dashboard at your deployed URL to monitor:

- Processing statistics
- Activity logs
- Manual testing controls
- Real-time updates

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Test cron endpoints**:
   ```bash
   # Test monitoring
   curl -H "Authorization: Bearer your_cron_secret" \
        http://localhost:3000/api/cron/monitor-posts
   ```

## Deployment Checklist

- [ ] Reddit app created and credentials obtained
- [ ] OpenAI API key obtained
- [ ] Environment variables set in Vercel
- [ ] Vercel KV database connected
- [ ] Cron secret generated and set
- [ ] Initial test run completed
- [ ] Dashboard accessible

## Monitoring and Maintenance

1. **Check Dashboard Regularly**: Monitor activity and success rates
2. **Review Replies**: Check the AI-generated replies for quality
3. **Adjust Subreddits**: Modify the subreddit list as needed
4. **Rate Limit Adjustments**: Modify rate limits based on community feedback

## Security Features

- Cron endpoints protected with secret authorization
- Rate limiting prevents spam
- Activity logging for transparency
- Separate environment for sensitive credentials

## Troubleshooting

### Common Issues

1. **Reddit API Errors**: Check credentials and rate limits
2. **OpenAI Errors**: Verify API key and quota
3. **KV Errors**: Ensure Vercel KV is properly connected
4. **Cron Not Running**: Check Vercel cron configuration

### Debug Mode

Enable detailed logging by checking the dashboard activity logs. All operations are logged with timestamps.

## Contributing

1. Test changes locally
2. Ensure rate limiting works properly
3. Verify AI responses are helpful and appropriate
4. Update documentation as needed

## License

This project is part of the Thetis Medical ecosystem.