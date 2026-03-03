import { useState } from "react";
import SearchBar from "./components/Searchbar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { CloudSun } from "lucide-react";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isForecastView, setIsForecastView] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName, forecastOverride = isForecastView) => {
    try {
      setError("");
      setData(null);
      setForecastData([]);

      if (forecastOverride) {
        const res = await fetch(
          `${forecastApiUrl}?q=${cityName}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error("City not found");
        const result = await res.json();

        const grouped = {};
        result.list.forEach((item) => {
          const day = new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          });
          if (!grouped[day]) {
            grouped[day] = {
              temp: 0, humidity: 0, wind: 0, count: 0,
              icon: item.weather[0].icon,
              description: item.weather[0].description,
            };
          }
          grouped[day].temp += item.main.temp;
          grouped[day].humidity += item.main.humidity;
          grouped[day].wind += item.wind.speed;
          grouped[day].count++;
        });

        const formatted = Object.entries(grouped).map(([day, val]) => ({
          day,
          temp: Math.round(val.temp / val.count),
          humidity: Math.round(val.humidity / val.count),
          wind: (val.wind / val.count).toFixed(1),
          icon: val.icon,
          description: val.description,
        }));

        setForecastData(formatted);
      } else {
        const res = await fetch(
          `${weatherApiUrl}?q=${cityName}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error("City not found");
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex justify-center items-start px-4 py-12
      bg-[radial-gradient(ellipse_at_20%_0%,rgba(26,58,143,0.6)_0%,transparent_60%),radial-gradient(ellipse_at_80%_10%,rgba(79,195,247,0.15)_0%,transparent_50%)]">

      <div className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-2xl
        border border-white/10 rounded-3xl px-8 py-12 text-center shadow-2xl">

        {/* Header */}
        

        <div className="flex flex-col items-center mb-10">
  {/* Logo Icon */}
  <CloudSun size={48} className="text-sky-400 mb-4 drop-shadow-md animate-pulse" />

  {/* App Name */}
  <h1 className="text-3xl font-extrabold tracking-tight mb-1">
    Cloud<span className="text-sky-400">Pop</span>
  </h1>

  {/* Subtitle */}
  <p className="text-xs text-sky-300/60 uppercase tracking-[0.2em]">
    Real-time weather & forecasts
  </p>
</div>

        {/* Search */}
        <SearchBar city={city} setCity={setCity} onSearch={() => fetchWeather(city)} />

        {/* Toggle */}
        <button
          onClick={() => {
            const next = !isForecastView;
            setIsForecastView(next);
            setData(null);
            setForecastData([]);
            if (city.trim()) fetchWeather(city, next);
          }}
          className="mt-3 px-5 py-2 rounded-xl text-xs text-sky-300/70 border border-white/10
            hover:border-sky-400/40 hover:text-sky-400 hover:bg-sky-400/5 transition-all"
        >
          {isForecastView ? " Today's weather" : "Next 6-days forecast "}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 px-4 py-3 rounded-xl text-sm text-red-300
            bg-red-500/10 border border-red-500/20">
            ⚠ {error}
          </p>
        )}

        {/* Views */}
        {data && !isForecastView && <CurrentWeather data={data} />}
        {forecastData.length > 0 && isForecastView && <Forecast forecast={forecastData} />}
      </div>
    </div>
  );
}

export default App;