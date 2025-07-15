import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysisResult, MedicalContent } from '../types/index.js';
import logger from '../utils/logger.js';

export class AIAnalyzer {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private medicalContent: MedicalContent;
  
  constructor(apiKey: string | undefined, medicalContent: MedicalContent) {
    this.medicalContent = medicalContent;
    if (apiKey) {
      this.initializeModel(apiKey);
    }
  }
  
  private initializeModel(apiKey: string): void {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      logger.success('Gemini API initialized successfully');
    } catch (error) {
      logger.error(`Error initializing Gemini API: ${error}`);
      this.model = null;
    }
  }
  
  async analyzeContent(
    contentText: string, 
    contentType: string, 
    topicFilter: string
  ): Promise<AIAnalysisResult> {
    if (!this.model) {
      logger.warn('AI model not available');
      return {
        should_reply: false,
        response: 'AI model not available'
      };
    }
    
    try {
      const prompt = this.buildAnalysisPrompt(contentText, contentType, topicFilter);
      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text().trim();
      
      // Parse the response
      if (responseText.startsWith('YES REPLY NEEDED')) {
        const replyText = responseText.replace('YES REPLY NEEDED', '').trim();
        return {
          should_reply: true,
          response: replyText
        };
      } else if (responseText.startsWith('NO REPLY NEEDED')) {
        return {
          should_reply: false,
          response: responseText
        };
      } else {
        logger.warn(`Unexpected AI response format: ${responseText.substring(0, 100)}...`);
        return {
          should_reply: false,
          response: 'Response format unclear'
        };
      }
      
    } catch (error) {
      logger.error(`Error in AI analysis: ${error}`);
      return {
        should_reply: false,
        response: `AI analysis error: ${error}`
      };
    }
  }
  
  private buildAnalysisPrompt(contentText: string, contentType: string, topicFilter: string): string {
    return `
    You are a helpful Reddit user who has personal experience with Achilles tendon injuries and recovery. You're responding to someone who needs advice or information.

    CONTENT TO ANALYZE (${contentType.toUpperCase()}):
    ${contentText}

    USER'S TOPIC FILTER (content should be related to):
    ${topicFilter}

    MEDICAL CONTEXT (available for medical topics):
    ${this.medicalContent.thetis_splint}
    ${this.medicalContent.achilles_recovery}
    ${this.medicalContent.faqs}

    IMPORTANT RULES:
    1. ONLY reply if the content is DIRECTLY related to the user's topic filter: ${topicFilter}
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
    1. Determine if this ${contentType} is specifically about the topics in the user's filter: ${topicFilter}
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
    `;
  }
  
  checkKeywordsInResponse(response: string, topicFilter: string): AIAnalysisResult {
    // Extract keywords from the topic filter
    const keywords = topicFilter
      .toLowerCase()
      .replace(/[,;]/g, ' ')
      .split(/\s+/)
      .filter(word => {
        const commonWords = [
          'and', 'or', 'the', 'a', 'an', 'to', 'for', 'in', 'on', 'at', 
          'by', 'with', 'about', 'related', 'content', 'topics', 'should', 'be'
        ];
        return word.length > 2 && !commonWords.includes(word);
      });
    
    const topicKeywords = keywords.length > 0 ? keywords : ['helpful', 'information', 'relevant', 'topic'];
    
    const responseLower = response.toLowerCase();
    const foundKeywords = topicKeywords.filter(keyword => responseLower.includes(keyword));
    
    // Require at least 2 keywords for a valid response
    const hasEnoughKeywords = foundKeywords.length >= 2;
    
    return {
      should_reply: hasEnoughKeywords,
      response: hasEnoughKeywords ? response : 'Response lacks required keywords',
      keywords_found: foundKeywords
    };
  }
}