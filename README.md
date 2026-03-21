Om detta projekt

Länk till hemsida: https://projektuppgift-frontend.onrender.com/index.html

Välkommen till Receptinspo – din digitala guide till smartare bakning och matlagning!

Den här webbapplikationen skapade jag med mig själv i åtanke. Jag älskar att baka men gillar också att ha lite koll på vad jag stoppar i mig. Med denna webbapplikation kan man söka både på recept men samtidigt också få näringsvärde uppladdat samtidigt.

Hur fungerar det?
Receptinspo är en så kallad Mashup-applikation. Det betyder att den automatiskt hämtar information från två olika källor på internet och sammanfogar dem till en helt ny tjänst:

Recepten: Hämtas live från Spoonacular API, en av världens största databaser för recept och matlagning.
Näringen: Varje gång du gör en sökning skickas receptets titel vidare till API Ninjas Nutrition. Där analyseras innehållet för att ge dig realtidsinformation om fett, kolhydrater och socker. Dessvärre saknar gratisversionen hos detta API kalorier och protein - vilket är något jag gärna hade haft med.
Tekniken bakom
Sidan är byggd med moderna verktyg för att säkerställa hög prestanda och en bra användarupplevelse:

Genom att använda SASS/SCSS har jag skapat en responsiv design som fungerar lika bra på mobilen som på datorn. All logik bygger på asynkron JavaScript för att hämta data snabbt utan att sidan behöver laddas om, och projektet är optimerat med Vite och Node.js.
