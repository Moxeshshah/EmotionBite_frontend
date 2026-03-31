// "use client";
// import Head from 'next/head';
// import { useEffect, useRef, useState } from 'react';

// export default function About() {
//   const [scrollY, setScrollY] = useState(0);
//   const [activeStep, setActiveStep] = useState(0);
//   const heroRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveStep(prev => (prev + 1) % 3);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const categories = [
//     { name: 'Congrats', emoji: '🎉', sub: 'Pop the cork!', bg: '#FF6B35', accent: '#FFD700' },
//     { name: 'Anniversary', emoji: '💕', sub: 'Years of us', bg: '#E91E8C', accent: '#FF9ECD' },
//     { name: 'Love', emoji: '❤️', sub: 'From the heart', bg: '#C0392B', accent: '#FF7675' },
//     { name: 'Propose', emoji: '💍', sub: 'Pop the question', bg: '#6C3483', accent: '#BB8FCE' },
//     { name: 'Apology', emoji: '😔', sub: 'I\'m truly sorry', bg: '#2471A3', accent: '#7FB3D6' },
//     { name: 'Closure', emoji: '✋', sub: 'Goodbye well', bg: '#1A1A2E', accent: '#8892B0' },
//     { name: 'Approach', emoji: '😊', sub: 'Hello there!', bg: '#0D7377', accent: '#14FFEC' },
//   ];

//   const steps = [
//     {
//       num: '01',
//       title: 'Buy & Scan',
//       icon: '🍫',
//       color: '#E91E8C',
//       points: ['Purchase your emotion chocolate', 'Scan unique QR on wrapper'],
//     },
//     {
//       num: '02',
//       title: 'Create Message',
//       icon: '🎙️',
//       color: '#7C3AED',
//       points: ['Verify with phone OTP', 'Record voice or dedicate song', 'Write heartfelt message'],
//     },
//     {
//       num: '03',
//       title: 'Gift & Reveal',
//       icon: '✨',
//       color: '#F59E0B',
//       points: ['Gift chocolate to loved one', 'Receiver scans to reveal magic', 'QR expires in 24hrs (privacy)'],
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>QR ChocoLove — Magical Messages in Chocolate</title>
//         <meta name="description" content="Send heartfelt messages, voice notes, and songs hidden in delicious chocolates." />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
//       </Head>

//       <style jsx global>{`
//         *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
//         html { scroll-behavior: smooth; }

//         body {
//           font-family: 'DM Sans', sans-serif;
//           background: #0A0507;
//           color: #F5EEE8;
//           overflow-x: hidden;
//         }

//         :root {
//           --choco-dark: #0A0507;
//           --choco-deep: #1A0A0F;
//           --choco-brown: #3D1A1A;
//           --choco-warm: #6B2D2D;
//           --rose: #E91E8C;
//           --gold: #F5C842;
//           --cream: #F5EEE8;
//           --muted: #9A8B82;
//           --font-display: 'Playfair Display', serif;
//           --font-body: 'DM Sans', sans-serif;
//           --font-mono: 'DM Mono', monospace;
//         }

//         /* NOISE TEXTURE OVERLAY */
//         body::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
//           pointer-events: none;
//           z-index: 9999;
//           opacity: 0.4;
//         }

//         /* ─── SCROLLBAR ─── */
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: var(--choco-dark); }
//         ::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 2px; }

//         /* ─── NAV ─── */
//         .nav {
//           position: fixed;
//           top: 0; left: 0; right: 0;
//           z-index: 100;
//           padding: 1.25rem 2rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: rgba(10, 5, 7, 0.7);
//           backdrop-filter: blur(20px);
//           border-bottom: 1px solid rgba(233, 30, 140, 0.12);
//         }

//         .nav-logo {
//           font-family: var(--font-display);
//           font-size: 1.4rem;
//           color: var(--cream);
//           letter-spacing: -0.02em;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .nav-logo span {
//           color: var(--rose);
//         }

//         .nav-pill {
//           background: rgba(233, 30, 140, 0.15);
//           border: 1px solid rgba(233, 30, 140, 0.3);
//           color: var(--rose);
//           padding: 0.45rem 1.25rem;
//           border-radius: 100px;
//           font-size: 0.85rem;
//           font-weight: 500;
//           letter-spacing: 0.04em;
//           cursor: pointer;
//           transition: all 0.25s ease;
//           text-decoration: none;
//         }

//         .nav-pill:hover {
//           background: var(--rose);
//           color: white;
//           transform: translateY(-1px);
//         }

