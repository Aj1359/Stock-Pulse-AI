import type { StockAlert } from "@/data/stockData";
import { TrendingUp, TrendingDown, Pause, BarChart3 } from "lucide-react";

interface MarketStatsProps {
  alerts: StockAlert[];
}

const MarketStats = ({ alerts }: MarketStatsProps) => {
  const buyCount = alerts.filter((a) => a.signal === "BUY").length;
  const sellCount = alerts.filter((a) => a.signal === "SELL").length;
  const holdCount = alerts.filter((a) => a.signal === "HOLD").length;
  const avgConfidence = Math.round(alerts.reduce((a, b) => a + b.confidence, 0) / alerts.length);

  const stats = [
    { label: "Buy Signals", value: buyCount, icon: TrendingUp, colorClass: "text-buy" },
    { label: "Sell Signals", value: sellCount, icon: TrendingDown, colorClass: "text-sell" },
    { label: "Hold", value: holdCount, icon: Pause, colorClass: "text-hold" },
    { label: "Avg Confidence", value: `${avgConfidence}%`, icon: BarChart3, colorClass: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
          <div className={`h-9 w-9 rounded-lg bg-secondary flex items-center justify-center ${stat.colorClass}`}>
            <stat.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-lg font-bold font-mono">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
