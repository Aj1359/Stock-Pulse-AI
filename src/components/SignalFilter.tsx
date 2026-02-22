import type { Signal } from "@/data/stockData";

interface SignalFilterProps {
  active: Signal | "ALL";
  onChange: (signal: Signal | "ALL") => void;
}

const filters: { value: Signal | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Signals" },
  { value: "BUY", label: "Buy" },
  { value: "SELL", label: "Sell" },
  { value: "HOLD", label: "Hold" },
];

const SignalFilter = ({ active, onChange }: SignalFilterProps) => {
  return (
    <div className="flex gap-1.5">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
            ${active === f.value
              ? f.value === "BUY"
                ? "signal-buy border-buy/30"
                : f.value === "SELL"
                ? "signal-sell border-sell/30"
                : f.value === "HOLD"
                ? "signal-hold border-hold/30"
                : "bg-primary/15 text-primary border-primary/30"
              : "bg-secondary text-muted-foreground border-transparent hover:border-border"
            }
          `}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default SignalFilter;
