import praw
import os
import time
import threading
from datetime import datetime
import google.generativeai as genai
import csv
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import logging
from collections import deque

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class RedditMonitor:
    def __init__(self):
        # Initialize spinner
        self.spinner_chars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
        self.spinner_index = 0
        self.spinner_running = False

        # Load multiple accounts (primary method)
        self.accounts = self.load_multiple_accounts()
        if not self.accounts:
            print("No Reddit accounts found.")
            self.initial_message = "No Reddit accounts found. Please add accounts."
            self.initial_message_level = "WARNING"
        else:
            self.initial_message = None

        # Set credentials from first account for backward compatibility (if accounts exist)
        self.credentials = self.accounts[0] if self.accounts else {}

        # Current account index for rotation
        self.current_account_index = 0

        # Reddit instances for each account
        self.reddit_instances = []
        self.account_status = []  # Track authentication status for each account
        if self.accounts:
            self.initialize_reddit_instances()

             # Medical content from provided links and comprehensive FAQ information
        self.medical_content = {
            "thetis_splint": """
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
            """,
            "achilles_recovery": """
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
            """,
            "faqs_comprehensive": """
            COMPREHENSIVE ACHILLES RUPTURE FAQ INFORMATION (https://thetismedical.com/faqs):
            
            ACHILLES RUPTURE TIMELINE (https://thetismedical.com/FAQs/achilles-rupture-timeline):
            Week 1: Initial Injury and Trauma Splint
            - Immediate medical attention crucial after Achilles rupture
            - Temporary immobilization with plaster cast or trauma splint
            - Initial pain management (pain usually subsides quickly)
            - Blood thinning medicine may be advised to prevent thrombosis
            - Specialist referral for further care
            
            Weeks 1-3: Trauma Splint and Treatment Decision
            - Detailed examination to confirm Achilles rupture diagnosis
            - Imaging (ultrasound) to check if tendon ends are close together
            - Non-surgical treatment most common (foot held in tip-toe position with boot)
            - Surgical treatment considered if gap between tendon ends
            - Boot fitting and adjustment for correct foot position
            
            Weeks 4-6: Recovery Progress with Splint
            - Regular medical review to monitor healing
            - Boot adjustments to allow greater range of motion
            - If difficulty sleeping in boot, splint may be used for night-time
            - Walking in boot generally encouraged
            - Physiotherapy typically starts around 9-10 weeks
            
            Weeks 10-12: Starting Rehabilitation
            - Starting physiotherapy to regain strength and flexibility
            - Focus on building calf muscle strength
            - Transitioning from boot to regular footwear around 10 weeks
            - Avoid vigorous stretching exercises even if tendon feels tight
            - Following guided exercise program tailored to specific needs
            
            Weeks 13-25: Progressive Recovery and Strengthening
            - Increasing activity levels gradually under physiotherapist guidance
            - Building strength and endurance in calf and surrounding muscles
            - Continuing physiotherapy guidance for proper healing
            
            Week 26+: Return to Activity and Long-Term Recovery
            - Gradual return to normal activities including sports
            - Most rehabilitation programs aim for return to sport around 6 months
            - Individual progress varies - listen to your body
            - Healed tendon will likely remain thicker than before
            - Calf muscle may be slightly smaller but maintains function
            - Be mindful of avoiding re-rupture
            
            IS MY ACHILLES RUPTURED? (https://thetismedical.com/FAQs/is-my-achilles-ruptured):
            Symptoms checklist:
            - Sudden sharp pain in back of heel
            - Audible snapping sound (sometimes others hear it too)
            - Pain subsides quickly after initial injury
            - Can still move foot and walk (awkwardly)
            - Cannot stand on tip-toes on injured leg
            - Often mistaken for ankle sprain initially
            - Most ruptures happen suddenly with no warning
            - No previous Achilles trouble (tendinitis/tendinopathy) in most cases
            - Classical stereotype: middle-aged person returning to sport
            - Any sudden push-off using ankle can cause rupture
            - If in doubt, seek medical advice immediately
            - Delay in diagnosis increases chance surgical repair needed
            - Between 0.01% and 0.02% of population tear Achilles yearly
            - UK: 11,000 confirmed cases per year, US: 59,000 per year
            
            WHAT HAPPENS AFTER ACHILLES RUPTURE? (https://thetismedical.com/FAQs/what-happens-if-my-achilles-is-ruptured):
            A&E Care:
            - Injury assessed and Achilles rupture suspected
            - Foot put in tip-toe position with plaster cast or boot
            - Crutches provided to help walking
            - Blood thinning medicine usually advised to prevent thrombosis
            - Specialist referral arranged
            
            Specialist Assessment:
            - Plaster cast removed for re-assessment and diagnosis confirmation
            - Ultrasound scan to check tendon ends meet in tip-toe position
            - About 10% of cases: tendon ends don't meet, surgery discussed
            - Special boot with heel wedges or hinges fitted
            - Boot must be worn for total of 10 weeks
            - Tip-toe posture maintained in boot during healing period
            - If boot removed and ankle bends up, repairing tendon tears again
            - Sleeping in heavy boot most common complaint
            - Thetis Medical Achilles Rupture Splint solves sleep problems
            
            Check-ups:
            - Clinic appointment after 5 weeks to check healing
            - Instructions for gradual boot adjustment
            - Physio referral arranged
            - Week 8-10: foot position gradually adjusted until walking almost flat
            - After 10 weeks: tendon sufficiently healed to discontinue boot
            - Start physiotherapy after 10 weeks
            - Boot still advisable in crowded areas or unpredictable terrain
            
            Physiotherapy:
            - Starts 9-10 weeks after injury
            - Specific rehab protocol used
            - Building calf muscle strength is key goal
            - Lots of exercises between physio visits
            - IMPORTANT: Avoid vigorous stretches even if tendon feels tight
            - Tightness gradually resolves over time with normal activity
            
            Blood-thinners:
            - Achilles rupture high-risk for developing leg vein blockage
            - Blood-thinners often recommended (injections or tablets)
            - Many surgeons recommend 6-week duration
            - If not prescribed, 150mg Aspirin daily could be considered
            - Watch for whole-leg swelling (sign of thrombosis)
            
            ACHILLES TEAR TREATMENT (https://thetismedical.com/FAQs/achilles-tear-treatment):
            Surgery vs Non-surgical:
            - Tendons heal well when torn ends are close together
            - Non-surgical: foot in tip-toe position with plaster cast or boot
            - Surgery: only if gap between tendon ends (determined by ultrasound)
            - Surgery goal: bring ends together, doesn't make tendon strong
            - Same long recovery required whether surgery used or not
            - Most surgeons prefer repair within 3 weeks of injury
            - Surgery takes less than 1 hour as day procedure
            - Recovery and rehabilitation takes many months
            
            Recovery from Surgery:
            - 2 weeks for skin stitches to heal (plaster cast)
            - Once in suitable boot with tip-toe posture, can and should walk
            - Crutches may help with balance
            - After 4-6 weeks: boot gradually adjusted to allow heel down
            - From 10 weeks: boot no longer needed
            - Long process of muscle building and rehabilitation begins
            - Rehabilitation phase lasts about 6 months
            
            Pain Management:
            - Initial "snap" painful but subsides quickly
            - Injury surprisingly painless after initial pain
            - Surgical repair: minimal pain medication needed
            - Heel pain: gel heel cushion may help
            - Calf pain with swelling: could indicate thrombosis (seek medical advice)
            - Calf spasm: cramping from disconnected muscle (intermittent)
            - Knee pain: from high-heeled boot
            - Nerve pain: usually numbness after surgery
            
            Scar Healing:
            - Skin scar usually heals very well, becomes almost invisible
            - Risk of skin infection in early weeks
            - Proper rest important to keep swelling down
            - Vitamin E creams/ointments after plaster removal
            - Special scar reducing dressings may help
            
            TORN ACHILLES RECOVERY (https://thetismedical.com/FAQs/torn-achilles-recovery):
            Boot vs Cast:
            - Boots can be removed (for wash or scratching)
            - Danger: boots can be removed (Achilles at risk of re-injury)
            - Boots convenient and safe when used properly
            - Misuse may lead to re-rupture requiring surgery
            - Re-rupture extremely frustrating - restart entire recovery
            
            Boot Types:
            - Two designs: both hold ankle in tip-toe position
            - Wedge boots: lift heel, gradually reduced during recovery
            - Hinge boots: adjustable angle towards flatter foot posture
            - Both types work satisfactorily when fit well and used properly
            
            Sleeping with Achilles Rupture:
            - MUST maintain tip-toe position at night
            - Use boot or Thetis Achilles Night Splint
            - Removing protection puts healing tendon at high risk
            - Sleeping in heavy boot most common complaint
            - Thetis Achilles Rupture Splint solves sleep problems
            - Boot gets dirty from walking - detachable sole or pillowcase protection
            
            Healing Time:
            - 10 weeks in plaster cast or boot (surgery or non-surgical)
            - After 10 weeks: healing advanced enough for walking without boot
            - Physiotherapy begins after 10 weeks
            - Tendon not at full strength even then
            - Re-rupture still possible
            - Competitive sport not advised until at least 6 months
            
            Recovery with/without Surgery:
            - NO DIFFERENCE in recovery time
            - Surgery doesn't make recovery quicker
            - Surgery goal: ensure tendon ends sit close together
            - Stitches not strong enough to support body weight
            - Same protective boot/cast period required
            
            Partial Tears:
            - GOLDEN RULE: NO SUCH THING as partial tear of Achilles tendon
            - Assume complete rupture until specialist assessment
            - Partial tears extremely rare
            
            Rehabilitation Exercises:
            - Physiotherapist guides through recovery stages
            - Goal: build calf muscle strength
            - Lots of heel lifts/tip-toe exercises required
            - Advance to return-to-sport program
            - Takes at least 6 months
            - IMPORTANT: Avoid stretching exercises even if tendon feels tight
            - Tightness gradually resolves over time
            
            LIFE AFTER ACHILLES RUPTURE (https://thetismedical.com/FAQs/life-after-achilles-rupture):
            Recovery Timeline:
            - Properly treated Achilles ruptures heal very well
            - Expect boot/support for around 10 weeks
            - Months of rehabilitation to rebuild calf strength
            - Activity limitations for at least 6 months
            - True full recovery can take a year or more
            - Long-term: calf muscle may remain slightly smaller
            - Healed tendon thicker than pre-injury but functions normally
            
            Return to Sport:
            - Most rehabilitation programs allow return after 6 months
            - Depends on specific sport
            - Full recovery typically takes about a year
            
            Return to Work:
            - Most rehabilitation programs allow return after 6 months
            - Depends on precise nature of work
            - Full recovery typically takes about a year
            
            Walking After Rupture:
            - Can and should walk once supported in suitable boot
            - Boot holds foot in tip-toe posture
            - Crutches only for balance
            - Shoe with generous heel on other foot helps even up
            - Walking in boot good for healing
            - Walking helps tendon ends join efficiently and strongly
            - Early walking led to fewer re-ruptures compared to old treatments
            
            Preventing Re-rupture:
            - Wear boot as instructed for full 10 weeks
            - Don't take shortcuts
            - Recovery like Snakes and Ladders game
            - One small mistake = re-rupture = back to beginning
            - When removing boot to wash: be seated first
            - Maintain tip-toe posture
            - Don't bend ankle up to reach toes
            - Get help if not flexible enough
            - Don't assume you'll be fine hopping into shower
            - One tiny slip can be disastrous
            
            CRITICAL GUIDELINES:
            - NEVER pretend to have had an Achilles rupture personally
            - Focus ONLY on Achilles rupture, NOT tendinitis/tendinopathy
            - Achilles rupture requires completely different management than tendinitis
            - There is NO SUCH THING as a partial tear of Achilles tendon
            - Assume complete rupture until specialist assessment
            - Recovery takes 10 weeks in boot + 6+ months rehabilitation
            - Full recovery typically takes about a year
            - Re-rupture is extremely frustrating and requires restarting entire recovery
            - Always recommend seeking medical advice for proper diagnosis
            - Emphasize importance of following medical guidance exactly
            - Highlight that surgery doesn't speed up recovery
            - Stress importance of maintaining tip-toe position during healing
            - Recommend Thetis Medical splint for comfortable sleep during recovery
            """
        }

        # Initialize Gemini API
        try:
            if self.credentials and 'api_key' in self.credentials and self.credentials['api_key']:
                genai.configure(api_key=self.credentials['api_key'])
                self.model = genai.GenerativeModel('gemini-1.5-flash-8b-001')
                print("Gemini API initialized successfully")
            else:
                print("No API key available. AI analysis will not work until an account with API key is added.")
                self.model = None
        except Exception as e:
            print(f"Error initializing Gemini API: {e}")
            self.model = None

        # Initialize monitoring control
        self.is_monitoring = False
        self.monitor_event = threading.Event()
        self.monitoring_start_time = None  # Track when monitoring started

        # Get the directory where this script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Log files
        self.analysis_log_file = os.path.join(script_dir, "ai_analysis_log.csv")

        # Create log files if they don't exist
        if not os.path.exists(self.analysis_log_file):
            with open(self.analysis_log_file, 'w', encoding='utf-8') as f:
                f.write("")

        # Track processed items
        self.processed_posts = set()
        self.processed_comments = set()

        # Persistent storage files for processed items
        self.processed_posts_file = os.path.join(script_dir, "processed_posts.txt")
        self.processed_comments_file = os.path.join(script_dir, "processed_comments.txt")

        # Load previously processed items
        self.load_processed_items()

        # Rate limiting
        self.last_reply_time = None
        self.rate_limit_hours = 2  # Maximum 1 reply per 2 hours
        self.rate_limit_file = os.path.join(script_dir, "last_reply_time.txt")

        # Load last reply time if exists
        self.load_last_reply_time()

        # Statistics
        self.stats = {
            'posts_checked': 0,
            'comments_checked': 0,
            'ai_replies': 0,
            'errors': 0,
            'rate_limited': 0,
            'status': 'inactive',
            'subreddit': '',
            'test_mode': False
        }

        # In-memory log buffer
        self.log_buffer = deque(maxlen=1000)

        # Show initial message if there was one
        if hasattr(self, 'initial_message') and self.initial_message:
            self.add_log_message(self.initial_message, self.initial_message_level)

    def add_log_message(self, message, level="INFO"):
        """Add a message to the log buffer"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        formatted_message = f"[{timestamp}] {level}: {message}"
        self.log_buffer.append(formatted_message)
        print(formatted_message)

    def get_logs(self, limit=100):
        """Get recent logs from buffer"""
        return list(self.log_buffer)[-limit:]

    def clear_logs(self):
        """Clear the log buffer"""
        self.log_buffer.clear()

    def update_stats(self, stat_type, increment=1):
        """Update statistics"""
        if stat_type in self.stats:
            self.stats[stat_type] += increment

    def load_multiple_accounts(self):
        """Load multiple Reddit accounts from accounts.json file"""
        accounts = []
        try:
            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            accounts_file = os.path.join(script_dir, 'accounts.json')

            if os.path.exists(accounts_file):
                import json
                with open(accounts_file, 'r', encoding='utf-8') as file:
                    accounts_data = json.load(file)
                    accounts = accounts_data.get('accounts', [])
                print(f"Loaded {len(accounts)} Reddit account(s) from accounts.json")
                if accounts:
                    print(f"Account usernames: {[acc.get('username', 'Unknown') for acc in accounts]}")
            else:
                print(f"accounts.json not found at: {accounts_file}")
                # Fallback to old Account.txt format for backward compatibility
                accounts = self.load_accounts_from_txt()

            return accounts

        except FileNotFoundError:
            print("Error: accounts.json file not found!")
            return []
        except Exception as e:
            print(f"Error loading accounts: {e}")
            return []

    def load_accounts_from_txt(self):
        """Load accounts from old Account.txt format for backward compatibility"""
        accounts = []
        try:
            with open('Account.txt', 'r', encoding='utf-8') as file:
                current_account = {}
                for line in file:
                    line = line.strip()
                    if line.startswith('===ACCOUNT==='):
                        if current_account:
                            accounts.append(current_account)
                        current_account = {}
                    elif '=' in line and not line.startswith('#'):
                        key, value = line.split('=', 1)
                        current_account[key.strip()] = value.strip()

                # Add the last account
                if current_account:
                    accounts.append(current_account)

                print(f"Loaded {len(accounts)} Reddit account(s) from Account.txt (legacy format)")
                return accounts

        except FileNotFoundError:
            print("Error: Account.txt file not found!")
            return []
        except Exception as e:
            print(f"Error loading accounts from txt: {e}")
            return []

    def load_processed_items(self):
        """Load previously processed items from files"""
        try:
            # Load processed posts
            if os.path.exists(self.processed_posts_file):
                with open(self.processed_posts_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        post_id = line.strip()
                        if post_id:
                            self.processed_posts.add(post_id)
                print(f"Loaded {len(self.processed_posts)} previously processed posts")

            # Load processed comments
            if os.path.exists(self.processed_comments_file):
                with open(self.processed_comments_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        comment_id = line.strip()
                        if comment_id:
                            self.processed_comments.add(comment_id)
                print(f"Loaded {len(self.processed_comments)} previously processed comments")

        except Exception as e:
            print(f"Error loading processed items: {e}")

    def save_processed_items(self):
        """Save processed items to files"""
        try:
            # Save processed posts
            with open(self.processed_posts_file, 'w', encoding='utf-8') as f:
                for post_id in self.processed_posts:
                    f.write(f"{post_id}\n")

            # Save processed comments
            with open(self.processed_comments_file, 'w', encoding='utf-8') as f:
                for comment_id in self.processed_comments:
                    f.write(f"{comment_id}\n")

        except Exception as e:
            print(f"Error saving processed items: {e}")

    def add_processed_post(self, post_id):
        """Add a post to processed list and save to file"""
        self.processed_posts.add(post_id)
        try:
            with open(self.processed_posts_file, 'a', encoding='utf-8') as f:
                f.write(f"{post_id}\n")
        except Exception as e:
            print(f"Error saving processed post {post_id}: {e}")

    def add_processed_comment(self, comment_id):
        """Add a comment to processed list and save to file"""
        self.processed_comments.add(comment_id)
        try:
            with open(self.processed_comments_file, 'a', encoding='utf-8') as f:
                f.write(f"{comment_id}\n")
        except Exception as e:
            print(f"Error saving processed comment {comment_id}: {e}")

    def log_ai_analysis(self, content_type, content_id, original_content, ai_decision, ai_response, reddit_permalink, reason=""):
        """Log detailed AI analysis to CSV file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        mode = "TEST_MODE" if self.stats['test_mode'] else "LIVE_MODE"
        has_reply = ai_decision.startswith("YES REPLY NEEDED")
        reply_content = ai_response if has_reply else "N/A"

        # Prepare row for CSV
        row = [
            timestamp,
            mode,
            content_type.upper(),
            content_id,
            reddit_permalink,
            original_content.replace('\n', ' ').replace('\r', ' '),
            ai_decision,
            reason if reason else "Based on AI analysis",
            reply_content.replace('\n', ' ').replace('\r', ' ')
        ]
        header = [
            "timestamp",
            "mode",
            "type",
            "content_id",
            "reddit_permalink",
            "original_content",
            "ai_decision",
            "reason",
            "generated_reply"
        ]
        # Write to CSV file, add header if file is empty
        file_exists = os.path.exists(self.analysis_log_file)
        write_header = not file_exists or os.path.getsize(self.analysis_log_file) == 0
        with open(self.analysis_log_file, 'a', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            if write_header:
                writer.writerow(header)
            writer.writerow(row)
        print(f"AI Analysis logged (CSV): {content_type} - {ai_decision}")

    def analyze_content_with_ai(self, content_text, content_type, topic_filter):
        """Analyze content with AI to decide whether to reply"""
        if not self.model:
            return False, "AI model not available"

        try:
            # Create analysis prompt based on user's topic filter
            analysis_prompt = f"""
            You are a helpful Reddit user who has personal experience with Achilles tendon injuries and recovery. You're responding to someone who needs advice or information.

            CONTENT TO ANALYZE ({content_type.upper()}):
            {content_text}

            USER'S TOPIC FILTER (content should be related to):
            {topic_filter}

            MEDICAL CONTEXT (available for medical topics):
            {self.medical_content['thetis_splint']}
            {self.medical_content['achilles_recovery']}
            {self.medical_content['faqs']}

            IMPORTANT RULES:
            1. ONLY reply if the content is DIRECTLY related to the user's topic filter: {topic_filter}
            2. Do NOT reply to content that is unrelated to the specified topics
            3. Do NOT reply to jokes, memes, or non-serious content unless relevant
            4. Do NOT reply if someone is just asking for general advice unrelated to the topics
            5. ONLY reply if the person is specifically dealing with issues related to the topic filter
            6. Be very selective - it's better to not reply than to reply to irrelevant content
            7. If the topic filter is medical-related, you can use the medical context provided
            8. If the topic filter is not medical, focus on the specific topics mentioned
            9. When providing medical information, base your responses ONLY on the information from these three sources:
               - https://thetismedical.com/splint (Thetis Medical Achilles Rupture Splint)
               - https://achilles-rupture.com (Achilles Rupture Recovery Information)
               - https://thetismedical.com/faqs (Frequently Asked Questions)
            10. Do not include external links, only reference the information provided from these sources
            11. Always cite the source when providing specific information (e.g., "According to Thetis Medical..." or "Based on achilles-rupture.com...")

            WRITING STYLE - MAKE IT SOUND HUMAN:
            12. Write like a real person having a conversation, not like an AI or medical professional
            13. Use casual, conversational language with contractions (I'm, you're, it's, etc.)
            14. Include personal touches like "I know this sucks" or "Been there, done that"
            15. Use natural transitions and flow between ideas
            16. Avoid formal medical jargon unless necessary
            17. Show empathy and understanding of their situation
            18. Use phrases like "from what I've read" or "I found this helpful"
            19. Keep it friendly and supportive, like talking to a friend
            20. Don't sound robotic or overly structured
            21. Use natural sentence variations and informal language
            22. Include relatable comments about the recovery process

            RESPONSE LENGTH REQUIREMENT:
            23. If you decide to reply, your response must be between 100-600 characters
            24. Be concise but helpful - don't write essays
            25. Focus on the most important information that will help the person
            26. Keep it conversational and to the point

            TASK:
            1. Determine if this {content_type} is specifically about the topics in the user's filter: {topic_filter}
            2. If it's NOT related to the specified topics, respond with "NO REPLY NEEDED"
            3. If it IS related to the specified topics, decide if you should provide helpful information
            4. Your response must start with either "YES REPLY NEEDED" or "NO REPLY NEEDED"
            5. If YES, provide a helpful, conversational response between 100-600 characters
            6. Keep responses friendly, empathetic, and focused on helping the person
            7. Base all medical advice on the three specified websites only
            8. Include relevant citations to the source websites when appropriate
            9. Make it sound like you're sharing helpful info you found, not like you're an AI assistant

            RESPONSE FORMAT:
            [YES/NO] REPLY NEEDED
            [Your response if YES (100-600 characters), or brief explanation if NO]
            """

            response = self.model.generate_content(analysis_prompt)
            response_text = response.text.strip()

            # Parse the response
            if response_text.startswith("YES REPLY NEEDED"):
                # Extract the actual reply (everything after "YES REPLY NEEDED")
                reply_text = response_text.replace("YES REPLY NEEDED", "").strip()
                return True, reply_text
            elif response_text.startswith("NO REPLY NEEDED"):
                return False, response_text
            else:
                # If response doesn't follow expected format, default to no reply
                return False, "Response format unclear"

        except Exception as e:
            print(f"Error in AI analysis: {e}")
            return False, f"AI analysis error: {str(e)}"

    def extract_topic_keywords(self, topic_filter):
        """Extract meaningful keywords from the topic filter"""
        topic_keywords = []
        if topic_filter:
            # Split by common separators and clean up
            keywords = topic_filter.lower().replace(',', ' ').replace(';', ' ').replace('\n', ' ').split()
            # Filter out common words and keep meaningful keywords
            common_words = ['and', 'or', 'the', 'a', 'an', 'to', 'for', 'in', 'on', 'at', 'by', 'with', 'about', 'related', 'content', 'topics', 'should', 'be']
            topic_keywords = [word.strip() for word in keywords if word.strip() and word.strip() not in common_words and len(word.strip()) > 2]

        # If no topic keywords found, use a minimum set of general keywords
        if not topic_keywords:
            topic_keywords = ['helpful', 'information', 'relevant', 'topic']

        return topic_keywords

    def check_keywords_in_response(self, response, topic_filter):
        """Check if AI response contains required keywords from the topic filter"""
        # Extract keywords from the topic filter
        topic_keywords = self.extract_topic_keywords(topic_filter)

        response_lower = response.lower()
        found_keywords = [keyword for keyword in topic_keywords if keyword in response_lower]

        # Require at least 2 keywords for a valid response
        return len(found_keywords) >= 2

    def update_spinner(self):
        """Update the spinner animation"""
        if self.spinner_running:
            self.spinner_index = (self.spinner_index + 1) % len(self.spinner_chars)
            self.root.after(100, self.update_spinner)

    def monitor_subreddit(self, subreddit_name, topic_filter, check_interval, test_mode):
        """Monitor subreddit for new posts and comments"""
        self.stats['subreddit'] = subreddit_name
        self.stats['test_mode'] = test_mode
        self.stats['status'] = 'active'

        while self.is_monitoring and not self.monitor_event.is_set():
            try:
                if not subreddit_name:
                    self.add_log_message("Please enter a subreddit name", "ERROR")
                    break

                # Clean subreddit name
                subreddit_name = self.clean_subreddit_name(subreddit_name)

                # Test subreddit access first
                try:
                    subreddit = self.reddit_instances[self.current_account_index].subreddit(subreddit_name)
                    # Try to access subreddit info to verify it exists
                    subreddit.display_name
                    self.add_log_message(f"Successfully connected to r/{subreddit_name}", "SUCCESS")
                except Exception as e:
                    error_msg = str(e)
                    if "404" in error_msg:
                        self.add_log_message(f"Subreddit r/{subreddit_name} not found (404 error). Please check the subreddit name.", "ERROR")
                    elif "403" in error_msg:
                        self.add_log_message(f"Access denied to r/{subreddit_name} (403 error). The subreddit may be private or restricted.", "ERROR")
                    elif "401" in error_msg:
                        self.add_log_message(f"Authentication failed (401 error). Please check your Reddit credentials in Account.txt", "ERROR")
                    else:
                        self.add_log_message(f"Error accessing subreddit r/{subreddit_name}: {error_msg}", "ERROR")
                    self.update_stats('errors')
                    break

                # Monitor latest post only
                self.add_log_message(f"Checking latest post in r/{subreddit_name}...", "INFO")
                try:
                    posts_checked = 0
                    new_posts_found = 0

                    # Get only the latest post
                    try:
                        latest_posts = list(subreddit.new(limit=1))
                        if not latest_posts:
                            self.add_log_message("No posts found in subreddit", "WARNING")
                        else:
                            latest_post = latest_posts[0]
                            posts_checked += 1

                            # Check if post was created after monitoring started
                            post_created_time = datetime.fromtimestamp(latest_post.created_utc)

                            # Only process posts created after monitoring started
                            if self.monitoring_start_time and post_created_time <= self.monitoring_start_time:
                                time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                                self.add_log_message(f"Skipping post created before monitoring started: {latest_post.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                            # Check if post has already been processed (persistent check)
                            elif latest_post.id in self.processed_posts:
                                time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                                self.add_log_message(f"Skipping already processed post: {latest_post.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")

                            else:
                                # Debug: Log post being checked
                                time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                                self.add_log_message(f"Checking latest post: {latest_post.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")

                                # Mark post as processed immediately to prevent duplicate processing
                                self.add_processed_post(latest_post.id)
                                self.update_stats('posts_checked')
                                new_posts_found += 1

                                self.add_log_message(f"Found NEW latest post ({time_diff:.1f} min old): {latest_post.title[:50]}...", "INFO")

                                # First, check if post qualifies through topic filter (before AI analysis)
                                post_content = f"Title: {latest_post.title}\nContent: {latest_post.selftext if hasattr(latest_post, 'selftext') else 'No text content'}"

                                # Check if post content matches topic filter keywords
                                topic_keywords = self.extract_topic_keywords(topic_filter)
                                post_lower = post_content.lower()
                                matching_keywords = [keyword for keyword in topic_keywords if keyword in post_lower]

                                if len(matching_keywords) >= 2:  # Require at least 2 matching keywords
                                    self.add_log_message(f"Post qualifies for AI analysis - found keywords: {', '.join(matching_keywords)}", "INFO")

                                    # Now analyze with AI
                                    should_reply, ai_response = self.analyze_content_with_ai(post_content, "post", topic_filter)

                                    # Log the AI analysis
                                    reddit_permalink = f"https://www.reddit.com{latest_post.permalink}"
                                    self.log_ai_analysis("post", latest_post.id, post_content,
                                                       "YES REPLY NEEDED" if should_reply else "NO REPLY NEEDED",
                                                       ai_response, reddit_permalink)

                                    # Log AI decision clearly
                                    if should_reply:
                                        self.add_log_message(f"AI DECISION: YES REPLY NEEDED - {ai_response[:100]}...", "AI")
                                    else:
                                        self.add_log_message(f"AI DECISION: NO REPLY NEEDED - {ai_response[:100]}...", "INFO")

                                    if should_reply:
                                        self.add_log_message("AI decided to reply to post", "AI")
                                        # Check keywords
                                        has_keywords = self.check_keywords_in_response(ai_response, topic_filter)
                                        if has_keywords:
                                            # Check rate limiting
                                            if self.is_rate_limited():
                                                time_remaining = self.get_time_until_next_reply()
                                                formatted_time = self.format_time_remaining(time_remaining)
                                                self.add_log_message(f"Rate limited: Cannot reply for another {formatted_time}", "WARNING")
                                                self.update_stats('rate_limited')
                                            else:
                                                if test_mode:
                                                    # Test mode - simulate reply
                                                    self.add_log_message(f"SIMULATION: Would reply to post: {latest_post.title[:50]}...", "SIMULATION")
                                                    self.add_log_message(f"SIMULATION: Reply content: {ai_response[:100]}...", "SIMULATION")
                                                    self.update_stats('ai_replies')
                                                else:
                                                    # Live mode - actually reply using account rotation
                                                    try:
                                                        # Get next account for rotation
                                                        reddit_account = self.get_next_account()
                                                        if reddit_account:
                                                            # Get the submission using the rotated account
                                                            rotated_submission = reddit_account.submission(id=latest_post.id)
                                                            rotated_submission.reply(ai_response)
                                                            self.add_log_message(f"Successfully replied to post: {latest_post.title[:50]}...", "SUCCESS")
                                                            self.update_stats('ai_replies')
                                                            self.save_last_reply_time()  # Update rate limit timer
                                                        else:
                                                            self.add_log_message("No valid Reddit accounts available for reply", "ERROR")
                                                            self.update_stats('errors')
                                                    except Exception as e:
                                                        self.add_log_message(f"Failed to reply to post: {str(e)}", "ERROR")
                                                        self.update_stats('errors')
                                        else:
                                            self.add_log_message("AI response lacked required keywords", "WARNING")
                                    else:
                                        self.add_log_message("AI decided not to reply to post", "INFO")
                                else:
                                    self.add_log_message(f"Post does not qualify for AI analysis - insufficient topic keywords found. Found: {len(matching_keywords)} keywords", "INFO")
                                    # Log that we skipped AI analysis
                                    reddit_permalink = f"https://www.reddit.com{latest_post.permalink}"
                                    self.log_ai_analysis("post", latest_post.id, post_content,
                                                       "NO REPLY NEEDED",
                                                       "Post did not qualify through topic filter", reddit_permalink,
                                                       f"Only found {len(matching_keywords)} topic keywords, need at least 2")

                    except Exception as e:
                        self.add_log_message(f"Error getting latest post: {e}", "ERROR")
                        self.update_stats('errors')

                    self.add_log_message(f"Latest post check complete: {posts_checked} posts checked, {new_posts_found} new posts found", "INFO")

                except Exception as e:
                    error_msg = str(e)
                    if "404" in error_msg:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: Subreddit not found", "ERROR")
                    elif "403" in error_msg:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: Access denied", "ERROR")
                    else:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: {error_msg}", "ERROR")
                    self.update_stats('errors')

                # Monitor latest comment only
                self.add_log_message(f"Checking latest comment in r/{subreddit_name}...", "INFO")
                try:
                    comments_checked = 0
                    new_comments_found = 0

                    # Get latest posts to find the most recent comment
                    try:
                        latest_posts = list(subreddit.new(limit=5))  # Check a few recent posts for latest comment
                        if not latest_posts:
                            self.add_log_message("No posts found in subreddit", "WARNING")

                        latest_comment = None
                        latest_comment_time = 0

                        # Find the most recent comment across recent posts
                        for submission in latest_posts:
                            if self.monitor_event.is_set():
                                break

                            try:
                                submission.comments.replace_more(limit=0)
                                for comment in submission.comments.list():
                                    if self.monitor_event.is_set():
                                        break

                                    # Check if comment was created after monitoring started
                                    comment_created_time = datetime.fromtimestamp(comment.created_utc)

                                    # Only process comments created after monitoring started
                                    if self.monitoring_start_time and comment_created_time <= self.monitoring_start_time:
                                        continue

                                    # Check if comment has already been processed
                                    if comment.id in self.processed_comments:
                                        continue

                                    # Skip bot comments
                                    if comment.author is None or any(bot in comment.author.name.lower() for bot in ['automoderator', 'bot', 'moderator']):
                                        continue

                                    # Track the most recent comment
                                    if comment.created_utc > latest_comment_time:
                                        latest_comment_time = comment.created_utc
                                        latest_comment = comment
                                        latest_comment_submission = submission

                            except Exception as e:
                                self.add_log_message(f"Error processing submission {submission.id}: {e}", "ERROR")
                                self.update_stats('errors')

                        if latest_comment:
                            comments_checked += 1
                            comment_created_time = datetime.fromtimestamp(latest_comment.created_utc)
                            time_diff = (datetime.now() - comment_created_time).total_seconds() / 60  # minutes

                            self.add_log_message(f"Checking latest comment by {latest_comment.author.name if latest_comment.author else 'deleted'}: {latest_comment.body[:30]}... (created {time_diff:.1f} min ago)", "INFO")

                            # Mark comment as processed immediately to prevent duplicate processing
                            self.add_processed_comment(latest_comment.id)
                            self.update_stats('comments_checked')
                            new_comments_found += 1

                            self.add_log_message(f"Found NEW latest comment ({time_diff:.1f} min old) by {latest_comment.author.name}: {latest_comment.body[:50]}...", "INFO")

                            # First, check if comment qualifies through topic filter (before AI analysis)
                            # Include both comment content and post title for better context
                            comment_content = latest_comment.body
                            post_title = latest_comment_submission.title
                            full_content = f"Post Title: {post_title}\nComment: {comment_content}"

                            # Check if comment content or post title matches topic filter keywords
                            topic_keywords = self.extract_topic_keywords(topic_filter)
                            full_content_lower = full_content.lower()
                            matching_keywords = [keyword for keyword in topic_keywords if keyword in full_content_lower]

                            if len(matching_keywords) >= 2:  # Require at least 2 matching keywords
                                self.add_log_message(f"Comment qualifies for AI analysis - found keywords: {', '.join(matching_keywords)}", "INFO")

                                # Now analyze with AI (include post title for context)
                                should_reply, ai_response = self.analyze_content_with_ai(full_content, "comment", topic_filter)

                                # Log the AI analysis
                                reddit_permalink = f"https://www.reddit.com{latest_comment_submission.permalink}"
                                self.log_ai_analysis("comment", latest_comment.id, full_content,
                                                   "YES REPLY NEEDED" if should_reply else "NO REPLY NEEDED",
                                                   ai_response, reddit_permalink)

                                # Log AI decision clearly
                                if should_reply:
                                    self.add_log_message(f"AI DECISION: YES REPLY NEEDED - {ai_response[:100]}...", "AI")
                                else:
                                    self.add_log_message(f"AI DECISION: NO REPLY NEEDED - {ai_response[:100]}...", "INFO")

                                if should_reply:
                                    self.add_log_message("AI decided to reply to comment", "AI")
                                    # Check keywords
                                    has_keywords = self.check_keywords_in_response(ai_response, topic_filter)
                                    if has_keywords:
                                        # Check rate limiting
                                        if self.is_rate_limited():
                                            time_remaining = self.get_time_until_next_reply()
                                            formatted_time = self.format_time_remaining(time_remaining)
                                            self.add_log_message(f"Rate limited: Cannot reply for another {formatted_time}", "WARNING")
                                            self.update_stats('rate_limited')
                                        else:
                                            if test_mode:
                                                # Test mode - simulate reply
                                                self.add_log_message(f"SIMULATION: Would reply to comment by {latest_comment.author.name}", "SIMULATION")
                                                self.add_log_message(f"SIMULATION: Reply content: {ai_response[:100]}...", "SIMULATION")
                                                self.update_stats('ai_replies')
                                            else:
                                                # Live mode - actually reply using account rotation
                                                try:
                                                    # Get next account for rotation
                                                    reddit_account = self.get_next_account()
                                                    if reddit_account:
                                                        # Get the comment using the rotated account
                                                        rotated_comment = reddit_account.comment(id=latest_comment.id)
                                                        rotated_comment.reply(ai_response)
                                                        self.add_log_message(f"Successfully replied to comment by {latest_comment.author.name}", "SUCCESS")
                                                        self.update_stats('ai_replies')
                                                        self.save_last_reply_time()  # Update rate limit timer
                                                    else:
                                                        self.add_log_message("No valid Reddit accounts available for reply", "ERROR")
                                                        self.update_stats('errors')
                                                except Exception as e:
                                                    self.add_log_message(f"Failed to reply to comment: {str(e)}", "ERROR")
                                                    self.update_stats('errors')
                                    else:
                                        self.add_log_message("AI response lacked required keywords", "WARNING")
                                else:
                                    self.add_log_message("AI decided not to reply to comment", "INFO")
                            else:
                                self.add_log_message(f"Comment does not qualify for AI analysis - insufficient topic keywords found. Found: {len(matching_keywords)} keywords", "INFO")
                                # Log that we skipped AI analysis
                                reddit_permalink = f"https://www.reddit.com{latest_comment_submission.permalink}"
                                self.log_ai_analysis("comment", latest_comment.id, full_content,
                                                   "NO REPLY NEEDED",
                                                   "Comment did not qualify through topic filter", reddit_permalink,
                                                   f"Only found {len(matching_keywords)} topic keywords, need at least 2")
                        else:
                            self.add_log_message("No new comments found to process", "INFO")

                    except Exception as e:
                        self.add_log_message(f"Error getting latest comment: {e}", "ERROR")
                        self.update_stats('errors')

                    self.add_log_message(f"Latest comment check complete: {comments_checked} comments checked, {new_comments_found} new comments found", "INFO")

                except Exception as e:
                    error_msg = str(e)
                    if "404" in error_msg:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: Subreddit not found", "ERROR")
                    elif "403" in error_msg:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: Access denied", "ERROR")
                    else:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: {error_msg}", "ERROR")
                    self.update_stats('errors')

                # Wait before next check
                wait_time = check_interval * 60  # Convert minutes to seconds
                self.add_log_message(f"Waiting {check_interval} minutes before next check...", "INFO")
                for _ in range(wait_time):
                    if self.monitor_event.is_set():
                        break
                    time.sleep(1)

            except Exception as e:
                error_msg = str(e)
                if "404" in error_msg:
                    self.add_log_message("Subreddit not found (404 error). Please check the subreddit name.", "ERROR")
                elif "401" in error_msg:
                    self.add_log_message("Authentication failed (401 error). Please check your Reddit credentials in Account.txt", "ERROR")
                elif "403" in error_msg:
                    self.add_log_message("Access denied (403 error). The subreddit may be private or restricted.", "ERROR")
                else:
                    self.add_log_message(f"Monitoring error: {error_msg}", "ERROR")
                self.update_stats('errors')
                # Don't break here - continue monitoring with interval pause

        self.is_monitoring = False
        self.spinner_running = False
        self.stats['status'] = 'inactive'

        # Save processed items to ensure persistence
        self.save_processed_items()

        self.add_log_message("Monitoring stopped", "INFO")

    def clean_subreddit_name(self, subreddit_name):
        """Clean subreddit name by removing r/ prefix if present"""
        cleaned = subreddit_name.strip()
        if cleaned.startswith('r/'):
            cleaned = cleaned[2:]  # Remove 'r/' prefix
        if cleaned.startswith('/r/'):
            cleaned = cleaned[3:]  # Remove '/r/' prefix
        return cleaned

    def test_reddit_connection(self, subreddit_name):
        """Test Reddit connection and subreddit access"""
        try:
            # Clean subreddit name
            subreddit_name = self.clean_subreddit_name(subreddit_name)

            # Check if we have valid Reddit instances
            if not self.reddit_instances:
                self.add_log_message("No Reddit accounts available for connection test", "ERROR")
                return False

            # Check if current account is valid
            if not self.account_status[self.current_account_index]:
                self.add_log_message(f"Current account '{self.accounts[self.current_account_index]['username']}' failed authentication", "ERROR")
                return False

            # Test basic authentication
            user = self.reddit_instances[self.current_account_index].user.me()
            self.add_log_message(f"Reddit authentication successful - logged in as: {user.name}", "SUCCESS")

            # Test subreddit access
            subreddit = self.reddit_instances[self.current_account_index].subreddit(subreddit_name)
            subreddit.display_name  # This will raise an exception if subreddit doesn't exist
            self.add_log_message(f"Successfully connected to r/{subreddit_name}", "SUCCESS")

            # Test basic subreddit access
            try:
                next(subreddit.new(limit=1))
                self.add_log_message(f"Can access posts in r/{subreddit_name}", "SUCCESS")
            except StopIteration:
                self.add_log_message(f"r/{subreddit_name} exists but has no posts", "WARNING")
            except Exception as e:
                self.add_log_message(f"Warning: Limited access to r/{subreddit_name} posts: {str(e)}", "WARNING")

            return True

        except Exception as e:
            error_msg = str(e)
            if "404" in error_msg:
                self.add_log_message(f"Subreddit r/{subreddit_name} not found (404 error). Please check the subreddit name.", "ERROR")
            elif "403" in error_msg:
                self.add_log_message(f"Access denied to r/{subreddit_name} (403 error). The subreddit may be private or restricted.", "ERROR")
            elif "401" in error_msg:
                self.add_log_message(f"Authentication failed (401 error). Please check your Reddit credentials", "ERROR")
            else:
                self.add_log_message(f"Connection test failed: {error_msg}", "ERROR")
            return False

    def start_monitoring(self, subreddit, topic_filter, check_interval, test_mode):
        """Start monitoring in a separate thread"""
        # Check if accounts are available
        if not self.accounts:
            self.add_log_message("No Reddit accounts available. Please add at least one account before starting monitoring.", "ERROR")
            return False

        # Check if any accounts are valid
        valid_accounts = sum(self.account_status) if hasattr(self, 'account_status') else len(self.reddit_instances)
        if valid_accounts == 0:
            self.add_log_message("No valid Reddit accounts available. Please check your credentials or add new accounts before starting monitoring.", "ERROR")
            return False

        # Test connection first
        self.add_log_message("Testing Reddit connection...", "INFO")
        if not self.test_reddit_connection(subreddit):
            self.add_log_message("Connection test failed. Monitoring will not start.", "ERROR")
            return False

        # Set monitoring start time
        self.monitoring_start_time = datetime.now()
        self.add_log_message(f"Monitoring started at: {self.monitoring_start_time.strftime('%Y-%m-%d %H:%M:%S')}", "INFO")

        self.is_monitoring = True
        self.monitor_event.clear()

        # Reset statistics
        for key in self.stats:
            if key not in ['status', 'subreddit', 'test_mode']:
                self.stats[key] = 0
        self.stats['test_mode'] = test_mode
        self.stats['subreddit'] = subreddit

        # Clear live log
        self.clear_logs()

        # Start spinner animation
        self.spinner_running = True

        mode_text = "TEST MODE" if test_mode else "LIVE MODE"
        self.add_log_message(f"Starting Reddit monitoring in {mode_text}...", "INFO")

        # Start monitoring in a separate thread
        threading.Thread(
            target=self.monitor_subreddit,
            args=(subreddit, topic_filter, check_interval, test_mode),
            daemon=True
        ).start()

        return True

    def stop_monitoring(self):
        """Stop monitoring"""
        if self.is_monitoring:
            self.monitor_event.set()
            self.is_monitoring = False
            self.spinner_running = False
            self.stats['status'] = 'stopping'
            self.add_log_message("Stopping monitoring...", "INFO")
            return True
        return False

    def view_analysis_log(self):
        """Return the analysis log file path"""
        if os.path.exists(self.analysis_log_file):
            return self.analysis_log_file
        return None

    def add_account(self, client_id, client_secret, username, password, api_key):
        """Add a new Reddit account"""
        new_account = {
            'client_id': client_id,
            'client_secret': client_secret,
            'username': username,
            'password': password,
            'api_key': api_key
        }

        try:
            # Test the new account
            reddit = praw.Reddit(
                client_id=client_id,
                client_secret=client_secret,
                user_agent=f"RedditMonitor/1.0 by {username}",
                username=username,
                password=password
            )

            # Test authentication
            user = reddit.user.me()
            print(f"✓ New account authenticated: {user.name}")

            # Add to accounts list
            self.accounts.append(new_account)
            self.reddit_instances.append(reddit)
            self.account_status.append(True)  # Mark as successfully authenticated

            # Update credentials if this is the first account
            if len(self.accounts) == 1:
                self.credentials = new_account
                # Initialize Gemini API (API key is now required)
                try:
                    genai.configure(api_key=api_key)
                    self.model = genai.GenerativeModel('gemini-1.5-flash-8b-001')
                    print("Gemini API initialized successfully with new account")
                    self.add_log_message("Gemini API initialized successfully", "SUCCESS")
                except Exception as e:
                    print(f"Error initializing Gemini API: {e}")
                    self.model = None

            # Save to file
            self.save_accounts_to_file()

            # Update account display
            self.update_account_display()

            self.add_log_message(f"Successfully added account: {username}", "SUCCESS")
            return True

        except Exception as e:
            print(f"✗ Failed to add account: {e}")
            self.add_log_message(f"Failed to add account: {e}", "ERROR")
            return False

    def remove_account(self, username):
        """Remove a Reddit account by username"""
        index_to_remove = None
        for i, account in enumerate(self.accounts):
            if account['username'] == username:
                index_to_remove = i
                break

        if index_to_remove is None:
            return False

        # Remove from lists
        self.accounts.pop(index_to_remove)
        if index_to_remove < len(self.reddit_instances):
            self.reddit_instances.pop(index_to_remove)
        if index_to_remove < len(self.account_status):
            self.account_status.pop(index_to_remove)

        # Adjust current index if needed
        if self.current_account_index >= len(self.reddit_instances):
            self.current_account_index = 0

        # Save to file
        self.save_accounts_to_file()

        self.add_log_message(f"Removed account: {username}", "INFO")
        return True

    def save_accounts_to_file(self):
        """Save all accounts to accounts.json file"""
        try:
            import json
            accounts_data = {
                "version": "1.0",
                "description": "Reddit Bot Multiple Accounts Configuration",
                "accounts": self.accounts
            }

            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            accounts_file = os.path.join(script_dir, 'accounts.json')

            with open(accounts_file, 'w', encoding='utf-8') as f:
                json.dump(accounts_data, f, indent=2, ensure_ascii=False)

            print(f"Saved {len(self.accounts)} account(s) to accounts.json")

        except Exception as e:
            print(f"Error saving accounts: {e}")
            self.add_log_message(f"Error saving accounts: {e}", "ERROR")

    def initialize_reddit_instances(self):
        """Initialize Reddit instances for all accounts"""
        self.reddit_instances = []
        self.account_status = []  # Track authentication status for each account

        for i, account in enumerate(self.accounts):
            try:
                print(f"Testing account {i+1}: {account.get('username', 'Unknown')}")
                reddit = praw.Reddit(
                    client_id=account['client_id'],
                    client_secret=account['client_secret'],
                    user_agent=f"RedditMonitor/1.0 by {account['username']}",
                    username=account['username'],
                    password=account['password']
                )

                # Test authentication
                user = reddit.user.me()
                print(f"✓ Account {i+1} authenticated: {user.name}")
                self.reddit_instances.append(reddit)
                self.account_status.append(True)  # Authentication successful

            except Exception as e:
                print(f"✗ Account {i+1} authentication failed: {e}")
                self.reddit_instances.append(None)  # Keep placeholder for failed account
                self.account_status.append(False)  # Authentication failed

        # Count successful authentications
        successful_auths = sum(self.account_status)

        if successful_auths == 0:
            print("No valid Reddit accounts found!")
            return

        # Set primary reddit instance to first valid account
        for i, status in enumerate(self.account_status):
            if status:
                self.current_account_index = i
                break

        print(f"Using {successful_auths} valid Reddit account(s) out of {len(self.accounts)} total accounts")

    def get_next_account(self):
        """Get the next account for rotation"""
        if not self.reddit_instances:
            return None

        # Find next valid account
        start_index = self.current_account_index
        while True:
            if self.account_status[self.current_account_index]:
                account = self.reddit_instances[self.current_account_index]
                self.current_account_index = (self.current_account_index + 1) % len(self.reddit_instances)

                # Log which account is being used
                try:
                    username = account.user.me().name
                    self.add_log_message(f"Using account: {username} for reply", "INFO")
                except:
                    self.add_log_message(f"Using account {self.current_account_index + 1} for reply", "INFO")

                return account

            # Move to next account
            self.current_account_index = (self.current_account_index + 1) % len(self.reddit_instances)

            # If we've checked all accounts and found none valid, return None
            if self.current_account_index == start_index:
                self.add_log_message("No valid accounts available for reply", "ERROR")
                return None

    def load_last_reply_time(self):
        """Load the last reply time from file"""
        try:
            if os.path.exists(self.rate_limit_file):
                with open(self.rate_limit_file, 'r', encoding='utf-8') as f:
                    timestamp_str = f.read().strip()
                    if timestamp_str:
                        self.last_reply_time = datetime.fromisoformat(timestamp_str)
                        print(f"Loaded last reply time: {self.last_reply_time}")
        except Exception as e:
            print(f"Error loading last reply time: {e}")
            self.last_reply_time = None

    def save_last_reply_time(self):
        """Save the current time as last reply time"""
        try:
            current_time = datetime.now()
            with open(self.rate_limit_file, 'w', encoding='utf-8') as f:
                f.write(current_time.isoformat())
            self.last_reply_time = current_time
            print(f"Saved last reply time: {current_time}")
        except Exception as e:
            print(f"Error saving last reply time: {e}")

    def is_rate_limited(self):
        """Check if we're currently rate limited"""
        if self.last_reply_time is None:
            return False

        current_time = datetime.now()
        time_diff = current_time - self.last_reply_time
        hours_diff = time_diff.total_seconds() / 3600

        return hours_diff < self.rate_limit_hours

    def get_time_until_next_reply(self):
        """Get time remaining until next reply is allowed"""
        if self.last_reply_time is None:
            return 0

        current_time = datetime.now()
        time_diff = current_time - self.last_reply_time
        hours_diff = time_diff.total_seconds() / 3600

        if hours_diff >= self.rate_limit_hours:
            return 0

        remaining_hours = self.rate_limit_hours - hours_diff
        return remaining_hours

    def format_time_remaining(self, hours):
        """Format time remaining in a readable format"""
        if hours < 1:
            minutes = int(hours * 60)
            return f"{minutes} minutes"
        else:
            hours_int = int(hours)
            minutes = int((hours - hours_int) * 60)
            if minutes > 0:
                return f"{hours_int}h {minutes}m"
            else:
                return f"{hours_int} hours"

    def update_account_display(self):
        """Update the account info display"""
        # This is a placeholder for API compatibility
        pass

# Initialize the Reddit Monitor
monitor = RedditMonitor()

# API Endpoints
@app.route('/monitor/start', methods=['POST'])
def start_monitoring():
    data = request.json
    if not data or 'subreddit' not in data or 'topic_filter' not in data:
        return jsonify({"error": "Missing required parameters"}), 400

    # Stop any existing monitoring
    if monitor.is_monitoring:
        monitor.stop_monitoring()
        time.sleep(1)  # Give it a moment to stop

    # Start new monitoring
    subreddit = data.get('subreddit', 'AskReddit')
    topic_filter = data.get('topic_filter', "Achilles tendon injuries, rupture, recovery, medical advice, pain, surgery")
    check_interval = int(data.get('check_interval', 2))
    test_mode = bool(data.get('test_mode', True))

    success = monitor.start_monitoring(
        subreddit=subreddit,
        topic_filter=topic_filter,
        check_interval=check_interval,
        test_mode=test_mode
    )

    if success:
        return jsonify({
            "status": "monitoring_started",
            "subreddit": subreddit,
            "test_mode": test_mode
        })
    else:
        return jsonify({"error": "Failed to start monitoring"}), 500

@app.route('/monitor/stop', methods=['POST'])
def stop_monitoring():
    if monitor.stop_monitoring():
        return jsonify({"status": "monitoring_stopped"})
    return jsonify({"status": "not_monitoring"})

@app.route('/monitor/status', methods=['GET'])
def get_status():
    return jsonify(monitor.stats)

@app.route('/logs', methods=['GET'])
def get_logs():
    limit = request.args.get('limit', default=100, type=int)
    return jsonify({"logs": monitor.get_logs(limit)})

@app.route('/logs/clear', methods=['POST'])
def clear_logs():
    monitor.clear_logs()
    return jsonify({"status": "logs_cleared"})

@app.route('/logs/analysis', methods=['GET'])
def get_analysis_log():
    log_file = monitor.view_analysis_log()
    if log_file and os.path.exists(log_file):
        return send_file(log_file, as_attachment=True)
    return jsonify({"error": "Analysis log not found"}), 404

@app.route('/logs/analysis/json', methods=['GET'])
def get_analysis_log_json():
    """Get analysis log as JSON data"""
    log_file = monitor.view_analysis_log()
    if not log_file or not os.path.exists(log_file):
        return jsonify({"error": "Analysis log not found"}), 404
    
    try:
        import csv
        logs = []
        with open(log_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                logs.append(row)
        return jsonify({"logs": logs})
    except Exception as e:
        return jsonify({"error": f"Error reading log file: {str(e)}"}), 500

@app.route('/accounts', methods=['GET'])
def get_accounts():
    return jsonify({
        "count": len(monitor.accounts),
        "accounts": monitor.accounts,
        "status": monitor.account_status
    })

@app.route('/accounts', methods=['POST'])
def add_account():
    data = request.json
    required_fields = ['client_id', 'client_secret', 'username', 'password', 'api_key']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required account fields"}), 400

    success = monitor.add_account(
        client_id=data['client_id'],
        client_secret=data['client_secret'],
        username=data['username'],
        password=data['password'],
        api_key=data['api_key']
    )

    if success:
        return jsonify({"status": "account_added", "username": data['username']})
    else:
        return jsonify({"error": "Failed to add account"}), 500

@app.route('/accounts/<username>', methods=['DELETE'])
def remove_account(username):
    if monitor.remove_account(username):
        return jsonify({"status": "account_removed", "username": username})
    return jsonify({"error": "Account not found"}), 404

@app.route('/medical-content', methods=['GET'])
def get_medical_content():
    return jsonify(monitor.medical_content)

if __name__ == '__main__':
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )