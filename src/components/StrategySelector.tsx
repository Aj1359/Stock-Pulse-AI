import { strategies, type Strategy } from "@/data/stockData";
import { Zap } from "lucide-react";

interface StrategySelectorProps {
  selected: Strategy[];
  onToggle: (strategy: Strategy) => void;
}

const StrategySelector = ({ selected, onToggle }: StrategySelectorProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Active Strategies</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {strategies.map((s) => {
          const active = selected.includes(s.value);
          return (
            <button
              key={s.value}
              onClick={() => onToggle(s.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-200 border
                ${active
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-secondary text-muted-foreground border-transparent hover:border-border"
                }
              `}
              title={s.description}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StrategySelector;
