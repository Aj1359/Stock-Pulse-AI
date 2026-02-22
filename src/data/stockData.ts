export type Signal = "BUY" | "SELL" | "HOLD";

export type Strategy = "IQR_ZSCORE" | "WEIGHTED_LINEAR" | "ML_ENSEMBLE" | "NEURAL_NET" | "HYBRID";

export type Sector = "IT" | "BANKING" | "AUTO" | "PHARMA" | "ENERGY" | "FMCG" | "METALS" | "INFRA";

export interface StrategyAnalysis {
  iqrZScore: number;       // IQR Z-Score: Buy < -2, Sell > 2
  weightedSignal: number;  // Weighted Linear Signal (-1 to 1)
  mlConfidence: number;    // ML ensemble probability (0-1)
  nnProbability: number;   // Neural net output probability
  longThreshold: number;   // Long threshold (e.g. 0.56-0.65)
  shortThreshold: number;  // Short threshold (e.g. 0.35-0.45)
  calmarRatio: number;
  sharpeRatio: number;
  maxDrawdown: number;
  annualReturn: number;
}

export interface StockAlert {
  id: string;
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE";
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  signal: Signal;
  strategy: Strategy;
  quantity: number;
  confidence: number;
  change: number;
  changePercent: number;
  rsi: number;
  volume: string;
  timestamp: string;
  reason: string;
  sector: Sector;
  analysis: StrategyAnalysis;
  expectedReturn: number; // daily expected return %
}

export interface FnOContract {
  id: string;
  symbol: string;
  name: string;
  type: "CALL" | "PUT" | "FUTURE";
  expiry: string;
  strikePrice: number;
  ltp: number;
  change: number;
  changePercent: number;
  oi: string;
  oiChange: string;
  volume: string;
  iv: number;
  signal: Signal;
  lotSize: number;
  lots: number;
  confidence: number;
  reason: string;
}

export interface IPOListing {
  id: string;
  company: string;
  symbol: string;
  priceRange: string;
  issueSize: string;
  lotSize: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  status: "UPCOMING" | "OPEN" | "LISTED" | "CLOSED";
  gmp: number;
  subscription: string;
  rating: "SUBSCRIBE" | "AVOID" | "NEUTRAL";
  sector: string;
  type: "MAINBOARD" | "SME";
}

export const sectors: { value: Sector; label: string; icon: string }[] = [
  { value: "IT", label: "IT & Tech", icon: "💻" },
  { value: "BANKING", label: "Banking & Finance", icon: "🏦" },
  { value: "AUTO", label: "Automobile", icon: "🚗" },
  { value: "PHARMA", label: "Pharma & Health", icon: "💊" },
  { value: "ENERGY", label: "Energy & Power", icon: "⚡" },
  { value: "FMCG", label: "FMCG", icon: "🛒" },
  { value: "METALS", label: "Metals & Mining", icon: "⛏️" },
  { value: "INFRA", label: "Infrastructure", icon: "🏗️" },
];

export const strategies: { value: Strategy; label: string; description: string }[] = [
  { value: "IQR_ZSCORE", label: "IQR Z-Score", description: "Mean reversion using IQR-normalized Z-scores. Buy if Z<-2, Sell if Z>2" },
  { value: "WEIGHTED_LINEAR", label: "Weighted Linear", description: "Correlation-weighted signal with logistic calibration" },
  { value: "ML_ENSEMBLE", label: "ML Ensemble", description: "CatBoost + XGBoost + LightGBM ensemble with 65% confidence filter" },
  { value: "NEURAL_NET", label: "Neural Net", description: "128→64→32 feed-forward NN with learned long/short thresholds" },
  { value: "HYBRID", label: "Hybrid Signal", description: "Combined mean-reversion + deep-learned directional confidence" },
];

