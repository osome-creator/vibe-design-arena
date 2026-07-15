"use client";

import { useEffect, useRef } from "react";

interface TrendChartProps {
  years: string[];
  revenues: number[];
  netMargins: number[];
  grossMargins: number[];
}

const ACCENT = "#2563eb";
const GRID_COLOR = "#e8e8e8";
const TEXT_COLOR = "#888888";
const TEXT_HEADING = "#1a1a1a";
const BG = "#ffffff";
const FONT = "Geist, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif";

export default function TrendChart({ years, revenues, netMargins, grossMargins }: TrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = 400;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const pad = { top: 32, right: 56, bottom: 48, left: 64 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;

    const maxRev = Math.max(...revenues) * 1.12;
    const maxMargin = 55;

    const x = (i: number) => pad.left + (i / (years.length - 1)) * plotW;
    const yRev = (v: number) => pad.top + plotH - (v / maxRev) * plotH;
    const yMargin = (v: number) => pad.top + plotH - (v / maxMargin) * plotH;

    // ── Clear ────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    // ── Background ───────────────────────────────────────
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // ── Grid lines (minimal, thin) ───────────────────────
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 0.5;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (plotH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
    }

    // ── Axes ─────────────────────────────────────────────
    ctx.strokeStyle = TEXT_HEADING;
    ctx.lineWidth = 1;
    // Left axis
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.stroke();
    // Bottom axis
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + plotH);
    ctx.lineTo(W - pad.right, pad.top + plotH);
    ctx.stroke();

    // ── Left Y-axis labels (Revenue, 亿) ────────────────
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = `11px ${FONT}`;
    ctx.textAlign = "right";
    for (let i = 0; i <= gridLines; i++) {
      const val = (maxRev / gridLines) * (gridLines - i);
      ctx.fillText(val.toFixed(0), pad.left - 8, pad.top + (plotH / gridLines) * i + 4);
    }

    // ── Right Y-axis labels (Margin, %) ──────────────────
    ctx.textAlign = "left";
    for (let i = 0; i <= gridLines; i++) {
      const val = (maxMargin / gridLines) * (gridLines - i);
      ctx.fillText(val.toFixed(0) + "%", W - pad.right + 10, pad.top + (plotH / gridLines) * i + 4);
    }

    // ── Revenue line (solid) ─────────────────────────────
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    revenues.forEach((v, i) => {
      i === 0 ? ctx.moveTo(x(i), yRev(v)) : ctx.lineTo(x(i), yRev(v));
    });
    ctx.stroke();

    // Revenue dots
    revenues.forEach((v, i) => {
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(x(i), yRev(v), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      ctx.stroke();

      ctx.fillStyle = TEXT_HEADING;
      ctx.font = `bold 11px ${FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1), x(i), yRev(v) - 10);
    });

    // ── Gross margin line (dashed) ───────────────────────
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    grossMargins.forEach((v, i) => {
      i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v));
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Gross margin dots
    grossMargins.forEach((v, i) => {
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = TEXT_COLOR;
      ctx.font = `10px ${FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) - 12);
    });

    // ── Net margin line (dotted) ─────────────────────────
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.setLineDash([2, 5]);
    ctx.beginPath();
    netMargins.forEach((v, i) => {
      i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v));
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Net margin dots
    netMargins.forEach((v, i) => {
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = TEXT_COLOR;
      ctx.font = `10px ${FONT}`;
      ctx.textAlign = "center";
      // Offset label to avoid collision with gross margin label above
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) + 18);
    });

    // ── X-axis labels ────────────────────────────────────
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = `12px ${FONT}`;
    ctx.textAlign = "center";
    years.forEach((y, i) => ctx.fillText(y, x(i), pad.top + plotH + 22));

    // ── Legend ───────────────────────────────────────────
    const lx = pad.left;
    const ly = H - 10;
    ctx.font = `11px ${FONT}`;
    ctx.textAlign = "left";

    // Revenue (solid)
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 28, ly);
    ctx.stroke();
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(lx + 14, ly, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lx + 14, ly, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = TEXT_HEADING;
    ctx.fillText("营收", lx + 36, ly + 5);

    // Gross margin (dashed)
    const gx = lx + 100;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, ly);
    ctx.lineTo(gx + 28, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(gx + 14, ly, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(gx + 14, ly, 3.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = TEXT_HEADING;
    ctx.fillText("毛利率", gx + 36, ly + 5);

    // Net margin (dotted)
    const nx = lx + 210;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 5]);
    ctx.beginPath();
    ctx.moveTo(nx, ly);
    ctx.lineTo(nx + 28, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(nx + 14, ly, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(nx + 14, ly, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = TEXT_HEADING;
    ctx.fillText("净利率", nx + 32, ly + 5);
  }, [years, revenues, netMargins, grossMargins]);

  return (
    <div className="swiss-chart-container">
      <canvas ref={canvasRef} className="w-full" height={400} />
    </div>
  );
}
