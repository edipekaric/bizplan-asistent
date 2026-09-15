import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const LANG_KEY = "bizplan-lang";

function getNested(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function interpolate(str, vars) {
  if (!vars || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

function translate(tree, key, vars) {
  const val = getNested(tree, key);
  if (val == null) return key;
  if (typeof val === "string") {
    return interpolate(val, { currency: tree.currency || "KM", ...vars });
  }
  return val;
}

const translations = {
  "bs": {
    "currency": "KM",
    "lang": {
      "bs": "Bosanski",
      "en": "English",
      "bsShort": "BOS",
      "enShort": "ENG",
      "label": "Jezik"
    },
    "header": {
      "brand": "BizPlan Asistent",
      "subtitle": "Univerzitet FINRA — Vodič za razvoj biznis planova"
    },
    "footer": {
      "text": "© 2026 Univerzitet FINRA — Savremeni Menadžment i Digitalno Poslovanje"
    },
    "tabs": {
      "kreatori": "O kreatorima",
      "info": "Informacije",
      "zasto": "Zašto biznis plan?",
      "literatura": "Literatura",
      "primjeri": "Primjeri",
      "vodic": "Vodič & Kreator"
    },
    "date": {
      "dd": "DD",
      "mm": "MM",
      "yyyy": "GGGG"
    },
    "kreatori": {
      "title": "Tim iza projekta",
      "intro": "Ovaj alat je kreiran na Univerzitetu FINRA u okviru programa Savremeni Menadžment i Digitalno Poslovanje, s ciljem da pomogne studentima i poduzetnicima u izradi kvalitetnih biznis planova.",
      "university": "Univerzitet FINRA",
      "roles": {
        "student": "Student",
        "asistent": "Asistent"
      },
      "programs": {
        "menadzment": "Savremeni Menadžment i Digitalno Poslovanje",
        "racunarstvo": "Računarstvo i informatika"
      }
    },
    "info": {
      "title": "O aplikaciji",
      "intro": "BizPlan Asistent je digitalni alat namijenjen studentima, srednjoškolcima i nezavisnim poduzetnicima koji žele naučiti kako kreirati kvalitetan biznis plan. Za razliku od postojećih rješenja privrednih komora i nevladinih organizacija, ovaj alat nudi potpuno digitalno iskustvo s automatskom provjerom podataka.",
      "features": [
        {
          "icon": "📝",
          "title": "Vodič korak po korak",
          "desc": "Strukturirani vodič koji vas vodi kroz svaki dio biznis plana uz objašnjenja i primjere."
        },
        {
          "icon": "📊",
          "title": "Integrisane finansijske tabele",
          "desc": "Plan prodaje, troškova, bilans stanja i uspjeha, amortizacija — sve na jednom mjestu."
        },
        {
          "icon": "✅",
          "title": "Automatski checker",
          "desc": "Sistem automatski provjerava da li vaši finansijski podaci imaju smisla i upozorava na greške."
        },
        {
          "icon": "📚",
          "title": "Edukativni materijali",
          "desc": "Pristup literaturi, prezentacijama i primjerima uspješnih biznis planova."
        }
      ],
      "audienceTitle": "Kome je namijenjena aplikacija?",
      "primaryLabel": "Primarna skupina:",
      "primaryText": "Studenti svih usmjerenja na kojima se radi biznis plan (Savremeni Menadžment, Digitalno Poslovanje, i dr.), studenti računarstva i informatike.",
      "secondaryLabel": "Sekundarna skupina:",
      "secondaryText": "Srednjoškolci, nezavisni poduzetnici / freelanceri, bilo ko ko želi naučiti izradu biznis plana."
    },
    "zasto": {
      "title": "Zašto je bitan biznis plan?",
      "sub": "Biznis plan nije samo akademski zadatak — to je vaš putokaz ka uspješnom poslovanju.",
      "reasons": [
        {
          "num": "01",
          "title": "Jasna vizija",
          "desc": "Biznis plan pomaže da jasno definirate svoju poslovnu ideju, viziju i misiju — temelj svakog uspješnog posla."
        },
        {
          "num": "02",
          "title": "Privlačenje investitora",
          "desc": "Investitori i banke zahtijevaju kvalitetan biznis plan kao preduvjet za finansiranje vašeg projekta."
        },
        {
          "num": "03",
          "title": "Analiza tržišta",
          "desc": "Kroz izradu biznis plana detaljno analizirate tržište, konkurenciju i ciljnu grupu kupaca."
        },
        {
          "num": "04",
          "title": "Finansijska projekcija",
          "desc": "Omogućava realan pregled prihoda, troškova i profitabilnosti."
        },
        {
          "num": "05",
          "title": "Smanjenje rizika",
          "desc": "SWOT analiza i detaljno planiranje pomažu identificirati rizike prije nego što postanu problemi."
        },
        {
          "num": "06",
          "title": "Operativni plan",
          "desc": "Definiše proizvodne procese, kanale distribucije, marketing strategiju i ključne partnere."
        }
      ]
    },
    "literatura": {
      "title": "Literatura",
      "sub": "Resursi koji će vam pomoći u izradi kvalitetnog biznis plana.",
      "access": "Pristup resursu →",
      "items": [
        {
          "title": "EBSCO baza podataka",
          "desc": "Pristup akademskim člancima o poduzetništvu i izradi biznis planova."
        },
        {
          "title": "Univerzitetska biblioteka FINRA",
          "desc": "Dostupna literatura iz oblasti menadžmenta i poslovnog planiranja."
        },
        {
          "title": "Akademski časopisi",
          "desc": "Recenzirani članci o poslovnom planiranju i strategijskom menadžmentu."
        }
      ]
    },
    "primjeri": {
      "title": "Primjeri biznis planova",
      "sub": "Pogledajte primjere kako bi trebao izgledati popunjen biznis plan.",
      "labels": {
        "vizijaMisija": "Vizija & Misija",
        "proizvod": "Proizvod / Usluga",
        "trziste": "Ciljno tržište"
      },
      "examples": [
        {
          "name": "EcoClean d.o.o.",
          "industry": "Usluge čišćenja",
          "desc": "Ekološka firma za čišćenje poslovnih prostora koristeći isključivo organske proizvode.",
          "vizija": "Postati vodeći pružalac ekoloških usluga čišćenja u BiH.",
          "misija": "Pružamo vrhunske usluge čišćenja uz očuvanje okoliša i zdravlja naših klijenata.",
          "proizvod": "Usluge profesionalnog čišćenja poslovnih i stambenih prostora sa 100% organskim sredstvima.",
          "trziste": "Poslovni subjekti u urbanim sredinama koji cijene ekološki pristup."
        },
        {
          "name": "TechBite",
          "industry": "IT / Software",
          "desc": "Startup za razvoj mobilnih aplikacija usmjerenih na mala i srednja preduzeća.",
          "vizija": "Digitalizovati mala preduzeća u regiji kroz pristupačna softverska rješenja.",
          "misija": "Kreiramo intuitivne mobilne aplikacije koje pomažu malim preduzećima da efikasnije posluju.",
          "proizvod": "Custom mobilne aplikacije, SaaS rješenja za upravljanje zalihama i CRM sistemi.",
          "trziste": "MSP sektor u BiH i regiji, posebno trgovine i ugostiteljski objekti."
        },
        {
          "name": "Zelena Livada",
          "industry": "Poljoprivreda",
          "desc": "Organska farma za proizvodnju povrća i voća sa direktnom prodajom potrošačima.",
          "vizija": "Biti prepoznat brend organske hrane u BiH.",
          "misija": "Proizvodimo zdravo, lokalno i organski certificirano povrće i voće.",
          "proizvod": "Organski certificirano povrće (paradajz, paprika, krastavci) i voće (jabuke, šljive).",
          "trziste": "Zdravstveno svjesni potrošači, restorani, i organske prodavnice."
        }
      ]
    },
    "steps": {
      "info": "Osnovne informacije",
      "strategija": "1. Ključna strategija",
      "resursi": "2. Resursi & SWOT",
      "operacije": "3. Operacije",
      "investicije": "4a. Finansijski plan: Izvori i upotreba kapitala",
      "bilans_poc": "4b. Finansijski plan: Bilans stanja i uspjeha",
      "plan_prodaje": "4c. Finansijski plan: Plan prodaje",
      "plan_troskova": "4d. Finansijski plan: Plan troškova",
      "amortizacija": "4e. Finansijski plan: Obračun Amortizacije",
      "kredit": "4f. Finansijski plan: Otplatni plan kredita",
      "normativi": "4g. Finansijski plan: Normativi i cijene sirovina",
      "bilans_uspjeha": "4h. Finansijski plan: Bilans uspjeha",
      "bilans_kraj": "4i. Bilans stanja (na kraju poslovne godine)",
      "sazetak": "Sažetak & Provjera"
    },
    "vodic": {
      "common": {
        "addRow": "Dodaj novi red",
        "deleteRow": "Obriši red",
        "total": "UKUPNO"
      },
      "nav": {
        "back": "← Nazad",
        "next": "Dalje →",
        "randomFill": "🎲 Automatski popuni random vrijednostima (test)",
        "randomFillTitle": "Testno dugme — popunjava trenutni korak nasumičnim vrijednostima"
      },
      "errors": {
        "naziv": "Naziv biznis plana nije unesen.",
        "vizija": "Vizija nije unesena.",
        "misija": "Misija nije unesena.",
        "proizvod": "Proizvod/Usluga nije opisana.",
        "trziste": "Ciljno tržište nije definirano.",
        "swot": "SWOT analiza nije potpuna — popunite sva 4 polja.",
        "sredstvaNula": "Ukupna sredstva (investicije) su 0 — unesite vrijednosti.",
        "izvoriNula": "Ukupni izvori sredstava su 0.",
        "neuravnotezeno": "Sredstva ({sredstva} {currency}) ≠ Izvori ({izvori} {currency}). Razlika: {diff} {currency}.",
        "prodajaPrazna": "Plan prodaje je prazan — unesite barem jedan proizvod/uslugu.",
        "troskoviPrazni": "Plan troškova je prazan.",
        "troskoviPreveliki": "Troškovi u {year}. su više od 3x veći od prihoda — provjerite podatke.",
        "odstupanje": "Proizvod \"{name}\": Mjesečni plan × 12 ({expected}) znatno odstupa od godišnjeg ({actual})."
      },
      "info": {
        "title": "Osnovne informacije",
        "sub": "Unesite osnovne podatke o vašem biznis planu.",
        "nazivLbl": "Naziv biznis plana",
        "nazivTip": "Naziv vaše kompanije ili poslovne ideje.",
        "nazivPh": "npr. EcoClean d.o.o.",
        "autoriLbl": "Autori",
        "autoriTip": "Imena autora biznis plana.",
        "autoriPh": "npr. Amina Serhatlic, Valdet Pestalic"
      },
      "strategija": {
        "title": "1. Ključna strategija",
        "sub": "Definirajte viziju, misiju, proizvod/uslugu, novu vrijednost i ciljno tržište.",
        "vizijaLbl": "Vizija",
        "vizijaTip": "Vizija opisuje dugoročnu sliku onoga što želite postići. Primjer: 'Postati vodeći pružalac ekoloških usluga čišćenja u BiH.'",
        "vizijaPh": "Šta je vaša dugoročna vizija?",
        "misijaLbl": "Misija",
        "misijaTip": "Misija opisuje svrhu vašeg poslovanja i kako planirate ostvariti viziju.",
        "misijaPh": "Koja je svrha vašeg poslovanja?",
        "proizvodLbl": "Proizvod / Usluga",
        "proizvodTip": "Detaljno opišite šta nudite tržištu — koji su vaši proizvodi ili usluge, koje probleme rješavaju.",
        "proizvodPh": "Opišite proizvode ili usluge...",
        "novaVrijednostLbl": "Nova vrijednost",
        "novaVrijednostTip": "Šta je osnov za razlikovanje od drugih na tržištu? Šta vas čini posebnima?",
        "novaVrijednostPh": "Šta vas razlikuje od konkurencije?",
        "trzisteLbl": "Ciljno tržište",
        "trzisteTip": "Definirajte ko su vaši kupci, segmentaciju tržišta i ciljnu grupu.",
        "trzistePh": "Ko su vaši kupci i ciljna grupa?"
      },
      "resursi": {
        "title": "2. Resursi & SWOT analiza",
        "sub": "Opišite resurse kojima raspolažete i napravite SWOT analizu.",
        "kompetencijeLbl": "Ključne kompetencije",
        "kompetencijeTip": "Resursi, znanja i vještine kojima raspolažete (tim, iskustvo, know-how).",
        "kompetencijePh": "Npr. Iskusan tim u oblasti IT-a...",
        "imovinaLbl": "Ključna imovina",
        "imovinaTip": "Materijalni i nematerijalni resursi: oprema, prostor, softver, patenti, itd.",
        "imovinaPh": "Npr. Poslovni prostor, oprema...",
        "swotTitle": "SWOT Analiza",
        "swot": {
          "snage": {
            "lbl": "Snage (S)",
            "tip": "Interne prednosti vašeg poslovanja."
          },
          "slabosti": {
            "lbl": "Slabosti (W)",
            "tip": "Interne slabosti koje treba poboljšati."
          },
          "mogucnosti": {
            "lbl": "Mogućnosti (O)",
            "tip": "Vanjske prilike koje možete iskoristiti."
          },
          "prijetnje": {
            "lbl": "Prijetnje (T)",
            "tip": "Vanjski faktori koji mogu ugroziti posao."
          }
        }
      },
      "operacije": {
        "title": "3. Operacije",
        "sub": "Opišite proizvodne procese, kanale distribucije i ključne partnere.",
        "proizvodnjaLbl": "Proizvodnja / Usluge",
        "proizvodnjaTip": "Opišite kako funkcioniše vaš proizvodni proces ili pružanje usluga.",
        "proizvodnjaPh": "Kako proizvodi nastaju ili kako se usluge pružaju?",
        "promocijaLbl": "Promocija & Kanali distribucije",
        "promocijaTip": "Kako ćete promovirati i distribuirati svoj proizvod/uslugu?",
        "promocijaPh": "Marketing strategija i kanali prodaje...",
        "partneriLbl": "Ključni partneri",
        "partneriTip": "Kupci, dobavljači, investitori i drugi važni partneri za vaše poslovanje.",
        "partneriPh": "Navedite ključne partnere..."
      },
      "investicije": {
        "title": "4a. Finansijski plan: Izvori i upotreba kapitala",
        "sub": "Unesite investicije u stalna i tekuća sredstva, izvore sredstava, te provjerite usklađenost.",
        "tableA": "A) Investicije (ulaganja) u stalna i tekuća sredstva",
        "tableB": "B) Izvori sredstava",
        "tableC": "C) Usklađivanje ulaganja i izvora sredstava",
        "thSredstva": "Sredstva",
        "thIznos": "Iznos u {currency}",
        "thNapomena": "Napomena",
        "thIzvori": "Izvori",
        "thElementi": "Elementi",
        "totalSredstva": "UKUPNO SREDSTVA (I + II)",
        "totalIzvori": "UKUPNO IZVORI SREDSTAVA (I + II)",
        "note": "* Sredstva moraju biti jednaka izvorima sredstava!",
        "badgeEmpty": "Unesite sredstva i izvore",
        "badgeOk": "Sredstva = Izvori ✓ Bilans je uravnotežen",
        "badgeDiff": "Razlika: {diff} {currency} — sredstva moraju biti jednaka izvorima!",
        "inv": {
          "stalna": "I STALNA SREDSTVA",
          "zemljiste": "1. Zemljište",
          "zgrade": "2. Zgrade",
          "oprema": "3. Oprema",
          "vozila": "4. Vozila",
          "inventar": "5. Poslovni inventar i ostala sredstva",
          "osnivacka": "6. Osnivačka ulaganja (d.o.o., d.d.)",
          "nematerijalna": "7. Nematerijalna sredstva",
          "tekuca": "II TEKUĆA SREDSTVA",
          "zalihe": "1. Zalihe",
          "potrazivanja": "2. Potraživanja",
          "gotovina": "3. Gotovina"
        },
        "izv": {
          "vlastiti": "I VLASTITI IZVORI",
          "novac": "1. Novac",
          "stvariPrava": "2. Stvari i prava:",
          "zemljiste": "    - zemljište",
          "gradevine": "    - građevine (poslovni prostor)",
          "oprema": "    - oprema",
          "ostalo": "    - ostalo",
          "krediti": "II KREDITI — TUĐI IZVORI",
          "dugorocni": "1. Dugoročni krediti",
          "kratkorocni": "2. Kratkoročni krediti",
          "ostaliTudi": "3. Ostali tuđi izvori (pozajmice)"
        },
        "usk": {
          "ulaganja": "I Ulaganja (sredstva)",
          "stalna": "1. Stalna sredstva",
          "tekuca": "2. Tekuća sredstva",
          "izvori": "II Izvori sredstava",
          "vlastita": "3. Vlastita sredstva",
          "tudja": "4. Tuđa sredstva",
          "razlika": "RAZLIKA (I − II)"
        }
      },
      "bilansPoc": {
        "title": "4b. Finansijski plan: Bilans stanja i uspjeha",
        "dateLabel": "POČETNI BILANS STANJA na dan",
        "dateHint": "(na početku poslovanja)"
      },
      "bilansKraj": {
        "title": "4i. Bilans stanja (na kraju poslovne godine)",
        "dateLabel": "BILANS STANJA na dan",
        "dateHint": "(na kraju poslovne godine)"
      },
      "bilans": {
        "thRb": "R/b",
        "thAktiva": "Aktiva",
        "thPasiva": "Pasiva",
        "thIznos": "Iznos u {currency}",
        "totalAktiva": "UKUPNO AKTIVA (A+B):",
        "totalPasiva": "UKUPNO PASIVA (A+B+C):",
        "badgeEmpty": "Unesite vrijednosti u bilans stanja",
        "badgeOk": "Bilans je uravnotežen (Aktiva = Pasiva) ✓",
        "badgeDiff": "Bilans NIJE uravnotežen! Aktiva ({aktiva}) ≠ Pasiva ({pasiva}). Razlika: {diff} {currency}",
        "sections": {
          "stalna": "A. STALNA SREDSTVA (1-3)",
          "kapital": "A. KAPITAL (1-2)",
          "tekuca": "B. TEKUĆA SREDSTVA (4-7)",
          "dugorocne": "B. DUGOROČNE OBAVEZE (3-4)",
          "kratkorocne": "C. KRATKOROČNE OBAVEZE (5-7)"
        },
        "a": {
          "nematerijalnaUlaganja": "Nematerijalna ulaganja",
          "materijalnaUlaganja": "Materijalna ulaganja:",
          "nematerijalnaSredstva": "Nematerijalna sredstva",
          "materijalnaSredstva": "Materijalna sredstva:",
          "zemljiste": "- Zemljište",
          "objekti": "- Objekti",
          "oprema": "- Oprema",
          "ostalaStalna": "Ostala stalna sredstva",
          "zalihe": "Zalihe",
          "potrazivanja": "Potraživanja od kupaca",
          "gotovina": "Gotovina",
          "novac": "Novac",
          "ostalaTekuca": "Ostala tekuća sredstva"
        },
        "p": {
          "vlastitiKapital": "Vlastiti kapital",
          "ostaloKapital": "Ostalo (grantovi, poticaji države)",
          "akumuliranaDobit": "Akumulirana dobit",
          "dugorocniKredit": "Dugoročni kredit",
          "ostaleDugorocne": "Ostale dugor. obaveze",
          "dobavljaci": "Dobavljači",
          "kratkorocniKrediti": "Kratkoročni krediti",
          "ostaleKratkorocne": "Ostale kratkor. obaveze"
        }
      },
      "planProdaje": {
        "title": "4c. Finansijski plan: Plan prodaje (2026–2030)",
        "sub": "Unesite planirane prihode po proizvodima/uslugama. Mjesečni plan × 12 bi trebao biti ≈ godišnji plan za 2026.",
        "thNum": "#",
        "thProizvod": "Proizvod/Usluga",
        "thCijena": "Cijena po proizvodu ({currency})",
        "thMjesecni": "Mjesečni plan 2026",
        "thGodisnji": "Godišnji plan {year}",
        "phNaziv": "Naziv",
        "badge": "{name}: Mj×12={expected}, God={actual}"
      },
      "planTroskova": {
        "title": "4d. Finansijski plan: Plan troškova (2026–2030)",
        "sub": "Unesite planirane troškove po kategorijama. Mjesečni × 12 treba odgovarati godišnjem nivou.",
        "thStruktura": "Struktura troškova",
        "colMonthly": "Mjesečni nivo za 2026.",
        "colAnnual": "Godišnji nivo za 2026.",
        "totalRow": "UKUPNO TROŠKOVI (1-5)",
        "badge": "Mj. ukupno ×12 = {expected} {currency}, God. ukupno = {actual} {currency}",
        "cat": {
          "sectionMaterijalni": "1. Materijalni troškovi",
          "sirovine": "Troškovi sirovina i repromaterijala",
          "zakup": "Troškovi zakupa",
          "energija": "Troškovi el. energije",
          "ostaliMat": "Ostali materijalni troškovi (voda, gorivo)",
          "sectionUsluge": "2. Troškovi usluga",
          "ptt": "PTT",
          "komunalne": "Komunalne usluge",
          "marketing": "Ostale neproizvodne usluge (marketing itd)",
          "sectionPlate": "3. Plate (bruto)",
          "netoPlate": "Neto plate",
          "porezi": "Porezi i doprinosi na plate",
          "kamate": "4. Kamate na kredite",
          "nvRobe": "5. NV prodate robe (za trgovačka preduzeća)"
        }
      },
      "amortizacija": {
        "title": "4e. Finansijski plan: Obračun Amortizacije",
        "sub": "Unesite stalna sredstva, nabavnu vrijednost i stopu amortizacije. Amortizacija se računa automatski (linearna metoda).",
        "thOpis": "Opis sredstva",
        "thNabavna": "Nabavna vrij. ({currency})",
        "thStopa": "Stopa (%)",
        "thUkupno": "UKUPNO",
        "phOpis": "npr. Računar",
        "note": "ℹ️ Stopa amortizacije se unosi kao procenat (npr. 20 za 20%). Pogledajte Zakon o porezu na dobit za propisane stope.",
        "legalTitle": "Zakonom propisane stope amortizacije — Član 19.",
        "legal1": "(1) Kod utvrđivanja porezne osnovice priznaje se obračunata amortizacija primjenom proporcionalne metode amortizacije na dugotrajnu imovinu na način propisan ovim člankom.",
        "legal2": "(2) Porezno priznate stope amortizacije dugotrajne imovine iznose:",
        "legal4": "(4) Ukoliko je nabavna cijena imovine manja od 1.000,00 {currency}, njezina nabavna vrijednost može se u cijelosti otpisati u godini u kojoj je ta imovina nabavljena.",
        "legal5": "(5) Dugotrajna imovina koja je u cijelosti otpisana, ali se i dalje vodi u evidencijama do momenta otuđenja ili uništavanja, ne može se ponovno procjenjivati i na nju obračunavati amortizacija i priznati u porezne svrhe.",
        "legalRows": [
          [
            "a)",
            "Građevinski objekti",
            "5%"
          ],
          [
            "b)",
            "Ceste, komunalni objekti, željeznica",
            "10%"
          ],
          [
            "c)",
            "Oprema, vozila, postrojenja",
            "15%"
          ],
          [
            "d)",
            "Oprema za vodoprivredne, vodovodne i kanalizacijske sustave",
            "15%"
          ],
          [
            "e)",
            "Hardver i softver i oprema za zaštitu okoliša",
            "33,3%"
          ],
          [
            "f)",
            "Višegodišnji zasadi",
            "15%"
          ],
          [
            "g)",
            "Osnovna stada",
            "40%"
          ],
          [
            "h)",
            "Nematerijalna imovina",
            "20%"
          ]
        ]
      },
      "kredit": {
        "title": "4f. Finansijski plan: Otplatni plan kredita",
        "initTitle": "Inicijalni podaci o pozajmici",
        "iznosLbl": "Iznos kredita ({currency})",
        "iznosTip": "Ukupan iznos pozajmice.",
        "kamataLbl": "Kamata (% godišnje)",
        "kamataTip": "Godišnja kamatna stopa, npr. 3.49%.",
        "rokLbl": "Rok otplate (mjeseci)",
        "rokTip": "Ukupan rok trajanja kredita u mjesecima, uključujući grace period.",
        "ucesceLbl": "Učešće ({currency})",
        "ucesceTip": "Iznos vlastitog učešća (umanjuje osnovicu kredita).",
        "graceLbl": "Grace period (mjeseci)",
        "graceTip": "Period u kojem se plaća samo kamata, bez glavnice.",
        "datumLbl": "Datum prve rate",
        "datumTip": "Datum kada počinje otplata (nakon grace perioda).",
        "calcTitle": "Preračuni",
        "osnovica": "Osnovica za kredit:",
        "graceKamata": "Kamata grace perioda:",
        "kamataUOtplati": "Kamata u otplati:",
        "ukupnaKamata": "Ukupna kamata:",
        "ukupnoZaduzenje": "Ukupno zaduženje:",
        "rataTitle": "Iznos rate",
        "graceRata": "Rata u grace periodu",
        "izracunataRata": "Izračunata rata",
        "planTitle": "OTPLATNI PLAN",
        "thBr": "BR.",
        "thDatum": "Datum rate",
        "thZaduzenje": "Početno zaduženje",
        "thKamata": "Platiti kamatu",
        "thGlavnica": "Platiti glavnicu",
        "thOstatak": "Ostatak zaduženja",
        "thKumKamata": "Kumulativna kamata"
      },
      "normativi": {
        "title": "4g. Finansijski plan: Normativi i cijene sirovina i materijala (za proizvodnu djelatnost)",
        "sub": "Unesite direktne sirovine i materijal potrebne za proizvodnju, jedinicu mjere, cijenu koštanja po jedinici mjere, nazive proizvoda, te potrebnu količinu (normativ) za svaki proizvod.",
        "thSirovine": "Direktne sirovine i materijal",
        "thJedMjere": "Jed. mjere",
        "thCijena": "Cijena koštanja po jedinici mjere ({currency})",
        "productNo": "Proizvod Br.{n}",
        "phProductName": "Naziv proizvoda",
        "deleteProduct": "Obriši proizvod",
        "addProduct": "Dodaj proizvod",
        "phSirovina": "npr. Brašno",
        "phJedMjere": "kg/l/kom",
        "totalRow": "UKUPNA CIJENA KOŠTANJA MATERIJALA PO PROIZVODU",
        "note": "ℹ️ Unesite naziv svakog proizvoda u zaglavlju tabele. Vrijednosti u kolonama predstavljaju normativ — potrebnu količinu date sirovine/materijala (u jedinici mjere) za proizvodnju jedne jedinice tog proizvoda. Ukupna cijena koštanja materijala po proizvodu se automatski izračunava kao zbir (cijena po jedinici × normativ) za sve sirovine. Dugme \"+\" u zaglavlju dodaje novi proizvod, a \"×\" ga uklanja."
      },
      "bilansUspjeha": {
        "title": "4h. Finansijski plan: Bilans uspjeha (2026–2030)",
        "sub": "Automatski generisan na osnovu plana prodaje i plana troškova. Unesite eventualne ostale prihode.",
        "ostaliPrihodiLbl": "Ostali prihodi po godinama (2026–2030)",
        "thElementi": "ELEMENTI",
        "rowPrihodi": "I. UKUPNI PRIHODI",
        "rowProdaja": "  1. Prihodi od prodaje",
        "rowOstali": "  2. Ostali prihodi",
        "rowRashodi": "II. UKUPNI RASHODI",
        "rowBruto": "III. BRUTO DOBIT (I−II)",
        "rowPorez": "  Porez na dobit (10%)",
        "rowNeto": "IV. NETO DOBIT",
        "profitable": "Profitabilno",
        "loss": "Gubitak",
        "badge": "{year}: {status} ({amount} {currency})"
      },
      "sazetak": {
        "title": "Sažetak & Završna provjera",
        "sub": "Pregledajte sve unose i pokrenite automatsku provjeru konzistentnosti podataka.",
        "runCheck": "▶ Pokreni automatsku provjeru",
        "problemsOne": "Pronađen {n} problem:",
        "problemsMany": "Pronađeno {n} problema:",
        "allOk": "✓ Sve provjere su prošle! Vaš biznis plan je konzistentan.",
        "sazetakLbl": "Sažetak finansijskog plana",
        "sazetakTip": "Napišite kratak rezime vašeg finansijskog plana po ključnim elementima.",
        "sazetakPh": "Rezime finansijskog plana: ukupna ulaganja, izvori finansiranja, očekivani prihodi, profitabilnost...",
        "pdfExport": "📄 Izvezi kompletan biznis plan u PDF",
        "pdfExporting": "⏳ Generišem PDF...",
        "pdfNote": "Preuzima se pravi PDF fajl (.pdf) sa kompletnim biznis planom.",
        "pdfError": "Greška pri generisanju PDF-a. Pokušajte ponovo.",
        "stats": {
          "ulaganja": "Ukupna ulaganja",
          "vlastiti": "Vlastiti kapital",
          "tudji": "Tuđi kapital",
          "prihodi": "Prihodi 2026",
          "troskovi": "Troškovi 2026",
          "neto": "Neto dobit 2026"
        }
      },
      "sample": {
        "companyNames": [
          "EcoNova d.o.o.",
          "TehnoPlus",
          "Zelena Budućnost",
          "UrbanCraft",
          "Digital Hub"
        ],
        "autori": "Amina Serhatlic, Valdet Pestalic",
        "vizija": "Postati prepoznatljiv i pouzdan brend na tržištu u narednih 5 godina.",
        "misija": "Pružamo kvalitetne proizvode/usluge uz fokus na zadovoljstvo kupaca i održivost.",
        "proizvod": "Proizvodnja i prodaja proizvoda/usluga prilagođenih potrebama savremenog tržišta.",
        "novaVrijednost": "Brža isporuka, bolja cijena i personaliziran pristup u odnosu na konkurenciju.",
        "ciljnoTrziste": "Urbani potrošači u dobi od 20 do 45 godina, srednjeg i visokog dohotka.",
        "kompetencije": "Iskusan tim sa višegodišnjim iskustvom u industriji i jakim stručnim znanjem.",
        "imovina": "Poslovni prostor, oprema, vozila i informatička infrastruktura.",
        "snage": "Iskusan tim, kvalitetan proizvod, jaka lokalna prepoznatljivost.",
        "slabosti": "Ograničen marketinški budžet, mala tržišna pokrivenost.",
        "mogucnosti": "Rastuće tržište, digitalizacija, nove tehnologije.",
        "prijetnje": "Jaka konkurencija, promjene propisa, rast cijena sirovina.",
        "proizvodnja": "Proizvodnja/usluga se odvija u vlastitom prostoru uz strogu kontrolu kvalitete.",
        "promocija": "Marketing putem društvenih mreža, lokalnih sajmova i preporuka kupaca.",
        "partneri": "Lokalni dobavljači sirovina, logistički partneri i finansijske institucije.",
        "product": "Proizvod {n}",
        "amortNames": [
          "Oprema",
          "Vozilo",
          "Računar i softver",
          "Poslovni prostor",
          "Namještaj",
          "Postrojenje"
        ],
        "sirovine": [
          "Brašno",
          "Šećer",
          "Ambalaža",
          "Boja",
          "Metal",
          "Tekstil",
          "Plastika"
        ],
        "jedMjere": [
          "kg",
          "l",
          "kom",
          "m"
        ],
        "sazetak": "Ukupna ulaganja finansirana su kombinacijom vlastitih i kreditnih sredstava. Projekcije pokazuju rast prihoda i profitabilnosti kroz sve godine planiranja."
      }
    },
    "pdf": {
      "docTitle": "BIZNIS PLAN — {name}",
      "untitled": "(bez naziva)",
      "fileFallback": "Biznis plan",
      "headerTitle": "BizPlan — {name}",
      "footer": "Univerzitet FINRA — BizPlan Asistent",
      "authors": "Autori",
      "university": "Univerzitet FINRA",
      "generated": "Datum generisanja",
      "s1": "1. Ključna strategija",
      "s2": "2. Resursi & SWOT analiza",
      "s3": "3. Operacije",
      "s4a": "4a. Finansijski plan: Izvori i upotreba kapitala",
      "s4b": "4b. Finansijski plan: Početni bilans stanja (na dan {date})",
      "s4c": "4c. Finansijski plan: Plan prodaje (2026–2030)",
      "s4d": "4d. Finansijski plan: Plan troškova (2026–2030)",
      "s4e": "4e. Finansijski plan: Obračun amortizacije",
      "s4f": "4f. Finansijski plan: Otplatni plan kredita",
      "s4g": "4g. Finansijski plan: Normativi i cijene sirovina i materijala",
      "s4h": "4h. Finansijski plan: Bilans uspjeha (2026–2030)",
      "s4i": "4i. Bilans stanja na kraju poslovne godine (na dan {date})",
      "sazetak": "Sažetak finansijskog plana",
      "vizija": "Vizija",
      "misija": "Misija",
      "proizvod": "Proizvod / Usluga",
      "novaVrijednost": "Nova vrijednost",
      "ciljnoTrziste": "Ciljno tržište",
      "kompetencije": "Ključne kompetencije",
      "imovina": "Ključna imovina",
      "snage": "Snage",
      "slabosti": "Slabosti",
      "mogucnosti": "Mogućnosti",
      "prijetnje": "Prijetnje",
      "proizvodnja": "Proizvodnja / Usluge",
      "promocija": "Promocija & Kanali distribucije",
      "partneri": "Ključni partneri",
      "thSredstva": "Sredstva",
      "thIznosKM": "Iznos u {currency}",
      "thIzvori": "Izvori",
      "stalnaSredstva": "I STALNA SREDSTVA",
      "tekucaSredstva": "II TEKUĆA SREDSTVA",
      "ukupnoSredstva": "UKUPNO SREDSTVA",
      "vlastitiIzvori": "I VLASTITI IZVORI",
      "kreditiTudi": "II KREDITI — TUĐI IZVORI",
      "ukupnoIzvori": "UKUPNO IZVORI",
      "thAktiva": "Aktiva",
      "thPasiva": "Pasiva",
      "thIznos": "Iznos {currency}",
      "ukupnoAktiva": "UKUPNO AKTIVA",
      "ukupnoPasiva": "UKUPNO PASIVA",
      "thNum": "#",
      "thProizvod": "Proizvod/Usluga",
      "thCijena": "Cijena ({currency})",
      "thMjPlan": "Mj. plan 2026",
      "thGod2026": "God. 2026",
      "ukupno": "UKUPNO",
      "thStruktura": "Struktura troškova",
      "ukupnoTroskovi": "UKUPNO TROŠKOVI (1-5)",
      "thOpis": "Opis sredstva",
      "thNabavna": "Nabavna vrij. ({currency})",
      "thStopa": "Stopa (%)",
      "thUkupnoCol": "Ukupno",
      "kreditNedefinisan": "Kredit nije definisan.",
      "kreditSummary": "Iznos kredita: {iznos} {currency} | Učešće: {ucesce} {currency} | Osnovica: {osnovica} {currency} | Kamata: {kamata}% godišnje",
      "kreditSummary2": "Rok otplate: {rok} mj. (grace {grace} mj.) | Datum prve rate: {datum}",
      "kreditSummary3": "Rata u grace periodu: {graceRata} {currency} | Izračunata rata: {rata} {currency}",
      "kreditSummary4": "Ukupna kamata: {kamata} {currency} | ",
      "kreditSummary5": "Ukupno zaduženje: {zaduzenje} {currency}",
      "thBr": "BR.",
      "thDatum": "Datum",
      "thZaduzenje": "Početno zaduženje",
      "thKamata": "Kamata",
      "thGlavnica": "Glavnica",
      "thOstatak": "Ostatak",
      "thKumKamata": "Kum. kamata",
      "thSirovina": "Sirovina/materijal",
      "thJedMjere": "Jed. mjere",
      "thCijenaJed": "Cijena/jed. ({currency})",
      "productNo": "Proizvod Br.{n}",
      "normativiTotal": "UKUPNA CIJENA KOŠTANJA MATERIJALA PO PROIZVODU",
      "thElementi": "Elementi",
      "rowPrihodi": "I. UKUPNI PRIHODI",
      "rowProdaja": "  1. Prihodi od prodaje",
      "rowOstali": "  2. Ostali prihodi",
      "rowRashodi": "II. UKUPNI RASHODI",
      "rowBruto": "III. BRUTO DOBIT (I-II)",
      "rowPorez": "  Porez na dobit (10%)",
      "rowNeto": "IV. NETO DOBIT",
      "inv": {
        "zemljiste": "Zemljište",
        "zgrade": "Zgrade",
        "oprema": "Oprema",
        "vozila": "Vozila",
        "inventar": "Poslovni inventar",
        "osnivacka": "Osnivačka ulaganja",
        "nematerijalna": "Nematerijalna sredstva",
        "zalihe": "Zalihe",
        "potrazivanja": "Potraživanja",
        "gotovina": "Gotovina"
      },
      "izv": {
        "novac": "Novac",
        "zemljiste": "Zemljište",
        "gradevine": "Građevine",
        "oprema": "Oprema",
        "ostalo": "Ostalo",
        "dugorocni": "Dugoročni krediti",
        "kratkorocni": "Kratkoročni krediti",
        "ostaliTudi": "Ostali tuđi izvori"
      },
      "bil": {
        "nematerijalnaUlaganja": "Nematerijalna ulaganja",
        "nematerijalnaSredstva": "Nematerijalna sredstva",
        "zemljiste": "Zemljište",
        "objekti": "Objekti",
        "oprema": "Oprema",
        "ostalaStalna": "Ostala stalna sredstva",
        "zalihe": "Zalihe",
        "potrazivanja": "Potraživanja",
        "gotovina": "Gotovina",
        "novac": "Novac",
        "ostalaTekuca": "Ostala tekuća sredstva",
        "vlastitiKapital": "Vlastiti kapital",
        "ostaloGrantovi": "Ostalo (grantovi)",
        "akumuliranaDobit": "Akumulirana dobit",
        "dugorocniKredit": "Dugoročni kredit",
        "ostaleDugorocne": "Ostale dugor. obaveze",
        "dobavljaci": "Dobavljači",
        "kratkorocniKrediti": "Kratkoročni krediti",
        "ostaleKratkorocne": "Ostale kratkor. obaveze"
      }
    }
  },
  "en": {
    "currency": "EUR",
    "lang": {
      "bs": "Bosnian",
      "en": "English",
      "bsShort": "BOS",
      "enShort": "ENG",
      "label": "Language"
    },
    "header": {
      "brand": "BizPlan Asistent",
      "subtitle": "FINRA University — Business plan development guide"
    },
    "footer": {
      "text": "© 2026 FINRA University — Contemporary Management and Digital Business"
    },
    "tabs": {
      "kreatori": "About creators",
      "info": "Information",
      "zasto": "Why a business plan?",
      "literatura": "Literature",
      "primjeri": "Examples",
      "vodic": "Guide & Builder"
    },
    "date": {
      "dd": "DD",
      "mm": "MM",
      "yyyy": "GGGG"
    },
    "kreatori": {
      "title": "Team behind the project",
      "intro": "This tool was created at FINRA University within the Contemporary Management and Digital Business program to help students and entrepreneurs create quality business plans.",
      "university": "Univerzitet FINRA",
      "roles": {
        "student": "Student",
        "asistent": "Assistant"
      },
      "programs": {
        "menadzment": "Contemporary Management and Digital Business",
        "racunarstvo": "Computer Science and Informatics"
      }
    },
    "info": {
      "title": "About the application",
      "intro": "BizPlan Asistent is a digital tool for students, high school students, and independent entrepreneurs who want to learn how to create a quality business plan. Unlike existing chamber of commerce and NGO solutions, this tool offers a fully digital experience with automatic data validation.",
      "features": [
        {
          "icon": "📝",
          "title": "Step-by-step guide",
          "desc": "A structured guide that walks you through every part of the business plan with explanations and examples."
        },
        {
          "icon": "📊",
          "title": "Integrated financial tables",
          "desc": "Sales plan, cost plan, balance sheet, income statement, depreciation — all in one place."
        },
        {
          "icon": "✅",
          "title": "Automatic checker",
          "desc": "The system automatically checks whether your financial data makes sense and warns about errors."
        },
        {
          "icon": "📚",
          "title": "Educational materials",
          "desc": "Access to literature, presentations, and examples of successful business plans."
        }
      ],
      "audienceTitle": "Who is this application for?",
      "primaryLabel": "Primary audience:",
      "primaryText": "Students in programs that include business plans (Contemporary Management, Digital Business, etc.) and computer science students.",
      "secondaryLabel": "Secondary audience:",
      "secondaryText": "High school students, independent entrepreneurs / freelancers, anyone who wants to learn business plan creation."
    },
    "zasto": {
      "title": "Why is a business plan important?",
      "sub": "A business plan is not just an academic assignment — it is your roadmap to successful business.",
      "reasons": [
        {
          "num": "01",
          "title": "Clear vision",
          "desc": "A business plan helps you clearly define your business idea, vision, and mission — the foundation of every successful business."
        },
        {
          "num": "02",
          "title": "Attracting investors",
          "desc": "Investors and banks require a quality business plan as a prerequisite for financing your project."
        },
        {
          "num": "03",
          "title": "Market analysis",
          "desc": "Creating a business plan helps you analyze the market, competition, and target customer group in detail."
        },
        {
          "num": "04",
          "title": "Financial projection",
          "desc": "Provides a realistic overview of revenue, costs, and profitability."
        },
        {
          "num": "05",
          "title": "Risk reduction",
          "desc": "SWOT analysis and detailed planning help identify risks before they become problems."
        },
        {
          "num": "06",
          "title": "Operational plan",
          "desc": "Defines production processes, distribution channels, marketing strategy, and key partners."
        }
      ]
    },
    "literatura": {
      "title": "Literature",
      "sub": "Resources to help you create a quality business plan.",
      "access": "Access resource →",
      "items": [
        {
          "title": "EBSCO database",
          "desc": "Access to academic articles on entrepreneurship and business plan creation."
        },
        {
          "title": "FINRA University library",
          "desc": "Available literature in management and business planning."
        },
        {
          "title": "Academic journals",
          "desc": "Peer-reviewed articles on business planning and strategic management."
        }
      ]
    },
    "primjeri": {
      "title": "Business plan examples",
      "sub": "See examples of what a completed business plan should look like.",
      "labels": {
        "vizijaMisija": "Vision & Mission",
        "proizvod": "Product / Service",
        "trziste": "Target market"
      },
      "examples": [
        {
          "name": "EcoClean d.o.o.",
          "industry": "Cleaning services",
          "desc": "Eco-friendly company for cleaning business premises using exclusively organic products.",
          "vizija": "Become the leading provider of eco cleaning services in BiH.",
          "misija": "We provide top-quality cleaning services while preserving the environment and our clients' health.",
          "proizvod": "Professional cleaning of business and residential premises with 100% organic products.",
          "trziste": "Business entities in urban areas that value an eco-friendly approach."
        },
        {
          "name": "TechBite",
          "industry": "IT / Software",
          "desc": "Startup developing mobile apps for small and medium enterprises.",
          "vizija": "Digitize small businesses in the region through affordable software solutions.",
          "misija": "We create intuitive mobile apps that help small businesses operate more efficiently.",
          "proizvod": "Custom mobile apps, SaaS inventory management, and CRM systems.",
          "trziste": "SME sector in BiH and the region, especially retail and hospitality."
        },
        {
          "name": "Zelena Livada",
          "industry": "Agriculture",
          "desc": "Organic farm producing vegetables and fruit with direct consumer sales.",
          "vizija": "Become a recognized organic food brand in BiH.",
          "misija": "We produce healthy, local, organically certified vegetables and fruit.",
          "proizvod": "Organically certified vegetables (tomatoes, peppers, cucumbers) and fruit (apples, plums).",
          "trziste": "Health-conscious consumers, restaurants, and organic stores."
        }
      ]
    },
    "steps": {
      "info": "Basic information",
      "strategija": "1. Key strategy",
      "resursi": "2. Resources & SWOT",
      "operacije": "3. Operations",
      "investicije": "4a. Financial plan: Sources and uses of capital",
      "bilans_poc": "4b. Financial plan: Balance sheet and income statement",
      "plan_prodaje": "4c. Financial plan: Sales plan",
      "plan_troskova": "4d. Financial plan: Cost plan",
      "amortizacija": "4e. Financial plan: Depreciation schedule",
      "kredit": "4f. Financial plan: Loan repayment schedule",
      "normativi": "4g. Financial plan: Material norms and prices",
      "bilans_uspjeha": "4h. Financial plan: Income statement",
      "bilans_kraj": "4i. Balance sheet (at year-end)",
      "sazetak": "Summary & check"
    },
    "vodic": {
      "common": {
        "addRow": "Add new row",
        "deleteRow": "Delete row",
        "total": "TOTAL"
      },
      "nav": {
        "back": "← Back",
        "next": "Next →",
        "randomFill": "🎲 Auto-fill with random values (test)",
        "randomFillTitle": "Test button — fills the current step with random values"
      },
      "errors": {
        "naziv": "Business plan name is missing.",
        "vizija": "Vision is missing.",
        "misija": "Mission is missing.",
        "proizvod": "Product/Service is not described.",
        "trziste": "Target market is not defined.",
        "swot": "SWOT analysis is incomplete — fill in all 4 fields.",
        "sredstvaNula": "Total assets (investments) are 0 — enter values.",
        "izvoriNula": "Total funding sources are 0.",
        "neuravnotezeno": "Assets ({sredstva} {currency}) ≠ Sources ({izvori} {currency}). Difference: {diff} {currency}.",
        "prodajaPrazna": "Sales plan is empty — enter at least one product/service.",
        "troskoviPrazni": "Cost plan is empty.",
        "troskoviPreveliki": "Costs in {year} are more than 3× revenue — check your data.",
        "odstupanje": "Product \"{name}\": Monthly plan × 12 ({expected}) differs significantly from annual ({actual})."
      },
      "info": {
        "title": "Basic information",
        "sub": "Enter basic details about your business plan.",
        "nazivLbl": "Business plan name",
        "nazivTip": "Name of your company or business idea.",
        "nazivPh": "e.g. EcoClean d.o.o.",
        "autoriLbl": "Authors",
        "autoriTip": "Names of the business plan authors.",
        "autoriPh": "e.g. Amina Serhatlic, Valdet Pestalic"
      },
      "strategija": {
        "title": "1. Key strategy",
        "sub": "Define vision, mission, product/service, unique value, and target market.",
        "vizijaLbl": "Vision",
        "vizijaTip": "Vision describes the long-term picture of what you want to achieve.",
        "vizijaPh": "What is your long-term vision?",
        "misijaLbl": "Mission",
        "misijaTip": "Mission describes the purpose of your business and how you plan to achieve the vision.",
        "misijaPh": "What is the purpose of your business?",
        "proizvodLbl": "Product / Service",
        "proizvodTip": "Describe in detail what you offer to the market.",
        "proizvodPh": "Describe products or services...",
        "novaVrijednostLbl": "Unique value proposition",
        "novaVrijednostTip": "What makes you different from competitors?",
        "novaVrijednostPh": "What sets you apart from the competition?",
        "trzisteLbl": "Target market",
        "trzisteTip": "Define your customers, market segmentation, and target group.",
        "trzistePh": "Who are your customers and target group?"
      },
      "resursi": {
        "title": "2. Resources & SWOT analysis",
        "sub": "Describe your resources and complete a SWOT analysis.",
        "kompetencijeLbl": "Key competencies",
        "kompetencijeTip": "Resources, knowledge, and skills you have (team, experience, know-how).",
        "kompetencijePh": "E.g. Experienced IT team...",
        "imovinaLbl": "Key assets",
        "imovinaTip": "Material and intangible resources: equipment, space, software, patents, etc.",
        "imovinaPh": "E.g. Business premises, equipment...",
        "swotTitle": "SWOT Analysis",
        "swot": {
          "snage": {
            "lbl": "Strengths (S)",
            "tip": "Internal advantages of your business."
          },
          "slabosti": {
            "lbl": "Weaknesses (W)",
            "tip": "Internal weaknesses to improve."
          },
          "mogucnosti": {
            "lbl": "Opportunities (O)",
            "tip": "External opportunities you can use."
          },
          "prijetnje": {
            "lbl": "Threats (T)",
            "tip": "External factors that could harm the business."
          }
        }
      },
      "operacije": {
        "title": "3. Operations",
        "sub": "Describe production processes, distribution channels, and key partners.",
        "proizvodnjaLbl": "Production / Services",
        "proizvodnjaTip": "Describe how your production process or service delivery works.",
        "proizvodnjaPh": "How are products made or services delivered?",
        "promocijaLbl": "Promotion & distribution channels",
        "promocijaTip": "How will you promote and distribute your product/service?",
        "promocijaPh": "Marketing strategy and sales channels...",
        "partneriLbl": "Key partners",
        "partneriTip": "Customers, suppliers, investors, and other important partners.",
        "partneriPh": "List key partners..."
      },
      "investicije": {
        "title": "4a. Financial plan: Sources and uses of capital",
        "sub": "Enter investments in fixed and current assets, funding sources, and verify alignment.",
        "tableA": "A) Investments in fixed and current assets",
        "tableB": "B) Sources of funds",
        "tableC": "C) Alignment of investments and funding sources",
        "thSredstva": "Assets",
        "thIznos": "Amount in {currency}",
        "thNapomena": "Note",
        "thIzvori": "Sources",
        "thElementi": "Items",
        "totalSredstva": "TOTAL ASSETS (I + II)",
        "totalIzvori": "TOTAL FUNDING SOURCES (I + II)",
        "note": "* Assets must equal funding sources!",
        "badgeEmpty": "Enter assets and sources",
        "badgeOk": "Assets = Sources ✓ Balance is aligned",
        "badgeDiff": "Difference: {diff} {currency} — assets must equal sources!",
        "inv": {
          "stalna": "I FIXED ASSETS",
          "zemljiste": "1. Land",
          "zgrade": "2. Buildings",
          "oprema": "3. Equipment",
          "vozila": "4. Vehicles",
          "inventar": "5. Business inventory and other assets",
          "osnivacka": "6. Founding investments (LLC, JSC)",
          "nematerijalna": "7. Intangible assets",
          "tekuca": "II CURRENT ASSETS",
          "zalihe": "1. Inventory",
          "potrazivanja": "2. Receivables",
          "gotovina": "3. Cash"
        },
        "izv": {
          "vlastiti": "I OWN SOURCES",
          "novac": "1. Cash",
          "stvariPrava": "2. Property and rights:",
          "zemljiste": "    - land",
          "gradevine": "    - buildings (business premises)",
          "oprema": "    - equipment",
          "ostalo": "    - other",
          "krediti": "II LOANS — EXTERNAL SOURCES",
          "dugorocni": "1. Long-term loans",
          "kratkorocni": "2. Short-term loans",
          "ostaliTudi": "3. Other external sources (loans)"
        },
        "usk": {
          "ulaganja": "I Investments (assets)",
          "stalna": "1. Fixed assets",
          "tekuca": "2. Current assets",
          "izvori": "II Funding sources",
          "vlastita": "3. Own funds",
          "tudja": "4. External funds",
          "razlika": "DIFFERENCE (I − II)"
        }
      },
      "bilansPoc": {
        "title": "4b. Financial plan: Balance sheet and income statement",
        "dateLabel": "OPENING BALANCE SHEET as of",
        "dateHint": "(at the start of operations)"
      },
      "bilansKraj": {
        "title": "4i. Balance sheet (at year-end)",
        "dateLabel": "BALANCE SHEET as of",
        "dateHint": "(at the end of the business year)"
      },
      "bilans": {
        "thRb": "No.",
        "thAktiva": "Assets",
        "thPasiva": "Liabilities & equity",
        "thIznos": "Amount in {currency}",
        "totalAktiva": "TOTAL ASSETS (A+B):",
        "totalPasiva": "TOTAL LIABILITIES & EQUITY (A+B+C):",
        "badgeEmpty": "Enter balance sheet values",
        "badgeOk": "Balance sheet is balanced (Assets = Liabilities & equity) ✓",
        "badgeDiff": "Balance sheet is NOT balanced! Assets ({aktiva}) ≠ Liabilities & equity ({pasiva}). Difference: {diff} {currency}",
        "sections": {
          "stalna": "A. FIXED ASSETS (1-3)",
          "kapital": "A. EQUITY (1-2)",
          "tekuca": "B. CURRENT ASSETS (4-7)",
          "dugorocne": "B. LONG-TERM LIABILITIES (3-4)",
          "kratkorocne": "C. SHORT-TERM LIABILITIES (5-7)"
        },
        "a": {
          "nematerijalnaUlaganja": "Intangible investments",
          "materijalnaUlaganja": "Tangible investments:",
          "nematerijalnaSredstva": "Intangible assets",
          "materijalnaSredstva": "Tangible assets:",
          "zemljiste": "- Land",
          "objekti": "- Buildings",
          "oprema": "- Equipment",
          "ostalaStalna": "Other fixed assets",
          "zalihe": "Inventory",
          "potrazivanja": "Accounts receivable",
          "gotovina": "Cash",
          "novac": "Cash",
          "ostalaTekuca": "Other current assets"
        },
        "p": {
          "vlastitiKapital": "Equity",
          "ostaloKapital": "Other (grants, state incentives)",
          "akumuliranaDobit": "Retained earnings",
          "dugorocniKredit": "Long-term loan",
          "ostaleDugorocne": "Other long-term liabilities",
          "dobavljaci": "Accounts payable",
          "kratkorocniKrediti": "Short-term loans",
          "ostaleKratkorocne": "Other short-term liabilities"
        }
      },
      "planProdaje": {
        "title": "4c. Financial plan: Sales plan (2026–2030)",
        "sub": "Enter planned revenue by product/service. Monthly plan × 12 should ≈ annual plan for 2026.",
        "thNum": "#",
        "thProizvod": "Product/Service",
        "thCijena": "Unit price ({currency})",
        "thMjesecni": "Monthly plan 2026",
        "thGodisnji": "Annual plan {year}",
        "phNaziv": "Name",
        "badge": "{name}: Mo×12={expected}, Yr={actual}"
      },
      "planTroskova": {
        "title": "4d. Financial plan: Cost plan (2026–2030)",
        "sub": "Enter planned costs by category. Monthly × 12 should match the annual level.",
        "thStruktura": "Cost structure",
        "colMonthly": "Monthly level for 2026.",
        "colAnnual": "Annual level for 2026.",
        "totalRow": "TOTAL COSTS (1-5)",
        "badge": "Mo. total ×12 = {expected} {currency}, Yr. total = {actual} {currency}",
        "cat": {
          "sectionMaterijalni": "1. Material costs",
          "sirovine": "Raw materials and supplies",
          "zakup": "Rent costs",
          "energija": "Electricity costs",
          "ostaliMat": "Other material costs (water, fuel)",
          "sectionUsluge": "2. Service costs",
          "ptt": "Post & telecom",
          "komunalne": "Utility services",
          "marketing": "Other non-production services (marketing etc.)",
          "sectionPlate": "3. Wages (gross)",
          "netoPlate": "Net wages",
          "porezi": "Payroll taxes and contributions",
          "kamate": "4. Loan interest",
          "nvRobe": "5. COGS (for trading companies)"
        }
      },
      "amortizacija": {
        "title": "4e. Financial plan: Depreciation schedule",
        "sub": "Enter fixed assets, acquisition value, and depreciation rate. Depreciation is calculated automatically (straight-line method).",
        "thOpis": "Asset description",
        "thNabavna": "Acquisition value ({currency})",
        "thStopa": "Rate (%)",
        "thUkupno": "TOTAL",
        "phOpis": "e.g. Computer",
        "note": "ℹ️ Enter the depreciation rate as a percentage (e.g. 20 for 20%). See the Profit Tax Law for prescribed rates.",
        "legalTitle": "Legally prescribed depreciation rates — Article 19.",
        "legal1": "(1) When determining the tax base, calculated depreciation is recognized using the straight-line method on long-term assets as prescribed by this article.",
        "legal2": "(2) Tax-recognized depreciation rates for long-term assets are:",
        "legal4": "(4) If the acquisition price of an asset is less than 1,000.00 {currency}, its acquisition value may be fully written off in the year of acquisition.",
        "legal5": "(5) Long-term assets that are fully written off but still recorded until disposal or destruction cannot be revalued or depreciated for tax purposes.",
        "legalRows": [
          [
            "a)",
            "Buildings",
            "5%"
          ],
          [
            "b)",
            "Roads, utility structures, railways",
            "10%"
          ],
          [
            "c)",
            "Equipment, vehicles, installations",
            "15%"
          ],
          [
            "d)",
            "Equipment for water management and sewer systems",
            "15%"
          ],
          [
            "e)",
            "Hardware, software, and environmental protection equipment",
            "33.3%"
          ],
          [
            "f)",
            "Perennial plantings",
            "15%"
          ],
          [
            "g)",
            "Breeding herds",
            "40%"
          ],
          [
            "h)",
            "Intangible assets",
            "20%"
          ]
        ]
      },
      "kredit": {
        "title": "4f. Financial plan: Loan repayment schedule",
        "initTitle": "Initial loan data",
        "iznosLbl": "Loan amount ({currency})",
        "iznosTip": "Total loan amount.",
        "kamataLbl": "Interest (% annual)",
        "kamataTip": "Annual interest rate, e.g. 3.49%.",
        "rokLbl": "Repayment term (months)",
        "rokTip": "Total loan term in months, including grace period.",
        "ucesceLbl": "Down payment ({currency})",
        "ucesceTip": "Own down payment amount (reduces loan principal).",
        "graceLbl": "Grace period (months)",
        "graceTip": "Period during which only interest is paid, no principal.",
        "datumLbl": "First payment date",
        "datumTip": "Date when repayment begins (after grace period).",
        "calcTitle": "Calculations",
        "osnovica": "Loan principal:",
        "graceKamata": "Grace period interest:",
        "kamataUOtplati": "Interest during repayment:",
        "ukupnaKamata": "Total interest:",
        "ukupnoZaduzenje": "Total debt:",
        "rataTitle": "Payment amount",
        "graceRata": "Grace period payment",
        "izracunataRata": "Calculated payment",
        "planTitle": "REPAYMENT SCHEDULE",
        "thBr": "NO.",
        "thDatum": "Payment date",
        "thZaduzenje": "Opening balance",
        "thKamata": "Interest payment",
        "thGlavnica": "Principal payment",
        "thOstatak": "Remaining balance",
        "thKumKamata": "Cumulative interest"
      },
      "normativi": {
        "title": "4g. Financial plan: Material norms and raw material prices (for production)",
        "sub": "Enter direct raw materials, unit of measure, unit cost, product names, and required quantity (norm) for each product.",
        "thSirovine": "Direct raw materials",
        "thJedMjere": "Unit",
        "thCijena": "Unit cost ({currency})",
        "productNo": "Product No.{n}",
        "phProductName": "Product name",
        "deleteProduct": "Delete product",
        "addProduct": "Add product",
        "phSirovina": "e.g. Flour",
        "phJedMjere": "kg/l/pcs",
        "totalRow": "TOTAL MATERIAL COST PER PRODUCT",
        "note": "ℹ️ Enter each product name in the table header. Column values represent the norm — required quantity of raw material (in unit of measure) to produce one unit of that product. Total material cost per product is calculated automatically. \"+\" adds a product; \"×\" removes it."
      },
      "bilansUspjeha": {
        "title": "4h. Financial plan: Income statement (2026–2030)",
        "sub": "Automatically generated from the sales and cost plans. Enter any other revenue.",
        "ostaliPrihodiLbl": "Other revenue by year (2026–2030)",
        "thElementi": "ITEMS",
        "rowPrihodi": "I. TOTAL REVENUE",
        "rowProdaja": "  1. Sales revenue",
        "rowOstali": "  2. Other revenue",
        "rowRashodi": "II. TOTAL EXPENSES",
        "rowBruto": "III. GROSS PROFIT (I−II)",
        "rowPorez": "  Profit tax (10%)",
        "rowNeto": "IV. NET PROFIT",
        "profitable": "Profitable",
        "loss": "Loss",
        "badge": "{year}: {status} ({amount} {currency})"
      },
      "sazetak": {
        "title": "Summary & final check",
        "sub": "Review all entries and run automatic consistency checks.",
        "runCheck": "▶ Run automatic check",
        "problemsOne": "Found {n} issue:",
        "problemsMany": "Found {n} issues:",
        "allOk": "✓ All checks passed! Your business plan is consistent.",
        "sazetakLbl": "Financial plan summary",
        "sazetakTip": "Write a brief summary of your financial plan by key elements.",
        "sazetakPh": "Financial plan summary: total investment, funding sources, expected revenue, profitability...",
        "pdfExport": "📄 Export full business plan to PDF",
        "pdfExporting": "⏳ Generating PDF...",
        "pdfNote": "Downloads a real PDF file (.pdf) with the complete business plan.",
        "pdfError": "Error generating PDF. Please try again.",
        "stats": {
          "ulaganja": "Total investment",
          "vlastiti": "Equity",
          "tudji": "External capital",
          "prihodi": "Revenue 2026",
          "troskovi": "Costs 2026",
          "neto": "Net profit 2026"
        }
      },
      "sample": {
        "companyNames": [
          "EcoNova d.o.o.",
          "TehnoPlus",
          "Zelena Budućnost",
          "UrbanCraft",
          "Digital Hub"
        ],
        "autori": "Amina Serhatlic, Valdet Pestalic",
        "vizija": "Become a recognized and trusted brand in the market over the next 5 years.",
        "misija": "We deliver quality products/services focused on customer satisfaction and sustainability.",
        "proizvod": "Production and sale of products/services tailored to modern market needs.",
        "novaVrijednost": "Faster delivery, better pricing, and a personalized approach compared to competitors.",
        "ciljnoTrziste": "Urban consumers aged 20–45 with middle to high income.",
        "kompetencije": "Experienced team with years of industry experience and strong expertise.",
        "imovina": "Business premises, equipment, vehicles, and IT infrastructure.",
        "snage": "Experienced team, quality product, strong local recognition.",
        "slabosti": "Limited marketing budget, small market coverage.",
        "mogucnosti": "Growing market, digitalization, new technologies.",
        "prijetnje": "Strong competition, regulatory changes, rising raw material prices.",
        "proizvodnja": "Production/services take place on-site with strict quality control.",
        "promocija": "Marketing via social media, local fairs, and customer referrals.",
        "partneri": "Local raw material suppliers, logistics partners, and financial institutions.",
        "product": "Product {n}",
        "amortNames": [
          "Equipment",
          "Vehicle",
          "Computer & software",
          "Business premises",
          "Furniture",
          "Installation"
        ],
        "sirovine": [
          "Flour",
          "Sugar",
          "Packaging",
          "Paint",
          "Metal",
          "Textile",
          "Plastic"
        ],
        "jedMjere": [
          "kg",
          "l",
          "kom",
          "m"
        ],
        "sazetak": "Total investment is financed through a combination of own and loan funds. Projections show revenue growth and profitability across all planning years."
      }
    },
    "pdf": {
      "docTitle": "BUSINESS PLAN — {name}",
      "untitled": "(untitled)",
      "fileFallback": "Business plan",
      "headerTitle": "BizPlan — {name}",
      "footer": "Univerzitet FINRA — BizPlan Asistent",
      "authors": "Autori",
      "university": "Univerzitet FINRA",
      "generated": "Generated on",
      "s1": "1. Key strategy",
      "s2": "2. Resources & SWOT analysis",
      "s3": "3. Operations",
      "s4a": "4a. Financial plan: Sources and uses of capital",
      "s4b": "4b. Financial plan: Opening balance sheet (as of {date})",
      "s4c": "4c. Financial plan: Sales plan (2026–2030)",
      "s4d": "4d. Financial plan: Cost plan (2026–2030)",
      "s4e": "4e. Financial plan: Depreciation schedule",
      "s4f": "4f. Financial plan: Loan repayment schedule",
      "s4g": "4g. Financial plan: Material norms and raw material prices",
      "s4h": "4h. Financial plan: Income statement (2026–2030)",
      "s4i": "4i. Year-end balance sheet (as of {date})",
      "sazetak": "Financial plan summary",
      "vizija": "Vision",
      "misija": "Mission",
      "proizvod": "Product / Service",
      "novaVrijednost": "Unique value proposition",
      "ciljnoTrziste": "Target market",
      "kompetencije": "Key competencies",
      "imovina": "Key assets",
      "snage": "Strengths",
      "slabosti": "Weaknesses",
      "mogucnosti": "Opportunities",
      "prijetnje": "Threats",
      "proizvodnja": "Production / Services",
      "promocija": "Promotion & distribution channels",
      "partneri": "Key partners",
      "thSredstva": "Assets",
      "thIznosKM": "Amount ({currency})",
      "thIzvori": "Sources",
      "stalnaSredstva": "I FIXED ASSETS",
      "tekucaSredstva": "II CURRENT ASSETS",
      "ukupnoSredstva": "TOTAL ASSETS",
      "vlastitiIzvori": "I OWN SOURCES",
      "kreditiTudi": "II LOANS — EXTERNAL SOURCES",
      "ukupnoIzvori": "TOTAL SOURCES",
      "thAktiva": "Assets",
      "thPasiva": "Liabilities & equity",
      "thIznos": "Amount {currency}",
      "ukupnoAktiva": "TOTAL ASSETS",
      "ukupnoPasiva": "TOTAL LIABILITIES & EQUITY",
      "thNum": "#",
      "thProizvod": "Product/Service",
      "thCijena": "Price ({currency})",
      "thMjPlan": "Monthly plan 2026",
      "thGod2026": "Annual 2026",
      "ukupno": "UKUPNO",
      "thStruktura": "Cost structure",
      "ukupnoTroskovi": "TOTAL COSTS (1-5)",
      "thOpis": "Asset description",
      "thNabavna": "Acquisition value ({currency})",
      "thStopa": "Rate (%)",
      "thUkupnoCol": "Total",
      "kreditNedefinisan": "Loan is not defined.",
      "kreditSummary": "Loan amount: {iznos} {currency} | Down payment: {ucesce} {currency} | Principal: {osnovica} {currency} | Interest: {kamata}% p.a.",
      "kreditSummary2": "Term: {rok} mo. (grace {grace} mo.) | First payment date: {datum}",
      "kreditSummary3": "Grace period payment: {graceRata} {currency} | Calculated payment: {rata} {currency}",
      "kreditSummary4": "Total interest: {kamata} {currency} | ",
      "kreditSummary5": "Total debt: {zaduzenje} {currency}",
      "thBr": "BR.",
      "thDatum": "Date",
      "thZaduzenje": "Opening balance",
      "thKamata": "Interest",
      "thGlavnica": "Principal",
      "thOstatak": "Remaining balance",
      "thKumKamata": "Cum. interest",
      "thSirovina": "Raw material",
      "thJedMjere": "Unit",
      "thCijenaJed": "Price/unit ({currency})",
      "productNo": "Product No.{n}",
      "normativiTotal": "TOTAL MATERIAL COST PER PRODUCT",
      "thElementi": "Items",
      "rowPrihodi": "I. TOTAL REVENUE",
      "rowProdaja": "  1. Sales revenue",
      "rowOstali": "  2. Other revenue",
      "rowRashodi": "II. TOTAL EXPENSES",
      "rowBruto": "III. GROSS PROFIT (I−II)",
      "rowPorez": "  Profit tax (10%)",
      "rowNeto": "IV. NET PROFIT",
      "inv": {
        "zemljiste": "Land",
        "zgrade": "Buildings",
        "oprema": "Equipment",
        "vozila": "Vehicles",
        "inventar": "Business inventory",
        "osnivacka": "Founding investments",
        "nematerijalna": "Intangible assets",
        "zalihe": "Inventory",
        "potrazivanja": "Receivables",
        "gotovina": "Cash"
      },
      "izv": {
        "novac": "Cash",
        "zemljiste": "Land",
        "gradevine": "Buildings",
        "oprema": "Equipment",
        "ostalo": "Other",
        "dugorocni": "Long-term loans",
        "kratkorocni": "Short-term loans",
        "ostaliTudi": "Other external sources"
      },
      "bil": {
        "nematerijalnaUlaganja": "Intangible investments",
        "nematerijalnaSredstva": "Intangible assets",
        "zemljiste": "Land",
        "objekti": "Buildings",
        "oprema": "Equipment",
        "ostalaStalna": "Other fixed assets",
        "zalihe": "Inventory",
        "potrazivanja": "Receivables",
        "gotovina": "Cash",
        "novac": "Cash",
        "ostalaTekuca": "Other current assets",
        "vlastitiKapital": "Equity",
        "ostaloGrantovi": "Other (grants)",
        "akumuliranaDobit": "Retained earnings",
        "dugorocniKredit": "Long-term loan",
        "ostaleDugorocne": "Other long-term liabilities",
        "dobavljaci": "Accounts payable",
        "kratkorocniKrediti": "Short-term loans",
        "ostaleKratkorocne": "Other short-term liabilities"
      }
    }
  }
};;

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      return stored === "en" ? "en" : "bs";
    } catch {
      return "bs";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l) => setLangState(l === "en" ? "en" : "bs"), []);

  const t = useCallback((key, vars) => translate(translations[lang], key, vars), [lang]);
  const currency = translations[lang].currency || (lang === "en" ? "EUR" : "KM");

  const value = useMemo(() => ({ lang, setLang, t, currency }), [lang, setLang, t, currency]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