//         /* ─── HERO ─── */
//         .hero {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           overflow: hidden;
//           padding: 8rem 2rem 4rem;
//         }

//         .hero-bg-glow {
//           position: absolute;
//           width: 700px;
//           height: 700px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(233, 30, 140, 0.15) 0%, transparent 70%);
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           pointer-events: none;
//         }

//         .hero-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(233, 30, 140, 0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(233, 30, 140, 0.04) 1px, transparent 1px);
//           background-size: 60px 60px;
//           pointer-events: none;
//         }

//         .hero-inner {
//           position: relative;
//           max-width: 900px;
//           width: 100%;
//           text-align: center;
//         }

//         .hero-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: rgba(245, 200, 66, 0.1);
//           border: 1px solid rgba(245, 200, 66, 0.3);
//           color: var(--gold);
//           padding: 0.5rem 1.2rem;
//           border-radius: 100px;
//           font-size: 0.78rem;
//           font-family: var(--font-mono);
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           margin-bottom: 2rem;
//           animation: fadeSlideUp 0.8s ease both;
//         }

//         .badge-dot {
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//           background: var(--gold);
//           animation: pulse 2s infinite;
//         }

//         .hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(3.5rem, 9vw, 7.5rem);
//           line-height: 0.95;
//           letter-spacing: -0.03em;
//           color: var(--cream);
//           margin-bottom: 0.3em;
//           animation: fadeSlideUp 0.8s 0.1s ease both;
//         }

//         .hero-title em {
//           font-style: italic;
//           color: var(--rose);
//           display: block;
//         }

//         .hero-sub {
//           font-size: clamp(1rem, 2vw, 1.2rem);
//           color: var(--muted);
//           max-width: 520px;
//           margin: 1.5rem auto 3rem;
//           line-height: 1.7;
//           font-weight: 300;
//           animation: fadeSlideUp 0.8s 0.2s ease both;
//         }

//         .hero-ctas {
//           display: flex;
//           gap: 1rem;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeSlideUp 0.8s 0.3s ease both;
//         }

//         .btn-primary {
//           background: var(--rose);
//           color: white;
//           padding: 1rem 2.5rem;
//           border-radius: 100px;
//           font-weight: 600;
//           font-size: 1rem;
//           border: none;
//           cursor: pointer;
//           text-decoration: none;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//           box-shadow: 0 0 30px rgba(233, 30, 140, 0.35);
//         }

//         .btn-primary:hover {
//           transform: translateY(-3px) scale(1.03);
//           box-shadow: 0 0 50px rgba(233, 30, 140, 0.55);
//         }

//         .btn-ghost {
//           background: transparent;
//           color: var(--cream);
//           padding: 1rem 2.5rem;
//           border-radius: 100px;
//           font-weight: 500;
//           font-size: 1rem;
//           border: 1px solid rgba(245, 238, 232, 0.2);
//           cursor: pointer;
//           text-decoration: none;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.25s ease;
//         }

//         .btn-ghost:hover {
//           background: rgba(245, 238, 232, 0.08);
//           border-color: rgba(245, 238, 232, 0.4);
//           transform: translateY(-2px);
//         }

//         /* FLOATING CHOCO TILES */
//         .float-tiles {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           margin-top: 4rem;
//           flex-wrap: wrap;
//           animation: fadeSlideUp 0.8s 0.4s ease both;
//         }

//         .float-tile {
//           background: rgba(61, 26, 26, 0.5);
//           border: 1px solid rgba(233, 30, 140, 0.15);
//           border-radius: 20px;
//           padding: 1rem 1.5rem;
//           display: flex;
//           align-items: center;
//           gap: 0.6rem;
//           font-size: 0.9rem;
//           color: var(--muted);
//           backdrop-filter: blur(10px);
//           transition: all 0.3s ease;
//         }

//         .float-tile:hover {
//           background: rgba(61, 26, 26, 0.8);
//           border-color: rgba(233, 30, 140, 0.35);
//           color: var(--cream);
//           transform: translateY(-4px);
//         }

//         .float-tile span:first-child {
//           font-size: 1.4rem;
//         }

//         /* ─── SECTION LABELS ─── */
//         .section-label {
//           font-family: var(--font-mono);
//           font-size: 0.72rem;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           color: var(--rose);
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1.25rem;
//         }

//         .section-label::after {
//           content: '';
//           width: 40px;
//           height: 1px;
//           background: var(--rose);
//           opacity: 0.5;
//         }

