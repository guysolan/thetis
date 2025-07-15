"""Configuration management for Reddit Bot."""

import json
import os
from pathlib import Path
from typing import List, Optional
from pydantic import BaseModel, Field, validator
from loguru import logger


class RedditAccount(BaseModel):
    """Reddit account configuration."""
    client_id: str
    client_secret: str
    username: str
    password: str
    api_key: str = Field(description="Google Gemini API key")
    
    @validator('username')
    def username_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Username cannot be empty')
        return v


class BotConfig(BaseModel):
    """Bot configuration."""
    subreddit: str = "AskReddit"
    topic_filter: str = "Achilles tendon injuries, rupture, recovery, medical advice, pain, surgery"
    check_interval_minutes: int = Field(default=2, ge=1, le=60)
    test_mode: bool = True
    rate_limit_hours: float = Field(default=2.0, ge=0.5, le=24.0)
    max_posts_per_check: int = Field(default=25, ge=1, le=100)
    max_comments_per_check: int = Field(default=100, ge=1, le=500)
    
    # File paths
    posts_log_file: Path = Path("monitored_posts.txt")
    comments_log_file: Path = Path("monitored_comments.txt")
    replies_log_file: Path = Path("ai_replies.txt")
    analysis_log_file: Path = Path("ai_analysis_log.txt")
    processed_posts_file: Path = Path("processed_posts.txt")
    processed_comments_file: Path = Path("processed_comments.txt")
    rate_limit_file: Path = Path("last_reply_time.txt")


class AccountsConfig(BaseModel):
    """Multiple Reddit accounts configuration."""
    version: str = "1.0"
    description: str = "Reddit Bot Multiple Accounts Configuration"
    accounts: List[RedditAccount]


class MedicalContent(BaseModel):
    """Medical content configuration."""
    thetis_splint: str = """
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
    """
    
    achilles_recovery: str = """
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
    """
    
    faqs: str = """
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
    """


def load_accounts(file_path: Path = Path("accounts.json")) -> Optional[AccountsConfig]:
    """Load accounts configuration from JSON file."""
    try:
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return AccountsConfig(**data)
        else:
            logger.warning(f"Accounts file not found: {file_path}")
            return None
    except Exception as e:
        logger.error(f"Error loading accounts: {e}")
        return None


def save_accounts(accounts_config: AccountsConfig, file_path: Path = Path("accounts.json")):
    """Save accounts configuration to JSON file."""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(accounts_config.model_dump(), f, indent=2, ensure_ascii=False)
        logger.info(f"Saved {len(accounts_config.accounts)} account(s) to {file_path}")
    except Exception as e:
        logger.error(f"Error saving accounts: {e}")
        raise


def load_bot_config(file_path: Path = Path("bot_config.json")) -> BotConfig:
    """Load bot configuration from JSON file or use defaults."""
    try:
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return BotConfig(**data)
        else:
            logger.info("Bot config file not found, using defaults")
            return BotConfig()
    except Exception as e:
        logger.warning(f"Error loading bot config, using defaults: {e}")
        return BotConfig()


def save_bot_config(config: BotConfig, file_path: Path = Path("bot_config.json")):
    """Save bot configuration to JSON file."""
    try:
        # Convert Path objects to strings for JSON serialization
        data = config.model_dump()
        for key, value in data.items():
            if isinstance(value, Path):
                data[key] = str(value)
                
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        logger.info(f"Saved bot configuration to {file_path}")
    except Exception as e:
        logger.error(f"Error saving bot config: {e}")
        raise