'use client';
import {
  Receipt, Calculator, CloudUpload, Globe, FileText, Banknote,
  Smartphone, Lock, Users, Package, BarChart3, FileSignature,
  Repeat, Wallet, FileMinus, Scale, FileSpreadsheet, ShoppingBag, ArrowUpCircle,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';

const features = [
  { icon: Receipt,      title: '5 Document Types',         body: 'Tax Invoice, Delivery Challan, Proforma, Quotation, POS Bill — each with its own number sequence.' },
  { icon: Calculator,   title: 'Per-Line GST Rates',       body: 'Mix products at 5%, 12%, 18%, 28% in one invoice. CGST/SGST or IGST is decided automatically.' },
  { icon: FileText,     title: '5 Premium PDF Templates',  body: 'Classic Gold, Modern Midnight, Corporate Sapphire, Elegant Rose, Compact Emerald.' },
  { icon: CloudUpload,  title: 'Google Drive Backup',      body: 'One-tap auto-sync to your own Drive (appData scope — only GSTify can read it). Restore in seconds.' },
  { icon: Globe,        title: 'Offline-First',            body: 'Create invoices without a network. Everything syncs the moment you reconnect.' },
  { icon: Banknote,     title: 'Smart Payment Allocation', body: 'Record one customer payment — we auto-split it across the oldest pending invoices.' },
  { icon: Users,        title: 'Outstanding Balance',      body: 'Live per-customer running balance. Excludes estimates (proforma/quotation) and counter sales (POS).' },
  { icon: Package,      title: 'Product Catalog',          body: 'Save top sellers with HSN, rate, unit. Add to an invoice with one tap.' },
  { icon: BarChart3,    title: 'GST Reports',              body: 'Monthly sales, GST split (CGST/SGST/IGST), top customers — exportable as PDF.' },
  { icon: FileSpreadsheet, title: 'GSTR Filing Pages',     body: 'Dedicated GSTR-1, GSTR-2, GSTR-3B and GSTR-9 pages — pick the period, preview every section, export as CSV, JSON or PDF.' },
  { icon: Scale,        title: 'GST Ledger',               body: 'Output GST minus Input GST = your net payable. Record each GST challan and watch the balance settle to zero.' },
  { icon: ShoppingBag,  title: 'Walk-in POS Billing',      body: 'Bill counter sales without picking a customer — or jot a quick name, phone and GSTIN. Nothing slows the queue.' },
  { icon: ArrowUpCircle, title: 'Upgrade-Safe Data',       body: 'Move from Free to Pro and every invoice, customer, product and payment is uploaded to the cloud automatically.' },
  { icon: Repeat,       title: 'Recurring Invoices',       body: 'Set a weekly, monthly, quarterly or yearly schedule and GSTify auto-generates each invoice for you. (Pro)' },
  { icon: Wallet,       title: 'Expense Tracking',         body: 'Log business costs by category with GST and vendor details — keep spending and input credit in one place.' },
  { icon: FileMinus,    title: 'Credit Notes',             body: 'Issue a credit note against any invoice with partial returns, a reason, and optional stock restock.' },
  { icon: Scale,        title: 'Balance Sheet',            body: 'A live snapshot of assets, liabilities and equity — derived straight from your invoices, payments and stock.' },
  { icon: FileSignature, title: 'Signature + Branding',    body: 'Upload your logo and signature once. They appear on every invoice automatically.' },
  { icon: Smartphone,   title: 'Built for Mobile',         body: 'Designed Android-first. Smooth animations, gesture-friendly, premium typography.' },
  { icon: Lock,         title: 'Biometric Lock',           body: 'Optional fingerprint / face unlock at launch. Your invoice data stays locked when your phone is.' },
];

export default function Features() {
  return (
    <div className="hero-bg noise-overlay">
      <section className="container mx-auto px-3 sm:px-6 max-w-6xl pt-20 sm:pt-24 pb-20 sm:pb-28">
        <SectionHeading
          eyebrow="Features"
          title={<>Everything an Indian SMB <span className="gradient-text italic">needs to bill.</span></>}
          body="The features that used to require a desktop accounting suite — packed into a phone you already carry."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 6) * 50}
                    className="lux-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 group">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl gold-gradient mb-4 shadow-[0_4px_14px_rgba(168,126,30,0.30)] group-hover:shadow-[0_8px_22px_rgba(168,126,30,0.45)] transition-shadow">
                <f.icon className="h-6 w-6 text-dark-brown" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-lg font-extrabold text-dark-brown mb-1.5" style={{ letterSpacing: '-0.02em' }}>
                {f.title}
              </h3>
              <p className="text-[14px] text-gold-dim leading-relaxed">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
