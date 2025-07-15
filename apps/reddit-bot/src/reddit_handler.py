"""Reddit API handler for the bot."""

import praw
from typing import List, Optional, Dict, Any
from datetime import datetime
from loguru import logger

from .config import RedditAccount, AccountsConfig


class RedditHandler:
    """Handles Reddit API operations and account management."""
    
    def __init__(self, accounts_config: Optional[AccountsConfig] = None):
        """Initialize Reddit handler with accounts configuration."""
        self.accounts = accounts_config.accounts if accounts_config else []
        self.reddit_instances: List[Optional[praw.Reddit]] = []
        self.account_status: List[bool] = []
        self.current_account_index = 0
        
        if self.accounts:
            self._initialize_reddit_instances()
    
    def _initialize_reddit_instances(self):
        """Initialize Reddit instances for all accounts."""
        self.reddit_instances = []
        self.account_status = []
        
        for i, account in enumerate(self.accounts):
            try:
                logger.info(f"Testing account {i+1}: {account.username}")
                reddit = praw.Reddit(
                    client_id=account.client_id,
                    client_secret=account.client_secret,
                    user_agent=f"RedditMonitor/1.0 by {account.username}",
                    username=account.username,
                    password=account.password
                )
                
                # Test authentication
                user = reddit.user.me()
                logger.success(f"✓ Account {i+1} authenticated: {user.name}")
                self.reddit_instances.append(reddit)
                self.account_status.append(True)
                
            except Exception as e:
                logger.error(f"✗ Account {i+1} authentication failed: {e}")
                self.reddit_instances.append(None)
                self.account_status.append(False)
        
        # Count successful authentications
        successful_auths = sum(self.account_status)
        logger.info(f"Using {successful_auths} valid Reddit account(s) out of {len(self.accounts)} total accounts")
        
        if successful_auths == 0:
            raise ValueError("No valid Reddit accounts available!")
    
    def get_active_account_count(self) -> int:
        """Get the number of active accounts."""
        return sum(self.account_status)
    
    def get_current_account_username(self) -> str:
        """Get the username of the current account."""
        if self.accounts and 0 <= self.current_account_index < len(self.accounts):
            return self.accounts[self.current_account_index].username
        return "None"
    
    def get_next_account(self) -> Optional[praw.Reddit]:
        """Get the next account for rotation."""
        if not self.reddit_instances:
            return None
        
        start_index = self.current_account_index
        while True:
            if self.account_status[self.current_account_index]:
                account = self.reddit_instances[self.current_account_index]
                logger.info(f"Using account {self.current_account_index + 1} ({self.accounts[self.current_account_index].username})")
                self.current_account_index = (self.current_account_index + 1) % len(self.reddit_instances)
                return account
            
            self.current_account_index = (self.current_account_index + 1) % len(self.reddit_instances)
            
            if self.current_account_index == start_index:
                logger.error("No valid accounts available for operation")
                return None
    
    def test_subreddit_access(self, subreddit_name: str) -> bool:
        """Test if we can access a subreddit."""
        try:
            reddit = self.get_next_account()
            if not reddit:
                return False
                
            subreddit = reddit.subreddit(subreddit_name)
            # Try to access subreddit info to verify it exists
            _ = subreddit.display_name
            
            # Test basic access
            try:
                next(subreddit.new(limit=1))
                logger.success(f"Can access posts in r/{subreddit_name}")
            except StopIteration:
                logger.warning(f"r/{subreddit_name} exists but has no posts")
            
            return True
            
        except Exception as e:
            error_msg = str(e)
            if "404" in error_msg:
                logger.error(f"Subreddit r/{subreddit_name} not found (404)")
            elif "403" in error_msg:
                logger.error(f"Access denied to r/{subreddit_name} (403)")
            elif "401" in error_msg:
                logger.error(f"Authentication failed (401)")
            else:
                logger.error(f"Error accessing subreddit: {error_msg}")
            return False
    
    def get_subreddit_posts(self, subreddit_name: str, post_type: str = "new", limit: int = 25) -> List[Any]:
        """Get posts from a subreddit."""
        try:
            reddit = self.get_next_account()
            if not reddit:
                return []
                
            subreddit = reddit.subreddit(subreddit_name)
            
            if post_type == "new":
                return list(subreddit.new(limit=limit))
            elif post_type == "hot":
                return list(subreddit.hot(limit=limit))
            elif post_type == "rising":
                return list(subreddit.rising(limit=limit))
            else:
                return list(subreddit.new(limit=limit))
                
        except Exception as e:
            logger.error(f"Error getting {post_type} posts from r/{subreddit_name}: {e}")
            return []
    
    def get_post_comments(self, submission: Any, limit: int = 0) -> List[Any]:
        """Get comments from a post."""
        try:
            submission.comments.replace_more(limit=limit)
            return submission.comments.list()
        except Exception as e:
            logger.error(f"Error getting comments from submission {submission.id}: {e}")
            return []
    
    def reply_to_post(self, post_id: str, reply_text: str) -> bool:
        """Reply to a post."""
        try:
            reddit = self.get_next_account()
            if not reddit:
                return False
                
            submission = reddit.submission(id=post_id)
            submission.reply(reply_text)
            logger.success(f"Successfully replied to post {post_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to reply to post {post_id}: {e}")
            return False
    
    def reply_to_comment(self, comment_id: str, reply_text: str) -> bool:
        """Reply to a comment."""
        try:
            reddit = self.get_next_account()
            if not reddit:
                return False
                
            comment = reddit.comment(id=comment_id)
            comment.reply(reply_text)
            logger.success(f"Successfully replied to comment {comment_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to reply to comment {comment_id}: {e}")
            return False
    
    def add_account(self, account: RedditAccount) -> bool:
        """Add a new Reddit account and test it."""
        try:
            # Test the new account
            reddit = praw.Reddit(
                client_id=account.client_id,
                client_secret=account.client_secret,
                user_agent=f"RedditMonitor/1.0 by {account.username}",
                username=account.username,
                password=account.password
            )
            
            # Test authentication
            user = reddit.user.me()
            logger.success(f"✓ New account authenticated: {user.name}")
            
            # Add to lists
            self.accounts.append(account)
            self.reddit_instances.append(reddit)
            self.account_status.append(True)
            
            return True
            
        except Exception as e:
            logger.error(f"✗ Failed to add account: {e}")
            return False
    
    def remove_account(self, index: int) -> bool:
        """Remove a Reddit account by index."""
        if 0 <= index < len(self.accounts):
            username = self.accounts[index].username
            
            # Remove from lists
            self.accounts.pop(index)
            if index < len(self.reddit_instances):
                self.reddit_instances.pop(index)
            if index < len(self.account_status):
                self.account_status.pop(index)
            
            # Adjust current index if needed
            if self.current_account_index >= len(self.reddit_instances):
                self.current_account_index = 0
            
            logger.info(f"Removed account: {username}")
            return True
        return False