export const mockAlerts: StockAlert[] = [
  {
    id: "1", symbol: "RELIANCE", name: "Reliance Industries Ltd", exchange: "NSE",
    currentPrice: 2847.50, targetPrice: 3135.00, stopLoss: 2790.00,
    signal: "BUY", strategy: "NEURAL_NET", quantity: 15, confidence: 92,
    change: 42.30, changePercent: 1.51, rsi: 42, volume: "12.4M",
    timestamp: "2 min ago", sector: "ENERGY",
    reason: "NN probability 0.78 > Long Threshold 0.56. IQR Z-Score at -1.8 confirming mean reversion. ML ensemble agrees at 82% confidence. Expected 10.1% daily return after 2bps cost.",
    expectedReturn: 10.1,
    analysis: {
      iqrZScore: -1.8, weightedSignal: 0.72, mlConfidence: 0.82, nnProbability: 0.78,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 8.2, sharpeRatio: 3.4,
      maxDrawdown: -2.1, annualReturn: 28.5,
    },
  },
  {
    id: "2", symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE",
    currentPrice: 3892.15, targetPrice: 3500.00, stopLoss: 3970.00,
    signal: "SELL", strategy: "IQR_ZSCORE", quantity: 8, confidence: 88,
    change: -67.85, changePercent: -1.71, rsi: 76, volume: "5.8M",
    timestamp: "5 min ago", sector: "IT",
    reason: "IQR Z-Score at +2.4 (>2 threshold) — overbought mean reversion trigger. NN short threshold breached at p=0.38 < 0.45. Weighted signal -0.65. Target 10% correction.",
    expectedReturn: 12.3,
    analysis: {
      iqrZScore: 2.4, weightedSignal: -0.65, mlConfidence: 0.79, nnProbability: 0.38,
      longThreshold: 0.65, shortThreshold: 0.45, calmarRatio: 6.8, sharpeRatio: 3.1,
      maxDrawdown: -3.2, annualReturn: 22.1,
    },
  },
  {
    id: "3", symbol: "INFY", name: "Infosys Ltd", exchange: "NSE",
    currentPrice: 1567.40, targetPrice: 1750.00, stopLoss: 1530.00,
    signal: "BUY", strategy: "ML_ENSEMBLE", quantity: 25, confidence: 86,
    change: 18.90, changePercent: 1.22, rsi: 38, volume: "8.2M",
    timestamp: "8 min ago", sector: "IT",
    reason: "CatBoost ensemble 87% confidence (>65% filter). Morning volatility features confirm bullish EOD direction. IQR Z at -1.5 supports. Expected 11.6% daily return.",
    expectedReturn: 11.6,
    analysis: {
      iqrZScore: -1.5, weightedSignal: 0.58, mlConfidence: 0.87, nnProbability: 0.71,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 9.1, sharpeRatio: 3.8,
      maxDrawdown: -1.8, annualReturn: 31.2,
    },
  },
  {
    id: "4", symbol: "HDFCBANK", name: "HDFC Bank Ltd", exchange: "NSE",
    currentPrice: 1685.20, targetPrice: 1685.20, stopLoss: 1685.20,
    signal: "HOLD", strategy: "HYBRID", quantity: 0, confidence: 52,
    change: 3.10, changePercent: 0.18, rsi: 52, volume: "9.1M",
    timestamp: "12 min ago", sector: "BANKING",
    reason: "NN probability 0.51 in neutral zone (0.45 < p < 0.56). IQR Z at 0.3 — no mean reversion signal. ML ensemble at 54% below 65% filter. No trade recommended.",
    expectedReturn: 0,
    analysis: {
      iqrZScore: 0.3, weightedSignal: 0.08, mlConfidence: 0.54, nnProbability: 0.51,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 2.1, sharpeRatio: 0.8,
      maxDrawdown: -4.5, annualReturn: 5.2,
    },
  },
  {
    id: "5", symbol: "TATAMOTORS", name: "Tata Motors Ltd", exchange: "NSE",
    currentPrice: 945.75, targetPrice: 1090.00, stopLoss: 920.00,
    signal: "BUY", strategy: "NEURAL_NET", quantity: 30, confidence: 95,
    change: 28.45, changePercent: 3.10, rsi: 35, volume: "18.7M",
    timestamp: "1 min ago", sector: "AUTO",
    reason: "NN probability 0.89 >> LT 0.56. All 5 models agree on BUY. IQR Z at -2.3 (<-2 threshold). Volume 2.5x avg confirms institutional buying. Calmar 12.1. Expected 15.2% daily.",
    expectedReturn: 15.2,
    analysis: {
      iqrZScore: -2.3, weightedSignal: 0.91, mlConfidence: 0.93, nnProbability: 0.89,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 12.1, sharpeRatio: 4.5,
      maxDrawdown: -1.2, annualReturn: 34.6,
    },
  },
  {
    id: "6", symbol: "WIPRO", name: "Wipro Ltd", exchange: "NSE",
    currentPrice: 478.30, targetPrice: 430.00, stopLoss: 500.00,
    signal: "SELL", strategy: "WEIGHTED_LINEAR", quantity: 40, confidence: 81,
    change: -12.60, changePercent: -2.57, rsi: 68, volume: "6.3M",
    timestamp: "15 min ago", sector: "IT",
    reason: "Weighted linear signal -0.78 with high correlation features bearish. NN p=0.32 < ST 0.45 confirms short. IQR Z at +2.1 overbought. Post-cost expected 10.8% daily return.",
    expectedReturn: 10.8,
    analysis: {
      iqrZScore: 2.1, weightedSignal: -0.78, mlConfidence: 0.76, nnProbability: 0.32,
      longThreshold: 0.65, shortThreshold: 0.45, calmarRatio: 7.5, sharpeRatio: 2.9,
      maxDrawdown: -3.8, annualReturn: 19.4,
    },
  },
  {
    id: "7", symbol: "ICICIBANK", name: "ICICI Bank Ltd", exchange: "NSE",
    currentPrice: 1124.80, targetPrice: 1260.00, stopLoss: 1090.00,
    signal: "BUY", strategy: "HYBRID", quantity: 20, confidence: 90,
    change: 15.20, changePercent: 1.37, rsi: 32, volume: "11.5M",
    timestamp: "3 min ago", sector: "BANKING",
    reason: "Hybrid signal: IQR Z-Score -2.1 (mean reversion BUY) + NN directional confidence 0.81. CatBoost 88% bullish. Sharpe 4.1 — strongest risk-adjusted signal today. Expected 13.5%.",
    expectedReturn: 13.5,
    analysis: {
      iqrZScore: -2.1, weightedSignal: 0.82, mlConfidence: 0.88, nnProbability: 0.81,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 10.8, sharpeRatio: 4.1,
      maxDrawdown: -1.5, annualReturn: 32.8,
    },
  },
  {
    id: "8", symbol: "ADANIENT", name: "Adani Enterprises Ltd", exchange: "NSE",
    currentPrice: 2890.00, targetPrice: 2610.00, stopLoss: 2980.00,
    signal: "SELL", strategy: "ML_ENSEMBLE", quantity: 5, confidence: 84,
    change: -95.40, changePercent: -3.20, rsi: 72, volume: "14.2M",
    timestamp: "7 min ago", sector: "INFRA",
    reason: "ML ensemble 84% bearish with XGBoost leading. NN p=0.29 < ST 0.35. IQR Z +2.8 extreme overbought. Max drawdown risk only -2.9%. Expected 14.1% daily on short.",
    expectedReturn: 14.1,
    analysis: {
      iqrZScore: 2.8, weightedSignal: -0.85, mlConfidence: 0.84, nnProbability: 0.29,
      longThreshold: 0.65, shortThreshold: 0.35, calmarRatio: 9.4, sharpeRatio: 3.7,
      maxDrawdown: -2.9, annualReturn: 27.3,
    },
  },
  {
    id: "9", symbol: "SUNPHARMA", name: "Sun Pharmaceutical", exchange: "NSE",
    currentPrice: 1245.60, targetPrice: 1400.00, stopLoss: 1210.00,
    signal: "BUY", strategy: "IQR_ZSCORE", quantity: 18, confidence: 87,
    change: 22.10, changePercent: 1.81, rsi: 45, volume: "7.1M",
    timestamp: "4 min ago", sector: "PHARMA",
    reason: "IQR Z-Score at -2.2 triggered mean reversion BUY. Weighted signal 0.67 confirms. NN agrees at p=0.74 > LT. Morning features show bullish EOD direction. Expected 12.4%.",
    expectedReturn: 12.4,
    analysis: {
      iqrZScore: -2.2, weightedSignal: 0.67, mlConfidence: 0.81, nnProbability: 0.74,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 8.9, sharpeRatio: 3.5,
      maxDrawdown: -2.4, annualReturn: 26.1,
    },
  },
  {
    id: "10", symbol: "HINDUNILVR", name: "Hindustan Unilever", exchange: "NSE",
    currentPrice: 2534.90, targetPrice: 2280.00, stopLoss: 2590.00,
    signal: "SELL", strategy: "NEURAL_NET", quantity: 10, confidence: 83,
    change: -31.20, changePercent: -1.22, rsi: 71, volume: "3.9M",
    timestamp: "10 min ago", sector: "FMCG",
    reason: "NN probability 0.31 < Short Threshold 0.45. IQR Z at +1.9 approaching overbought. Weighted signal -0.58. Post 2bps cost, expected 10.5% daily return on short position.",
    expectedReturn: 10.5,
    analysis: {
      iqrZScore: 1.9, weightedSignal: -0.58, mlConfidence: 0.72, nnProbability: 0.31,
      longThreshold: 0.65, shortThreshold: 0.45, calmarRatio: 6.2, sharpeRatio: 2.6,
      maxDrawdown: -4.1, annualReturn: 18.7,
    },
  },
  {
    id: "11", symbol: "TATASTEEL", name: "Tata Steel Ltd", exchange: "NSE",
    currentPrice: 145.30, targetPrice: 168.00, stopLoss: 140.00,
    signal: "BUY", strategy: "HYBRID", quantity: 100, confidence: 93,
    change: 4.80, changePercent: 3.42, rsi: 38, volume: "22.1M",
    timestamp: "1 min ago", sector: "METALS",
    reason: "Hybrid signal strongest today: IQR Z -2.5 + NN 0.87 + ML 91%. All models converge. Calmar 11.5, Sharpe 4.3. FII buying + China stimulus. Expected 16.8% daily return.",
    expectedReturn: 16.8,
    analysis: {
      iqrZScore: -2.5, weightedSignal: 0.88, mlConfidence: 0.91, nnProbability: 0.87,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 11.5, sharpeRatio: 4.3,
      maxDrawdown: -1.3, annualReturn: 34.2,
    },
  },
  {
    id: "12", symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", exchange: "NSE",
    currentPrice: 7120.00, targetPrice: 7900.00, stopLoss: 6950.00,
    signal: "BUY", strategy: "WEIGHTED_LINEAR", quantity: 4, confidence: 85,
    change: 85.50, changePercent: 1.22, rsi: 41, volume: "4.5M",
    timestamp: "6 min ago", sector: "BANKING",
    reason: "Weighted linear signal 0.74 (high correlation PB features). NN p=0.69 > LT 0.56. ML 83% bullish. Support zone confirmed by IQR Z -1.7. Expected 11.0% daily return.",
    expectedReturn: 11.0,
    analysis: {
      iqrZScore: -1.7, weightedSignal: 0.74, mlConfidence: 0.83, nnProbability: 0.69,
      longThreshold: 0.56, shortThreshold: 0.45, calmarRatio: 7.8, sharpeRatio: 3.2,
      maxDrawdown: -2.8, annualReturn: 24.5,
    },
  },
];

