# Book Review 👏: frontend som visar böcker från Google books api samt visar recensioner från ett backend api 

Webbsidan hämtar data från det backend api som jag skapat här: https://github.com/CalleAlexanderson/dt210gProjektBackend

För att köra igång programmet kör 'npm run dev'.

Webbplatsen består av type-filer, context-filer, page-components och components, navigering på webbplatsen görs med react-router där Navlink används istället för a-element. 

## Undersidor

Webbsidans header och footer är komponenter där dessa element ligger, sidans navigering ligger i header komponenten. 

Webbsidan består av fyra undersidor (page-components): 

Startsida där det bara står välkommen till sidan.  

Sida där man loggar in, den skickas användaren till varje gång webbplatsen kollar om användaren är inloggad och inte är det. 

Sida där användaren kan söka på böcker som hämtats från Google books api, dessa skrivs ut genom map och en child-component där böckernas detaljer skickas med som props. 

Sida med detaljer om enskild bok, kommer hit genom att trycka på en bok på sidan där böckerna hämtas. Denna sida har en komponent där recensionerna ligger och i denna komponent ligger två komponenter varav ena är det formulär som lägger till en ny recension på boken och den andra är det formulär som används för att redigera samt den funktion som raderar recensionen. 
