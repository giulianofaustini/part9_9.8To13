import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface Diary {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [newDiary, setNewDiary] = useState<Diary[]>([]);

  const baseUrl = "http://localhost:3000/api/diaries";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setDiaries(response.data as Diary[]);
    });
  }, []);

  console.log(diaries);

  const handleAddNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const validateInputs = () => {
      if (date.length < 1) {
        alert("Date must be added");
        return false;
      }
      if (!["great", "good", "poor", "ok"].includes(visibility.toLowerCase())) {
        alert("Visibility must be great, good, poor, or ok");
        setVisibility("");
        return false;
      }
      if (
        !["sunny", "rainy", "cloudy", "stormy", "windy"].includes(
          weather.toLowerCase()
        )
      ) {
        alert("Weather must be sunny, rainy, cloudy, stormy, or windy");
        setWeather("");
        return false;
      }
      return true;
    };

    if (validateInputs()) {
      const diaryObject = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      };

      axios.post(baseUrl, diaryObject).then((response) => {
        setNewDiary([...diaries, response.data as Diary]);
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setNewDiary([]);

        axios.get(baseUrl).then((response) => {
          setDiaries(response.data as Diary[]);
        });
      });
    }
  };

  console.log(newDiary);

  const handleVisibilityChange = (value: string) => {
    setVisibility((prevVisibility) => (prevVisibility === value ? "" : value));
  };

  const handleWeatherChange = (value: string) => {
    setWeather((prevWeather) => (prevWeather === value ? "" : value));
  };

  return (
    <>
      <div>
        <h1>Ilari's Flight Record</h1>
        {diaries &&
          diaries.map((diary) => (
            <div key={diary.id}>
              <p>
                On day {diary.date} the visibility was {diary.visibility} as it
                was a {diary.weather} day. {diary.comment}{" "}
              </p>
            </div>
          ))}
      </div>
      <div>
        <h2> Add a new flight record</h2>
        <form onSubmit={handleAddNewDiary}>
          <div>
            <label htmlFor="date">Date</label>
            Date:{" "}
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <fieldset>
              Visibility:
              <input
                type="radio"
                id="great"
                name="visibility"
                checked={visibility === "great"}
                onChange={() => handleVisibilityChange("great")}
              />
              <label htmlFor="great">Great</label>
              <input
                type="radio"
                id="good"
                name="visibility"
                checked={visibility === "good"}
                onChange={() => handleVisibilityChange("good")}
              />
              <label htmlFor="good">Good</label>
              <input
                type="radio"
                id="poor"
                name="visibility"
                checked={visibility === "poor"}
                onChange={() => handleVisibilityChange("poor")}
              />
              <label htmlFor="poor">Poor</label>
              <input
                type="radio"
                id="ok"
                name="visibility"
                checked={visibility === "ok"}
                onChange={() => handleVisibilityChange("ok")}
              />
              <label htmlFor="ok">Ok</label>
            </fieldset>
          </div>
          <div>
            <fieldset>
              Weather:
              <input
                type="radio"
                id="sunny"
                checked={weather === "sunny"}
                value={weather}
                onChange={() => handleWeatherChange('sunny')}
              />
              <label htmlFor="sunny">Sunny</label>
              <input
                type="radio"
                id="rainy"
                checked={weather === "rainy"}
                value={weather}
                onChange={() => handleWeatherChange('rainy')}
              />
              <label htmlFor="rainy">Rainy</label>
              <input
                type="radio"
                id="cloudy"
                checked={weather === "cloudy"}
                value={weather}
                onChange={() => handleWeatherChange('cloudy')}
              />
              <label htmlFor="cloudy">Cloudy</label>
              <input
                type="radio"
                id="stormy"
                checked={weather === "stormy"}
                value={weather}
                onChange={() => handleWeatherChange('stormy')}
              />
              <label htmlFor="stormy">Stormy</label>
              <input
                type="radio"
                id="windy"
                checked={weather === "windy"}
                value={weather}
                onChange={() => handleWeatherChange('windy')}
              />
              <label htmlFor="windy">Windy</label>
            </fieldset>
          </div>
          <div>
            Comment:{" "}
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Add it</button>
        </form>
      </div>
    </>
  );
}

export default App;
