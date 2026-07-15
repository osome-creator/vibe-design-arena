"use client";

import { useEffect, useRef } from "react";

interface TrendChartProps {
  years: string[];
  revenues: number[];
  netMargins: number[];
  grossMargins: number[];
}

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

    // Dark background
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, W, H);

    // Grid lines — subtle
    ctx.strokeStyle = "#21262d";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (plotH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
    }

    // Y-axis labels (left — revenue)
    ctx.fillStyle = "#8b949e";
    ctx.font = "11px var(--font-geist-sans), -apple-system, sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const val = (maxRev / 5) * (5 - i);
      ctx.fillText(val.toFixed(0) + "亿", pad.left - 8, pad.top + (plotH / 5) * i + 4);
    }
    // Y-axis labels (right — margin %)
    ctx.textAlign = "left";
    for (let i = 0; i <= 5; i++) {
      const val = (maxMargin / 5) * (5 - i);
      ctx.fillText(val.toFixed(0) + "%", W - pad.right + 10, pad.top + (plotH / 5) * i + 4);
    }

    // Revenue bars — blue (#58a6ff)
    const barW = Math.min(plotW / years.length * 0.5, 50);
    revenues.forEach((v, i) => {
      const bx = x(i) - barW / 2;
      const by = yRev(v);
      const grad = ctx.createLinearGradient(bx, by, bx, pad.top + plotH);
      grad.addColorStop(0, "#58a6ff");
      grad.addColorStop(1, "#1f6feb");
      ctx.fillStyle = grad;
      ctx.fillRect(bx, by, barW, pad.top + plotH - by);
      // Value label
      ctx.fillStyle = "#e6edf3";
      ctx.font = "bold 11px var(--font-geist-sans), -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "亿", x(i), by - 6);
    });

    // Net margin line — orange-red (#f78166)
    ctx.strokeStyle = "#f78166";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    netMargins.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v))));
    ctx.stroke();
    netMargins.forEach((v, i) => {
      // Glow effect
      ctx.shadowColor = "rgba(247, 129, 102, 0.6)";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#161b22";
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f78166";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#f78166";
      ctx.font = "bold 10px var(--font-geist-sans), -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) - 14);
    });

    // Gross margin line — purple (#bc8cff)
    ctx.strokeStyle = "#bc8cff";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    grossMargins.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), yMargin(v)) : ctx.lineTo(x(i), yMargin(v))));
    ctx.stroke();
    ctx.setLineDash([]);
    grossMargins.forEach((v, i) => {
      ctx.fillStyle = "#161b22";
      ctx.beginPath();
      ctx.arc(x(i), yMargin(v), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#bc8cff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#bc8cff";
      ctx.font = "bold 10px var(--font-geist-sans), -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v.toFixed(1) + "%", x(i), yMargin(v) - 12);
    });

    // X-axis labels
    ctx.fillStyle = "#8b949e";
    ctx.font = "12px var(--font-geist-sans), -apple-system, sans-serif";
    ctx.textAlign = "center";
    years.forEach((y, i) => ctx.fillText(y, x(i), pad.top + plotH + 20));

    // Legend — bottom left
    const lx = pad.left;
    const ly = H - 8;
    ctx.font = "11px var(--font-geist-sans), -apple-system, sans-serif";

    // Revenue
    ctx.fillStyle = "#58a6ff";
    ctx.fillRect(lx, ly - 6, 14, 14);
    ctx.fillStyle = "#e6edf3";
    ctx.textAlign = "left";
    ctx.fillText("营收（亿元）", lx + 20, ly + 6);

    // Net margin
    ctx.strokeStyle = "#f78166";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(lx + 130, ly + 1); ctx.lineTo(lx + 155, ly + 1); ctx.stroke();
    ctx.fillStyle = "#161b22"; ctx.beginPath(); ctx.arc(lx + 142, ly + 1, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#f78166"; ctx.beginPath(); ctx.arc(lx + 142, ly + 1, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.fillText("净利率（%）", lx + 164, ly + 6);

    // Gross margin
    ctx.strokeStyle = "#bc8cff";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath(); ctx.moveTo(lx + 260, ly + 1); ctx.lineTo(lx + 285, ly + 1); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#161b22"; ctx.beginPath(); ctx.arc(lx + 272, ly + 1, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#bc8cff"; ctx.beginPath(); ctx.arc(lx + 272, ly + 1, 3, 0, Math.PI * 2); ctx.stroke();
    ctx.fillText("毛利率（%）", lx + 292, ly + 6);
  }, [years, revenues, netMargins, grossMargins]);

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-[6px] p-4 my-4">
      <canvas ref={canvasRef} className="w-full" height={400} />
    </div>
  );
}
