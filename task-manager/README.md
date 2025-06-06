#Task Manager

Un'applicazione web semplice e intuitiva per gestire le tue attività quotidiane. Puoi aggiungere, modificare, eliminare, cercare e trascinare le attività tra le colonne **Da fare**, **In corso** e **Completata**.



## Funzionalità

-  Aggiunta di nuove attività
-  Modifica del nome con doppio click
-  Eliminazione delle attività
-  Ricerca per nome
-  Filtro per stato (Da fare, In corso, Completata)
-  Drag and drop tra colonne
-  Tutto gestito in locale (nessun database)

## Documentazione tecnica

### File principali

- `index.html`: contiene la struttura dell'interfaccia utente divisa in:
  - **Header** con titolo
  - **Input Group** per inserire nuove task
  - **Filter Group** per filtrare e cercare
  - **Task Columns** per visualizzare le attività in base allo stato

- `style.css`: definisce lo stile per:
  - Layout responsive
  - Colonne delle attività
  - Input, pulsanti e stato delle attività

- `script.js`: contiene la logica interattiva del task manager:
  - Gestione dello stato delle attività
  - Eventi per inserimento, ricerca, filtro, drag-and-drop

---

### Struttura dati

Ogni attività è un oggetto con le seguenti proprietà:

```js
{
  id: "timestamp-univoco",
  name: "Titolo della task",
  status: "todo" | "inprogress" | "done"
}
