import { BRAND } from '@/lib/brand';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicy() {
  return (
    <div className="hero-bg">
      <article className="container mx-auto px-3 sm:px-6 max-w-3xl py-16 sm:py-20 legal-prose">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-2" style={{ letterSpacing: '0.14em' }}>
          Legal
        </p>
        <h1 className="font-display text-4xl font-black text-dark-brown mb-2" style={{ letterSpacing: '-0.03em' }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-gold-dim">Last updated: 30 May 2026</p>

        <p>
          {BRAND.name} (&quot;we&quot;, &quot;us&quot;) operates the {BRAND.name} mobile application and the website at{' '}
          <a href={BRAND.url}>{BRAND.domain}</a>. This page explains what we collect, how we use it, and your rights.
        </p>

        <h2>1. Information we collect</h2>
        <h3>1.1 Account information</h3>
        <ul>
          <li><strong>Email address</strong> — used as your sign-in identifier (passwordless OTP).</li>
          <li><strong>Device identifier</strong> — generated locally so we can enforce the per-plan device limit.</li>
        </ul>

        <h3>1.2 Business data you create</h3>
        <ul>
          <li>Company profile (name, GSTIN, address, contact details).</li>
          <li>Customers (names, GSTINs, billing addresses).</li>
          <li>Invoices, delivery challans, e-way bills, quotations, proformas, POS bills.</li>
          <li>Payments recorded against customers / invoices.</li>
          <li>Products in your catalog.</li>
        </ul>
        <p>This data is stored in Supabase (an encrypted PostgreSQL backend) and, if you opt in, mirrored to your own Google Drive backup.</p>

        <h3>1.3 Analytics and diagnostics</h3>
        <p>We use anonymous crash reports and basic usage analytics (screens visited, feature usage frequency) to improve the app. No invoice contents or customer data are sent in analytics.</p>

        <h2>2. How we use your data</h2>
        <ul>
          <li>To provide the app&apos;s core function (creating, storing, and exporting your invoices).</li>
          <li>To sync your data across the devices you sign in on.</li>
          <li>To send transactional notifications (e.g., overdue invoice reminders) — opt-out from in-app settings.</li>
          <li>To enforce plan limits (free / pro / business).</li>
        </ul>
        <p>We never sell your data to third parties. We do not run advertising in {BRAND.name}.</p>

        <h2>3. Data storage and security</h2>
        <ul>
          <li>All data is encrypted in transit (TLS 1.2+) and at rest (Supabase managed encryption).</li>
          <li>Row-Level Security policies ensure you can only read / write your own data.</li>
          <li>Google Drive backups are stored in your own Drive&apos;s <code>appData</code> scope — only the {BRAND.name} app can read them, no other Drive app can.</li>
          <li>Push notification tokens are stored solely to deliver app notifications.</li>
        </ul>

        <h2>4. Third-party services</h2>
        <ul>
          <li><strong>Supabase</strong> — database + authentication (data hosted in their secure cloud).</li>
          <li><strong>Google Sign-In / Drive</strong> — used only if you connect Drive backup. We request the minimum scope (<code>drive.appdata</code>).</li>
          <li><strong>Google Play Billing</strong> — used to process subscription purchases (Pro / Business). We never see your payment details.</li>
          <li><strong>India Post PIN lookup</strong> — public API used to auto-fill city/state from a PIN code. No personal data is sent.</li>
          <li><strong>Firebase Cloud Messaging</strong> — used to deliver push notifications.</li>
        </ul>

        <h2>5. Your rights</h2>
        <ul>
          <li><strong>Access</strong> — view all your stored data from inside the app.</li>
          <li><strong>Export</strong> — generate PDFs of every invoice / report.</li>
          <li><strong>Delete</strong> — from <em>Settings → Delete Account</em>. This permanently removes your data from our servers within 7 days.</li>
          <li><strong>Disconnect Drive</strong> — revoke Drive access any time from <em>Settings → Backup</em>.</li>
        </ul>

        <h2>6. Data retention</h2>
        <p>Soft-deleted invoices, customers, and payments remain in trash for 30 days before being permanently dropped. Account deletion is permanent and irrecoverable after 7 days.</p>

        <h2>7. Children&apos;s privacy</h2>
        <p>{BRAND.name} is intended for use by business owners aged 18 or older. We do not knowingly collect data from children.</p>

        <h2>8. Changes to this policy</h2>
        <p>If we materially change this policy, we will notify you inside the app and update the &quot;Last updated&quot; date at the top of this page.</p>

        <h2>9. Contact</h2>
        <p>
          Questions? Email us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
        </p>
      </article>
    </div>
  );
}
