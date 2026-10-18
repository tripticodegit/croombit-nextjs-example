import type { Metadata } from 'next';
import Script from 'next/script';
import { CookieSettingsLink } from './cookie-settings-link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Acme',
  description: 'A small Next.js site with analytics and a signup form.',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics waits for consent: type="text/plain" keeps these inert until the
            visitor grants "analytics", then Croombit runs them. Consent Mode v2 defaults
            (all denied) are set before they load. */}
        <script type="text/plain" data-tc-consent="analytics" async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          type="text/plain"
          data-tc-consent="analytics"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Croombit consent banner — beforeInteractive: loaded before any other script. */}
        <Script
          src="https://croombit.com/cmp.js"
          strategy="beforeInteractive"
          data-tc-api-key={process.env.NEXT_PUBLIC_CROOMBIT_KEY}
        />
        <main>{children}</main>
        <footer>
          © Acme · <CookieSettingsLink />
        </footer>
      </body>
    </html>
  );
}
