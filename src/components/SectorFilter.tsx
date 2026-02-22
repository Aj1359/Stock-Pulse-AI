import { sectors, type Sector } from "@/data/stockData";

interface SectorFilterProps {
  active: Sector | "ALL";
  onChange: (sector: Sector | "ALL") => void;
}

const SectorFilter = ({ active, onChange }: SectorFilterProps) => {
  return (
    <div className="flex gap-1.5 flex-wrap">
      <button
        onClick={() => onChange("ALL")}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
          active === "ALL"
            ? "bg-primary/15 text-primary border-primary/30"
            : "bg-secondary text-muted-foreground border-transparent hover:border-border"
        }`}
      >
        All Sectors
      </button>
      {sectors.map((s) => (
        <button
          key={s.value}
          onClick={() => onChange(s.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
            active === s.value
              ? "bg-primary/15 text-primary border-primary/30"
              : "bg-secondary text-muted-foreground border-transparent hover:border-border"
          }`}
        >
          {s.icon} {s.label}
        </button>
      ))}
    </div>
  );
};

export default SectorFilter;
