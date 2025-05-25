# 🌤️ App Meteo - Visualizzatore delle condizioni meteo attuali

## Scopo del progetto

Questa applicazione consente di ottenere in tempo reale le condizioni meteo (temperatura, vento e stato del cielo) per una qualunque posizione geografica, inserendo **latitudine e longitudine**, oppure usando la **geolocalizzazione automatica** del dispositivo.

L'app sfrutta le API fornite da [Open-Meteo](https://open-meteo.com/) per recuperare i dati meteo e visualizzarli in modo semplice e leggibile nel browser.

---

## Modalità di utilizzo

### 1. Inserimento manuale
- Inserisci i valori di **latitudine** e **longitudine** nei rispettivi campi di input.
- Premi il pulsante **"Cerca"** per ottenere i dati meteo del punto specificato.

### 2. Geolocalizzazione automatica
- Clicca su **"Posizione Locale"** per ottenere automaticamente le coordinate della tua posizione corrente (se il browser lo consente).
- I dati meteo verranno recuperati e mostrati automaticamente.

---

## Struttura del codice e logiche implementate

Il progetto è interamente scritto in **JavaScript vanilla** con un'interfaccia HTML minimale.

### File principali:
- `index.html`: struttura della pagina con input, pulsanti e un contenitore per i dati meteo.
- `script.js`: contiene tutta la logica JavaScript per gestire eventi, effettuare chiamate API e aggiornare il DOM.
- `style.css` *(opzionale)*: per migliorare l'aspetto grafico dell'app.

---

## Funzionalità implementate

### Recupero meteo tramite API
- Effettua una `fetch` asincrona alle API di Open-Meteo.
- Estrae i dati principali: **temperatura**, **velocità e direzione del vento**, **codice meteo**.
- Interpreta il codice meteo per fornire una **descrizione testuale ed emoticon** del tempo attuale.

### Validazione input
- Controlla che i campi di latitudine e longitudine non siano vuoti.

### Uso della Geolocalizzazione
- Ottiene automaticamente latitudine e longitudine usando `navigator.geolocation`.
- Converte i valori in massimo 4 decimali per precisione compatibile con l’API.

---

## Dettagli tecnici

### Esempio di chiamata API:

https://api.open-meteo.com/v1/forecast?latitude=45.4642&longitude=9.1900&current_weather=true


### Struttura dei dati ricevuti:
```json
{
  "latitude": 45.4642,
  "longitude": 9.19,
  "generationtime_ms": 0.22,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "current_weather": {
    "temperature": 18.4,
    "windspeed": 12.3,
    "winddirection": 135,
    "weathercode": 3,
    "time": "2025-05-25T10:00"
  }
}

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
