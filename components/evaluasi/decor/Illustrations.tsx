import type { SVGProps } from 'react';

type S = SVGProps<SVGSVGElement>;

/* ───────────── ikon & dekor kecil ───────────── */

export function Star({ filled = true, ...p }: S & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...p}>
      <path
        d="M12 1.8l3.1 6.8 7.4.9-5.5 5.1 1.5 7.4L12 18.2l-6.5 3.8L7 14.6 1.5 9.5l7.4-.9z"
        fill={filled ? '#FFD34D' : '#FFF2BF'}
        stroke={filled ? '#EFA91C' : '#F3C34F'}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hati outline kuning seperti di mockup. solid = terisi. */
export function Heart({ solid = false, ...p }: S & { solid?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...p}>
      <path
        d="M12 21.5S3 15.8 3 9.6A4.7 4.7 0 0112 7.3a4.7 4.7 0 019 2.3c0 6.2-9 11.9-9 11.9z"
        fill={solid ? '#FFD34D' : 'none'}
        stroke="#F5C542"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Paw(p: S) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <ellipse cx="12" cy="16" rx="5.2" ry="4.4" />
      <ellipse cx="4.8" cy="10.5" rx="2.2" ry="2.9" transform="rotate(-18 4.8 10.5)" />
      <ellipse cx="9.3" cy="5.6" rx="2.2" ry="3" transform="rotate(-6 9.3 5.6)" />
      <ellipse cx="14.7" cy="5.6" rx="2.2" ry="3" transform="rotate(6 14.7 5.6)" />
      <ellipse cx="19.2" cy="10.5" rx="2.2" ry="2.9" transform="rotate(18 19.2 10.5)" />
    </svg>
  );
}

/** Tiga coretan kuning "///" khas mockup. */
export function Dashes(p: S) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden fill="none" stroke="#F5C542" strokeWidth="3" strokeLinecap="round" {...p}>
      <path d="M4 23l6-5M13 15l3-10M23 18l-6-6" />
    </svg>
  );
}

export function Cross(p: S) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="#F5C542" strokeWidth="3.4" strokeLinecap="round" {...p}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function Plane(p: S) {
  return (
    <svg viewBox="0 0 48 40" aria-hidden fill="none" strokeLinejoin="round" strokeLinecap="round" {...p}>
      <path d="M2 18L46 2 34 38 22 26z" fill="#FFFFFF" stroke="#2F5D9E" strokeWidth="2.4" />
      <path d="M2 18l20 8L46 2z" fill="#CFE5F8" />
      <path d="M22 26L46 2M22 26l-1 11 7-8" stroke="#2F5D9E" strokeWidth="2.2" />
    </svg>
  );
}

export function PlaneTrail(p: S) {
  return (
    <svg viewBox="0 0 50 50" aria-hidden fill="none" stroke="#7FB2E5" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 6" {...p}>
      <path d="M4 46C10 30 24 22 44 18" />
    </svg>
  );
}

export function Rocket(p: S) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden strokeLinejoin="round" strokeLinecap="round" {...p}>
      <path d="M20 3c7 6 8 15 5 24h-10c-3-9-2-18 5-24z" fill="#fff" stroke="#2F5D9E" strokeWidth="2" />
      <circle cx="20" cy="14" r="3.4" fill="#BFE0F7" stroke="#2F5D9E" strokeWidth="1.8" />
      <path d="M15 22l-6 7 7-2M25 22l6 7-7-2" fill="#CFE5F8" stroke="#2F5D9E" strokeWidth="1.8" />
      <path d="M17.5 28q2.5 9 5 0z" fill="#FFD34D" stroke="#F0A818" strokeWidth="1.4" />
    </svg>
  );
}

export function Cloud(p: S) {
  return (
    <svg viewBox="0 0 120 64" aria-hidden fill="currentColor" {...p}>
      <path d="M16 58C3 58 0 40 14 37C12 22 29 13 40 22C44 5 72 1 82 18C96 10 114 20 108 37C122 40 121 58 106 58Z" />
    </svg>
  );
}

