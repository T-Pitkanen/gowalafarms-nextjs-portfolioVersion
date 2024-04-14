# Media College Viborg.

```
Author      : Media College Viborg.
Date        : 2024
Description : Project Bootstrapping.
```

## Kom igang

Dette projekt kræver at vi får installeret en ny database (**gowalfarms-exam-db**) i mongodb. 

Følg denne vejledning.

### 1. Installér Node Moduler 

```
npm install
```

### 2. Environment filer.

Først skal vi lave en kopi af indholdet fra filen `default.env` i `./documentation` mappen.
Opret to filer i roden af projektet, henholdsvis `.env` og `.env.local` og indsæt indholdet i begge filer.

### 3. Seed databasen.

Kør komanndoen (eller brug *npm scripts* i vs code)
```
npm run seed
```

### 4. Start udviklingens serveren.

Kør komando´en (eller brug *npm scripts*  i vs code)
```
npm run dev
```

### 5. Test data i Mongo Compass.

Åbn Compass og connet til din lokale instans. 

Nu skulle der gerne være en **gowalfarms-exam-db** database med følgende `collections`

* articles
* contacts
* employees
* faqs
* orders
* products
* services
* sponsors
* subscribers
* users

NB: *basket collection vil først komme hvis man gemmer en kurv på serveren.* 


### 6. Test endpoints via browser

kald urlen `http:localhost:3000/api/products` og resultatet skulle gerne være en liste af produkter.

### 6. Test endpoints via postman

Importér filen `MCDM - Gowalafarms.postman_collection.json` i `./documentation/postman` mappen.

### 6. Nu er projektet klar.

:bulb: En god ide vil være at få lagt projektet i git og på github med det samme.

Skulle du have problemer med at få etableret dette projekt, kontakt din underviser.

