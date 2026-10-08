import { useId } from 'react';

/* ──────────────────────────────────────────────────────────────
   Maskot & adegan ilustrasi murni SVG (tanpa file gambar).
   Ubah warna lewat konstanta C. Gradien/bayangan ada di <Defs>.
   ────────────────────────────────────────────────────────────── */

const C = {
  line: '#A85A1E',
  ink: '#3B2416',
  blush: '#FF9AA2',
  mouth: '#7A2E2E',
  boxLine: '#B8803A',
  label: '#FFF6E0',
  labelText: '#7A4A22',
};

interface Props {
  className?: string;
  title?: string;
}

/** Semua gradien & filter, id-nya diberi awalan uid supaya unik per SVG. */
function Defs({ u }: { u: string }) {
  return (
    <defs>
      <radialGradient id={`${u}-fur`} cx="50%" cy="38%" r="70%">
        <stop offset="0" stopColor="#FFFDF4" />
        <stop offset="1" stopColor="#FFE6BC" />
      </radialGradient>
      <linearGradient id={`${u}-ear`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EBA254" />
        <stop offset="1" stopColor="#C97429" />
      </linearGradient>
      <linearGradient id={`${u}-patch`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F4B96E" />
        <stop offset="1" stopColor="#E8964A" />
      </linearGradient>
      <linearGradient id={`${u}-box`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FAD797" />
        <stop offset="1" stopColor="#EFB867" />
      </linearGradient>
      <linearGradient id={`${u}-boxside`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EDBB6C" />
        <stop offset="1" stopColor="#D79C4B" />
      </linearGradient>
      <linearGradient id={`${u}-cloud`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#D6EAFA" />
      </linearGradient>
      <linearGradient id={`${u}-leafT`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8FD0C4" />
        <stop offset="1" stopColor="#4E9F94" />
      </linearGradient>
      <linearGradient id={`${u}-leafB`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#BFE0F6" />
        <stop offset="1" stopColor="#7FB2E5" />
      </linearGradient>
      <linearGradient id={`${u}-tongue`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFA3B2" />
        <stop offset="1" stopColor="#FF7C93" />
      </linearGradient>
      <filter id={`${u}-sh`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4F86C6" floodOpacity=".3" />
      </filter>
      <filter id={`${u}-sh-s`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4F86C6" floodOpacity=".25" />
      </filter>
    </defs>
  );
}

/** Mask: awan memudar halus ke bawah (tanpa tepi lurus). */
function FadeMask({ u, w, h, from }: { u: string; w: number; h: number; from: number }) {
  return (
    <>
      <linearGradient id={`${u}-fadeg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset={from} stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </linearGradient>
      <mask id={`${u}-fade`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
        <rect width={w} height={h} fill={`url(#${u}-fadeg)`} />
      </mask>
      <linearGradient id={`${u}-fadehg`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" />
        <stop offset=".12" stopColor="#fff" />
        <stop offset=".88" stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </linearGradient>
      <mask id={`${u}-fadeh`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
        <rect width={w} height={h} fill={`url(#${u}-fadehg)`} />
      </mask>
    </>
  );
}

/* ───────────── bagian kecil ───────────── */

function PuppyHead({ u, mood }: { u: string; mood: 'open' | 'happy' }) {
  const ear = (
    <g>
      <path
        d="M-62 -42C-100 -50 -114 -4 -105 38C-98 68 -70 76 -58 48C-50 28 -50 -18 -62 -42Z"
        fill={`url(#${u}-ear)`}
        stroke={C.line}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M-74 -22C-94 -22 -98 8 -92 32C-86 50 -70 48 -67 32C-63 12 -65 -8 -74 -22Z" fill="#9A4F14" opacity=".28" />
      <path d="M-98 -2C-102 12 -100 26 -94 38" stroke="#F7C98B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </g>
  );

  return (
    <g>
      <g className="puppy-ear">{ear}</g>
      <g transform="scale(-1 1)">
        <g className="puppy-ear">{ear}</g>
      </g>

      <ellipse cx="0" cy="0" rx="80" ry="68" fill={`url(#${u}-fur)`} stroke={C.line} strokeWidth="3" />
      <clipPath id={`${u}-clip`}>
        <ellipse cx="0" cy="0" rx="79" ry="67" />
      </clipPath>
      <g clipPath={`url(#${u}-clip)`}>
        <path d="M-82 -6C-84 -74 -26 -82 -8 -68C-4 -46 -10 -24 -16 -6C-34 6 -62 8 -82 -6Z" fill={`url(#${u}-patch)`} />
        <path d="M82 -6C84 -74 26 -82 8 -68C4 -46 10 -24 16 -6C34 6 62 8 82 -6Z" fill={`url(#${u}-patch)`} />
        {/* kilau di dahi */}
        <path d="M-52 -50C-40 -60 -26 -62 -16 -58" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M52 -50C40 -60 26 -62 16 -58" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* bayangan dagu */}
        <ellipse cx="0" cy="70" rx="60" ry="14" fill="#E9C48E" opacity=".45" />
      </g>
      {/* jambul */}
      <path d="M-4 -66C-6 -82 8 -88 12 -76" stroke={C.line} strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* alis bintik */}
      <ellipse cx="-30" cy="-22" rx="7" ry="4" fill="#E8A65A" />
      <ellipse cx="30" cy="-22" rx="7" ry="4" fill="#E8A65A" />

      {mood === 'open' ? (
        <g className="puppy-eyes">
          <ellipse cx="-30" cy="-2" rx="9" ry="11" fill={C.ink} />
          <ellipse cx="30" cy="-2" rx="9" ry="11" fill={C.ink} />
          <ellipse cx="-30" cy="3" rx="6" ry="5" fill="#6B4226" opacity=".7" />
          <ellipse cx="30" cy="3" rx="6" ry="5" fill="#6B4226" opacity=".7" />
          <circle cx="-33.5" cy="-7" r="3.8" fill="#fff" />
          <circle cx="26.5" cy="-7" r="3.8" fill="#fff" />
          <circle cx="-26.5" cy="2.5" r="1.8" fill="#fff" />
          <circle cx="33.5" cy="2.5" r="1.8" fill="#fff" />
        </g>
      ) : (
        <g fill="none" stroke={C.ink} strokeWidth="4.4" strokeLinecap="round">
          <path d="M-43 1Q-30 -17 -17 1" />
          <path d="M17 1Q30 -17 43 1" />
        </g>
      )}

      <circle cx="-55" cy="21" r="10" fill={C.blush} opacity=".55" />
      <circle cx="55" cy="21" r="10" fill={C.blush} opacity=".55" />

      {/* moncong */}
      <ellipse cx="0" cy="25" rx="37" ry="28" fill="#fff" />
      <ellipse cx="0" cy="44" rx="30" ry="9" fill="#F3E3C9" opacity=".6" />
      {[[-27, 19], [-31, 26], [-25, 27], [27, 19], [31, 26], [25, 27]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill="#D9B48A" />
      ))}
      <path d="M-12 10Q0 3 12 10Q11 22 0 24Q-11 22 -12 10Z" fill={C.ink} />
      <ellipse cx="-4.5" cy="10.5" rx="3.6" ry="1.9" fill="#fff" opacity=".9" />

      <path d="M0 24V31" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M-21 31Q0 64 21 31Z" fill={C.mouth} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M-9 40Q0 34 9 40Q10 56 0 56Q-10 56 -9 40Z" fill={`url(#${u}-tongue)`} />
      <path d="M0 42V50" stroke="#E86A80" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function FrontPaw({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="23" ry="17" fill="#FFF8EA" stroke={C.line} strokeWidth="3" />
      <ellipse cx="0" cy="-6" rx="13" ry="5" fill="#fff" opacity=".8" />
      <path d="M-7 3V12M7 3V12" stroke="#D9B48A" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

function MiniPaw({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={C.boxLine} opacity=".85">
      <ellipse cx="0" cy="6" rx="8" ry="6.6" />
      <ellipse cx="-11" cy="-4" rx="3.2" ry="4.2" transform="rotate(-20 -11 -4)" />
      <ellipse cx="-4" cy="-10" rx="3.2" ry="4.4" transform="rotate(-6 -4 -10)" />
      <ellipse cx="4" cy="-10" rx="3.2" ry="4.4" transform="rotate(6 4 -10)" />
      <ellipse cx="11" cy="-4" rx="3.2" ry="4.2" transform="rotate(20 11 -4)" />
    </g>
  );
}

/** Daun: pangkal di (0,0), menjulang ke atas. */
function Leaf({ u, tone, rot, s = 1 }: { u: string; tone: 'T' | 'B'; rot: number; s?: number }) {
  return (
    <g transform={`rotate(${rot}) scale(${s})`}>
      <path d="M0 0C-30 -30 -34 -75 0 -112C34 -75 30 -30 0 0Z" fill={`url(#${u}-leaf${tone})`} />
      <path d="M0 -4V-96" stroke="#fff" strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M0 -34L-12 -48M0 -52L12 -66M0 -70L-9 -80" stroke="#fff" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Plants({ u, x, y, flip = false, small = false }: { u: string; x: number; y: number; flip?: boolean; small?: boolean }) {
  const k = small ? 0.55 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      <Leaf u={u} tone="B" rot={-38} s={0.8} />
      <Leaf u={u} tone="T" rot={-16} s={1} />
      <Leaf u={u} tone="B" rot={8} s={0.72} />
      <Leaf u={u} tone="T" rot={30} s={0.85} />
    </g>
  );
}

function StandingBook({ x, y, rot, color = '#5B8FC9' }: { x: number; y: number; rot: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="0" y="-86" width="38" height="86" rx="5" fill={color} stroke="#2F5D9E" strokeWidth="2.6" />
      <rect x="32" y="-82" width="9" height="78" rx="1.5" fill="#fff" stroke="#2F5D9E" strokeWidth="2" />
      <path d="M8 -66H26M8 -56H20" stroke="#fff" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" />
      <rect x="0" y="-86" width="38" height="14" rx="5" fill="#fff" opacity=".18" />
    </g>
  );
}

/** Awan berbulu dengan gradien; lebar lokal 360, tinggi 100. */
const CLOUD_FRONT =
  'M0 62C0 42 18 32 36 36C42 14 74 6 96 24C112 0 156 0 176 24C194 8 232 10 244 32C266 20 300 28 304 52C330 48 360 58 360 78V84C360 93 351 96 342 96H18C9 96 0 93 0 84Z';
const CLOUD_BACK =
  'M0 120C0 96 22 84 44 88C48 62 82 48 108 64C124 36 170 30 192 58C212 40 254 44 266 72C292 56 332 68 336 98C366 92 400 106 400 130V150C400 160 386 166 372 166H28C14 166 0 160 0 150Z';

/** Kotak + anak anjing (koordinat 360×330). */
function BoxPuppy({ u }: { u: string }) {
  return (
    <g>
      {/* dinding dalam */}
      <path d="M62 172L74 148H286L298 172Z" fill="#C98F45" stroke={C.boxLine} strokeWidth="3" strokeLinejoin="round" />
      <path d="M74 148H286L290 158H70Z" fill="#000" opacity=".12" />

      <g transform="translate(180 102)">
        <PuppyHead u={u} mood="open" />
      </g>

      {/* tutup kotak terlipat keluar */}
      <path d="M54 172L10 198L26 246L62 216Z" fill={`url(#${u}-boxside)`} stroke={C.boxLine} strokeWidth="3" strokeLinejoin="round" />
      <path d="M306 172L350 198L334 246L298 216Z" fill={`url(#${u}-boxside)`} stroke={C.boxLine} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 204L32 238M340 204L328 238" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />

      {/* badan kotak */}
      <path
        d="M52 170H308L298 314Q296 322 288 322H72Q64 322 62 314Z"
        fill={`url(#${u}-box)`}
        stroke={C.boxLine}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M52 170H308L306 192H54Z" fill="#E9B263" stroke={C.boxLine} strokeWidth="3" strokeLinejoin="round" />
      {/* lipatan kardus */}
      <path d="M180 192V316" stroke="#C99345" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
      <path d="M70 206V300" stroke="#fff" strokeOpacity=".4" strokeWidth="6" strokeLinecap="round" />
      {/* lubang pegangan */}
      <rect x="64" y="262" width="22" height="9" rx="4.5" fill="#B8803A" opacity=".45" />
      <rect x="274" y="262" width="22" height="9" rx="4.5" fill="#B8803A" opacity=".45" />

      {/* label + selotip */}
      <g transform="rotate(-5 180 248)">
        <rect x="92" y="208" width="176" height="84" rx="14" fill={C.label} stroke={C.boxLine} strokeWidth="2.6" />
        <rect x="84" y="202" width="32" height="14" rx="3" fill="#FFE59A" opacity=".85" transform="rotate(-18 100 209)" />
        <rect x="244" y="284" width="32" height="14" rx="3" fill="#FFE59A" opacity=".85" transform="rotate(-18 260 291)" />
        <text x="180" y="244" textAnchor="middle" fontSize="37" fill={C.labelText} style={{ fontFamily: 'var(--font-display), cursive', fontWeight: 800 }}>
          Kotak
        </text>
        <text x="180" y="281" textAnchor="middle" fontSize="37" fill={C.labelText} style={{ fontFamily: 'var(--font-display), cursive', fontWeight: 800 }}>
          Evaluasi
        </text>
      </g>
      <MiniPaw x={284} y={238} s={0.62} />

      <FrontPaw x={128} y={178} />
      <FrontPaw x={232} y={178} />
    </g>
  );
}

/* ───────────── komponen yang diekspor ───────────── */

/** Anak anjing di dalam kotak, berdiri sendiri. */
export function PuppyBox({ className = '', title = 'Anak anjing di dalam Kotak Evaluasi' }: Props) {
  const u = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label={title} className={`h-auto select-none ${className}`}>
      <Defs u={u} />
      <g filter={`url(#${u}-sh)`}>
        <BoxPuppy u={u} />
      </g>
    </svg>
  );
}

/** Anak anjing senang (tanpa kotak), berdiri sendiri. */
export function PuppyJoy({ className = '', title = 'Anak anjing senang' }: Props) {
  const u = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 300 250" role="img" aria-label={title} className={`h-auto select-none ${className}`}>
      <Defs u={u} />
      <g filter={`url(#${u}-sh)`}>
        <JoyBody u={u} />
      </g>
    </svg>
  );
}

function JoyBody({ u }: { u: string }) {
  return (
    <g>
      <path d="M70 250C70 196 102 168 150 168C198 168 230 196 230 250Z" fill={`url(#${u}-fur)`} stroke={C.line} strokeWidth="3" strokeLinejoin="round" />
      <path d="M150 176V206" stroke="#E9C48E" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" />
      <g transform="translate(150 108)">
        <PuppyHead u={u} mood="happy" />
      </g>
      <FrontPaw x={104} y={212} />
      <FrontPaw x={196} y={212} />
    </g>
  );
}

/** Adegan cover: awan, tanaman, buku, kotak, anjing, semuanya menyatu. */
export function HeroScene({ className = '' }: { className?: string }) {
  const u = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 400 360" role="img" aria-label="Anak anjing di dalam Kotak Evaluasi" className={`h-auto select-none ${className}`}>
      <Defs u={u} />
      <FadeMask u={u} w={400} h={360} from={0.84} />
      {/* glow lembut di belakang */}
      <ellipse cx="200" cy="190" rx="170" ry="140" fill="#E6F3FD" opacity=".7" />
      <g mask={`url(#${u}-fade)`}><g mask={`url(#${u}-fadeh)`}><path d={CLOUD_BACK} transform="translate(0 192)" fill={`url(#${u}-cloud)`} filter={`url(#${u}-sh-s)`} /></g></g>

      <Plants u={u} x={70} y={296} />
      <Plants u={u} x={332} y={296} flip />
      <g filter={`url(#${u}-sh-s)`}>
        <StandingBook x={22} y={312} rot={-9} color="#7FB2E5" />
        <StandingBook x={340} y={314} rot={8} />
      </g>

      <g transform="translate(46 -4) scale(.875)" filter={`url(#${u}-sh)`}>
        <g className="animate-bob">
          <BoxPuppy u={u} />
        </g>
      </g>

      {/* awan depan menutup dasar kotak */}
      <g mask={`url(#${u}-fade)`}><g mask={`url(#${u}-fadeh)`}><path d={CLOUD_FRONT} transform="translate(20 262)" fill={`url(#${u}-cloud)`} filter={`url(#${u}-sh-s)`} /></g></g>
      <g transform="translate(86 326)">
        <Leaf u={u} tone="T" rot={-14} s={0.38} />
        <Leaf u={u} tone="B" rot={14} s={0.3} />
      </g>
      <g transform="translate(312 328)">
        <Leaf u={u} tone="B" rot={-12} s={0.3} />
        <Leaf u={u} tone="T" rot={12} s={0.36} />
      </g>
    </svg>
  );
}

/** Adegan terima kasih: anjing senang muncul dari awan di antara tanaman. */
export function JoyScene({ className = '' }: { className?: string }) {
  const u = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 360 320" role="img" aria-label="Anak anjing senang" className={`h-auto select-none ${className}`}>
      <Defs u={u} />
      <FadeMask u={u} w={360} h={320} from={0.86} />
      <ellipse cx="180" cy="150" rx="150" ry="120" fill="#E6F3FD" opacity=".7" />
      <g mask={`url(#${u}-fade)`}><g mask={`url(#${u}-fadeh)`}><path d={CLOUD_BACK} transform="translate(-14 138) scale(.96 .95)" fill={`url(#${u}-cloud)`} filter={`url(#${u}-sh-s)`} /></g></g>
      <Plants u={u} x={58} y={236} />
      <Plants u={u} x={304} y={236} flip />

      <g transform="translate(30 14)" filter={`url(#${u}-sh)`}>
        <g className="animate-bob">
          <JoyBody u={u} />
        </g>
      </g>

      <g mask={`url(#${u}-fade)`}><g mask={`url(#${u}-fadeh)`}><path d={CLOUD_FRONT} transform="translate(0 232)" fill={`url(#${u}-cloud)`} filter={`url(#${u}-sh-s)`} /></g></g>
    </svg>
  );
}
