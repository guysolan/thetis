# -*- coding: utf-8 -*-
import praw
import os
import random
import time
import tkinter as tk
from tkinter import ttk, messagebox, filedialog, scrolledtext
import threading
from datetime import datetime
import google.generativeai as genai

class RedditMonitorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Reddit Subreddit Monitor")
        self.root.geometry("1000x800")
        self.root.resizable(True, True)
        
        # Initialize spinner
        self.spinner_chars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
        self.spinner_index = 0
        self.spinner_running = False
        
        # Load multiple accounts (primary method)
        self.accounts = self.load_multiple_accounts()
        if not self.accounts:
            # Don't destroy the app, just show a warning and let user add accounts
            print("No Reddit accounts found. User can add accounts through the UI.")
            # Store message to show after UI is set up
            self.initial_message = "No Reddit accounts found. Please add accounts using the 'Add Account' button."
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
            messagebox.showwarning("Warning", "Gemini API initialization failed. AI analysis will not work.")
            self.model = None
        
        # Initialize monitoring control
        self.is_monitoring = False
        self.monitor_event = threading.Event()
        self.monitoring_start_time = None  # Track when monitoring started
        
        # Log files
        self.posts_log_file = "monitored_posts.txt"
        self.comments_log_file = "monitored_comments.txt"
        self.replies_log_file = "ai_replies.txt"
        self.analysis_log_file = "ai_analysis_log.txt"
        
        # Create log files if they don't exist
        for log_file in [self.posts_log_file, self.comments_log_file, self.replies_log_file, self.analysis_log_file]:
            if not os.path.exists(log_file):
                with open(log_file, 'w', encoding='utf-8') as f:
                    f.write("")
        
        # Track processed items
        self.processed_posts = set()
        self.processed_comments = set()
        
        # Persistent storage files for processed items
        self.processed_posts_file = "processed_posts.txt"
        self.processed_comments_file = "processed_comments.txt"
        
        # Load previously processed items
        self.load_processed_items()
        
        # Rate limiting
        self.last_reply_time = None
        self.rate_limit_hours = 2  # Maximum 1 reply per 2 hours
        self.rate_limit_file = "last_reply_time.txt"
        
        # Load last reply time if exists
        self.load_last_reply_time()
        
        # Statistics
        self.stats = {
            'posts_checked': 0,
            'comments_checked': 0,
            'ai_replies': 0,
            'errors': 0,
            'rate_limited': 0
        }
        
        self.setup_ui()
        
        # Show initial message if there was one
        if hasattr(self, 'initial_message') and self.initial_message:
            self.add_log_message(self.initial_message, self.initial_message_level)
    
    def setup_ui(self):
        """Setup the user interface"""
        # Create main frame with scrollbar
        main_canvas = tk.Canvas(self.root)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = ttk.Frame(main_canvas)
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )
        
        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)
        
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Main content
        main_frame = ttk.Frame(scrollable_frame, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Title
        title_label = ttk.Label(main_frame, text="Reddit Subreddit Monitor", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 20))
        
        # Subreddit input
        ttk.Label(main_frame, text="Subreddit to Monitor:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.subreddit_entry = ttk.Entry(main_frame, width=30)
        self.subreddit_entry.grid(row=1, column=1, sticky=tk.W, pady=5)
        self.subreddit_entry.insert(0, "AskReddit")
        
        # Topic filter input (changed to text area)
        ttk.Label(main_frame, text="Topic Filter:").grid(row=2, column=0, sticky=tk.NW, pady=5)
        topic_filter_frame = ttk.Frame(main_frame)
        topic_filter_frame.grid(row=2, column=1, sticky=(tk.W, tk.E), pady=5)
        
        self.topic_filter_text = scrolledtext.ScrolledText(topic_filter_frame, height=4, width=50, wrap=tk.WORD)
        self.topic_filter_text.pack(fill=tk.BOTH, expand=True)
        self.topic_filter_text.insert('1.0', "Achilles tendon injuries, rupture, recovery, medical advice, pain, surgery")
        
        # Check interval and Test Mode
        interval_frame = ttk.Frame(main_frame)
        interval_frame.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=5)
        
        ttk.Label(interval_frame, text="Check Interval (minutes):").pack(side=tk.LEFT)
        self.check_interval_var = tk.StringVar(value="2")
        ttk.Entry(interval_frame, textvariable=self.check_interval_var, width=10).pack(side=tk.LEFT, padx=5)
        
        # Test Mode checkbox
        self.test_mode_var = tk.BooleanVar(value=True)  # Default to test mode for safety
        test_mode_check = ttk.Checkbutton(interval_frame, text="Test Mode (simulate replies)", variable=self.test_mode_var)
        test_mode_check.pack(side=tk.LEFT, padx=20)
        
        # Statistics display
        self.stats_label = ttk.Label(main_frame, text="TEST MODE | Posts Checked: 0 | Comments Checked: 0 | AI Replies: 0 | Errors: 0 | Rate Limited: 0", font=("Arial", 10, "bold"))
        self.stats_label.grid(row=4, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        
        # Status section
        status_frame = ttk.LabelFrame(main_frame, text="Status", padding="5")
        status_frame.grid(row=5, column=0, columnspan=3, pady=10, sticky=(tk.W, tk.E))
        
        self.monitoring_status_label = ttk.Label(status_frame, text="Monitoring: Inactive")
        self.monitoring_status_label.pack(fill=tk.X, pady=2)
        
        self.rate_limit_label = ttk.Label(status_frame, text="Rate Limit: Ready to reply", foreground="green")
        self.rate_limit_label.pack(fill=tk.X, pady=2)
        
        # Control buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=6, column=0, columnspan=3, pady=10)
        
        self.monitor_button = ttk.Button(button_frame, text="Start Monitoring", command=self.toggle_monitoring)
        self.monitor_button.pack(side=tk.LEFT, padx=5)
        
        ttk.Button(button_frame, text="View Posts Log", command=lambda: self.view_logs("posts")).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="View Comments Log", command=lambda: self.view_logs("comments")).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="View Replies Log", command=lambda: self.view_logs("replies")).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="View Analysis Log", command=lambda: self.view_logs("analysis")).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="Clear Live Log", command=self.clear_live_log).pack(side=tk.LEFT, padx=5)
        
        # Account Management section
        account_frame = ttk.LabelFrame(main_frame, text="Account Management", padding="5")
        account_frame.grid(row=7, column=0, columnspan=3, pady=10, sticky=(tk.W, tk.E))
        
        # Account info display
        current_username = self.accounts[0]['username'] if self.accounts else 'None'
        self.account_info_label = ttk.Label(account_frame, text=f"Active Accounts: {len(self.accounts)} | Current: {current_username}", font=("Arial", 10, "bold"))
        self.account_info_label.pack(fill=tk.X, pady=2)
        
        # Account management buttons
        account_button_frame = ttk.Frame(account_frame)
        account_button_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(account_button_frame, text="Add Account", command=self.show_add_account_dialog).pack(side=tk.LEFT, padx=5)
        ttk.Button(account_button_frame, text="Remove Account", command=self.show_remove_account_dialog).pack(side=tk.LEFT, padx=5)
        ttk.Button(account_button_frame, text="View Accounts", command=self.show_accounts_list).pack(side=tk.LEFT, padx=5)
        
        # Live Log Display
        log_frame = ttk.LabelFrame(main_frame, text="Live Activity Log", padding="5")
        log_frame.grid(row=8, column=0, columnspan=3, pady=10, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        self.live_log_text = scrolledtext.ScrolledText(log_frame, height=15, width=100, wrap=tk.WORD)
        self.live_log_text.pack(fill=tk.BOTH, expand=True)
        
        # Configure text colors
        self.live_log_text.tag_config("INFO", foreground="black")
        self.live_log_text.tag_config("SUCCESS", foreground="green")
        self.live_log_text.tag_config("WARNING", foreground="orange")
        self.live_log_text.tag_config("ERROR", foreground="red")
        self.live_log_text.tag_config("AI", foreground="blue")
        self.live_log_text.tag_config("SIMULATION", foreground="purple")
        
        # Medical content display
        content_frame = ttk.LabelFrame(main_frame, text="Medical Content Available", padding="5")
        content_frame.grid(row=9, column=0, columnspan=3, pady=10, sticky=(tk.W, tk.E))
        
        content_text = scrolledtext.ScrolledText(content_frame, height=6, width=80)
        content_text.pack(fill=tk.BOTH, expand=True)
        content_text.insert('1.0', "Available medical content for AI responses:\n\n" + 
                          self.medical_content['thetis_splint'] + "\n\n" +
                          self.medical_content['achilles_recovery'] + "\n\n" +
                          self.medical_content['faqs'])
        content_text.config(state='disabled')
        
        # Instructions
        instructions_frame = ttk.LabelFrame(main_frame, text="Instructions", padding="5")
        instructions_frame.grid(row=10, column=0, columnspan=3, pady=10, sticky=(tk.W, tk.E))
        
        instructions_text = """
        1. Add at least one Reddit account with valid credentials and Google Gemini API key
        2. Enter the subreddit name you want to monitor
        3. Set the topic filter to specify what content should be related to (supports multi-line input)
        4. Set the check interval (how often to check for new content)
        5. Check "Test Mode" to simulate replies without actually posting (recommended for testing)
        6. Uncheck "Test Mode" to enable live posting (use with caution)
        7. Click "Start Monitoring" to begin
        8. Watch the live log for real-time activity updates
        9. The AI will analyze posts and comments and reply if they're related to your topic
        10. All activity is logged in the respective log files
        11. The AI will only reply if the response contains medical keywords
        12. Rate limiting: Maximum 1 reply per 2 hours to prevent spam
        13. The rate limit status is displayed in the Status section
        """
        
        ttk.Label(instructions_frame, text=instructions_text, justify=tk.LEFT).pack(anchor=tk.W)
    
    def add_log_message(self, message, level="INFO"):
        """Add a message to the live log display"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        color_map = {
            "INFO": "black",
            "SUCCESS": "green",
            "WARNING": "orange",
            "ERROR": "red",
            "AI": "blue",
            "SIMULATION": "purple"
        }
        
        color = color_map.get(level, "black")
        formatted_message = f"[{timestamp}] {level}: {message}\n"
        
        # Update UI from main thread
        self.root.after(0, lambda: self._add_log_to_ui(formatted_message, color))
    
    def _add_log_to_ui(self, message, color):
        """Add log message to UI (called from main thread)"""
        self.live_log_text.insert(tk.END, message)
        self.live_log_text.see(tk.END)  # Auto-scroll to bottom
        
        # Apply color to the last line
        last_line_start = self.live_log_text.index("end-2c linestart")
        last_line_end = self.live_log_text.index("end-1c")
        self.live_log_text.tag_add(color, last_line_start, last_line_end)
        self.live_log_text.tag_config(color, foreground=color)
        
        # Limit log size to prevent memory issues
        lines = int(self.live_log_text.index('end-1c').split('.')[0])
        if lines > 1000:
            self.live_log_text.delete('1.0', '500.0')
    
    def update_stats(self, stat_type, increment=1):
        """Update statistics"""
        if stat_type in self.stats:
            self.stats[stat_type] += increment
            self.root.after(0, lambda: self._update_stats_display())
    
    def _update_stats_display(self):
        """Update statistics display in UI"""
        mode_text = "TEST MODE" if self.test_mode_var.get() else "LIVE MODE"
        stats_text = f"{mode_text} | Posts Checked: {self.stats['posts_checked']} | Comments Checked: {self.stats['comments_checked']} | AI Replies: {self.stats['ai_replies']} | Errors: {self.stats['errors']} | Rate Limited: {self.stats['rate_limited']}"
        self.stats_label.config(text=stats_text)
        
        # Update rate limit status
        self.update_rate_limit_status()
    
    def load_credentials(self):
        """Load Reddit credentials from Account.txt file"""
        credentials = {}
        try:
            with open('Account.txt', 'r', encoding='utf-8') as file:
                for line in file:
                    if '=' in line:
                        key, value = line.strip().split('=', 1)
                        credentials[key] = value
        except FileNotFoundError:
            print("Error: Account.txt file not found!")
            return None
        return credentials
    
    def load_multiple_accounts(self):
        """Load multiple Reddit accounts from accounts.json file"""
        accounts = []
        try:
            if os.path.exists('accounts.json'):
                import json
                with open('accounts.json', 'r', encoding='utf-8') as file:
                    accounts_data = json.load(file)
                    accounts = accounts_data.get('accounts', [])
                print(f"Loaded {len(accounts)} Reddit account(s) from accounts.json")
                if accounts:
                    print(f"Account usernames: {[acc.get('username', 'Unknown') for acc in accounts]}")
            else:
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
    
    def save_monitored_post(self, post_id, subreddit, title, author, url, content_type="post"):
        """Save monitored post details to log file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(self.posts_log_file, 'a', encoding='utf-8') as f:
            f.write(f"{timestamp} | {content_type.upper()} | r/{subreddit} | ID: {post_id} | Author: {author} | Title: {title} | URL: {url}\n")
    
    def save_monitored_comment(self, comment_id, post_id, subreddit, author, body, post_title):
        """Save monitored comment details to log file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(self.comments_log_file, 'a', encoding='utf-8') as f:
            f.write(f"{timestamp} | COMMENT | r/{subreddit} | Comment ID: {comment_id} | Post ID: {post_id} | Author: {author} | Post Title: {post_title} | Comment: {body}\n")
    
    def save_ai_reply(self, content_type, content_id, original_text, ai_decision, ai_response, replied):
        """Save AI analysis and reply details"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        mode = "TEST_MODE" if self.test_mode_var.get() else "LIVE_MODE"
        with open(self.replies_log_file, 'a', encoding='utf-8') as f:
            f.write(f"{timestamp} | {content_type.upper()} | ID: {content_id} | MODE: {mode} | AI Decision: {ai_decision} | Replied: {replied} | Original: {original_text[:100]}... | AI Response: {ai_response[:200]}...\n")
    
    def log_ai_analysis(self, content_type, content_id, original_content, ai_decision, ai_response, reddit_permalink, reason=""):
        """Log detailed AI analysis to file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        mode = "TEST_MODE" if self.test_mode_var.get() else "LIVE_MODE"
        
        # Determine if reply was generated
        has_reply = ai_decision.startswith("YES REPLY NEEDED")
        reply_content = ai_response if has_reply else "N/A"
        
        # Format the log entry
        log_entry = f"""
{'='*80}
TIMESTAMP: {timestamp}
MODE: {mode}
TYPE: {content_type.upper()}
CONTENT ID: {content_id}
REDDIT PERMALINK: {reddit_permalink}

ORIGINAL CONTENT:
{original_content}

AI DECISION: {ai_decision}
REASON: {reason if reason else "Based on AI analysis"}

GENERATED REPLY:
{reply_content}

{'='*80}
"""
        
        # Write to analysis log file
        with open(self.analysis_log_file, 'a', encoding='utf-8') as f:
            f.write(log_entry)
        
        # Also log to console for debugging
        print(f"AI Analysis logged: {content_type} - {ai_decision}")
    
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
    
    def check_keywords_in_response(self, response, topic_filter):
        """Check if AI response contains required keywords from the topic filter"""
        # Extract keywords from the topic filter
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
        
        response_lower = response.lower()
        found_keywords = [keyword for keyword in topic_keywords if keyword in response_lower]
        
        # Require at least 2 keywords for a valid response (reduced from 3 since we're using dynamic keywords)
        return len(found_keywords) >= 2, found_keywords
    
    def update_spinner(self):
        """Update the spinner animation"""
        if self.spinner_running:
            self.spinner_index = (self.spinner_index + 1) % len(self.spinner_chars)
            self.monitoring_status_label.config(text=f"Monitoring: Active {self.spinner_chars[self.spinner_index]}")
            self.root.after(100, self.update_spinner)
    
    def monitor_subreddit(self):
        """Monitor subreddit for new posts and comments"""
        while self.is_monitoring and not self.monitor_event.is_set():
            try:
                subreddit_name = self.subreddit_entry.get().strip()
                topic_filter = self.topic_filter_text.get('1.0', tk.END).strip()
                test_mode = self.test_mode_var.get()
                
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
                
                # Monitor new posts
                self.add_log_message(f"Checking new posts in r/{subreddit_name}...", "INFO")
                try:
                    posts_checked = 0
                    new_posts_found = 0
                    
                    # Try multiple methods to get recent posts
                    all_submissions = []
                    
                    # Method 1: Get new posts
                    try:
                        new_posts = list(subreddit.new(limit=25))
                        self.add_log_message(f"Retrieved {len(new_posts)} posts from 'new' endpoint", "INFO")
                        all_submissions.extend(new_posts)
                    except Exception as e:
                        self.add_log_message(f"Error getting new posts: {e}", "WARNING")
                    
                    # Method 2: Get hot posts (in case new posts are slow to appear)
                    try:
                        hot_posts = list(subreddit.hot(limit=15))
                        self.add_log_message(f"Retrieved {len(hot_posts)} posts from 'hot' endpoint", "INFO")
                        # Only add hot posts that aren't already in new posts
                        existing_ids = {post.id for post in all_submissions}
                        for post in hot_posts:
                            if post.id not in existing_ids:
                                all_submissions.append(post)
                    except Exception as e:
                        self.add_log_message(f"Error getting hot posts: {e}", "WARNING")
                    
                    # Method 3: Get rising posts (very recent activity)
                    try:
                        rising_posts = list(subreddit.rising(limit=10))
                        self.add_log_message(f"Retrieved {len(rising_posts)} posts from 'rising' endpoint", "INFO")
                        # Only add rising posts that aren't already in other lists
                        existing_ids = {post.id for post in all_submissions}
                        for post in rising_posts:
                            if post.id not in existing_ids:
                                all_submissions.append(post)
                    except Exception as e:
                        self.add_log_message(f"Error getting rising posts: {e}", "WARNING")
                    
                    self.add_log_message(f"Total unique posts to check: {len(all_submissions)}", "INFO")
                    
                    # Sort by creation time (newest first)
                    all_submissions.sort(key=lambda x: x.created_utc, reverse=True)
                    
                    for submission in all_submissions:
                        if self.monitor_event.is_set():
                            break
                        
                        posts_checked += 1
                        
                        # Check if post was created after monitoring started
                        post_created_time = datetime.fromtimestamp(submission.created_utc)
                        
                        # Only process posts created after monitoring started
                        if self.monitoring_start_time and post_created_time <= self.monitoring_start_time:
                            time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                            self.add_log_message(f"Skipping post created before monitoring started: {submission.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                            continue
                        
                        # Check if post has already been processed (persistent check)
                        if submission.id in self.processed_posts:
                            time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                            self.add_log_message(f"Skipping already processed post: {submission.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                            continue
                        
                        # Debug: Log posts being checked
                        time_diff = (datetime.now() - post_created_time).total_seconds() / 60  # minutes
                        self.add_log_message(f"Checking post: {submission.title[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                        
                        # Mark post as processed immediately to prevent duplicate processing
                        self.add_processed_post(submission.id)
                        self.update_stats('posts_checked')
                        new_posts_found += 1
                        
                        # Log the post
                        self.save_monitored_post(
                            submission.id, 
                            subreddit_name, 
                            submission.title, 
                            submission.author.name if submission.author else "deleted",
                            f"https://www.reddit.com{submission.permalink}"
                        )
                        
                        self.add_log_message(f"Found NEW post ({time_diff:.1f} min old): {submission.title[:50]}...", "INFO")
                        
                        # Analyze with AI
                        content_text = f"Title: {submission.title}\nContent: {submission.selftext if hasattr(submission, 'selftext') else 'No text content'}"
                        should_reply, ai_response = self.analyze_content_with_ai(content_text, "post", topic_filter)
                        
                        # Log the AI analysis
                        reddit_permalink = f"https://www.reddit.com{submission.permalink}"
                        self.log_ai_analysis("post", submission.id, content_text, 
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
                            has_keywords, keywords = self.check_keywords_in_response(ai_response, topic_filter)
                            if has_keywords:
                                # Check rate limiting
                                if self.is_rate_limited():
                                    time_remaining = self.get_time_until_next_reply()
                                    formatted_time = self.format_time_remaining(time_remaining)
                                    self.add_log_message(f"Rate limited: Cannot reply for another {formatted_time}", "WARNING")
                                    self.update_stats('rate_limited')
                                    self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "RATE_LIMITED")
                                else:
                                    if test_mode:
                                        # Test mode - simulate reply
                                        self.add_log_message(f"SIMULATION: Would reply to post: {submission.title[:50]}...", "SIMULATION")
                                        self.add_log_message(f"SIMULATION: Reply content: {ai_response[:100]}...", "SIMULATION")
                                        self.update_stats('ai_replies')
                                        self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "SIMULATED")
                                    else:
                                        # Live mode - actually reply using account rotation
                                        try:
                                            # Get next account for rotation
                                            reddit_account = self.get_next_account()
                                            if reddit_account:
                                                # Get the submission using the rotated account
                                                rotated_submission = reddit_account.submission(id=submission.id)
                                                rotated_submission.reply(ai_response)
                                                self.add_log_message(f"Successfully replied to post: {submission.title[:50]}...", "SUCCESS")
                                                self.update_stats('ai_replies')
                                                self.save_last_reply_time()  # Update rate limit timer
                                                self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "YES")
                                            else:
                                                self.add_log_message("No valid Reddit accounts available for reply", "ERROR")
                                                self.update_stats('errors')
                                                self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "NO_ACCOUNTS")
                                        except Exception as e:
                                            self.add_log_message(f"Failed to reply to post: {str(e)}", "ERROR")
                                            self.update_stats('errors')
                                            self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "FAILED")
                            else:
                                self.add_log_message("AI response lacked required keywords", "WARNING")
                                self.save_ai_reply("POST", submission.id, content_text, "YES REPLY NEEDED", ai_response, "NO KEYWORDS")
                        else:
                            self.add_log_message("AI decided not to reply to post", "INFO")
                            self.save_ai_reply("POST", submission.id, content_text, "NO REPLY NEEDED", ai_response, "NO")
                    
                    self.add_log_message(f"Posts check complete: {posts_checked} posts checked, {new_posts_found} new posts found", "INFO")
                    
                except Exception as e:
                    error_msg = str(e)
                    if "404" in error_msg:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: Subreddit not found", "ERROR")
                    elif "403" in error_msg:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: Access denied", "ERROR")
                    else:
                        self.add_log_message(f"Error accessing posts in r/{subreddit_name}: {error_msg}", "ERROR")
                    self.update_stats('errors')
                    break
                
                # Monitor comments on recent posts
                self.add_log_message(f"Checking comments in r/{subreddit_name}...", "INFO")
                try:
                    comments_checked = 0
                    new_comments_found = 0
                    
                    # Check both hot and new posts for recent comments
                    for submission in list(subreddit.hot(limit=15)) + list(subreddit.new(limit=10)):
                        if self.monitor_event.is_set():
                            break
                        
                        try:
                            submission.comments.replace_more(limit=0)
                            for comment in submission.comments.list():
                                if self.monitor_event.is_set():
                                    break
                                
                                comments_checked += 1
                                
                                # Check if comment was created after monitoring started
                                comment_created_time = datetime.fromtimestamp(comment.created_utc)
                                
                                # Only process comments created after monitoring started
                                if self.monitoring_start_time and comment_created_time <= self.monitoring_start_time:
                                    time_diff = (datetime.now() - comment_created_time).total_seconds() / 60  # minutes
                                    self.add_log_message(f"Skipping comment created before monitoring started: {comment.body[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                                    continue
                                
                                # Check if comment has already been processed (persistent check)
                                if comment.id in self.processed_comments:
                                    time_diff = (datetime.now() - comment_created_time).total_seconds() / 60  # minutes
                                    self.add_log_message(f"Skipping already processed comment by {comment.author.name if comment.author else 'deleted'}: {comment.body[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                                    continue
                                
                                # Debug: Log comments being checked
                                time_diff = (datetime.now() - comment_created_time).total_seconds() / 60  # minutes
                                self.add_log_message(f"Checking comment by {comment.author.name if comment.author else 'deleted'}: {comment.body[:30]}... (created {time_diff:.1f} min ago)", "INFO")
                                
                                # Mark comment as processed immediately to prevent duplicate processing
                                self.add_processed_comment(comment.id)
                                self.update_stats('comments_checked')
                                new_comments_found += 1
                                
                                # Skip bot comments
                                if comment.author is None or any(bot in comment.author.name.lower() for bot in ['automoderator', 'bot', 'moderator']):
                                    continue
                                
                                # Log the comment
                                self.save_monitored_comment(
                                    comment.id,
                                    submission.id,
                                    subreddit_name,
                                    comment.author.name if comment.author else "deleted",
                                    comment.body,
                                    submission.title
                                )
                                
                                self.add_log_message(f"Found NEW comment ({time_diff:.1f} min old) by {comment.author.name}: {comment.body[:50]}...", "INFO")
                                
                                # Analyze with AI
                                should_reply, ai_response = self.analyze_content_with_ai(comment.body, "comment", topic_filter)
                                
                                # Log the AI analysis
                                reddit_permalink = f"https://www.reddit.com{submission.permalink}"
                                self.log_ai_analysis("comment", comment.id, comment.body, 
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
                                    has_keywords, keywords = self.check_keywords_in_response(ai_response, topic_filter)
                                    if has_keywords:
                                        # Check rate limiting
                                        if self.is_rate_limited():
                                            time_remaining = self.get_time_until_next_reply()
                                            formatted_time = self.format_time_remaining(time_remaining)
                                            self.add_log_message(f"Rate limited: Cannot reply for another {formatted_time}", "WARNING")
                                            self.update_stats('rate_limited')
                                            self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "RATE_LIMITED")
                                        else:
                                            if test_mode:
                                                # Test mode - simulate reply
                                                self.add_log_message(f"SIMULATION: Would reply to comment by {comment.author.name}", "SIMULATION")
                                                self.add_log_message(f"SIMULATION: Reply content: {ai_response[:100]}...", "SIMULATION")
                                                self.update_stats('ai_replies')
                                                self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "SIMULATED")
                                            else:
                                                # Live mode - actually reply using account rotation
                                                try:
                                                    # Get next account for rotation
                                                    reddit_account = self.get_next_account()
                                                    if reddit_account:
                                                        # Get the comment using the rotated account
                                                        rotated_comment = reddit_account.comment(id=comment.id)
                                                        rotated_comment.reply(ai_response)
                                                        self.add_log_message(f"Successfully replied to comment by {comment.author.name}", "SUCCESS")
                                                        self.update_stats('ai_replies')
                                                        self.save_last_reply_time()  # Update rate limit timer
                                                        self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "YES")
                                                    else:
                                                        self.add_log_message("No valid Reddit accounts available for reply", "ERROR")
                                                        self.update_stats('errors')
                                                        self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "NO_ACCOUNTS")
                                                except Exception as e:
                                                    self.add_log_message(f"Failed to reply to comment: {str(e)}", "ERROR")
                                                    self.update_stats('errors')
                                                    self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "FAILED")
                                    else:
                                        self.add_log_message("AI response lacked required keywords", "WARNING")
                                        self.save_ai_reply("COMMENT", comment.id, comment.body, "YES REPLY NEEDED", ai_response, "NO KEYWORDS")
                                else:
                                    self.add_log_message("AI decided not to reply to comment", "INFO")
                                    self.save_ai_reply("COMMENT", comment.id, comment.body, "NO REPLY NEEDED", ai_response, "NO")
                        
                        except Exception as e:
                            self.add_log_message(f"Error processing submission {submission.id}: {e}", "ERROR")
                            self.update_stats('errors')
                    
                    self.add_log_message(f"Comments check complete: {comments_checked} comments checked, {new_comments_found} new comments found", "INFO")
                    
                except Exception as e:
                    error_msg = str(e)
                    if "404" in error_msg:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: Subreddit not found", "ERROR")
                    elif "403" in error_msg:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: Access denied", "ERROR")
                    else:
                        self.add_log_message(f"Error accessing comments in r/{subreddit_name}: {error_msg}", "ERROR")
                    self.update_stats('errors')
                    break
                
                # Wait before next check
                wait_time = int(self.check_interval_var.get()) * 60  # Convert minutes to seconds
                self.add_log_message(f"Waiting {self.check_interval_var.get()} minutes before next check...", "INFO")
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
                break
        
        self.is_monitoring = False
        self.spinner_running = False
        
        # Save processed items to ensure persistence
        self.save_processed_items()
        
        self.root.after(0, lambda: self.monitor_button.config(text="Start Monitoring"))
        self.root.after(0, lambda: self.monitoring_status_label.config(text="Monitoring: Inactive"))
        self.add_log_message("Monitoring stopped", "INFO")
    
    def toggle_monitoring(self):
        """Toggle monitoring on/off"""
        if self.is_monitoring:
            self.monitor_event.set()
            self.is_monitoring = False
            self.spinner_running = False
            
            # Save processed items to ensure persistence
            self.save_processed_items()
            
            self.monitor_button.config(text="Start Monitoring")
            self.monitoring_status_label.config(text="Monitoring: Stopping...")
            self.add_log_message("Stopping monitoring...", "INFO")
        else:
            self.start_monitoring()
    
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
    
    def start_monitoring(self):
        """Start monitoring in a separate thread"""
        subreddit_name = self.subreddit_entry.get().strip()
        if not subreddit_name:
            messagebox.showerror("Error", "Please enter a subreddit name")
            return
        
        # Check if accounts are available
        if not self.accounts:
            messagebox.showerror("Error", "No Reddit accounts available. Please add at least one account before starting monitoring.")
            return
        
        # Check if any accounts are valid
        valid_accounts = sum(self.account_status) if hasattr(self, 'account_status') else len(self.reddit_instances)
        if valid_accounts == 0:
            messagebox.showerror("Error", "No valid Reddit accounts available. Please check your credentials or add new accounts before starting monitoring.")
            return
        
        # Test connection first
        self.add_log_message("Testing Reddit connection...", "INFO")
        if not self.test_reddit_connection(subreddit_name):
            self.add_log_message("Connection test failed. Monitoring will not start.", "ERROR")
            return
        
        # Set monitoring start time
        self.monitoring_start_time = datetime.now()
        self.add_log_message(f"Monitoring started at: {self.monitoring_start_time.strftime('%Y-%m-%d %H:%M:%S')}", "INFO")
        
        self.is_monitoring = True
        self.monitor_event.clear()
        self.monitor_button.config(text="Stop Monitoring")
        self.monitoring_status_label.config(text="Starting monitoring...")
        
        # Reset statistics
        for key in self.stats:
            self.stats[key] = 0
        self._update_stats_display()
        
        # Clear live log
        self.live_log_text.delete('1.0', tk.END)
        
        # Update rate limit status
        self.update_rate_limit_status()
        
        # Start spinner animation
        self.spinner_running = True
        self.update_spinner()
        
        mode_text = "TEST MODE" if self.test_mode_var.get() else "LIVE MODE"
        self.add_log_message(f"Starting Reddit monitoring in {mode_text}...", "INFO")
        
        # Start monitoring in a separate thread
        threading.Thread(target=self.monitor_subreddit, daemon=True).start()
    
    def update_status(self, message):
        """Update status label from any thread"""
        self.root.after(0, lambda: self.monitoring_status_label.config(text=message))
    
    def view_logs(self, log_type):
        """Open log files"""
        log_files = {
            "posts": self.posts_log_file,
            "comments": self.comments_log_file,
            "replies": self.replies_log_file,
            "analysis": self.analysis_log_file
        }
        
        log_file = log_files.get(log_type)
        if log_file and os.path.exists(log_file):
            try:
                os.startfile(log_file)
            except Exception as e:
                messagebox.showerror("Error", f"Could not open {log_type} log: {e}")
        else:
            messagebox.showwarning("Warning", f"{log_type} log file not found")
    
    def clear_live_log(self):
        """Clear the live log display"""
        self.live_log_text.delete('1.0', tk.END)
    
    def show_add_account_dialog(self):
        """Show dialog to add a new Reddit account"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Add Reddit Account")
        dialog.geometry("450x500")
        dialog.resizable(True, True)
        dialog.transient(self.root)
        dialog.grab_set()
        
        # Center the dialog
        dialog.update_idletasks()
        x = (dialog.winfo_screenwidth() // 2) - (450 // 2)
        y = (dialog.winfo_screenheight() // 2) - (500 // 2)
        dialog.geometry(f"450x500+{x}+{y}")
        
        # Create scrollable frame
        canvas = tk.Canvas(dialog)
        scrollbar = ttk.Scrollbar(dialog, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Create form
        main_frame = ttk.Frame(scrollable_frame, padding="20")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        ttk.Label(main_frame, text="Add New Reddit Account", font=("Arial", 14, "bold")).pack(pady=(0, 10))
        
        # Instructions
        instructions_text = """To add a Reddit account, you need to:

1. Create a Reddit App at https://www.reddit.com/prefs/apps
2. Get your Client ID and Client Secret from the app
3. Use your Reddit username and password
4. Get a Google Gemini API key from https://makersuite.google.com/app/apikey

All fields are required for the bot to function properly."""
        
        instructions_label = ttk.Label(main_frame, text=instructions_text, justify=tk.LEFT, wraplength=400)
        instructions_label.pack(pady=(0, 20))
        
        # Form fields
        ttk.Label(main_frame, text="Client ID (from Reddit App):").pack(anchor=tk.W, pady=2)
        client_id_entry = ttk.Entry(main_frame, width=50)
        client_id_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(main_frame, text="Client Secret (from Reddit App):").pack(anchor=tk.W, pady=2)
        client_secret_entry = ttk.Entry(main_frame, width=50, show="*")
        client_secret_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(main_frame, text="Reddit Username:").pack(anchor=tk.W, pady=2)
        username_entry = ttk.Entry(main_frame, width=50)
        username_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(main_frame, text="Reddit Password:").pack(anchor=tk.W, pady=2)
        password_entry = ttk.Entry(main_frame, width=50, show="*")
        password_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(main_frame, text="Google Gemini API Key:").pack(anchor=tk.W, pady=2)
        api_key_entry = ttk.Entry(main_frame, width=50, show="*")
        api_key_entry.pack(fill=tk.X, pady=(0, 20))
        
        # Buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        def add_account():
            client_id = client_id_entry.get().strip()
            client_secret = client_secret_entry.get().strip()
            username = username_entry.get().strip()
            password = password_entry.get().strip()
            api_key = api_key_entry.get().strip()
            
            if not all([client_id, client_secret, username, password, api_key]):
                messagebox.showerror("Error", "Please fill in all required fields including API Key!")
                return
            
            if self.add_account(client_id, client_secret, username, password, api_key):
                self.update_account_display()
                dialog.destroy()
                messagebox.showinfo("Success", f"Account {username} added successfully!")
        
        ttk.Button(button_frame, text="Add Account", command=add_account).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="Cancel", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
    
    def show_remove_account_dialog(self):
        """Show dialog to remove a Reddit account"""
        if len(self.accounts) <= 1:
            messagebox.showwarning("Warning", "Cannot remove the last account. At least one account is required.")
            return
        
        dialog = tk.Toplevel(self.root)
        dialog.title("Remove Reddit Account")
        dialog.geometry("400x300")
        dialog.resizable(False, False)
        dialog.transient(self.root)
        dialog.grab_set()
        
        # Center the dialog
        dialog.update_idletasks()
        x = (dialog.winfo_screenwidth() // 2) - (400 // 2)
        y = (dialog.winfo_screenheight() // 2) - (300 // 2)
        dialog.geometry(f"400x300+{x}+{y}")
        
        # Create form
        main_frame = ttk.Frame(dialog, padding="20")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        ttk.Label(main_frame, text="Remove Reddit Account", font=("Arial", 14, "bold")).pack(pady=(0, 20))
        
        ttk.Label(main_frame, text="Select account to remove:").pack(anchor=tk.W, pady=2)
        
        # Account listbox
        listbox_frame = ttk.Frame(main_frame)
        listbox_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        listbox = tk.Listbox(listbox_frame, height=8)
        listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        scrollbar = ttk.Scrollbar(listbox_frame, orient=tk.VERTICAL, command=listbox.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        listbox.config(yscrollcommand=scrollbar.set)
        
        # Populate listbox
        for i, account in enumerate(self.accounts):
            listbox.insert(tk.END, f"{i+1}. {account['username']}")
        
        # Buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        def remove_account():
            selection = listbox.curselection()
            if not selection:
                messagebox.showerror("Error", "Please select an account to remove!")
                return
            
            index = selection[0]
            username = self.accounts[index]['username']
            
            if messagebox.askyesno("Confirm", f"Are you sure you want to remove account '{username}'?"):
                if self.remove_account(index):
                    self.update_account_display()
                    dialog.destroy()
                    messagebox.showinfo("Success", f"Account {username} removed successfully!")
        
        ttk.Button(button_frame, text="Remove Account", command=remove_account).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="Cancel", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
    
    def show_accounts_list(self):
        """Show dialog with list of all accounts"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Reddit Accounts")
        dialog.geometry("500x400")
        dialog.resizable(False, False)
        dialog.transient(self.root)
        dialog.grab_set()
        
        # Center the dialog
        dialog.update_idletasks()
        x = (dialog.winfo_screenwidth() // 2) - (500 // 2)
        y = (dialog.winfo_screenheight() // 2) - (400 // 2)
        dialog.geometry(f"500x400+{x}+{y}")
        
        # Create form
        main_frame = ttk.Frame(dialog, padding="20")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        ttk.Label(main_frame, text="Reddit Accounts", font=("Arial", 14, "bold")).pack(pady=(0, 20))
        
        # Account listbox
        listbox_frame = ttk.Frame(main_frame)
        listbox_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        listbox = tk.Listbox(listbox_frame, height=15)
        listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        scrollbar = ttk.Scrollbar(listbox_frame, orient=tk.VERTICAL, command=listbox.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        listbox.config(yscrollcommand=scrollbar.set)
        
        # Populate listbox
        for i, account in enumerate(self.accounts):
            if hasattr(self, 'account_status') and i < len(self.account_status):
                status = "✓ Active" if self.account_status[i] else "✗ Failed"
            else:
                status = "✓ Active" if i < len(self.reddit_instances) else "✗ Failed"
            listbox.insert(tk.END, f"{i+1}. {account['username']} - {status}")
        
        # Buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        ttk.Button(button_frame, text="Close", command=dialog.destroy).pack(side=tk.RIGHT, padx=5)
    
    def update_account_display(self):
        """Update the account info display"""
        if self.accounts:
            # Count valid accounts
            valid_count = sum(self.account_status) if hasattr(self, 'account_status') else len(self.accounts)
            current_username = self.accounts[self.current_account_index]['username']
            status_text = f"Accounts: {valid_count}/{len(self.accounts)} Valid | Current: {current_username}"
            self.account_info_label.config(text=status_text)
        else:
            self.account_info_label.config(text="Active Accounts: 0 | Current: None")
        
        # Update rate limit status when accounts change
        self.update_rate_limit_status()
    
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
    
    def update_rate_limit_status(self):
        """Update rate limit status display"""
        if self.is_rate_limited():
            time_remaining = self.get_time_until_next_reply()
            formatted_time = self.format_time_remaining(time_remaining)
            status_text = f"Rate Limited: Next reply allowed in {formatted_time}"
            self.rate_limit_label.config(text=status_text, foreground="red")
        else:
            self.rate_limit_label.config(text="Rate Limit: Ready to reply", foreground="green")
    
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
            # Don't destroy the app, just show a warning
            messagebox.showwarning("Warning", "No valid Reddit accounts found. Please check your credentials or add new accounts through the UI.")
            return
        
        # Set primary reddit instance to first valid account
        for i, status in enumerate(self.account_status):
            if status:
                self.reddit = self.reddit_instances[i]
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
    
    def remove_account(self, index):
        """Remove a Reddit account"""
        if 0 <= index < len(self.accounts):
            username = self.accounts[index]['username']
            
            # Remove from lists
            self.accounts.pop(index)
            if index < len(self.reddit_instances):
                self.reddit_instances.pop(index)
            if index < len(self.account_status):
                self.account_status.pop(index)
            
            # Adjust current index if needed
            if self.current_account_index >= len(self.reddit_instances):
                self.current_account_index = 0
            
            # Save to file
            self.save_accounts_to_file()
            
            # Update account display
            self.update_account_display()
            
            self.add_log_message(f"Removed account: {username}", "INFO")
            return True
        return False
    
    def save_accounts_to_file(self):
        """Save all accounts to accounts.json file"""
        try:
            import json
            accounts_data = {
                "version": "1.0",
                "description": "Reddit Bot Multiple Accounts Configuration",
                "accounts": self.accounts
            }
            
            with open('accounts.json', 'w', encoding='utf-8') as f:
                json.dump(accounts_data, f, indent=2, ensure_ascii=False)
            
            print(f"Saved {len(self.accounts)} account(s) to accounts.json")
            
        except Exception as e:
            print(f"Error saving accounts: {e}")
            self.add_log_message(f"Error saving accounts: {e}", "ERROR")

if __name__ == "__main__":
    root = tk.Tk()
    app = RedditMonitorApp(root)
    root.mainloop()