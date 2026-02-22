import { TrendingUp, Activity, Bell } from "lucide-react";

type Tab = "STOCKS" | "FNO" | "IPO";

interface StockHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { value: Tab; label: string; icon: string; badge?: string }[] = [
  { value: "STOCKS", label: "Stocks", icon: "📊" },
  { value: "FNO", label: "F&O", icon: "📈", badge: "LIVE" },
  { value: "IPO", label: "IPO", icon: "🚀" },
];

const StockHeader = ({ activeTab, onTabChange }: StockHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">StockPulse AI</h1>
              <p className="text-xs text-muted-foreground font-mono">NSE • BSE Live Scanner</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Activity className="h-3 w-3 text-primary ticker-pulse" />
              <span>NIFTY 50: <span className="text-primary">22,147.50</span></span>
              <span className="text-muted-foreground/50">|</span>
              <span>SENSEX: <span className="text-primary">72,831.94</span></span>
            </div>
            <button className="relative h-9 w-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-sell text-[10px] font-bold flex items-center justify-center text-sell-foreground">3</span>
            </button>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-0 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === tab.value
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-buy/15 text-buy font-mono font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default StockHeader;
