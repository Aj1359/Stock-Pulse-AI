import { Activity, TrendingUp, BarChart3, Zap, Brain, ShieldAlert } from "lucide-react";

interface StrategyCornerProps {
  investmentAmount: number;
  holding: string;
}

const StrategyCorner = ({ investmentAmount, holding }: StrategyCornerProps) => {
  const iqrZ = -1.8;
  const nnProb = 0.78;
  const mlConf = 0.87;
  const weightedSig = 0.72;
  const longThreshold = 0.56;
  const shortThreshold = 0.45;
  const sharpe = 4.29;
  const calmar = 10.46;
  const annReturn = 34.6;
  const maxDD = -2.97;

  const overallSignal = nnProb > longThreshold && iqrZ < -1.5 ? "BUY" : nnProb < shortThreshold && iqrZ > 1.5 ? "SELL" : "HOLD";
  const tCost = investmentAmount * 0.0004; // 2bps per side

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-primary/5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Strategy Corner</h2>
          <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold">Quantitative Model</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground font-mono">5 Approaches • {annReturn}% Ann. Return</span>
          <span className="px-2 py-0.5 rounded-full bg-buy/15 text-buy text-[10px] font-mono font-bold">LIVE</span>
        </div>
      </div>

      {/* Pipeline: 5 Approaches */}
      <div className="px-4 py-3 border-b border-border bg-secondary/20">
        <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider font-medium">Model Pipeline (from your research paper)</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { label: "1. IQR Z-Score", desc: "Mean Reversion", active: true },
            { label: "2. Weighted Linear", desc: "Correlation Signal", active: true },
            { label: "3. ML Ensemble", desc: "CatBoost+XGB+LGBM", active: true },
            { label: "4. Neural Net", desc: "128→64→32 NN", active: true },
            { label: "5. Hybrid", desc: "Combined Signal", active: true },
          ].map((step, i) => (
            <div key={i} className="flex-shrink-0 px-3 py-2 rounded-lg bg-card border border-primary/20 min-w-[130px]">
              <p className="text-[11px] font-medium text-primary">{step.label}</p>
              <p className="text-[10px] text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* IQR Z-Score */}
        <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium">IQR Z-Score</span>
          </div>
          <p className={`text-lg font-bold font-mono ${iqrZ < -2 ? "text-buy" : iqrZ > 2 ? "text-sell" : "text-foreground"}`}>
            {iqrZ.toFixed(1)}
          </p>
          <span className="text-[9px] text-muted-foreground font-mono">Buy &lt; -2 • Sell &gt; 2</span>
        </div>

        {/* NN Probability */}
        <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium">NN Probability</span>
          </div>
          <p className={`text-lg font-bold font-mono ${nnProb > longThreshold ? "text-buy" : nnProb < shortThreshold ? "text-sell" : "text-hold"}`}>
            {(nnProb * 100).toFixed(0)}%
          </p>
          <span className="text-[9px] text-muted-foreground font-mono">LT: {longThreshold} • ST: {shortThreshold}</span>
        </div>

        {/* ML Confidence */}
        <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium">ML Ensemble</span>
          </div>
          <p className={`text-lg font-bold font-mono ${mlConf > 0.65 ? "text-buy" : "text-muted-foreground"}`}>
            {(mlConf * 100).toFixed(0)}%
          </p>
          <span className="text-[9px] text-muted-foreground font-mono">Filter: &gt;65% conf</span>
        </div>

        {/* Risk Metrics */}
        <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium">Risk Metrics</span>
          </div>
          <p className="text-lg font-bold font-mono text-primary">
            {sharpe.toFixed(1)} <span className="text-[10px] text-muted-foreground">Sharpe</span>
          </p>
          <span className="text-[9px] text-muted-foreground font-mono">Calmar: {calmar} • DD: {maxDD}%</span>
        </div>

        {/* Combined Signal */}
        <div className={`rounded-xl p-3 space-y-1.5 border ${
          overallSignal === "BUY" ? "bg-buy/10 border-buy/20" : overallSignal === "SELL" ? "bg-sell/10 border-sell/20" : "bg-hold/10 border-hold/20"
        }`}>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium">Hybrid Signal</span>
          </div>
          <p className={`text-lg font-bold font-mono ${
            overallSignal === "BUY" ? "text-buy" : overallSignal === "SELL" ? "text-sell" : "text-hold"
          }`}>
            {overallSignal}
          </p>
          <span className="text-[9px] text-muted-foreground font-mono">
            T-Cost: ₹{tCost.toFixed(0)} (2bps)
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrategyCorner;
