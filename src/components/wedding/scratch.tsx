import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { weddingSettings } from "@/config/wedding";
import { CountdownDigits } from "./countdown";
import { FloralCorner, LotusDivider, Mandala } from "./ornaments";

/** Share of the seal that must be scratched before it dissolves on its own. */
export const SCRATCH_REVEAL_RATIO = 0.5;

/**
 * Share of the foil scratched away, from canvas RGBA data. `initial` is the untouched
 * foil, so pixels that were never foil (the corners around a round seal) are ignored.
 */
export function scratchedRatio(data: Uint8ClampedArray, initial?: Uint8ClampedArray) {
  let foil = 0;
  let cleared = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (initial && initial[i] === 0) continue;
    foil += 1;
    if (data[i] === 0) cleared += 1;
  }
  return foil === 0 ? 0 : cleared / foil;
}

const SAMPLE = 64; // ratio is measured on a small copy of the foil: cheap and accurate enough

function paintFoil(canvas: HTMLCanvasElement, hint: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const size = canvas.clientWidth;
  if (!size) return false;
  canvas.width = canvas.height = Math.round(size * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const r = size / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.clip();
  const gold = ctx.createLinearGradient(0, 0, size, size);
  gold.addColorStop(0, "#EAD29A");
  gold.addColorStop(0.35, "#C7A766");
  gold.addColorStop(0.55, "#F1DDAA");
  gold.addColorStop(0.8, "#B08E52");
  gold.addColorStop(1, "#8E6F3A");
  ctx.fillStyle = gold;
  ctx.fillRect(0, 0, size, size);
  // Fine guilloché rings and a deterministic glitter so every seal looks the same.
  ctx.strokeStyle = "rgba(255,248,225,.28)";
  ctx.lineWidth = 0.6;
  for (let ring = r * 0.18; ring < r; ring += r * 0.09) {
    ctx.beginPath();
    ctx.arc(r, r, ring, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 70; i += 1) {
    const angle = i * 2.39996;
    const dist = Math.sqrt(i / 70) * r * 0.95;
    ctx.fillStyle = i % 3 ? "rgba(255,250,232,.55)" : "rgba(117,60,72,.18)";
    ctx.beginPath();
    ctx.arc(
      r + Math.cos(angle) * dist,
      r + Math.sin(angle) * dist,
      i % 4 ? 0.9 : 1.6,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(90,44,55,.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(r, r, r - 6, 0, Math.PI * 2);
  ctx.stroke();
  const display = getComputedStyle(document.documentElement).getPropertyValue("--font-display");
  ctx.fillStyle = "rgba(90,44,55,.78)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${Math.round(size * 0.075)}px ${display || "serif"}`;
  ctx.fillText("✦", r, r - size * 0.12);
  ctx.font = `italic 500 ${Math.round(size * 0.13)}px ${display || "serif"}`;
  ctx.fillText(hint, r, r + size * 0.03);
  ctx.restore();
  return true;
}

function ScratchSeal({
  label,
  value,
  revealed,
  onReveal,
}: {
  label: string;
  value: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [painted, setPainted] = useState(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const initial = useRef<Uint8ClampedArray | null>(null);
  const sampler = useRef<CanvasRenderingContext2D | null>(null);
  const moves = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const paint = () => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas || !paintFoil(canvas, "scratch")) return;
      const sample = document.createElement("canvas");
      sample.width = sample.height = SAMPLE;
      const sctx = sample.getContext("2d", { willReadFrequently: true });
      if (sctx) {
        sctx.drawImage(canvas, 0, 0, SAMPLE, SAMPLE);
        initial.current = sctx.getImageData(0, 0, SAMPLE, SAMPLE).data;
        sampler.current = sctx;
      }
      setPainted(true);
    };
    // Paint once the display face has loaded so the hint uses it; fall back immediately if not.
    if (document.fonts?.ready) void document.fonts.ready.then(paint, paint);
    else paint();
    return () => {
      cancelled = true;
    };
  }, []);

  const measure = () => {
    const canvas = canvasRef.current;
    const sctx = sampler.current;
    if (!canvas || !sctx || !initial.current) return;
    sctx.clearRect(0, 0, SAMPLE, SAMPLE);
    sctx.drawImage(canvas, 0, 0, SAMPLE, SAMPLE);
    const ratio = scratchedRatio(sctx.getImageData(0, 0, SAMPLE, SAMPLE).data, initial.current);
    if (ratio >= SCRATCH_REVEAL_RATIO) onReveal();
  };

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || revealed) return;
    const box = canvas.getBoundingClientRect();
    const point = { x: event.clientX - box.left, y: event.clientY - box.top };
    const from = last.current ?? point;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(22, box.width * 0.2);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x + 0.01, point.y);
    ctx.stroke();
    last.current = point;
    moves.current += 1;
    if (moves.current % 6 === 0) measure();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onReveal();
    }
  };

  return (
    <div className={`scratch-seal${revealed ? " is-revealed" : ""}`}>
      <div className="scratch-face">
        <span className="scratch-value">{value}</span>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className={`scratch-foil${painted ? " is-painted" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`Scratch to reveal the ${label.toLowerCase()}`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              last.current = null;
              scratch(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons || event.pointerType === "touch") scratch(event);
            }}
            onPointerUp={() => {
              last.current = null;
              measure();
            }}
            onPointerCancel={() => (last.current = null)}
            onKeyDown={onKeyDown}
          />
        )}
      </div>
      <span className="scratch-label">{label}</span>
    </div>
  );
}

export function SaveTheDate() {
  const seals = weddingSettings.saveTheDate;
  const [revealed, setRevealed] = useState<boolean[]>(() => seals.map(() => false));
  const allRevealed = revealed.every(Boolean);
  const reveal = (index: number) =>
    setRevealed((current) => current.map((value, i) => value || i === index));

  return (
    <section
      id="save-the-date"
      className="countdown-section section-anchor"
      aria-labelledby="save-the-date-title"
    >
      <Mandala className="countdown-mandala" petals={20} />
      <div className="countdown-frame" data-reveal>
        <FloralCorner className="corner tl" />
        <FloralCorner className="corner tr" />
        <FloralCorner className="corner bl" />
        <FloralCorner className="corner br" />
        <p className="eyebrow">Save the date</p>
        <h2 id="save-the-date-title">
          A little secret <em>for you</em>
        </h2>
        <LotusDivider />
        <div className={`scratch-row${allRevealed ? " is-complete" : ""}`}>
          {seals.map((seal, index) => (
            <ScratchSeal
              key={seal.label}
              label={seal.label}
              value={seal.value}
              revealed={revealed[index] ?? false}
              onReveal={() => reveal(index)}
            />
          ))}
        </div>
        {allRevealed ? (
          <div className="scratch-after" aria-live="polite">
            <p className="countdown-static">We can’t wait to celebrate with you.</p>
            <CountdownDigits />
          </div>
        ) : (
          <div className="scratch-hint">
            <p>Scratch the three gold seals to reveal our wedding date.</p>
            <Button variant="stationery" onClick={() => setRevealed(seals.map(() => true))}>
              Reveal all
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
