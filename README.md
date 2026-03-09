Laboration 5

Länk till min publicerade sida:

https://labb-3.onrender.com/

I den här uppgiften har jag skapat två sidor under flikarna "Karta" och "Diagram, som hämtar och presenterar data på två olika sätt.

Detta har jag gjort:

Hämtat och sorterat statistik: Jag har skrivit en funktion som hämtar aktuell utbildningsstatistik från en extern JSON-fil med hjälp av fetch. Jag har sedan filtrerat och sorterat ut de mest sökta kurserna och programmen för att få fram rätt data.

"Redovisat" med diagram: För att göra siffrorna lättare att förstå har jag använt biblioteket Chart.js. Jag har skapat ett stapeldiagram för kurser och ett cirkeldiagram för program, där jag kopplat JavaScript-koden till <canvas>-element i min HTML.

Skapat en interaktiv karta: Jag har byggt en sökfunktion där användaren kan skriva in en plats. Genom att skicka sökordet till Nominatim API hämtar jag koordinater (latitud och longitud) som jag sedan använder för att uppdatera min karta.

Dokumentation: Jag har använt JSDoc för att dokumentera mina funktioner.

Laboration 3 och 4

(Laboration 3)
I denna laboration har jag fokuserat på att lära mig SASS:

Exempel på saker jag gjort:

Använt @use för att dela upp koden i bland annat \_base.scss, \_layout.scss och \_animations.scss.
Använt %card-style och %button-style för att återanvända kod på ett effektivt sätt.
Skapat egna mixins för att hantera bilder och logik för t.ex. runda hörn.
Lagrat färger och typsnitt i variabler

(Laboration 4)
Jag har skapat tre olika typer av animationer:

Rörliga objekt: En Minion-bild som rör sig i ett svävande mönster med hjälp av @keyframes och transform: translate.

Bildanimation (Hover): Fotogalleriet använder transform: scale och transition för att skapa en mjuk inzoomningseffekt när användaren håller musen över bilderna.

Användarinteraktion: En "Konfetti-knapp" som triggar ett konfettiregn. Detta är byggt med JavaScript som kommunicerar med biblioteket canvas-confetti.
