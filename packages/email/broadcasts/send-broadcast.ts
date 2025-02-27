import { EmailBroadcast, EmailRecipient } from './types.ts';
import resend from '../config/resend-client.ts';

export async function sendBroadcastToAudience(
  recipients: EmailRecipient[],
  broadcast: EmailBroadcast
) {
  const errors: Array<{ email: string; error: Error }> = [];
  const successful: string[] = [];

  // Send emails in batches of 100 to avoid rate limits
  const batchSize = 100;
  
  
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (recipient) => {
        try {
          await resend.emails.send({
            from: broadcast.from,
            to: recipient.email,
            subject: broadcast.subject,
            html: broadcast.content.html,
            text: broadcast.content.text,
            reply_to: broadcast.replyTo,
            tags: [
              { name: 'broadcast_id', value: broadcast.id },
              { name: 'broadcast_name', value: broadcast.name || '' }
            ]
          });
          
          successful.push(recipient.email);
        } catch (error) {
          errors.push({ 
            email: recipient.email, 
            error: error as Error 
          });
        }
      })
    );

    // Add a small delay between batches to respect rate limits
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return {
    successful,
    errors,
    totalSent: successful.length,
    totalFailed: errors.length
  };
}

// Helper function to schedule a broadcast for later
export async function scheduleBroadcastDelivery(
  recipients: EmailRecipient[],
  broadcast: EmailBroadcast
) {
  if (!broadcast.scheduledFor) {
    throw new Error('Scheduled date is required');
  }

  const now = new Date();
  const scheduleDate = new Date(broadcast.scheduledFor);
  
  if (scheduleDate <= now) {
    throw new Error('Scheduled date must be in the future');
  }

  // Calculate delay in milliseconds
  const delay = scheduleDate.getTime() - now.getTime();

  // Schedule the broadcast
  setTimeout(async () => {
    await sendBroadcastToAudience(recipients, broadcast);
  }, delay);

  return {
    broadcastId: broadcast.id,
    scheduledFor: scheduleDate,
    recipientCount: recipients