//         /* ─── HOW IT WORKS ─── */
//         .section {
//           padding: 7rem 2rem;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .section-title {
//           font-family: var(--font-display);
//           font-size: clamp(2.5rem, 5vw, 4rem);
//           line-height: 1.1;
//           letter-spacing: -0.02em;
//           color: var(--cream);
//           margin-bottom: 1rem;
//         }

//         .section-title em {
//           font-style: italic;
//           color: var(--rose);
//         }

//         .section-sub {
//           color: var(--muted);
//           font-size: 1.05rem;
//           max-width: 480px;
//           line-height: 1.7;
//           font-weight: 300;
//           margin-bottom: 4rem;
//         }

//         .steps-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1.5rem;
//         }

//         .step-card {
//           background: var(--choco-deep);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 28px;
//           padding: 2.5rem;
//           position: relative;
//           overflow: hidden;
//           transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         .step-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(233, 30, 140, 0.25);
//         }

//         .step-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, var(--step-color), transparent);
//           border-radius: 28px 28px 0 0;
//         }

//         .step-num {
//           font-family: var(--font-display);
//           font-size: 5rem;
//           font-weight: 900;
//           line-height: 1;
//           color: rgba(255,255,255,0.04);
//           position: absolute;
//           top: 1rem;
//           right: 1.5rem;
//           letter-spacing: -0.04em;
//           user-select: none;
//         }

//         .step-icon-wrap {
//           width: 64px;
//           height: 64px;
//           border-radius: 18px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 2rem;
//           margin-bottom: 1.5rem;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.08);
//         }

//         .step-title {
//           font-family: var(--font-display);
//           font-size: 1.6rem;
//           font-weight: 700;
//           color: var(--cream);
//           margin-bottom: 1.25rem;
//           letter-spacing: -0.02em;
//         }

//         .step-points {
//           list-style: none;
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         .step-point {
//           display: flex;
//           align-items: flex-start;
//           gap: 0.75rem;
//           font-size: 0.92rem;
//           color: var(--muted);
//           line-height: 1.5;
//         }

//         .step-check {
//           width: 20px;
//           height: 20px;
//           border-radius: 50%;
//           border: 1.5px solid;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           font-size: 0.6rem;
//           margin-top: 0.1rem;
//         }

//         /* ─── CATEGORIES ─── */
//         .categories-section {
//           padding: 0 2rem 7rem;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .cat-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//           gap: 1rem;
//         }

//         .cat-card {
//           border-radius: 24px;
//           padding: 2rem 1.5rem;
//           position: relative;
//           overflow: hidden;
//           cursor: pointer;
//           transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
//           min-height: 180px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           border: 1px solid rgba(255,255,255,0.08);
//         }

//         .cat-card:hover {
//           transform: translateY(-6px) scale(1.02);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.4);
//         }

//         .cat-emoji {
//           font-size: 2.5rem;
//           margin-bottom: 0.75rem;
//           display: block;
//           transition: transform 0.3s ease;
//         }

//         .cat-card:hover .cat-emoji {
//           transform: scale(1.2) rotate(-5deg);
//         }

//         .cat-name {
//           font-family: var(--font-display);
//           font-size: 1.4rem;
//           font-weight: 700;
//           color: white;
//           letter-spacing: -0.02em;
//           line-height: 1.2;
//         }

//         .cat-sub {
//           font-size: 0.8rem;
//           color: rgba(255,255,255,0.6);
//           margin-top: 0.3rem;
//           font-weight: 300;
//         }

//         .cat-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.3));
//           pointer-events: none;
//         }

//         /* ─── PROMISE STRIP ─── */
//         .promise-strip {
//           border-top: 1px solid rgba(255,255,255,0.06);
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: var(--choco-deep);
//           padding: 2.5rem 2rem;
//           overflow: hidden;
//         }

//         .promise-inner {
//           display: flex;
//           gap: 4rem;
//           justify-content: center;
//           flex-wrap: wrap;
//           max-width: 900px;
//           margin: 0 auto;
//         }

//         .promise-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           color: var(--muted);
//           font-size: 0.9rem;
//           white-space: nowrap;
//         }

//         .promise-icon {
//           font-size: 1.3rem;
//         }

//         /* ─── CTA ─── */
//         .cta-section {
//           padding: 7rem 2rem;
//           position: relative;
//           overflow: hidden;
//           text-align: center;
//         }

//         .cta-bg {
//           position: absolute;
//           inset: 0;
//           background:
//             radial-gradient(ellipse 80% 60% at 50% 100%, rgba(233, 30, 140, 0.25) 0%, transparent 70%),
//             var(--choco-dark);
//         }

//         .cta-inner {
//           position: relative;
//           max-width: 680px;
//           margin: 0 auto;
//         }

//         .cta-tag {
//           display: inline-block;
//           background: var(--rose);
//           color: white;
//           font-size: 0.72rem;
//           font-family: var(--font-mono);
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           padding: 0.4rem 1rem;
//           border-radius: 100px;
//           margin-bottom: 2rem;
//         }

//         .cta-title {
//           font-family: var(--font-display);
//           font-size: clamp(2.8rem, 7vw, 5.5rem);
//           line-height: 0.98;
//           letter-spacing: -0.03em;
//           color: var(--cream);
//           margin-bottom: 1.25rem;
//         }

//         .cta-title em {
//           font-style: italic;
//           color: var(--rose);
//         }

//         .cta-sub {
//           color: var(--muted);
//           font-size: 1.05rem;
//           line-height: 1.7;
//           font-weight: 300;
//           margin-bottom: 3rem;
//         }

//         .cta-btns {
//           display: flex;
//           gap: 1rem;
//           justify-content: center;
//           flex-wrap: wrap;
//         }

//         /* ─── FOOTER ─── */
//         .footer {
//           border-top: 1px solid rgba(255,255,255,0.06);
//           padding: 2rem;
//           text-align: center;
//           color: rgba(154, 139, 130, 0.5);
//           font-size: 0.82rem;
//           font-family: var(--font-mono);
//           letter-spacing: 0.04em;
//         }

//         /* ─── ANIMATIONS ─── */
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(28px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.3; }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }

