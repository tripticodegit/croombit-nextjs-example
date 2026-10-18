'use client';

// Any element with data-tc-open-preferences reopens the consent panel,
// pre-set to the visitor's current choices.
export function CookieSettingsLink() {
  return (
    <a href="#" data-tc-open-preferences>
      Cookie settings
    </a>
  );
}
