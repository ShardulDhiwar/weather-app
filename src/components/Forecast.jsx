import { Droplet, Wind } from "lucide-react";
export default function Forecast({ forecast }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-8">
      {forecast.map((day, i) => (
        <div
          key={i}
          className="flex flex-col items-center p-4 rounded-2xl
            bg-white/5 border border-white/10
            hover:bg-sky-400/10 hover:border-sky-400/30
            hover:-translate-y-1 transition-all duration-200 cursor-default"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300/70 mb-2">
            {day.day}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
            className="w-12 h-12 object-contain drop-shadow-[0_2px_8px_rgba(56,189,248,0.4)]"
          />
          <p className="text-2xl font-extrabold text-white tracking-tight">
            {day.temp}<span className="text-sm font-normal text-sky-300">°C</span>
          </p>
          <p className="text-xs text-sky-400 capitalize text-center leading-tight mt-1 mb-3">
            {day.description}
          </p>
          <div className="text-xs text-sky-200/60 space-y-2 text-center">
  <p className="flex items-center justify-center gap-2">
    <Droplet size={18} className="text-white" />
    <span>{day.humidity}%</span>
  </p>

  <p className="flex items-center justify-center gap-2">
    <Wind size={18} className="text-white" />
    <span>{day.wind} m/s</span>
  </p>
</div>
        </div>
      ))}
    </div>
  );
}