//         @keyframes ticker {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }

//         /* ─── TICKER ─── */
//         .ticker-wrap {
//           background: var(--rose);
//           padding: 0.75rem 0;
//           overflow: hidden;
//           white-space: nowrap;
//         }

//         .ticker-inner {
//           display: inline-flex;
//           animation: ticker 20s linear infinite;
//           gap: 0;
//         }

//         .ticker-item {
//           display: inline-flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 0 2rem;
//           font-size: 0.82rem;
//           font-family: var(--font-mono);
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.9);
//         }

//         .ticker-dot {
//           width: 4px;
//           height: 4px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.5);
//         }

//         /* ─── DIVIDER ─── */
//         .divider {
//           border: none;
//           border-top: 1px solid rgba(255,255,255,0.06);
//           margin: 0;
//         }

//         /* ─── RESPONSIVE ─── */
//         @media (max-width: 640px) {
//           .nav { padding: 1rem; }
//           .hero { padding: 7rem 1.25rem 3rem; }
//           .section, .categories-section { padding-left: 1.25rem; padding-right: 1.25rem; }
//           .promise-inner { gap: 1.5rem; flex-direction: column; align-items: center; }
//           .float-tiles { gap: 0.6rem; }
//           .float-tile { padding: 0.75rem 1rem; font-size: 0.82rem; }
//           .cta-btns { flex-direction: column; align-items: center; }
//         }
//       `}</style>

//       {/* NAV */}
//       <nav className="nav">
//         <div className="nav-logo">
//           🍫 <span>Emotion</span>Bite
//         </div>
//         <a href="/shop" className="nav-pill">Shop Now →</a>
//       </nav>

//       {/* TICKER */}
//       <div className="ticker-wrap" style={{ marginTop: '64px' }}>
//         <div className="ticker-inner">
//           {[...Array(6)].map((_, i) => (
//             <span key={i} className="ticker-item">
//               Hidden Love Messages <span className="ticker-dot" />
//               Voice Notes in Chocolate <span className="ticker-dot" />
//               Dedicate a Song <span className="ticker-dot" />
//               QR Code Magic <span className="ticker-dot" />
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* HERO */}
//       <section className="hero" ref={heroRef}>
//         <div className="hero-grid" />
//         <div className="hero-bg-glow" />
//         <div className="hero-inner">
//           <div className="hero-badge">
//             <span className="badge-dot" />
//             New Way to Express Love
//           </div>

//           <h1 className="hero-title">
//             Hidden Love
//             <em>in Every Bite</em>
//           </h1>

//           <p className="hero-sub">
//             Surprise your loved ones with secret messages, voice notes, and dedicated songs 
//             hidden inside delicious chocolates. For every emotion. Every occasion.
//           </p>

