import { Search } from "lucide-react";

export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="flex justify-center gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Enter city name…"
        className="px-5 py-3 rounded-2xl w-64 text-sm outline-none
          bg-white/10 border border-white/20 text-white placeholder-sky-200/40
          focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 rounded-2xl text-sm font-bold
          bg-sky-400 hover:bg-sky-300 text-slate-900
          transition-all hover:-translate-y-0.5 active:translate-y-0"
      >
        <Search color="#ffffff" />
      </button>
    </div>
  );
}