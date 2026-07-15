import { z } from "zod";

// ── Report Meta ────────────────────────────────────────────
export const ReportMetaSchema = z.object({
  title: z.string(),
  company_name: z.string(),
  stock_code: z.string(),
  market: z.string(),
  author: z.string(),
  report_period: z.string(),
  forecast_period: z.string(),
});

// ── Profitability ──────────────────────────────────────────
export const ProfitabilityAnnualSchema = z.object({
  year: z.number(),
  revenue_billion_cny: z.number(),
  cost_of_sales_billion_cny: z.number(),
  gross_profit_billion_cny: z.number(),
  gross_margin_pct: z.number(),
  operating_profit_ebit_billion_cny: z.number(),
  ebit_margin_pct: z.number(),
  net_profit_attributable_billion_cny: z.number(),
  net_margin_pct: z.number(),
  revenue_growth_yoy_pct: z.number(),
  net_profit_growth_yoy_pct: z.number(),
  sales_expenses_billion_cny: z.number().optional(),
  sales_expenses_growth_yoy_pct: z.number().optional(),
  rd_expenses_billion_cny: z.number().optional(),
  rd_expenses_growth_yoy_pct: z.number().optional(),
  rd_expenses_pct_of_revenue: z.number().optional(),
});

export const ProfitabilitySchema = z.object({
  description: z.string(),
  annual: z.array(ProfitabilityAnnualSchema),
});

// ── Cost Structure ─────────────────────────────────────────
export const CostStructureSchema = z.object({
  description: z.string(),
  sales_expenses_billion_cny: z.number(),
  sales_expenses_growth_yoy_pct: z.number(),
  rd_expenses_billion_cny: z.number(),
  rd_expenses_growth_yoy_pct: z.number(),
  rd_expenses_pct_of_revenue: z.number(),
  cost_of_sales_billion_cny: z.number(),
  cost_of_sales_growth_yoy_pct: z.number(),
});

// ── Solvency ───────────────────────────────────────────────
export const SolvencyAnnualSchema = z.object({
  year_end: z.number(),
  total_assets_billion_cny: z.number(),
  total_liabilities_billion_cny: z.number(),
  asset_liability_ratio_pct: z.number(),
  current_ratio: z.number(),
  quick_ratio: z.number(),
  undistributed_profit_billion_cny: z.number().optional(),
  undistributed_profit_billion_cny_approx: z.number().optional(),
});

export const SolvencySchema = z.object({
  description: z.string(),
  annual: z.array(SolvencyAnnualSchema),
});

// ── Operational Efficiency ─────────────────────────────────
export const OperationalEfficiencyAnnualSchema = z.object({
  year: z.number(),
  inventory_balance_billion_cny: z.number(),
  accounts_receivable_balance_billion_cny: z.number(),
  inventory_turnover_days_approx: z.number(),
  accounts_receivable_turnover_days_approx: z.number(),
  total_asset_turnover_times: z.number(),
});

export const OperationalEfficiencySchema = z.object({
  description: z.string(),
  annual: z.array(OperationalEfficiencyAnnualSchema),
});

// ── Cash Flow & Growth ─────────────────────────────────────
export const CashFlowAnnualSchema = z.object({
  year: z.number(),
  revenue_growth_yoy_pct: z.number(),
  net_profit_growth_yoy_pct: z.number(),
  operating_cash_flow_billion_cny: z.number(),
  operating_cash_flow_growth_yoy_pct: z.number().optional(),
  free_cash_flow_billion_cny: z.number(),
  free_cash_flow_growth_yoy_pct: z.number().optional(),
});

export const CashFlowSchema = z.object({
  description: z.string(),
  annual: z.array(CashFlowAnnualSchema),
  note: z.string().optional(),
});

