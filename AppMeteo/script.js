document.addEventListener("DOMContentLoaded", () => {
    
    // Selezione degli elementi dal DOM
    const searchBtn = document.getElementById("search-btn");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const weatherInfo = document.getElementById("weather-info");
    const localBtn = document.getElementById("local-btn");

    // Funzione per ottenere una descrizione del meteo in base al codice
    function getWeatherDescription(code) {
        if (code === 0) return "☀️ Sereno";
        if (code >= 1 && code <= 3) return "🌤️ Parzialmente nuvoloso";
        if (code >= 45 && code <= 48) return "🌫️ Nebbia";
        if (code >= 51 && code <= 67) return "🌦️ Pioggia debole";
        if (code >= 71 && code <= 77) return "❄️ Neve";
        if (code >= 80 && code <= 82) return "🌧️ Pioggia intensa";
        if (code >= 95 && code <= 99) return "⛈️ Temporale";
        return "Non disponibile";
    }

    // Evento per il bottone "Cerca"
    searchBtn.addEventListener("click", async () => {


        const latitude = latitudeInput.value.trim();
        const longitude = longitudeInput.value.trim();

        if (!latitude || !longitude) {
            alert("Inserisci entrambi i valori di latitudine e longitudine.");
            return;
        }

        try {
       
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            
            if (!response.ok) {
                throw new Error("Errore nel recupero dei dati meteo.");
            }

         
            const data = await response.json();


            const { temperature, windspeed, winddirection, weathercode } = data.current_weather;

            // Pulizia del contenuto precedente
            weatherInfo.innerHTML = "";

            // Creazione e inserimento dei nuovi elementi
            const tempElement = document.createElement("p");
            tempElement.textContent = `Temperatura: ${temperature}°C`;

            const windElement = document.createElement("p");
            windElement.textContent = `Vento: ${windspeed} km/h (${winddirection}°)`;

            const codeElement = document.createElement("p");
            codeElement.textContent = `Codice Meteo: ${weathercode}`;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = `Meteo: ${getWeatherDescription(weathercode)}`;

            weatherInfo.appendChild(tempElement);
            weatherInfo.appendChild(windElement);
            weatherInfo.appendChild(codeElement);
            weatherInfo.appendChild(descriptionElement);

        } catch (error) {
            console.error("Errore:", error.message);
            alert("Non è stato possibile recuperare i dati meteo.");
        }
    });

    // Evento per il bottone "Posizione Locale"
    localBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lon = position.coords.longitude.toFixed(4);
                    latitudeInput.value = lat;
                    longitudeInput.value = lon;
                    searchBtn.click(); // Simulazione click per recuperare i dati
                },
                (error) => {
                    alert("Errore nel recupero della posizione.");
                    console.error(error);
                }
            );
        } else {
            alert("Geolocalizzazione non supportata nel tuo browser.");
        }
    });
});
