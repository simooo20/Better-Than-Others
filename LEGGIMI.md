# Better Than Others — landing del nuovo drop

Cartella pronta da mettere online. Dentro trovi:
- `index.html`: la pagina, con il modulo "Prenotati", la lista, Google Analytics e il Pixel di Meta.
- `assets/`: foto, video e logo.
- `apps-script.gs`: il codice che salva le prenotazioni in un Google Sheet.

Ci vogliono circa 25 minuti. Ogni prenotazione diventa una riga del foglio, che puoi aprire o scaricare in Excel (File › Scarica › .xlsx).

## 1. Il foglio che raccoglie i dati (5 min)
1. Crea un Google Sheet nuovo, per esempio "BTO new drop".
2. Apri Estensioni › Apps Script, cancella quello che c'è e incolla tutto `apps-script.gs`. Salva.
3. Clicca Esegui il deployment › Nuovo deployment. Come tipo scegli App web, poi:
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
4. Autorizza quando te lo chiede. Google mostra un avviso di app non verificata: clicca Avanzate › Vai al progetto.
5. Copia l'URL che finisce con `/exec`. Se lo apri nel browser e vedi "attivo", funziona.

## 2. Google Analytics 4 (5 min)
1. Vai su analytics.google.com › Amministrazione › Crea › Proprietà. Fuso orario Italia, valuta Euro.
2. Crea uno stream di dati Web con l'indirizzo del sito (anche quello di Netlify va bene).
3. Copia l'**ID di misurazione**, quello che inizia con `G-`.
4. Dopo i primi test: Amministrazione › Eventi, poi segna come **evento chiave** `generate_lead`, cioè la prenotazione, e anche `sign_up`, cioè l'iscrizione alla lista.

## 3. Il Pixel di Meta (5 min)
1. Vai su Meta Business › Gestione eventi › Collega origini dati › Web.
2. Crea il Pixel (Meta ora lo chiama "dataset") e copia l'ID, cioè il numero lungo.

## 4. Compila la configurazione
Apri `index.html` con un editor di testo (TextEdit in formato testo semplice, oppure VS Code). Vicino alla fine del file trovi:

```
var CONFIG = {
  SHEET_URL: '',       ← incolla l'URL /exec
  GA4_ID: '',          ← incolla l'ID G-...
  META_PIXEL_ID: '',   ← incolla l'ID del Pixel
```

Nella stessa pagina cerca `[NOME E COGNOME]` e `[EMAIL DI CONTATTO]` e sostituiscili con i tuoi dati: sono nella nota privacy, che si apre dal footer.

Se preferisci, mandami i tre valori e li inserisco io.

## 5. Mettila online (2 min)
1. Vai su app.netlify.com/drop e crea un account gratuito.
2. Trascina tutta la cartella `bto-landing` nella pagina.
3. Netlify ti dà un link del tipo `nome.netlify.app`. In Site settings puoi cambiare il nome o collegare un tuo dominio.

Per gli aggiornamenti successivi: Deploys › trascina di nuovo la cartella.

## 6. Prova prima di lanciare le campagne
1. Apri il sito, accetta i cookie e fai una prenotazione di prova: deve comparire una riga nel foglio.
2. Google Analytics: Rapporti › Tempo reale. Devi vedere la tua visita e l'evento `generate_lead`.
3. Meta: installa l'estensione Chrome "Meta Pixel Helper" e controlla che vedi PageView e, dopo la prenotazione, Lead. In Gestione eventi puoi usare anche "Testa eventi".
4. Cancella la riga di prova dal foglio.

## Cosa viene tracciato
Tutti gli eventi partono solo se la persona accetta i cookie.

| Cosa succede | Google Analytics | Meta |
|---|---|---|
| Apre la pagina | page_view (automatico) | PageView |
| Vede il prodotto o clicca un bottone "Prenotati" | view_item | ViewContent |
| Inizia a compilare: sceglie la taglia o clicca sull'email | form_start_prenotazione | FormStart |
| Sceglie la taglia | select_size (con la taglia) | SelectSize |
| Errore nel modulo (taglia, email, consenso) | form_error | — |
| **Invia la prenotazione** | **generate_lead** (49 €) | **Lead** (49 €): usalo come obiettivo della campagna |
| Si iscrive alla lista | sign_up | CompleteRegistration |
| Clicca Instagram / l'interruttore luce | click_instagram / light_toggle | InstagramClick / LightToggle |

Con questi eventi in GA4 puoi costruire un funnel (Esplora › Esplorazione della canalizzazione): view_item › form_start_prenotazione › generate_lead. Così vedi dove le persone si fermano.

## Link per le campagne
Aggiungi i parametri UTM ai link degli annunci. Li legge Google Analytics e finiscono anche nel foglio accanto a ogni prenotazione, così sai quale campagna porta le prenotazioni. Esempi:

```
https://tuosito.netlify.app/?utm_source=instagram&utm_medium=paid&utm_campaign=new-drop&utm_content=video-glow
https://tuosito.netlify.app/?utm_source=tiktok&utm_medium=organic&utm_campaign=new-drop
```

Su Meta Ads puoi metterli una volta sola, nel campo "Parametri URL" dell'annuncio:
`utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`

## Privacy, in breve
- Google Analytics e il Pixel partono solo se la persona clicca "Accetta" nel banner. Senza consenso il modulo funziona lo stesso: perdi solo i dati di tracciamento di quella persona, mentre la riga nel foglio arriva comunque.
- La casella del consenso è obbligatoria per prenotarsi, e la nota privacy dice chi raccoglie i dati e a cosa servono.
- Per un test basta questo. Quando apri la vendita vera, con una società e i pagamenti, servono una privacy policy completa, una cookie policy e i termini di vendita.
