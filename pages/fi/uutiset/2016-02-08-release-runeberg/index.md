---
title: Uusi Digitransit-julkaisu – "Runeberg"
date: "8.2.2016"
image: "release-runeberg-itinerary-page.png"
---

Tänään julkaistussa versiossa uutta:

1. Parannettu reittisivu
2. Peruttujen lähtojen esittäminen
3. Ajoneuvojen liikkumissuunta selviää ajoneuvon "hännästä"
4. Palautekysely
5. Muita parannuksia

## Parannettu reittisivu
Reittisivun kartta ei ole enää omalla alasivullaan, vaan näyttää reitin alun yläreunassa. Reittiä voi selata kartalla joko yläreunan pienessä näkymässä, tai suurentaa koko ruudun kokoiseksi kartan alanurkasta. Lipun ostolle varatun tilan sijaan reittiselostuksen yläpuolella näytetään nyt matkan kesto ja kävelyn määrä.

![Uusi reitin sivu](release-runeberg-itinerary-page.png "Uusi reitin sivu")

Tiedossa olevia bugeja:
- Reittien swipe aiheuttaa käyttöliittymässä turhaa "liukumista joka suuntaan"
- Kartan positiointi klikkaamalla ei toimi kaikissa tilanteissa oikein

## Peruttujen lähtöjen esittäminen
Peruutukset näkyvät pysäkkien tiedoissa.

![Peruttuja junia](release-runeberg-canceled.png "Peruttuja junavuoroja")


## Ajoneuvojen liikkumissuunta
Raideliikenteellä on pienet "hännät" merkkinä ajoneuvon suunnasta. Busseille häntää ei vielä valitettavasti piirretä, koska niiden sijaintitieto tulee pelkkänä paikkana ilman suuntaa.

![Ratikoiden häntiä](release-runeberg-tails.png "Ratikoiden häntiä")

## Palautekysely
Seurataksemme kehitystämme, käyttöliittymä kysyy ajoittain palautetta.

![Palautteen antaminen](release-runeberg-feedback.png "Palautteen antaminen")

## Muita parannuksia
iOS-käyttäjät voivat huomata listojen selauksen toimivan nyt myös sujuvammin; selaus ei enää pysähdy kuin seinään sormen noustessa näytöltä.

Pinnan alla käyttöliittymää on saatu hieman nopeammaksi poistamalla turhia verkkopyyntöjä, kansallisen version (beta.digitransit.fi) reitin hakuaikaa on pidennetty parempien tuloksien saamiseksi, ja pääsivusto (digitransit.fi) on saanut uutta sisältöä ja käännöksen englanniksi. Myös paikkojen hakua paranneltiin, ja bugeja korjailtiin.

Toissaviikolla HSL:llä oli reilu  kymmenen talon ulkopuolista testaajaa kokeilemassa uutta reittiopasta ja antamassa palautetta. Kiitos heille!

## Kokeile uusia ominaisuuksia
- HSL alue: http://matka.hsl.fi/
- Suomi: http://beta.digitransit.fi/

## Seuraava julkaisu
Seuraavan 2 viikon ajan keskitymme pääosin parantamaan etusivua:
- Pysäkit alatabi poistuu; Jatkossa tabeja on kaksi: "lähelläsi" ja "suosikit"
- "Lähelläsi" täbi on jalostettu versio nykyisestä "linjat" tabista
- "Suosikit" toteutetaan uutena ominaisuutena
- Haku kehittyy paremmaksi

Tarkempi suunnitelma: https://digitransit.atlassian.net/issues/?filter=10300
