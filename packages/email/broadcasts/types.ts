export interface EmailBroadcast {
    id: string;
    audienceId: string;
    from: string;
    subject: string;
    content: {
        html: string;
        text?: string;
    };
    replyTo?: string | string[];
    name?: string;
    scheduledFor?: Date;
}

export interface EmailRecipient {
    email: string;
    data?: Record<string, any>; // For template variables
}
