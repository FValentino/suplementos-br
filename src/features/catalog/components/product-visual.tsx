import type { ProductVisual as ProductVisualData } from "@/features/catalog/types/product";

interface ProductVisualProps {
  visual: ProductVisualData;
  name: string;
  brand: string;
  className?: string;
}

const INK = "#10141C";
const WHITE = "#FFFFFF";

function splitName(name: string): string[] {
  const words = name.replace(/\s+/g, " ").trim().split(" ");

  if (words.length <= 1) {
    return [name.toUpperCase()];
  }

  if (words.length === 2) {
    return [words[0].toUpperCase(), words[1].toUpperCase()];
  }

  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(" ").toUpperCase(), words.slice(middle).join(" ").toUpperCase()];
}

function LabelText({
  brand,
  name,
  x,
  y,
  width,
  scale = 1,
}: {
  brand: string;
  name: string;
  x: number;
  y: number;
  width: number;
  scale?: number;
}) {
  const lines = splitName(name);
  const fontSize = (lines.some((line) => line.length > 12) ? 12 : 15) * scale;

  return (
    <>
      <text
        x={x + width / 2}
        y={y + 14}
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize={8.5 * scale}
        fontWeight="700"
        letterSpacing="1.4"
        fill="#5B6575"
      >
        {brand.toUpperCase()}
      </text>
      {lines.map((line, index) => (
        <text
          key={line + index}
          x={x + width / 2}
          y={y + 34 + index * (fontSize + 3)}
          textAnchor="middle"
          fontFamily="var(--font-display), sans-serif"
          fontSize={fontSize}
          fontWeight="800"
          letterSpacing="-0.3"
          fill={INK}
        >
          {line}
        </text>
      ))}
    </>
  );
}

function Tub({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="96" y="100" width="128" height="30" rx="12" fill={INK} />
      <rect x="102" y="104" width="116" height="6" rx="3" fill={WHITE} opacity="0.14" />
      <rect x="88" y="122" width="144" height="228" rx="22" fill={visual.accent} />
      <rect x="96" y="128" width="16" height="216" rx="8" fill={WHITE} opacity="0.18" />
      <rect x="88" y="186" width="144" height="116" fill={WHITE} opacity="0.94" />
      <rect x="88" y="186" width="144" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={88} y={198} width={144} />
      <rect x="146" y="278" width="28" height="4" rx="2" fill={visual.accent} />
    </>
  );
}

function Jar({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="82" y="146" width="156" height="34" rx="12" fill={INK} />
      <rect x="88" y="150" width="144" height="6" rx="3" fill={WHITE} opacity="0.14" />
      <rect x="74" y="172" width="172" height="178" rx="24" fill={visual.accent} />
      <rect x="84" y="178" width="16" height="166" rx="8" fill={WHITE} opacity="0.18" />
      <rect x="74" y="228" width="172" height="96" fill={WHITE} opacity="0.94" />
      <rect x="74" y="228" width="172" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={74} y={240} width={172} />
    </>
  );
}

function Pouch({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="86" y="88" width="148" height="26" rx="8" fill={INK} opacity="0.88" />
      <path
        d="M94 114h132a16 16 0 0 1 16 16v170a22 22 0 0 1-22 22H100a22 22 0 0 1-22-22V130a16 16 0 0 1 16-16Z"
        fill={visual.accent}
      />
      <rect x="88" y="126" width="16" height="184" rx="8" fill={WHITE} opacity="0.18" />
      <rect x="84" y="172" width="152" height="112" fill={WHITE} opacity="0.94" />
      <rect x="84" y="172" width="152" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={84} y={184} width={152} />
    </>
  );
}

function Shaker({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="118" y="84" width="84" height="34" rx="12" fill={INK} />
      <rect x="108" y="112" width="104" height="238" rx="26" fill={visual.accent} />
      <rect x="116" y="120" width="14" height="222" rx="7" fill={WHITE} opacity="0.16" />
      <path d="M108 128h104M108 140h104" stroke={WHITE} strokeOpacity="0.3" strokeWidth="3" />
      <rect x="108" y="192" width="104" height="92" fill={WHITE} opacity="0.94" />
      <rect x="108" y="192" width="104" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={108} y={204} width={104} scale={0.82} />
    </>
  );
}

function Bottle({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="134" y="96" width="52" height="34" rx="7" fill={INK} />
      <rect x="140" y="126" width="40" height="16" fill={visual.accent} />
      <rect x="116" y="138" width="88" height="212" rx="18" fill={visual.accent} />
      <rect x="124" y="146" width="12" height="196" rx="6" fill={WHITE} opacity="0.18" />
      <rect x="116" y="200" width="88" height="104" fill={WHITE} opacity="0.94" />
      <rect x="116" y="200" width="88" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={116} y={212} width={88} scale={0.74} />
    </>
  );
}

function Box({ visual, name, brand }: Omit<ProductVisualProps, "className">) {
  return (
    <>
      <rect x="92" y="132" width="136" height="212" rx="14" fill={visual.accent} />
      <rect x="92" y="132" width="136" height="28" rx="12" fill={INK} opacity="0.85" />
      <rect x="212" y="142" width="16" height="198" rx="7" fill={WHITE} opacity="0.14" />
      <rect x="92" y="198" width="136" height="112" fill={WHITE} opacity="0.94" />
      <rect x="92" y="198" width="136" height="7" fill={visual.accent} />
      <LabelText brand={brand} name={name} x={92} y={210} width={136} />
    </>
  );
}

export function ProductVisual({ visual, name, brand, className }: ProductVisualProps) {
  return (
    <svg
      viewBox="0 0 320 380"
      className={className}
      role="img"
      aria-label={`${name} de ${brand}`}
    >
      <ellipse cx="160" cy="356" rx="86" ry="12" fill={INK} opacity="0.08" />
      {visual.variant === "tub" ? <Tub visual={visual} name={name} brand={brand} /> : null}
      {visual.variant === "jar" ? <Jar visual={visual} name={name} brand={brand} /> : null}
      {visual.variant === "pouch" ? <Pouch visual={visual} name={name} brand={brand} /> : null}
      {visual.variant === "shaker" ? <Shaker visual={visual} name={name} brand={brand} /> : null}
      {visual.variant === "bottle" ? <Bottle visual={visual} name={name} brand={brand} /> : null}
      {visual.variant === "box" ? <Box visual={visual} name={name} brand={brand} /> : null}
    </svg>
  );
}
