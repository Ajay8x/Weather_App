import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState , useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function SearchBox({ updateInfo }) {

    const [city, setCity] = useState("mirzapur");
    const [error, setError] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    // WEATHER FETCH
    const getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        let jsonResponse = await response.json();

        if (!jsonResponse.list) throw new Error("City not found");

        return {
            temperature: jsonResponse.list[0].main.temp,
            humidity: jsonResponse.list[0].main.humidity,
            weatherType: jsonResponse.list[0].weather[0].main,
            city: jsonResponse.city.name,
            country: jsonResponse.city.country,
            windSpeed: jsonResponse.list[0].wind.speed,
            pressure: jsonResponse.list[0].main.pressure
        };
    };

    // INPUT CHANGE + SUGGESTIONS
    const handleChange = async (evt) => {
        let value = evt.target.value;
        setCity(value);

        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            let res = await fetch(
              `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
            );
            let data = await res.json();
            setSuggestions(data);
        } catch {
            setSuggestions([]);
        }
    };

    // CLICK SUGGESTION
    const handleSuggestionClick = (place) => {
        setCity(`${place.name},${place.country}`);
        setSuggestions([]);
    };

    // SUBMIT SEARCH
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setSuggestions([]);
        } catch {
            setError(true);
        }
    };

    // DEFAULT CITY LOAD
    useEffect(() => {
        (async () => {
            try {
                let newInfo = await getWeatherInfo();
                updateInfo(newInfo);
            } catch {
                setError(true);
            }
        })();
    }, []);

    return (
        <div className="search-box">

            <form onSubmit={handleSubmit}>
                <TextField
                    label="City, Country Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    fullWidth
                />

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div className="suggestions">
                        {suggestions.map((place, i) => (
                            <div
                                key={i}
                                className="suggestionItem"
                                onClick={() => handleSuggestionClick(place)}
                            >
                                {place.name}, {place.state ? place.state + ", " : ""}{place.country}
                            </div>
                        ))}
                    </div>
                )}

                <br /><br />
                <Button variant="contained" type="submit">Search</Button>

                {/* ERROR ALERT */}
                <Snackbar
                    open={error}
                    autoHideDuration={2000}
                    onClose={() => setError(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error">
                        <center>
                            <p>City not found! enter a valid city name.</p>
                            <p>शहर नहीं मिला! कृपया एक वैध शहर का नाम दर्ज करें</p>
                        </center>
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
}