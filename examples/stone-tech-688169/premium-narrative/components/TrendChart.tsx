"use client";

import { useEffect, useRef } from "react";

interface TrendChartProps {
  years: string[];
  revenues: number[];
  netMargins: number[];
  grossMargins: number[];
}

const GOLD = "#b8860b";
const GOLD_LIGHT = "#d4a843";
const TERRACOTTA = "#c25a3c";
const FOREST = "#2d6a4f";
const GRID = "#f0e6d8";
const TEXT_MUTED = "#a89880";
const TEXT_DARK = "#5c4a3a";
const HEADING = "#3d2e24";

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

    const pad = { top: 30, right: 60, bottom: 50, left: 70 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;
    const maxRev = Math.max(...revenues) * 1.15;
    const maxMargin = 60;

    const x = (i: number) => pad.left + (i / (years.length - 1)) * plotW;
    const yRev = (v: number) => pad.top + plotH - (v / maxRev) * plotH;
    const yMargin = (v: number) => pad.top + plotH - (v / maxMargin) * plotH;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (plotH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
    }

    // Y-axis labels — left (revenue)
    ctx.fillStyle = TEXT_MUTED;
    ctx.font = "11px -apple-system, sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const val = (maxRev / 5) * (5 - i);
      ctx.fillText(val.toFixed(0) + "亿", pad.left - 8, pad.top + (plotH / 5) * i + 4);
    }

    // Y-axis labels — right (margin %)
    ctx.textAlign = "left";
    for (let i = 0; i <= 5; i++) {
      const val = (maxMargin / 5) * (5 - i);
      ctx.fillText(val.toFixed(0) + "%", W - pad.right + 10, pad.top + (plotH / 5) * i + 4);
    }

    // Revenue bars — gold gradient
    const barW = Math.min(plotW / years.length * 0.5, 50);
    revenues.forEach((v, i) => {
      const bx = x(i) - barW / 2;
      const by = yRev(v);
      const grad = ctx.createLinearGradient(bx, by, bx, pad.top + plotH);
      if (i >= 2) {
        grad.addColorStop(0, GOLD_LIGHT);
        grad.addColorStop(1, "rgba(212,168,67,0.25)");
      } else {
        grad.addColorStop(0, GOLD);
        grad.addColorStop(1, "rgba(184,134,11,0.3)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(bx, by, barW, pad.top + plotH - by);

      ctx.fillStyle = HEADING;
      ctx.font = "bold 11px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "亿", x(i), by - 6);
    });

    // Net margin line — forest green (solid)
    ctx.strokeStyle = FOREST;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    netMargins.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v))));
    ctx.stroke();
    netMargins.forEach((v, i) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = FOREST;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = FOREST;
      ctx.font = "bold 10px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) - 14);
    });

    // Gross margin line — terracotta (dashed)
    ctx.strokeStyle = TERRACOTTA;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    grossMargins.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v))));
    ctx.stroke();
    ctx.setLineDash([]);
    grossMargins.forEach((v, i) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = TERRACOTTA;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = TERRACOTTA;
      ctx.font = "bold 10px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) - 12);
    });

    // X-axis labels
    ctx.fillStyle = TEXT_MUTED;
    ctx.font = "12px -apple-system, sans-serif";
    ctx.textAlign = "center";
    years.forEach((y, i) => ctx.fillText(y, x(i), pad.top + plotH + 20));

    // Legend
    const lx = pad.left;
    const ly = H - 8;
    ctx.font = "11px -apple-system, sans-serif";

    // Revenue
    ctx.fillStyle = GOLD;
    ctx.fillRect(lx, ly - 6, 14, 14);
    ctx.fillStyle = TEXT_DARK;
    ctx.textAlign = "left";
    ctx.fillText("营收（亿元）", lx + 20, ly + 6);

    // Net margin (forest green, solid)
    ctx.strokeStyle = FOREST;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(lx + 130, ly + 1); ctx.lineTo(lx + 155, ly + 1); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(lx + 142, ly + 1, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = FOREST; ctx.beginPath(); ctx.arc(lx + 142, ly + 1, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.fillText("净利率（%）", lx + 164, ly + 6);

    // Gross margin (terracotta, dashed)
    ctx.strokeStyle = TERRACOTTA;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath(); ctx.moveTo(lx + 260, ly + 1); ctx.lineTo(lx + 285, ly + 1); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(lx + 272, ly + 1, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = TERRACOTTA; ctx.beginPath(); ctx.arc(lx + 272, ly + 1, 3, 0, Math.PI * 2); ctx.stroke();
    ctx.fillText("毛利率（%）", lx + 292, ly + 6);
  }, [years, revenues, netMargins, grossMargins]);

  return (
    <div className="bg-white border border-border rounded-[12px] p-5 my-2">
      <canvas ref={canvasRef} className="w-full" height={400} />
    </div>
  );
}
