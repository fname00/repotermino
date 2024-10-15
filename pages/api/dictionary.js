import axios from 'axios';
import fs from 'fs'; // File system module to write files
import path from 'path'; // Module to handle file paths

const TRANSLATION_API_KEY = process.env.TRANSLATION; // Use the TRANSLATION environment variable

// Original dictionary to be translated, assumed to be loaded from ./public/locales/pl
const dictionary = {
  "book a trip": "ZAREZERWUJ PODRÓŻ",
  "welcome": "Witamy na naszej stronie!",
  "appreciation": "Dziękujemy za skorzystanie z naszych usług! Potwierdzenie zostanie wysłane na adres e-mail {{customerEmail}}.",
  "questions": "Jeśli masz jakiekolwiek pytania, napisz na <a href=\"mailto:orders@example.com\">orders@example.com</a>.",
  "findYourDreamHome": "Znajdź swój wymarzony dom",
  "findPerfectHome": "Znajdź dom idealny dla siebie",
  "buy": "Kup",
  "rent": "Wynajem",
  "sale": "Sprzedaż",
  "activity": "Aktywność",
  "all": "Wszystko",
  "holiday": "Wakacje",
  "discoverFeaturedListings": "Odkryj nasze wyróżnione oferty",
  "listingsDescription": "Aliquam lacinia diam quis lacus euismod",
  "seeAllProperties": "Zobacz wszystkie nieruchomości",
  "exploreCities": "Odkrywaj miasta",
  "searchByCity": "Wyszukaj według miasta",
  "trustedByTheWorld": "Zaufane przez najlepszych na świecie",
  "listings": "Oferty",
  "featured": "POLECANE",
  "perMonth": "/ mc",
  "bed": "łóżko",
  "bath": "łazienka",
  "squareMeter": "m2",
  "forRent": "Na wynajem",
  "forSale": "Na sprzedaż",
  "aboutTitle": "Z nami znajdziesz swój wymarzony dom",
  "aboutText": "W miarę jak rośnie złożoność budynków, rośnie też dziedzina architektury.",
  "startListingOrBuying": "Rozpocznij sprzedaż lub zakup nieruchomości z nami",
  "talkToExperts": "Porozmawiaj z naszymi ekspertami lub przeglądaj więcej nieruchomości.",
  "learnMore": "Dowiedz się więcej",
  "houses": "Domy",
  "rentals": "Wynajem",
  "customers": "Klienci",
  "seeMore": "Zobacz więcej",
  "mobileIcon": "ikona mobilna",
  "logo": "logo",
  "close": "Zamknij",
  "welcomeToSite": "Witamy na stronie {{siteName}}",
  "followUs": "Śledź nas",
  "findYourHome": "Znajdź swój dom",
  "listingStatus": "Status oferty",
  "propertyType": "Typ nieruchomości",
  "priceRange": "Zakres cenowy",
  "bedrooms": "Sypialnie",
  "bathrooms": "Łazienki",
  "location": "Lokalizacja",
  "squareFeet": "Metry kwadratowe",
  "yearBuilt": "Rok budowy",
  "otherFeatures": "Inne cechy",
  "search": "Szukaj",
  "resetAllFilters": "Resetuj wszystkie filtry",
  "saveSearch": "Zapisz wyszukiwanie",
  "searchPlaceholder": "Czego szukasz?",
  "apartments": "Apartamenty",
  "office": "Biuro",
  "villa": "Willa",
  "attic": "Poddasze",
  "basketballCourt": "Boisko do koszykówki",
  "airConditioning": "Klimatyzacja",
  "lawn": "Trawnik",
  "tvCable": "Telewizja kablowa",
  "dryer": "Suszarka",
  "outdoorShower": "Prysznic zewnętrzny",
  "washer": "Pralka",
  "lakeView": "Widok na jezioro",
  "wineCellar": "Piwniczka na wino",
  "frontYard": "Przedni ogród",
  "refrigerator": "Lodówka",
  "propertyDescription": "Opis nieruchomości",
  "propertyDetails": "Szczegóły nieruchomości",
  "address": "Adres",
  "featuresAndAmenities": "Cechy i udogodnienia",
  "aboutActivity": "O aktywności",
  "added": "Dodano",
  "daysAgo": "{{count}} dni temu",
  "monthsAgo": "{{count}} miesięcy temu",
  "yearsAgo": "{{count}} lat temu",
  "showMore": "Pokaż więcej",
  "cancellation": "Anulowanie",
  "duration": "Czas trwania",
  "pickup": "Odbiór",
  "pickupIncluded": "Odbiór wliczony",
  "guide": "Przewodnik",
  "guideIncluded": "Przewodnik wliczony",
  "flightTour": "Przelot samolotem",
  "booking": "Rezerwacja",
  "selectNumberOfPeople": "Wybierz liczbę osób i dodaj voucher do koszyka.",
  "adult": "Dorosły",
  "ageRangeAdult": "(Wiek 12-99)",
  "youth": "Młodzież",
  "ageRangeYouth": "(Wiek 6-11)",
  "infant": "Niemowlę",
  "ageRangeInfant": "(Wiek 5 i mniej)",
  "totalPrice": "Cena całkowita",
  "bookAndPay": "Zarezerwuj i zapłać",
  "loading": "Ładowanie...",
  "pricePerSqFt": "{{pricePerSqFt}}/m2",
  "bedroom": "Sypialnia",
  "garage": "Garaż",
  "sqft": "m2",
  "viewPhone": "Zobacz telefon",
  "contactAgent": "Skontaktuj się z agentem",
  "city": "Miasto",
  "propertyID": "ID nieruchomości",
  "price": "Cena",
  "propertySize": "Rozmiar nieruchomości",
  "garageSize": "Rozmiar garażu",
  "propertyStatus": "Status nieruchomości",
  "otherListingsIn": "Inne oferty w",
  "noOtherListings": "Brak innych dostępnych ofert",
  "fetchError": "Nie udało się pobrać innych ofert:",
  "yes": "Tak",
  "no": "Nie",
  "about": {
    "hero": {
      "alt": "Piękny widok na Teneryfę"
    },
    "section1": {
      "col1": "Naszą misją jest rewolucja w postrzeganiu rynku nieruchomości, oferując nowe perspektywy i wyjątkowe możliwości dla każdego.",
      "col2": "W branży nieruchomości, gdzie każda decyzja ma ogromne znaczenie, nasza firma wyróżnia się nie tylko profesjonalizmem, ale i autentyczną pasją do tego, co robimy. Nasz zespół to grupa entuzjastów, którzy łączą swoją wiedzę z nowatorskimi pomysłami, co pozwala nam oferować wyjątkowe doświadczenia w poszukiwaniu idealnych nieruchomości.\n\nZ niezwykłą dbałością o szczegóły organizujemy procesy, które zapewniają szybkie i bezproblemowe transakcje. Każda oferta jest indywidualnie dopasowana do potrzeb klientów, co sprawia, że mogą oni znaleźć miejsce, które naprawdę odzwierciedla ich styl życia. Teneryfa, z jej zapierającymi dech w piersiach krajobrazami, staje się tłem dla tych poszukiwań, oferując niezliczone możliwości zarówno dla miłośników słońca, jak i tych, którzy preferują bardziej stonowane klimaty.\n\nNasi pracownicy to prawdziwi pasjonaci, którzy z radością dzielą się swoją wiedzą o Teneryfie, pomagając klientom odkrywać jej tajemnice. Ich zaangażowanie i chęć niesienia pomocy sprawiają, że każdy klient czuje się wyjątkowo i doceniony. To właśnie ta bliskość i otwartość budują naszą reputację jako firmy, która wyróżnia się na tle konkurencji. Z nami odkryjesz, jak przyjemne i satysfakcjonujące może być znalezienie wymarzonego miejsca w otoczeniu, które inspiruje i zachwyca na każdym kroku!"
    },
    "section2": {
      "col1": {
        "li1": "Nowoczesna willa, najwyższa jakość",
        "li2": "Bez trosk, z pełnym wsparciem",
        "li3": "Profesjonalizm w obrocie nieruchomościami",
        "li4": "Twoje zadowolenie to nasz priorytet"
      },
      "col2": {
        "li1": "Ochrona płatności, gwarancja bezpieczeństwa",
        "li2": "Z pewnością na każdym kroku",
        "li3": "Rzetelność w każdej transakcji",
        "li4": "Twoje zaufanie, nasza wartość"
      }
    },
    "banner2": {
      "alt": "Nowoczesne wnętrze willi"
    },
    "funfacts": {
      "item1": "Nieruchomości",
      "item2": "Property Ready",
      "item3": "Profesjonalizm"
    },
    "section4": {
      "h3": "OFERUJEMY",
      "col1": "W naszej firmie zajmującej się nieruchomościami tworzymy zgraną ekipę, która z pasją i zaangażowaniem podchodzi do każdego wyzwania w branży. Specjalizujemy się w sprzedaży, wynajmie oraz zarządzaniu nieruchomościami, oferując kompleksową obsługę dostosowaną do indywidualnych potrzeb naszych klientów.\n\nDodatkowo oferujemy wynajem różnorodnych obiektów na Teneryfie, aby umilić Państwu wakacje. Dzięki naszym usługom można skorzystać z szerokiej gamy możliwości, takich jak wynajem mieszkań, domów wakacyjnych czy atrakcji turystycznych. Ponadto nasze doświadczenie w obsłudze hoteli pozwala nam zapewnić najwyższy standard usług, zarówno dla gości, jak i właścicieli.\n\nWierzymy, że sukces to efekt współpracy, dlatego stawiamy na przyjazną atmosferę, w której każdy członek zespołu czuje się doceniony i zmotywowany. Nasi pracownicy to doświadczeni profesjonaliści, którzy doskonale znają rynek nieruchomości i z chęcią dzielą się swoją wiedzą, zapewniając klientom najwyższy poziom obsługi.\n\nNasze szefostwo aktywnie wspiera zespół, tworząc warunki sprzyjające innowacyjności i rozwojowi. Dzięki temu potrafimy dostarczać rozwiązania idealnie dopasowane do potrzeb naszych klientów, zarówno w zakresie zakupu, jak i sprzedaży nieruchomości oraz kompleksowego zarządzania.\n\nZ nami nie tylko znajdziesz swoją wymarzoną nieruchomość, ale również doświadczysz współpracy opartej na zaufaniu i profesjonalizmie. Dołącz do nas i przekonaj się, jak wiele możemy osiągnąć razem, prowadząc Cię przez każdy etap procesu nieruchomościowego oraz organizując niezapomniane wakacje na Teneryfie!\n\nZachęcamy do kontaktu z naszym zespołem, aby wspólnie odkryć możliwości, jakie przed Tobą stoją. Jesteśmy tu, aby spełnić Twoje marzenia o idealnej nieruchomości, zarówno w zakresie zakupu, jak i sprzedaży, oraz niezapomnianych wakacjach. Razem stworzymy coś wyjątkowego!"
    },
    "team": {
      "alt": "Zespół naszej firmy"
    },
    "banner3": {
      "alt": "Zachód słońca nad Teneryfą"
    },
    "section5": {
      "text": "W naszej firmie wierzymy, że każda nieruchomość ma swoją historię, a naszą misją jest pomóc Ci napisać nowy rozdział. Oferujemy nie tylko sprzedaż i wynajem, ale także pełne wsparcie w zakresie zarządzania nieruchomościami, co sprawia, że stajemy się Twoim zaufanym partnerem na rynku.\n\nNasza różnorodna oferta pozwala klientom na odkrywanie możliwości, które idealnie odpowiadają ich potrzebom, niezależnie od tego, czy szukają wymarzonego domu, inwestycji czy idealnego miejsca na wakacje. Dążymy do tego, aby każdy klient czuł się wyjątkowo, a nasza pasja do nieruchomości przekłada się na jakość usług, które świadczymy.\n\n Z nami nie tylko inwestujesz w nieruchomości, ale także tworzysz przyszłość, w której każda decyzja jest przemyślana i dostosowana do Twoich oczekiwań."
    }
  },
  "contact": {
    "form": {
      "title": "Masz pytania? Skontaktuj się z nami!",
      "li1": "Ikona WhatsApp",
      "li2": "Ikona maila",
      "h5": "Chętnie usłyszymy od Ciebie.",
      "description": "Jesteśmy tutaj, aby odpowiedzieć na każde Twoje pytanie. Jako partner korporacji Realton, mamy ponad 9 000 biur różnej wielkości i potencjału."
    },
    "team": {
      "alt": "Zespół naszej firmy",
      "h3": "Dowiedz się, jak możemy Ci pomóc w tym procesie i jakie korzyści płyną ze współpracy z naszą firmą.",
      "description": "Nasza firma specjalizuje się w rynku nieruchomości na Teneryfie. Jesteśmy zespołem doświadczonych profesjonalistów, którzy z pasją zajmują się zarządzaniem nieruchomościami, oferując usługi z gwarancją bezpieczeństwa i profesjonalizmu. Naszym celem jest zapewnienie wsparcia na każdym etapie procesu sprzedaży, co pozwala naszym klientom zrealizować marzenia o idealnej nieruchomości. Rozumiemy, że decyzje związane z zakupem lub sprzedażą mogą być skomplikowane, dlatego jesteśmy tutaj, aby uczynić ten proces łatwiejszym i bardziej przystępnym. Oferujemy pomoc w zakresie finansowania, co umożliwia naszym klientom znalezienie korzystnych rozwiązań. Dzięki naszym usługom walutowym masz pewność, że zarządzanie finansami będzie wygodne i bezpieczne. Nie tylko wspieramy naszych klientów w transakcjach związanych z nieruchomościami, ale także pomagamy im odkrywać uroki Teneryfy. Oferujemy informacje o lokalnych atrakcjach i aktywnościach, które można wykorzystać podczas wakacji – od sportów wodnych, przez wędrówki po malowniczych szlakach, aż po odkrywanie lokalnej kultury i kuchni. Nasza oferta jest kompleksowa, co pozwala Ci skupić się na tym, co najważniejsze – realizacji marzeń o nieruchomości na Teneryfie i pełnym korzystaniu z tego pięknego miejsca. Jesteśmy tutaj, aby Twoje interesy były w dobrych rękach."
    },
    "offer": {
      "alt": "Oferta naszej firmy",
      "h3": "OFERTA",
      "description": "Oferujemy idealne opcje sprzedaży dopasowane do Twoich potrzeb.",
      "1description": "Zarządzanie nieruchomościami z gwarancją profesjonalizmu i bezpieczeństwa.",
      "2description": "Z nami nie musisz się martwić o finanse – zawsze znajdziesz korzystne rozwiązania.",
      "3description": "Nasze usługi hipoteczne to wsparcie na każdym etapie transakcji.",
      "4description": "Korzystaj z usług walutowych, które zapewniają korzystne kursy i bezpieczeństwo."
    },
    "features": {
      "li1": "Nieruchomości to sektor, który nieustannie się rozwija i przyciąga uwagę wielu inwestorów oraz osób poszukujących swojego miejsca na ziemi. Nasza firma, dzięki doświadczeniu i fachowej wiedzy, z powodzeniem działa na tym rynku, oferując kompleksowe usługi związane z kupnem, sprzedażą i wynajmem nieruchomości.",
      "li2": "Obecnie obserwujemy wzrost zainteresowania zakupem nieruchomości, co potwierdzają nasze liczne transakcje w ostatnich miesiącach. Klienci doceniają nasze podejście – oferujemy nie tylko profesjonalne doradztwo, ale także szczegółowe analizy rynku, co pozwala im podejmować świadome decyzje. Dzięki naszym staraniom wiele osób znalazło swoje wymarzone mieszkania i domy, co świadczy o naszej efektywności.",
      "li3": "Sprzedaż nieruchomości to kolejny obszar, w którym osiągamy znaczące wyniki. Nasze strategie marketingowe, w tym profesjonalne zdjęcia i dokładne opisy, przyciągają rzesze potencjalnych kupców. Dzięki umiejętnościom negocjacyjnym naszego zespołu udało nam się zrealizować wiele transakcji na korzystnych warunkach, co przynosi satysfakcję zarówno sprzedającym, jak i kupującym.",
      "li4": "Wynajem nieruchomości to kolejny segment, w którym nasza firma odnosi sukcesy. Zauważamy rosnące zapotrzebowanie na mieszkania do wynajęcia, co sprawia, że nasza oferta cieszy się dużym zainteresowaniem. Dzięki profesjonalnemu podejściu do każdego klienta oraz szczegółowemu doradztwu w zakresie umów najmu możemy zapewnić bezpieczeństwo i komfort zarówno wynajmującym, jak i najemcom.",
      "li5": "W miarę jak rynek nieruchomości ewoluuje, nasza firma nieustannie dostosowuje się do zmieniających się potrzeb klientów. Współpraca z nami to gwarancja profesjonalizmu, efektywności i satysfakcji z przeprowadzonych transakcji. Obserwując rosnący popyt, jesteśmy przekonani, że nasze usługi przyczyniają się do pozytywnych zmian na rynku nieruchomości, a nasze osiągnięcia świadczą o naszej determinacji i zaangażowaniu w branży."
    },
    "closing": {
      "alt": "Zachód słońca nad Teneryfą",
      "description": "Nasza firma nieustannie rozwija swoją działalność na rynku nieruchomości, oferując nie tylko mieszkania i domy, ale także wynajem hoteli oraz organizację atrakcji turystycznych. Dzięki szerokiemu wyborowi obiektów – od kameralnych pensjonatów po luksusowe hotele – możemy dostosować ofertę do różnych potrzeb klientów. Współpracujemy z lokalnymi atrakcjami, co pozwala nam tworzyć pakiety łączące zakwaterowanie z unikalnymi doświadczeniami, takimi jak wycieczki czy degustacje. Nasze podejście opiera się na zrozumieniu oczekiwań klientów, co przekłada się na wysoką satysfakcję gości. Dzięki połączeniu wynajmu hoteli z ofertą atrakcji oraz sprzedażą nieruchomości wspieramy lokalną gospodarkę i przyciągamy turystów. Jesteśmy przekonani, że nasza działalność przyczynia się do wzrostu zainteresowania regionem i buduje pozytywny wizerunek naszej marki."
    }
  },
  "teneryfa_title": "Teneryfa – Odkryj raj na Ziemi",
  "teneryfa_description1": "Planujesz wyjazd na Teneryfę? Chcesz dowiedzieć się wszystkiego o formalnościach związanych z podróżą? Pobierz nasz ebook i odkryj wszystkie niezbędne informacje, które ułatwią Ci organizację wymarzonych wakacji. Zyskaj pewność, że jesteś przygotowany na każdą sytuację – od dokumentów, przez przepisy, aż po lokalne zwyczaje.",
  "teneryfa_description2": "Pobierz ebook i zacznij spełniać marzenia już dziś!",
  "download_ebook": "Pobierz ebook",
  "faq": {
    "title": "Często zadawane pytania",
    "home": "Strona główna",
    "forRent": "Wynajem",
    "selling": "Sprzedaż",
    "end": "Mamy nadzieję, że nasze odpowiedzi na najczęściej zadawane pytania pomogły Ci lepiej zrozumieć naszą ofertę oraz proces zakupu, wynajmu i sprzedaży nieruchomości na Teneryfie. Jesteśmy tutaj, aby pomóc Ci w spełnieniu marzeń o idealnym miejscu na tej pięknej wyspie. Nie wahaj się skontaktować z nami, jeśli masz dodatkowe pytania lub potrzebujesz indywidualnej pomocy. Nasz zespół z przyjemnością odpowie na Twoje pytania i poprowadzi Cię przez każdy krok. Razem stworzymy niezapomniane wspomnienia na Teneryfie! Dziękujemy za zaufanie i czekamy na Twoje wiadomości!",
    "questions": {
      "question1": "Jakie usługi oferujecie w zakresie nieruchomości?",
      "question2": "Czy mogę wynająć mieszkanie na Teneryfie na krótki okres?",
      "question3": "Jakie są koszty związane z zakupem nieruchomości na Teneryfie?",
      "question4": "Jakie dokumenty są potrzebne do wynajmu mieszkania?",
      "question5": "Czy oferujecie pomoc w znalezieniu atrakcji turystycznych na Teneryfie?",
      "question6": "Jak mogę skontaktować się z Waszym zespołem?",
      "question7": "Czy mogę zobaczyć nieruchomość przed jej zakupem?",
      "question8": "Jakie są zalety inwestowania w nieruchomości na Teneryfie?",
      "question9": "Jak wygląda proces zakupu nieruchomości na Teneryfie?",
      "question10": "Jakie są najważniejsze czynniki do rozważenia przy wyborze nieruchomości na Teneryfie?"
    },
    "answers": {
      "answer1": "Z przyjemnością informujemy, że nasze usługi obejmują kompleksową obsługę rynku nieruchomości na Teneryfie. Pomagamy klientom w kupnie, sprzedaży i wynajmie mieszkań oraz hoteli. Nasz zespół doświadczonych specjalistów z pasją podchodzi do każdej transakcji, zapewniając, że każdy klient czuje się wyjątkowo. Dodatkowo możemy pomóc w organizacji atrakcji turystycznych, aby Twój pobyt na Teneryfie był niezapomniany!",
      "answer2": "Oczywiście! Oferujemy szeroki wybór mieszkań dostępnych na wynajem zarówno na krótkie, jak i długoterminowe pobyty. Nasze mieszkania są idealnie dopasowane do Twoich potrzeb, a nasz zespół z radością pomoże Ci znaleźć idealne miejsce, które stanie się Twoją oazą spokoju podczas wakacji.",
      "answer3": "Koszty zakupu nieruchomości na Teneryfie mogą różnić się w zależności od lokalizacji oraz typu nieruchomości. Zazwyczaj obejmują one cenę samej nieruchomości oraz dodatkowe opłaty związane z jej zakupem, takie jak koszty związane z obsługą transakcji. Nasz zespół z przyjemnością przeprowadzi Cię przez cały proces, abyś miał pełne zrozumienie wszystkich aspektów zakupu i mógł podjąć świadomą decyzję. Jesteśmy tutaj, aby uczynić ten krok jak najbardziej komfortowym dla Ciebie!",
      "answer4": "W celu wynajmu mieszkania zazwyczaj potrzebne będą podstawowe dokumenty, takie jak ważny dowód tożsamości oraz informacje o Twoich dochodach. W niektórych przypadkach możemy poprosić o dodatkowe referencje. Nasz zespół jest gotowy, aby pomóc Ci w przygotowaniu wszystkich wymaganych dokumentów i upewnić się, że cały proces wynajmu przebiegnie sprawnie i bezproblemowo. Z nami możesz czuć się pewnie na każdym etapie!",
      "answer5": "Tak, z radością pomożemy Ci odkryć wszystkie piękne zakątki Teneryfy! Oferujemy pomoc w organizacji wycieczek, rezerwacji w najlepszych restauracjach oraz dostęp do najciekawszych atrakcji turystycznych. Nasze doświadczenie pozwoli Ci w pełni cieszyć się tym, co wyspa ma do zaoferowania.",
      "answer6": "Jesteśmy zawsze do Twojej dyspozycji! Możesz skontaktować się z nami telefonicznie, mailowo lub poprzez formularz kontaktowy na naszej stronie internetowej. Nasi przyjaźni konsultanci z chęcią odpowiedzą na wszystkie pytania i pomogą w realizacji Twoich marzeń o nieruchomości na Teneryfie.",
      "answer7": "Absolutnie! Wierzymy, że osobista wizyta w nieruchomości jest kluczowa przy podejmowaniu decyzji. Organizujemy wizyty w interesujących Cię lokalizacjach, a nasz konsultant będzie Ci towarzyszył, aby odpowiedzieć na wszystkie pytania i dostarczyć dodatkowych informacji. Twoja satysfakcja jest dla nas najważniejsza!",
      "answer8": "Inwestowanie w nieruchomości na Teneryfie to doskonała decyzja! Wyspa przyciąga turystów z całego świata, co stwarza stabilny rynek wynajmu. Dodatkowo cieszymy się tutaj pięknym klimatem, malowniczymi krajobrazami oraz bogatą kulturą. To idealne miejsce zarówno na wakacyjny relaks, jak i jako inwestycja, która przyniesie Ci zyski.",
      "answer9": "Proces zakupu nieruchomości na Teneryfie zaczyna się od określenia Twoich potrzeb i preferencji. Nasz zespół pomoże Ci w znalezieniu odpowiednich ofert, które spełnią Twoje oczekiwania. Gdy znajdziesz wymarzoną nieruchomość, pomożemy Ci w organizacji wizyty oraz w negocjacjach z właścicielem. Następnie przeprowadzimy Cię przez wszystkie kroki związane z finalizacją transakcji, zapewniając, że każdy etap będzie jasny i zrozumiały. Naszym celem jest, abyś czuł się komfortowo i pewnie na każdym etapie zakupu!",
      "answer10": "Przy wyborze nieruchomości warto zwrócić uwagę na lokalizację, dostępność usług, bliskość plaż oraz atrakcji turystycznych. Nasz zespół z przyjemnością pomoże Ci w analizie tych czynników, abyś mógł podjąć świadomą decyzję. Jesteśmy tutaj, aby uczynić Twój proces zakupu jak najbardziej komfortowym i satysfakcjonującym."
    }
  },
    "contact": {
      "p1": "Witaj w naszej oazie marzeń, gdzie Twoje pragnienia dotyczące nieruchomości na Teneryfie mogą stać się rzeczywistością. Jako zespół ekspertów w dziedzinie nieruchomości łączymy profesjonalizm z pasją do piękna tej wyjątkowej wyspy. Wierzymy, że każdy dom to nie tylko budynek, ale także miejsce, w którym rodzą się wspomnienia i spełniają się marzenia.",
      "p2": "Z przyjemnością pomożemy Ci na każdym kroku tej niezwykłej podróży — od zakupu lub sprzedaży nieruchomości, przez wynajem, aż po organizację niezapomnianych wakacji i atrakcji. Nasza misja to nie tylko transakcje, ale także tworzenie relacji opartych na zaufaniu i zrozumieniu Twoich potrzeb.",
      "p3": "Adres, telefon, e-mail",
      "p4": "Czekamy na Twoje wiadomości i z radością pomożemy Ci w realizacji Twoich marzeń.",
      "p5": "Jesteśmy gotowi, aby wspierać Cię w odkrywaniu magii Teneryfy i uczynić Twoje doświadczenia niezapomnianymi!",
      "h1": "Kontakt z nami",
      "h12": "Dane kontaktowe",
      "h13": "Czekamy na Twój kontakt"
    },
    "cv": {
      "p1": "Nasza firma poszukuje pasjonatów, którzy chcą dołączyć do naszego zespołu i wspólnie z nami pomagać klientom w kupnie, sprzedaży, wynajmie oraz organizacji wymarzonych wakacji!",
      "p2": "Oferujemy dynamiczne środowisko pracy, w którym każdy członek zespołu ma szansę na rozwój i realizację swoich ambicji. Pracując z nami, będziesz mógł zdobywać cenne doświadczenie, a także brać aktywny udział w procesach obsługi klienta, budując jednocześnie swoją sieć kontaktów w branży.",
      "p3": "Adres, telefon, e-mail",
      "p4": "Choć nasz zespół jest już pełny, zawsze jesteśmy otwarci na utalentowane i zmotywowane osoby, które chcą wnieść coś nowego do naszego zespołu. Jeśli czujesz, że masz potencjał i chcesz pracować w inspirującym środowisku, nie wahaj się – prześlij nam swoje CV!",
      "p5": "Dołącz do nas i wspólnie twórzmy przyszłość w świecie nieruchomości! Twoja kariera zaczyna się tutaj!",
      "h1": "Szukasz miejsca, w którym możesz rozwinąć swoje skrzydła w branży nieruchomości?",
      "h13": "Czekamy na Twój kontakt"
    },
    "teneryfa": {
      "p1": "Teneryfa, największa wyspa archipelagu Wysp Kanaryjskich, to prawdziwy skarb Oceanu Atlantyckiego, który przyciąga zarówno turystów, jak i osoby pragnące osiedlić się w malowniczym otoczeniu. To miejsce, gdzie natura, kultura i komfort życia tworzą idealny, harmonijny związek.",
      "p2": "Teneryfa zachwyca niezwykle zróżnicowanym krajobrazem, który obejmuje wszystko, od majestatycznych gór po idylliczne plaże. Wulkan Teide, wynoszący 3718 m n.p.m., to nie tylko najwyższy szczyt Hiszpanii, ale także symbol wyspy. Jego imponujące, wulkaniczne krajobrazy, otoczone malowniczymi dolinami i lasami sosnowymi, oferują niezliczone możliwości do pieszych wędrówek oraz wspinaczki. Szlaki turystyczne prowadzą przez różnorodne ekosystemy, gdzie można podziwiać unikalną florę i faunę, w tym rzadkie gatunki roślin, które występują tylko na Teneryfie.",
      "p3": "Teneryfa cieszy się łagodnym, subtropikalnym klimatem, co czyni ją idealnym miejscem do życia przez cały rok. Zimą temperatury rzadko spadają poniżej 15°C, a latem osiągają komfortowe 25-30°C. Dzięki temu mieszkańcy i turyści mogą cieszyć się słońcem przez większość roku, korzystając z uroków plaż, sportów wodnych oraz licznych aktywności na świeżym powietrzu. Taki klimat sprzyja również uprawie egzotycznych owoców i warzyw, co podkreśla różnorodność kulinarną wyspy.",
      "p4": "Teneryfa to miejsce o bogatej historii i kulturze, która łączy wpływy Guanczów, rdzennych mieszkańców, z hiszpańską tradycją. Po podboju przez Hiszpanów w XV wieku wyspa stała się ważnym punktem handlowym, co przyczyniło się do jej rozwoju. Dziś kultura teneryfska kwitnie, a lokalne festiwale, takie jak słynny karnawał w Santa Cruz de Tenerife, przyciągają turystów z całego świata. To barwne wydarzenie, pełne tańca, muzyki i kolorowych kostiumów, stanowi doskonałą okazję do zanurzenia się w lokalne tradycje i zwyczaje.",
      "p5": "Teneryfa to raj dla turystów, oferujący różnorodne atrakcje i formy wypoczynku. Luksusowe kurorty w Costa Adeje oraz tętniące życiem Playa de las Américas przyciągają gości z różnych zakątków świata. Na wyspie można znaleźć przepiękne plaże, idealne do relaksu, a także doskonałe warunki do uprawiania sportów wodnych, takich jak nurkowanie, windsurfing czy żeglarstwo. Po dniu pełnym aktywności turyści mogą skorzystać z bogatej oferty restauracji, barów i klubów nocnych, które oferują zarówno lokalne specjały, jak i międzynarodową kuchnię.",
      "p6": "Teneryfa to prawdziwy raj dla miłośników przyrody, z wieloma endemicznymi gatunkami roślin i zwierząt. Wyspa oferuje różnorodne ekosystemy, od wulkanicznych krajobrazów po bujne lasy, co czyni ją idealnym miejscem do odkrywania unikalnej flory i fauny. Park Narodowy Teide, z jego majestatycznymi krajobrazami i bogactwem biologicznym, jest miejscem, gdzie można podziwiać rzadkie gatunki roślin, takie jak storczyki czy endemiczne krzewy. Dla miłośników obserwacji ptaków Teneryfa jest domem dla wielu interesujących gatunków, które można spotkać w naturalnym środowisku.",
      "p7": "Kuchnia teneryfska to prawdziwa uczta dla zmysłów, łącząca tradycyjne hiszpańskie smaki z lokalnymi składnikami. Lokalne specjały, takie jak \"papas arrugadas\" – skórzaste ziemniaki podawane z sosem mojo, to tylko wycinek bogatej oferty gastronomicznej. Świeże owoce morza, grillowane ryby oraz egzotyczne owoce sprawiają, że każdy posiłek staje się niezapomnianym doświadczeniem kulinarnym. Lokalne restauracje często serwują dania przygotowywane według tradycyjnych receptur, co pozwala na odkrywanie unikalnych smaków wyspy.",
      "p8": "Teneryfa to miejsce, które oferuje nie tylko wspaniałe chwile relaksu, ale także możliwość stworzenia nowego, pełnego życia miejsca do zamieszkania. To idealne połączenie pięknej przyrody, bogatej kultury i komfortowego stylu życia sprawia, że Teneryfa jest doskonałym wyborem zarówno na wakacje, jak i na stałe osiedlenie się. Zapraszamy do odkrywania tej niezwykłej wyspy, gdzie każdy dzień stanie się niezapomnianą przygodą!",
      "h1": "Teneryfa – Odkryj Raj na Ziemi",
      "h2": "Krajobraz i Przyroda",
      "h3": "Klimat",
      "h4": "Kultura i Historia",
      "h5": "Turystyka i Rozrywka",
      "h6": "Flora i Fauna",
      "h7": "Gastronomia",
      "h8": "Podsumowanie"
    },
    "grancanaria": {
      "p1": "Gran Canaria, jedna z najpiękniejszych wysp archipelagu Wysp Kanaryjskich, to miejsce, które urzeka swoją różnorodnością i wyjątkowym klimatem. To idealny cel dla tych, którzy pragną doświadczyć unikalnego połączenia przyrody, kultury i nowoczesnego stylu życia.",
      "p2": "Gran Canaria to wyspa, na której każdy znajdzie coś dla siebie. Jej krajobraz jest różnorodny – od malowniczych plaż na wybrzeżu po dramatyczne góry w centralnej części wyspy. Wydmy Maspalomas, znane na całym świecie, to nie tylko miejsce relaksu, ale również unikalny ekosystem, który zachwyca miłośników przyrody. W obrębie wyspy znajdują się liczne rezerwaty przyrody, w tym Parque Natural de Pilancones, gdzie można odkrywać dziką florę i faunę, a także podziwiać zapierające dech w piersiach widoki. Wysokie szczyty, takie jak Roque Nublo, zachęcają do wspinaczki i odkrywania ukrytych zakątków wyspy.",
      "p3": "Gran Canaria słynie z przyjemnego klimatu przez cały rok. Dzięki swojemu położeniu na Oceanie Atlantyckim, wyspa cieszy się łagodnymi temperaturami, które wahają się od 20°C zimą do 28°C latem. Taki klimat sprzyja nie tylko turystyce, ale również uprawom rolnym, co sprawia, że lokalne rynki są pełne świeżych owoców i warzyw. Mieszkańcy i turyści mogą cieszyć się słońcem na plażach, ale także korzystać z aktywności na świeżym powietrzu, takich jak jazda na rowerze czy piesze wędrówki po górskich szlakach.",
      "p4": "Gran Canaria ma bogatą historię, która łączy wpływy rdzennych mieszkańców Guanczów z hiszpańską tradycją. Po przybyciu Hiszpanów w XV wieku wyspa stała się ważnym ośrodkiem handlowym. Dziś kultura Gran Canarii jest pełna życia, a liczne festiwale, takie jak Fiesta de San Juan czy Carnaval de Las Palmas, przyciągają zarówno mieszkańców, jak i turystów. Miejsca takie jak Casa de Colón i Muzeum Historii w Las Palmas oferują wgląd w fascynującą przeszłość wyspy, a tradycyjne rzemiosło i sztuka są pielęgnowane w lokalnych galeriach.",
      "p5": "Gran Canaria to prawdziwy raj dla miłośników wypoczynku i rozrywki. Zróżnicowana oferta turystyczna obejmuje nie tylko luksusowe hotele i ośrodki, ale także kameralne pensjonaty i apartamenty. Plaże, takie jak Playa de Amadores, zachwycają złotym piaskiem i krystalicznie czystą wodą, idealną do pływania i uprawiania sportów wodnych. Na wyspie znajdują się również liczne pola golfowe, które przyciągają miłośników tej eleganckiej dyscypliny. Po dniu pełnym atrakcji turyści mogą skorzystać z bogatej oferty restauracji, barów i klubów, które tętnią życiem do późnych godzin nocnych.",
      "p6": "Gran Canaria wyróżnia się niezwykłym bogactwem biologicznym dzięki różnorodności krajobrazów. Wyspa jest domem dla wielu endemicznych gatunków roślin i zwierząt, a różnorodne ekosystemy odzwierciedlają jej unikalne położenie geograficzne. Parki narodowe, takie jak Parque Natural de Tamadaba, oferują idealne warunki do obserwacji ptaków i odkrywania rzadkich gatunków roślin. Miłośnicy przyrody z pewnością docenią możliwość wędrówek po malowniczych szlakach, które prowadzą przez bujne lasy i wąwozy.",
      "p7": "Kuchnia Gran Canarii to prawdziwa podróż kulinarna, łącząca tradycyjne smaki z nowoczesnymi akcentami. Lokalne dania, takie jak \"gofio\" (mielona kukurydza), ryby i owoce morza przyrządzane na wiele sposobów oraz różnorodne tapas, to tylko niektóre z przysmaków, które warto spróbować. Lokalne wina, a także rum produkowany na wyspie, doskonale komponują się z potrawami i sprawiają, że każdy posiłek staje się niezapomnianym doświadczeniem. Wiele restauracji oferuje dania przygotowywane z lokalnych składników, co przekłada się na świeżość i wyjątkowy smak.",
      "p8": "Gran Canaria to miejsce, które łączy w sobie piękno natury, bogatą kulturę i komfort życia. To idealny wybór zarówno na urlop, jak i na stałe osiedlenie się. Zapraszamy do odkrywania tej niezwykłej wyspy, gdzie każdy dzień przynosi nowe przygody i wspaniałe wspomnienia!",
      "h1": "Gran Canaria – Wyspa Bezgranicznych Możliwości",
      "h2": "Krajobraz i Przyroda",
      "h3": "Klimat",
      "h4": "Kultura i Historia",
      "h5": "Turystyka i Rozrywka",
      "h6": "Flora i Fauna",
      "h7": "Gastronomia",
      "h8": "Podsumowanie"
    },
    "lanzarote": {
      "p1": "Lanzarote, jedna z najbardziej fascynujących wysp archipelagu Wysp Kanaryjskich, to miejsce, które zachwyca swoją unikalną scenerią oraz bogatą kulturą. To idealny cel dla osób pragnących odkrywać niezwykłe krajobrazy, cieszyć się przyjemnym klimatem oraz zanurzyć się w artystycznych inspiracjach.",
      "p2": "Lanzarote to wyspa o niepowtarzalnym krajobrazie, który został ukształtowany przez wulkaniczną aktywność. Wulkan Timanfaya, znany z dramatycznych erupcji w XIX wieku, to serce Parku Narodowego Timanfaya, gdzie można podziwiać surrealistyczne formacje skalne i kraterów. Czarne, wulkaniczne piaski, czerwone wzgórza i zielone oazy tworzą niesamowity kontrast, który przyciąga fotografów i miłośników natury. Na Lanzarote znajdują się również piękne plaże, takie jak Playa Blanca czy Papagayo, które oferują spokój i relaks w otoczeniu turkusowych wód.",
      "p3": "Lanzarote cieszy się łagodnym, subtropikalnym klimatem, co czyni ją idealnym miejscem do życia i wypoczynku przez cały rok. Średnie temperatury w ciągu roku wahają się od 18°C zimą do 28°C latem, co sprzyja uprawom winorośli i innych roślin. Warto zaznaczyć, że wyspa jest mniej deszczowa niż niektóre inne wyspy kanaryjskie, co pozwala na cieszenie się słońcem praktycznie przez cały rok.",
      "p4": "Lanzarote ma bogatą historię i kulturę, która łączy wpływy hiszpańskie z lokalnymi tradycjami. Wyspa jest także znana z działalności artysty Césara Manrique’a, który odegrał kluczową rolę w ochronie naturalnego dziedzictwa Lanzarote oraz promowaniu sztuki. Jego unikalne projekty, takie jak Jameos del Agua czy Fundacja César Manrique, w pełni wykorzystują naturalne piękno wyspy, łącząc je z architekturą i sztuką. Festiwale, takie jak Carnaval de Lanzarote, pokazują lokalne tradycje i kreatywność mieszkańców, przyciągając turystów z całego świata.",
      "p5": "Lanzarote to idealne miejsce dla osób poszukujących różnorodnych form wypoczynku. Oprócz wspaniałych plaż i atrakcji przyrodniczych, wyspa oferuje bogaty wachlarz aktywności, takich jak nurkowanie, windsurfing czy jazda na rowerze. W miasteczku Teguise, niegdyś stolicy wyspy, odbywa się popularny targ, na którym można kupić lokalne rękodzieło i spróbować tradycyjnych potraw. Lanzarote to także raj dla miłośników wina, z malowniczymi winnicami w regionie La Geria, gdzie można degustować regionalne trunki.",
      "p6": "Na Lanzarote znajduje się wiele unikalnych gatunków roślin i zwierząt, które przystosowały się do surowych warunków wulkanicznych. Wyspa jest znana z bioróżnorodnych krajobrazów oraz ogrodów, takich jak Jardín de Cactus, zaprojektowany przez Césara Manrique’a. W parkach narodowych można spotkać rzadkie gatunki ptaków oraz endemiczne rośliny, co czyni Lanzarote interesującym miejscem dla miłośników przyrody i ekologii.",
      "p7": "Kuchnia Lanzarote to prawdziwa uczta dla zmysłów, łącząca tradycyjne smaki z lokalnymi składnikami. Na wyspie popularne są dania z ryb, owoców morza oraz mięs, podawane z lokalnymi warzywami i przyprawami. \"Papas arrugadas\" (ziemniaki w mundurkach) z sosem mojo to klasyka, której nie można przegapić. Wina z regionu La Geria, wytwarzane z winorośli rosnących na wulkanicznej glebie, stanowią doskonałe uzupełnienie posiłków, oferując unikalne smaki, które zachwycą nawet najbardziej wymagających koneserów.",
      "p8": "Lanzarote to miejsce, które łączy w sobie niezwykłe naturalne piękno, bogatą kulturę oraz artystyczną duszę. To doskonały wybór zarówno na wakacje, jak i na stałe osiedlenie się w malowniczym otoczeniu. Zapraszamy do odkrywania tej wyjątkowej wyspy, gdzie każdy dzień przynosi nowe inspiracje i niezapomniane wspomnienia!",
      "h1": "Lanzarote – Wyspa Wulkanicznych Cudów i Artystycznych Inspiracji",
      "h2": "Krajobraz i Przyroda",
      "h3": "Klimat",
      "h4": "Kultura i Historia",
      "h5": "Turystyka i Rozrywka",
      "h6": "Flora i Fauna",
      "h7": "Gastronomia",
      "h8": "Podsumowanie"
    },
  
    "fuerteventura": {
      "p1": "Fuerteventura, druga co do wielkości wyspa archipelagu Wysp Kanaryjskich, to prawdziwy raj dla miłośników słońca, plaż i natury. Jej wyjątkowy krajobraz, łagodny klimat oraz bogata oferta rekreacyjna sprawiają, że jest to idealne miejsce zarówno na wakacje, jak i na stałe osiedlenie się.",
      "p2": "Fuerteventura słynie z niekończących się plaż o białym piasku oraz krystalicznie czystych wodach, które przyciągają turystów z całego świata. Długość wybrzeża wynosi ponad 300 kilometrów, co sprawia, że każdy znajdzie idealne miejsce dla siebie – od spokojnych zatok po tętniące życiem plaże. Wnętrze wyspy to także wspaniałe tereny do odkrywania, z malowniczymi wzgórzami i parkami przyrody, takimi jak Parque Natural de Corralejo, gdzie można podziwiać spektakularne wydmy i unikalne ekosystemy.",
      "p3": "Fuerteventura cieszy się łagodnym, półpustynnym klimatem, co czyni ją idealnym miejscem do życia przez cały rok. Średnie temperatury wahają się od 18°C zimą do 26°C latem, co sprawia, że wyspa jest popularnym celem turystycznym, szczególnie w okresie zimowym, gdy inne regiony Europy borykają się z chłodem. Niskie opady deszczu i duża liczba dni słonecznych sprawiają, że Fuerteventura to idealne miejsce na plażowanie i aktywności na świeżym powietrzu.",
      "p4": "Fuerteventura ma bogate dziedzictwo kulturowe, które łączy wpływy rdzennych mieszkańców, hiszpańskich kolonizatorów oraz afrykańskich nomadów. Tradycyjne wioski, takie jak Betancuria, niegdyś stolica wyspy, zachowały swój historyczny urok. Lokalne festiwale, takie jak Fiesta de la Virgen de la Caridad, celebrują kulturę i tradycje wyspy, przyciągając zarówno mieszkańców, jak i turystów. Fuerteventura to także miejsce, gdzie można odkrywać lokalne rzemiosło, takie jak tkactwo i garncarstwo, co dodaje wyjątkowego charakteru tej wyspie.",
      "p5": "Fuerteventura to doskonałe miejsce dla osób poszukujących relaksu oraz aktywnego wypoczynku. Wyspa oferuje szeroki wachlarz atrakcji, takich jak windsurfing, kitesurfing, nurkowanie czy jazda na rowerze. Zatoka Sotavento to jedno z najlepszych miejsc na świecie do uprawiania sportów wodnych, przyciągając zarówno amatorów, jak i profesjonalistów. Oprócz aktywności wodnych, Fuerteventura oferuje także liczne restauracje, bary i kluby, które tętnią życiem, szczególnie w popularnych miejscowościach, takich jak Corralejo i Morro Jable.",
      "p6": "Fuerteventura wyróżnia się unikalnym bogactwem biologicznym, które dostosowało się do surowych warunków wyspy. Wiele gatunków roślin i zwierząt, w tym endemiczne kaktusy i ptaki, można spotkać w parkach narodowych i rezerwatach przyrody. Parque Natural de Jandía, z jego różnorodnymi ekosystemami, to idealne miejsce do obserwacji dzikiej przyrody. Wyspa jest również domem dla licznych gatunków żółwi morskich, które można spotkać w okolicach plaż.",
      "p7": "Kuchnia Fuerteventury to doskonałe połączenie tradycyjnych smaków kanaryjskich z lokalnymi składnikami. Świeże ryby i owoce morza są podstawą wielu potraw, a 'gofio' – mąka z prażonej kukurydzy – jest integralną częścią lokalnej diety. Potrawy takie jak 'papas arrugadas' (ziemniaki gotowane w mundurkach) z sosem mojo cieszą się dużą popularnością. Lokalne wina, produkowane z winorośli rosnących na wulkanicznych glebach, doskonale komponują się z posiłkami, oferując unikalne doznania kulinarne.",
      "p8": "Fuerteventura to wyspa, która zaprasza do odkrywania swoich niezwykłych uroków. Z jej malowniczymi krajobrazami, bogatą kulturą oraz szeroką gamą atrakcji, każdy znajdzie tu coś dla siebie. Niech Fuerteventura stanie się Twoim miejscem na ziemi, gdzie relaks i przygoda idą w parze, a każdy dzień przynosi nowe odkrycia i inspiracje.",
      "h1": "Fuerteventura – Wyspa Spokoju i Pięknych Plaż",
      "h2": "Krajobraz i Przyroda",
      "h3": "Klimat",
      "h4": "Kultura i Historia",
      "h5": "Turystyka i Rozrywka",
      "h6": "Flora i Fauna",
      "h7": "Gastronomia",
      "h8": "Podsumowanie"
    },
    "popular_search": "Popularne Wyszukiwania",
    "villa_in_tenerife": "Willa na Teneryfie",
    "apartment_in_tenerife": "Apartament na Teneryfie",
    "best_offers": "Najlepsze oferty",
    "hot": "Gorące",
    "quick_links": "Szybkie Linki",
    "terms_of_use": "Warunki Użytkowania",
    "privacy_policy": "Polityka Prywatności",
    "our_services": "Nasze Usługi",
    "contact_support": "Skontaktuj się z Pomocą",
    "careers": "Kariera",
    "faqs": "FAQs",
    "discover": "Odkryj",
    "tenerife": "Teneryfa",
    "fuertaventura": "Fuerteventura",
    "gran_canaria": "Gran Canaria",
    "lanzarote1": "Lanzarote",
    "about1": "O nas"
}


