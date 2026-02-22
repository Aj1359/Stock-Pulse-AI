import { ArrowUpRight, ArrowDownRight, Minus, Target, ShieldAlert, BarChart3, Clock, Brain, TrendingUp, Zap } from "lucide-react";
import type { StockAlert } from "@/data/stockData";

interface StockAlertCardProps {
  alert: StockAlert;
}

const strategyLabels: Record<string, string> = {
  IQR_ZSCORE: "IQR Z-Score",
  WEIGHTED_LINEAR: "Weighted Linear",
  ML_ENSEMBLE: "ML Ensemble",
  NEURAL_NET: "Neural Net",
  HYBRID: "Hybrid Signal",
};

const StockAlertCard = ({ alert }: StockAlertCardProps) => {
  const signalConfig = {
    BUY: { class: "signal-buy glow-buy", icon: ArrowUpRight, label: "BUY" },
    SELL: { class: "signal-sell glow-sell", icon: ArrowDownRight, label: "SELL" },
    HOLD: { class: "signal-hold glow-hold", icon: Minus, label: "HOLD" },
  };

  const config = signalConfig[alert.signal];
  const SignalIcon = config.icon;
  const isPositive = alert.changePercent >= 0;
  const a = alert.analysis;

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all duration-300 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-mono">{alert.symbol}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-mono">
              {alert.exchange}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-medium">
              {strategyLabels[alert.strategy]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">{alert.name}</p>
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold font-mono ${config.class}`}>
          <SignalIcon className="h-3.5 w-3.5" />
          {config.label}
        </div>
      </div>

      {/* Price + Expected Return */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold font-mono">₹{alert.currentPrice.toLocaleString("en-IN")}</span>
          <span className={`text-xs font-mono font-medium ${isPositive ? "text-buy" : "text-sell"}`}>
            {isPositive ? "+" : ""}{alert.changePercent.toFixed(2)}%
          </span>
        </div>
        {alert.expectedReturn > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-buy/10 border border-buy/20">
            <TrendingUp className="h-3 w-3 text-buy" />
            <span className="text-xs font-mono font-bold text-buy">+{alert.expectedReturn}%</span>
          </div>
        )}
      </div>

      {/* Quantity */}
      {alert.signal !== "HOLD" && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Qty to {alert.signal.toLowerCase()}</span>
            <span className="text-sm font-bold font-mono text-foreground">{alert.quantity} shares</span>
          </div>
        </div>
      )}

      {/* Strategy Analysis Grid */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        <div className="bg-secondary/40 rounded-lg p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-0.5">IQR Z</p>
          <p className={`text-xs font-mono font-bold ${a.iqrZScore < -2 ? "text-buy" : a.iqrZScore > 2 ? "text-sell" : "text-muted-foreground"}`}>
            {a.iqrZScore > 0 ? "+" : ""}{a.iqrZScore.toFixed(1)}
          </p>
        </div>
        <div className="bg-secondary/40 rounded-lg p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-0.5">NN Prob</p>
          <p className={`text-xs font-mono font-bold ${a.nnProbability > a.longThreshold ? "text-buy" : a.nnProbability < a.shortThreshold ? "text-sell" : "text-hold"}`}>
            {(a.nnProbability * 100).toFixed(0)}%
          </p>
        </div>
        <div className="bg-secondary/40 rounded-lg p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-0.5">ML Conf</p>
          <p className={`text-xs font-mono font-bold ${a.mlConfidence > 0.65 ? "text-primary" : "text-muted-foreground"}`}>
            {(a.mlConfidence * 100).toFixed(0)}%
          </p>
        </div>
        <div className="bg-secondary/40 rounded-lg p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-0.5">Sharpe</p>
          <p className="text-xs font-mono font-bold text-primary">{a.sharpeRatio.toFixed(1)}</p>
        </div>
      </div>

      {/* Targets */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs">
          <Target className="h-3 w-3 text-primary" />
          <span className="text-muted-foreground">Target:</span>
          <span className="font-mono font-medium">₹{alert.targetPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <ShieldAlert className="h-3 w-3 text-sell" />
          <span className="text-muted-foreground">SL:</span>
          <span className="font-mono font-medium">₹{alert.stopLoss.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="flex items-center gap-3 mb-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1 font-mono">
          <Brain className="h-3 w-3" /> Calmar: {a.calmarRatio.toFixed(1)}
        </span>
        <span className="font-mono">DD: {a.maxDrawdown}%</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {alert.timestamp}
        </span>
      </div>

      {/* Confidence */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-muted-foreground">Model Confidence</span>
          <span className="text-[11px] font-mono font-medium">{alert.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              alert.signal === "BUY" ? "bg-buy" : alert.signal === "SELL" ? "bg-sell" : "bg-hold"
            }`}
            style={{ width: `${alert.confidence}%` }}
          />
        </div>
      </div>

      {/* Reason */}
      <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-2 mt-2">
        <Zap className="h-3 w-3 inline mr-1 text-primary" />
        {alert.reason}
      </p>
    </div>
  );
};

export default StockAlertCard;
