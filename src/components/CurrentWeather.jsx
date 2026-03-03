export default function CurrentWeather({ data }) {
  return (
    <div className="mt-8 flex flex-col items-center animate-fade-up">
      {/* Icon */}
      <div className="relative w-24 h-24 mb-1">
        <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-xl" />
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(56,189,248,0.5)]"
        />
      </div>

      {/* Temperature */}
      <div className="text-8xl font-extrabold tracking-tighter text-white leading-none">
        {Math.round(data.main.temp)}
        <sup className="text-3xl font-normal text-sky-300 align-super">°C</sup>
      </div>

      {/* Description */}
      <p className="mt-2 text-sky-400 capitalize tracking-widest text-sm">
        {data.weather[0].description}
      </p>

      {/* Meta strip */}
      <div className="flex gap-8 mt-6 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="text-center">
          <p className="text-xs text-sky-300/70 uppercase tracking-widest mb-1">Humidity</p>
          <p className="text-lg font-bold text-white">{data.main.humidity}%</p>
        </div>
        <div className="w-px bg-white/10" />
        <div className="text-center">
          <p className="text-xs text-sky-300/70 uppercase tracking-widest mb-1">Wind</p>
          <p className="text-lg font-bold text-white">{data.wind.speed} m/s</p>
        </div>
        <div className="w-px bg-white/10" />
        <div className="text-center">
          <p className="text-xs text-sky-300/70 uppercase tracking-widest mb-1">Feels like</p>
          <p className="text-lg font-bold text-white">{Math.round(data.main.feels_like)}°</p>
        </div>
      </div>
    </div>
  );
}