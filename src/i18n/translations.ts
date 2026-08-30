import type { Language, Translations } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    navbar: {
      links: {
        products: 'Mahsulotlar',
        about: 'Biz Haqimizda & Sifat',
        reviews: 'Sharhlar',
        faq: 'Savollar',
        contact: 'Aloqa',
      },
      orderCta: 'Buyurtma berish',
      callCta: '+998 (99) 968-96-67',
      subLogo: 'SAMARKAND · 1999',
      callNow: "Qo'ng'iroq: +998 (99) 968-96-67",
      getConsultation: 'Bepul maslahat olish',
    },
    hero: {
      badge: "Silk Aura UZ · Asl O'zbek Ipagi",
      titleLine1: 'Ipak. Sokin.',
      titleLine2: 'Hashamatli.',
      description:
        "1999-yildan buyon Samarqandda pilla yetishtirishdan tortib shohona tabiiy ipak to'plamlarigacha — barchasi bir oila qo'lida.",
      nextSection: "Keyingi bo'limga o'tish",
      consultationTitle: 'Maftuna bilan maslahat',
      consultationRole: 'Silk Aura bosh mutaxassisi',
      consultationCta: '15 daqiqalik maslahat',
    },
    sectionTwo: {
      titleLine1: "Haqiqiy go'zallikni",
      titleLine2: 'his eting.',
      description:
        'Birinchi teginishdanoq tabiiy ipakning mayin salqinligi va oliyjanob jilosi sizni maftun etadi — shoshilmasdan, nafis va beqiyos sifatda.',
      catalogCta: "Katalogni ko'rish",
      deliveryCta: 'Bepul yetkazib berish',
      collectionCta: "Kolleksiyaga o'tish",
      capabilities: [
        {
          id: '01',
          title: '100% Tut ipak (Mulberry 6A)',
          body: "Eng oliy navli 6A toifasidagi tabiiy xomashyo va ekologik sof tolalardan to'qilgan.",
        },
        {
          id: '02',
          title: 'Nafis termoregulyatsiya',
          body: 'Yozda tetiklantiruvchi salqinlik, qishda esa mayin va yoqimli harorat saqlaydi.',
        },
        {
          id: '03',
          title: "Sovg'abop hashamatli qadoq",
          body: "Yaqinlaringiz va o'zingiz uchun unutilmas taassurot qoldiruvchi eksklyuziv sovg'a qutisi.",
        },
      ],
    },
    materials: {
      badge: 'Nega Aynan Silk Aura?',
      titleLine1: 'Mukammallik har bir ipda.',
      titleLine2: "Pilladan to tayyor san'atgacha.",
      description:
        "Biz — 1999-yilda Samarqand viloyatining Kattaqo'rg'on shahrida asos solingan, qadimiy an'analar va zamonaviy texnologiyalarni uyg'unlashtirgan ipak ishlab chiqarish atelyesimiz.",
      bannerTag: "Kattaqo'rg'on Ipak Klasteri",
      bannerTitle: "Xomashyodan to tayyor mahsulotgacha bo'lgan yo'l",
      bannerBody:
        "Silk Aura — O'zbekistondagi to'liq ishlab chiqarish sikliga ega bo'lgan kam sonli brendlardan biridir. Biz ipak qurtini parvarishlashdan tortib, tozalash, nozik ip yigirish, to'qish va qo'lda tikishgacha bo'lgan har bir bosqichni o'z nazoratimizda ushlab turamiz. Samarqand iqlimining quyoshli havosi va asrlar osha sayqallangan hunarmandchilik sirlari mahsulotlarimizga mislsiz yaltiroqlik va mustahkamlik bag'ishlaydi.",
      bannerStats: [
        { value: '25+', label: 'Yillik oilaviy tajriba' },
        { value: '6A', label: 'Eng oliy ipak toifasi' },
        { value: '100%', label: 'Tabiiy Mulberry tolasi' },
      ],
      viewCollectionCta: "To'plamni ko'rish",
      pillars: [
        {
          step: '01',
          title: '100% Oliy Mulberry 6A Ipagi',
          desc: "Faqat saralangan tut ipak qurti pillasidan olinadigan uzun tolalardan foydalanamiz. Bu matoga ipakdek mayinlik va uzoq yillik mustahkamlik beradi.",
        },
        {
          step: '02',
          title: "Kattaqo'rg'on Tarixiy Ishlab Chiqarishi",
          desc: "1999-yildan buyon Samarqand viloyatidagi o'z fabrikamizda an'anaviy to'quvchilik va zamonaviy ekologik standartlar uyg'unlashgan.",
        },
        {
          step: '03',
          title: 'Teriga Foydali va Antiallergen',
          desc: "Tabiiy seritsin va 18 xil aminokislotalar terini quruqlashishdan asraydi, ajinlar paydo bo'lishini kamaytiradi va sochlarni jilolantiradi.",
        },
        {
          step: '04',
          title: 'Tabiiy Termoregulyatsiya',
          desc: "Nafas oluvchi mikroporalar yozning issiq tunlarida salqinlik, qishda esa mayin issiqlikni saqlab, ideal orom hadya etadi.",
        },
      ],
    },
    assortment: {
      badge: 'Silk Aura Assortimenti',
      title: 'Ishlab chiqarishning keng assortimenti.',
      description:
        "Yotoqxona to'plamlaridan to nozik ipak aksessuarlar, sharflar va uy kiyimlarigacha — barchasi Samarqanddagi o'z fabrikamizda tayyorlanadi.",
      rawTitle: 'Yarim tayyor mahsulotlar va xomashyo ulgurji taqdimoti',
      rawDescription:
        "Silk Aura to'qimachilik korxonalari va dizaynerlar uchun eng oliy navli ipak xomashyosini ulgurji hajmda yetkazib beradi.",
      orderCta: 'Buyurtma berish',
      items: [
        {
          id: 'bedding-sets',
          title: "Ipak Choyshab To'plamlari",
          desc: "100% tabiiy ipakdan tayyorlangan qirollik yotoqxona to'plamlari. Teri va sochni asraydi, sog'lom uyqu kafolati.",
          tag: 'Klassik / Premium',
          badge: 'Shohona Orom',
        },
        {
          id: 'pillowcases',
          title: 'Ipak Yostiqjildlar',
          desc: "Ertalabki ajinlar va soch sinishining oldini oluvchi dermatologlar tavsiya qilgan go'zallik yostiqjildlari.",
          tag: '50x70 / 70x70 sm',
          badge: "Go'zallik Sirlari",
        },
        {
          id: 'pajamas',
          title: 'Ipak Pijamalar & Uy Kiyimlari',
          desc: "Tana bilan mukammal uyg'unlashuvchi, nafis bichimdagi ayollar va erkaklar uchun shohona ipak kiyimlar.",
          tag: 'Ayollar & Erkaklar',
          badge: 'Nafis Qulaylik',
        },
        {
          id: 'robes',
          title: 'Ipak Kimono & Xalatlar',
          desc: "Tonggi qahva yoki oqshomgi dam olish uchun ipakning shohona mayinligi ifodalangan uzun va qisqa xalatlar.",
          tag: 'Klassik Dizayn',
          badge: 'Eksklyuziv',
        },
        {
          id: 'scarves',
          title: 'Ipak Sharflar & Ro\'mollar',
          desc: "An'anaviy milliy va zamonaviy Yevropa naqshlarida to'qilgan, har qanday obrazga nafosat bag'ishlovchi aksessuarlar.",
          tag: 'Qo\'lda Chevarlangan',
          badge: 'Milliy Meros',
        },
        {
          id: 'sleep-masks',
          title: 'Ipak Ko\'z Niqoblari',
          desc: "100% tabiiy ipak tolasidan to'ldirilgan va qoplangan, to'liq qorong'ilik va chuqur orom baxsh etuvchi niqoblar.",
          tag: 'Sayohat & Orom',
          badge: 'Deep Sleep',
        },
        {
          id: 'scrunchies',
          title: 'Ipak Soch Rezinkalari',
          desc: "Sochni qisib iz qoldirmaydigan, sinishdan himoyalovchi nozik va mustahkam ipak soch bog'ichlari.",
          tag: 'Har xil o\'lchamlar',
          badge: 'Soch Parvarishi',
        },
        {
          id: 'gift-boxes',
          title: 'Sovg\'abop Hashamatli Qutilar',
          desc: "Yaqinlaringizga unutilmas taassurot beruvchi, atlas lenta va mualliflik qutisidagi shohona to'plamlar.",
          tag: 'To\'y & Marosimlar',
          badge: 'Eng Yaxshi Sovg\'a',
        },
      ],
      rawMaterials: [
        {
          id: 'cocoons',
          title: 'Saralangan Tabiiy Pillalar',
          desc: "Kattaqo'rg'on tumanidagi tutzorlarimizda yetishtirilgan, 1-navli mustahkam va sof oq ipak pillalari.",
          spec: '1-toifa / Oliy nav',
        },
        {
          id: 'yarn',
          title: 'Ipak Yigirilgan Ip (Yarn)',
          desc: "Turli zichlikdagi sanoat to'quv dastgohlari va qo'lda to'qish uchun mo'ljallangan oliy toifali ipak iplari.",
          spec: '20/22D, 40/44D va maxsus o\'lchamlar',
        },
        {
          id: 'raw-fabric',
          title: 'Xom Ipak Matolari (Greige Fabric)',
          desc: "Bo'yash va gul bosishga tayyor, kimyoviy ishlovsiz sof tabiiy to'qilgan ipak matosi.",
          spec: 'Eni: 114 sm, 140 sm / Momme: 16-25mm',
        },
        {
          id: 'atlas-adras',
          title: 'An\'anaviy Atlas va Adras Matolari',
          desc: "Samarqand va Farg'ona uslubidagi qadimiy naqshlar bilan qo'lda to'qilgan sof tabiiy ipak matolar.",
          spec: '100% Ipak & Ipak-paxta aralashma',
        },
      ],
    },
    collection: {
      badge: "Silk Aura To'plamlari",
      title: 'Shohona To\'plamlar. Sizning oromingiz uchun.',
      filterAll: 'Barchasi',
      filterBedding: 'Yotoqxona to\'plamlari',
      filterGifts: 'Sovg\'alar & Pilla',
      atelierTag: 'Individual atelye',
      orderCta: 'Buyurtma berish',
      products: [
        {
          id: 'royal-emerald',
          name: 'Qirollik Zumrad To\'plami (Royal Emerald)',
          category: 'bedding',
          tag: 'Kattaqo\'rg\'on Fabrikasi',
          description:
            "Samarqand atelyemizning eng nufuzli to'plami. Chuqur zumrad tusdagi oliyjanob ipak mayin jilosi va nafis teginishi bilan xonadoningizga chinakam saroyona muhit bag'ishlaydi.",
          features: [
            '2 ta yostiqjild (50x70 sm)',
            '1 ta choyshab (240x260 sm)',
            '1 ta ko\'rpa jildi (200x220 sm)',
            '100% 6A Mulberry Tut Ipagi',
          ],
        },
        {
          id: 'pearl-white',
          name: 'Marvarid Oq To\'plami (Pearl White)',
          category: 'bedding',
          tag: 'Klassik Hashamat',
          description:
            "Sof tabiiy marvarid rangi bilan ajralib turuvchi, yotoqxonangizga osoyishtalik va tozalik ulashuvchi abadiy klassika.",
          features: [
            '2 ta yostiqjild (50x70 sm)',
            '1 ta choyshab (240x260 sm)',
            '1 ta ko\'rpa jildi (200x220 sm)',
            'Antiallergen va nafas oluvchi',
          ],
        },
        {
          id: 'champagne-gold',
          name: 'Shampan Tilla To\'plami (Champagne Gold)',
          category: 'bedding',
          tag: 'Eksklyuziv Jilo',
          description:
            "Ipakning tabiiy tilla nurlari quyosh nurlarida jilolanib, o'ziga xos iliq va boy muhit yaratadi. Nozik did egalari uchun.",
          features: [
            '2 ta yostiqjild (50x70 sm)',
            '1 ta choyshab (240x260 sm)',
            '1 ta ko\'rpa jildi (200x220 sm)',
            'Momiylangan tabiiy zichlik',
          ],
        },
        {
          id: 'midnight-navy',
          name: 'Yarim Kecha Moviy (Midnight Navy)',
          category: 'bedding',
          tag: 'Cheklangan Adad',
          description:
            "Tungi osmonning sokin qorong'uligi kabi chuqur moviy rang. Tinch va chuqur uyquga chorlovchi oliyjanob to'plam.",
          features: [
            '2 ta yostiqjild (50x70 sm)',
            '1 ta choyshab (240x260 sm)',
            '1 ta ko\'rpa jildi (200x220 sm)',
            'Premium atlas choklar',
          ],
        },
        {
          id: 'duo-pillow-set',
          name: 'Ipak Yostiqjildlar Juftligi',
          category: 'gifts',
          tag: 'Go\'zallik & Salomatlik',
          description:
            "Teri parvarishi va soch sog'lig'i uchun ideal to'plam. Ertalabki ajinlar va sochlarning sinishini sezilarli kamaytiradi.",
          features: [
            '2 ta yostiqjild (50x70 sm)',
            'Yashirin mustahkam zamok',
            'Maxsus sovg\'abop qadoq',
            '100% 6A toifali ipak',
          ],
        },
        {
          id: 'silk-heritage-box',
          name: 'Samarqand Ipak Merosi Sovg\'a Qutisi',
          category: 'gifts',
          tag: 'Premium Sovg\'a',
          description:
            "Yaqinlaringiz, to'y marosimlari va faxriy mehmonlar uchun tayyorlangan to'liq ipak to'plam: ko'z niqobi, soch bog'ichi va yostiqjild.",
          features: [
            '1 ta ipak yostiqjild (50x70 sm)',
            '1 ta ipak ko\'z niqobi',
            '2 ta ipak soch bog\'ichi',
            'Yog\'och va atlas tasma quti',
          ],
        },
      ],
    },
    reviews: {
      badge: 'Haqiqiy Fikrlar',
      title: 'Mamnun mijozlar e\'tirofi.',
      description:
        "O'zbekiston bo'ylab yuzlab xonadonlar har kuni Silk Aura oromi bilan tongni yangicha energiya va go'zallikda qarshi olmoqda.",
      items: [
        {
          id: '1',
          name: 'Shahzoda Karimova',
          city: 'Toshkent shahri',
          role: 'Doimiy xaridor',
          rating: 5,
          quote:
            "Qirollik Zumrad to'plamini sotib oldim. Teginishdagi mayinlik va salqinlikni so'z bilan ta'riflash qiyin. Sochlarim ertalab to'zg'imaydi, yuzimda esa charchoq izi qolmayapti. Samarqand ipak fabrikasiga katta rahmat!",
          product: 'Qirollik Zumrad To\'plami',
        },
        {
          id: '2',
          name: 'Dilnoza Boboyeva',
          city: 'Samarqand shahri',
          role: 'Dizayner & Stilist',
          rating: 5,
          quote:
            "O'zbekistonda shunday oliy navli 6A ipak ishlab chiqarilishi bilan faxrlanaman. Qadoqlanishi, atlas tasmalar va tikilish sifati eng qimmat Yevropa brendlaridan ham ustun. Sovg'a uchun ham ajoyib tanlov.",
          product: 'Ipak Yostiqjildlar Juftligi',
        },
        {
          id: '3',
          name: 'Kamola Rustamova',
          city: 'Buxoro shahri',
          role: 'Shifokor-kosmetolog',
          rating: 5,
          quote:
            "Mijozlarimga doim tabiiy ipak yostiqjildlardan foydalanishni maslahat beraman. Silk Aura'dan olingan mahsulotlar 100% tabiiy va antiallergen ekanligiga o'zim amin bo'ldim. Uxlash sifati butunlay o'zgardi.",
          product: 'Marvarid Oq To\'plami',
        },
      ],
    },
    faq: {
      badge: 'Savol-Javoblar',
      title: 'Ko\'p beriladigan savollar.',
      description:
        "Ipak to'plamlari, xarid jarayoni va parvarish bo'yicha eng ko'p so'raladigan savollarga javoblar.",
      items: [
        {
          id: 1,
          question: 'Tabiiy ipak to\'plamlarini qanday to\'g\'ri yuvish va parvarishlash kerak?',
          answer:
            "Ipakni qo'lda yoki kir yuvish mashinasida 'Ipak/Nafis' rejimida, 30°C dan oshmagan iliq suvda yuvish tavsiya etiladi. Suyuq ipak shampuni yoki neytral vositalardan foydalaning. To'g'ridan-to'g'ri quyosh nurlaridan uzoqda, gorizontal yoyib quriting. Dazmollash nam holatda, o'rtacha past haroratda amalga oshiriladi.",
        },
        {
          id: 2,
          question: 'O\'zbekiston bo\'ylab yetkazib berish qancha vaqt oladi va bepulmi?',
          answer:
            "Ha! Barcha buyurtmalar butun O'zbekiston bo'ylab mutlaqo BEPUL yetkazib beriladi. Toshkent shahri bo'ylab yetkazish 1 kun ichida, viloyat markazlariga esa 1-3 ish kunida kuryer orqali eshigingizgacha yetkaziladi.",
        },
        {
          id: 3,
          question: 'Buyurtmani qabul qilib olganda to\'lash mumkinmi (Naqd / Payme / Click)?',
          answer:
            "Albatta. Buyurtmani qabul qilib olib, mahsulot sifatini bevosita ko'zdan kechirganingizdan so'ng naqd pul, Payme, Click yoki bank kartalari orqali to'lovni amalga oshirishingiz mumkin.",
        },
        {
          id: 4,
          question: 'Maxsus nostandart o\'lchamdagi to\'shaklar uchun buyurtma berish mumkinmi?',
          answer:
            "Bizning standart to'plamlarimiz barcha zamonaviy Queen va King size matraslarga (160×200, 180×200, 200×200 sm) ideal mos tushadi. Agar sizda nostandart o'lchamdagi to'shak bo'lsa, atelyemiz siz uchun maxsus o'lchamda tikib bera oladi.",
        },
        {
          id: 5,
          question: 'Mahsulotning haqiqiy ipak ekanligiga kafolat bormi?',
          answer:
            "Har bir Silk Aura mahsuloti 100% 6A toifali tabiiy Mulberry ipak ekanligi sertifikatlangan. Buyurtmani qabul qilib olayotganda sifatni bevosita ko'rib tekshirish huquqiga egasiz va 14 kunlik almashtirish kafolati mavjud.",
        },
      ],
    },
    footer: {
      brandDesc:
        "Ipak. Sokin. Hashamatli. Samarqand viloyati Kattaqo'rg'on shahrida 1999-yildan buyon faoliyat yurituvchi tabiiy ipak fabrikasi.",
      organicBadge: "100% Organik O'zbek Ipagi",
      sectionsTitle: "Bo'limlar",
      catalogLink: 'Mahsulotlar katalogi',
      aboutLink: 'Biz haqimizda va ishlab chiqarish',
      reviewsLink: 'Mijozlarimiz fikrlari',
      faqLink: 'Ko\'p beriladigan savollar',
      personalOrderCta: 'Shaxsiy buyurtma berish',
      contactTitle: "Bog'lanish",
      showroomLabel: 'Shou-rum & Ofis:',
      showroomAddress: "Toshkent shahri, Maxtumquli ko'chasi, 142",
      factoryLabel: "Fabrika: Samarqand viloyati, Kattaqo'rg'on sh.",
      socialTitle: 'Biz ijtimoiy tarmoqlarda',
      socialDesc:
        "Yangi to'plamlar, ipak ishlab chiqarish jarayonlari va maxsus chegirmalar haqida birinchilardan bo'lib xabardor bo'ling.",
      telegramCta: 'Telegram kanalimizga obuna bo\'lish',
      rights: 'Barcha huquqlar himoyalangan. Samarqand, O\'zbekiston.',
      handmadeTag: "Kattaqo'rg'onda mehr bilan to'qilgan",
    },
    orderModal: {
      tag: 'Tezkor buyurtma & Maslahat',
      defaultTitle: 'Silk Aura Mahsulotiga Buyurtma',
      subtitle:
        'Telefon raqamingizni qoldiring, biz sizga mos o\'lcham va tafsilotlarni aniqlashtirish uchun qo\'ng\'iroq qilamiz.',
      successTitle: 'Buyurtmangiz qabul qilindi!',
      successDescPrefix: 'Rahmat, ',
      successDescSuffix:
        '! Silk Aura mutaxassisi 15 daqiqa ichida siz bilan bog\'lanib, buyurtma tafsilotlari va yetkazib berish vaqtini aniqlashtiradi.',
      closeBtn: 'Yopish',
      nameLabel: 'Ismingiz',
      namePlaceholder: 'Masalan: Malika Rahimova',
      phoneLabel: 'Telefon raqamingiz',
      productLabel: 'Mahsulot turi',
      deliveryNotice: 'Yetkazib berish butun O\'zbekiston bo\'ylab BEPUL',
      submitCta: 'Buyurtmani tasdiqlash',
      clientFallback: 'Hurmatli mijoz',
    },
  },
  ru: {
    navbar: {
      links: {
        products: 'Продукция',
        about: 'О Нас & Качество',
        reviews: 'Отзывы',
        faq: 'Вопросы',
        contact: 'Контакты',
      },
      orderCta: 'Оформить заказ',
      callCta: '+998 (99) 968-96-67',
      subLogo: 'САМАРКАНД · 1999',
      callNow: 'Звонок: +998 (99) 968-96-67',
      getConsultation: 'Получить консультацию',
    },
    hero: {
      badge: 'Silk Aura UZ · Подлинный Узбекский Шелк',
      titleLine1: 'Шелк. Спокойствие.',
      titleLine2: 'Роскошь.',
      description:
        'С 1999 года в Самарканде — от выращивания тутового кокона до изысканных комплектов натурального шелка — в руках одной династии.',
      nextSection: 'Перейти к следующему разделу',
      consultationTitle: 'Консультация с Мафтуной',
      consultationRole: 'Главный эксперт Silk Aura',
      consultationCta: '15-минутная консультация',
    },
    sectionTwo: {
      titleLine1: 'Ощутите истинную',
      titleLine2: 'красоту.',
      description:
        'С первого же прикосновения нежная прохлада и благородный блеск натурального шелка очаровывают вас — неспешно, изысканно и в безупречном качестве.',
      catalogCta: 'Смотреть каталог',
      deliveryCta: 'Бесплатная доставка',
      collectionCta: 'Перейти к коллекции',
      capabilities: [
        {
          id: '01',
          title: '100% Шелк Mulberry (Категория 6A)',
          body: 'Соткано из отборного экологически чистого сырья высшей категории 6A.',
        },
        {
          id: '02',
          title: 'Природная терморегуляция',
          body: 'Освежающая прохлада знойным летом и мягкое комфортное тепло в зимние ночи.',
        },
        {
          id: '03',
          title: 'Подарочная фирменная упаковка',
          body: 'Эксклюзивная коробка с атласными лентами, создающая незабываемые впечатления.',
        },
      ],
    },
    materials: {
      badge: 'Почему именно Silk Aura?',
      titleLine1: 'Совершенство в каждой нити.',
      titleLine2: 'От кокона до произведения искусства.',
      description:
        'Мы — шелковое ателье, основанное в 1999 году в городе Каттакурган Самаркандской области, гармонично объединившее вековые традиции и современные стандарты качества.',
      bannerTag: 'Шелковый кластер Каттакургана',
      bannerTitle: 'Путь от кокона до готового шедевра',
      bannerBody:
        'Silk Aura — один из немногих брендов в Узбекистане с полным производственным циклом. От ухода за шелковичными червями до деликатного прядения, ручного ткачества и пошива — каждый шаг находится под строжайшим контролем нашей семьи. Щедрое солнце Самарканда и секреты мастеров дарят нашему шелку неповторимое сияние и долговечность.',
      bannerStats: [
        { value: '25+', label: 'Лет семейного мастерства' },
        { value: '6A', label: 'Высшая категория шелка' },
        { value: '100%', label: 'Натуральный Mulberry шелк' },
      ],
      viewCollectionCta: 'Смотреть коллекцию',
      pillars: [
        {
          step: '01',
          title: '100% Высший шелк Mulberry 6A',
          desc: 'Используем только длинные отборные нити коконов тутового шелкопряда, обеспечивающие невероятную гладкость и прочность.',
        },
        {
          step: '02',
          title: 'Историческое производство в Каттакургане',
          desc: 'С 1999 года на нашей фабрике в Самаркандской области сохраняются традиции ручного шелкоткачества в гармонии с эко-стандартами.',
        },
        {
          step: '03',
          title: 'Польза для кожи и гипоаллергенность',
          desc: 'Природный серицин и 18 аминокислот защищают кожу от сухости, разглаживают мелкие морщинки и придают волосам шелковистый блеск.',
        },
        {
          step: '04',
          title: 'Естественная терморегуляция',
          desc: 'Дышащие микропоры шелка поддерживают идеальный микроклимат, гарантируя глубокий и восстанавливающий сон в любое время года.',
        },
      ],
    },
    assortment: {
      badge: 'Ассортимент Silk Aura',
      title: 'Широкий ассортимент собственного производства.',
      description:
        'От роскошных постельных комплектов до деликатных аксессуаров, шарфов и домашней одежды — все создается на нашей фабрике в Самарканде.',
      rawTitle: 'Оптовые поставки сырья и полуфабрикатов',
      rawDescription:
        'Silk Aura поставляет высококачественное натуральное шелковое сырье для текстильных фабрик, домов моды и дизайнеров.',
      orderCta: 'Заказать',
      items: [
        {
          id: 'bedding-sets',
          title: 'Постельные комплекты из шелка',
          desc: 'Королевские комплекты из 100% натурального шелка. Забота о здоровье кожи, блеске волос и идеальном сне.',
          tag: 'Классика / Премиум',
          badge: 'Царский отдых',
        },
        {
          id: 'pillowcases',
          title: 'Шелковые наволочки',
          desc: 'Бьюти-наволочки, рекомендованные дерматологами для предотвращения утренних заломов на коже и ломкости волос.',
          tag: '50x70 / 70x70 см',
          badge: 'Секрет молодости',
        },
        {
          id: 'pajamas',
          title: 'Шелковые пижамы и домашние сеты',
          desc: 'Изысканный крой для мужчин и женщин, струящийся по телу и дарящий чувство невесомости.',
          tag: 'Женские & Мужские',
          badge: 'Нежный комфорт',
        },
        {
          id: 'robes',
          title: 'Шелковые кимоно и халаты',
          desc: 'Идеально для неспешного утреннего кофе или вечернего расслабления в благородном струящемся шелке.',
          tag: 'Классический дизайн',
          badge: 'Эксклюзив',
        },
        {
          id: 'scarves',
          title: 'Шелковые шарфы и платки',
          desc: 'Сотканы по старинным национальным и современным европейским мотивам, дополняющие любой образ утонченностью.',
          tag: 'Ручная обработка края',
          badge: 'Наследие Востока',
        },
        {
          id: 'sleep-masks',
          title: 'Шелковые маски для сна',
          desc: 'Наполнены и обиты 100% натуральным шелковым волокном для 100% затемнения и глубокого расслабления глаз.',
          tag: 'Путешествия & Сон',
          badge: 'Глубокий сон',
        },
        {
          id: 'scrunchies',
          title: 'Шелковые резинки для волос',
          desc: 'Не повреждают структуру волос, не оставляют заломов и бережно фиксируют прическу.',
          tag: 'Различные размеры',
          badge: 'Забота о волосах',
        },
        {
          id: 'gift-boxes',
          title: 'Подарочные премиум-боксы',
          desc: 'Роскошные наборы в авторской коробке с атласными лентами — идеальный подарок на свадьбу и торжества.',
          tag: 'Свадьбы & Юбилеи',
          badge: 'Лучший подарок',
        },
      ],
      rawMaterials: [
        {
          id: 'cocoons',
          title: 'Отборные натуральные коконы',
          desc: 'Крепкие белые шелковые коконы 1-го сорта, выращенные в собственных тутовых садах Каттакургана.',
          spec: '1-я категория / Высший сорт',
        },
        {
          id: 'yarn',
          title: 'Шелковая крученая нить (Yarn)',
          desc: 'Нити высокой прочности для промышленного ткачества и ручных ткацких станков.',
          spec: '20/22D, 40/44D и спецзаказы',
        },
        {
          id: 'raw-fabric',
          title: 'Суровые шелковые полотна (Greige)',
          desc: 'Необработанная шелковая ткань без химикатов, готовая для окрашивания и печати принтов.',
          spec: 'Ширина: 114 см, 140 см / Плотность: 16-25mm',
        },
        {
          id: 'atlas-adras',
          title: 'Традиционный атлас и адрас',
          desc: 'Ручное ткачество по историческим самаркандским и ферганским узорам из натурального шелка.',
          spec: '100% Шелк & Шелк с хлопком',
        },
      ],
    },
    collection: {
      badge: 'Коллекции Silk Aura',
      title: 'Царственные комплекты для вашего безмятежного сна.',
      filterAll: 'Все товары',
      filterBedding: 'Постельные сеты',
      filterGifts: 'Подарки и коконы',
      atelierTag: 'Индивидуальное ателье',
      orderCta: 'Оформить заказ',
      products: [
        {
          id: 'royal-emerald',
          name: 'Королевский Изумруд (Royal Emerald)',
          category: 'bedding',
          tag: 'Фабрика Каттакургана',
          description:
            'Флагманский комплект нашего самаркандского ателье. Глубокий изумрудный тон и благородный перелив натурального шелка создают воистину дворцовую атмосферу.',
          features: [
            '2 наволочки (50x70 см)',
            '1 простыня (240x260 см)',
            '1 пододеяльник (200x220 см)',
            '100% Шелк Mulberry 6A',
          ],
        },
        {
          id: 'pearl-white',
          name: 'Жемчужно-Белый (Pearl White)',
          category: 'bedding',
          tag: 'Классическая роскошь',
          description:
            'Чистый цвет натурального речного жемчуга. Вечная классика, приносящая в спальню ощущение абсолютной чистоты и гармонии.',
          features: [
            '2 наволочки (50x70 см)',
            '1 простыня (240x260 см)',
            '1 пододеяльник (200x220 см)',
            'Гипоаллергенно и дышаще',
          ],
        },
        {
          id: 'champagne-gold',
          name: 'Золото Шампань (Champagne Gold)',
          category: 'bedding',
          tag: 'Эксклюзивный блеск',
          description:
            'Природные золотые блики шелка играют при лучах солнца, создавая теплую, богатую атмосферу в спальне. Для истинных эстетов.',
          features: [
            '2 наволочки (50x70 см)',
            '1 простыня (240x260 см)',
            '1 пододеяльник (200x220 см)',
            'Оптимальная плотность момме',
          ],
        },
        {
          id: 'midnight-navy',
          name: 'Полуночный Синий (Midnight Navy)',
          category: 'bedding',
          tag: 'Лимитированная серия',
          description:
            'Глубокий синий оттенок, подобный бархатному ночному небу. Способствует быстрому расслаблению и безмятежному сну.',
          features: [
            '2 наволочки (50x70 см)',
            '1 простыня (240x260 см)',
            '1 пододеяльник (200x220 см)',
            'Премиальные атласные швы',
          ],
        },
        {
          id: 'duo-pillow-set',
          name: 'Сет из двух шелковых наволочек',
          category: 'gifts',
          tag: 'Красота и здоровье',
          description:
            'Идеальный дуэт для ухода за кожей лица и волосами. Предотвращает утреннюю отечность и ломкость кончиков.',
          features: [
            '2 наволочки (50x70 см)',
            'Скрытая надежная молния',
            'Фирменная подарочная упаковка',
            '100% шелк сорта 6A',
          ],
        },
        {
          id: 'silk-heritage-box',
          name: 'Подарочный бокс «Наследие Самарканда»',
          category: 'gifts',
          tag: 'Премиальный презент',
          description:
            'Комплексный подарочный набор для любимых и почетных гостей: наволочка, маска для сна и две шелковые резинки в авторском боксе.',
          features: [
            '1 шелковая наволочка (50x70 см)',
            '1 шелковая маска для сна',
            '2 шелковые резинки для волос',
            'Деревянный бокс с атласной лентой',
          ],
        },
      ],
    },
    reviews: {
      badge: 'Честные отзывы',
      title: 'Признание благодарных гостей.',
      description:
        'Сотни семей по всему Узбекистану каждое утро просыпаются отдохнувшими и полными сил благодаря нежности шелка Silk Aura.',
      items: [
        {
          id: '1',
          name: 'Шахзода Каримова',
          city: 'г. Ташкент',
          role: 'Постоянный клиент',
          rating: 5,
          quote:
            'Приобрела королевский комплект «Изумруд». Эту мягкость и приятную прохладу невозможно передать словами! Волосы утром гладкие, на лице нет следов усталости. Огромная благодарность фабрике в Самарканде!',
          product: 'Королевский Изумруд',
        },
        {
          id: '2',
          name: 'Дильноза Бобоева',
          city: 'г. Самарканд',
          role: 'Дизайнер интерьеров',
          rating: 5,
          quote:
            'Горжусь тем, что в Узбекистане создают шелк такого мирового уровня категории 6A. Упаковка с лентами, качество строчки — все на уровне ведущих миланских домов. Превосходный выбор для подарка.',
          product: 'Сет из двух наволочек',
        },
        {
          id: '3',
          name: 'Камола Рустамова',
          city: 'г. Бухара',
          role: 'Врач-косметолог',
          rating: 5,
          quote:
            'Всегда советую своим пациенткам спать на натуральном шелке. Silk Aura — это 100% сертифицированный чистый шелк. Качество сна и сияние кожи изменились кардинально.',
          product: 'Жемчужно-Белый комплект',
        },
      ],
    },
    faq: {
      badge: 'Вопросы и ответы',
      title: 'Часто задаваемые вопросы.',
      description:
        'Все, что нужно знать о натуральном шелке, доставке и бережном уходе за изделиями.',
      items: [
        {
          id: 1,
          question: 'Как правильно стирать и ухаживать за изделиями из натурального шелка?',
          answer:
            'Шелк рекомендуется стирать вручную или в стиральной машине на деликатном режиме «Шелк» при температуре до 30°C с жидким нейтральным средством. Сушите горизонтально в расправленном виде вдали от прямых солнечных лучей. Гладить изделие лучше слегка влажным на минимальном нагреве.',
        },
        {
          id: 2,
          question: 'Сколько времени занимает доставка по Узбекистану и бесплатна ли она?',
          answer:
            'Да! Доставка всех заказов по всему Узбекистану АБСОЛЮТНО БЕСПЛАТНА. По Ташкенту доставка осуществляется в течение 1 дня, в областные центры — за 1–3 рабочих дня прямо до вашей двери.',
        },
        {
          id: 3,
          question: 'Можно ли оплатить заказ при получении (Наличные / Payme / Click)?',
          answer:
            'Конечно. Вы можете осмотреть комплект при курьере, убедиться в безупречном качестве шелка и только затем оплатить наличными, через Payme, Click или банковской картой.',
        },
        {
          id: 4,
          question: 'Возможен ли пошив комплекта по индивидуальным нестандартным размерам?',
          answer:
            'Наши стандартные комплекты идеально подходят для матрасов Queen и King size (160×200, 180×200, 200×200 см). Если ваша кровать имеет уникальные параметры, наше ателье с радостью отошьет комплект по вашим индивидуальным меркам.',
        },
        {
          id: 5,
          question: 'Есть ли официальная гарантия подлинности шелка?',
          answer:
            'Каждое изделие Silk Aura сертифицировано как 100% натуральный шелк тутового шелкопряда категории 6A. Мы предоставляем право проверки при получении и 14-дневную гарантию обмена.',
        },
      ],
    },
    footer: {
      brandDesc:
        'Шелк. Спокойствие. Роскошь. Фабрика натурального шелка, непрерывно работающая в Каттакургане Самаркандской области с 1999 года.',
      organicBadge: '100% Органический шелк Узбекистана',
      sectionsTitle: 'Разделы',
      catalogLink: 'Каталог изделий',
      aboutLink: 'О нас и производстве',
      reviewsLink: 'Отзывы клиентов',
      faqLink: 'Частые вопросы',
      personalOrderCta: 'Индивидуальный пошив',
      contactTitle: 'Контакты',
      showroomLabel: 'Шоурум и офис:',
      showroomAddress: 'г. Ташкент, улица Махтумкули, 142',
      factoryLabel: 'Фабрика: Самаркандская область, г. Каттакурган',
      socialTitle: 'Мы в соцсетях',
      socialDesc:
        'Узнавайте первыми о новых коллекциях, закулисье шелкового производства и специальных предложениях.',
      telegramCta: 'Подписаться на Telegram-канал',
      rights: 'Все права защищены. Самарканд, Узбекистан.',
      handmadeTag: 'Соткано с любовью в Каттакургане',
    },
    orderModal: {
      tag: 'Быстрый заказ & Консультация',
      defaultTitle: 'Заказ изделия Silk Aura',
      subtitle:
        'Оставьте номер телефона, и наш эксперт перезвонит в течение 15 минут для уточнения размеров и адреса доставки.',
      successTitle: 'Ваш заказ успешно принят!',
      successDescPrefix: 'Спасибо, ',
      successDescSuffix:
        '! Специалист Silk Aura свяжется с вами в течение 15 минут для подтверждения адреса и деталей доставки.',
      closeBtn: 'Закрыть',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Например: Малика Рахимова',
      phoneLabel: 'Номер телефона',
      productLabel: 'Выбранный товар',
      deliveryNotice: 'Бесплатная экспресс-доставка по всему Узбекистану',
      submitCta: 'Подтвердить заказ',
      clientFallback: 'Уважаемый клиент',
    },
  },
  en: {
    navbar: {
      links: {
        products: 'Products',
        about: 'About & Heritage',
        reviews: 'Reviews',
        faq: 'FAQ',
        contact: 'Contact',
      },
      orderCta: 'Place Order',
      callCta: '+998 (99) 968-96-67',
      subLogo: 'SAMARKAND · 1999',
      callNow: 'Call: +998 (99) 968-96-67',
      getConsultation: 'Get Free Consultation',
    },
    hero: {
      badge: 'Silk Aura UZ · Authentic Uzbek Silk',
      titleLine1: 'Silk. Serene.',
      titleLine2: 'Luxurious.',
      description:
        'Crafted in Samarkand since 1999 — from rearing mulberry silkworms to royal natural silk collections — all guided by one master family.',
      nextSection: 'Scroll to Next Section',
      consultationTitle: 'Consult with Maftuna',
      consultationRole: 'Chief Silk Aura Specialist',
      consultationCta: '15-min consultation',
    },
    sectionTwo: {
      titleLine1: 'Feel the true',
      titleLine2: 'essence of beauty.',
      description:
        'From the very first touch, the gentle cool smoothness and aristocratic shimmer of 100% natural silk enchant your senses — unhurried, graceful, and incomparably pure.',
      catalogCta: 'View Collection',
      deliveryCta: 'Free Nationwide Delivery',
      collectionCta: 'Explore Collection',
      capabilities: [
        {
          id: '01',
          title: '100% Mulberry Silk (Grade 6A)',
          body: 'Hand-selected 6A long-strand fibers guaranteeing supreme smoothness and lasting resilience.',
        },
        {
          id: '02',
          title: 'Natural Thermoregulation',
          body: 'Crisp, soothing coolness in warm summers and gentle enveloping warmth in winter nights.',
        },
        {
          id: '03',
          title: 'Couture Gift Packaging',
          body: 'Delivered in an exclusive keepsake box with hand-tied satin ribbons, ready for memorable gifting.',
        },
      ],
    },
    materials: {
      badge: 'Why Choose Silk Aura?',
      titleLine1: 'Perfection in every strand.',
      titleLine2: 'From silkworm cocoon to pure art.',
      description:
        'Founded in 1999 in Kattakurgan, Samarkand region, we are a family-owned silk atelier harmonizing Silk Road heritage with state-of-the-art eco standards.',
      bannerTag: 'Kattakurgan Silk Cluster',
      bannerTitle: 'The Journey from Cocoon to Finished Masterpiece',
      bannerBody:
        'Silk Aura is one of the distinguished makers in Uzbekistan overseeing a full vertically integrated production cycle. From nurturing silkworms and reeling delicate filaments to handloom weaving and artisanal tailoring, each step is cherished by our family. The radiant Samarkand sunshine and centuries of craftsmanship imbue our silk with unparalleled luster and enduring strength.',
      bannerStats: [
        { value: '25+', label: 'Years of family heritage' },
        { value: '6A', label: 'Highest silk grade standard' },
        { value: '100%', label: 'Organic Mulberry fiber' },
      ],
      viewCollectionCta: 'View Collection',
      pillars: [
        {
          step: '01',
          title: '100% Top Grade 6A Mulberry Silk',
          desc: 'We utilize exclusively unbroken long-fiber cocoons, resulting in supreme hand-feel, rich drape, and lasting longevity.',
        },
        {
          step: '02',
          title: 'Historic Kattakurgan Silk Mill',
          desc: 'Operating continuously since 1999 in the heart of Samarkand province, uniting ancient craftsmanship with modern ecological rigor.',
        },
        {
          step: '03',
          title: 'Skin-Nourishing & Hypoallergenic',
          desc: 'Natural sericin and 18 essential amino acids seal in moisture, soften fine lines, and preserve hair shine overnight.',
        },
        {
          step: '04',
          title: 'Adaptive Thermoregulation',
          desc: 'Breathable cellular micropores regulate body temperature naturally, ensuring deep, restorative sleep in every season.',
        },
      ],
    },
    assortment: {
      badge: 'Silk Aura Assortment',
      title: 'Our Complete In-House Production Range.',
      description:
        'From royal bedding ensembles to delicate sleep accessories, scarves, and loungewear — handcrafted in our Samarkand mills.',
      rawTitle: 'Wholesale Raw Materials & Semi-Finished Silk',
      rawDescription:
        'Silk Aura supplies premier natural silk raw materials in bulk for luxury fashion houses, textile manufacturers, and designers.',
      orderCta: 'Order Now',
      items: [
        {
          id: 'bedding-sets',
          title: 'Pure Silk Bedding Ensembles',
          desc: '100% organic mulberry silk bedding crafted for royal slumber, healthy radiant skin, and glossy hair.',
          tag: 'Classic / Premium',
          badge: 'Royal Comfort',
        },
        {
          id: 'pillowcases',
          title: 'Silk Beauty Pillowcases',
          desc: 'Dermatologist-recommended beauty pillowcases designed to eliminate morning sleep creases and hair breakage.',
          tag: '50x70 / 70x70 cm',
          badge: 'Anti-Aging Secret',
        },
        {
          id: 'pajamas',
          title: 'Silk Pajamas & Loungewear',
          desc: 'Weightless silhouettes tailored for women and men, flowing naturally with your movements.',
          tag: 'Women & Men',
          badge: 'Pure Comfort',
        },
        {
          id: 'robes',
          title: 'Silk Kimonos & Bathrobes',
          desc: 'Sublime full-length and short robes designed for serene morning coffees and elegant evening lounging.',
          tag: 'Classic Cut',
          badge: 'Exclusive',
        },
        {
          id: 'scarves',
          title: 'Hand-Finished Silk Scarves',
          desc: 'Woven with historic Silk Road patterns and European sensibilities to accent any attire with effortless poise.',
          tag: 'Hand-Rolled Edges',
          badge: 'Cultural Heritage',
        },
        {
          id: 'sleep-masks',
          title: 'Mulberry Silk Sleep Masks',
          desc: 'Stuffed and wrapped in 100% natural silk batting to guarantee total darkness and deep relaxation for tired eyes.',
          tag: 'Travel & Rest',
          badge: 'Deep Sleep',
        },
        {
          id: 'scrunchies',
          title: 'Silk Hair Scrunchies',
          desc: 'Gentle, crease-free hair bands that protect your strands from friction, tangles, and split ends.',
          tag: 'Assorted Sizes',
          badge: 'Hair Care',
        },
        {
          id: 'gift-boxes',
          title: 'Luxury Gift Keepsake Sets',
          desc: 'Bespoke sets presented in our signature embossed presentation box with satin bows — ideal for weddings and celebrations.',
          tag: 'Weddings & Celebrations',
          badge: 'Ultimate Gift',
        },
      ],
      rawMaterials: [
        {
          id: 'cocoons',
          title: 'Selected Natural Silk Cocoons',
          desc: 'Grade-1 clean white cocoons cultivated in our pesticide-free Kattakurgan mulberry orchards.',
          spec: 'Grade 1 / Superior Quality',
        },
        {
          id: 'yarn',
          title: 'Twisted Silk Filaments (Yarn)',
          desc: 'High-tenacity silk yarn spun for industrial shuttle looms and traditional master handlooms.',
          spec: '20/22D, 40/44D & custom deniers',
        },
        {
          id: 'raw-fabric',
          title: 'Raw Greige Silk Fabric',
          desc: 'Chemical-free natural woven silk cloth prepped for bespoke dying, steaming, and screen printing.',
          spec: 'Width: 114cm, 140cm / Momme: 16-25mm',
        },
        {
          id: 'atlas-adras',
          title: 'Traditional Atlas & Adras Weaves',
          desc: 'Authentic handmade Ikat fabrics woven following historic Samarkand and Fergana methods.',
          spec: '100% Silk & Silk-Cotton Blends',
        },
      ],
    },
    collection: {
      badge: 'Silk Aura Collections',
      title: 'Royal Ensembles. Tailored for Serenity.',
      filterAll: 'All Items',
      filterBedding: 'Bedding Sets',
      filterGifts: 'Gifts & Cocoons',
      atelierTag: 'Bespoke Atelier',
      orderCta: 'Order Now',
      products: [
        {
          id: 'royal-emerald',
          name: 'Royal Emerald Silk Ensemble',
          category: 'bedding',
          tag: 'Kattakurgan Mill',
          description:
            'The flagship ensemble of our Samarkand atelier. Deep emerald hues and rich organic silk luster deliver an unmistakable palace atmosphere to your sanctuary.',
          features: [
            '2 Pillowcases (50x70 cm)',
            '1 Flat Sheet (240x260 cm)',
            '1 Duvet Cover (200x220 cm)',
            '100% 6A Mulberry Silk',
          ],
        },
        {
          id: 'pearl-white',
          name: 'Pearl White Classic Ensemble',
          category: 'bedding',
          tag: 'Timeless Luxury',
          description:
            'Shimmering with the pure glow of natural pearls. A timeless classic bringing unmatched serenity, crispness, and light to your bedroom.',
          features: [
            '2 Pillowcases (50x70 cm)',
            '1 Flat Sheet (240x260 cm)',
            '1 Duvet Cover (200x220 cm)',
            'Hypoallergenic & Breathable',
          ],
        },
        {
          id: 'champagne-gold',
          name: 'Champagne Gold Ensemble',
          category: 'bedding',
          tag: 'Exclusive Sheen',
          description:
            'The warm golden undertones of natural raw silk play gracefully with sunlight, cultivating an opulent, inviting sanctuary.',
          features: [
            '2 Pillowcases (50x70 cm)',
            '1 Flat Sheet (240x260 cm)',
            '1 Duvet Cover (200x220 cm)',
            'Heavyweight luxury momme weave',
          ],
        },
        {
          id: 'midnight-navy',
          name: 'Midnight Navy Ensemble',
          category: 'bedding',
          tag: 'Limited Edition',
          description:
            'A nocturnal navy reminiscent of velvet starlit skies. Induces immediate calm and deep, restorative dreams.',
          features: [
            '2 Pillowcases (50x70 cm)',
            '1 Flat Sheet (240x260 cm)',
            '1 Duvet Cover (200x220 cm)',
            'French-stitched satin seams',
          ],
        },
        {
          id: 'duo-pillow-set',
          name: 'Dual Silk Pillowcase Gift Set',
          category: 'gifts',
          tag: 'Beauty & Wellness',
          description:
            'The ultimate rejuvenation pair for delicate facial skin and silky hair. Prevents morning creasing and reduces split ends.',
          features: [
            '2 Pillowcases (50x70 cm)',
            'Concealed durable zipper',
            'Signature presentation box',
            '100% Grade 6A Silk',
          ],
        },
        {
          id: 'silk-heritage-box',
          name: 'Samarkand Heritage Silk Box',
          category: 'gifts',
          tag: 'Curated Gift',
          description:
            'A curated gift suite for esteemed guests and celebrations: pure silk pillowcase, eye mask, and two scrunchies in an embossed gift box.',
          features: [
            '1 Silk Pillowcase (50x70 cm)',
            '1 Silk Sleep Eye Mask',
            '2 Silk Hair Scrunchies',
            'Embossed ribbon keepsake box',
          ],
        },
      ],
    },
    reviews: {
      badge: 'Verified Patronage',
      title: 'Celebrated by discerning patrons.',
      description:
        'Across Uzbekistan and beyond, hundreds of refined households welcome each morning revitalized by Silk Aura luxury.',
      items: [
        {
          id: '1',
          name: 'Shahzoda Karimova',
          city: 'Tashkent',
          role: 'VIP Patron',
          rating: 5,
          quote:
            'I acquired the Royal Emerald set. The sheer coolness and softness are impossible to describe in words. My hair is smooth every morning, with zero sleep marks on my skin. Bravo to the Samarkand craftsmen!',
          product: 'Royal Emerald Silk Ensemble',
        },
        {
          id: '2',
          name: 'Dilnoza Boboyeva',
          city: 'Samarkand',
          role: 'Interior Architect',
          rating: 5,
          quote:
            'I feel proud that Uzbekistan produces Grade 6A silk of such world-class standards. The packaging ribbons and needlework rival premier Milanese fashion houses. An extraordinary gift.',
          product: 'Dual Silk Pillowcase Gift Set',
        },
        {
          id: '3',
          name: 'Kamola Rustamova',
          city: 'Bukhara',
          role: 'Aesthetic Dermatologist',
          rating: 5,
          quote:
            'I consistently advise my patients to sleep on authentic natural silk. Silk Aura offers 100% pure organic Mulberry silk. My sleep quality and skin radiance have transformed completely.',
          product: 'Pearl White Classic Ensemble',
        },
      ],
    },
    faq: {
      badge: 'Frequently Asked',
      title: 'Answers to your questions.',
      description:
        'Everything you wish to know regarding organic silk care, bespoke orders, and our swift nationwide delivery.',
      items: [
        {
          id: 1,
          question: 'How should I wash and care for authentic silk bedding?',
          answer:
            'We recommend hand washing or machine washing on a delicate "Silk" cycle using cool water (below 30°C/86°F) and a pH-neutral liquid silk detergent. Lay flat to dry away from direct sunlight. Steam or iron while slightly damp on the lowest silk setting.',
        },
        {
          id: 2,
          question: 'How long does nationwide delivery take, and is it free?',
          answer:
            'Yes! Delivery on all orders across Uzbekistan is completely FREE. In Tashkent, orders arrive within 24 hours. Regional cities receive door-to-door courier service within 1–3 business days.',
        },
        {
          id: 3,
          question: 'Can I inspect the silk and pay upon delivery (Cash / Payme / Click)?',
          answer:
            'Certainly. You are welcomed to inspect the silk with the courier prior to payment. We accept cash, Payme, Click, and major bank cards upon handover.',
        },
        {
          id: 4,
          question: 'Can you custom-tailor non-standard mattress sizes?',
          answer:
            'Our standard sets are proportioned for contemporary Queen and King size mattresses (160×200, 180×200, 200×200 cm). Should you require custom dimensions, our Samarkand atelier will gladly handcraft an ensemble to your exact specifications.',
        },
        {
          id: 5,
          question: 'Is there an official certificate of authenticity?',
          answer:
            'Every Silk Aura item is certified 100% natural Mulberry silk (Grade 6A). We include an inspection guarantee and a 14-day exchange privilege.',
        },
      ],
    },
    footer: {
      brandDesc:
        'Silk. Serene. Luxurious. Authentic silk manufacture operating continuously in Kattakurgan, Samarkand since 1999.',
      organicBadge: '100% Organic Uzbek Silk',
      sectionsTitle: 'Navigation',
      catalogLink: 'Products Catalog',
      aboutLink: 'About Our Heritage',
      reviewsLink: 'Patron Reviews',
      faqLink: 'FAQ',
      personalOrderCta: 'Bespoke Order Atelier',
      contactTitle: 'Direct Inquiries',
      showroomLabel: 'Showroom & Studio:',
      showroomAddress: 'Tashkent, 142 Makhtumkuli Street',
      factoryLabel: 'Mill: Kattakurgan, Samarkand Province',
      socialTitle: 'Connect With Us',
      socialDesc:
        'Be the first to preview new collections, behind-the-scenes silk rearing, and private salon invitations.',
      telegramCta: 'Subscribe to Telegram Channel',
      rights: 'All rights reserved. Samarkand, Uzbekistan.',
      handmadeTag: 'Handcrafted with love in Kattakurgan',
    },
    orderModal: {
      tag: 'Express Order & Consultation',
      defaultTitle: 'Request a Silk Aura Creation',
      subtitle:
        'Leave your phone number and our silk specialist will call you within 15 minutes to confirm sizing and delivery.',
      successTitle: 'Your order has been received!',
      successDescPrefix: 'Thank you, ',
      successDescSuffix:
        '! A Silk Aura specialist will contact you within 15 minutes to confirm details and delivery schedule.',
      closeBtn: 'Close',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Malika Rahimova',
      phoneLabel: 'Phone Number',
      productLabel: 'Selected Item',
      deliveryNotice: 'Complimentary white-glove delivery across Uzbekistan',
      submitCta: 'Confirm Order',
      clientFallback: 'Honored Client',
    },
  },
};