export function Squiggle(p: S) {
  return (
    <svg viewBox="0 0 90 12" aria-hidden fill="none" stroke="#F5C542" strokeWidth="3" strokeLinecap="round" {...p}>
      <path d="M3 8Q12 0 21 8T39 8T57 8T75 8T87 6" />
    </svg>
  );
}

export function Leaf({ tone = 'teal', ...p }: S & { tone?: 'teal' | 'blue' }) {
  return (
    <svg viewBox="0 0 40 60" aria-hidden {...p}>
      <path d="M20 58C4 44 2 22 20 2c18 20 16 42 0 56z" fill={tone === 'teal' ? '#7BB6B0' : '#A4CBE3'} />
      <path d="M20 54V12" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Logo rumah outline di header. */
export function HouseOutline(p: S) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden fill="none" stroke="#2F5D9E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 15L16 4l12 11" />
      <path d="M7 13v14h18V13" fill="#E3F1FC" />
      <path d="M13 27v-8h6v8" />
      <path d="M22 8V5h3v6" />
    </svg>
  );
}

export function HouseSolid(p: S) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M12 2.5l10 9h-3V21h-5v-6h-4v6H5v-9.5H2z" />
    </svg>
  );
}

/** Wajah rating 1–5 (flat, kuning). */
export function Face({ kind, ...p }: S & { kind: 1 | 2 | 3 | 4 | 5 }) {
  const eye = (cx: number) => <circle cx={cx} cy="17" r="2.2" fill="#5A3A22" />;
  const heart = (cx: number) => (
    <g transform={`translate(${cx} 17)`}>
      <path d="M0 4.5C-6 .5-5-4.5 0-2.4 5-4.5 6 .5 0 4.5z" fill="#E5484D" />
    </g>
  );
  return (
    <svg viewBox="0 0 40 40" aria-hidden fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="20" cy="20" r="17.5" fill="#FFD764" stroke="#E7A53A" strokeWidth="2" />
      {kind === 5 ? (
        <>
          {heart(13.5)}
          {heart(26.5)}
        </>
      ) : (
        <>
          {eye(13.5)}
          {eye(26.5)}
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M9.5 11.5l7 2.5M30.5 11.5l-7 2.5" stroke="#5A3A22" strokeWidth="2" />
          <path d="M13 29q7-7 14 0" stroke="#5A3A22" strokeWidth="2.4" />
        </>
      )}
      {kind === 2 && (
        <>
          <path d="M10 12.5l6 1.5M30 12.5l-6 1.5" stroke="#5A3A22" strokeWidth="1.8" />
          <path d="M14 27.5q6-3.5 12 0" stroke="#5A3A22" strokeWidth="2.4" />
        </>
      )}
      {kind === 3 && <path d="M14 26.5q6 3 12 0" stroke="#5A3A22" strokeWidth="2.4" />}
      {kind === 4 && <path d="M12 24q8 9 16 0" stroke="#5A3A22" strokeWidth="2.4" />}
      {kind === 5 && <path d="M12 24q8 11 16 0z" fill="#8A3434" stroke="#5A3A22" strokeWidth="2" />}
      {(kind === 4 || kind === 5) && (
        <>
          <circle cx="9" cy="24" r="2.6" fill="#FF9AA2" opacity=".6" />
          <circle cx="31" cy="24" r="2.6" fill="#FF9AA2" opacity=".6" />
        </>
      )}
    </svg>
  );
}

/** Bintang 4 sudut (kilau). */
export function Sparkle4({ color = '#FFE08A', ...p }: S & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...p}>
      <path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill={color} />
    </svg>
  );
}

export function Plus({ color = '#9CC9F0', ...p }: S & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" {...p}>
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

export function Dot({ color = '#BFE0F7', ...p }: S & { color?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden {...p}>
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  );
}

export function Book(p: S) {
  return (
    <svg viewBox="0 0 40 60" aria-hidden {...p}>
      <rect x="4" y="4" width="30" height="52" rx="4" fill="#5B8FC9" stroke="#2F5D9E" strokeWidth="2.2" />
      <rect x="30" y="7" width="6" height="46" rx="1" fill="#fff" stroke="#2F5D9E" strokeWidth="1.6" />
      <path d="M10 16h16M10 23h11" stroke="#fff" strokeOpacity=".7" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
