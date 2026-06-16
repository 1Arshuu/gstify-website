'use client';
import { useEffect, useRef, useState } from 'react';
import { IndianRupee, FileText, Percent, Users, ArrowUpRight, Activity, Command } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Counter } from '@/components/Counter';

const MUTED = '#9793A6';

type Kpi = { icon: LucideIcon; label: string; to: number; prefix?: string; suffix?: string; delta: string; accent: string; spark: number[] };

const kpis: Kpi[] = [
  { icon: IndianRupee, label: 'Total billed · 30d', to: 482600, prefix: '₹', delta: '+18%', accent: '#E8C97A', spark: [12, 18, 14, 22, 20, 28, 34] },
  { icon: FileText,    label: 'Invoices · 30d',     to: 1284,            delta: '+9%',  accent: '#5EEAD4', spark: [20, 19, 24, 22, 28, 26, 31] },
  { icon: Percent,     label: 'GST collected',      to: 73400, prefix: '₹', delta: '+12%', accent: '#A78BFA', spark: [8, 11, 10, 14, 13, 17, 19] },
  { icon: Users,       label: 'Active customers',   to: 342,             delta: '+5%',  accent: '#C9A86A', spark: [22, 23, 22, 25, 27, 26, 29] },
];

// Monthly revenue heights (% of track) — illustrative.
const bars = [44, 60, 52, 71, 64, 83, 92];
const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const gst = [
  { label: 'CGST', pct: 38, color: '#E8C97A' },
  { label: 'SGST', pct: 38, color: '#5EEAD4' },
  { label: 'IGST', pct: 24, color: '#A78BFA' },
];
const donutBg = `conic-gradient(#E8C97A 0 38%, #5EEAD4 38% 76%, #A78BFA 76% 100%)`;

const recent = [
  { id: 'INV-2207', who: 'Sharma Textiles',  amt: '₹21,772', status: 'Paid',    color: '#34D399' },
  { id: 'INV-2206', who: 'Verma Traders',     amt: '₹8,450',  status: 'Pending', color: '#E8C97A' },
  { id: 'CHL-0118', who: 'Bose & Co',         amt: '₹14,300', status: 'Sent',    color: '#5EEAD4' },
  { id: 'INV-2205', who: 'Iyer Stores',       amt: '₹15,300', status: 'Paid',    color: '#34D399' },
];

/** Inline sparkline from a series of values. */
function Spark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 96, h = 30;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className="overflow-visible">
      <polyline points={pts} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 4px ${color}99)` }} />
    </svg>
  );
}

/**
 * Fintech command-center dashboard — a frosted-glass insights panel that
 * animates to life when scrolled into view (KPI counters, revenue bars, GST
 * split ring, live activity feed). Illustrative data, like the testimonials.
 */
export function CommandCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLive(true); io.disconnect(); } },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-live={live} className="cmd-panel p-5 sm:p-7 lg:p-8">
      {/* Window chrome / header */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md"
                style={{ border: '1px solid rgba(232,201,122,0.35)', color: '#E8C97A', background: 'rgba(232,201,122,0.08)' }}>
            <Command className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: '#C9A86A' }}>
            GSTify · Command Center
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ color: '#5EEAD4', background: 'rgba(94,234,212,0.1)', border: '1px solid rgba(94,234,212,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: '#5EEAD4', boxShadow: '0 0 8px #5EEAD4' }} /> Live
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          {['Today', '7D', '30D'].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg"
                  style={t === '30D'
                    ? { color: '#1A1205', background: 'linear-gradient(135deg,#FFE9B0,#E8C97A)', boxShadow: '0 0 16px -4px rgba(232,201,122,0.7)' }
                    : { color: MUTED }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="kpi">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{ background: `${k.accent}1F`, color: k.accent, border: `1px solid ${k.accent}40` }}>
                  <Icon className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold" style={{ color: '#34D399' }}>
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.8} />{k.delta}
                </span>
              </div>
              <p className="font-mono text-xl sm:text-2xl font-black text-dark-brown mt-3" style={{ letterSpacing: '-0.02em' }}>
                <Counter to={k.to} prefix={k.prefix} suffix={k.suffix} />
              </p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-[11px] font-semibold" style={{ color: MUTED }}>{k.label}</p>
                <Spark data={k.spark} color={k.accent} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="relative z-10 grid lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
        {/* Revenue bars */}
        <div className="kpi lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] font-bold text-dark-brown flex items-center gap-2">
              <Activity className="h-4 w-4 text-gold" strokeWidth={2.4} /> Revenue trend
            </p>
            <span className="font-mono text-[11px]" style={{ color: MUTED }}>last 7 months</span>
          </div>
          <div className="bar-track">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bar" style={{ height: `${h}%`, transitionDelay: `${i * 70}ms` }} />
                <span className="font-mono text-[9px]" style={{ color: '#7E7A8C' }}>{barLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GST split donut */}
        <div className="kpi">
          <p className="text-[12px] font-bold text-dark-brown mb-4">GST split</p>
          <div className="flex items-center gap-4">
            <div className="donut shrink-0" style={{ background: donutBg }}>
              <div className="donut-center">
                <span className="font-mono text-[13px] font-black text-dark-brown">100%</span>
              </div>
            </div>
            <ul className="space-y-2 flex-1">
              {gst.map((g) => (
                <li key={g.label} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2" style={{ color: MUTED }}>
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
                    {g.label}
                  </span>
                  <span className="font-mono font-bold text-dark-brown">{g.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="relative z-10 kpi mt-3 sm:mt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[12px] font-bold text-dark-brown">Recent invoices</p>
          <span className="font-mono text-[11px]" style={{ color: MUTED }}>auto-synced</span>
        </div>
        <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {recent.map((r) => (
            <li key={r.id} className="flex items-center justify-between py-2.5 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] font-bold shrink-0" style={{ color: '#C9A86A' }}>{r.id}</span>
                <span className="text-[13px] font-semibold text-dark-brown truncate">{r.who}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-[13px] font-bold text-dark-brown">{r.amt}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: r.color, background: `${r.color}1A`, border: `1px solid ${r.color}40` }}>
                  {r.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
