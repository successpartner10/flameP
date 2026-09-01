/**
 * Configuration for CMS Admin Access and Whitelist
 * Only emails in ALLOWED_ADMIN_EMAILS are granted access to the Admin CMS Panel.
 * Any other email will be denied and signed out immediately.
 */

export const ALLOWED_ADMIN_EMAILS: string[] = [
  'syashpal1510@gmail.com',
];

/**
 * Validates whether an email is an authorized CMS administrator.
 */
export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ALLOWED_ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === normalized);
}
