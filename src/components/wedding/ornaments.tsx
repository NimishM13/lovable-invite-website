/**
 * Hand-drawn style SVG ornaments for the invitation. All geometry is deterministic
 * (no randomness) so server and client markup always match.
 * Colours come from `currentColor` or CSS custom properties so each chapter can tint them.
 */

const LEAF = "M0 0 C5 -5 13 -6 20 0 C13 6 5 5 0 0Z";
const PETAL = "M0 0 C6 -10 6 -22 0 -32 C-6 -22 -6 -10 0 0Z";

export function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`lotus-divider ${className}`} aria-hidden="true">
      <span />
      <svg
        viewBox="0 0 60 30"
        width="46"
        height="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <path d="M30 3 C35 10 35 19 30 26 C25 19 25 10 30 3Z" />
        <path d="M30 26 C22 24 15 18 13 10 C20 12 27 17 30 26Z" />
        <path d="M30 26 C38 24 45 18 47 10 C40 12 33 17 30 26Z" />
        <path d="M30 26 C20 27 9 24 3 18 C11 17 22 20 30 26Z" opacity=".7" />
        <path d="M30 26 C40 27 51 24 57 18 C49 17 38 20 30 26Z" opacity=".7" />
        <circle cx="30" cy="28.5" r="1" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

export function Mandala({ className = "", petals = 16 }: { className?: string; petals?: number }) {
  const ring = (count: number, radius: number, scale: number, offset = 0) =>
    Array.from({ length: count }, (_, i) => (
      <path
        key={i}
        d={PETAL}
        transform={`rotate(${(360 / count) * i + offset}) translate(0 ${-radius}) scale(${scale})`}
      />
    ));
  return (
    <svg
      className={`mandala ${className}`}
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth=".6"
      aria-hidden="true"
    >
      <circle r="14" />
      <circle r="9" strokeDasharray="1 2" />
      <g>{ring(8, 14, 0.55)}</g>
      <circle r="34" />
      <g>{ring(petals, 34, 0.95)}</g>
      <g opacity=".7">{ring(petals, 38, 0.8, 180 / petals)}</g>
      <circle r="70" strokeDasharray="1 3" />
      <g>{ring(petals * 2, 72, 0.45)}</g>
      {Array.from({ length: petals * 2 }, (_, i) => {
        const a = (Math.PI * 2 * i) / (petals * 2);
        return (
          <circle
            key={i}
            cx={(92 * Math.sin(a)).toFixed(2)}
            cy={(-92 * Math.cos(a)).toFixed(2)}
            r="1.4"
            fill="currentColor"
            stroke="none"
          />
        );
      })}
    </svg>
  );
}

/** A trailing vine with leaves and blossoms for frame corners. Flip with CSS. */
export function FloralCorner({ className = "" }: { className?: string }) {
  const leaves: [number, number, number][] = [
    [14, 98, -70],
    [22, 80, -120],
    [30, 66, -40],
    [44, 52, -100],
    [56, 42, -20],
    [72, 32, -80],
    [88, 24, 0],
    [104, 18, -60],
  ];
  const blossoms: [number, number, number][] = [
    [40, 60, 6],
    [80, 28, 5],
    [18, 88, 4.5],
  ];
  return (
    <svg
      className={`floral-corner ${className}`}
      viewBox="0 0 130 130"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 126 C8 90 30 56 62 38 C82 27 104 20 126 18"
        stroke="var(--orn-stem, currentColor)"
        strokeWidth="1"
      />
      <path
        d="M22 82 C34 84 42 92 46 104"
        stroke="var(--orn-stem, currentColor)"
        strokeWidth=".8"
      />
      {leaves.map(([x, y, r], i) => (
        <path
          key={i}
          d={LEAF}
          transform={`translate(${x} ${y}) rotate(${r})`}
          fill="var(--orn-leaf, currentColor)"
          fillOpacity=".35"
          stroke="var(--orn-stem, currentColor)"
          strokeWidth=".6"
        />
      ))}
      {blossoms.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 6 }, (_, p) => (
            <ellipse
              key={p}
              cx="0"
              cy={-s}
              rx={s * 0.55}
              ry={s}
              transform={`rotate(${p * 60})`}
              fill="var(--orn-bloom, currentColor)"
              fillOpacity=".55"
            />
          ))}
          <circle r={s * 0.45} fill="var(--orn-center, currentColor)" />
        </g>
      ))}
    </svg>
  );
}

/** A cusped Rajput-style arch outline that stretches to any box while keeping hairline strokes. */
export function ArchOutline({
  className = "",
  double = true,
}: {
  className?: string;
  double?: boolean;
}) {
  const arch = (i: number) =>
    `M${i} 300 V${110 + i} C${i} ${78 + i} ${18 + i} ${58 + i * 0.6} ${36 + i * 0.5} ${48 + i * 0.6} C${40 + i * 0.4} ${30 + i * 0.8} ${52 + i * 0.3} ${14 + i} 100 ${2 + i} C${148 - i * 0.3} ${14 + i} ${160 - i * 0.4} ${30 + i * 0.8} ${164 - i * 0.5} ${48 + i * 0.6} C${182 - i} ${58 + i * 0.6} ${200 - i} ${78 + i} ${200 - i} ${110 + i} V300`;
  return (
    <svg
      className={`arch-outline ${className}`}
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d={arch(1)} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {double && (
        <path d={arch(7)} strokeWidth=".6" vectorEffect="non-scaling-stroke" opacity=".7" />
      )}
    </svg>
  );
}

