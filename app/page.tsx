import { signup } from './actions';

export default function Home() {
  return (
    <>
      <h1>Acme</h1>
      <p>Sign up for an account.</p>
      <form action={signup}>
        <label>
          Email <input type="email" name="email" required />
        </label>
        <label>
          <input type="checkbox" name="newsletter" /> Send me the monthly newsletter
        </label>
        <label>
          <input type="checkbox" name="terms" required /> I accept the terms of service
        </label>
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
