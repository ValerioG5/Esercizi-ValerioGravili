# Cronometro Digitale

Un'applicazione web semplice per misurare il tempo in minuti, secondi e centesimi di secondo. Il cronometro permette di **avviare**, **fermare**, **resettare** il conteggio e **salvare i tempi di giro**.

---

## Funzionalità

- **Start:** Avvia il cronometro.
- **Stop:** Ferma il cronometro.
- **Reset:** Riporta il tempo a 00:00:00.
- **Giro:** Salva il tempo corrente come tempo di giro in una lista.

---

yaml
Copia
Modifica

---

## Dettagli Tecnici

### DOM Elements

- `display`: visualizza il tempo.
- `startBtn`, `stopBtn`, `resetBtn`, `lapBtn`: pulsanti per il controllo del cronometro.
- `lapsList`: lista che contiene i tempi di giro.

### Stato interno

```js
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let running = false;
I valori vengono aggiornati ogni 10 millisecondi usando setTimeout() in una funzione ricorsiva (startTimer).

Il tempo viene formattato con padStart(2, '0') per garantire sempre due cifre per ciascuna unità di tempo.

Comportamento dei pulsanti
Start: imposta running = true e avvia il ciclo startTimer().

Stop: imposta running = false e blocca il ciclo ricorsivo.

Reset: azzera tutte le variabili e aggiorna il display.

Giro: crea un nuovo <li> con il tempo attuale e lo aggiunge alla lista dei giri.

 Tecnologie Utilizzate
HTML5

CSS3

JavaScript puro (vanilla JS)