/** Festive toran: scalloped marigold strings with mango leaves. */
export function Toran({ className = "", swags = 8 }: { className?: string; swags?: number }) {
  const width = swags * 50;
  return (
    <svg
      className={`toran ${className}`}
      viewBox={`0 0 ${width} 64`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <path d={`M0 3 H${width}`} stroke="var(--gold)" strokeWidth="1.2" />
      {Array.from({ length: swags }, (_, i) => {
        const x = i * 50;
        const beads = Array.from({ length: 9 }, (_, b) => {
          const t = (b + 0.5) / 9;
          return [x + t * 50, 3 + 4 * 22 * t * (1 - t)] as const;
        });
        return (
          <g key={i}>
            {beads.map(([bx, by], b) => (
              <circle
                key={b}
                cx={bx.toFixed(1)}
                cy={by.toFixed(1)}
                r={b % 2 ? 3.2 : 3.8}
                fill={b % 3 === 1 ? "var(--marigold-deep)" : "var(--marigold)"}
              />
            ))}
            <path
              d={LEAF}
              transform={`translate(${x + 50} 4) rotate(90) scale(1.05)`}
              fill="var(--sage)"
            />
            <path
              d={LEAF}
              transform={`translate(${x + 50} 4) rotate(70) scale(.85)`}
              fill="var(--sage-deep)"
            />
            <line x1={x + 25} y1="25" x2={x + 25} y2="42" stroke="var(--gold)" strokeWidth=".8" />
            <circle cx={x + 25} cy="45" r="3" fill="var(--rose)" />
            <circle cx={x + 25} cy="51" r="2" fill="var(--marigold)" />
          </g>
        );
      })}
    </svg>
  );
}

export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg className={`diya ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <ellipse
        className="diya-glow"
        cx="20"
        cy="15"
        rx="10"
        ry="12"
        fill="var(--marigold)"
        opacity=".22"
      />
      <path
        className="diya-flame"
        d="M20 6 C23 11 24 15 20 19 C16 15 17 11 20 6Z"
        fill="var(--marigold)"
      />
      <path
        d="M20 10 C21.5 13 21.5 15 20 17 C18.5 15 18.5 13 20 10Z"
        fill="var(--paper-light)"
        opacity=".8"
      />
      <path
        d="M5 21 C9 21 14 22 20 22 C26 22 31 21 35 21 C33 29 27 33 20 33 C13 33 7 29 5 21Z"
        fill="var(--terracotta)"
      />
      <path d="M8 24 C14 26 26 26 32 24" stroke="var(--gold)" strokeWidth=".8" fill="none" />
    </svg>
  );
}

/** Wax seal with the couple's monogram. */
export function Seal({ initials }: { initials: [string, string] }) {
  const edge = Array.from({ length: 36 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 36;
    const r = 48 + (i % 3 === 0 ? 2.2 : i % 2 ? -1.2 : 0.8);
    return `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  });
  return (
    <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
      <path d={`M${edge.join(" L")}Z`} fill="var(--burgundy)" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="var(--seal-line)" strokeWidth="1" />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="var(--seal-line)"
        strokeWidth=".5"
        strokeDasharray="1.5 2.5"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="var(--seal-line)"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="26"
      >
        {initials[0]}
        <tspan fontFamily="'Pinyon Script', cursive" fontSize="20" dx="1">
          &amp;
        </tspan>
        <tspan dx="1">{initials[1]}</tspan>
      </text>
    </svg>
  );
}

const PETAL_LAYOUT = [
  { left: 8, delay: 0, duration: 16, size: 12 },
  { left: 22, delay: -6, duration: 19, size: 9 },
  { left: 37, delay: -11, duration: 17, size: 11 },
  { left: 55, delay: -3, duration: 21, size: 8 },
  { left: 68, delay: -9, duration: 18, size: 12 },
  { left: 81, delay: -14, duration: 20, size: 10 },
  { left: 93, delay: -5, duration: 17, size: 9 },
];

/** A handful of slowly drifting petals. Hidden entirely for reduced motion. */
export function Petals({ className = "", count = 7 }: { className?: string; count?: number }) {
  return (
    <div className={`petals ${className}`} aria-hidden="true">
      {PETAL_LAYOUT.slice(0, count).map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size * 1.4,
          }}
        >
          <svg viewBox="0 0 10 14">
            <path d="M5 0 C9 3 10 9 5 14 C0 9 1 3 5 0Z" />
          </svg>
        </i>
      ))}
    </div>
  );
}

/** Tiny line-art pavilion used on venue cards. */
export function Pavilion({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pavilion ${className}`}
      viewBox="0 0 120 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M60 4 V10" />
      <circle cx="60" cy="12" r="2" />
      <path d="M38 34 C38 22 48 14 60 14 C72 14 82 22 82 34 Z" />
      <path d="M30 34 H90 M32 38 H88" />
      <path d="M36 88 V50 C36 44 40 40 44 40 M84 88 V50 C84 44 80 40 76 40" />
      <path d="M46 88 V58 C46 50 52 44 60 44 C68 44 74 50 74 58 V88" />
      <path d="M14 88 H106" />
      <path d="M20 88 V60 M100 88 V60" opacity=".6" />
      <path d="M16 60 C16 54 24 54 24 60 M96 60 C96 54 104 54 104 60" opacity=".6" />
    </svg>
  );
}