// Function to call Google Translation API
async function translateText(text, targetLanguage) {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`,
      {
        q: text,
        target: targetLanguage
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating "${text}" to ${targetLanguage}:`, error.response ? error.response.data : error.message);
    return null; // Return null if translation fails
  }
}

// Recursive function to translate dictionary, including nested objects
async function translateDictionary(dictionary, targetLanguage) {
  const translatedDictionary = {};

  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively translate its keys
      translatedDictionary[key] = await translateDictionary(value, targetLanguage);
    } else {
      // Translate string values
      const translatedText = await translateText(value, targetLanguage);
      translatedDictionary[key] = translatedText || value;
    }
  }

  return translatedDictionary;
}

// Function to write the translated dictionary to a file
function saveToFile(translatedDictionary, languageCode) {
  const fileName = path.join('./public/locales', languageCode, 'translation.json');
  fs.mkdirSync(path.dirname(fileName), { recursive: true }); // Ensure directory exists
  fs.writeFileSync(fileName, JSON.stringify(translatedDictionary, null, 2));
  console.log(`Dictionary saved to ${fileName}`);
}

export default async function handler(req, res) {
  try {
    console.log('Translating dictionary...');

    // Translate dictionary to English
    const englishDictionary = await translateDictionary(dictionary, 'en');
    saveToFile(englishDictionary, 'en');

    // Translate dictionary to Spanish
    const spanishDictionary = await translateDictionary(dictionary, 'es');
    saveToFile(spanishDictionary, 'es');

    res.status(200).json({ message: 'Dictionaries translated and saved successfully.' });
  } catch (error) {
    console.error('Error translating dictionary:', error);
    res.status(500).json({ error: 'Failed to translate dictionary.' });
  }
}