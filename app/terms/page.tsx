import { BRAND } from '@/lib/brand';

export const metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${BRAND.name} — the GST billing app for Indian small businesses.`,
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <div className="hero-bg">
      <article className="container mx-auto px-3 sm:px-6 max-w-3xl py-16 sm:py-20 legal-prose">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-2" style={{ letterSpacing: '0.14em' }}>
          Legal
        </p>
        <h1 className="font-display text-4xl font-black text-dark-brown mb-2" style={{ letterSpacing: '-0.03em' }}>
          Terms of Service
        </h1>
        <p className="text-sm text-gold-dim">Last updated: 9 June 2026</p>

        <p>
          By installing and using {BRAND.name} (the &quot;App&quot;) or by visiting <a href={BRAND.url}>{BRAND.domain}</a>, you agree to these Terms. If you do not agree, please uninstall the App and stop using the website.
        </p>

        <h2>1. The Service</h2>
        <p>{BRAND.name} is a mobile application for creating GST-compliant invoices, delivery challans, proforma invoices, quotations, and POS bills, and for tracking customers and payments. The App is provided &quot;as is&quot;.</p>

        <h2>2. Accounts</h2>
        <ul>
          <li>You sign in with email + one-time password (OTP). You are responsible for keeping access to the email account secure.</li>
          <li>You must be at least 18 years old to use the App.</li>
          <li>One account is meant for one business. Sharing your account with multiple businesses violates these Terms.</li>
        </ul>

        <h2>3. Plans and payment</h2>
        <ul>
          <li><strong>Free plan</strong>: includes 50 invoices/month, 50 customers, 30 products, 1 device. The App adds a small &quot;Generated with GSTify&quot; watermark to free-plan invoice PDFs.</li>
          <li><strong>Pro</strong> (₹199/month or ₹1,499/year): unlimited invoices, customers, products; 3 devices; no watermark; GST auto-fetch by GSTIN; all premium templates.</li>
          <li><strong>Business</strong> (₹399/month or ₹2,999/year): everything in Pro, plus up to 5 devices and PC/web login.</li>
          <li>Subscriptions are billed by Google Play and renew automatically until cancelled. Cancel any time from Google Play → Subscriptions.</li>
          <li>Refunds are handled per Google Play&apos;s refund policy.</li>
        </ul>

        <h2>4. Your data and content</h2>
        <ul>
          <li>You own all data you create in the App (invoices, customers, payments, etc.). {BRAND.name} only stores and processes it to deliver the service.</li>
          <li>You grant us a limited license to store, process, and display your data inside the App so we can provide the service.</li>
          <li>You are responsible for the accuracy of the data you enter, including GST numbers and tax rates.</li>
        </ul>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the App for unlawful purposes or to generate fraudulent invoices.</li>
          <li>Attempt to reverse-engineer, decompile, or extract our source code.</li>
          <li>Resell access to the App or impersonate another business.</li>
          <li>Abuse the free plan by creating multiple accounts to bypass the monthly invoice cap.</li>
        </ul>

        <h2>6. Tax compliance</h2>
        <p>{BRAND.name} helps you produce GST-format invoices. It is your responsibility to verify that the rates, HSN codes, and customer GSTIN you enter are correct, and to file your GST returns on time. {BRAND.name} is not a tax-advisory service.</p>

        <h2>7. Service availability</h2>
        <p>We make reasonable efforts to keep the App available 24×7 but do not guarantee uptime. The App works offline for most operations and syncs when the network returns; brief sync interruptions are expected.</p>

        <h2>8. Termination</h2>
        <ul>
          <li>You can delete your account any time from <em>Settings → Delete Account</em>.</li>
          <li>We may suspend or terminate your account if you breach these Terms, attempt to bypass plan limits, or use the App fraudulently.</li>
        </ul>

        <h2>9. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, {BRAND.name} is not liable for indirect, incidental, or consequential damages. Our total aggregate liability in any 12-month period is capped at the fees you paid us during that period (₹0 for free-plan users).</p>

        <h2>10. Changes to the Terms</h2>
        <p>We may update these Terms occasionally. Material changes will be notified in the App. Continued use after notification constitutes acceptance.</p>

        <h2>11. Governing law</h2>
        <p>These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts in Delhi.</p>

        <h2>12. Contact</h2>
        <p>For questions about these Terms, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>
      </article>
    </div>
  );
}