//           <div className="hero-ctas">
//             {/* <a href="/shop" className="btn-primary">
//               🍫 Shop Chocolates
//             </a> */}
//             <a href="#how-it-works" className="btn-ghost">
//               How it works ↓
//             </a>
//           </div>

//           <div className="float-tiles">
//             {[
//               { icon: '🎙️', text: 'Voice Notes' },
//               { icon: '🎵', text: 'Song Dedications' },
//               { icon: '💌', text: 'Secret Messages' },
//               { icon: '📱', text: 'QR Technology' },
//               { icon: '🔒', text: '24hr Privacy' },
//             ].map((t, i) => (
//               <div
//                 key={i}
//                 className="float-tile"
//                 style={{ animationDelay: `${i * 0.3}s`, animation: `float ${4 + i * 0.5}s ease-in-out infinite` }}
//               >
//                 <span>{t.icon}</span>
//                 <span>{t.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PROMISE STRIP */}
//       <div className="promise-strip">
//         <div className="promise-inner">
//           {[
//             { icon: '✨', text: 'Magical Experience' },
//             { icon: '🔒', text: 'Private & Secure' },
//             { icon: '🚀', text: 'Instant Setup' },
//             { icon: '💝', text: '7 Emotion Categories' },
//             { icon: '🎁', text: 'Perfect for Gifting' },
//           ].map((p, i) => (
//             <div key={i} className="promise-item">
//               <span className="promise-icon">{p.icon}</span>
//               <span>{p.text}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <hr className="divider" />

//       {/* HOW IT WORKS */}
//       <section id="how-it-works" className="section">
//         <div className="section-label">The Process</div>
//         <h2 className="section-title">
//           3 Steps to a<br />
//           <em>Sweet Surprise</em>
//         </h2>
//         <p className="section-sub">
//           Turn any chocolate into a magical moment in under 5 minutes. 
//           No app required — just a phone and a feeling.
//         </p>

//         <div className="steps-grid">
//           {steps.map((step, i) => (
//             <div
//               key={i}
//               className="step-card"
//               style={{ '--step-color': step.color }}
//             >
//               <div className="step-num">{step.num}</div>
//               <div className="step-icon-wrap">{step.icon}</div>
//               <div className="step-title">{step.title}</div>
//               <ul className="step-points">
//                 {step.points.map((pt, j) => (
//                   <li key={j} className="step-point">
//                     <span
//                       className="step-check"
//                       style={{ borderColor: step.color, color: step.color }}
//                     >
//                       ✓
//                     </span>
//                     <span>{pt}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>

//       <hr className="divider" />

//       {/* CATEGORIES */}
//       <section className="categories-section">
//         <div className="section-label" style={{ paddingTop: '5rem' }}>Every Emotion</div>
//         <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
//           Choose Your
//           <em> Feeling</em>
//         </h2>
//         <p className="section-sub">
//           Pre-designed templates crafted for life's most meaningful moments.
//         </p>

//         <div className="cat-grid">
//           {categories.map((cat, i) => (
//             <div
//               key={i}
//               className="cat-card"
//               style={{ background: `linear-gradient(135deg, ${cat.bg} 0%, ${cat.accent}22 100%)` }}
//             >
//               <div className="cat-overlay" />
//               <span className="cat-emoji">{cat.emoji}</span>
//               <div className="cat-name">{cat.name}</div>
//               <div className="cat-sub">{cat.sub}</div>
//             </div>
//           ))}

//           {/* WIDE CALL-TO-ACTION CARD */}
//           <div
//             className="cat-card"
//             style={{
//               background: 'rgba(233, 30, 140, 0.08)',
//               border: '1px dashed rgba(233, 30, 140, 0.35)',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               padding: '2rem',
//             }}
//           >
//             <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>＋</span>
//             <div className="cat-name" style={{ color: 'var(--rose)', fontSize: '1.1rem' }}>More Coming Soon</div>
//             <div className="cat-sub" style={{ color: 'var(--rose)', opacity: 0.6 }}>New emotions every month</div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta-section">
//         <div className="cta-bg" />
//         <div className="cta-inner">
//           <span className="cta-tag">Start Today</span>
//           <h2 className="cta-title">
//             Ready to Create<br />
//             <em>Magic?</em>
//           </h2>
//           <p className="cta-sub">
//             Find our chocolates at your nearest store or order online. 
//             One chocolate, one message, one unforgettable moment.
//           </p>
//           <div className="cta-btns">
//             <a href="/shop" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>
//               🍫 Shop Online
//             </a>
//             <a href="/find-store" className="btn-ghost" style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>
//               📍 Find a Store
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="footer">
//         © {new Date().getFullYear()} QRChocoLove — All rights reserved &nbsp;·&nbsp; Made with ❤️ &amp; 🍫
//       </footer>
//     </>
//   );
// }

