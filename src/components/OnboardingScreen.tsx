import { useState } from "react";
import { TrendingUp, Clock, IndianRupee, Lightbulb, ArrowRight } from "lucide-react";

const holdingOptions = [
  { value: "intraday", label: "Intraday", desc: "Same day trades" },
  { value: "swing", label: "Swing (1-2 weeks)", desc: "Short-term momentum" },
  { value: "short", label: "1-3 Months", desc: "Positional trades" },
  { value: "medium", label: "3-12 Months", desc: "Medium-term growth" },
  { value: "long", label: "1+ Year", desc: "Long-term wealth" },
];

interface OnboardingScreenProps {
  onComplete: (data: { amount: number; holding: string }) => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [amount, setAmount] = useState("");
  const [holding, setHolding] = useState("");
  const [step, setStep] = useState(1);

  const parsedAmount = Number(amount.replace(/,/g, ""));
  const isValidAmount = parsedAmount >= 1000;

  const suggestions = [
    {
      icon: "💡",
      title: "Diversify across sectors",
      desc: "Spread your capital across IT, Banking, Auto & Pharma to reduce risk.",
    },
    {
      icon: "🎯",
      title: "Use stop-loss strictly",
      desc: "Never risk more than 2% of your capital on a single trade.",
    },
    {
      icon: "📊",
      title: "Follow ADX+ATR+VWAP",
      desc: "Our flagship strategy combines trend strength, volatility & volume for highest accuracy.",
    },
    {
      icon: "⚡",
      title: holding === "intraday" ? "Focus on F&O" : "Start with large caps",
      desc: holding === "intraday"
        ? "For intraday, F&O gives better leverage with defined risk."
        : "Blue-chip stocks like Reliance, TCS give stable returns for your timeframe.",
    },
  ];

  const formatAmount = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    if (!num) return "";
    return Number(num).toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">StockPulse AI</h1>
          <p className="text-sm text-muted-foreground">Let's set up your investment profile</p>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold">Investment Amount</h2>
            </div>
            <p className="text-xs text-muted-foreground">How much capital do you want to deploy?</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-lg">₹</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(formatAmount(e.target.value))}
                placeholder="1,00,000"
                className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-4 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/40"
              />
            </div>
            {/* Quick amounts */}
            <div className="flex flex-wrap gap-2">
              {["50,000", "1,00,000", "2,50,000", "5,00,000", "10,00,000"].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    amount === v
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "bg-secondary text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  ₹{v}
                </button>
              ))}
            </div>
            <button
              onClick={() => isValidAmount && setStep(2)}
              disabled={!isValidAmount}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
            {amount && !isValidAmount && (
              <p className="text-xs text-sell text-center">Minimum ₹1,000 required</p>
            )}
          </div>
        )}

        {/* Step 2: Holding Period */}
        {step === 2 && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold">Holding Period</h2>
            </div>
            <p className="text-xs text-muted-foreground">How long do you want to stay invested?</p>
            <div className="space-y-2">
              {holdingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setHolding(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                    holding === opt.value
                      ? "bg-primary/10 border-primary/30 text-foreground"
                      : "bg-secondary border-transparent hover:border-border text-muted-foreground"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                  </div>
                  {holding === opt.value && (
                    <span className="text-primary text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-secondary text-muted-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => holding && setStep(3)}
                disabled={!holding}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Suggestions */}
        {step === 3 && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold">AI Suggestions for You</h2>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                Capital: <span className="text-foreground font-semibold">₹{amount}</span> •
                Horizon: <span className="text-foreground font-semibold capitalize">{holdingOptions.find((h) => h.value === holding)?.label}</span>
              </span>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onComplete({ amount: parsedAmount, holding })}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Start Scanning Stocks <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/40" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
