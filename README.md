# BizPlan Asistent — Univerzitet FINRA

Vodič i kreator za razvoj biznis planova (Savremeni Menadžment i Digitalno Poslovanje).

14-step wizard: osnovne informacije → strategija → SWOT → operacije → finansijski planovi (4a–4i) → sažetak.

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Otvori URL koji Vite ispiše (obično `http://localhost:5173`).

```bash
npm run build
npm start
```

Production preview lokalno (koristi `PORT`, default `3000`).

## Deploy na Railway

1. Pushaj repo na GitHub
2. Na [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Railway automatski koristi `railway.toml`:
   - **Build:** `npm run build`
   - **Start:** `npm start` (`server.js` na `0.0.0.0:$PORT`)
4. (Opcionalno) Generate Domain u Settings → Networking

Nema dodatnih env varijabli — samo `PORT` koji Railway postavlja sam.

## Funkcije

- 14 koraka vodica s validacijom i progress barom
- Random fill (test) — automatski popuni polja
- PDF export — pravi `.pdf` fajl (jsPDF + html2canvas)
- Tabovi: O kreatorima, Informacije, Zašto biznis plan?, Literatura, Primjeri, Vodič & Kreator

## Struktura

- `src/App.jsx` — cijela aplikacija
- `server.js` — production static server (Railway)
- `railway.toml` — Railway build/start konfiguracija
- Nema backend API-ja: sve radi u browseru
