import { useState, useMemo } from "react";
import StockHeader from "@/components/StockHeader";
import StrategySelector from "@/components/StrategySelector";
import StrategyCorner from "@/components/StrategyCorner";
import StockAlertCard from "@/components/StockAlertCard";
import MarketStats from "@/components/MarketStats";
import SearchBar from "@/components/SearchBar";
import SignalFilter from "@/components/SignalFilter";
import SectorFilter from "@/components/SectorFilter";
import FnOCard from "@/components/FnOCard";
import IPOCard from "@/components/IPOCard";
import OnboardingScreen from "@/components/OnboardingScreen";
import { mockAlerts, mockFnO, mockIPOs, type Strategy, type Signal, type Sector } from "@/data/stockData";

type Tab = "STOCKS" | "FNO" | "IPO";

const Index = () => {
  const [onboarded, setOnboarded] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [holdingPeriod, setHoldingPeriod] = useState("short");

  const [activeTab, setActiveTab] = useState<Tab>("STOCKS");
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>(["IQR_ZSCORE", "WEIGHTED_LINEAR", "ML_ENSEMBLE", "NEURAL_NET", "HYBRID"]);
  const [search, setSearch] = useState("");
  const [signalFilter, setSignalFilter] = useState<Signal | "ALL">("ALL");
  const [sectorFilter, setSectorFilter] = useState<Sector | "ALL">("ALL");

  const handleOnboardingComplete = (data: { amount: number; holding: string }) => {
    setInvestmentAmount(data.amount);
    setHoldingPeriod(data.holding);
    setOnboarded(true);
  };

  const toggleStrategy = (s: Strategy) => {
    setSelectedStrategies((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const filteredStocks = useMemo(() => {
    return mockAlerts.filter((a) => {
      if (!selectedStrategies.includes(a.strategy)) return false;
      if (signalFilter !== "ALL" && a.signal !== signalFilter) return false;
      if (sectorFilter !== "ALL" && a.sector !== sectorFilter) return false;
      if (search && !a.symbol.toLowerCase().includes(search.toLowerCase()) && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedStrategies, signalFilter, sectorFilter, search]);

  const filteredFnO = useMemo(() => {
    return mockFnO.filter((c) => {
      if (signalFilter !== "ALL" && c.signal !== signalFilter) return false;
      if (search && !c.symbol.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [signalFilter, search]);

  const filteredIPOs = useMemo(() => {
    return mockIPOs.filter((ipo) => {
      if (search && !ipo.company.toLowerCase().includes(search.toLowerCase()) && !ipo.symbol.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search]);

  if (!onboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <StockHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-6 space-y-5">
        {/* Strategy Corner - Always visible at top */}
        <StrategyCorner investmentAmount={investmentAmount} holding={holdingPeriod} />

        {/* Stocks Tab */}
        {activeTab === "STOCKS" && (
          <>
            <MarketStats alerts={filteredStocks} />

            <div className="bg-card rounded-xl border border-border p-3">
              <p className="text-[11px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">Sectors</p>
              <SectorFilter active={sectorFilter} onChange={setSectorFilter} />
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-5">
              <div className="space-y-4">
                <StrategySelector selected={selectedStrategies} onToggle={toggleStrategy} />
                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="text-sm font-semibold mb-2">Your Profile</h3>
                  <ul className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
                    <li>💰 Capital: <span className="text-foreground font-semibold">₹{investmentAmount.toLocaleString("en-IN")}</span></li>
                    <li>⏳ Horizon: <span className="text-foreground font-semibold capitalize">{holdingPeriod}</span></li>
                    <li>📊 Strategy: <span className="text-primary font-semibold">ADX+ATR+VWAP</span></li>
                    <li>⚡ Alerts tuned to your risk profile</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <SearchBar value={search} onChange={setSearch} />
                  </div>
                  <SignalFilter active={signalFilter} onChange={setSignalFilter} />
                </div>

                {filteredStocks.length === 0 ? (
                  <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <p className="text-muted-foreground text-sm">No alerts match your filters.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredStocks.map((alert) => (
                      <StockAlertCard key={alert.id} alert={alert} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* F&O Tab */}
        {activeTab === "FNO" && (
          <>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📈</span>
                <h2 className="text-base font-bold">Futures & Options</h2>
              </div>
              <p className="text-xs text-muted-foreground">AI-powered F&O signals with OI analysis, IV tracking, and lot recommendations</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <SignalFilter active={signalFilter} onChange={setSignalFilter} />
            </div>

            {filteredFnO.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <p className="text-muted-foreground text-sm">No F&O contracts match your filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredFnO.map((contract) => (
                  <FnOCard key={contract.id} contract={contract} />
                ))}
              </div>
            )}
          </>
        )}

        {/* IPO Tab */}
        {activeTab === "IPO" && (
          <>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🚀</span>
                <h2 className="text-base font-bold">IPO Dashboard</h2>
              </div>
              <p className="text-xs text-muted-foreground">Track upcoming, open, and listed IPOs with GMP, subscription data, and AI ratings</p>
            </div>

            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="flex gap-2 flex-wrap">
              {["ALL", "UPCOMING", "OPEN", "LISTED", "CLOSED"].map((status) => (
                <button
                  key={status}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-muted-foreground border border-transparent hover:border-border transition-all"
                >
                  {status === "ALL" ? "All IPOs" : status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {filteredIPOs.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <p className="text-muted-foreground text-sm">No IPOs match your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredIPOs.map((ipo) => (
                  <IPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-4 mt-8">
        <p className="text-center text-xs text-muted-foreground font-mono">© Aditya Jha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
