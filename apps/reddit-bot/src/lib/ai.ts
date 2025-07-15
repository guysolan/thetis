import OpenAI from 'openai';

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async analyzePost(title: string, content: string, subreddit: string): Promise<{
    isRelevant: boolean;
    confidence: number;
    topics: string[];
    reasoning: string;
  }> {
    const prompt = `
Analyze this Reddit post to determine if it's relevant for a medical equipment company that specializes in Achilles rupture recovery equipment.

Subreddit: r/${subreddit}
Title: ${title}
Content: ${content}

Please respond with a JSON object containing:
- isRelevant: boolean (true if related to Achilles injuries, sports medicine, physical therapy, or recovery equipment)
- confidence: number (0-1, how confident you are in this assessment)
- topics: string[] (main topics/keywords identified)
- reasoning: string (brief explanation of your decision)

Focus on posts about:
- Achilles tendon injuries or ruptures
- Sports injuries and recovery
- Physical therapy and rehabilitation
- Medical equipment for recovery
- Athletic injury prevention
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from AI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error analyzing post:', error);
      return {
        isRelevant: false,
        confidence: 0,
        topics: [],
        reasoning: 'Error in analysis',
      };
    }
  }

  async generateReply(title: string, content: string, subreddit: string): Promise<string> {
    const prompt = `
Generate a helpful, empathetic reply to this Reddit post. You represent a medical equipment company that specializes in Achilles rupture recovery.

Subreddit: r/${subreddit}
Title: ${title}
Content: ${content}

Guidelines:
- Be helpful and informative
- Show empathy for their situation
- Provide valuable insights about Achilles recovery
- Mention relevant equipment if appropriate (splints, boots, etc.)
- Keep it conversational and authentic
- Don't be overly promotional
- Include personal touch and understanding
- Maximum 200 words
- End with an encouraging note

Focus on:
- Recovery timelines and expectations
- Equipment that can help with recovery
- Tips for rehabilitation
- Emotional support for the recovery journey
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating reply:', error);
      throw error;
    }
  }

  async shouldReplyToComment(commentContent: string, postContext: string): Promise<{
    shouldReply: boolean;
    confidence: number;
    reasoning: string;
  }> {
    const prompt = `
Analyze this comment to determine if we should reply with helpful information about Achilles recovery.

Post Context: ${postContext}
Comment: ${commentContent}

Determine if this comment:
- Is asking for advice about Achilles recovery
- Mentions struggles with recovery equipment
- Expresses frustration or confusion about treatment
- Could benefit from professional equipment recommendations

Respond with JSON:
- shouldReply: boolean
- confidence: number (0-1)
- reasoning: string
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 200,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from AI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error analyzing comment:', error);
      return {
        shouldReply: false,
        confidence: 0,
        reasoning: 'Error in analysis',
      };
    }
  }
}