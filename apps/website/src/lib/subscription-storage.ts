/**
 * Utility functions for managing subscription status in localStorage
 */

const SUBSCRIBED_EMAILS_KEY = "thetis_subscribed_emails";

/**
 * Check if an email has already subscribed
 */
export function isEmailSubscribed(email: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const subscribedEmails = getSubscribedEmails();
    return subscribedEmails.includes(normalizedEmail);
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}

/**
 * Mark an email as subscribed
 */
export function markEmailAsSubscribed(email: string): void {
  if (typeof window === "undefined") return;

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const subscribedEmails = getSubscribedEmails();

    if (!subscribedEmails.includes(normalizedEmail)) {
      subscribedEmails.push(normalizedEmail);
      localStorage.setItem(
        SUBSCRIBED_EMAILS_KEY,
        JSON.stringify(subscribedEmails),
      );
    }
  } catch (error) {
    console.error("Error saving subscription status:", error);
  }
}

/**
 * Get all subscribed emails from localStorage
 */
function getSubscribedEmails(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(SUBSCRIBED_EMAILS_KEY);
    if (!stored) return [];

    const emails = JSON.parse(stored);
    return Array.isArray(emails) ? emails : [];
  } catch (error) {
    console.error("Error reading subscription status:", error);
    return [];
  }
}

/**
 * Check if any email has subscribed (for hiding all subscribe blocks)
 */
export function hasAnySubscription(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const subscribedEmails = getSubscribedEmails();
    return subscribedEmails.length > 0;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}
