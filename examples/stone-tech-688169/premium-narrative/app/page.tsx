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
  const cls = n >= 0 ? "text-success" : "text-danger";
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
      <div className="flex items-center justify-center min-h-screen gap-4 text-muted" style={{ background: '#fdf6f0' }}>
        <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin" />
        <span className="text-lg">正在加载财务数据...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-4" style={{ background: '#fdf6f0' }}>
        <div className="text-5xl">&#9888;&#65039;</div>
        <div className="text-lg font-bold text-heading">数据加载失败</div>
        <div className="text-sm text-muted">{error || "未知错误"}</div>
        <div className="text-xs text-muted mt-2">
          请确认 API 路由 <code className="bg-border/50 px-1.5 py-0.5 rounded">/api/financial-data</code> 正常响应
        </div>
      </div>
    );
  }

  const m = data.report_meta;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          1. HEADER — Warm premium, gradient, gold line under title
          ═══════════════════════════════════════════════════════════ */}
      <header className="bg-gradient-to-b from-[#fdf6f0] to-white py-16 px-6 text-center border-b border-border">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs tracking-widest mb-5 font-semibold uppercase">
          财务分析报告
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-4 tracking-[-0.01em]">
          {m.title}
        </h1>
        <div className="w-16 h-0.5 bg-primary mx-auto mb-6 rounded-full" />
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <span>{m.company_name}</span>
          <span className="text-primary font-semibold tabular-nums">{m.stock_code}</span>
          <span>{m.market}</span>
          <span>{m.author}</span>
          <span>报告期: {m.report_period}</span>
          <span>预测期: {m.forecast_period}</span>
        </div>
      </header>

      <main
        className="max-w-[1100px] mx-auto px-4 py-10 pb-16 flex flex-col"
        style={{ gap: '40px' }}
      >
        {/* ═══════════════════════════════════════════════════════════
            2. INVESTMENT OPINION — Hero position, gold-bordered center card
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="bg-surface border-2 border-primary rounded-[16px] p-8 md:p-12 text-center"
          style={{ boxShadow: '0 4px 32px rgba(139,69,19,0.08)' }}
        >
          <span className="inline-block text-3xl md:text-4xl font-extrabold text-primary px-10 py-3 mb-6 tracking-[-0.01em]"
            style={{ border: '2px solid #b8860b', borderRadius: '16px', letterSpacing: '0.03em' }}>
            {data.investment_opinion.rating}
          </span>
          <div className="space-y-3 mt-6 text-left max-w-xl mx-auto">
            <p className="text-foreground leading-relaxed">
              <strong className="text-heading">短期建议：</strong>{data.investment_opinion.short_term_advice}
            </p>
            <p className="text-foreground leading-relaxed">
              <strong className="text-heading">长期展望：</strong>{data.investment_opinion.long_term_view}
            </p>
            <p className="text-foreground leading-relaxed">
              <strong className="text-heading">升级触发条件：</strong>{data.investment_opinion.upgrade_trigger}
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            3. BUSINESS HIGHLIGHTS — 3-column KPI cards with gold numbers
            ═══════════════════════════════════════════════════════════ */}
        <Section title="业务亮点">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {([
              ["海外收入占比（2025）", fmtPct(data.business_highlights.overseas_revenue_share_pct_2025)],
              [
                "中低端销售占比（2024 &#8594; 2025）",
                `${fmtPct(data.business_highlights.mid_low_end_model_sales_share["2024_pct_approx"])} → ${fmtPct(data.business_highlights.mid_low_end_model_sales_share["2025_pct_approx"])}`,
              ],
              ["中低端毛利率上限", fmtPct(data.business_highlights.mid_low_end_gross_margin_max_pct)],
              ["资本公积转增", data.business_highlights.capital_reserve_conversion_2024],
              ["累计折旧（2025）", fmtBillion(data.business_highlights.accumulated_depreciation_2025_billion_cny)],
              ["预付账款（2025）", fmtBillion(data.business_highlights.prepayments_balance_2025_billion_cny)],
            ] as const).map(([label, value], i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-[12px] p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 12px rgba(139,69,19,0.04)' }}
              >
                <div className="text-xs text-muted mb-1.5 tracking-wide">{label}</div>
                <div className="text-2xl font-bold text-primary">{value}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            4. PROFITABILITY — Revenue + profit table, warm-styled
            ═══════════════════════════════════════════════════════════ */}
        <Section title="盈利能力（2024-2025）" description={data.profitability.description}>
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

        {/* ═══════════════════════════════════════════════════════════
            5. FORECAST — Future projections with "E" labels in gold
            ═══════════════════════════════════════════════════════════ */}
        <Section title="2026-2028 财务预测">
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
              year: <span>{f.year}<span className="text-primary font-semibold ml-0.5">E</span></span>,
              revenue: fmtBillion(f.revenue_billion_cny),
              revGrowth: fmtGrowth(f.revenue_growth_yoy_pct),
              grossMargin: fmtPct(f.gross_margin_pct),
              opProfit: f.operating_profit_estimated_billion_cny != null ? fmtBillion(f.operating_profit_estimated_billion_cny) : "—",
              netProfit: fmtBillion(f.net_profit_billion_cny),
              netMargin: fmtPct(f.net_margin_pct),
              eps: fmt(f.eps_cny) + " 元",
            }))}
            rowClassName={() => "bg-[#fdf8f2]/30"}
          />
          <h4 className="text-sm font-bold text-heading mt-5 mb-2">关键假设</h4>
          <ul className="space-y-1.5">
            {data.forecast.key_assumptions.map((a, i) => (
              <li key={i} className="text-sm text-foreground flex gap-2">
                <span className="text-primary shrink-0 font-bold">&#8227;</span> {a}
              </li>
            ))}
          </ul>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            6. VALUATION — DCF + PE models side by side
            ═══════════════════════════════════════════════════════════ */}
        <Section title="估值分析">
          <div className="grid md:grid-cols-2 gap-5">
            {/* DCF Card */}
            <div
              className="bg-surface border border-border rounded-[12px] p-6"
              style={{ boxShadow: '0 2px 16px rgba(139,69,19,0.04)' }}
            >
              <h4 className="font-bold text-heading mb-4 text-base">
                <span className="text-primary mr-1.5">&#9670;</span>
                {data.valuation.dcf_model.method}
              </h4>
              {[
                ["WACC", fmtPct(data.valuation.dcf_model.wacc_pct_approx)],
                ["永续增长率", fmtPct(data.valuation.dcf_model.terminal_growth_rate_pct)],
                ["内在价值区间", data.valuation.dcf_model.intrinsic_value_billion_cny_range.join(" – ") + " 亿元"],
                ["每股价值区间", data.valuation.dcf_model.implied_value_per_share_cny_range.join(" – ") + " 元"],
              ].map(([label, val], i) => (
                <div key={i} className="flex justify-between py-2 border-b border-border last:border-b-0 text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="font-semibold text-heading">{val}</span>
                </div>
              ))}
            </div>

            {/* PE Card */}
            <div
              className="bg-surface border border-border rounded-[12px] p-6"
              style={{ boxShadow: '0 2px 16px rgba(139,69,19,0.04)' }}
            >
              <h4 className="font-bold text-heading mb-4 text-base">
                <span className="text-primary mr-1.5">&#9670;</span>
                {data.valuation.pe_model.method}
              </h4>
              {[
                ["基准年份", data.valuation.pe_model.base_year.toString()],
                ["预期 PE", fmt(data.valuation.pe_model.expected_pe_approx) + "x"],
                ["公允价值区间", data.valuation.pe_model.fair_value_per_share_cny_range.join(" – ") + " 元/股"],
              ].map(([label, val], i) => (
                <div key={i} className="flex justify-between py-2 border-b border-border last:border-b-0 text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="font-semibold text-heading">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted mt-4 leading-relaxed">
            敏感性提示：{data.valuation.sensitivity_note}
          </p>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            7. TREND CHART — Revenue & margin trends, warm palette
            ═══════════════════════════════════════════════════════════ */}
        <Section title="营收与净利润趋势（含预测）">
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

        {/* ═══════════════════════════════════════════════════════════
            8. CASH FLOW — Cash flow data table
            ═══════════════════════════════════════════════════════════ */}
        <Section title="现金流与成长性">
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
            <p className="text-xs text-muted mt-3 leading-relaxed">{data.cash_flow_and_growth.note}</p>
          )}
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            9. COST STRUCTURE — Expense breakdown
            ═══════════════════════════════════════════════════════════ */}
        <Section title="2025年费用结构">
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

        {/* ═══════════════════════════════════════════════════════════
            10. SOLVENCY — Balance sheet metrics
            ═══════════════════════════════════════════════════════════ */}
        <Section title="偿债能力（年末数据）">
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

        {/* ═══════════════════════════════════════════════════════════
            11. OPERATIONAL EFFICIENCY — Turnover ratios
            ═══════════════════════════════════════════════════════════ */}
        <Section title="营运效率">
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

        {/* ═══════════════════════════════════════════════════════════
            12. CONCLUSIONS — Analysis conclusions with risk/positive badges
            ═══════════════════════════════════════════════════════════ */}
        <Section title="分析结论">
          <div className="grid md:grid-cols-2 gap-4">
            {data.conclusions.map((c, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-[12px] p-5 transition-shadow hover:shadow-md"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: c.risk_flag === true ? '#c25a3c' : c.risk_flag === false ? '#2d6a4f' : '#b8860b',
                  boxShadow: '0 2px 12px rgba(139,69,19,0.04)',
                }}
              >
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <strong className="text-base text-heading">{c.topic}</strong>
                  {c.risk_flag === true && (
                    <span className="text-xs font-semibold bg-danger/10 text-danger px-2 py-0.5 rounded-full">
                      风险信号
                    </span>
                  )}
                  {c.risk_flag === false && (
                    <span className="text-xs font-semibold bg-success/10 text-success px-2 py-0.5 rounded-full">
                      正面
                    </span>
                  )}
                  {c.is_strategic && (
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      战略级
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{c.summary}</p>
                {c.strategic_rationale && (
                  <p className="mt-3 pt-3 border-t border-dashed border-border text-xs text-muted italic leading-relaxed">
                    {c.strategic_rationale}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            13. RISK FACTORS — Terracotta-tinted cards at bottom
            ═══════════════════════════════════════════════════════════ */}
        <Section title="风险因素">
          <ul className="space-y-3">
            {data.risk_factors.map((r, i) => (
              <li
                key={i}
                className="rounded-[12px] p-4 flex gap-3 text-sm border border-border"
                style={{
                  background: 'rgba(194,90,60,0.04)',
                  borderLeft: '3px solid #c25a3c',
                }}
              >
                <span className="font-bold shrink-0 text-secondary mt-0.5">!</span>
                <div>
                  <strong className="text-heading">{r.risk}</strong>
                  <p className="text-foreground mt-1 leading-relaxed">{r.impact}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            14. FOOTER — Warm bg, gold accent line
            ═══════════════════════════════════════════════════════════ */}
        <footer
          className="rounded-[16px] p-6 text-xs text-muted leading-relaxed border border-border"
          style={{ background: 'linear-gradient(to bottom, #fdf8f2, #fdf6f0)' }}
        >
          <div className="w-10 h-0.5 bg-primary mb-4 rounded-full" />
          <p><strong className="text-heading">单位说明：</strong>{data.data_notes.unit}</p>
          <p><strong className="text-heading">数据来源：</strong>{data.data_notes.source}</p>
          <p>
            <strong className="text-heading">数据处理：</strong>
            {data.data_notes.rounding}；{data.data_notes.approximate_markers}；{data.data_notes.estimated_markers}
          </p>
        </footer>
      </main>
    </>
  );
}
