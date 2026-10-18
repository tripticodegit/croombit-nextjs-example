'use server';

import { redirect } from 'next/navigation';
import { CroombitClient } from '@croombit/sdk';

// Server side only: the secret key never reaches the browser.
const croombit = new CroombitClient({
  baseUrl: 'https://api.croombit.com',
  apiKey: process.env.CROOMBIT_SECRET_KEY!,
});

export async function signup(form: FormData) {
  const email = String(form.get('email'));
  // …create the account in your database.

  // Record both choices in the Croombit vault, each against the exact published
  // wording of its statement, with a signed receipt.
  const subject = `email:${email}`;
  await Promise.all([
    croombit.recordConsent(
      { subject, purpose: 'terms', state: 'GRANTED', channel: 'signup_form' },
      { idempotencyKey: crypto.randomUUID() },
    ),
    croombit.recordConsent(
      { subject, purpose: 'newsletter', state: form.get('newsletter') === 'on' ? 'GRANTED' : 'DENIED', channel: 'signup_form' },
      { idempotencyKey: crypto.randomUUID() },
    ),
  ]);

  redirect('/?welcome=1');
}