"use client";
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: 'Congrats',    emoji: '🎉', sub: 'Pop the cork!',    bg: '#FF6B35', accent: '#FFD700' },
    { name: 'Anniversary', emoji: '💕', sub: 'Years of us',       bg: '#E91E8C', accent: '#FF9ECD' },
    { name: 'Love',        emoji: '❤️', sub: 'From the heart',    bg: '#C0392B', accent: '#FF7675' },
    { name: 'Propose',     emoji: '💍', sub: 'Pop the question',  bg: '#6C3483', accent: '#BB8FCE' },
    { name: 'Apology',     emoji: '😔', sub: "I'm truly sorry",   bg: '#2471A3', accent: '#7FB3D6' },
    { name: 'Closure',     emoji: '✋', sub: 'Goodbye well',      bg: '#1A1A2E', accent: '#8892B0' },
    { name: 'Approach',    emoji: '😊', sub: 'Hello there!',      bg: '#0D7377', accent: '#14FFEC' },
  ];

  const steps = [
    { num: '01', title: 'Buy & Scan',     icon: '🍫', color: '#E91E8C', points: ['Purchase your emotion chocolate', 'Scan unique QR on wrapper'] },
    { num: '02', title: 'Create Message', icon: '🎙️', color: '#7C3AED', points: ['Verify with phone OTP', 'Record voice or dedicate song', 'Write heartfelt message'] },
    { num: '03', title: 'Gift & Reveal',  icon: '✨', color: '#F59E0B', points: ['Gift chocolate to loved one', 'Receiver scans to reveal magic', 'QR expires in 24hrs (privacy)'] },
  ];

  return (
    <>
      <Head>
<title>EmotionBite — Unwrap Emotions</title>        <meta name="description" content="Send heartfelt messages, voice notes, and songs hidden in delicious chocolates." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0A0507;
          color: #F5EEE8;
          overflow-x: hidden;
        }

        :root {
          --choco-dark: #0A0507;
          --choco-deep: #140810;
          --rose: #E91E8C;
          --gold: #F5C842;
          --cream: #F5EEE8;
          --muted: #9A8B82;
          --font-display: 'Playfair Display', serif;
          --font-body: 'DM Sans', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--choco-dark); }
        ::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 2px; }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(10,5,7,0.75);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(233,30,140,0.12);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--cream);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .nav-logo span { color: var(--rose); }
        .nav-pill {
          background: rgba(233,30,140,0.15);
          border: 1px solid rgba(233,30,140,0.3);
          color: var(--rose);
          padding: 0.4rem 1.1rem;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .nav-pill:hover { background: var(--rose); color: white; transform: translateY(-1px); }

        /* TICKER */
        .ticker-wrap {
          background: var(--rose);
          padding: 0.55rem 0;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 58px;
        }
        .ticker-inner {
          display: inline-flex;
          animation: ticker 22s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 0 2rem;
          font-size: 0.76rem;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
        }
        .ticker-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          display: inline-block;
        }

        /* HERO */
        .hero {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 3.5rem 2rem 2.5rem;
        }
        .hero-bg-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(233,30,140,0.13) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(233,30,140,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233,30,140,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          max-width: 860px;
          width: 100%;
          text-align: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245,200,66,0.1);
          border: 1px solid rgba(245,200,66,0.3);
          color: var(--gold);
          padding: 0.38rem 1rem;
          border-radius: 100px;
          font-size: 0.72rem;
          font-family: var(--font-mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          animation: fadeSlideUp 0.8s ease both;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--cream);
          margin-bottom: 0.5rem;
          animation: fadeSlideUp 0.8s 0.1s ease both;
        }
        .hero-title em {
          font-style: italic;
          color: var(--rose);
          display: block;
        }
        .hero-sub {
          font-size: clamp(0.92rem, 1.8vw, 1.08rem);
          color: var(--muted);
          max-width: 500px;
          margin: 0.75rem auto 1.75rem;
          line-height: 1.7;
          font-weight: 300;
          animation: fadeSlideUp 0.8s 0.2s ease both;
        }
        .hero-ctas {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.8s 0.3s ease both;
        }
        .btn-primary {
          background: var(--rose);
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.92rem;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 0 28px rgba(233,30,140,0.35);
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 0 45px rgba(233,30,140,0.55); }
        .btn-ghost {
          background: transparent;
          color: var(--cream);
          padding: 0.8rem 2rem;
          border-radius: 100px;
          font-weight: 500;
          font-size: 0.92rem;
          border: 1px solid rgba(245,238,232,0.2);
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover { background: rgba(245,238,232,0.08); border-color: rgba(245,238,232,0.4); transform: translateY(-2px); }

        .float-tiles {
          display: flex;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 1.75rem;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.8s 0.4s ease both;
        }
        .float-tile {
          background: rgba(61,26,26,0.5);
          border: 1px solid rgba(233,30,140,0.15);
          border-radius: 14px;
          padding: 0.55rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: var(--muted);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .float-tile:hover { background: rgba(61,26,26,0.8); border-color: rgba(233,30,140,0.35); color: var(--cream); transform: translateY(-3px); }
        .float-tile span:first-child { font-size: 1rem; }

        /* PROMISE STRIP */
        .promise-strip {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: var(--choco-deep);
          padding: 1.25rem 2rem;
        }
        .promise-inner {
          display: flex;
          gap: 2.25rem;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
        }
        .promise-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--muted);
          font-size: 0.83rem;
          white-space: nowrap;
        }
        .promise-icon { font-size: 1rem; }

        /* SHARED SECTION */
        .section {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--rose);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.65rem;
        }
        .section-label::after {
          content: '';
          width: 32px; height: 1px;
          background: var(--rose);
          opacity: 0.5;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--cream);
          margin-bottom: 0.5rem;
        }
        .section-title em { font-style: italic; color: var(--rose); }
        .section-sub {
          color: var(--muted);
          font-size: 0.95rem;
          max-width: 440px;
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        /* STEPS */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.1rem;
        }
        .step-card {
          background: var(--choco-deep);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 22px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .step-card:hover { transform: translateY(-6px); border-color: rgba(233,30,140,0.25); }
        .step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--step-color), transparent);
          border-radius: 22px 22px 0 0;
        }
        .step-num {
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
          color: rgba(255,255,255,0.04);
          position: absolute;
          top: 0.65rem; right: 1.1rem;
          letter-spacing: -0.04em;
          user-select: none;
        }
        .step-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.55rem;
          margin-bottom: 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .step-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--cream);
          margin-bottom: 0.85rem;
          letter-spacing: -0.02em;
        }
        .step-points { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .step-point {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.86rem;
          color: var(--muted);
          line-height: 1.5;
        }
        .step-check {
          width: 17px; height: 17px;
          border-radius: 50%;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.52rem;
          margin-top: 0.15rem;
        }

        /* DIVIDER */
        .divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0;
        }

        /* CATEGORIES */
        .categories-section {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .cat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}
