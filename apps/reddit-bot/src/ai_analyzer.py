"""AI content analyzer using Google Gemini."""

import google.generativeai as genai
from typing import Tuple, Optional
from loguru import logger

from .config import MedicalContent


class AIAnalyzer:
    """Handles AI-based content analysis using Google Gemini."""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize AI analyzer with API key."""
        self.model = None
        self.medical_content = MedicalContent()
        
        if api_key:
            self.initialize_model(api_key)
    
    def initialize_model(self, api_key: str):
        """Initialize the Gemini model with API key."""
        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            logger.success("Gemini API initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Gemini API: {e}")
            self.model = None
    
    def analyze_content(self, content_text: str, content_type: str, topic_filter: str) -> Tuple[bool, str]:
        """Analyze content and decide whether to reply."""
        if not self.model:
            logger.warning("AI model not available")
            return False, "AI model not available"
        
        try:
            # Build the analysis prompt
            analysis_prompt = self._build_analysis_prompt(content_text, content_type, topic_filter)
            
            # Generate response
            response = self.model.generate_content(analysis_prompt)
            response_text = response.text.strip()
            
            # Parse the response
            if response_text.startswith("YES REPLY NEEDED"):
                reply_text = response_text.replace("YES REPLY NEEDED", "").strip()
                return True, reply_text
            elif response_text.startswith("NO REPLY NEEDED"):
                return False, response_text
            else:
                # If response doesn't follow expected format, default to no reply
                logger.warning(f"Unexpected AI response format: {response_text[:100]}...")
                return False, "Response format unclear"
                
        except Exception as e:
            logger.error(f"Error in AI analysis: {e}")
            return False, f"AI analysis error: {str(e)}"
    
    def _build_analysis_prompt(self, content_text: str, content_type: str, topic_filter: str) -> str:
        """Build the analysis prompt for the AI."""
        return f"""
        You are a helpful Reddit user who has personal experience with Achilles tendon injuries and recovery. You're responding to someone who needs advice or information.

        CONTENT TO ANALYZE ({content_type.upper()}):
        {content_text}

        USER'S TOPIC FILTER (content should be related to):
        {topic_filter}

        MEDICAL CONTEXT (available for medical topics):
        {self.medical_content.thetis_splint}
        {self.medical_content.achilles_recovery}
        {self.medical_content.faqs}

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

        TASK:
        1. Determine if this {content_type} is specifically about the topics in the user's filter: {topic_filter}
        2. If it's NOT related to the specified topics, respond with "NO REPLY NEEDED"
        3. If it IS related to the specified topics, decide if you should provide helpful information
        4. Your response must start with either "YES REPLY NEEDED" or "NO REPLY NEEDED"
        5. If YES, provide a helpful, conversational response that sounds like it's from a real person
        6. Keep responses friendly, empathetic, and focused on helping the person
        7. Base all medical advice on the three specified websites only
        8. Include relevant citations to the source websites when appropriate
        9. Make it sound like you're sharing helpful info you found, not like you're an AI assistant

        RESPONSE FORMAT:
        [YES/NO] REPLY NEEDED
        [Your detailed response if YES, or brief explanation if NO]
        """
    
    def check_keywords_in_response(self, response: str, topic_filter: str) -> Tuple[bool, list]:
        """Check if AI response contains required keywords from the topic filter."""
        # Extract keywords from the topic filter
        topic_keywords = []
        if topic_filter:
            # Split by common separators and clean up
            keywords = topic_filter.lower().replace(',', ' ').replace(';', ' ').replace('\n', ' ').split()
            # Filter out common words and keep meaningful keywords
            common_words = ['and', 'or', 'the', 'a', 'an', 'to', 'for', 'in', 'on', 'at', 'by', 'with', 
                          'about', 'related', 'content', 'topics', 'should', 'be']
            topic_keywords = [word.strip() for word in keywords 
                            if word.strip() and word.strip() not in common_words and len(word.strip()) > 2]
        
        # If no topic keywords found, use a minimum set of general keywords
        if not topic_keywords:
            topic_keywords = ['helpful', 'information', 'relevant', 'topic']
        
        response_lower = response.lower()
        found_keywords = [keyword for keyword in topic_keywords if keyword in response_lower]
        
        # Require at least 2 keywords for a valid response
        return len(found_keywords) >= 2, found_keywords