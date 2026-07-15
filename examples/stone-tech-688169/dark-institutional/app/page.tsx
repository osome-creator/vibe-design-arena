"use client";

import { useEffect, useState } from "react";
import type { FinancialReport } from "@/lib/schema";
import Section from "@/components/Section";
import DataTable from "@/components/DataTable";
import TrendChart from "@/components/TrendChart";

// ── Format helpers ─────────────────────────────────────────
const fmt = (n: number | null | undefined, decimals = 2) =>
  n != null ? n.toFixed(decimals) : "—";
const fmtPct = (n: number | null | undefined) =>
  n != null ? n.toFixed(1) + "%" : "—";
const fmtGrowth = (n: number | null | undefined) => {
  if (n == null) return "—";
  const cls = n >= 0 ? "text-[#3fb950]" : "text-[#f78166]";
  const sign = n >= 0 ? "+" : "";
  return <span className={cls}>{sign}{n.toFixed(2)}%</span>;
};
const fmtBillion = (n: number | null | undefined) =>
  n != null ? n.toFixed(2) + " 亿" : "—";

export default function Home() {
  const [data, setData] = useState<FinancialReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/financial-data")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((d) => {
        if (d.error) throw new Error(d.error + (d.message ? ": " + d.message : ""));
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-4 text-[#8b949e] bg-[#0d1117]">
        <div className="w-10 h-10 border-4 border-[#21262d] border-t-[#58a6ff] rounded-full animate-spin" />
        <span className="text-lg">正在加载财务数据...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-[#f78166] text-center px-4 bg-[#0d1117]">
        <div className="text-5xl">⚠️</div>
        <div className="text-lg font-semibold text-[#e6edf3]">数据加载失败</div>
        <div className="text-sm text-[#8b949e]">{error || "未知错误"}</div>
        <div className="text-xs text-[#6e7681] mt-2">
          请确认 API 路由 <code className="bg-[#161b22] border border-[#30363d] px-1.5 py-0.5 rounded text-[#58a6ff]">/api/financial-data</code> 正常响应
        </div>
      </div>
    );
  }

  const m = data.report_meta;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="bg-[#0d1117] border-b border-[#30363d] py-12 px-6 text-center relative">
        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]" />
        <span className="inline-block bg-[#161b22] border border-[#30363d] px-4 py-1 rounded-full text-xs tracking-wider mb-4 text-[#58a6ff]">
          财务分析报告
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#e6edf3]">{m.title}</h1>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 text-sm text-[#8b949e]">
          <span>🏢 {m.company_name}</span>
          <span>
            📈 股票代码: <span className="bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded font-semibold tabular-nums text-[#58a6ff]">{m.stock_code}</span>
          </span>
          <span>🏛️ {m.market}</span>
          <span>👤 {m.author}</span>
          <span>📅 报告期: {m.report_period}</span>
          <span>🔮 预测期: {m.forecast_period}</span>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-6 pb-12 space-y-5">
        {/* ── Profitability ────────────────────────────── */}
        <Section icon="📊" title="盈利能力（2024-2025）" description={data.profitability.description}>
          <DataTable
            columns={[
              { key: "year", label: "年份" },
              { key: "revenue", label: "营收（亿）" },
              { key: "revGrowth", label: "营收增速" },
              { key: "grossProfit", label: "毛利（亿）" },
              { key: "grossMargin", label: "毛利率" },
              { key: "opProfit", label: "营业利润（亿）" },
              { key: "ebitMargin", label: "EBIT率" },
              { key: "netProfit", label: "归母净利（亿）" },
              { key: "netMargin", label: "净利率" },
              { key: "netGrowth", label: "净利增速" },
            ]}
            rows={data.profitability.annual.map((a) => ({
              year: a.year,
              revenue: fmtBillion(a.revenue_billion_cny),
              revGrowth: fmtPct(a.revenue_growth_yoy_pct),
              grossProfit: fmtBillion(a.gross_profit_billion_cny),
              grossMargin: fmtPct(a.gross_margin_pct),
              opProfit: fmtBillion(a.operating_profit_ebit_billion_cny),
              ebitMargin: fmtPct(a.ebit_margin_pct),
              netProfit: fmtBillion(a.net_profit_attributable_billion_cny),
              netMargin: fmtPct(a.net_margin_pct),
              netGrowth: fmtGrowth(a.net_profit_growth_yoy_pct),
            }))}
          />
        </Section>

        {/* ── Cost Structure ───────────────────────────── */}
        <Section icon="💰" title="2025年费用结构">
          <DataTable
            columns={[
              { key: "item", label: "费用项" },
              { key: "amount", label: "金额" },
              { key: "growth", label: "同比增速" },
            ]}
            rows={[
              { item: "营业成本", amount: fmtBillion(data.cost_structure_2025.cost_of_sales_billion_cny), growth: fmtGrowth(data.cost_structure_2025.cost_of_sales_growth_yoy_pct) },
              { item: "销售费用", amount: fmtBillion(data.cost_structure_2025.sales_expenses_billion_cny), growth: fmtGrowth(data.cost_structure_2025.sales_expenses_growth_yoy_pct) },
              { item: "研发费用", amount: fmtBillion(data.cost_structure_2025.rd_expenses_billion_cny), growth: fmtGrowth(data.cost_structure_2025.rd_expenses_growth_yoy_pct) },
              { item: "研发费用率", amount: fmtPct(data.cost_structure_2025.rd_expenses_pct_of_revenue), growth: "—" },
            ]}
          />
        </Section>

        {/* ── Solvency ─────────────────────────────────── */}
        <Section icon="🏦" title="偿债能力（年末数据）">
          <DataTable
            columns={[
              { key: "yearEnd", label: "年末" },
              { key: "totalAssets", label: "总资产（亿）" },
              { key: "totalLiab", label: "总负债（亿）" },
              { key: "alRatio", label: "资产负债率" },
              { key: "currentRatio", label: "流动比率" },
              { key: "quickRatio", label: "速动比率" },
              { key: "undistributed", label: "未分配利润（亿）" },
            ]}
            rows={data.solvency.annual.map((a) => ({
              yearEnd: a.year_end,
              totalAssets: fmtBillion(a.total_assets_billion_cny),
              totalLiab: fmtBillion(a.total_liabilities_billion_cny),
              alRatio: fmtPct(a.asset_liability_ratio_pct),
              currentRatio: fmt(a.current_ratio),
              quickRatio: fmt(a.quick_ratio),
              undistributed: fmtBillion(a.undistributed_profit_billion_cny ?? a.undistributed_profit_billion_cny_approx),
            }))}
          />
        </Section>

        {/* ── Operational Efficiency ───────────────────── */}
        <Section icon="🔄" title="营运效率">
          <DataTable
            columns={[
              { key: "year", label: "年份" },
              { key: "inventoryBal", label: "存货余额（亿）" },
              { key: "invDays", label: "存货周转天数" },
              { key: "arBal", label: "应收余额（亿）" },
              { key: "arDays", label: "应收周转天数" },
              { key: "assetTurnover", label: "总资产周转率（次）" },
            ]}
            rows={data.operational_efficiency.annual.map((a) => ({
              year: a.year,
              inventoryBal: fmtBillion(a.inventory_balance_billion_cny),
              invDays: fmt(a.inventory_turnover_days_approx, 0) + " 天",
              arBal: fmtBillion(a.accounts_receivable_balance_billion_cny),
              arDays: fmt(a.accounts_receivable_turnover_days_approx, 0) + " 天",
              assetTurnover: fmt(a.total_asset_turnover_times) + " 次",
            }))}
          />
        </Section>

        {/* ── Cash Flow ────────────────────────────────── */}
        <Section icon="💵" title="现金流与成长性">
          <DataTable
            columns={[
              { key: "year", label: "年份" },
              { key: "revGrowth", label: "营收增速" },
              { key: "netGrowth", label: "净利增速" },
              { key: "ocf", label: "经营现金流（亿）" },
              { key: "ocfGrowth", label: "经营现金流增速" },
              { key: "fcf", label: "自由现金流（亿）" },
              { key: "fcfGrowth", label: "自由现金流增速" },
            ]}
            rows={data.cash_flow_and_growth.annual.map((a) => ({
              year: a.year,
              revGrowth: fmtPct(a.revenue_growth_yoy_pct),
              netGrowth: fmtGrowth(a.net_profit_growth_yoy_pct),
              ocf: fmtBillion(a.operating_cash_flow_billion_cny),
              ocfGrowth: a.operating_cash_flow_growth_yoy_pct != null ? fmtGrowth(a.operating_cash_flow_growth_yoy_pct) : "—",
              fcf: fmtBillion(a.free_cash_flow_billion_cny),
              fcfGrowth: a.free_cash_flow_growth_yoy_pct != null ? fmtGrowth(a.free_cash_flow_growth_yoy_pct) : "—",
            }))}
          />
          {data.cash_flow_and_growth.note && (
            <p className="text-xs text-[#8b949e] mt-2">📝 {data.cash_flow_and_growth.note}</p>
          )}
        </Section>

        {/* ── Trend Chart ──────────────────────────────── */}
        <Section icon="📈" title="营收与净利润趋势（含预测）">
          <TrendChart
            years={["2024", "2025", "2026E", "2027E", "2028E"]}
            revenues={[
              data.profitability.annual[0].revenue_billion_cny,
              data.profitability.annual[1].revenue_billion_cny,
              ...data.forecast.annual.map((f) => f.revenue_billion_cny),
            ]}
            netMargins={[
              data.profitability.annual[0].net_margin_pct,
              data.profitability.annual[1].net_margin_pct,
              ...data.forecast.annual.map((f) => f.net_margin_pct),
            ]}
            grossMargins={[
              data.profitability.annual[0].gross_margin_pct,
              data.profitability.annual[1].gross_margin_pct,
              ...data.forecast.annual.map((f) => f.gross_margin_pct),
            ]}
          />
        </Section>

        {/* ── Business Highlights ──────────────────────── */}
        <Section icon="⭐" title="业务亮点">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {([
              ["海外收入占比（2025）", fmtPct(data.business_highlights.overseas_revenue_share_pct_2025)],
              [
                "中低端销售占比（2024→2025）",
                `${fmtPct(data.business_highlights.mid_low_end_model_sales_share["2024_pct_approx"])} → ${fmtPct(data.business_highlights.mid_low_end_model_sales_share["2025_pct_approx"])}`,
              ],
              ["中低端毛利率上限", fmtPct(data.business_highlights.mid_low_end_gross_margin_max_pct)],
              ["资本公积转增", data.business_highlights.capital_reserve_conversion_2024],
              ["累计折旧（2025）", fmtBillion(data.business_highlights.accumulated_depreciation_2025_billion_cny)],
              ["预付账款（2025）", fmtBillion(data.business_highlights.prepayments_balance_2025_billion_cny)],
            ] as const).map(([label, value], i) => (
              <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-3.5">
                <div className="text-xs text-[#8b949e] mb-0.5">{label}</div>
                <div className="text-base font-bold text-[#58a6ff] tabular-nums">{value}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Conclusions ──────────────────────────────── */}
        <Section icon="📝" title="分析结论">
          <div className="grid md:grid-cols-2 gap-4">
            {data.conclusions.map((c, i) => (
              <div
                key={i}
                className={`bg-[#161b22] border border-[#30363d] rounded-[6px] p-5 border-l-4 transition-colors hover:border-[#58a6ff] ${
                  c.risk_flag === true
                    ? "border-l-[#f78166]"
                    : c.risk_flag === false
                    ? "border-l-[#3fb950]"
                    : "border-l-[#58a6ff]"
                }`}
                style={
                  c.risk_flag === true
                    ? { boxShadow: "0 0 12px rgba(247,129,102,0.15)" }
                    : c.risk_flag === false
                    ? { boxShadow: "0 0 12px rgba(63,185,80,0.10)" }
                    : undefined
                }
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <strong className="text-base text-[#e6edf3]">{c.topic}</strong>
                  {c.risk_flag === true && (
                    <span className="text-xs font-semibold bg-[#f78166]/15 text-[#f78166] px-2 py-0.5 rounded-full border border-[#f78166]/30">⚠ 风险信号</span>
                  )}
                  {c.risk_flag === false && (
                    <span className="text-xs font-semibold bg-[#3fb950]/15 text-[#3fb950] px-2 py-0.5 rounded-full border border-[#3fb950]/30">✓ 正面</span>
                  )}
                  {c.is_strategic && (
                    <span className="text-xs font-semibold bg-[#58a6ff]/15 text-[#58a6ff] px-2 py-0.5 rounded-full border border-[#58a6ff]/30">战略级</span>
                  )}
                </div>
                <p className="text-sm text-[#8b949e] leading-relaxed">{c.summary}</p>
                {c.strategic_rationale && (
                  <p className="mt-2.5 pt-2.5 border-t border-dashed border-[#30363d] text-xs text-[#6e7681] italic">
                    💡 战略逻辑：{c.strategic_rationale}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── Forecast ─────────────────────────────────── */}
        <Section icon="🔮" title="2026-2028 财务预测">
          <DataTable
            columns={[
              { key: "year", label: "年份" },
              { key: "revenue", label: "营收（亿）" },
              { key: "revGrowth", label: "营收增速" },
              { key: "grossMargin", label: "毛利率" },
              { key: "opProfit", label: "营业利润（亿）" },
              { key: "netProfit", label: "归母净利（亿）" },
              { key: "netMargin", label: "净利率" },
              { key: "eps", label: "每股收益（元）" },
            ]}
            rows={data.forecast.annual.map((f) => ({
              year: f.year + "E",
              revenue: fmtBillion(f.revenue_billion_cny),
              revGrowth: fmtGrowth(f.revenue_growth_yoy_pct),
              grossMargin: fmtPct(f.gross_margin_pct),
              opProfit: f.operating_profit_estimated_billion_cny != null ? fmtBillion(f.operating_profit_estimated_billion_cny) : "—",
              netProfit: fmtBillion(f.net_profit_billion_cny),
              netMargin: fmtPct(f.net_margin_pct),
              eps: fmt(f.eps_cny) + " 元",
            }))}
          />
          <h4 className="text-sm font-semibold mt-5 mb-2 text-[#e6edf3]">关键假设</h4>
          <ul className="space-y-1.5">
            {data.forecast.key_assumptions.map((a, i) => (
              <li key={i} className="text-sm text-[#8b949e] flex gap-2">
                <span className="text-[#58a6ff] shrink-0">▸</span> {a}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Valuation ────────────────────────────────── */}
        <Section icon="💎" title="估值分析">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-[6px] p-5">
              <h4 className="font-semibold mb-3 text-[#e6edf3]">📐 {data.valuation.dcf_model.method}</h4>
              {[
                ["WACC", fmtPct(data.valuation.dcf_model.wacc_pct_approx)],
                ["永续增长率", fmtPct(data.valuation.dcf_model.terminal_growth_rate_pct)],
                ["内在价值区间", data.valuation.dcf_model.intrinsic_value_billion_cny_range.join(" – ") + " 亿元"],
                ["每股价值区间", data.valuation.dcf_model.implied_value_per_share_cny_range.join(" – ") + " 元"],
              ].map(([label, val], i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-[#21262d] last:border-b-0 text-sm">
                  <span className="text-[#8b949e]">{label}</span>
                  <span className="font-semibold text-[#e6edf3] tabular-nums">{val}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] rounded-[6px] p-5">
              <h4 className="font-semibold mb-3 text-[#e6edf3]">📊 {data.valuation.pe_model.method}</h4>
              {[
                ["基准年份", data.valuation.pe_model.base_year.toString()],
                ["预期 PE", fmt(data.valuation.pe_model.expected_pe_approx) + "x"],
                ["公允价值区间", data.valuation.pe_model.fair_value_per_share_cny_range.join(" – ") + " 元/股"],
              ].map(([label, val], i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-[#21262d] last:border-b-0 text-sm">
                  <span className="text-[#8b949e]">{label}</span>
                  <span className="font-semibold text-[#e6edf3] tabular-nums">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-[#6e7681] mt-3">
            ⚠️ 敏感性提示：{data.valuation.sensitivity_note}
          </p>
        </Section>

        {/* ── Investment Opinion ───────────────────────── */}
        <Section icon="🎯" title="投资建议">
          <div className="bg-[#161b22] border border-[#d29922]/40 rounded-[6px] p-6 text-center">
            <span className="inline-block text-3xl font-extrabold text-[#d29922] px-8 py-2 border-2 border-[#d29922]/50 rounded-[4px] mb-4">
              📋 {data.investment_opinion.rating}
            </span>
            <div className="space-y-2 mt-4 text-sm text-left max-w-xl mx-auto">
              <p className="text-[#e6edf3]"><strong className="text-[#e6edf3]">短期建议：</strong><span className="text-[#8b949e]">{data.investment_opinion.short_term_advice}</span></p>
              <p className="text-[#e6edf3]"><strong className="text-[#e6edf3]">长期展望：</strong><span className="text-[#8b949e]">{data.investment_opinion.long_term_view}</span></p>
              <p className="text-[#e6edf3]"><strong className="text-[#e6edf3]">升级触发条件：</strong><span className="text-[#8b949e]">{data.investment_opinion.upgrade_trigger}</span></p>
            </div>
          </div>
        </Section>

        {/* ── Risk Factors ─────────────────────────────── */}
        <Section icon="⚠️" title="风险因素">
          <ul className="space-y-2.5">
            {data.risk_factors.map((r, i) => (
              <li
                key={i}
                className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-3.5 flex gap-3 text-sm border-l-[3px] border-l-[#f78166]"
                style={{ boxShadow: "0 0 12px rgba(247,129,102,0.15)" }}
              >
                <span className="font-bold shrink-0 text-[#f78166]">⚠</span>
                <div>
                  <strong className="text-[#e6edf3]">{r.risk}</strong>
                  <p className="text-[#8b949e] mt-0.5">{r.impact}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Footer ───────────────────────────────────── */}
        <footer className="bg-[#161b22] border border-[#30363d] rounded-[6px] p-5 text-xs text-[#8b949e] leading-relaxed">
          <p><strong className="text-[#e6edf3]">单位说明：</strong>{data.data_notes.unit}</p>
          <p><strong className="text-[#e6edf3]">数据来源：</strong>{data.data_notes.source}</p>
          <p>
            <strong className="text-[#e6edf3]">数据处理：</strong>
            {data.data_notes.rounding}；{data.data_notes.approximate_markers}；{data.data_notes.estimated_markers}
          </p>
        </footer>
      </main>
    </div>
  );
}