export const mockFnO: FnOContract[] = [
  {
    id: "f1", symbol: "NIFTY", name: "NIFTY 50 Index", type: "CALL",
    expiry: "27 Feb 2026", strikePrice: 22200, ltp: 185.40,
    change: 32.50, changePercent: 21.27, oi: "1.2Cr", oiChange: "+12.5L",
    volume: "45.2L", iv: 14.2, signal: "BUY", lotSize: 25, lots: 4,
    confidence: 85, reason: "High OI buildup at 22000 PE. NIFTY likely to sustain above 22100.",
  },
  {
    id: "f2", symbol: "BANKNIFTY", name: "Bank NIFTY Index", type: "PUT",
    expiry: "27 Feb 2026", strikePrice: 47000, ltp: 342.80,
    change: -87.20, changePercent: -20.27, oi: "85.3L", oiChange: "-5.2L",
    volume: "32.1L", iv: 16.8, signal: "SELL", lotSize: 15, lots: 2,
    confidence: 78, reason: "PUT unwinding at 47000. Bank NIFTY showing strength above support.",
  },
  {
    id: "f3", symbol: "RELIANCE", name: "Reliance Industries", type: "FUTURE",
    expiry: "27 Feb 2026", strikePrice: 0, ltp: 2855.60,
    change: 48.30, changePercent: 1.72, oi: "52.4L", oiChange: "+8.1L",
    volume: "18.7L", iv: 0, signal: "BUY", lotSize: 250, lots: 2,
    confidence: 82, reason: "Long buildup with 15% OI increase. Futures premium expanding.",
  },
  {
    id: "f4", symbol: "NIFTY", name: "NIFTY 50 Index", type: "PUT",
    expiry: "27 Feb 2026", strikePrice: 21800, ltp: 98.50,
    change: -24.30, changePercent: -19.80, oi: "95.1L", oiChange: "+18.3L",
    volume: "52.8L", iv: 15.1, signal: "BUY", lotSize: 25, lots: 6,
    confidence: 90, reason: "Massive PUT writing at 21800. Strong support building for NIFTY.",
  },
  {
    id: "f5", symbol: "TCS", name: "Tata Consultancy Services", type: "CALL",
    expiry: "27 Feb 2026", strikePrice: 3900, ltp: 62.30,
    change: -18.50, changePercent: -22.89, oi: "12.8L", oiChange: "+3.2L",
    volume: "5.4L", iv: 18.5, signal: "SELL", lotSize: 175, lots: 1,
    confidence: 71, reason: "CALL writing at 3900 strike. Resistance expected near earnings.",
  },
  {
    id: "f6", symbol: "TATAMOTORS", name: "Tata Motors Ltd", type: "CALL",
    expiry: "27 Feb 2026", strikePrice: 960, ltp: 24.70,
    change: 8.90, changePercent: 56.33, oi: "28.5L", oiChange: "+6.8L",
    volume: "14.2L", iv: 32.1, signal: "BUY", lotSize: 575, lots: 3,
    confidence: 86, reason: "OI addition with price surge. Short covering rally expected above 960.",
  },
  {
    id: "f7", symbol: "HDFCBANK", name: "HDFC Bank Ltd", type: "FUTURE",
    expiry: "27 Feb 2026", strikePrice: 0, ltp: 1688.40,
    change: -5.20, changePercent: -0.31, oi: "44.2L", oiChange: "-2.1L",
    volume: "12.6L", iv: 0, signal: "HOLD", lotSize: 550, lots: 0,
    confidence: 52, reason: "Short covering with flat OI. No directional conviction in futures.",
  },
  {
    id: "f8", symbol: "BANKNIFTY", name: "Bank NIFTY Index", type: "CALL",
    expiry: "27 Feb 2026", strikePrice: 47500, ltp: 215.60,
    change: 52.30, changePercent: 32.03, oi: "62.1L", oiChange: "+9.4L",
    volume: "28.9L", iv: 17.2, signal: "BUY", lotSize: 15, lots: 3,
    confidence: 83, reason: "Aggressive CALL buying at 47500. Breakout momentum building.",
  },
];

