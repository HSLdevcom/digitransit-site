---
title: Palvelut
panels: []
---

## Digitransit-palvelut

Digitransit-palvelukokonaisuuden tärkeimmät osat ovat:

1. Reititysmoottori
2. Osoitehaku
3. Taustakartat
4. Reittiopas-käyttöliittymä

Ensimmäiset kolme yllämainituista palveluista tarvitsevat lähdeaineiston, jonka tuottamiseksi palvelualustalle on rakennettu vastaavat datalatausprosessit.

GTFS- ja karttadatalla varustettu reititysmoottori OpenTripPlanner tarjoaa joukon matkasuunnitteluun liittyviä toimintoja,
kuten multimodaalinen ovelta ovelle reititys, pysäkki- ja linjahaut.

Pelias-osoitehakumoottorin avulla voidaan etsiä syötetyn merkkijonon paikkakoordinaatit, tai kysyä mikä paikka tai osoite on lähinnä annettua koordinaattia.

Taustakarttapalvelu tarjoaa karttatietoa rasteri- ja vektoritiilinä.

Reittiopas-käyttöliittymäpalvelu tarjoaa selainpohjaisen käyttöliittymän, jonka avulla alustan muita palveluja voidaan hyödyntää mm. tekemällä reittihakuja.

Näiden lisäksi Digitransit sisältää joukon erilaisia reaaliaikaa ja oheistietoa tarjoavia palveluja, jotka eivät ole välttämättömiä
reitityspalvelun käyttöönoton kannalta. Tarkempi kuvaus osapalveluista löytyy [kehittäjädokumentaatiosta](../en/developers/).



## Palveluiden käynnistys omassa ylläpidossa

Kaikki Digitransit-osapalvelut on pakattu valmiiksi Docker-konteiksi, joita pystyy varsin helposti ajamaan omalla palvelinalustalla.
Konttien toimintaa pystyy myös jossain määrin ohjaamaan ympäristömuuttujien avulla.

Helpoin ratkaisu on käyttää Digitransitin tuottamaa lähdedataa (OpenTripPlanner ja Pelias data kontit sekä hsl-map-server),
jolloin raskaita datalatausprosesseja ei tarvitse rakentaa. Rajoituksena on toki tällöin se, että tarjotun datan sisältö on sama kuin Digitransitissa.
Reititys ei onnistu kaupungissa, jonka GTFS dataa ei tunneta Digitransit-alustalla, eikä osoitehaku löydä kohteita Suomen rajojen ulkopuolelta.

Mikäli oma data on tarpeen jossakin osapalvelussa, Digitransitin datalatausprosessi on tarpeen kopioida ja muokata halutuksi.
Joiltakin osin tämä onnistu pelkillä ympäristömuuttujilla (esimerkiksi OpenTripPlanner datalataukseen voi lisätä uusia datalähteitä),
mutta yleisessä tapauksessa on tarpeen tehdä oma versio github/hsldevcom lähdekoodikirjastoista ja muokata niitä, tai rakentaa oma datapalvelu.

OpenTripPlanner-reitiyksen datalatauskonfiguraatio on varsin helppo muokata käyttämään omaa dataa. Konfiguraatiossa luetellaan verkko-osoitteet,
joista GTFS datapaketit haetaan, sekä OSM karttadatatiedostojen hakuosoite. Osoitelistan voi vaihtaa halutuksi.

Osoitehaun lähdeaineisto on määritelty joukolla skriptejä, jotka noutavat ja prosessoivat aineistopaketteja.
Näitäkin on varsin helppo lisätä, poistaa ja muuttaa. Yksittäisen aineiston indeksointi osoitetietokantaan tehdään räätälöidyllä
javascript-kirjastolla, esimerkiksi https://github.com/hsldevcom/pelias-gtfs. Datalatausjärjestelmään on sisäänrakennetty
hallinnollisen hierarkian lisääminen kohteisiin käyttämällä WhosOnFirst-palvelusta haettua Suomen aluejakoa. Tämä menetelmä pitää
korvata tai datasisältö vaihtaa Suomen rajojen ulkopuolella.

Taustakarttojen datalataus on vahvasti sidoksissa HSL:n tarjoamiin karttapalveluihin. Korvaava karttapalvelu on mahdollista luoda
[kehittäjädokumenttien ohjeiden](../en/developers/apis/4-map-api) mukaisesti.

On myös mahdollista ylläpitää vain osaa palveluista ja käyttää muilta osin Digitransitin rajapintoja; uusi Suomessa toimiva paikallinen reittiopas
voi helposti hyödyntää koko maan kattavaa osoitehakua.


Esimerkki oman reittiopaspalvelun käynnistämisestä hsl-reittioppaan datalla:

