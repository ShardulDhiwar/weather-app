# 🌤️ CloudPop — Weather App

A clean, modern weather app built with **React** + **Vite** + **Tailwind CSS**, powered by the OpenWeatherMap API. Get real-time weather conditions and a 5-day forecast for any city in the world.

---

## 📸 Preview

> _Add a screenshot here_

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Current weather — temperature, humidity, wind speed, feels like
- 📅 5-day forecast with daily averages
- 🔄 Seamless toggle between current weather and forecast views
- ⚠️ Error handling for invalid city names
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React + Vite | Frontend framework & build tool |
| Tailwind CSS | Styling |
| OpenWeatherMap API | Weather data |

---

## 🚀 Getting Started

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

> Get your free API key at [openweathermap.org](https://openweathermap.org/api)

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CurrentWeather.jsx
│   ├── Forecast.jsx
│   └── Searchbar.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_WEATHER_API_KEY` | Your OpenWeatherMap API key |

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---
