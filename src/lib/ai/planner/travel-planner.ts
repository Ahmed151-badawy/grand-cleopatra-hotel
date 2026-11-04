import {
  AttractionRecord,
  LanguageCode,
} from "../types";
import {
  PlannerRequest,
  ItineraryResponse,
  ItineraryDaySchema,
} from "../validation/schemas";
import luxorAttractionsData from "@/data/ai/luxor-attractions.json";
import { z } from "zod";

type ItineraryDay = z.infer<typeof ItineraryDaySchema>;

export class TravelPlannerEngine {
  private attractions: AttractionRecord[];

  constructor() {
    this.attractions = luxorAttractionsData as AttractionRecord[];
  }

  /**
   * Generates a personalized, heat-aware, bank-optimized Luxor itinerary.
   */
  public generateItinerary(request: PlannerRequest): ItineraryResponse {
    const daysCount = Math.min(7, Math.max(1, request.days));
    const lang: LanguageCode =
      request.language && request.language !== "auto" ? request.language : "en";
    const pace = request.pace || "moderate";
    const budget = request.budget || "standard";
    const interests = request.interests || ["ancient_history"];
    const startingPoint = request.startingPoint || request.startingLocation;

    // Generate day plans respecting East/West bank division and Nile crossings
    const days: ItineraryDay[] = [];
    for (let dayNum = 1; dayNum <= daysCount; dayNum++) {
      days.push(this.buildDayPlan(dayNum, pace, interests, lang));
    }

    // Calculate estimated sightseeing durations
    const dailyAvgHours = pace === "relaxed" ? 4.5 : pace === "intensive" ? 7.5 : 6.0;
    const totalSightseeingHours = Math.round(dailyAvgHours * daysCount * 10) / 10;

    const uncertaintyFlags = this.getUncertaintyFlags(lang);
    const overallTips = this.getOverallTips(lang, pace);
    const travelNotes = this.getTravelNotes(lang, budget);
    const budgetClassification = this.getBudgetClassification(budget, lang);
    const title = this.getItineraryTitle(daysCount, lang, interests);

    return {
      itineraryId: `luxor-itin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      destination: "Luxor, Egypt",
      daysCount,
      pace,
      budget,
      startingPoint,
      days,
      estimatedDurations: {
        totalSightseeingHours,
        dailyAvgHours,
      },
      travelNotes,
      uncertaintyFlags,
      budgetClassification,
      language: lang,
      overallTips,
      verificationStatus: "verified_attractions_grounded",
      source: "cleopatra_travel_engine",
    };
  }

  /**
   * Builds an individual day plan respecting bank grouping and heat pacing.
   */
  private buildDayPlan(
    dayNum: number,
    pace: "relaxed" | "moderate" | "intensive",
    interests: string[],
    lang: LanguageCode
  ): ItineraryDay {
    // Bank rotation logic to minimize Nile crossings:
    // Day 1: West Bank (Colossi of Memnon + Valley of Kings + Medinet Habu) -> 0 Nile crossings
    // Day 2: East Bank (Karnak + Luxor Museum midday + Luxor Temple dusk) -> 2 Nile crossings (1 round-trip)
    // Day 3: West Bank (Sunrise Balloon + Hatshepsut + Valley of Queens) -> 0 Nile crossings
    // Day 4: West Bank In-Depth (Ramesseum + local workshops + Nile sail) -> 0 Nile crossings
    // Day 5: East Bank Leisure & Souqs -> 2 Nile crossings
    // Day 6 & 7: Flexible West/East bank revisit -> 0 or 2 crossings

    const isEastBankDay = dayNum === 2 || dayNum === 5;
    const isBalloonDay = (dayNum === 3 || (dayNum === 1 && interests.includes("balloons"))) && !isEastBankDay;

    let theme = "";
    let bankFocus = isEastBankDay ? "East Bank" : "West Bank";
    let nileCrossings = isEastBankDay ? 2 : 0;

    let morningAttr: AttractionRecord;
    let morningSlot = "07:00 AM - 10:30 AM";

    let afternoonAttr: AttractionRecord | undefined;
    let sunsetAttr: AttractionRecord | undefined;

    if (isBalloonDay) {
      // Day with Sunrise Balloon + Hatshepsut + Sunset Felucca
      morningAttr = this.getAttr("attraction-hot-air-balloon") || this.getAttr("attraction-hatshepsut-temple")!;
      morningSlot = "04:30 AM - 07:00 AM";
      theme = this.localizeText(
        "Sunrise Balloon Over Theban Hills & Hatshepsut",
        "شروق شمس الأقصر بالمنطاد الطائر ومعبد حتشبسوت",
        "Heißluftballon zum Sonnenaufgang & Hatschepsut-Tempel",
        "Montgolfière au lever du soleil & Temple d'Hatchepsout",
        "Globo al amanecer y Templo de Hatshepsut",
        lang
      );
      afternoonAttr = this.getAttr("attraction-hatshepsut-temple");
      sunsetAttr = pace !== "relaxed" ? this.getAttr("attraction-nile-felucca") : undefined;
    } else if (isEastBankDay) {
      // East Bank Day: Karnak, Luxor Museum, Luxor Temple
      morningAttr = this.getAttr("attraction-karnak-temple")!;
      theme = this.localizeText(
        "East Bank Wonders: Karnak & Illuminated Luxor Temple",
        "عجائب الضفة الشرقية: عظمة الكرنك ومعبد الأقصر المضاء",
        "Ostbank-Wunder: Karnak & beleuchteter Luxor-Tempel",
        "Merveilles de la Rive Est: Karnak & Temple de Louxor illuminé",
        "Maravillas de la Orilla Este: Karnak y Templo de Lúxor iluminado",
        lang
      );
      afternoonAttr = this.getAttr("attraction-luxor-museum"); // Perfect midday air-conditioned spot
      sunsetAttr = this.getAttr("attraction-luxor-temple"); // Open until 22:00, stunning illuminated
    } else if (dayNum === 1) {
      // Day 1: West Bank Essentials (Memnon + Valley of Kings + Medinet Habu)
      morningAttr = this.getAttr("attraction-valley-of-the-kings")!;
      theme = this.localizeText(
        "Theban Royal Tombs & West Bank Heritage",
        "مقابر الملوك في طيبة وتراث الضفة الغربية",
        "Königliche thebanische Gräber & Westbank-Erbe",
        "Tombes royales thébaines & Patrimoine de la Rive Ouest",
        "Tumbas reales de Tebas y Patrimonio de la Orilla Oeste",
        lang
      );
      afternoonAttr = this.getAttr("attraction-medinet-habu");
      sunsetAttr = this.getAttr("attraction-colossi-of-memnon");
    } else {
      // Subsequent West Bank days (Valley of the Queens & Felucca)
      morningAttr = this.getAttr("attraction-valley-of-the-queens") || this.getAttr("attraction-medinet-habu")!;
      theme = this.localizeText(
        "West Bank Hidden Sanctuaries & Theban Life",
        "أسرار الضفة الغربية: معابد ومقابر وادي الملكات",
        "Verborgene Heiligtümer der Westbank",
        "Sanctuaires cachés de la Rive Ouest",
        "Santuarios ocultos de la Orilla Oeste",
        lang
      );
      afternoonAttr = this.getAttr("attraction-medinet-habu");
      sunsetAttr = this.getAttr("attraction-nile-felucca");
    }

    const heatAdvisory = this.localizeText(
      "Midday Heat Notice: Upper Egypt sun is strongest between 11:30 AM and 03:30 PM. Rest in the shade or enjoy the air-conditioned museum during these hours.",
      "تنبيه الطقس والحرارة: تشتد حرارة الشمس في صعيد مصر بين الساعة 11:30 صباحاً و3:30 عصراً. يُنصح بالاستراحة في الظل أو زيارة متحف الأقصر المكيف خلال هذه الساعات.",
      "Hitzehinweis: Die oberägyptische Sonne ist zwischen 11:30 und 15:30 Uhr am stärksten. Pausieren Sie im Schatten oder besuchen Sie das klimatisierte Museum.",
      "Avis de chaleur: Le soleil de Haute-Égypte est le plus intense entre 11h30 et 15h30. Reposez-vous à l'ombre ou profitez du musée climatisé.",
      "Aviso de calor: El sol es más fuerte entre las 11:30 y las 15:30. Descanse a la sombra o visite el museo climatizado durante estas horas.",
      lang
    );

    const logisticsAdvice = isEastBankDay
      ? this.localizeText(
          "Take the public Nile ferry located 250m from Grand Cleopatra Hotel (approx. 10 EGP / ~$0.20 USD) across to Luxor East Bank. A short taxi ride connects the ferry dock to Karnak Temple.",
          "استقل المعدية النهرية العامة الواقعة على بعد 250 متراً من فندق جراند كليوباترا (تكلفة الراكب 10 جنيهات تقريباً) للعبور للضفة الشرقية، ثم استقل تاكسي قصير لمعبد الكرنك.",
          "Nutzen Sie die öffentliche Nilfähre 250 m vom Hotel (ca. 10 EGP), um zur Ostbank überzusetzen. Ein kurzes Taxi verbindet den Fähranleger mit Karnak.",
          "Empruntez le bac public du Nil situé à 250 m de l'hôtel (environ 10 EGP) pour traverser vers la rive Est. Un court trajet en taxi vous mènera à Karnak.",
          "Tome el transbordador público del Nilo a 250 m del hotel (unos 10 EGP) para cruzar a la Orilla Este. Un breve taxi le llevará a Karnak.",
          lang
        )
      : this.localizeText(
          "All sites today are on the West Bank close to Grand Cleopatra Hotel. A pre-arranged private car or local taxi arranged at reception avoids unnecessary Nile crossings.",
          "جميع المعالم اليوم تقع في الضفة الغربية بجوار فندق جراند كليوباترا. يُفضل ترتيب سيارة خاصة أو تاكسي محلي من استقبال الفندق لتفادي عبور النيل.",
          "Alle Sehenswürdigkeiten liegen auf der Westbank nahe dem Hotel. Ein über die Rezeption gebuchtes Taxi erspart Nilüberquerungen.",
          "Tous les sites d'aujourd'hui sont sur la rive Ouest, près de l'hôtel. Une voiture privée réservée à la réception évite de traverser le Nil.",
          "Todos los sitios de hoy están en la Orilla Oeste, cerca del hotel. Un coche privado reservado en recepción evita cruzar el Nilo.",
          lang
        );

    const middayLunch = {
      recommendation: isEastBankDay
        ? this.localizeText(
            "East Bank Corniche restaurant or sheltered café near Luxor Temple",
            "مطعم على كورنيش النيل بالضفة الشرقية أو مقهى مظلل بالقرب من معبد الأقصر",
            "Restaurant an der Corniche der Ostbank",
            "Restaurant de la Corniche ou café ombragé",
            "Restaurante en la Corniche de la Orilla Este",
            lang
          )
        : this.localizeText(
            "Grand Cleopatra rooftop shaded lounge or authentic West Bank garden eatery",
            "روف فندق جراند كليوباترا المظلل أو مطعم ريفي بحدائق الضفة الغربية",
            "Schattige Dachterrasse des Grand Cleopatra oder lokales Westbank-Lokal",
            "Terrasse ombragée du Grand Cleopatra ou restaurant de jardin sur la Rive Ouest",
            "Terraza sombreada de Grand Cleopatra o restaurante tradicional de la Orilla Oeste",
            lang
          ),
      notes: this.localizeText(
        "Enjoy fresh Egyptian mezze, local tagines, fresh seasonal fruits, and chilled karkadeh (hibiscus infusion).",
        "استمتع بالمقبلات المصرية والطواجن الطازجة والكركديه المثلج المنعش.",
        "Genießen Sie frische ägyptische Mezze, Tajines und gekühlten Karkadeh-Tee.",
        "Dégustez des mezzés égyptiens, des tajines frais et du karkadé glacé.",
        "Disfrute de aperitivos egipcios, tagines y té de karkadeh bien frío.",
        lang
      ),
    };

    return {
      dayNumber: dayNum,
      theme,
      bankFocus,
      nileCrossings,
      heatAdvisory,
      morning: {
        id: morningAttr.id,
        name: this.getLocalizedAttrName(morningAttr, lang),
        bank: morningAttr.bank,
        timeSlot: morningSlot,
        estimatedDuration: `${morningAttr.suggestedDurationHours} hours`,
        description: morningAttr.description,
        practicalTip: morningAttr.practicalTips,
        verified: morningAttr.verificationStatus === "verified",
      },
      middayLunch,
      afternoon: afternoonAttr
        ? {
            id: afternoonAttr.id,
            name: this.getLocalizedAttrName(afternoonAttr, lang),
            bank: afternoonAttr.bank,
            timeSlot: "02:30 PM - 04:30 PM",
            estimatedDuration: `${afternoonAttr.suggestedDurationHours} hours`,
            description: afternoonAttr.description,
            practicalTip: afternoonAttr.practicalTips,
            verified: afternoonAttr.verificationStatus === "verified",
          }
        : undefined,
      sunsetEvening: sunsetAttr
        ? {
            id: sunsetAttr.id,
            name: this.getLocalizedAttrName(sunsetAttr, lang),
            bank: sunsetAttr.bank,
            timeSlot: "05:00 PM - 07:30 PM",
            estimatedDuration: `${sunsetAttr.suggestedDurationHours} hours`,
            description: sunsetAttr.description,
            practicalTip: sunsetAttr.practicalTips,
            verified: sunsetAttr.verificationStatus === "verified",
          }
        : undefined,
      logisticsAdvice,
    };
  }

  private getAttr(id: string): AttractionRecord | undefined {
    return this.attractions.find((a) => a.id === id);
  }

  private getLocalizedAttrName(attr: AttractionRecord, lang: LanguageCode): string {
    if (lang === "ar") {
      switch (attr.id) {
        case "attraction-valley-of-the-kings":
          return "وادي الملوك (مقابر الفراعنة)";
        case "attraction-hatshepsut-temple":
          return "معبد حتشبسوت (الدير البحري)";
        case "attraction-medinet-habu":
          return "معبد مدينة هابو (رمسيس الثالث)";
        case "attraction-colossi-of-memnon":
          return "تمثالا ممنون العملاقان";
        case "attraction-valley-of-the-queens":
          return "وادي الملكات (مقبرة نفرتاري)";
        case "attraction-karnak-temple":
          return "مجمع معابد الكرنك";
        case "attraction-luxor-temple":
          return "معبد الأقصر (المضاء ليلاً)";
        case "attraction-luxor-museum":
          return "متحف الأقصر للفن المصري القديم";
        case "attraction-hot-air-balloon":
          return "منطاد الهواء الساخن عند شروق الشمس";
        case "attraction-nile-felucca":
          return "فلوكة نيلية تقليدية عند الغروب";
      }
    }
    return attr.name;
  }

  private getItineraryTitle(days: number, lang: LanguageCode, _interests: string[]): string {
    switch (lang) {
      case "ar":
        return `برنامج الأقصر المتكامل (${days} ${days === 1 ? "يوم" : days === 2 ? "يومان" : "أيام"}) - فندق جراند كليوباترا`;
      case "de":
        return `Luxor Reiseroute (${days} ${days === 1 ? "Tag" : "Tage"}) - Grand Cleopatra Hotel`;
      case "fr":
        return `Itinéraire à Louxor (${days} ${days === 1 ? "jour" : "jours"}) - Grand Cleopatra Hotel`;
      case "es":
        return `Itinerario de Lúxor (${days} ${days === 1 ? "día" : "días"}) - Grand Cleopatra Hotel`;
      default:
        return `${days}-Day Curated Luxor Itinerary - Grand Cleopatra Hotel`;
    }
  }

  private getUncertaintyFlags(lang: LanguageCode): string[] {
    switch (lang) {
      case "ar":
        return [
          "أسعار تذاكر المزارات الأثرية تخضع لقرارات وزارة السياحة والآثار الرسمية ويُفضل التحقق منها عند شباك التذاكر مباشرة.",
          "المقابر ذات التذاكر الخاصة (مثل توت عنخ آمون وسيتي الأول ونفرتاري) تتطلب تصاريح إضافية مستقلة.",
          "رحلات المنطاد الطائر تخضع يومياً لتقارير الأرصاد الجوية وسلطة الطيران المدني المصري وتتطلب حجزاً مسبقاً.",
        ];
      case "de":
        return [
          "Eintrittspreise unterliegen offiziellen Anpassungen des Ministeriums für Tourismus und Antiquitäten (MoTA).",
          "Sondergräber (Tutanchamun, Seti I, Nefertari) erfordern separate Sondertickets.",
          "Heißluftballonflüge sind wetterabhängig und erfordern eine Vorabreservierung über die Rezeption.",
        ];
      case "fr":
        return [
          "Les tarifs des billets sont soumis aux mises à jour officielles du ministère du Tourisme et des Antiquités.",
          "Les tombes spéciales (Toutankhamon, Séthi Ier, Néfertari) nécessitent des billets supplémentaires.",
          "Les vols en montgolfière dépendent des conditions météorologiques et de l'Aviation civile.",
        ];
      case "es":
        return [
          "Los precios de las entradas están sujetos a cambios oficiales del Ministerio de Turismo y Antigüedades.",
          "Las tumbas especiales (Tutankamón, Seti I, Nefertari) requieren boletos adicionales independientes.",
          "Los vuelos en globo dependen del clima y de la autorización de la Aviación Civil.",
        ];
      default:
        return [
          "Official monument entry fees are set by the Egyptian Ministry of Tourism and Antiquities (MoTA) and subject to official updates.",
          "Special tombs (King Tutankhamun, Seti I, Queen Nefertari) require separate supplemental tickets purchased on site.",
          "Hot air balloon flights are weather-dependent and subject to daily dawn clearance by the Egyptian Civil Aviation Authority.",
        ];
    }
  }

  private getOverallTips(lang: LanguageCode, _pace: string): string[] {
    switch (lang) {
      case "ar":
        return [
          "احرص على بدء الجولات الأثرية في الصباح الباكر (06:00 إلى 07:00 صباحاً) لتفادي حرارة شمس الظهيرة الشديدة.",
          "احمل معك دائماً مياه شرب معبأة وقبعة واقية من الشمس ونظارات شمسية وحذاء مريح للمشي.",
          "فندق جراند كليوباترا يقع على بعد 250 متراً فقط من محطة المعدية النهرية، مما يتيح لك عبور النيل للضفة الشرقية خلال دقائق بتكلفة 10 جنيهات فقط.",
          "تجنب زيارة معابد الضفة الشرقية والغربية في نفس نصف اليوم لتقليل التنقل المجهد بين ضفتي النيل.",
        ];
      case "de":
        return [
          "Beginnen Sie Besichtigungen früh morgens (06:00–07:00 Uhr), um der Mittagshitze zu entgehen.",
          "Tragen Sie stets Sonnenschutz, Kopfbedeckung und bequeme Wanderschuhe.",
          "Die öffentliche Nilfähre ist nur 250 m vom Grand Cleopatra Hotel entfernt (ca. 10 EGP für die Überfahrt).",
          "Bündeln Sie Sehenswürdigkeiten pro Ufer, um zeitraubende Flussüberquerungen zu minimieren.",
        ];
      case "fr":
        return [
          "Commencez les visites tôt le matin (06h00–07h00) pour éviter les fortes chaleurs de l'après-midi.",
          "Prévoyez chapeau, crème solaire, eau minérale et chaussures de marche confortables.",
          "Le bac public du Nil est à seulement 250 m de l'hôtel (environ 10 EGP la traversée vers la rive Est).",
          "Regroupez les visites par rive pour éviter les traversées inutiles du fleuve.",
        ];
      case "es":
        return [
          "Comience las visitas temprano en la mañana (06:00–07:00) para evitar el intenso calor del mediodía.",
          "Lleve sombrero, protector solar, agua embotellada y calzado cómodo para caminar.",
          "El transbordador público del Nilo está a solo 250 m de Grand Cleopatra (unos 10 EGP para cruzar).",
          "Agrupe las visitas por orilla para evitar cruces innecesarios del río.",
        ];
      default:
        return [
          "Start your archaeological visits early in the morning (06:00 AM - 07:00 AM) to beat the desert heat.",
          "Always carry bottled water, high SPF sunscreen, sunglasses, and comfortable walking shoes for rocky tomb paths.",
          "The public Nile ferry is located only 250m from Grand Cleopatra Hotel, offering a quick, authentic 10 EGP crossing to the East Bank.",
          "Group visits strictly by river bank to minimize transit fatigue and preserve energy for exploration.",
        ];
    }
  }

  private getTravelNotes(lang: LanguageCode, budget: string): string[] {
    switch (lang) {
      case "ar":
        return [
          `مستوى الميزانية المحدد: ${budget === "budget" ? "اقتصادي" : budget === "luxury" ? "فاخر" : "معتدل / قياسي"}.`,
          "يُمكن لفريق استقبال فندق جراند كليوباترا حجز سيارة مكيفة خاصة مع سائق محلي موثوق لجولات الضفة الغربية.",
          "رسوم الدخول تُدفع بالبطاقات الائتمانية في معظم شبابيك التذاكر الرسمية لمعابد الأقصر التابعة للوزارة.",
        ];
      case "de":
        return [
          `Ausgewähltes Budget-Niveau: ${budget}.`,
          "Die Hotelrezeption arrangiert gerne zuverlässige klimatisierte Fahrer für die Westbank.",
          "Tickets an staatlichen MoTA-Stätten müssen überwiegend bargeldlos per Kreditkarte bezahlt werden.",
        ];
      case "fr":
        return [
          `Niveau de budget sélectionné: ${budget}.`,
          "La réception de l'hôtel peut réserver un chauffeur local climatisé pour les visites de la Rive Ouest.",
          "La plupart des billetteries officielles MoTA n'acceptent désormais que les cartes bancaires.",
        ];
      case "es":
        return [
          `Nivel de presupuesto seleccionado: ${budget}.`,
          "La recepción de Grand Cleopatra puede organizar un conductor privado climatizado para la Orilla Oeste.",
          "La mayoría de taquillas oficiales del MoTA solo aceptan pago con tarjeta de crédito.",
        ];
      default:
        return [
          `Selected travel budget category: ${budget}.`,
          "Grand Cleopatra reception can arrange trusted private air-conditioned drivers for West Bank excursions.",
          "Official Egyptian Ministry of Antiquities ticket booths predominantly require electronic bank card payment.",
        ];
    }
  }

  private getBudgetClassification(budget: string, lang: LanguageCode): string {
    switch (lang) {
      case "ar":
        if (budget === "budget") {
          return "خطة اقتصادية: تعتمد على المعدية النهرية العامة (10 جنيهات) والتذاكر الأساسية للمواقع دون إضافات خاصة.";
        } else if (budget === "luxury") {
          return "خطة فاخرة: تشمل سيارة خاصة مكيفة ومرشداً سياحياً مرخصاً وتذاكر المقابر الملكية الكبرى ورحلة المنطاد.";
        }
        return "خطة قياسية معتدلة: تجمع بين سيارة مريحة لجولات الضفة الغربية وتذاكر المزارات الرسمية المعتمدة.";
      case "de":
        if (budget === "budget") {
          return "Budget-Plan: Nutzt die öffentliche Nilfähre (10 EGP) und Standard-Eintrittskarten ohne VIP-Zuschläge.";
        } else if (budget === "luxury") {
          return "Luxus-Plan: Privater klimatisierter Wagen, lizenzierter Guide, Premium-Gräber & Heißluftballon.";
        }
        return "Standard-Plan: Ausgewogene Kombination aus privatem Westbank-Transport und regulären Tickets.";
      case "fr":
        if (budget === "budget") {
          return "Formule économique: Utilise le bac local (10 EGP) et les billets standards sans suppléments.";
        } else if (budget === "luxury") {
          return "Formule prestige: Véhicule privé climatisé, guide égyptologue, tombes VIP et montgolfière.";
        }
        return "Formule standard: Équilibre idéal entre transport privé sur la Rive Ouest et entrées régulières.";
      case "es":
        if (budget === "budget") {
          return "Plan económico: Utiliza el transbordador público (10 EGP) y entradas estándar sin extras.";
        } else if (budget === "luxury") {
          return "Plan de lujo: Coche privado con aire acondicionado, guía egiptólogo, tumbas VIP y globo.";
        }
        return "Plan estándar: Excelente equilibrio entre transporte privado en la Orilla Oeste y entradas regulares.";
      default:
        if (budget === "budget") {
          return "Budget Category: Prioritizes local public ferry crossings (10 EGP) and standard site tickets without premium supplemental tombs.";
        } else if (budget === "luxury") {
          return "Luxury Category: Recommends private air-conditioned vehicle, licensed Egyptologist guide, VIP tomb access, and dawn balloon flight.";
        }
        return "Standard Category: Balanced combination of comfortable local West Bank transport and verified standard admissions.";
    }
  }

  private localizeText(
    en: string,
    ar: string,
    de: string,
    fr: string,
    es: string,
    lang: LanguageCode
  ): string {
    switch (lang) {
      case "ar":
        return ar;
      case "de":
        return de;
      case "fr":
        return fr;
      case "es":
        return es;
      default:
        return en;
    }
  }
}

export const defaultTravelPlannerEngine = new TravelPlannerEngine();
