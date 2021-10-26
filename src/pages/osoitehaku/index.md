# Osoitehaku


## Lähdeaineistot

Digitransit-osoitehaku käyttää seuraavia lähdeaineistoja:
- Avoin OpenStreetMap-aineisto, jota käyttäjät voivat ylläpitää ja täydentää itse
- Digi- ja väestötietoviraston tuottama rakennusten osoitetietokanta
- Maanmittauslaitoksen paikkatietokanta
- Kaupunkien tuottamat GTFS-pysäkkitietoainestot


## Hakuperusteet

Osoitehaku palauttaa kohteita ensisijaisesti sen perusteella, kuinka hyvin kohteen ominaisuustiedot täsmäävät
käyttäjän syöttämästä merkkijonosta tulkittuihin tietoihin. Kohteen laadulla, koolla tai suosiolla on vain
vähäinen merkitys. Esimerkiksi haku 'Linnamäki' palauttaa joukon kohteita, joiden nimi on täsmälleen hakutermi.
Suosittu Helsingin Linnanmäki ei mahdu hakutuloksiin.

Haku on jossain määrin 'sumea', eli se osaa palauttaa kohteita, joiden nimi tai muut tiedot eivät täysin täsmää
hakutermin kanssa. Näin tapahtuu silloin, kun riittävää määrää täysin täsmääviä kohteita ei löydy. Hakutermin
kirjainten painoarvo vähenee loppua kohden: haku 'Nappi' palauttaa ehdotuksen 'Nappila', mutta ei ehdotusta 'Lappi'.


## Hakutermin tulkinta

Osoitehaku käyttää esimerkkiaineistolla opetettua keinoälyalgoritmia tulkitsemaan käyttäjän syöttämän merkkijonon
jäsennellyksi tiedoksi. Menetelmä toimii varsin hyvin, kun kyseessä on merkittävä tai tunnettu kohde.
Esimerkiksi haut 'Hämeentie 5, Helsinki' ja sama ilman pilkkua 'Hämeentie 5 Helsinki' tulkitaan molemmat seuraavasti:
- Katu = Hämeentie
- Osoitenumero = 5
- Kaupunki = Helsinki

Pienillä kohteilla, kuten 'Mäkitie 1 Kuru' keinoälyjäsennys ei toimi yhtä luotettavasti. Tällöin erotinmerkki auttaa
jäsentämään tiedot oikein. Täysin jäsentämättömät haut toimivat yleensä huonosti, sillä haku saattaa päätyä
vertailemaan kadunnimeä kaupungin nimen kanssa.


## Hakutulosten järjestys

Digitransit-reittioppaan käyttöliittymä hakee tyypillisesti 20 ehdotusta osoitehaussa.
Usein lähdeaineistosta löytyy tätä enemmän hakutermiä hyvin vastaavia kohteita.
Kohteiden järjestäminen paremmuusjärjestykseen ratkaisee, mitkä ehdotuksista päätyvät
käyttäjälle esitettyyn tuloslistaan. Yhtä hyvin täsmäävät kohteet järjestetään tällöin
seuraavien sääntöjen mukaisesti, tässä esitetyssä sääntöjärjestyksessä:

1. Kohteen tyyppi seuraavassa tärkeysjärjestyksessä:
maakunta, kunta/kaupunki, postitoimialue, asema, katu/tie, katuosoite, paikka, pysäkki, kaupunginosa.
Esimerkki: Haku 'Jämsä' palauttaa Jämsän kaupungin ennen Jämsän kylää Mikkelissä.

2. Lähdeaineisto. Aineistot ovat muutoin samanarvoisia, mutta OpenStreetMap priorisoidaan muiden edelle.

3. Kohteen tunnettuus/suosio. Tämä tieto on käytettävissä vain osalla aineistoista ja kohdetyypeistä.
Esimerkiksi OpenStreetMap-aineiston julkisen liikenteen terminaaleille ja asemille annetaan korkea
suosioarvo. Vähäpätöisen rakennuksen (vaja, autotalli tms) osoitetieto saa taas pienen suosioarvon.

4. Etäisyys hakijan sijainnista. Reittiopaspalveluissa on mahdollisesti käytössä hakua tekevän henkilön
paikannustieto. Lähellä olevat kohteet tulkitaan tällöin paremmiksi kuin kaukaiset kohteet.
Esimerkki: haku 'R-kioski' palauttaa lähimmän kioskin ensimmäisenä.

5. Aakkosjärjestys kohteen kuntanimen mukaan. Haku 'Polvikatu' palauttaa Polvikatu, Lahti
ennen kohdetta Polvikatu, Tampere.

6. Osoitenumeron poikkeama haetusta, mikäli kyseessä on katuosoitehaku. Haku 'Mikonkatu 5'
palauttaa lähiosoitteet järjestyksessä Mikonkatu 5, Mikonkatu 4, Mikonkatu 6, Mikonkatu 3,
Mikonkatu 7, Mikonkatu 2, Mikonkatu 8.


## Liikennepoliittiset painotukset ja käyttöliittymän vaikutukset

Yllä esitetyt periaatteet kuvaavat haun toiminnan digitransit-palvelurajapintojen kautta.
Digitransit-reittioppaan verkkosivuilta tehdyssä osoitehaussa on kuitenkin huomioitava seuraavat
seikat, jotka vaikuttavat hakutuloksiin:

**Liikennepoliittiset painotukset** <br>
Koska kyseessä on julkisen liikenteen reitityspalvelu, asema- ja terminaalityyppisiä kohteita suositaan
5%. Pysäkkien pisteytystä taas lasketaan 5%, koska niillä on toistuvanimisinä taipumus täyttää hakulistan
koko alkuosa. Lisäksi matkustaja ei yleensä ole menossa pysäkille, vaan se on pelkkä välietappi matkalla.

**Vanhat haut ja suosikit**<br>
Aiemmin suoritettuja hakuja ja käyttäjän lisäämiä suosikkeja suositaan hiukan. On huomattava, että
kyseiset kohteet eivät ole suoraan vertailukelpoisia osoitehaun löytämien kohteiden kanssa, koska
suosikit ja vanhat haut ladataan selaimen paikallismuistista, eikä niille muodostu yhdenmukaista
pisteytystä osoitehaun kanssa.