export const mockIPOs: IPOListing[] = [
  {
    id: "ipo1", company: "Hexaware Technologies Ltd", symbol: "HEXAWARE",
    priceRange: "₹674 - ₹708", issueSize: "₹8,750 Cr", lotSize: 21,
    openDate: "12 Feb 2026", closeDate: "14 Feb 2026", listingDate: "19 Feb 2026",
    status: "LISTED", gmp: 42, subscription: "26.5x",
    rating: "SUBSCRIBE", sector: "IT Services", type: "MAINBOARD",
  },
  {
    id: "ipo2", company: "Ather Energy Pvt Ltd", symbol: "ATHER",
    priceRange: "₹304 - ₹321", issueSize: "₹3,100 Cr", lotSize: 46,
    openDate: "25 Feb 2026", closeDate: "27 Feb 2026", listingDate: "04 Mar 2026",
    status: "OPEN", gmp: 65, subscription: "8.2x",
    rating: "SUBSCRIBE", sector: "Electric Vehicles", type: "MAINBOARD",
  },
  {
    id: "ipo3", company: "Zepto Quick Commerce", symbol: "ZEPTO",
    priceRange: "₹450 - ₹480", issueSize: "₹5,500 Cr", lotSize: 31,
    openDate: "05 Mar 2026", closeDate: "07 Mar 2026", listingDate: "12 Mar 2026",
    status: "UPCOMING", gmp: 85, subscription: "-",
    rating: "SUBSCRIBE", sector: "E-Commerce", type: "MAINBOARD",
  },
  {
    id: "ipo4", company: "PhysicsWallah Ltd", symbol: "PW",
    priceRange: "₹280 - ₹295", issueSize: "₹2,800 Cr", lotSize: 50,
    openDate: "10 Mar 2026", closeDate: "12 Mar 2026", listingDate: "17 Mar 2026",
    status: "UPCOMING", gmp: 30, subscription: "-",
    rating: "NEUTRAL", sector: "EdTech", type: "MAINBOARD",
  },
  {
    id: "ipo5", company: "Swiggy Instamart Foods", symbol: "SWIGGYF",
    priceRange: "₹120 - ₹135", issueSize: "₹420 Cr", lotSize: 110,
    openDate: "20 Feb 2026", closeDate: "22 Feb 2026", listingDate: "27 Feb 2026",
    status: "CLOSED", gmp: -8, subscription: "1.4x",
    rating: "AVOID", sector: "Food & Beverages", type: "SME",
  },
  {
    id: "ipo6", company: "Lenskart Solutions Ltd", symbol: "LENSKART",
    priceRange: "₹820 - ₹860", issueSize: "₹4,200 Cr", lotSize: 17,
    openDate: "15 Mar 2026", closeDate: "17 Mar 2026", listingDate: "22 Mar 2026",
    status: "UPCOMING", gmp: 110, subscription: "-",
    rating: "SUBSCRIBE", sector: "Retail / D2C", type: "MAINBOARD",
  },
];
