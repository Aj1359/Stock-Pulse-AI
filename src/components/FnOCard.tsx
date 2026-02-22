import { ArrowUpRight, ArrowDownRight, Minus, Activity, BarChart3 } from "lucide-react";
import type { FnOContract } from "@/data/stockData";

interface FnOCardProps {
  contract: FnOContract;
}

const FnOCard = ({ contract }: FnOCardProps) => {
  const signalConfig = {
    BUY: { class: "signal-buy glow-buy", icon: ArrowUpRight, label: "BUY" },
    SELL: { class: "signal-sell glow-sell", icon: ArrowDownRight, label: "SELL" },
    HOLD: { class: "signal-hold glow-hold", icon: Minus, label: "HOLD" },
  };
  const config = signalConfig[contract.signal];
  const SignalIcon = config.icon;
  const isPositive = contract.changePercent >= 0;

  const typeColor = contract.type === "CALL"
    ? "text-buy bg-buy/10 border-buy/30"
    : contract.type === "PUT"
    ? "text-sell bg-sell/10 border-sell/30"
    : "text-hold bg-hold/10 border-hold/30";

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all duration-300 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-mono">{contract.symbol}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold ${typeColor}`}>
              {contract.type}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {contract.type !== "FUTURE" && `Strike: ₹${contract.strikePrice.toLocaleString("en-IN")} • `}
            Exp: {contract.expiry}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold font-mono ${config.class}`}>
          <SignalIcon className="h-3.5 w-3.5" />
          {config.label}
        </div>
      </div>

      {/* LTP */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold font-mono">₹{contract.ltp.toLocaleString("en-IN")}</span>
        <span className={`text-xs font-mono font-medium ${isPositive ? "text-buy" : "text-sell"}`}>
          {isPositive ? "+" : ""}{contract.changePercent.toFixed(2)}%
        </span>
      </div>

      {/* Lot info */}
      {contract.signal !== "HOLD" && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Lots to {contract.signal.toLowerCase()}</span>
            <span className="text-sm font-bold font-mono text-foreground">
              {contract.lots} lots ({contract.lots * contract.lotSize} qty)
            </span>
          </div>
        </div>
      )}

      {/* OI & Volume */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-[11px]">
        <div className="flex flex-col">
          <span className="text-muted-foreground">OI</span>
          <span className="font-mono font-medium">{contract.oi}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">OI Chg</span>
          <span className={`font-mono font-medium ${contract.oiChange.startsWith("+") ? "text-buy" : "text-sell"}`}>
            {contract.oiChange}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Volume</span>
          <span className="font-mono font-medium">{contract.volume}</span>
        </div>
      </div>

      {contract.iv > 0 && (
        <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
          <Activity className="h-3 w-3" />
          <span className="font-mono">IV: {contract.iv}%</span>
        </div>
      )}

      {/* Confidence */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-muted-foreground">Confidence</span>
          <span className="text-[11px] font-mono font-medium">{contract.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              contract.signal === "BUY" ? "bg-buy" : contract.signal === "SELL" ? "bg-sell" : "bg-hold"
            }`}
            style={{ width: `${contract.confidence}%` }}
          />
        </div>
      </div>

      {/* Reason */}
      <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-2 mt-2">
        {contract.reason}
      </p>
    </div>
  );
};

export default FnOCard;
