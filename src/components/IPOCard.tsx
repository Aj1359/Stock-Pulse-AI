import { Calendar, TrendingUp, TrendingDown, Users, Tag } from "lucide-react";
import type { IPOListing } from "@/data/stockData";

interface IPOCardProps {
  ipo: IPOListing;
}

const IPOCard = ({ ipo }: IPOCardProps) => {
  const statusConfig = {
    UPCOMING: "bg-hold/10 text-hold border-hold/30",
    OPEN: "bg-buy/10 text-buy border-buy/30",
    CLOSED: "bg-muted text-muted-foreground border-border",
    LISTED: "bg-primary/10 text-primary border-primary/30",
  };

  const ratingConfig = {
    SUBSCRIBE: { class: "signal-buy", label: "✅ Subscribe" },
    AVOID: { class: "signal-sell", label: "❌ Avoid" },
    NEUTRAL: { class: "signal-hold", label: "⚠️ Neutral" },
  };

  const gmpPositive = ipo.gmp >= 0;

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all duration-300 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold truncate">{ipo.company}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono shrink-0 ${statusConfig[ipo.status]}`}>
              {ipo.status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-mono">
              {ipo.type}
            </span>
            <span className="text-xs text-muted-foreground">{ipo.sector}</span>
          </div>
        </div>
      </div>

      {/* Price & GMP */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-[11px] text-muted-foreground mb-0.5">Price Band</p>
          <span className="text-lg font-bold font-mono">{ipo.priceRange}</span>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground mb-0.5">GMP</p>
          <span className={`text-lg font-bold font-mono ${gmpPositive ? "text-buy" : "text-sell"}`}>
            {gmpPositive ? "+" : ""}₹{ipo.gmp}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className={`mb-3 px-3 py-2 rounded-lg border text-center text-sm font-bold ${ratingConfig[ipo.rating].class}`}>
        {ratingConfig[ipo.rating].label}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Issue Size:</span>
          <span className="font-mono font-medium">{ipo.issueSize}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Lot:</span>
          <span className="font-mono font-medium">{ipo.lotSize} shares</span>
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-1.5 text-[11px] border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" /> Open
          </span>
          <span className="font-mono">{ipo.openDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" /> Close
          </span>
          <span className="font-mono">{ipo.closeDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" /> Listing
          </span>
          <span className="font-mono">{ipo.listingDate}</span>
        </div>
      </div>

      {/* Subscription */}
      {ipo.subscription !== "-" && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Subscription</span>
            <span className="font-bold font-mono text-primary">{ipo.subscription}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPOCard;