.cat-card {
  border-radius: 14px;
  padding: 0.9rem 1rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255,255,255,0.08);
}
        .cat-emoji {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
  display: block;
  transition: transform 0.3s ease;
}
        .cat-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.cat-sub {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.55);
  margin-top: 0.15rem;
  font-weight: 300;
}
        .cat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.22));
          pointer-events: none;
        }

        /* CTA */
        .cta-section {
          padding: 3.5rem 2rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .cta-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(233,30,140,0.2) 0%, transparent 70%), var(--choco-dark);
        }
        .cta-inner {
          position: relative;
          max-width: 620px;
          margin: 0 auto;
        }
        .cta-tag {
          display: inline-block;
          background: var(--rose);
          color: white;
          font-size: 0.68rem;
          font-family: var(--font-mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.32rem 0.85rem;
          border-radius: 100px;
          margin-bottom: 1rem;
        }
        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          line-height: 0.98;
          letter-spacing: -0.03em;
          color: var(--cream);
          margin-bottom: 0.85rem;
        }
        .cta-title em { font-style: italic; color: var(--rose); }
        .cta-sub {
          color: var(--muted);
          font-size: 0.97rem;
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 1.75rem;
        }
        .cta-btns {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.25rem 2rem;
          text-align: center;
          color: rgba(154,139,130,0.45);
          font-size: 0.76rem;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }

        /* ANIMATIONS */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .nav { padding: 0.85rem 1.25rem; }
          .hero { padding: 2.5rem 1.25rem 2rem; }
          .section, .categories-section { padding: 2.25rem 1.25rem; }
          .promise-inner { gap: 1rem; }
          .float-tiles { gap: 0.45rem; }
          .float-tile { padding: 0.48rem 0.8rem; font-size: 0.76rem; }
          .cta-btns { flex-direction: column; align-items: center; }
          .cta-section { padding: 2.75rem 1.25rem; }
        }
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      `}</style>

      {/* NAV */}
      <nav className="nav">
<div className="nav-logo"><img src="/qr-logo.png" alt="Emotion Bite" style={{height:'28px',objectFit:'contain'}} /> Emotion<span>Bite</span></div>
        <a href="/shop" className="nav-pill">Shop Now →</a>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="ticker-item">
              Hidden Love Messages <span className="ticker-dot" />
              Voice Notes in Chocolate <span className="ticker-dot" />
              Dedicate a Song <span className="ticker-dot" />
              QR Code Magic <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-grid" />
        <div className="hero-bg-glow" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="badge-dot" />
            New Way to Express Love
          </div>
          <h1 className="hero-title">
            Hidden Love
            <em>in Every Bite</em>
          </h1>
          <p className="hero-sub">
            Surprise your loved ones with secret messages, voice notes, and dedicated songs
            hidden inside delicious chocolates. For every emotion. Every occasion.
          </p>
          <div className="hero-ctas">
            <a href="/shop" className="btn-primary">🍫 Shop Chocolates</a>
            <a href="#how-it-works" className="btn-ghost">How it works ↓</a>
          </div>
          <div className="float-tiles">
            {[
              { icon: '🎙️', text: 'Voice Notes' },
              { icon: '🎵', text: 'Song Dedications' },
              { icon: '💌', text: 'Secret Messages' },
              { icon: '📱', text: 'QR Technology' },
              { icon: '🔒', text: '24hr Privacy' },
            ].map((t, i) => (
              <div
                key={i}
                className="float-tile"
                style={{ animation: `float ${4 + i * 0.5}s ${i * 0.3}s ease-in-out infinite` }}
              >
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE STRIP */}
      <div className="promise-strip">
        <div className="promise-inner">
          {[
            { icon: '✨', text: 'Magical Experience' },
            { icon: '🔒', text: 'Private & Secure' },
            { icon: '🚀', text: 'Instant Setup' },
            { icon: '💝', text: '7 Emotion Categories' },
            { icon: '🎁', text: 'Perfect for Gifting' },
          ].map((p, i) => (
            <div key={i} className="promise-item">
              <span className="promise-icon">{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section">
        <div className="section-label">The Process</div>
        <h2 className="section-title">3 Steps to a<br /><em>Sweet Surprise</em></h2>
        <p className="section-sub">
          Turn any chocolate into a magical moment in under 5 minutes.
          No app required — just a phone and a feeling.
        </p>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card" style={{ '--step-color': step.color }}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <ul className="step-points">
                {step.points.map((pt, j) => (
                  <li key={j} className="step-point">
                    <span className="step-check" style={{ borderColor: step.color, color: step.color }}>✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-label">Every Emotion</div>
        <h2 className="section-title">Choose Your<em> Feeling</em></h2>
        <p className="section-sub">Pre-designed templates crafted for life's most meaningful moments.</p>
        <div className="cat-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="cat-card"
              style={{ background: `linear-gradient(135deg, ${cat.bg} 0%, ${cat.accent}22 100%)` }}
            >
              <div className="cat-overlay" />
              <span className="cat-emoji">{cat.emoji}</span>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-sub">{cat.sub}</div>
            </div>
          ))}
          <div
            className="cat-card"
            style={{
              background: 'rgba(233,30,140,0.08)',
              border: '1px dashed rgba(233,30,140,0.35)',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.45rem' }}>＋</span>
            <div className="cat-name" style={{ color: 'var(--rose)', fontSize: '0.95rem' }}>More Coming Soon</div>
            <div className="cat-sub" style={{ color: 'var(--rose)', opacity: 0.6 }}>New emotions every month</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-inner">
          <span className="cta-tag">Start Today</span>
          <h2 className="cta-title">Ready to Create<br /><em>Magic?</em></h2>
          <p className="cta-sub">
            Find our chocolates at your nearest store or order online.
            One chocolate, one message, one unforgettable moment.
          </p>
          <div className="cta-btns">
            <a href="/shop" className="btn-primary">🍫 Shop Online</a>
            <a href="/find-store" className="btn-ghost">📍 Find a Store</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} EmotionBite — All rights reserved &nbsp;·&nbsp; Made with ❤️ &amp; 🍫
      </footer>
    </>
  );
}
