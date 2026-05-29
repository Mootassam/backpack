const pl = {

  common: {
    or: "Lub",
    cancel: "Anuluj",
    reset: "Resetuj",
    save: "Zapisz",
    search: "Szukaj",
    edit: "Edytuj",
    new: "Nowy",
    export: "Eksportuj do Excela",
    noDataToExport: "Brak danych do eksportu",
    import: "Importuj",
    discard: "Odrzuć",
    yes: "Tak",
    no: "Nie",
    pause: "Pauza",
    areYouSure: "Czy jesteś pewien?",
    view: "Wyświetl",
    destroy: "Usuń",
    mustSelectARow: "Musisz wybrać wiersz",
    start: "Start",
    end: "Koniec",
    select: "Wybierz",
    continue: "Kontynuuj",
    filters: "Filtry",
    gallery: "Zdjęcia galerii",
    hightlight: "Wyróżnione",
    attributes: "Atrybuty",
    attributeoptions: "Opcje atrybutów",
    administration: "Administracja",
    community: "Społeczność",
    news: "Aktualności",
    membership: "Członkostwo",
    accounting: "Księgowość",
    selectbank: "Wybierz bank",
    selectsize: "Wybierz rozmiar",
    writeamount: "Wpisz kwotę",
    tools: "Narzędzia",
    brushsize: "Rozmiar pędzla",
    configurations: "Konfiguracje",
    logout: "Wyloguj",
  },

  app: {
    title: "Backpack Exchange",
  },

  api: {
    menu: "API",
  },

  stake: {
    enterAmount: "Wprowadź kwotę",
    insufficientBalance: "Niewystarczające saldo",
    minAmount: "Min: {{min}}",
    maxAmount: "Max: {{max}}",
    confirmStake: "Potwierdź Stake",
  },

  pages: {
    futures: {
      title: "Futures",
      actions: {
        buyUp: "KUP W GÓRĘ",
        buyDown: "KUP W DÓŁ",
      },
      tabs: {
        openOrders: "Otwarte Zlecenia",
        recentOrders: "Ostatnie Zlecenia",
      },
      orderDetails: {
        title: "Szczegóły Zlecenia",
        open: "Otwarte",
        closed: "Zamknięte",
        completed: "Zakończone",
        futuresAmount: "Kwota Futures:",
        contractDuration: "Czas Trwania Kontraktu:",
        seconds: "Sekundy",
        futuresStatus: "Status Futures:",
        openPositionPrice: "Cena Otwarcia Pozycji:",
        openPositionTime: "Czas Otwarcia Pozycji:",
        closePositionPrice: "Cena Zamknięcia Pozycji:",
        closePositionTime: "Czas Zamknięcia Pozycji:",
        profitLossAmount: "Kwota Zysku i Straty:",
        leverage: "Dźwignia:",
        done: "Gotowe",
      },
      status: {
        open: "Otwarte",
        closed: "Zamknięte",
        completed: "Zakończone",
      },
      list: {
        noOrders: "Brak zleceń",
      },
    },

    proof: {
      title: "Weryfikacja Tożsamości",
      instructions: "Zweryfikuj swoją tożsamość, aby uzyskać dostęp do wszystkich funkcji Backpack Exchange",
      sections: {
        documentInfo: "Informacje o Dokumencie",
        documentUpload: "Przesyłanie Dokumentu",
      },
      fields: {
        documentType: "Typ Dokumentu",
        fullName: "Pełne Imię i Nazwisko",
        documentNumber: "Numer Dokumentu",
        address: "Adres",
        frontSide: "Przód Dokumentu",
        backSide: "Tył Dokumentu",
        selfie: "Selfie z Dokumentem",
      },
      placeholders: {
        fullName: "Wprowadź swoje pełne imię i nazwisko",
        documentNumber: "Wprowadź numer dokumentu",
        address: "Wprowadź swój pełny adres",
      },
      uploadTexts: {
        frontSide: "Prześlij przód dokumentu",
        backSide: "Prześlij tył dokumentu",
        selfie: "Prześlij selfie trzymając dokument",
      },
      documentTypes: {
        passport: "Paszport",
        idCard: "Dowód Osobisty",
        driversLicense: "Prawo Jazdy",
      },
      security: {
        title: "Informacja o Bezpieczeństwie",
        text: "Twoje informacje są szyfrowane i bezpieczne. Stosujemy ochronę na poziomie bankowym i ręcznie weryfikujemy każdy dokument dla Twojego bezpieczeństwa.",
      },
      buttons: {
        validateDocuments: "ZWERYFIKUJ DOKUMENTY",
      },
      footer: {
        copyright: "© 2025 CryptoWallet. Wszelkie prawa zastrzeżone.",
        privacyPolicy: "Polityka Prywatności",
      },
    },

    withdrawPassword: {
      title: "Hasło do Wypłaty",
      cardTitle: "ZMIEŃ HASŁO DO WYPŁATY",
      fields: {
        currentPassword: "Aktualne Hasło",
        newPassword: "Nowe Hasło",
      },
      placeholders: {
        currentPassword: "Wprowadź stare hasło",
        newPassword: "Potwierdź nowe hasło",
      },
      buttons: {
        saveChanges: "ZAPISZ ZMIANY",
      },
      warningMessage: "Dla bezpieczeństwa Twoich środków wypłaty są niedozwolone przez 24 godziny po zmianie hasła logowania.",
    },

    loginPassword: {
      title: "Hasło Logowania",
      cardTitle: "ZMIEŃ HASŁO LOGOWANIA",
      fields: {
        oldPassword: "Stare Hasło",
        newPassword: "Nowe Hasło",
        newPasswordConfirmation: "Potwierdź Hasło",
      },
      placeholders: {
        oldPassword: "Wprowadź aktualne hasło",
        newPassword: "Utwórz nowe hasło",
        confirmPassword: "Potwierdź nowe hasło",
      },
      buttons: {
        saveChanges: "ZAPISZ ZMIANY",
      },
      warningMessage: "Dla bezpieczeństwa Twoich środków wypłaty są niedozwolone przez 24 godziny po zmianie hasła logowania.",
      validation: {
        mustMatch: "Hasła muszą być zgodne",
      },
    },

    passwordType: {
      title: "Typ Hasła",
      cardTitle: "WYBIERZ TYP HASŁA",
      options: {
        login: {
          title: "Hasło Logowania",
          description: "Zmień hasło logowania do konta",
        },
        withdrawal: {
          title: "Hasło do Wypłaty",
          description: "Zmień hasło do wypłaty kryptowalut",
        },
      },
    },

    withdrawAddressForm: {
      title: "Adres Wypłaty",
      currencyType: "TYP WALUTY",
      withdrawalAddress: "ADRES WYPŁATY",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        usdt: "USDT (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)",
      },
      fields: {
        address: "Adres",
        password: "Hasło do Wypłaty Krypto",
      },
      placeholders: {
        address: "Wprowadź adres portfela",
        password: "Wprowadź aktualne hasło",
      },
      buttons: {
        save: "ZAPISZ",
      },
      notification: {
        success: "Adres zapisany pomyślnie!",
      },
    },

    withdrawAddress: {
      title: "Adres Wypłaty",
      cardTitle: "TYP WALUTY",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        usdt: "USDT (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)",
      },
    },

    privacy: {
      title: "Portal Prywatności",
      hero: {
        title: "Portal Prywatności Backpack",
        subtitle: "Ochrona Twoich danych i prywatności dzięki ścisłym wytycznym, zgodności prawnej i najlepszym praktykom branżowym.",
      },
      principles: {
        title: "Nasze Zasady Prywatności",
        corePrinciples: "Podstawowe Zasady",
        transparency: {
          title: "Przejrzystość",
          description: "Regularne aktualizacje i jasne informacje o tym, jak przetwarzamy Twoje dane.",
        },
        accountability: {
          title: "Odpowiedzialność i Zgodność",
          description: "Regularne audyty, certyfikacje i przestrzeganie globalnych przepisów o ochronie prywatności.",
        },
        dataSecurity: {
          title: "Bezpieczeństwo Danych",
          description: "Zaawansowane szyfrowanie, ścisła kontrola dostępu i protokoły weryfikacji tożsamości.",
        },
        dataMinimization: {
          title: "Minimalizacja i Ograniczenie Celu Danych",
          description: "Zbieramy tylko to, co jest niezbędne do określonych, uzasadnionych celów.",
        },
        privacyByDesign: {
          title: "Prywatność przez Projekt",
          description: "Prywatność jest wbudowana we wszystkie nasze produkty i usługi od podstaw.",
        },
      },
      userRights: {
        title: "Twoje Prawa do Prywatności",
        content: "Masz dostęp do narzędzi umożliwiających dostęp i zarządzanie Twoimi danymi za pośrednictwem naszej aplikacji lub formularza internetowego, ze szczegółowymi informacjami dostępnymi w naszym Komunikacie o Prywatności.",
        note: "Korzystaj z prawa dostępu, poprawiania lub usuwania swoich danych osobowych w dowolnym momencie.",
      },
      personalData: {
        title: "Co to są Dane Osobowe?",
        definition: "Dane osobowe odnoszą się do wszelkich informacji identyfikujących osobę fizyczną.",
        examples: "Przykłady: imię i nazwisko, identyfikator Backpack, adres e-mail, dane lokalizacyjne, historia transakcji i informacje o urządzeniu.",
      },
      dataUsage: {
        title: "Jak Używamy Twoich Danych",
        accountManagement: {
          title: "Zarządzanie Kontem",
          description: "Aby tworzyć i utrzymywać Twoje konto, świadczyć usługi i komunikować się z Tobą.",
        },
        legalCompliance: {
          title: "Zgodność Prawna",
          description: "Aby wypełniać nasze zobowiązania wynikające z obowiązujących przepisów, w tym przepisów dotyczących przeciwdziałania praniu pieniędzy (AML).",
        },
        securityFraud: {
          title: "Bezpieczeństwo i Zapobieganie Oszustwom",
          description: "Aby chronić Twoje konto, wykrywać i zapobiegać oszustwom oraz zapewnić bezpieczeństwo platformy.",
        },
        customerSupport: {
          title: "Obsługa Klienta",
          description: "Aby odpowiadać na Twoje zapytania i zapewniać pomoc techniczną w razie potrzeby.",
        },
        marketing: {
          title: "Marketing i Komunikacja",
          description: "Aby wysyłać Ci odpowiednie aktualizacje, informacje o produktach i materiały promocyjne (za Twoją zgodą).",
        },
        transactionProcessing: {
          title: "Przetwarzanie Transakcji",
          description: "Aby ułatwiać transakcje kryptowalutowe i prowadzić rejestry transakcji.",
        },
      },
      dataRetention: {
        title: "Przechowywanie Danych",
        content: "Przechowujemy Twoje dane tak długo, jak jest to konieczne do świadczenia naszych usług, spełniania zobowiązań prawnych (takich jak wymogi podatkowe i AML), rozstrzygania sporów i egzekwowania naszych umów.",
      },
      dataSharing: {
        title: "Udostępnianie Danych",
        content: "Możemy udostępniać Twoje dane innym podmiotom Backpack lub zaufanym stronom trzecim z zachowaniem ścisłych zabezpieczeń umownych, tylko gdy jest to niezbędne dla celów określonych w naszym Komunikacie o Prywatności.",
      },
      cookies: {
        title: "Pliki Cookie i Śledzenie",
        content: "Używamy plików cookie i podobnych technologii, aby poprawić Twoje doświadczenia użytkownika, dostarczać spersonalizowany marketing i analizować sposób korzystania z naszych usług.",
        link: "Zobacz naszą pełną Politykę Cookie",
      },
      actionCards: {
        privacyNotice: {
          title: "Komunikat o Prywatności",
          description: "Przeczytaj naszą pełną politykę prywatności",
        },
        manageData: {
          title: "Zarządzaj Danymi",
          description: "Uzyskaj dostęp i kontroluj swoje informacje",
        },
        cookieSettings: {
          title: "Ustawienia Cookie",
          description: "Dostosuj preferencje śledzenia",
        },
        helpCenter: {
          title: "Centrum Pomocy",
          description: "Uzyskaj odpowiedzi na pytania dotyczące prywatności",
        },
      },
      notification: "Akcja zakończona pomyślnie!",
    },

    termsOfUse: {
      title: "Warunki Użytkowania",
      hero: {
        title: "Warunki Użytkowania Backpack",
      },
      agreement: {
        title: "Umowa",
        content: "Jest to wiążąca umowa między Tobą (użytkownikiem) a Backpack. Obejmuje wszystkie usługi Backpack, do których uzyskujesz dostęp lub z których korzystasz.",
      },
      riskWarning: {
        title: "Ostrzeżenie o Ryzyku",
        content: "Aktywa cyfrowe są zmienne i mogą znacznie wahać się w wartości. Backpack nie jest brokerem, doradcą finansowym ani doradcą inwestycyjnym. Przed podjęciem jakichkolwiek decyzji finansowych musisz przeprowadzić własną należytą staranność.",
      },
      aboutServices: {
        title: "O Naszych Usługach",
        aboutBackpack: {
          title: "O Backpack",
          content: "Backpack zapewnia wymianę aktywów cyfrowych, usługi przechowywania i powiązane usługi finansowe za pośrednictwem naszej platformy.",
        },
        eligibility: {
          title: "Kwalifikowalność",
          content: "Musisz mieć co najmniej 18 lat, być prawnie zdolnym do zawierania umów, nie mieć ograniczeń w korzystaniu z naszych usług i nie znajdować się w zabronionych jurysdykcjach.",
        },
        communication: {
          title: "Komunikacja",
          content: "Musisz aktualizować swoje dane kontaktowe. Backpack będzie kontaktować się z Tobą przez e-mail, SMS lub telefon w sprawach dotyczących Twojego konta i naszych usług.",
        },
      },
      services: {
        title: "Nasze Usługi",
        servicesProvided: {
          title: "Świadczone Usługi",
          content: "Backpack oferuje handel aktywami cyfrowymi, bezpieczne rozwiązania przechowywania i obsługę klienta zarówno przez automatyczne boty, jak i ludzkich przedstawicieli. Dostępna jest również funkcja czatu użytkownika.",
        },
        fees: {
          title: "Opłaty",
          content: "Wszystkie obowiązujące opłaty są wymienione na stronie Struktury Opłat i podlegają aktualizacjom. Jesteś odpowiedzialny za zapoznanie się z aktualnym harmonogramem opłat przed dokonaniem transakcji.",
        },
      },
      accountManagement: {
        title: "Zarządzanie Kontem",
        accountCreation: {
          title: "Tworzenie Konta",
          content: "Musisz otworzyć konto (indywidualne lub korporacyjne), aby uzyskać dostęp do naszych usług. Wymaga to ukończenia procedur weryfikacji tożsamości (KYC/AML) zgodnie z wymogami prawnymi.",
        },
        identityVerification: {
          title: "Weryfikacja Tożsamości",
          content: "Musisz ukończyć nasze procesy weryfikacji Poznaj Swojego Klienta (KYC) i Przeciwdziałania Praniu Pieniędzy (AML) przed skorzystaniem z niektórych usług.",
        },
        accountRecords: {
          title: "Rejestry Konta",
          content: "Możesz prowadzić rejestry i tworzyć subkonta w określonych warunkach określonych w naszych zasadach zarządzania kontem.",
        },
      },
      transactions: {
        title: "Transakcje",
        sufficientBalance: {
          title: "Wystarczające Saldo",
          content: "Musisz utrzymywać wystarczające saldo na koncie dla każdej zainicjowanej transakcji. Transakcje mogą się nie powieść lub pociągnąć dodatkowe opłaty, jeśli dostępne środki są niewystarczające.",
        },
        transactionCancellation: {
          title: "Anulowanie Transakcji",
          content: "Backpack zastrzega sobie prawo do anulowania lub zmiany transakcji w przypadkach podejrzanego oszustwa, błędów lub naruszenia niniejszych Warunków.",
        },
        unauthorizedTransactions: {
          title: "Nieautoryzowane Transakcje",
          content: "Jesteś odpowiedzialny za wszelkie nieautoryzowane transakcje, chyba że możesz udowodnić inaczej poprzez nasz proces rozstrzygania sporów.",
        },
      },
      digitalAssets: {
        title: "Aktywa Cyfrowe",
        supportedAssets: {
          title: "Obsługiwane Aktywa",
          content: "Możesz dokonywać transakcji tylko z aktywami cyfrowymi wyraźnie obsługiwanymi przez Backpack. Próba wpłaty nieobsługiwanych aktywów może skutkować trwałą utratą.",
        },
        forksAirdrops: {
          title: "Forki i Airdropy",
          content: "Backpack nie gwarantuje wsparcia dla forków blockchain, airdropów ani innych podobnych zdarzeń. Decyzje dotyczące wsparcia są podejmowane według naszego wyłącznego uznania.",
        },
      },
      accountSecurity: {
        title: "Bezpieczeństwo Konta",
        securityRequirements: {
          title: "Wymagania Bezpieczeństwa",
          content: "Musisz używać silnego hasła, włączyć uwierzytelnianie wieloskładnikowe (MFA), nigdy nie udostępniać danych uwierzytelniających, regularnie monitorować aktywność konta i natychmiast zgłaszać wszelkie naruszenia bezpieczeństwa.",
        },
      },
      privacy: {
        title: "Prywatność",
        content: "Twoja prywatność jest regulowana przez Komunikat o Prywatności Backpack, który wyjaśnia, jak zbieramy, używamy i chronimy Twoje dane osobowe.",
      },
      termination: {
        title: "Zakończenie Konta",
        terminationSuspension: {
          title: "Zakończenie/Zawieszenie",
          content: "Backpack może ograniczyć, zawiesić lub zakończyć konta w przypadku oszustwa, naruszenia prawa, podejrzanej działalności lub naruszenia Warunków. Użytkownicy mogą zamknąć konta, chyba że są zablokowane lub nieaktywne.",
        },
      },
      prohibitedUse: {
        title: "Zabronione Użycie",
        content: "Nie możesz używać usług Backpack do oszustw, manipulacji rynkowej, nielegalnych działań, nieautoryzowanego dostępu ani żadnego celu naruszającego obowiązujące przepisy lub niniejsze Warunki.",
      },
      liability: {
        title: "Odpowiedzialność i Własność Intelektualna",
        liability: {
          title: "Odpowiedzialność",
          content: "Backpack nie ponosi odpowiedzialności za straty z wyjątkiem przypadków udowodnionego rażącego zaniedbania lub oszustwa. Nie ponosimy odpowiedzialności za wahania rynku, problemy techniczne ani działania stron trzecich.",
        },
        intellectualProperty: {
          title: "Własność Intelektualna",
          content: "Backpack zachowuje wszystkie prawa własności intelektualnej do naszej platformy, technologii i marki. Użytkownicy otrzymują ograniczoną licencję na korzystanie z naszych usług zgodnie z niniejszymi Warunkami.",
        },
        indemnity: {
          title: "Odszkodowanie",
          content: "Zgadzasz się zabezpieczyć i zwolnić Backpack z odpowiedzialności za wszelkie roszczenia, straty lub szkody wynikające z niewłaściwego korzystania z naszych usług lub naruszenia niniejszych Warunków.",
        },
      },
      importantNotice: {
        title: "Ważna Informacja",
        content: "Korzystając z usług Backpack, potwierdzasz, że przeczytałeś, zrozumiałeś i zgadzasz się być związany niniejszymi Warunkami Użytkowania. Jeśli nie wyrażasz zgody, musisz natychmiast zaprzestać korzystania z naszych usług.",
      },
      actionCards: {
        security: {
          title: "Bezpieczeństwo",
          description: "Zadbaj o bezpieczeństwo swojego konta.",
        },
        helpCenter: {
          title: "Centrum Pomocy",
          description: "Uzyskaj odpowiedzi na swoje pytania",
        },
        privacyPolicy: {
          title: "Polityka Prywatności",
          description: "Zapoznaj się z naszymi praktykami prywatności",
        },
        legal: {
          title: "Prawne",
          description: "Zobacz wszystkie dokumenty prawne",
        },
      },
      footer: {
        copyright: "© 2025 Backpack Exchange. Wszelkie prawa zastrzeżone.",
        lastUpdated: "Ostatnia aktualizacja: 6 maja 2025",
      },
    },

    marketDetail: {
      stats: {
        high: "Wysoki 24h",
        low: "Niski 24h",
        volume: "Vol 24h",
      },
      volume: {
        billion: "mld",
        million: "mln",
      },
      actions: {
        buy: "KUP",
        sell: "SPRZEDAJ",
      },
      recentTrades: {
        title: "Ostatnie Transakcje (Na Żywo)",
        price: "Cena (USDT)",
        amount: "Ilość",
        time: "Czas",
      },
    },

    assetsDetail: {
      title: "Szczegóły Aktywu",
      today: "Dzisiaj",
      yesterday: "Wczoraj",
      filter: "Filtruj",
      transactionHistory: {
        title: "Historia Transakcji",
      },
      noTransactions: {
        title: "Brak Transakcji",
        description: "Historia transakcji pojawi się tutaj po rozpoczęciu handlu.",
      },
      status: {
        completed: "Zakończone",
        pending: "Oczekujące",
        canceled: "Anulowane",
        success: "Sukces",
      },
      filterModal: {
        title: "Filtruj Transakcje",
        status: "Status",
        type: "Typ",
        direction: "Kierunek",
        startDate: "Data Początkowa",
        endDate: "Data Końcowa",
        allStatuses: "Wszystkie Statusy",
        allTypes: "Wszystkie Typy",
        bothDirections: "Oba Kierunki",
        incoming: "Przychodzące",
        outgoing: "Wychodzące",
        completed: "Zakończone",
        pending: "Oczekujące",
        canceled: "Anulowane",
        resetFilters: "Resetuj Filtry",
        applyFilters: "Zastosuj Filtry",
      },
      actions: {
        deposit: "Wpłata",
        withdraw: "Wypłata",
      },
      transactionTypes: {
        transaction: "Transakcja",
        deposit: "Wpłata",
        withdrawal: "Wypłata",
        convertedFrom: "Skonwertowane z {0}",
        convertedTo: "Skonwertowane na {0}",
        conversionIn: "Konwersja Wchodząca",
        conversionOut: "Konwersja Wychodząca",
        stakedAmount: "Kwota Stakowana",
        stakingRewards: "Nagrody Stakingowe",
        futuresReserved: "Zarezerwowane Futures",
        futuresProfit: "Zysk Futures",
        futuresLoss: "Strata Futures",
        futuresSettlement: "Rozliczenie Futures",
        futuresFee: "Opłata Futures",
        futuresRefund: "Zwrot Futures",
        futuresBonus: "Bonus Futures",
        futuresCommission: "Prowizja Futures",
        manualProfit: "Zysk Ręczny",
        manualLoss: "Strata Ręczna",
        manualAdjustment: "Ręczna Korekta",
        spotTradingProfit: "Zysk z Handlu Spot",
        spotTradingLoss: "Strata z Handlu Spot",
        referralReward: "Nagroda za Polecenie",
        bonus: "Bonus",
        referralCommission: "Prowizja za Polecenie",
        orderReserved: "Zlecenie Zarezerwowane",
        orderCancelled: "Zlecenie Anulowane",
        orderPartialFill: "Częściowe Wykonanie Zlecenia",
        orderCompleted: "Zlecenie Zakończone",
        feePayment: "Płatność Opłaty",
        balanceAdjustment: "Korekta Salda",
        transfer: "Przelew",
      },
    },

    invitation: {
      title: "Zaproś Znajomych",
      earnTogether: "Zarabiajcie Razem",
      description: "Zaproś znajomych do Backpack i zdobywaj nagrody, gdy zarejestrują się i zaczną handlować.",
      yourReferralCode: "TWÓJ KOD POLECAJĄCY",
      loading: "Ładowanie...",
      copied: "SKOPIOWANO!",
      copyCode: "KOPIUJ KOD",
      totalEarned: "Łącznie Zarobione",
      allTimeCommission: "Łączna Prowizja",
      generationMembers: "Członkowie Generacji",
      noGenerationData: "Brak danych generacji",
      approvedMembers: "Zatwierdzeni Członkowie",
      pendingMembers: "Oczekujący Członkowie",
      commissionStructure: "Struktura Prowizji",
      firstGeneration: "1. Generacja",
      secondGeneration: "2. Generacja",
      thirdGeneration: "3. Generacja",
      firstDepositCommission: "Prowizja od Pierwszej Wpłaty",
      stakingProfitsCommission: "Prowizja od Zysków Stakingowych",
      howItWorks: "Jak to Działa",
      steps: {
        shareCode: {
          title: "Udostępnij Swój Kod Polecający",
          description: "Wyślij swój unikalny kod znajomym lub udostępnij go w mediach społecznościowych.",
        },
        friendsSignUp: {
          title: "Znajomi Rejestrują Się",
          description: "Twoi znajomi rejestrują się używając Twojego kodu polecającego i weryfikują swoje konta.",
        },
        earnCommissions: {
          title: "Zdobywaj Prowizje",
          description: "Zdobywaj prowizje od pierwszych wpłat i zysków stakingowych swojej sieci.",
        },
      },
      referralCopied: "Kod polecający skopiowany do schowka!",
      loadingMembers: "Ładowanie członków...",
      approved: "Zatwierdzony",
      joined: "Dołączył",
      noMembersFound: "Nie znaleziono członków",
    },

    securityTips: {
      title: "Centrum Bezpieczeństwa",
      essentialTips: "Podstawowe Wskazówki Bezpieczeństwa",
      categories: {
        passwordSecurity: "Bezpieczeństwo Haseł",
        deviceSecurity: "Bezpieczeństwo Urządzeń",
        accountSecurity: "Bezpieczeństwo Konta",
      },
      tips: {
        strongPasswords: {
          title: "Używaj Silnych, Unikalnych Haseł",
          description: "Twórz złożone hasła z dużymi literami, małymi literami, cyframi i symbolami.",
        },
        enable2FA: {
          title: "Włącz Uwierzytelnianie Dwuskładnikowe",
          description: "Dodaj dodatkową warstwę bezpieczeństwa do swojego konta za pomocą 2FA.",
        },
        changePasswords: {
          title: "Regularnie Zmieniaj Hasła",
          description: "Aktualizuj hasła co 3–6 miesięcy.",
        },
        softwareUpdated: {
          title: "Aktualizuj Oprogramowanie",
          description: "Regularnie aktualizuj swój system operacyjny, przeglądarkę i oprogramowanie portfela.",
        },
        antivirus: {
          title: "Używaj Ochrony Antywirusowej",
          description: "Zainstaluj renomowane oprogramowanie antywirusowe i chroniące przed złośliwym oprogramowaniem.",
        },
        publicWifi: {
          title: "Unikaj Publicznego Wi-Fi",
          description: "Nigdy nie uzyskuj dostępu do portfela w sieciach publicznych bez VPN.",
        },
        loginNotifications: {
          title: "Włącz Powiadomienia o Logowaniu",
          description: "Otrzymuj alerty o nowych logowaniach na swoje konto.",
        },
        reviewActivity: {
          title: "Przeglądaj Aktywność Konta",
          description: "Regularnie sprawdzaj konto pod kątem podejrzanej aktywności.",
        },
        whitelisting: {
          title: "Używaj Białej Listy",
          description: "Umieść zaufane adresy wypłat na białej liście dla dodatkowego bezpieczeństwa.",
        },
      },
      actions: {
        enable2FA: "Włącz 2FA",
        enable2FADesc: "Dodaj dodatkową warstwę bezpieczeństwa",
        activityLog: "Dziennik Aktywności",
        activityLogDesc: "Przejrzyj ostatnią aktywność konta",
        settings: "Ustawienia",
        settingsDesc: "Skonfiguruj preferencje bezpieczeństwa",
        backupCodes: "Kody Zapasowe",
        backupCodesDesc: "Zapisz swoje kody odzyskiwania",
      },
      emergency: {
        title: "Procedury Awaryjne",
        unauthorizedAccess: "Jeśli podejrzewasz nieautoryzowany dostęp do konta, natychmiast zmień hasło i włącz 2FA, jeśli nie jest jeszcze aktywne.",
        lostDevice: "Jeśli Twoje urządzenie zostało zgubione lub skradzione, natychmiast unieważnij dostęp do sesji z poziomu ustawień konta.",
        phishing: "Jeśli padłeś ofiarą próby phishingu, zablokuj konto i natychmiast skontaktuj się z pomocą techniczną.",
        supportTitle: "Całodobowe Wsparcie Bezpieczeństwa",
        supportEmail: "support@Backpack-exchange.com",
      },
      resources: {
        title: "Zasoby Bezpieczeństwa",
        securityGuide: "Przewodnik Bezpieczeństwa",
        securityGuideLink: "Przeczytaj kompleksową dokumentację bezpieczeństwa",
        learningCenter: "Centrum Nauki",
        learningCenterLink: "Dowiedz się o najlepszych praktykach bezpieczeństwa krypto",
        faq: "FAQ",
        faqLink: "Znajdź odpowiedzi na typowe pytania dotyczące bezpieczeństwa",
      },
    },

    profile: {
      title: "Profil",
      settings: "Ustawienia",
      status: {
        verified: "ZWERYFIKOWANY",
        unverified: "NIEZWERYFIKOWANY",
      },
      accountInfo: {
        title: "INFORMACJE O KONCIE",
        email: "E-mail",
        creditScore: "Ocena Kredytowa",
        invitationCode: "Kod Zaproszenia",
      },
      verification: {
        pending: {
          title: "Weryfikacja Oczekuje",
          description: "Weryfikacja konta jest w toku. Zazwyczaj trwa 1–3 dni robocze.",
        },
        alert: {
          title: "Konto Niezweryfikowane",
          description: "Zweryfikuj konto, aby odblokować wszystkie funkcje i wyższe limity",
          verifyNow: "Zweryfikuj Teraz",
        },
      },
      pendingVerifications: {
        title: "OCZEKUJĄCE WERYFIKACJE",
        identity: {
          title: "Weryfikacja Tożsamości",
          description: "Prześlij swój dowód tożsamości",
        },
        address: {
          title: "Weryfikacja Adresu",
          description: "Zweryfikuj swoje miejsce zamieszkania",
        },
        status: {
          pending: "Oczekujące",
        },
      },
      approvedVerifications: {
        title: "WERYFIKACJE ZATWIERDZONE",
        identity: {
          title: "Weryfikacja Tożsamości",
        },
        address: {
          title: "Weryfikacja Adresu",
        },
        status: {
          completed: "Zakończone",
        },
      },
      limitations: {
        title: "Ograniczenia Konta",
        withdrawalLimit: "Limit wypłat: 1000 USD dziennie",
        stakingLimited: "Ograniczone opcje stakingu",
        advancedTrading: "Zaawansowane funkcje handlowe wyłączone",
        fiatDeposits: "Wpłaty w walutach fiducjarnych niedostępne",
      },
      menu: {
        withdrawalAddress: "Adres Wypłaty",
        password: "Hasło",
        notifications: "Powiadomienia",
        myInvitation: "Moje Zaproszenie",
        language: "Język",
        termsOfUse: "Warunki Użytkowania",
        privacyPortal: "Portal Prywatności",
        aboutUs: "O Nas",
        msbApproval: "Zatwierdzenie MSB",
        customerSupport: "Obsługa Klienta",
        downloadApp: "Pobierz Aplikację",
        logout: "Wyloguj",
      },
    },

    notification: {
      title: "Powiadomienie",
      loading: "Ładowanie",
      filters: {
        all: "Wszystkie",
        unread: "Nieprzeczytane",
        read: "Przeczytane",
      },
      emptyState: {
        title: "Brak powiadomień",
        noNotifications: "Nie masz jeszcze żadnych powiadomień",
        noFilteredNotifications: "Nie znaleziono powiadomień {0}",
      },
      types: {
        deposit: {
          title: "Wpłata Otrzymana",
          message: "Twoja wpłata w wysokości {0} została potwierdzona i zaksięgowana na Twoim portfelu.",
        },
        withdraw: {
          title: "Wypłata Pomyślna",
          message: "Twoja wypłata w wysokości {0} została przetworzona pomyślnie.",
        },
        staking: {
          title: "Zysk ze Stakingu",
          message: "Zarobiłeś {0} z nagród stakingowych.",
        },
        kyc: {
          title: "Aktualizacja KYC",
          defaultMessage: "Twoje konto zostało aktywowane.",
        },
        commission: {
          title: "Prowizja Otrzymana",
          message: "Otrzymałeś prowizję w wysokości {0}.",
        },
        futures: {
          title: "Aktualizacja Futures",
          message: "Twoja transakcja futures na kwotę {0} została wykonana.",
        },
        accountActivated: {
          title: "Weryfikacja KYC",
          message: "Witaj {0}, Twoje dokumenty KYC zostały zweryfikowane, możesz teraz korzystać z nieograniczonych funkcji na Backpack Exchange",
        },
        custom: {
          title: "Powiadomienie",
          defaultMessage: "Masz nowe powiadomienie.",
        },
        cancelDeposit: {
          title: "Wpłata Anulowana",
          message: "Twoja wpłata w wysokości {0} została anulowana.",
        },
        cancelWithdraw: {
          title: "Wypłata Anulowana",
          message: "Twoja wypłata w wysokości {0} została anulowana.",
        },
        cancelActivated: {
          title: "Aktywacja Anulowana",
          message: "Twoje KYC zostało odrzucone przez system, spróbuj ponownie lub skontaktuj się z Obsługą Klienta po pomoc",
        },
      },
    },

    staking: {
      title: "Staking",
      totalStakedBalance: "Łączne Saldo Stakowane",
      earned: "zarobione",
      tabs: {
        options: "Opcje",
        active: "Aktywne Stake",
        completed: "Zakończone",
      },
      daily: "Dziennie",
      minimumStake: "Minimalny Stake",
      unstakingPeriod: "Okres Odblokowania",
      days: "dni",
      stakeButton: "Stakuj {0}",
      status: {
        active: "AKTYWNY",
        completed: "ZAKOŃCZONY",
      },
      remaining: "Pozostało",
      dailyRate: "Dzienna Stopa",
      duration: "Czas Trwania",
      createdAt: "Utworzono",
      dateFinish: "Data Zakończenia",
      totalCompletedRewards: "ŁĄCZNE ZAKOŃCZONE NAGRODY",
      stake: "STAKUJ",
      stakes: "STAKE",
      allRewardsFromCompleted: "Wszystkie nagrody z zakończonych stake",
      totalRewardsEarned: "ŁĄCZNIE ZAROBIONE NAGRODY",
      balance: "Saldo",
      maximumStake: "Maksymalny Stake",
      estimatedTotalRewards: "Szacowane Łączne Nagrody",
      exploreStakingOptions: "Przeglądaj Opcje Stakingu",
      startStaking: "Rozpocznij Staking",
      emptyStates: {
        options: {
          title: "Brak Dostępnych Planów Stakingu",
          message: "Aktualnie nie ma dostępnych planów stakingu. Sprawdź ponownie później, aby znaleźć nowe możliwości stakingu.",
        },
        active: {
          title: "Brak Aktywnych Stake",
          message: "Nie masz jeszcze żadnych aktywnych stake. Rozpocznij staking, aby zarabiać nagrody na swoich aktywach krypto.",
        },
        completed: {
          title: "Brak Zakończonych Stake",
          message: "Nie ukończyłeś jeszcze żadnych stake. Twoje zakończone stake pojawią się tutaj po zakończeniu.",
        },
      },
      stakeModal: {
        title: "Stake",
        amountToStake: "Kwota do Stakowania",
        enterAmount: "Wprowadź Kwotę",
      },
    },

    conversion: {
      title: "Konwertuj Krypto",
      loading: "Ładowanie najnowszych cen...",
      youSend: "Wysyłasz",
      youReceive: "Otrzymujesz",
      balance: "Saldo",
      max: "MAX",
      insufficientBalance: "Niewystarczające saldo",
      estimatedConversion: "Szacowana konwersja",
      selectDifferentCurrencies: "Wybierz różne waluty",
      convertNow: "Konwertuj Teraz",
      pricesUpdate: "Ceny aktualizują się w czasie rzeczywistym",
      selectCurrency: "Wybierz Walutę",
      searchCurrencies: "Szukaj walut...",
      confirmConversion: "Potwierdź Konwersję",
      conversionDetails: "Szczegóły Konwersji",
      exchangeRate: "Kurs Wymiany",
      networkFee: "Opłata Sieciowa",
      estimatedArrival: "Szacowany Czas Przybycia",
      arrivalTime: "~30 sekund",
      processingConversion: "Przetwarzanie Konwersji...",
      cancel: "Anuluj",
    },

    history: {
      title: "Historia Transakcji",
      emptyState: {
        title: "Nie znaleziono transakcji",
        description: "Spróbuj zmienić filtry, aby zobaczyć więcej transakcji",
      },
      filters: {
        all: "Wszystkie",
        deposits: "Wpłaty",
        withdrawals: "Wypłaty",
        profits: "Zyski",
        losses: "Straty",
        conversions: "Konwersje",
        stacking: "Staking",
      },
      statusFilters: {
        allStatus: "Wszystkie Statusy",
        completed: "Zakończone",
        pending: "Oczekujące",
        canceled: "Anulowane",
      },
      timeFilters: {
        allTime: "Cały Czas",
        today: "Dzisiaj",
        week: "Tydzień",
        month: "Miesiąc",
        year: "Rok",
      },
      status: {
        completed: "Zakończone",
        pending: "Oczekujące",
        canceled: "Anulowane",
        success: "Sukces",
      },
      dateFormats: {
        today: "Dzisiaj, {0}",
        yesterday: "Wczoraj, {0}",
      },
      transactionTypes: {
        transaction: "Transakcja",
        deposit: "Wpłata",
        withdrawal: "Wypłata",
        convertedFrom: "Skonwertowane z {0}",
        convertedTo: "Skonwertowane na {0}",
        conversionIn: "Konwersja Wchodząca",
        conversionOut: "Konwersja Wychodząca",
        stakedAmount: "Kwota Stakowana",
        stakingRewards: "Nagrody Stakingowe",
        futuresReserved: "Zarezerwowane Futures",
        futuresProfit: "Zysk Futures",
        futuresLoss: "Strata Futures",
        futuresSettlement: "Rozliczenie Futures",
        futuresFee: "Opłata Futures",
        futuresRefund: "Zwrot Futures",
        futuresBonus: "Bonus Futures",
        futuresCommission: "Prowizja Futures",
        manualProfit: "Zysk Ręczny",
        manualLoss: "Strata Ręczna",
        manualAdjustment: "Ręczna Korekta",
        spotTradingProfit: "Zysk z Handlu Spot",
        spotTradingLoss: "Strata z Handlu Spot",
        referralReward: "Nagroda za Polecenie",
        bonus: "Bonus",
        referralCommission: "Prowizja za Polecenie",
        orderReserved: "Zlecenie Zarezerwowane",
        orderCancelled: "Zlecenie Anulowane",
        orderPartialFill: "Częściowe Wykonanie Zlecenia",
        orderCompleted: "Zlecenie Zakończone",
        feePayment: "Płatność Opłaty",
        balanceAdjustment: "Korekta Salda",
        transfer: "Przelew",
      },
    },

    withdraw: {
      title: "Wypłać Krypto",
      selectCurrency: "Wybierz Walutę",
      selectPlaceholder: "Wybierz walutę",
      selectHint: "Wybierz walutę, aby kontynuować",
      withdrawalAddress: "Adres Wypłaty",
      withdrawalAmount: "Kwota Wypłaty",
      withdrawalPassword: "Hasło do Wypłaty",
      passwordPlaceholder: "Wprowadź hasło do wypłaty",
      available: "Dostępne",
      amountWithdrawal: "Kwota wypłaty",
      minimumWithdrawal: "Minimalna wypłata",
      networkFee: "Opłata sieciowa",
      youWillReceive: "Otrzymasz",
      confirmWithdrawal: "Potwierdź Wypłatę",
      processing: "Przetwarzanie...",
      securityVerification: "Weryfikacja Bezpieczeństwa",
      securityMessage: "Dla Twojego bezpieczeństwa wypłaty wymagają potwierdzenia hasłem i mogą podlegać przeglądowi. Wypłat na nieprawidłowe adresy nie można cofnąć.",
      networkInfo: "Sieć: {0} ({1})",
      noWalletAddress: "(Brak adresu portfela)",
      noWallet: {
        title: "Nie Znaleziono Adresu Portfela",
        description: "Nie dodałeś jeszcze żadnych adresów portfela. Dodaj adres wypłaty, aby kontynuować transakcję.",
        addButton: "Dodaj Adres Portfela",
      },
      security: {
        title: "Bezpieczeństwo Przede Wszystkim",
        description: "Dla Twojego bezpieczeństwa wymagamy zweryfikowanego adresu wypłaty dla każdej kryptowaluty. Pomaga to zapobiegać błędom i zapewnia, że Twoje środki trafiają do właściwego miejsca docelowego.",
      },
      errors: {
        amountNumber: "Kwota wypłaty musi być liczbą",
        amountRequired: "Kwota wypłaty jest wymagana",
        amountPositive: "Kwota wypłaty musi być większa od 0",
        amountMin: "Kwota jest poniżej minimalnej wypłaty dla tej waluty",
        passwordRequired: "Hasło do wypłaty jest wymagane",
        noWalletAddress: "Nie znaleziono adresu portfela dla {0}. Najpierw dodaj adres portfela.",
        minimumWithdraw: "Minimalna wypłata dla {0}: {1} {2}",
        insufficientForFee: "Niewystarczające saldo na pokrycie opłaty ({0} {1})",
      },
      validation: {
        selectCurrency: "Wybierz walutę",
        enterAmount: "Wprowadź kwotę",
        belowMin: "Poniżej minimum ({0} {1})",
        insufficientBalance: "Niewystarczające saldo",
        insufficientForFee: "Niewystarczające saldo (łącznie z opłatą)",
        enterPassword: "Wprowadź hasło",
      },
    },

    deposit: {
      title: "Wpłać Krypto",
      loading: "Ładowanie metody wpłaty ...",
      selectNetwork: "Wybierz Sieć",
      depositAddress: "Twój adres wpłaty",
      copyAddress: "Kopiuj Adres",
      amountLabel: "Kwota wpłaty ({0})",
      amountPlaceholder: "Minimum: {0} {1}",
      txidLabel: "ID Transakcji (TXID)",
      txidPlaceholder: "Wprowadź TXID",
      minimumDeposit: "Minimalna wpłata",
      importantNotice: "Ważna Informacja",
      warningMessage: "Upewnij się, że wybierasz właściwą sieć dla swojej wpłaty. Wysyłanie środków przez nieprawidłową sieć może skutkować trwałą utratą aktywów, której nie można odzyskać.",
      confirmDeposit: "Potwierdź Wpłatę",
      network: "Sieć",
      estimatedArrival: "Szacowany czas przybycia",
      networkConfirmations: "3 potwierdzenia sieciowe",
      processingTime: "Czas przetwarzania",
      processingTimeValue: "10–30 minut",
      noMethods: "Brak dostępnych metod wpłaty w tej chwili.",
      addressCopied: "Adres skopiowany do schowka!",
      unknownNetwork: "Nieznana Sieć",
    },

    wallet: {
      totalPortfolioValue: "Łączna Wartość Portfela",
      myAssets: "Moje Aktywa",
      manage: "Zarządzaj",
      noAssets: "Nie znaleziono aktywów",
      quickActions: {
        deposit: "Wpłata",
        withdraw: "Wypłata",
        history: "Historia",
        convert: "Konwertuj",
        staking: "Staking",
      },
    },

    trade: {
      title: "SPOT",
      buy: "KUP",
      sell: "SPRZEDAJ",
      limit: "LIMIT",
      market: "RYNEK",
      orderType: "Typ Zlecenia",
      price: "Cena (USDT)",
      amount: "Ilość",
      available: "Dostępne",
      placing: "Składanie...",
      increasePrice: "zwiększ cenę",
      decreasePrice: "zmniejsz cenę",
      errors: {
        invalidQuantity: "Wprowadź prawidłową ilość.",
        invalidPrice: "Wprowadź prawidłową cenę.",
        insufficientUSDT: "Niewystarczające saldo USDT. Dostępne: {0} USDT",
        insufficientCoin: "Niewystarczające saldo {1}. Dostępne: {0} {1}",
        failedOrder: "Nie udało się złożyć zlecenia. Spróbuj ponownie.",
      },
      orderBook: {
        price: "Cena (USDT)",
        amount: "Ilość",
      },
      openOrders: {
        title: "OTWARTE ZLECENIA",
        viewAll: "wyświetl wszystkie zlecenia",
        status: "Status",
        price: "Cena",
        amount: "Ilość",
        total: "Łącznie",
        cancel: "Anuluj",
        noOrders: "Brak otwartych zleceń",
        noOrdersSubtext: "Twoje otwarte zlecenia pojawią się tutaj",
      },
    },

    market: {
      title: "RYNEK USDT",
      noResults: "Nie znaleziono kryptowalut",
      volume: "Vol",
      tableHeaders: {
        pair: "Para",
        latestPrice: "Ostatnia Cena",
        change24h: "Zmiana 24H",
      },
      search: {
        placeholder: "Szukaj krypto",
        clear: "Wyczyść wyszukiwanie",
      },
      tabs: {
        all: "Wszystkie",
        gainers: "Wzrosty",
        losers: "Spadki",
        favorites: "Ulubione",
      },
    },

    signup: {
      title: "REJESTRACJA",
      creatingAccount: "TWORZENIE...",
      createAccount: "UTWÓRZ KONTO",
      refresh: "Odśwież",
      captchaMismatch: "Captcha nie pasuje",
      alreadyHaveAccount: "Masz już konto? Zaloguj się",
      terms: {
        text: "Tworząc konto, akceptujesz nasze",
        link: "Warunki Użytkowania",
      },
      labels: {
        email: "E-mail",
        phoneNumber: "Numer Telefonu",
        captcha: "Captcha Graficzna",
        password: "Hasło",
        confirmPassword: "Potwierdź Hasło",
        withdrawPassword: "Hasło do Wypłaty",
        invitationCode: "Kod Zaproszenia",
      },
      placeholders: {
        email: "Wprowadź swój e-mail",
        phoneNumber: "Wprowadź swój numer telefonu",
        captcha: "Wprowadź kod",
        password: "Utwórz hasło",
        confirmPassword: "Potwierdź hasło",
        withdrawPassword: "Wprowadź hasło do wypłaty",
        invitationCode: "Wprowadź kod zaproszenia",
      },
    },

    home: {
      quickAccess: {
        title: "Szybki Dostęp",
        deposit: "Wpłata",
        security: "Bezpieczeństwo",
        faqCenter: "Centrum FAQ",
        invitation: "Zaproszenie",
        staking: "Staking",
      },
      popularCryptos: "Popularne Kryptowaluty",
      seeAll: "Zobacz wszystkie",
      volume: "Vol",
      loading: "Ładowanie...",
      notifications: {
        btcAlert: "Alert Cenowy BTC",
        btcReached: "Bitcoin osiągnął 45 000 USD",
        fiveMinAgo: "5 min temu",
        depositSuccess: "Wpłata Pomyślna",
        depositConfirmed: "Twoja wpłata 0,5 ETH została potwierdzona",
        oneHourAgo: "1 godzinę temu",
        securityUpdate: "Aktualizacja Bezpieczeństwa",
        newSecurityFeatures: "Nowe funkcje bezpieczeństwa dostępne",
        twoHoursAgo: "2 godziny temu",
        marketNews: "Wiadomości Rynkowe",
        ethUpgrade: "Aktualizacja Ethereum zakończona pomyślnie",
        fiveHoursAgo: "5 godzin temu",
      },
    },

    faq: {
      title: "Centrum FAQ",
      hero: {
        title: "Często Zadawane Pytania",
        subtitle: "Znajdź odpowiedzi na typowe pytania dotyczące korzystania z Backpack",
      },
      search: {
        placeholder: "Szukaj odpowiedzi...",
      },
      categories: {
        gettingStarted: "Pierwsze Kroki",
        managingAccount: "Zarządzanie Kontem",
      },
      questions: {
        howToCreateAccount: "Jak założyć konto?",
        howToCompleteVerification: "Jak ukończyć weryfikację?",
        howToBuyCrypto: "Jak kupić kryptowalutę?",
        howToTrade: "Jak handlować kryptowalutami?",
        howToSendReceive: "Jak odbierać i wysyłać krypto?",
        howToBecomeP2PMerchant: "Jak zostać Sprzedawcą P2P?",
        howStakingWorks: "Jak działa staking?",
      },
      answers: {
        verificationProcess: "Prześlij dowód tożsamości wydany przez rząd oraz zdjęcie selfie. Weryfikacja jest zazwyczaj zatwierdzana w ciągu kilku godzin.",
      },
      steps: {
        goToWebsite: "Przejdź na https://Backpack-exchange.com",
        clickSignUp: "Kliknij \"Zarejestruj się\"",
        enterDetails: "Wprowadź swoje dane",
        verifyEmail: "Zweryfikuj swój adres e-mail",
        completeVerification: "Najpierw ukończ weryfikację",
        clickBuyCrypto: "Kliknij \"Kup Krypto\"",
        selectCoinAndPayment: "Wybierz monetę i metodę płatności",
        confirmTransaction: "Potwierdź transakcję",
        cryptoInWallet: "Krypto pojawi się w Twoim portfelu",
        goToTradeMarkets: "Przejdź do \"Handel/Rynki\"",
        pickTradingPair: "Wybierz parę handlową (np. BTC/USDT)",
        placeOrders: "Złóż zlecenia rynkowe lub limitowe",
        receiveCrypto: "Przejdź do Portfela > Odbierz → skopiuj adres lub kod QR",
        sendCrypto: "Przejdź do Portfela > Wyślij → wprowadź adres/kwotę → potwierdź",
        applyP2P: "Aplikuj w sekcji \"P2P\"",
        meetCriteria: "Spełnij kryteria kwalifikacji",
        createOffers: "Po zatwierdzeniu utwórz oferty i handluj",
        goToStaking: "Przejdź do Portfele > Staking",
        pickStakingPlan: "Wybierz plan stakingu",
        selectAmount: "Wybierz kwotę do stakowania",
        confirmStaking: "Potwierdź transakcję",
        rewardsProcessed: "Nagrody przetwarzane automatycznie po zakończeniu okresu",
      },
      labels: {
        toReceive: "Aby odebrać:",
        toSend: "Aby wysłać:",
      },
      futures: {
        title: "Handel Futures Wyjaśniony",
        whatAreFutures: "Czym są kontrakty futures?",
        futuresExplanation: "Umowy na zakup lub sprzedaż krypto po z góry ustalonej cenie w przyszłości (rozliczane gotówkowo).",
        whatIsLeverage: "Czym jest dźwignia?",
        leverageExplanation: "Możliwość handlu z większym kapitałem niż posiadasz (np. dźwignia 10x, 20x, 50x).",
        longShortPositions: "Czym są pozycje Long i Short?",
        long: "Long",
        longExplanation: "= zakład na wzrost ceny",
        short: "Short",
        shortExplanation: "= zakład na spadek ceny",
        marginLiquidation: "Czym są Marża i Likwidacja?",
        marginExplanation: "Ryzyko likwidacji pozycji, jeśli Twoje zabezpieczenie spadnie zbyt nisko, aby utrzymać pozycję.",
        fundingRate: "Czym jest Stopa Finansowania?",
        fundingRateExplanation: "Opłata wymieniana co 8 godzin między traderami długimi i krótkimi w celu zbilansowania cen kontraktów wieczystych z cenami spot.",
        profitLossCalculation: "Jak obliczany jest Zysk/Strata?",
        profitLossExplanation: "Obliczane na podstawie różnicy cen pomnożonej przez dźwignię i wielkość pozycji.",
      },
      benefits: {
        title: "Dlaczego Wybrać Backpack Futures?",
        hedge: "Zabezpiecz się przed zmiennością rynku",
        multiplyProfits: "Mnóż zyski z dźwignią",
        tradeBothMarkets: "Handluj zarówno na rynkach rosnących, jak i spadających",
        advancedStrategies: "Wdrażaj zaawansowane strategie handlowe",
      },
      actionCards: {
        contactSupport: "Skontaktuj się z Pomocą",
        getHelp: "Uzyskaj pomoc od naszego zespołu",
        community: "Społeczność",
        joinDiscussions: "Dołącz do dyskusji",
      },
      footer: {
        copyright: "© 2025 Backpack Exchange. Wszelkie prawa zastrzeżone.",
        needHelp: "Potrzebujesz więcej pomocy? Skontaktuj się z support@Backpack-exchange.com",
      },
    },

    tabBottomNavigator: {
      home: "główna",
      grap: "wykres",
      records: "historia",
      starting: "start",
    },

    language: {
      title: "Język Aplikacji",
      selectLanguage: "Wybierz Język",
      choosePreferred: "Wybierz preferowany język",
      searchPlaceholder: "Szukaj języków...",
      currentLanguage: "Aktualny Język",
      languages: {
        english: "Angielski",
        french: "Francuski",
        russian: "Rosyjski",
        german: "Niemiecki",
        spanish: "Hiszpański",
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español",
      },
    },
  },

  entities: {
    record: {
      menu: "Rekordy",
      fields: {
        user: "użytkownik",
        product: "produkt",
        number: "numer rekordu",
        status: "status",
      },
      list: {
        title: "Lista rekordów",
      },
      view: {
        title: "Szczegóły Rekordu",
      },
      edit: {
        title: "Edytuj Rekord",
      },
      create: {
        success: "Produkt przesłany pomyślnie.",
      },
      update: {
        success: "Produkt przesłany pomyślnie.",
      },
      destroy: {
        success: "Rekord pomyślnie usunięty",
      },
      destroyAll: {
        success: "Rekord pomyślnie usunięty",
      },
      enumerators: {
        status: {
          pending: "Oczekujące",
          completed: "Zakończone",
          canceled: "Anulowane",
        },
      },
    },

    category: {
      name: "kategoria",
      label: "Kategorie",
      menu: "Kategorie",
      exporterFileName: "eksport_kategorii",
      list: {
        menu: "Kategorie",
        title: "Kategorie",
      },
      create: {
        success: "Kategoria zapisana pomyślnie",
      },
      update: {
        success: "Kategoria zapisana pomyślnie",
      },
      destroy: {
        success: "Kategoria pomyślnie usunięta",
      },
      destroyAll: {
        success: "Kategoria(e) pomyślnie usunięte",
      },
      edit: {
        title: "Edytuj Kategorię",
      },
      fields: {
        id: "Id",
        name: "Nazwa",
        slug: "Slug",
        photo: "Zdjęcie",
        metaKeywords: "Słowa Kluczowe Meta",
        metaDescriptions: "Opisy Meta",
        status: "Status",
        isFeature: "Wyróżnione",
        serialRange: "Numer Seryjny",
        serial: "Numer Seryjny",
        createdAt: "Utworzono",
        updatedAt: "Zaktualizowano",
        createdAtRange: "Utworzono",
      },
      enumerators: {
        status: {
          enable: "Włącz",
          disable: "Wyłącz",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nowa Kategoria",
      },
      view: {
        title: "Wyświetl Kategorię",
      },
      importer: {
        title: "Importuj Kategorie",
        fileName: "szablon_importu_kategorii",
        hint: "Kolumny Pliki/Obrazy muszą być adresami URL plików oddzielonymi spacją.",
      },
    },

    product: {
      name: "produkt",
      label: "Produkty",
      menu: "Produkty",
      exporterFileName: "eksport_produktu",
      list: {
        menu: "Produkty",
        title: "Produkty",
      },
      create: {
        success: "Produkt zapisany pomyślnie",
      },
      update: {
        success: "Produkt zapisany pomyślnie",
      },
      destroy: {
        success: "Produkt pomyślnie usunięty",
      },
      destroyAll: {
        success: "Produkt(y) pomyślnie usunięte",
      },
      edit: {
        title: "Edytuj Produkt",
      },
      fields: {
        id: "Id",
        name: "Nazwa",
        slug: "Slug",
        tags: "Tagi",
        video: "Wideo",
        specificationName: "Nazwa Specyfikacji",
        specificationDesciption: "Opis Specyfikacji",
        isSpecification: "Jest Specyfikacją",
        details: "Szczegóły",
        photo: "Zdjęcie",
        discountPriceRange: "Cena Rabatowa",
        discountPrice: "Aktualna Cena",
        previousPriceRange: "Poprzednia Cena",
        previousPrice: "Poprzednia Cena",
        stockRange: "Stan Magazynowy",
        stock: "Stan Magazynowy",
        metaKeywords: "Słowa Kluczowe Meta",
        metaDesctiption: "Krótki Opis",
        status: "Status",
        isType: "Typ",
        dateRange: "Data",
        date: "Data",
        itemType: "Typ Przedmiotu",
        file: "Plik",
        link: "Link",
        fileType: "Typ Pliku",
        taxe: "Podatek",
        category: "Kategoria",
        subcategory: "Podkategoria",
        childcategory: "Podpodkategoria",
        brand: "Marka",
        gallery: "Galeria",
        createdAt: "Utworzono",
        updatedAt: "Zaktualizowano",
        createdAtRange: "Utworzono",
      },
      enumerators: {
        status: {
          enable: "Włącz",
          disable: "Wyłącz",
        },
        itemType: {
          physical: "fizyczny",
          digitale: "Cyfrowy",
        },
        fileType: {
          file: "Plik",
          link: "Link",
        },
        isType: {
          new_arrival: "Nowość",
          feature_product: "Produkt Wyróżniony",
          top_pdroduct: "Popularny Produkt",
          best_product: "Najlepszy Produkt",
          flash_deal_product: "Produkt w Promocji Flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nowy Produkt",
      },
      view: {
        title: "Wyświetl Produkt",
      },
      importer: {
        title: "Importuj Produkty",
        fileName: "szablon_importu_produktu",
        hint: "Kolumny Pliki/Obrazy muszą być adresami URL plików oddzielonymi spacją.",
      },
    },

    deposit: {
      create: {
        success: "Wpłata przesłana pomyślnie.",
      },
    },

    transaction: {
      name: "transakcja",
      label: "Transakcje",
      menu: "Transakcje",
      exporterFileName: "eksport_transakcji",
      list: {
        menu: "Transakcje",
        title: "Transakcje",
      },
      create: {
        success: "Transakcja wysłana pomyślnie",
      },
      update: {
        success: "Transakcja zapisana pomyślnie",
      },
      destroy: {
        success: "Transakcja pomyślnie usunięta",
      },
      destroyAll: {
        success: "Transakcja(e) pomyślnie usunięte",
      },
      edit: {
        title: "Edytuj Transakcję",
      },
      fields: {
        id: "Id",
        amountRange: "Kwota",
        amount: "Kwota",
        email: "E-mail",
        tax: "Podatek",
        currencySign: "Symbol Waluty",
        currencyValue: "Wartość Waluty",
        orderId: "ID Zamówienia",
        createdAt: "Utworzono",
        updatedAt: "Zaktualizowano",
        createdAtRange: "Utworzono",
      },
      enumerators: {
        status: {
          pending: "Oczekujące",
          completed: "Sukces",
          canceled: "Anulowane",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nowa Transakcja",
      },
      view: {
        title: "Wyświetl Transakcję",
      },
      importer: {
        title: "Importuj Transakcje",
        fileName: "szablon_importu_transakcji",
        hint: "Kolumny Pliki/Obrazy muszą być adresami URL plików oddzielonymi spacją.",
      },
    },

    order: {
      name: "zamówienie",
      label: "Zamówienia",
      menu: "Zamówienia",
      exporterFileName: "eksport_zamówienia",
      list: {
        menu: "Zamówienia",
        title: "Zamówienia",
      },
      create: {
        success: "Zamówienie zapisane pomyślnie",
      },
      update: {
        success: "Zamówienie zapisane pomyślnie",
      },
      destroy: {
        success: "Zamówienie pomyślnie usunięte",
      },
      destroyAll: {
        success: "Zamówienie(a) pomyślnie usunięte",
      },
      edit: {
        title: "Edytuj Zamówienie",
      },
      fields: {
        id: "Id",
        userId: "Użytkownik",
        cart: "Koszyk",
        shipping: "Wysyłka",
        discountRange: "Rabat",
        discount: "Rabat",
        paymentMethod: "Metoda Płatności",
        taxe: "Podatek",
        transactionNumber: "Numer Transakcji",
        orderStatus: "Status Zamówienia",
        createdAt: "Utworzono",
        updatedAt: "Zaktualizowano",
        createdAtRange: "Utworzono",
      },
      enumerators: {
        orderStatus: {
          pending: "Oczekujące",
          in_progress: "W toku",
          delivered: "Dostarczone",
          canceled: "Anulowane",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nowe Zamówienie",
      },
      view: {
        title: "Wyświetl Zamówienie",
      },
      importer: {
        title: "Importuj Zamówienia",
        fileName: "szablon_importu_zamówienia",
        hint: "Kolumny Pliki/Obrazy muszą być adresami URL plików oddzielonymi spacją.",
      },
    },
  },

  roles: {
    admin: {
      label: "Administrator",
      description: "Pełny dostęp do wszystkich zasobów",
    },
    adherent: {
      label: "Rola Członka",
      description: "Dostęp roli członka",
    },
    member: {
      label: "Członek",
      description: "Dostęp roli członka",
    },
  },

  components: {
    bottomNav: {
      home: "Główna",
      market: "Rynek",
      trade: "Handel",
      futures: "Futures",
      wallets: "Portfele",
      spot: "Spot",
      more: "Więcej",
    },
    coinListModal: {
      title: "Wybierz Kryptowalutę",
      loading: "Ładowanie danych kryptowalut...",
      noResults: "Nie znaleziono kryptowalut",
      popular: "Popularne",
      search: {
        placeholder: "Szukaj kryptowalut...",
      },
    },
  },

  auth: {
    signin: {
      title: "LOGOWANIE",
      button: "Zaloguj się",
      signingIn: "Logowanie...",
      forgotPassword: "ZAPOMNIAŁEŚ HASŁA?",
      signUp: "ZAREJESTRUJ SIĘ",
      orContinueWith: "lub kontynuuj przez",
      downloadApp: "POBIERZ NASZĄ APLIKACJĘ",
      appDescription: "Uzyskaj najlepsze doświadczenie krypto na swoim urządzeniu mobilnym",
      googlePlay: "Google Play",
      newHere: "Nowy tutaj?",
      getTheApp: "Pobierz Aplikację",
    },
    fields: {
      emailOrPhone: "E-mail/Numer Telefonu",
      password: "Hasło",
    },
    tenants: "Obszary Robocze",
    singindesc: "Wprowadź swój e-mail i hasło, aby się zalogować",
    signupdesc: "Wprowadź swój e-mail i hasło, aby się zarejestrować",
    profile: {
      title: "Profil",
      success: "Profil zaktualizowany pomyślnie",
      vip: "Gratulacje z powodu subskrypcji",
      wallet: "Ustawienia wypłaty zakończone.",
    },
    createAnAccount: "Utwórz konto",
    rememberMe: "Zapamiętaj mnie",
    forgotPassword: "Zapomniałem hasła",
    signup: "Zarejestruj się",
    signout: "Wyloguj się",
    alreadyHaveAnAccount: "Masz już konto? Zaloguj się.",
    social: {
      errors: {
        "auth-invalid-provider": "Ten e-mail jest już zarejestrowany u innego dostawcy.",
        "auth-no-email": "E-mail powiązany z tym kontem jest prywatny lub nie istnieje.",
      },
    },
    signinWithAnotherAccount: "Zaloguj się z innym kontem",
    emailUnverified: {
      message: "Potwierdź swój e-mail na <strong>{0}</strong>, aby kontynuować.",
      submit: "Wyślij ponownie weryfikację e-mail",
    },
    emptyPermissions: {
      message: "Nie masz jeszcze uprawnień. Poczekaj, aż administrator nada Ci uprawnienia.",
    },
    passwordResetEmail: {
      message: "Wyślij e-mail do resetowania hasła",
      error: "E-mail nierozpoznany",
    },
    passwordReset: {
      message: "Resetuj hasło",
    },
    passwordChange: {
      title: "Zmień Hasło",
      success: "Hasło zmienione pomyślnie",
      mustMatch: "Hasła muszą być zgodne",
    },
    emailAddressVerificationEmail: {
      error: "E-mail nierozpoznany",
    },
    verificationEmailSuccess: "E-mail weryfikacyjny wysłany pomyślnie",
    passwordResetEmailSuccess: "E-mail do resetowania hasła wysłany pomyślnie",
    passwordResetSuccess: "Hasło zmienione pomyślnie",
    verifyEmail: {
      success: "E-mail zweryfikowany pomyślnie.",
      message: "Chwileczkę, Twój e-mail jest weryfikowany...",
    },
  },

  user: {
    fields: {
      gender: "Płeć",
      captcha: "Captcha",
      username: "Nazwa Użytkownika",
      walletName: "Nazwa Portfela",
      id: "Id",
      confirmPassword: "Potwierdź Hasło",
      avatars: "Avatar",
      invitationcode: "Kod Zaproszenia",
      email: "E-mail",
      emails: "E-mail(e)",
      erc20: "Adres portfela ERC20",
      trc20: "Adres portfela TRC20",
      fullName: "Imię i Nazwisko",
      balance: "Saldo",
      firstName: "Imię",
      lastName: "Nazwisko",
      status: "Status",
      phoneNumber: "Numer Telefonu",
      withdrawPassword: "Hasło do Wypłaty",
      sector: "Sektor",
      employer: "Pracodawca",
      profession: "Zawód",
      address: "Adres",
      birthDate: "Data Urodzenia",
      maritalStatus: "Stan Cywilny",
      facebookLink: "Link Facebook",
      sponsor: "Sponsor",
      role: "Rola",
      createdAt: "Utworzono",
      updatedAt: "Zaktualizowano",
      roleUser: "Rola/Użytkownik",
      roles: "Role",
      createdAtRange: "Utworzono",
      password: "Hasło",
      oldPassword: "Stare Hasło",
      newPassword: "Nowe Hasło",
      newPasswordConfirmation: "Potwierdzenie Nowego Hasła",
      rememberMe: "Zapamiętaj mnie",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Przemysł spożywczy",
      ASSURANCES: "Ubezpieczenia",
      AUDIOVISUEL: "Audiowizualny",
      BANCAIRE: "Bankowy",
      CHIMIE: "Chemia",
      COMPOSANTS_AUTOMOBILES: "Komponenty samochodowe",
      DISTRIBUTION: "Dystrybucja",
      DISTRIBUTION_AUTOMOBILE: "Dystrybucja samochodowa",
      DIVERS: "Różne",
      FINANCIER: "Finansowy",
      HOLDING: "Holding",
      IMMOBILIER: "Nieruchomości",
      INDUSTRIEL: "Przemysłowy",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistyka i transport",
      PHARMACEUTIQUE: "Farmaceutyczny",
      SANTÉ: "Zdrowie",
      TOURSIME: "Turystyka",
      INFORMATION_TECHNOLOGY: "Technologia Informacyjna",
    },
    maritalStatus: {
      célébataire: "Kawaler/Panna",
      marié: "Żonaty/Zamężna",
    },
    status: {
      active: "Aktywny",
      invited: "Zaproszony",
      "empty-permissions": "Oczekiwanie na Uprawnienia",
      inactive: "Nieaktywny",
    },
    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "mężczyzna",
        female: "kobieta",
      },
    },
    invite: "Zaproś",
    validations: {
      email: "E-mail ${value} jest nieprawidłowy",
    },
    title: "Użytkownicy",
    menu: "Użytkownicy",
    doAddSuccess: "Użytkownik(cy) zapisany(i) pomyślnie",
    doUpdateSuccess: "Użytkownik zapisany pomyślnie",
    exporterFileName: "eksport_użytkowników",
    doDestroySuccess: "Użytkownik pomyślnie usunięty",
    doDestroyAllSelectedSuccess: "Użytkownicy pomyślnie usunięci",
    edit: {
      title: "Edytuj Użytkownika",
    },
    new: {
      title: "Zaproś Użytkownika(ów)",
      titleModal: "Zaproś Użytkownika",
      emailsHint: "Oddzielaj wiele adresów e-mail przecinkiem.",
    },
    view: {
      title: "Wyświetl Użytkownika",
      activity: "Aktywność",
    },
    importer: {
      title: "Importuj Użytkowników",
      fileName: "szablon_importu_użytkowników",
      hint: "Kolumny Pliki/Obrazy muszą być adresami URL plików oddzielonymi spacją. Relacje muszą być identyfikatorami przywoływanych rekordów oddzielonymi spacją. Role muszą być identyfikatorami ról oddzielonymi spacją.",
    },
    errors: {
      userAlreadyExists: "Użytkownik z tym e-mailem już istnieje",
      userNotFound: "Użytkownik nie znaleziony",
      revokingOwnPermission: "Nie możesz odebrać własnego uprawnienia administratora",
    },
  },

  settings: {
    title: "Ustawienia",
    menu: "Ustawienia",
    save: {
      success: "Ustawienia zapisane pomyślnie. Strona zostanie przeładowana za {0} sekund, aby zmiany weszły w życie.",
    },
    fields: {
      theme: "Motyw",
      logos: "Logo",
      backgroundImages: "Obraz Tła",
    },
    colors: {
      default: "Ciemny",
      light: "Jasny",
      cyan: "Cyjan",
      "geek-blue": "Geek Niebieski",
      gold: "Złoty",
      lime: "Limonkowy",
      magenta: "Magenta",
      orange: "Pomarańczowy",
      "polar-green": "Polarny Zielony",
      purple: "Fioletowy",
      red: "Czerwony",
      volcano: "Wulkan",
      yellow: "Żółty",
    },
  },

  dashboard: {
    menu: "Panel",
    valider: "Zatwierdź",
    file: "Nie wybrano pliku",
    typecsv: "Nieprawidłowy typ pliku. Wybierz plik CSV.",
    reset: "Resetuj",
    phone: "Prześlij Numery",
    check: "Sprawdź Numer",
    labelphone: "Wpisz Numer Telefonu",
    add: "Dodaj Numer",
    download: "Pobierz szablon",
    added: "Numer Dodany",
    duplicated: "Numer Zduplikowany",
    Wrong: "Numer Nieprawidłowy",
    notFound: "Przepraszamy, nie możemy znaleźć szukanych pozycji.",
    validation: "Numer dodany pomyślnie",
    Success: "Numer dodany pomyślnie",
    numberValidation: "Wpisz prawidłowy numer. Dziękujemy.",
    message: "Ta strona wykorzystuje fikcyjne dane wyłącznie do celów demonstracyjnych.",
    charts: {
      day: "Dzień",
      red: "Czerwony",
      green: "Zielony",
      yellow: "Żółty",
      grey: "Szary",
      blue: "Niebieski",
      orange: "Pomarańczowy",
      months: {
        1: "Styczeń",
        2: "Luty",
        3: "Marzec",
        4: "Kwiecień",
        5: "Maj",
        6: "Czerwiec",
        7: "Lipiec",
        8: "Sierpień",
        9: "Wrzesień",
        10: "Październik",
        11: "Listopad",
        12: "Grudzień",
      },
      eating: "Jedzenie",
      drinking: "Picie",
      sleeping: "Spanie",
      designing: "Projektowanie",
      coding: "Programowanie",
      cycling: "Jazda na rowerze",
      running: "Bieganie",
      customer: "Klient",
      objectif: "Cele według statusu",
      projectS: "Projekty według statusu",
      projectT: "Projekty według typu",
      adherent: "Liczba członków",
      news: "Liczba aktualności",
      project: "Liczba projektów",
      partner: "Liczba partnerów",
      nodata: "brak danych do wyświetlenia",
    },
  },

  errors: {
    backToHome: "Powrót do strony głównej",
    403: "Przepraszamy, nie masz dostępu do tej strony",
    404: "Przepraszamy, odwiedzona strona nie istnieje",
    500: "Przepraszamy, serwer zgłasza błąd",
    429: "Zbyt wiele żądań. Spróbuj ponownie później.",
    forbidden: {
      message: "Zabronione",
    },
    validation: {
      message: "Wystąpił błąd",
    },
    defaultErrorMessage: "Ups, wystąpił błąd",
  },

  preview: {
    error: "Przepraszamy, ta operacja nie jest dozwolona w trybie podglądu.",
  },

  withdraw: {
    withdrawamount: "Kwota wypłaty",
    Withdrawpassword: "Hasło do wypłaty",
    availablebalance: "Dostępne saldo",
    rules: "Opis zasad",
    rule1: "Minimalna wypłata wynosi 20 USD",
    rule2: "Płatność zostanie zrealizowana w ciągu 24 godzin od złożenia wniosku o wypłatę",
    rule3: "Brak codziennego składania zamówień uniemożliwia wypłatę, wszystkie produkty muszą zostać przesłane do wypłaty",
  },

  profile: {
    profile: "Profil",
    fullname: "Pełne imię i nazwisko",
    email: "E-mail",
    phonenumber: "Numer telefonu",
    country: "Kraj",
    Invitationcode: "Kod zaproszenia",
  },

  wallet: {
    wallet: "Portfel",
    info: "Informacje o metodzie wypłaty",
    username: "Nazwa użytkownika",
    walletname: "Nazwa portfela",
    walletaddress: "Adres portfela",
    note: "Uwaga",
    notedesctiption: "Wypełnij te informacje ostrożnie.",
  },

  cs: {
    cs: "Obsługa klienta",
    note: "Jeśli masz pytania lub napotkasz problemy, wyślij nam e-mail lub porozmawiaj z naszym zespołem obsługi klienta online.",
    contactnow: "Skontaktuj się teraz",
  },

  transaction: {
    transaction: "Transakcja",
    all: "Wszystkie",
    withdraw: "Wypłata",
    dposit: "Wpłata",
    notransaction: "Brak transakcji na razie!",
  },

  order: {
    order: "Zamówienie",
    completed: "Zakończone",
    pending: "Oczekujące",
    canceled: "Anulowane",
    ordertime: "Czas zamówienia",
    ordernumber: "Numer zamówienia",
    total: "Łączna kwota zamówienia",
    commission: "Prowizja",
    return: "Szacowany zwrot",
  },

  security: {
    changepassword: "Zmień hasło",
    oldpassword: "Stare hasło",
    newpassword: "Nowe hasło",
    confirmpassword: "Potwierdź hasło",
    note: "Uwaga",
    notedesc: "Wypełnij te informacje ostrożnie",
  },

  tabbarmenue: {
    home: "Główna",
    rate: "Oceń",
    profile: "Profil",
  },

  validation: {
    mixed: {
      default: "${path} jest nieprawidłowy",
      required: "${path} jest wymagany",
      oneOf: "${path} musi być jedną z następujących wartości: ${values}",
      notOneOf: "${path} nie może być jedną z następujących wartości: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} musi być ${type}`;
      },
    },
    string: {
      length: "${path} musi mieć dokładnie ${length} znaków",
      min: "${path} musi mieć co najmniej ${min} znaków",
      max: "${path} może mieć co najwyżej ${max} znaków",
      matches: '${path} musi pasować do następującego wzorca: "${regex}"',
      email: "${path} musi być prawidłowym adresem e-mail",
      url: "${path} musi być prawidłowym adresem URL",
      trim: "${path} musi być ciągiem bez wiodących/końcowych spacji",
      lowercase: "${path} musi być ciągiem małych liter",
      uppercase: "${path} musi być ciągiem wielkich liter",
      selected: "${path} musi być wybrany",
    },
    number: {
      min: "${path} musi być większy lub równy ${min}",
      max: "${path} musi być mniejszy lub równy ${max}",
      lessThan: "${path} musi być mniejszy od ${less}",
      moreThan: "${path} musi być większy od ${more}",
      notEqual: "${path} nie może być równy ${notEqual}",
      positive: "${path} musi być liczbą dodatnią",
      negative: "${path} musi być liczbą ujemną",
      integer: "${path} musi być liczbą całkowitą",
    },
    date: {
      min: "${path} musi być późniejszy niż ${min}",
      max: "${path} musi być wcześniejszy niż ${max}",
    },
    boolean: {},
    object: {
      noUnknown: "${path} nie może zawierać kluczy niewymienionych w kształcie obiektu",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} jest wymagany`
          : `${path} musi zawierać co najmniej ${min} elementy`,
      max: "${path} może zawierać co najwyżej ${max} elementów",
    },
  },

  fileUploader: {
    upload: "Prześlij",
    image: "Musisz przesłać obraz",
    size: "Plik jest za duży. Maksymalny dozwolony rozmiar to {0}",
    formats: "Nieprawidłowy format. Musi być jednym z: {0}.",
  },

  importer: {
    line: "Linia",
    status: "Status",
    pending: "Oczekujące",
    imported: "Zaimportowane",
    error: "Błąd",
    total: "{0} zaimportowanych, {1} oczekujących i {2} z błędem",
    importedMessage: "Przetworzono {0} z {1}.",
    noNavigateAwayMessage: "Nie opuszczaj tej strony, gdyż import zostanie zatrzymany.",
    completed: {
      success: "Import zakończony. Wszystkie wiersze zostały pomyślnie zaimportowane.",
      someErrors: "Przetwarzanie zakończone, ale niektóre wiersze nie mogły zostać zaimportowane.",
      allErrors: "Import nie powiódł się. Brak prawidłowych wierszy.",
    },
    form: {
      downloadTemplate: "Pobierz szablon",
      hint: "Kliknij lub przeciągnij plik do tego obszaru, aby kontynuować",
    },
    list: {
      discardConfirm: "Czy jesteś pewien? Niezaimportowane dane zostaną utracone.",
    },
    errors: {
      invalidFileEmpty: "Plik jest pusty",
      invalidFileExcel: "Dozwolone są tylko pliki excel (.xlsx)",
      invalidFileUpload: "Nieprawidłowy plik. Upewnij się, że używasz ostatniej wersji szablonu.",
      importHashRequired: "Hash importu jest wymagany",
      importHashExistent: "Dane zostały już zaimportowane",
    },
  },

  autocomplete: {
    loading: "Ładowanie...",
    noOptions: "Nie znaleziono danych",
  },

  imagesViewer: {
    noImage: "Brak obrazu",
  },

  table: {
    noData: "Nie znaleziono rekordów",
    loading: "Ładowanie...",
  },
};

export default pl;
