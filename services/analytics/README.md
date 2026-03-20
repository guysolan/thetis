# Analytics Service

Google Analytics 4 (GA4) data access for insights and reporting.

## How to Give Cursor AI Access to Your Analytics Data

The GA4 Data API uses **service account authentication**, not a simple API key. Here's how to set it up:

### 1. Create a Google Cloud Project (if you don't have one)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Analytics Data API**:
   - APIs & Services → Library → search "Google Analytics Data API" → Enable

### 2. Create a Service Account

1. APIs & Services → Credentials → Create Credentials → Service Account
2. Name it (e.g. "analytics-reader") and create
3. Skip optional steps (roles can be added in GA4)
4. Go to the service account → Keys tab → Add Key → Create new key → JSON
5. Download the JSON file and save it as `service-account.json` in this folder

### 3. Grant the Service Account Access to GA4

1. In [Google Analytics](https://analytics.google.com/), go to Admin (gear icon)
2. Property → Property Access Management
3. Click **+** to add users
4. Enter the service account email (e.g. `analytics-reader@your-project.iam.gserviceaccount.com`)
5. Role: **Viewer** (read-only)
6. Save

### 4. Get Your Property ID

1. GA4 Admin → Property Settings
2. Copy the **Property ID** (numeric, e.g. `412345678`)
3. Add to `.env`: `GA4_PROPERTY_ID=412345678`

### 5. Create Your .env File

```bash
cp .env.example .env
```

Edit `.env` and set:
- `GOOGLE_APPLICATION_CREDENTIALS` – path to your `service-account.json`
- `GA4_PROPERTY_ID` – your GA4 property ID

### 6. Share with Cursor

For me (the AI) to use this in Cursor:

- **Option A**: The `service-account.json` and `.env` live in this folder. When you run scripts that fetch GA data and output it, I can analyze the output.
- **Option B**: Create an MCP server or script that fetches GA data on demand. I could call it or you could run it and paste results.
- **Option C**: Export key reports from GA4 (CSV/Excel) and share the files or paste the data into the chat.

**Security note**: `service-account.json` contains private keys. The root `.gitignore` already excludes `*service-account.json` and `*.env`, so these won't be committed. Never paste the full JSON or keys into chat.
