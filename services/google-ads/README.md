# Google Ads & CRO Strategy

This directory contains tools and strategies for managing Google Ads campaigns and Conversion Rate Optimization (CRO).

## 🚀 Match Type Strategy
We use specific match types to control traffic flow for our **Achilles Recovery Course** and **Thetis Night Splint**.

| Match Type | Behavior | Best for... | Example |
| :--- | :--- | :--- | :--- |
| **BROAD** | Blocks query if word is present anywhere. | Completely unrelated topics. | `tennis`, `gaming`, `bunions` |
| **PHRASE** | Blocks if phrase is in the query. | Informational/Research intent. | `"how to"`, `"videos"`, `"causes"` |
| **EXACT** | Only blocks that specific term. | Surgical/High-volume junk. | `[free]`, `[definition]`, `[reviews]` |

## 🛍 Shopify-First Strategy (vs Amazon)

We sell on both Shopify and Amazon, but our **goal is to prioritize Shopify sales** due to higher margins and customer data ownership.
- **Why?**: Amazon referral fees (15%) and FBA premiums reduce profitability. 
- **The Tactic**: We use **Marketplace Negatives** (`amazon`, `prime`, `fba`, `temu`) to ensure we don't pay for clicks from users who have already decided to buy from a marketplace.
- **The Result**: We save ad spend on "Amazon-loyal" users (who will find us organically on Amazon anyway) and focus our budget on "undecided" users whom we can capture on Shopify.

## 📂 Domain Categorization
- `achilles_tendinopathy.csv`: Achilles/Calf specific negatives.
- `plantar_fasciitis.csv`: Arch/Heel specific negatives.
- `ankle_and_foot.csv`: General foot injury negatives.
- `back_and_hip.csv`: 100% Negative (Upper body/Hips).
- `general_keywords.csv`: Cross-domain research intent.

## 📈 Recent Audits
See [negative-keyword-lists/review_2026_03_02.md](./negative-keyword-lists/review_2026_03_02.md) for the latest audit of keywords and the rationale behind recent deletions/updates.

## 🛠 Tools
Run `bun run sync-negatives` to push these lists to Google Ads.
Connect the **Google Ads MCP Server** to Cursor for live CRO analysis.
