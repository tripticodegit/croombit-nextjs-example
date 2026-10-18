'use server';

import { redirect } from 'next/navigation';

export async function signup(form: FormData) {
  const email = String(form.get('email'));
  // …create the account in your database.
  console.log('signup', email, { newsletter: form.get('newsletter') === 'on' });
  redirect('/?welcome=1');
}