1. Asenna Docker palvelimelle

2. Käynnistä reititysmoottori:

```bash
docker run -d --rm  -p 9080:8080 -e ROUTER_NAME=hsl -e JAVA_OPTS=-Xmx4g -e ROUTER_DATA_CONTAINER_URL=https://api.digitransit.fi/routing-data/v2/hsl hsldevcom/opentripplanner:prod
```

Nyt reititystä palvellaan osoitteessa localhost:9080.

3. Käynnistä osoitedatan tietokantapalvelu:

```bash
docker run -d --rm --name pelias-data-container hsldevcom/pelias-data-container
```

4. Käynnistä osoitehakupalvelu:

```bash
docker run -d --rm --name pelias-api -p 3100:8080 --link pelias-data-container:pelias-data-container hsldevcom/pelias-api
```

Osoitehakua palvellaan osoitteessa localhost:3100. Avaa selain ja testaa haku: https://localhost:3100/v1/search?text=Helsinki

5. Käynnistä käyttöliittymäpalvelu:

```bash
docker run -d --rm  -p 8080:8080 -e OTP_URL=http://localhost:9080/otp/ -e CONFIG=hsl -e GEOCODING_BASE_URL=localhost:3100/v1 hsldevcom/digitransit-ui
```

Nyt voit selata osoitteeseen localhost:8080 ja alkaa käyttämään omaa yksityistä reittopaspalvelua, jonka taustakartat tulevat Digitransitista.


## Käyttöliittymän teemoitus

Reittioppaan oletusteema ei sisällä kaupunkikohtaisia piirteitä. Se on konfiguroitu koko Suomen datalle soveltuvilla asetuksilla.

Käyttöliittymä voidaan teemoittaa ja konfiguroida sopivaksi halutulle kohdealueelle luomalla uusi konfiguraatiotiedosto lähdekoodikirjaston
https://github.com/HSLdevcom/digitransit-ui `app/configurations` kansioon. Tarkemmat ohjeet löytyvät osoitteesta
https://github.com/HSLdevcom/digitransit-ui/blob/master/docs/Themes.md .


## Resurssitarpeet

Esimerkkejä:

- Reittihakumoottori (OpenTripPlanner) koko suomen datalla vaatii 12 GB keskusmuistia ja tehokkaan moniytimisen keskusyksikön
- Osoitehaku koko Suomen datalla vaatii 3 GB keskusmuistia api-palvelimelle (pelias-api) ja 4 GB keskusmuistia datahakupalvelulle (pelias-data-container).
Tehokas keskusyksikkö nopeuttaa palvelua.
- Taustakarttapalvelin (hsl-map-server) vaatii 4 GB keskusmuistia ja perustason keskusyksikön
- UI-palvelin tarvitsee 1 GB muistia ja perustason keskusyksikön

Näillä resursseilla pystyy palvelemaan useita samanaikaisia käyttäjiä lähes viiveettä. Kuorman kasvaessa on tarpeen ottaa käyttöön kuormantasausratkaisuja,
joilla kyselyt saadaan hajautettua usealle palvelimelle. Esimerkki: Digitransit palvelee Helsingin alueen väestöä runsaalla 20:llä
reititysmoottori-instanssilla.

Palvelukuormaa on mahdollista alentaa ja palvelun vasteaikaa parantaa erilaisilla välimuistiratkaisuilla (CDN, proxy caching).
Erityisesti taustakarttapalvelu hyötyy näistä.


## Palveluiden alueelliset ominaispiirteet

Digitransitin käyttämä versio OpenTripPlanner-reititysmoottorista on varsin geneerinen, eikä sisällä merkittäviä pelkästään Suomea koskevia muutoksia.
Joitakin erityispiirteitä, kuten paikallinen lippuhintalaskenta, voidaan aktivoida konfiguraation avulla.

Pelias-osoitehakua on kehitetty tukemaan monikielisiä hakuja ja skandinaavista merkistöä. Maakohtaiset erityispiirteet
on määritetty konfiguraatiotiedostossa.


## Linkkejä lähdekoodikirjastoihin

- [Reititysmoottori](https://github.com/HSLdevcom/OpenTripPlanner)
- [Reititysdatalataus](https://github.com/HSLdevcom/OpenTripPlanner-data-container)
- [Osoitehakupalvelu](https://github.com/HSLdevcom/pelias-api)
- [Osoitedatalataus](https://github.com/HSLdevcom/pelias-data-container)
- [Taustakarttapalvelu](https://github.com/HSLdevcom/hsl-map-server)
- [Web-käyttöliittymä](https://github.com/HSLdevcom/digitransit-ui)



