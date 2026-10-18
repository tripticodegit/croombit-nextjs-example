# Croombit + Next.js example

A small Next.js site, **Acme**, taken from "Google Analytics loads for everyone" to a GDPR cookie banner with prior blocking and consent records with proof. Everything is set up by an AI coding agent through the [Croombit MCP server](https://croombit.com/en/mcp): no console, no config files written by hand.

Each step is one commit, so you can see exactly what changed:

| Commit | What |
|---|---|
| `Acme: a Next.js site…` | The starting point: Google Analytics loaded unconditionally and a signup form with a newsletter checkbox. |
| `Cookie banner via the Croombit MCP server…` | **Step 1 — the cookie banner.** |
| `Signup consents recorded with proof…` | **Step 2 — every other consent.** |

## How long it took

The agent's own work (the MCP tool calls plus the code edits), measured on 18 October 2026:

| Step | Started | Done | Agent time |
|---|---|---|---|
| 1. Cookie banner | 11:44:05 UTC | 11:44:23 UTC | 18 s |
| 2. Signup consents | 11:47:35 UTC | 11:47:56 UTC | 21 s |

Add the time it takes you to connect the server once (one browser sign-in) and to read and approve what the agent does. The "5 minutes for the banner, 10 for every consent" on croombit.com is that whole experience, not the agent's raw speed.

## Step 1 — the cookie banner

Connect the server once (Claude Code shown here; every other client is on [croombit.com/en/mcp](https://croombit.com/en/mcp)):

```bash
claude mcp add --transport http Croombit https://mcp.croombit.com/mcp
```

Then the prompt:

> Using Croombit: create a site called "Acme" in English and Spanish, and add the domain example.com. Keep the cookie categories it comes with. Write the cookie banner text in English and Spanish, with a floating button to reopen it, and publish the banner. Create a TEST publishable key for localhost:3000, add the Croombit script tag to this project's root layout, and make sure our analytics and ad scripts only run after consent.

What the agent did:

1. `create_site`: the site, in English and Spanish. It comes with four published cookie categories (Necessary, Preferences, Performance, Marketing), already translated.
2. `add_domain`: example.com, which returns the DNS record to publish before going live.
3. `update_banner` and `publish_banner`: the banner copy in both languages, then version 1, which every decision will cite.
4. `create_api_key`: a TEST `pk_` key that only accepts `localhost:3000`.
5. Code ([app/layout.tsx](app/layout.tsx)):
   - `cmp.js` loads with `next/script` and `strategy="beforeInteractive"`;
   - the Google Analytics tags become `type="text/plain" data-tc-consent="analytics"`, so they wait for the visitor;
   - a *Cookie settings* link in the footer reopens the panel.

Checked in a browser:
- **Before any choice:** Google Analytics isn't requested, and Consent Mode v2 starts with everything `denied`.
- **Reject all:** still nothing loads.
- **Turning on only *Performance*:** gtag.js loads, with `analytics_storage: granted` and `ad_storage: denied`.
- **The vault:** every decision is recorded there.

## Step 2 — every other consent

> Using Croombit: add consent statements for our newsletter (email marketing opt-in) and for accepting the terms of service, in English and Spanish, and publish them. Create a TEST secret key limited to recording consent, put it in .env.local as CROOMBIT_SECRET_KEY, and record each user's choices from our signup action with @croombit/sdk.

What the agent did:

1. `create_consent_statement` ×2, `set_purpose_texts` and `publish_purpose`: `newsletter` (consent) and `terms` (contract), each with versioned English and Spanish text.
2. `create_api_key`: a TEST `sk_` key with only the `consent:write` scope.
3. Code ([app/actions.ts](app/actions.ts)): the signup server action records both choices with `@croombit/sdk`. Each record cites the exact published wording and comes back with an Ed25519-signed receipt.

Checked: submitting the form as `ana@example.com` creates that subject in the vault with `newsletter` and `terms` both `GRANTED`.

## Run it yourself

```bash
cp .env.example .env.local   # your pk_test_ / sk_test_ keys
npm install
npm run dev                  # http://localhost:3000
```

The keys come from your own Croombit organization: the free plan includes the MCP server and 1,000 consent events a month. To go live, verify your domain and create a LIVE key in the console. The agent can't do either, on purpose.

## Make it stick

Paste [croombit.com/agent-rules.md](https://croombit.com/agent-rules.md) into your `AGENTS.md`, `CLAUDE.md` or Cursor rules, so the next tracker your agent adds also waits for consent.
