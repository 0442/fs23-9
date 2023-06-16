import axios from 'axios';
import React, { useEffect, useState } from 'react';

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

const NewEntryForm = ({ addNewEntry }: { addNewEntry: (newEntry: DiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notif, setNotif] = useState<string|null>(null);

  const showNotif = (message:string): void => {
    setNotif(message);
    setTimeout(() => {
      setNotif(null);
    }, 5000);
  };

  const submit = async (event: React.SyntheticEvent): Promise<void>=> {
    event.preventDefault()
    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', {
        date,
        visibility,
        weather,
        comment
      });
      addNewEntry(response.data)

    } catch(error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showNotif(error.response.data);
        }
      }
    }
  };

  return (
    <div>
      { notif && <p style={{color:'red'}}>{notif}</p> }
      <form onSubmit={submit}>
        <div>date:
          <input type="date" onChange={(e) => setDate(e.target.value)}/>
        </div>

        <div>visibility:
          <input type="radio" name="visibility" value="great" onChange={(e) => setVisibility(e.target.value)}/> great
          <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)}/> good
          <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)}/> ok
          <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)}/> poor
        </div>

        <div>weather:
          <input type="radio" name="weather" value="sunny" onChange={(e) => setWeather(e.target.value)}/> sunny
          <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)}/> rainy
          <input type="radio" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value)}/> cloudy
          <input type="radio" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value)}/> stormy
          <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)}/> windy
        </div>

        <div>comment:
          <input value={comment} onChange={(e) => setComment(e.target.value)}/>
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const appendEntry = (newEntry: DiaryEntry) => {
    setDiaries([...diaries, newEntry])
  }

  useEffect((): void => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
    .then((response) => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <NewEntryForm addNewEntry={appendEntry}/>
      <h2>Diary entries</h2>
      {diaries.map(d =>
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;
