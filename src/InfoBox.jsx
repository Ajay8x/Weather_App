import './InfoBox.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




export default function InfoBox(info) {


    const INIT_URL = "https://images.unsplash.com/photo-1722858343990-1604f540c15d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const HOT_URL = "https://images.unsplash.com/photo-1593705528563-c193527ea423?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1bW1lciUyMHN1bnxlbnwwfHwwfHx8MA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ";
    const RAIN_URL = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN4bDYzMmNqd3h4YTFwY3U0eGhiZHJ3aXgyODRrenJwNjE3ZWE1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRbNFMuFt5Zm372/giphy.gif";





    let weatherInfo = info.info;

    return (
        <div className="InfoBox">
            <div className="cardContainer">

                <Card className="weatherCard">
                    <CardMedia
                        className="cardImage"
                        image={
                            weatherInfo.temperature > 25
                                ? HOT_URL
                                : weatherInfo.temperature < 15
                                    ? COLD_URL
                                    : weatherInfo.weatherType === "Rain"
                                        ? RAIN_URL
                                        : INIT_URL
                        }
                    />

                    <CardContent>
                        <Typography variant="h5" className="cityTitle">
                            {weatherInfo.city}
                        </Typography>

                        <div
                            className="weatherDetails"
                            style={{

                                boxShadow: "1 8px 32px rgba(0, 0, 0, 0.3)",

                            }}
                        >
                            <p className="info"><b>📍 City:</b> {weatherInfo.city}, {weatherInfo.country}</p>
                            <p className="info"><b>🌡 Temperature:</b> {weatherInfo.temperature} °C</p>
                            <p className="info"><b>💧 Humidity:</b> {weatherInfo.humidity}%</p>
                            <p className="info">
                                <b>🌬 Wind:</b> {(weatherInfo.windSpeed * 3.6).toFixed(2)} km/h
                            </p>
                            <p className="info"><b>🔽 Pressure:</b> {weatherInfo.pressure} hPa</p>
                            <p className="info"><b>☁ Weather:</b> {weatherInfo.weatherType}</p>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}