// ── Business Highlights ────────────────────────────────────
export const BusinessHighlightsSchema = z.object({
  overseas_revenue_share_pct_2025: z.number(),
  mid_low_end_model_sales_share: z.object({
    "2024_pct_approx": z.number(),
    "2025_pct_approx": z.number(),
  }),
  mid_low_end_gross_margin_max_pct: z.number(),
  capital_reserve_conversion_2024: z.string(),
  accumulated_depreciation_2025_billion_cny: z.number(),
  prepayments_balance_2025_billion_cny: z.number(),
});

// ── Conclusions ────────────────────────────────────────────
export const ConclusionSchema = z.object({
  topic: z.string(),
  summary: z.string(),
  is_strategic: z.boolean().optional(),
  strategic_rationale: z.string().optional(),
  risk_flag: z.boolean().optional(),
});

// ── Forecast ───────────────────────────────────────────────
export const ForecastAnnualSchema = z.object({
  year: z.number(),
  is_estimate: z.boolean(),
  revenue_billion_cny: z.number(),
  revenue_growth_yoy_pct: z.number(),
  gross_margin_pct: z.number(),
  operating_profit_estimated_billion_cny: z.number().nullable().optional(),
  net_profit_billion_cny: z.number(),
  net_margin_pct: z.number(),
  eps_cny: z.number(),
});

export const ForecastSchema = z.object({
  description: z.string(),
  key_assumptions: z.array(z.string()),
  annual: z.array(ForecastAnnualSchema),
});

// ── Valuation ──────────────────────────────────────────────
export const ValuationSchema = z.object({
  dcf_model: z.object({
    method: z.string(),
    wacc_pct_approx: z.number(),
    terminal_growth_rate_pct: z.number(),
    intrinsic_value_billion_cny_range: z.tuple([z.number(), z.number()]),
    implied_value_per_share_cny_range: z.tuple([z.number(), z.number()]),
  }),
  pe_model: z.object({
    method: z.string(),
    base_year: z.number(),
    expected_pe_approx: z.number(),
    fair_value_per_share_cny_range: z.tuple([z.number(), z.number()]),
  }),
  sensitivity_note: z.string(),
});

// ── Investment Opinion ─────────────────────────────────────
export const InvestmentOpinionSchema = z.object({
  rating: z.string(),
  short_term_advice: z.string(),
  long_term_view: z.string(),
  upgrade_trigger: z.string(),
});

// ── Risk Factors ───────────────────────────────────────────
export const RiskFactorSchema = z.object({
  risk: z.string(),
  impact: z.string(),
});

// ── Data Notes ─────────────────────────────────────────────
export const DataNotesSchema = z.object({
  unit: z.string(),
  rounding: z.string(),
  approximate_markers: z.string(),
  estimated_markers: z.string(),
  source: z.string(),
});

// ── Top-level Financial Report ─────────────────────────────
export const FinancialReportSchema = z.object({
  report_meta: ReportMetaSchema,
  profitability: ProfitabilitySchema,
  cost_structure_2025: CostStructureSchema,
  solvency: SolvencySchema,
  operational_efficiency: OperationalEfficiencySchema,
  cash_flow_and_growth: CashFlowSchema,
  business_highlights: BusinessHighlightsSchema,
  conclusions: z.array(ConclusionSchema),
  forecast: ForecastSchema,
  valuation: ValuationSchema,
  investment_opinion: InvestmentOpinionSchema,
  risk_factors: z.array(RiskFactorSchema),
  data_notes: DataNotesSchema,
});

export type FinancialReport = z.infer<typeof FinancialReportSchema>;
export type ProfitabilityAnnual = z.infer<typeof ProfitabilityAnnualSchema>;
export type SolvencyAnnual = z.infer<typeof SolvencyAnnualSchema>;
export type OperationalEfficiencyAnnual = z.infer<typeof OperationalEfficiencyAnnualSchema>;
export type CashFlowAnnual = z.infer<typeof CashFlowAnnualSchema>;
export type ForecastAnnual = z.infer<typeof ForecastAnnualSchema>;
export type Conclusion = z.infer<typeof ConclusionSchema>;
export type RiskFactor = z.infer<typeof RiskFactorSchema>;
