/**
 * Avvia lo script una volta che il DOM è completamente carico.
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Bottone per cercare il meteo con latitudine e longitudine.
     * @type {HTMLButtonElement}
     */
    const searchBtn = document.getElementById("search-btn");

    /**
     * Campo input per la latitudine.
     * @type {HTMLInputElement}
     */
    const latitudeInput = document.getElementById("latitude");

    /**
     * Campo input per la longitudine.
     * @type {HTMLInputElement}
     */
    const longitudeInput = document.getElementById("longitude");

    /**
     * Contenitore in cui vengono visualizzate le informazioni meteo.
     * @type {HTMLDivElement}
     */
    const weatherInfo = document.getElementById("weather-info");

    /**
     * Bottone per ottenere la posizione geografica dell’utente.
     * @type {HTMLButtonElement}
     */
    const localBtn = document.getElementById("local-btn");

    /**
     * Restituisce una descrizione testuale e un'emoji del meteo in base al codice fornito.
     *
     * @param {number} code - Il codice meteo secondo la specifica di Open-Meteo.
     * @returns {string} La descrizione del meteo con emoji.
     */
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

    /**
     * Evento click sul bottone di ricerca.
     * Recupera e visualizza le condizioni meteo attuali in base a latitudine e longitudine inserite.
     *
     * @async
     * @function
     */
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

            // Svuota il contenuto precedente
            weatherInfo.innerHTML = "";

            // Crea e mostra i nuovi dati
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

    /**
     * Evento click sul bottone "Posizione Locale".
     * Usa la geolocalizzazione per riempire i campi di latitudine e longitudine e avvia la ricerca.
     */
    localBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                /**
                 * Callback per posizione ottenuta con successo.
                 * @param {GeolocationPosition} position - Posizione restituita dall'API di geolocalizzazione.
                 */
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lon = position.coords.longitude.toFixed(4);
                    latitudeInput.value = lat;
                    longitudeInput.value = lon;
                    searchBtn.click(); // Avvia la ricerca meteo
                },
                /**
                 * Callback in caso di errore nella geolocalizzazione.
                 * @param {GeolocationPositionError} error - Oggetto errore.
                 */
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
