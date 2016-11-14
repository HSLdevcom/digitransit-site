# Kehityskohteiden roadmap

Tämä suunnitelma tarkentuu toteutuksen edetessä. Kehityskohteet ja toteutuksen ajankohta saattavat muuttua. Kehityskohteita ei ole tässä listassa esitetty tärkeysjärjestyksessä. 


###2017 tammikuun loppuun mennessä, tavoitteena on toteuttaa seuraavia toiminnallisuuksia:###

**Räätälöity Föli -versio**
Digitransit -palvelulla toteutte räätälöity Turun alueen reittiopas, Föli

**Desktop UI**
Käyttöliittymä pöytätietokoneiden ja tablettien selaimille

**Alueviestit**
Määriteltyyn alueeseen liittyvä viesti käyttöliittymässä, esim tieto lisäpalveluista kuten kutsuliikenteestä.

**Maksaminen**
Maksamiseen liittyy useita ominaisuuksia joista ensimmäisessä vaiheessa pyritään toteuttamaan:
- Liikennööitsijätieto
- Matkan hinta
- Linkitys ostamiseen
- Mobiililipun integrointi

**Kertakirjautuminen (SSO)**
Mahdollistaa henkilökohtaisten reititysasetusten tallentamisen palvelun tarjoajan asiakastiliin, esim HSL-tunnukseen.

**Hakutoiminnallisuus**
Hakukenttien käytettävyyden parantaminen

**Pieniä parannuksia mm. seuraaviin kohteisiin:**
- Reitityksen logiikka
- Tietoturvaominaisuudet
- Paikannuksen hyväksikäyttö ja osoitteiden haku (Geokoodaus)  
- Yleinen käytettävyys

**Bugikorjaukset**

**Palvelinympäristö**
Teknisen käyttöympäristön määrittely ja käyttöönotto

**Ohjelmointirajapinnat**
Avoimet API:t, joilla kolmannen osapuolen palveluiden kehittäjät voivat käyttää reititystä ja muita toiminnallisuuksia

**Tuotteenhallintamallin dokumentaatio, jossa kuvataan mm:**
- tehtävät, roolit ja päätöksenteon tasot
- asiakasvaatimusten ja bugien käsittelyprosessi
- kustannustenjaon yleiset periaatteet
- vastuunjako

###2017 ensimmäisen vuosipuoliskon tavoitteita:###

**Terminaalivälireititys**
Havainnollistaa palvelutasoa. Esitetään liikenteen solmukohtien välisiä yhteyksiä (myös vaihdollisia) aikataulumuodossa. Demo osoitteessa http://beta.liikennevirasto.fi/joukkoliikenne/aikataulut/otp/cached.html

**Virtuaalimonitori**
Mahdollisuus tuottaa käyttöliittymällä pysäkki- ja terminaalimonitorin tyyppisiä näkymiä. Auttaa matkustajaa saamaan tiedon silloin kun ei vielä olla tarpeeksi lähellä terminaalinäyttöä tai näyttöjen vikatilanteissa. 

**Tulostaminen**
Reittiehdotuksen tulostusmahdollisuus. Tarvitaan erityisesti avustettuun käyttöön, esim palvelupisteissä.

**--Maksaminen--**
Maksamiseen liittyy useita ominaisuuksia. Osa tästä työstä on aiemmin tehtyjen ominaisuuksia laajennuksia.
- HSL mobiililipun integrointi

**Automaattinen datan päivitys**
Kerran vuorokaudessa automaattisesti tapahtuvan datapäivittämisen suunnittelu ja toteutus. Sisältää datan validoinnin ja mahdollisuuden palata nopeasti edelliseen dataan virheiden ilmetessä.

**API ominaisuudet**
Rajapintojen ominaisuuksien kehittäminen kolmansien tahojen tarpeita ja liikennekaaren vaatimuksia vastaavaksi.

**--SSO ja käyttäjätili--**
Kirjautumisominaisuuden luominen: Suosikkien tallentaminen. Vaatii yhteistyötä HSL:n asiakasrekisterityön kanssa.

**Käytettävyys**
Tuotantoon vieminen tulee tuottamaan suuren määrän parannusehdotuksia käyttöliittymään ja toiminnalisuuksiin. 

**Matka-aikakartta**
Valtakunnallinen matka-aikakartta, jolla voi tarkastella matka-aikoja eri sijainneissa ja eri matkustusmuotojen välillä. Korvaa myös HSL:n nykyisen matka-aikakartan http://mak.hsl.fi

**Ylläpitäjän reititysasetukset**
Luodaan erillinen näkymä, jossa ylläpitäjät/asiakasvastaavat voivat säätää kokonaisuuden kannalta parhaat oletusasetukset.

**HSL.fi käyttöliittymä**
Palveluversio, jossa Digitransit toiminnalisuus on yhdistetty HSL:n verkkopalveluihin.

**HSL sovellus**
Digitransit toiminnallisuuksien sovittaminen HSL:n mobiilisovellukseen

**Pyöräilyominaisuuksien parantaminen**

**Bugikorjaukset**
