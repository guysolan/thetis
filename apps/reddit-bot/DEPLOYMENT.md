# Quick Deployment Guide

## 1. Vercel Deployment

```bash
# Navigate to the reddit-bot directory
cd apps/reddit-bot

# Deploy to Vercel
vercel --prod

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? reddit-bot
# - In which directory is your code located? ./
```

## 2. Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

### Reddit API (Required)
```
REDDIT_CLIENT_ID=your_app_client_id
REDDIT_CLIENT_SECRET=your_app_secret
REDDIT_USER_AGENT=ThetisBot/1.0.0 (by /u/yourusername)
REDDIT_USERNAME=your_bot_username
REDDIT_PASSWORD=your_bot_password
```

### OpenAI (Required)
```
OPENAI_API_KEY=sk-your_openai_key
```

### Security (Required)
```
CRON_SECRET=generate_random_secure_string
```

## 3. Add Vercel KV Database

1. Go to Vercel Dashboard → Storage
2. Click "Create Database" → KV
3. Name it "reddit-bot-kv"
4. Connect to your project
5. Environment variables will be automatically added

## 4. Test Deployment

1. Visit your deployed URL
2. Check the dashboard loads
3. Use test buttons to verify functionality

## 5. Monitor Cron Jobs

Cron jobs will start automatically:
- Monitor Posts: Every 15 minutes
- Monitor Comments: Every 10 minutes  
- Reply to Posts: Every 30 minutes

## Troubleshooting

- **Dashboard not loading**: Check environment variables
- **Cron jobs failing**: Verify CRON_SECRET and Reddit credentials
- **No posts found**: Check subreddit permissions and API limits

## Production Checklist

- [ ] All environment variables set
- [ ] KV database connected
- [ ] Test cron jobs successful
- [ ] Dashboard accessible
- [ ] Reddit bot account created and configured
- [ ] Rate limiting tested