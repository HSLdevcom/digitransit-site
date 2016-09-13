---
title: Liity
panels:
  - title: Liity Digitransit-palveluun
    body: Digitransit on HSL:n omistama ja kehittämä palvelukokonaisuus joukkoliikenteen reititystä varten. Digitransit-tuoteperhe on rakennettu HSl:n, Liikenneviraston ja LMJ Oy:n rahoituksella. Kuntien on mahdollista liittyä palveluun LMJ Oy:n kautta.
    links: []
    image: "/municipalities.svg"
    id: municipalities
    textColor: "black"
    swapped: true
---

## Liittymisprosessi

Toimita alla kuvatut tiedot digitransit@hsl.fi osoitteeseen. Mahdolliset kysymykset voi esittää Petro Tammiselle (HSL puh. (09) 4766 4444)

### 1. Sovi yhteistyöstä LMJ Oy:n kanssa

Sovi käyttöönotosta LMJ Oy:n kanssa.

### 2. Nimeä organisaatiosi palveluvastaava

Nimeä organisaatiostasi palveluvastaava. Hän vastaa Digitransit-palveluun liittyvästä operatiivisesta kommunikoinnista ja on kontaktoimamme henkilö ongelmatilanteissa.

### 3. Ilmoita palveluvastaavan yhteystiedot

Ilmoita palveluvastaavan:
- Nimi
- Sähköposti
- Puhelinnumero

### 4. Domain nimi

Liikenne Digitransit-palveluun on aina https-salattu. Voit valita vapaasti palvelusi domain-nimen (esim. https://reittiopas.kaupunki.fi), jolloin tarvitsemme TLS-sertifikaatin, joka sinun tulee hankkia. Voit myös käyttää https://kaupunki.digitransit.fi -osoitetta, jolloin erillista sertifikaattia ei tarvita. Kuvaa/toimita:
- Domain Nimi
- TLS sertifikaatti, mikäli haluat oman domain nimen

### 5. Reittidata

Digitransit-palvelu integroi reittidatasi GTFS-muodossa. Tiedot on mahdollista myös noutaa Waltti-järjestelmästä. Kuvaa:
- Web palvelun osoite, josta GTFS-paketti on saatavilla

Varmista, että GTFS-paketin data on kunnossa käyttämällä esimerikiksi Googlen GTFS-validaattoria:

- Lataa GTFS
- Lataa https://github.com/google/transitfeed/releases/latest ja pura
- Mene validaattorin kansioon ja aja `./feedvalidator.py -m <gtfs.zipin polku>`

### 6. Kulkumuodot

![](./images/kulkumuodot.png)

Määritä reittidatastasi löytyvät kulkumuodot. Valittujen kulkumuotojen perusteella käyttäjä voi rajata liikennetarjontaa. Kuvaa kullekin seuraavista kulkumuodoista onko sille tarvetta:
- Bussi
- Juna
- Metro
- Raitiovaunu
- Lentokone
- Lautta
- Kaupunkipyörä

### 7. Hakualue

![](./images/hakualue.png)

Määritä kartalta rajat osoitehaulle. Digitransit-palveluun konfiguroidaan suorakaiteen muotoinen alue, jonka sisältä käyttäjän syöttämiä osoitteita etsitään. Kuvaa:
- Piste vasemmaksi yläreunaksi WGS84 koordinaatteina
- Piste oikeaksi alareunaksi WGS84 koordinaatteina

### 8. Sosiaalinen media

Sosiaalisen median jakoja varten ilmoita:
- Twitter tili

### 9. Tietoja palvelusta

![](./images/tietoja-palvelusta.png)

Kuvaa Tietoja palvelusta sivun tiedot:
- Kuvaus suomeksi
- Kuvaus ruotsiksi
- Kuvaus englanniksi

Esimerkin vuoksi, HSL:n tietoja palvelusta:

*Tämän palvelun tarjoaa HSL joukkoliikenteen reittisuunnittelua varten Helsingin, Espoon, Vantaan, Kauniaisten, Keravan, Kirkkonummen ja Sipoon alueella. Palvelu kattaa joukkoliikenteen, kävelyn, pyöräilyn ja yksityisautoilun rajatuilta osin. Palvelu perustuu Digitransit palvelualustaan.*

### 10. Lähtöpaikan oletussijainti

![](./images/lahtopaikka.png)

Digitransit-käyttöliittymä yrittää aina paikantaa käyttäjän. Mikäli paikannus ei onnistu, valitaan lähtöpaikaksi määrittelemäsi piste. Kuvaa:
- Oletuslähtöpisteen koordinaatit

### 11. Teemoitus

![](./images/teema.png)

Digitransit käyttöliittymä on muokattavissa logon ja värimaailman osalta. Kuvaa/lähetä:
- Organisaatiosi värimaailma, esim. linkittämällä tyylioppaaseesi tai kertomalla web-osoite, josta värimaailma tulisi kopioida
- Organisaatiosi logo
- Etusivun yläreunan teksti, esim ."Reittiopas"

*Huom! Värimaailma, logo ja tekstit toteutetaan niiltä osin kuin se on mahdollista. Tämä voi tarkoittaa, ettei toiveitasi pystytä kaikilta osin täyttämään.*

### 12. Reaaliaikarajapinta

**Huom! Ominaisuus on saatavilla vain erikseen sopimalla**.

Digitransit alusta tukee reaaliaikaisia ajoneuvojen sijainteja, pysäkkiennusteita sekä poikkeustiedotteita. Kuvaa:
- Reaaliaikarajapinnan osoite
