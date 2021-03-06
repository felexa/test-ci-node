import Env from "app/core/environment";

let env = Env.getInstance();

export default [
    {
        id: 2,
        name: "Медикаменты",
        url: "https:\/\/www.apteka24.ua\/medikamenty\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Meds&Drugs.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 10,
                name: "Препараты от простуды",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/",
                childrens: [
                    {
                        id: 522,
                        name: "Жаропонижающие",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/zharoponizhayushchie\/",
                        childrens: []
                    },
                    {
                        id: 523,
                        name: "Жаропонижающие для детей ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/zharoponizhayushchie-dlya-detey-\/",
                        childrens: []
                    },
                    {
                        id: 71,
                        name: "Препараты от обструктивных заболеваний легких",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/obstruktivnie-zabolevaniya-legkih\/",
                        childrens: []
                    },
                    {
                        id: 72,
                        name: "Препараты от кашля и простуды",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/kashel-i-prostuda\/",
                        childrens: []
                    },
                    {
                        id: 73,
                        name: "Препараты назальной терапии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/nazaljnaja-terapija\/",
                        childrens: []
                    },
                    {
                        id: 74,
                        name: "Препараты для респираторной системы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/dejstvie-na-respiratornuyu-sistemu\/",
                        childrens: []
                    },
                    {
                        id: 75,
                        name: "Заболевания горла препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/zabolevaniya-gorla\/",
                        childrens: []
                    },
                    {
                        id: 593,
                        name: "Препараты при сухом кашле",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/respiratornaja-sistema\/preparaty-pri-sukhom-kashle\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 33,
                name: "Контрастные вещества",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/rentgenokontrastnye-sredstva\/",
                childrens: []
            },
            {
                id: 42,
                name: "Гинекологические препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/",
                childrens: [
                    {
                        id: 534,
                        name: "Вагинальные свечи ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/vaginalnye-svechi-\/",
                        childrens: []
                    },
                    {
                        id: 316,
                        name: "Препараты от молочницы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/lechenie-molochnitsy\/",
                        childrens: []
                    },
                    {
                        id: 317,
                        name: "Препараты от кольпита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/lechenie-kolpita\/",
                        childrens: []
                    },
                    {
                        id: 318,
                        name: "Средства для лечение миомы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/lechenie-miomy\/",
                        childrens: []
                    },
                    {
                        id: 319,
                        name: "Препараты от эндометриоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/lechenie-endometrioza\/",
                        childrens: []
                    },
                    {
                        id: 320,
                        name: "Препараты от кисты яичника",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/lechenie-kisty-yaichnika\/",
                        childrens: []
                    },
                    {
                        id: 321,
                        name: "Внутриматочные спирали",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/vnutrimatochnye-spirali\/",
                        childrens: []
                    },
                    {
                        id: 322,
                        name: "Препараты при гипертонусе матки",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/pri-gipertonuse-matki\/",
                        childrens: []
                    },
                    {
                        id: 323,
                        name: "Препараты при дисфункции яичников",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/pri-disfunktsii-yaichnikov\/",
                        childrens: []
                    },
                    {
                        id: 324,
                        name: "Препараты при климаксе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/pri-klimakse\/",
                        childrens: []
                    },
                    {
                        id: 375,
                        name: "Контрацепция",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/ginekologija\/kontratseptsiya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 7,
                name: "Дерматологические препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/",
                childrens: [
                    {
                        id: 60,
                        name: "Средства для заживления ран",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/lechenie-ran-i-yazv\/",
                        childrens: []
                    },
                    {
                        id: 61,
                        name: "Противозудные средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/protivozudnie-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 62,
                        name: "Противогрибковые средства в дерматологии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/protivogribkovie-v-dermatologii\/",
                        childrens: []
                    },
                    {
                        id: 64,
                        name: "Препараты от акне и угревой сыпи",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/akne-ugrevaya-sip\/",
                        childrens: []
                    },
                    {
                        id: 65,
                        name: "Кортикостероиды препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/kortikosteroidy-v-dermatologii\/",
                        childrens: []
                    },
                    {
                        id: 66,
                        name: "Антисептики и дезинфицирующие средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/antiseptiki-i-dezinfitciruyushie-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 361,
                        name: "Препараты со смягчающим и анестезирующим действием",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/preparaty-so-smyagchayushchim-i-anesteziruyushchim-deystviem\/",
                        childrens: []
                    },
                    {
                        id: 362,
                        name: "Препараты для лечения ран, язв и пролежней",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/preparaty-dlya-lecheniya-ran-yazv-i-prolezhney\/",
                        childrens: []
                    },
                    {
                        id: 364,
                        name: "Препараты для лечение псориаза, экземы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/preparaty-dlya-lechenie-psoriaza-ekzemy\/",
                        childrens: []
                    },
                    {
                        id: 365,
                        name: "Противомикробные препараты для лечения заболеваний кожи",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/protivomikrobnye-preparaty-dlya-lecheniya-zabolevaniy-kozhi\/",
                        childrens: []
                    },
                    {
                        id: 366,
                        name: "Препараты для лечения рубцов",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/preparaty-dlya-lecheniya-rubtsov\/",
                        childrens: []
                    },
                    {
                        id: 367,
                        name: "Препараты от бородавок",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/lechenie-borodavok\/",
                        childrens: []
                    },
                    {
                        id: 368,
                        name: "Средства от вшей и чесотки",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/sredstva-ot-vshey\/",
                        childrens: []
                    },
                    {
                        id: 27,
                        name: "Противогрибковые средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/dermatologicheskie-sredstva\/protivogribkovye-sredstva\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 16,
                name: "Препараты от аллергии",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/",
                childrens: [
                    {
                        id: 256,
                        name: "Аллергический кашель препараты ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskiy-kashel\/",
                        childrens: []
                    },
                    {
                        id: 257,
                        name: "Аллергический ринит препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskiy-rinit\/",
                        childrens: []
                    },
                    {
                        id: 258,
                        name: "Аллергическая сыпь препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskaya-syp\/",
                        childrens: []
                    },
                    {
                        id: 259,
                        name: "Аллергический дерматит препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskiy-dermatit\/",
                        childrens: []
                    },
                    {
                        id: 260,
                        name: "Аллергическая сыпь у детей препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskaya-syp-u-detey\/",
                        childrens: []
                    },
                    {
                        id: 261,
                        name: "Аллергическая реакция препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergicheskaya-reaktsiya\/",
                        childrens: []
                    },
                    {
                        id: 262,
                        name: "Препараты от анафилактического шока",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/anafilakticheskiy-shok\/",
                        childrens: []
                    },
                    {
                        id: 263,
                        name: "Аллергия на животных препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergiya-na-zhivotnykh\/",
                        childrens: []
                    },
                    {
                        id: 264,
                        name: "Аллергия на пыль препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergiya-na-pyl\/",
                        childrens: []
                    },
                    {
                        id: 265,
                        name: "Аллергия на пыльцу препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergiya-na-pyltsu\/",
                        childrens: []
                    },
                    {
                        id: 266,
                        name: "Средства от аллергии на медпрепараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/allergiya-na-medpreparaty\/",
                        childrens: []
                    },
                    {
                        id: 267,
                        name: "Пищевая аллергия препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/allergija\/pishchevaya-allergiya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 19,
                name: "Обезболивающие средства",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/",
                childrens: [
                    {
                        id: 236,
                        name: "Обезболивающие препараты от головной боли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-golovnoy-boli\/",
                        childrens: []
                    },
                    {
                        id: 237,
                        name: "Обезболивающие препараты от зубной боли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-zubnoy-boli\/",
                        childrens: []
                    },
                    {
                        id: 238,
                        name: "Обезболивающие препараты от боли в спине",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-boli-v-spine\/",
                        childrens: []
                    },
                    {
                        id: 239,
                        name: "Обезболивающие препараты от суставной боли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-sustavnoy-boli\/",
                        childrens: []
                    },
                    {
                        id: 240,
                        name: "Обезболивающие препараты от менструальной боли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-menstrualnoy-boli\/",
                        childrens: []
                    },
                    {
                        id: 241,
                        name: "Обезболивающие препараты от спазмов",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-spazmov\/",
                        childrens: []
                    },
                    {
                        id: 242,
                        name: "Обезболивающие препараты от мышечной боли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-myshechnoy-boli\/",
                        childrens: []
                    },
                    {
                        id: 243,
                        name: "Обезболивающие препараты от мигрени",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/boleutoljajushtie-sredstva\/ot-migreni\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 20,
                name: "Гормональные препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/",
                childrens: [
                    {
                        id: 303,
                        name: "Препараты при гипертиреозе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/pri-gipertireoze\/",
                        childrens: []
                    },
                    {
                        id: 304,
                        name: "Препараты при гипотиреозе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/pri-gipotireoze\/",
                        childrens: []
                    },
                    {
                        id: 305,
                        name: "Препараты для похудения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/pri-ozhirenii\/",
                        childrens: []
                    },
                    {
                        id: 306,
                        name: "Гормональные контрацептивы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/gormonalnye-kontratseptivy\/",
                        childrens: []
                    },
                    {
                        id: 307,
                        name: "Инсулин",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/insulin\/",
                        childrens: []
                    },
                    {
                        id: 413,
                        name: " Гормональные мази",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/gormonalnye-mazi\/",
                        childrens: []
                    },
                    {
                        id: 414,
                        name: "Гормоны щитовидной железы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/gormony-shchitovidnoy-zhelezy\/",
                        childrens: []
                    },
                    {
                        id: 415,
                        name: "Препараты йода",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/preparaty-yoda\/",
                        childrens: []
                    },
                    {
                        id: 416,
                        name: "Антитиреоидные средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/antitireoidnye-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 417,
                        name: "Гормональные препараты при климаксе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/gormonalnye-preparaty-pri-klimakse\/",
                        childrens: []
                    },
                    {
                        id: 418,
                        name: "Гормональные препараты от аллергии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gormonaljnye-preparaty\/gormonalnoe-lechenie-allergii\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 25,
                name: "Мочегонные средства",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/",
                childrens: [
                    {
                        id: 526,
                        name: "Мочегонное для похудения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/mochegonnoe-dlya-pokhudeniya\/",
                        childrens: []
                    },
                    {
                        id: 572,
                        name: "Мочегонные средства при отеках ног",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/mochegonnye-sredstva-pri-otekakh-nog\/",
                        childrens: []
                    },
                    {
                        id: 573,
                        name: "Мочегонные средства при отеках лица",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/mochegonnye-sredstva-pri-otekakh-litsa\/",
                        childrens: []
                    },
                    {
                        id: 574,
                        name: "Мочегонные препараты при гипертонии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/mochegonnye-preparaty-pri-gipertonii\/",
                        childrens: []
                    },
                    {
                        id: 575,
                        name: "Мочегонные средства при беременности",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/mochegonnye-sredstva\/mochegonnye-sredstva-pri-beremennosti\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 26,
                name: "Противовирусные препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/",
                childrens: [
                    {
                        id: 338,
                        name: "Лекарства от гриппа",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-grippa\/",
                        childrens: []
                    },
                    {
                        id: 339,
                        name: "Препараты от кори",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-kori\/",
                        childrens: []
                    },
                    {
                        id: 340,
                        name: "Препараты от герпеса",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-gerpesa\/",
                        childrens: []
                    },
                    {
                        id: 341,
                        name: "Препараты от ветряной оспы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-vetryanoy-ospy\/",
                        childrens: []
                    },
                    {
                        id: 342,
                        name: "Препараты от ВИЧ\/СПИД",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-vich-spid\/",
                        childrens: []
                    },
                    {
                        id: 343,
                        name: "Препараты от рассеянного склероза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-rasseyannogo-skleroza\/",
                        childrens: []
                    },
                    {
                        id: 344,
                        name: "Лечение онковирусов",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-onkovirusov\/",
                        childrens: []
                    },
                    {
                        id: 345,
                        name: "Препараты от энцефалита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-entsefalita\/",
                        childrens: []
                    },
                    {
                        id: 346,
                        name: "Лечение ротавирусной инфекции",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivovirusnye-sredstva\/lechenie-rotavirusnoy-infektsii\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 34,
                name: "Препараты для сердечно-сосудистой системы",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/",
                childrens: [
                    {
                        id: 268,
                        name: "Сердечная недостаточность препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/serdechnaya-nedostatochnost\/",
                        childrens: []
                    },
                    {
                        id: 269,
                        name: "Ишемическая болезнь сердца препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/ishemicheskaya-bolezn-serdtsa\/",
                        childrens: []
                    },
                    {
                        id: 270,
                        name: "Инфаркт миокарда препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/infarkt-miokarda\/",
                        childrens: []
                    },
                    {
                        id: 271,
                        name: "Препараты от аритмии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/aritmiya\/",
                        childrens: []
                    },
                    {
                        id: 272,
                        name: "Гипертоническая болезнь препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/gipertonicheskaya-bolezn\/",
                        childrens: []
                    },
                    {
                        id: 273,
                        name: "Препараты от стенокардии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/stenokardiya\/",
                        childrens: []
                    },
                    {
                        id: 274,
                        name: "Артериальная гипотензия препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/gipotoniya\/",
                        childrens: []
                    },
                    {
                        id: 275,
                        name: "Препараты от варикоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/varikoz\/",
                        childrens: []
                    },
                    {
                        id: 276,
                        name: "Препараты от тромбоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/tromboz\/",
                        childrens: []
                    },
                    {
                        id: 277,
                        name: "Препараты от тахикардии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/takhikardiya\/",
                        childrens: []
                    },
                    {
                        id: 278,
                        name: "Препараты от боли в сердце",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/ot-boli-v-serdtse\/",
                        childrens: []
                    },
                    {
                        id: 350,
                        name: "Мочегонные препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/mochegonnye-preparaty\/",
                        childrens: []
                    },
                    {
                        id: 351,
                        name: "Препараты для укрепления сосудов",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/preparaty-dlya-ukrepleniya-sosudov\/",
                        childrens: []
                    },
                    {
                        id: 352,
                        name: "Кровоостанавливающие препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/krovoostanavlivayushchie-preparaty\/",
                        childrens: []
                    },
                    {
                        id: 353,
                        name: "Препараты для разжижения крови",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/preparaty-dlya-razzhizheniya-krovi\/",
                        childrens: []
                    },
                    {
                        id: 354,
                        name: "Препараты для снижения холестерина",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/preparaty-dlya-snizheniya-kholesterina\/",
                        childrens: []
                    },
                    {
                        id: 355,
                        name: "Препараты для улучшения мозгового кровообращения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/preparaty-dlya-uluchsheniya-mozgovogo-krovoobrashcheniya\/",
                        childrens: []
                    },
                    {
                        id: 356,
                        name: "Препараты от атеросклероза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/ateroskleroz\/",
                        childrens: []
                    },
                    {
                        id: 357,
                        name: "Препараты против геморроя",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/gemorroy\/",
                        childrens: []
                    },
                    {
                        id: 358,
                        name: "Препараты от воспаления сердечной мышцы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/vospalenie-serdechnoy-myshtsy\/",
                        childrens: []
                    },
                    {
                        id: 359,
                        name: "Лекарства от порока сердца",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/serdechno-sosudistaja-sistema\/porok-serdtsa\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 38,
                name: "Препараты для нервной системы",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/",
                childrens: [
                    {
                        id: 289,
                        name: "Препараты при неврозах",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-nevrozakh\/",
                        childrens: []
                    },
                    {
                        id: 290,
                        name: "Препараты от депрессии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-depressii\/",
                        childrens: []
                    },
                    {
                        id: 291,
                        name: "Средства при болезни Паркинсона",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-parkinsonizme\/",
                        childrens: []
                    },
                    {
                        id: 292,
                        name: "Препараты при эпилепсии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-epilepsii\/",
                        childrens: []
                    },
                    {
                        id: 293,
                        name: "Препараты от наркомании",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/ot-narkomanii\/",
                        childrens: []
                    },
                    {
                        id: 294,
                        name: "Препараты от алкоголизма",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/ot-alkogolizma\/",
                        childrens: []
                    },
                    {
                        id: 295,
                        name: "Препараты от табакокурения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/ot-tabakokureniya\/",
                        childrens: []
                    },
                    {
                        id: 296,
                        name: "Препараты при вегето-сосудистой дистонии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-vegeto-sosudistoy-distonii\/",
                        childrens: []
                    },
                    {
                        id: 298,
                        name: "Препараты при деменции",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-dementsii\/",
                        childrens: []
                    },
                    {
                        id: 299,
                        name: "Препараты при стрессе и нарушениях адаптации",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-stresse-i-narusheniyakh-adaptatsii\/",
                        childrens: []
                    },
                    {
                        id: 300,
                        name: "Препараты при психо-соматических расстройствах",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-psikho-somaticheskikh-rasstroystvakh\/",
                        childrens: []
                    },
                    {
                        id: 301,
                        name: "Препараты при расстройствах личности",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-rasstroystvakh-lichnosti\/",
                        childrens: []
                    },
                    {
                        id: 592,
                        name: "Успокоительное для детей ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/uspokoitelnoe-dlya-detey-\/",
                        childrens: []
                    },
                    {
                        id: 379,
                        name: "Препараты от игровой зависимости",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/igrovaya-zavisimost\/",
                        childrens: []
                    },
                    {
                        id: 380,
                        name: "Препараты при головокружении",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-golovokruzhenii\/",
                        childrens: []
                    },
                    {
                        id: 381,
                        name: "Противосудорожные препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/protivosudorozhnye-preparaty\/",
                        childrens: []
                    },
                    {
                        id: 383,
                        name: "Препараты при нарушении сна",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-narushenii-sna\/",
                        childrens: []
                    },
                    {
                        id: 384,
                        name: "Успокоительные средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/uspokoitelnye-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 385,
                        name: "Ноотропные препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/nootropnye-preparaty\/",
                        childrens: []
                    },
                    {
                        id: 386,
                        name: "Панические атаки и фобии препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/panicheskie-ataki-i-fobii\/",
                        childrens: []
                    },
                    {
                        id: 387,
                        name: "Препараты от мигрени",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/lechenie-migreni\/",
                        childrens: []
                    },
                    {
                        id: 388,
                        name: "Препараты при черепно-мозговых травмах",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-cherepno-mozgovykh-travmakh\/",
                        childrens: []
                    },
                    {
                        id: 389,
                        name: "Препараты при заболевании ДЦП",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/zabolevanie-dtsp\/",
                        childrens: []
                    },
                    {
                        id: 390,
                        name: "Препараты при болезни Альцгеймера",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/pri-bolezni-altsgeymera\/",
                        childrens: []
                    },
                    {
                        id: 391,
                        name: "Нервная анорексия и булимия препараты ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/nervnaya-anoreksiya-i-bulimiya\/",
                        childrens: []
                    },
                    {
                        id: 392,
                        name: "Препараты от послеродовой депрессии",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/nervnaja-sistema\/poslerodovaya-depressiya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 235,
                name: "Иммуномодуляторы",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/",
                childrens: [
                    {
                        id: 22,
                        name: "Иммунодепрессанты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/immunodepressanty\/",
                        childrens: []
                    },
                    {
                        id: 23,
                        name: "Иммуностимуляторы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/immunostimuljatory\/",
                        childrens: []
                    },
                    {
                        id: 402,
                        name: "Интерфероны",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/interferony\/",
                        childrens: []
                    },
                    {
                        id: 403,
                        name: "Иммуноглобулины",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/immunoglobuliny\/",
                        childrens: []
                    },
                    {
                        id: 404,
                        name: "Препараты витамина С ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/immunomodulyatory\/preparaty-vitamina-s-\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 11,
                name: "Гематологические препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/",
                childrens: [
                    {
                        id: 76,
                        name: "Антикоагулянты препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/gematologicheskie-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 77,
                        name: "Кровезаменители и перфузионные растворы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/krovezameniteli-i-perfuzionnie-rastvori\/",
                        childrens: []
                    },
                    {
                        id: 78,
                        name: "Антитромботические средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/antitrombicheskie-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 79,
                        name: "Антианемические средства",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/antianemicheskie-sredstva\/",
                        childrens: []
                    },
                    {
                        id: 360,
                        name: "Препараты железа ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/preparaty-zheleza-\/",
                        childrens: []
                    },
                    {
                        id: 173,
                        name: "Средства от варикоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-dlja-sistemy-krovi-i-gemopoeza\/sredstva-ot-varikoza\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 43,
                name: "Урологические препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/",
                childrens: [
                    {
                        id: 309,
                        name: "Препараты при уретрите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-uretrite\/",
                        childrens: []
                    },
                    {
                        id: 310,
                        name: "Препараты при пиелонефрите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-pielonefrite\/",
                        childrens: []
                    },
                    {
                        id: 311,
                        name: "Препараты при мочекаменной болезни",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-mochekamennoy-bolezni\/",
                        childrens: []
                    },
                    {
                        id: 312,
                        name: "Препараты при недержании мочи",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-nederzhanii-mochi\/",
                        childrens: []
                    },
                    {
                        id: 313,
                        name: "Препараты при аденоме",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-adenome\/",
                        childrens: []
                    },
                    {
                        id: 314,
                        name: "Препараты при простатите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-prostatite\/",
                        childrens: []
                    },
                    {
                        id: 315,
                        name: "Препараты для потенции",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/pri-impotentsii\/",
                        childrens: []
                    },
                    {
                        id: 376,
                        name: "Лекарства при задержке мочеиспускания",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/zaderzhka-mocheispuskaniya\/",
                        childrens: []
                    },
                    {
                        id: 377,
                        name: "Препараты для лечение цистита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/lechenie-tsistita\/",
                        childrens: []
                    },
                    {
                        id: 378,
                        name: "Препараты при болях в почках",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/urologija\/preparaty-pri-bolyakh-v-pochkakh\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 47,
                name: "Гепатопротекторы",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/",
                childrens: [
                    {
                        id: 370,
                        name: "Препараты для лечения желчевыводящих путей",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/dlya-lecheniya-zhelchevyvodyashchikh-putey\/",
                        childrens: []
                    },
                    {
                        id: 371,
                        name: "Препараты для лечения заболевания печени",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/dlya-lecheniya-zabolevaniya-pecheni\/",
                        childrens: []
                    },
                    {
                        id: 372,
                        name: "Препараты при лечении гепатита C",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/dlya-lecheniya-gepatita-c\/",
                        childrens: []
                    },
                    {
                        id: 1140,
                        name: "Препараты при лечении гепатита B",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/preparaty-pri-lechenii-gepatita-b\/",
                        childrens: []
                    },
                    {
                        id: 373,
                        name: "Желчегонные препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/zhelchegonnye\/",
                        childrens: []
                    },
                    {
                        id: 374,
                        name: "Аминокислоты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/gepatoprotektory\/aminokisloty\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 37,
                name: "Препараты для желудочно-кишечного тракта",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/",
                childrens: [
                    {
                        id: 325,
                        name: "Препараты от гастрита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-gastrita\/",
                        childrens: []
                    },
                    {
                        id: 326,
                        name: "Препараты от панкреатита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-pankreatita\/",
                        childrens: []
                    },
                    {
                        id: 327,
                        name: "Препараты от геморроя",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-gemorroya\/",
                        childrens: []
                    },
                    {
                        id: 328,
                        name: "Препараты от дисбактериоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-disbakterioza\/",
                        childrens: []
                    },
                    {
                        id: 329,
                        name: "Препараты от изжоги",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-izzhogi\/",
                        childrens: []
                    },
                    {
                        id: 330,
                        name: "Препараты от колита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-kolita\/",
                        childrens: []
                    },
                    {
                        id: 331,
                        name: "Препараты от энтерита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-enterita\/",
                        childrens: []
                    },
                    {
                        id: 333,
                        name: "Препараты от дуоденита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-duodenita\/",
                        childrens: []
                    },
                    {
                        id: 334,
                        name: "Препараты от холецистита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-kholetsistita\/",
                        childrens: []
                    },
                    {
                        id: 335,
                        name: "Препараты от язвенной болезни",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-yazvennoy-bolezni\/",
                        childrens: []
                    },
                    {
                        id: 337,
                        name: "Препараты от вздутия",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-vzdutiya\/",
                        childrens: []
                    },
                    {
                        id: 419,
                        name: "Ферменты для улучшения пищеварения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/fermenty-dlya-uluchsheniya-pishchevareniya\/",
                        childrens: []
                    },
                    {
                        id: 420,
                        name: "Препараты от гастродуоденита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/zheludochno-kishechnyj-trakt\/lechenie-gastroduodenita\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 31,
                name: "Препараты от болезни Паркинсона",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparkinsonicheskie-sredstva\/",
                childrens: []
            },
            {
                id: 32,
                name: "Препараты от эпилепсии",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoepilepticheskie-sredstva\/",
                childrens: []
            },
            {
                id: 41,
                name: "Препараты от псориаза",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/psoriaz\/",
                childrens: []
            },
            {
                id: 45,
                name: "Противоревматические",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivorevmaticheskie\/",
                childrens: []
            },
            {
                id: 30,
                name: "Средства от паразитов",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparazitarnye-sredstva-1\/",
                childrens: [
                    {
                        id: 524,
                        name: "Препараты от глистов",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparazitarnye-sredstva-1\/preparaty-ot-glistov\/",
                        childrens: []
                    },
                    {
                        id: 525,
                        name: "Препараты от лямблий",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparazitarnye-sredstva-1\/preparaty-ot-lyambliy\/",
                        childrens: []
                    },
                    {
                        id: 567,
                        name: "Лекарства от остриц ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparazitarnye-sredstva-1\/lekarstva-ot-ostrits-\/",
                        childrens: []
                    },
                    {
                        id: 568,
                        name: "Лекарство от аскарид ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoparazitarnye-sredstva-1\/lekarstvo-ot-askarid-\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 35,
                name: "Препараты для опорно-двигательного аппарата",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/",
                childrens: [
                    {
                        id: 279,
                        name: "Препараты при артрите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-artrite\/",
                        childrens: []
                    },
                    {
                        id: 280,
                        name: "Препараты при артрозе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-artroze\/",
                        childrens: []
                    },
                    {
                        id: 281,
                        name: "Препараты при бурсите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-bursite\/",
                        childrens: []
                    },
                    {
                        id: 282,
                        name: "Препараты при миозите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-miozite\/",
                        childrens: []
                    },
                    {
                        id: 283,
                        name: "Препараты при остеопорозе",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-osteoporoze\/",
                        childrens: []
                    },
                    {
                        id: 284,
                        name: "Препараты при периартрите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-periartrite\/",
                        childrens: []
                    },
                    {
                        id: 285,
                        name: "Препараты при радикулите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-radikulite\/",
                        childrens: []
                    },
                    {
                        id: 287,
                        name: "Препараты при ревматизме",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/pri-revmatizme\/",
                        childrens: []
                    },
                    {
                        id: 288,
                        name: "Обезболивающие мази для опорно-двигательного аппарата",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/obezbolivayushchie-mazi\/",
                        childrens: []
                    },
                    {
                        id: 393,
                        name: "Препараты кальция",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/preparaty-kaltsiya\/",
                        childrens: []
                    },
                    {
                        id: 394,
                        name: "Препараты от заболевания костей",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/zabolevaniya-kostey\/",
                        childrens: []
                    },
                    {
                        id: 395,
                        name: "Хондропротекторы",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/khondroprotektory\/",
                        childrens: []
                    },
                    {
                        id: 396,
                        name: "Миорелаксанты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/miorelaksanty\/",
                        childrens: []
                    },
                    {
                        id: 397,
                        name: "Противовоспалительные препараты",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/protivospalitelnye-preparaty\/",
                        childrens: []
                    },
                    {
                        id: 398,
                        name: "Препараты от спондилеза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/lechenie-spondileza\/",
                        childrens: []
                    },
                    {
                        id: 399,
                        name: "Препараты от подагры",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/lechenie-podagry\/",
                        childrens: []
                    },
                    {
                        id: 400,
                        name: "Препараты от растяжения связок",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/rastyazhenie-svyazok\/",
                        childrens: []
                    },
                    {
                        id: 401,
                        name: "Препараты от сколиоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/oporno-dvigateljnyj-apparat\/lechenie-skolioza\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 40,
                name: "Препараты для повышение аппетита",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/povyshenie-appetita\/",
                childrens: []
            },
            {
                id: 53,
                name: "Гомеопатические препараты",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/gomeopaticheskie-sredstva\/",
                childrens: []
            },
            {
                id: 12,
                name: "Лечение полости рта",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-stomatologii\/",
                childrens: [
                    {
                        id: 569,
                        name: "Лекарства от стоматита ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-stomatologii\/lekarstva-ot-stomatita-\/",
                        childrens: []
                    },
                    {
                        id: 570,
                        name: "Препараты от пародонтоза",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-stomatologii\/preparaty-ot-parodontoza\/",
                        childrens: []
                    },
                    {
                        id: 571,
                        name: "Препараты при пульпите ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/sredstva-stomatologii\/preparaty-pri-pulpite-\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 46,
                name: "Препараты от туберкулеза",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/tuberkulez\/",
                childrens: []
            },
            {
                id: 56,
                name: "Лекарственные травы",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/lekarstvennye-travy\/",
                childrens: [
                    {
                        id: 594,
                        name: "Травяной чай",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lekarstvennye-travy\/travyanoy-chay\/",
                        childrens: []
                    },
                    {
                        id: 595,
                        name: "Фиточай",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lekarstvennye-travy\/fitochay\/",
                        childrens: []
                    },
                    {
                        id: 596,
                        name: "Чай для похудения",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lekarstvennye-travy\/chay-dlya-pokhudeniya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 18,
                name: "Средства для лечения глаз",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/",
                childrens: [
                    {
                        id: 527,
                        name: "Капли от конъюнктивита",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-ot-konyuktivita\/",
                        childrens: []
                    },
                    {
                        id: 579,
                        name: "Капли при глаукоме ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-pri-glaukome-\/",
                        childrens: []
                    },
                    {
                        id: 580,
                        name: "Капли от катаракты ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-ot-katarakty-\/",
                        childrens: []
                    },
                    {
                        id: 582,
                        name: "Капли от сухости глаз ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-ot-sukhosti-glaz-\/",
                        childrens: []
                    },
                    {
                        id: 583,
                        name: "Капли от ячменя ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-ot-yachmenya-\/",
                        childrens: []
                    },
                    {
                        id: 585,
                        name: "Капли для глаз ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/kapli-dlya-glaz-\/",
                        childrens: []
                    },
                    {
                        id: 586,
                        name: "Мазь для глаз ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/glaznye-sredstva\/maz-dlya-glaz-\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 36,
                name: "Лечение геморроя",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/lechenie-gemorroja\/",
                childrens: [
                    {
                        id: 410,
                        name: "Свечи от геморроя",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lechenie-gemorroja\/svechi-ot-gemorroya\/",
                        childrens: []
                    },
                    {
                        id: 411,
                        name: "Мази от геморроя",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lechenie-gemorroja\/mazi-ot-gemorroya\/",
                        childrens: []
                    },
                    {
                        id: 412,
                        name: "Вспомогательные средства от геморроя",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/lechenie-gemorroja\/vspomogatelnye-sredstva-ot-gemorroya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 49,
                name: "Препараты от заболевания ушей",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/otologija\/",
                childrens: [
                    {
                        id: 616,
                        name: "Капли при отите",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/otologija\/kapli-pri-otite\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 24,
                name: "Анестезирующие средства",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/anestezirujushtie-sredstva\/",
                childrens: []
            },
            {
                id: 39,
                name: "Препараты от диабета",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/diabet\/",
                childrens: [
                    {
                        id: 588,
                        name: "Препараты при диабете 2 типа ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/diabet\/preparaty-pri-diabete-2-tipa-\/",
                        childrens: []
                    },
                    {
                        id: 589,
                        name: "Препараты при диабете 1 типа ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/diabet\/preparaty-pri-diabete-1-tipa-\/",
                        childrens: []
                    },
                    {
                        id: 421,
                        name: "Препараты для снижения сахара в крови",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/diabet\/preparaty-dlya-snizheniya-sakhara-v-krovi\/",
                        childrens: []
                    },
                    {
                        id: 422,
                        name: "Вспомогательные средства от диабета",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/diabet\/vspomogatelnye-sredstva-ot-diabeta\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 17,
                name: "Вакцины",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/vakciny\/",
                childrens: []
            },
            {
                id: 28,
                name: "Противомикробные средства",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivomikrobnye-sredstva\/",
                childrens: [
                    {
                        id: 535,
                        name: "Антибактериальные свечи",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivomikrobnye-sredstva\/antibakterialnye-svechi\/",
                        childrens: []
                    },
                    {
                        id: 590,
                        name: "Противомикробные мази ",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivomikrobnye-sredstva\/protivomikrobnye-mazi-\/",
                        childrens: []
                    },
                    {
                        id: 591,
                        name: "Антибактериальные капли",
                        url: "https:\/\/www.apteka24.ua\/medikamenty\/protivomikrobnye-sredstva\/antibakterialnye-kapli\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 29,
                name: "Противоопухолевые средства",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/protivoopuholevye-sredstva\/",
                childrens: []
            },
            {
                id: 44,
                name: "Сыворотки и иммуноглобулины",
                url: "https:\/\/www.apteka24.ua\/medikamenty\/syvorotki-i-immunoglobuliny\/",
                childrens: []
            }
        ]
    },
    {
        id: 1144,
        name: "Продукция Coloplast",
        url: "https:\/\/www.apteka24.ua\/coloplast\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Coloplast.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: []
    },
    {
        id: 52,
        name: "БАД и витамины",
        url: "https:\/\/www.apteka24.ua\/bad\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Supplements.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 145,
                name: "Пивные дрожжи",
                url: "https:\/\/www.apteka24.ua\/bad\/drozhzhi-pivnye\/",
                childrens: []
            },
            {
                id: 146,
                name: "Питательные продукты",
                url: "https:\/\/www.apteka24.ua\/bad\/pitatel-nie-produkti\/",
                childrens: []
            },
            {
                id: 147,
                name: "Минеральные добавки",
                url: "https:\/\/www.apteka24.ua\/bad\/mineral-nie-dobavki\/",
                childrens: []
            },
            {
                id: 148,
                name: "Тонизирующие препараты",
                url: "https:\/\/www.apteka24.ua\/bad\/tonizirujushtie-preparaty\/",
                childrens: []
            },
            {
                id: 149,
                name: "Витамины общие",
                url: "https:\/\/www.apteka24.ua\/bad\/vitamini-obshie\/",
                childrens: []
            },
            {
                id: 150,
                name: "Витамины для диабетиков",
                url: "https:\/\/www.apteka24.ua\/bad\/dlya-diabetikov\/",
                childrens: []
            },
            {
                id: 151,
                name: "Витамины для диеты и похудения",
                url: "https:\/\/www.apteka24.ua\/bad\/dlya-diety-i-pokhudeniya\/",
                childrens: []
            },
            {
                id: 152,
                name: "Сорбенты и детоксиканты",
                url: "https:\/\/www.apteka24.ua\/bad\/sorbenty-i-detoksikanty\/",
                childrens: []
            },
            {
                id: 153,
                name: "Рыбий жир и Омега-3",
                url: "https:\/\/www.apteka24.ua\/bad\/rybiy-zhir-i-omega-3\/",
                childrens: []
            },
            {
                id: 154,
                name: "Витамины для глаз",
                url: "https:\/\/www.apteka24.ua\/bad\/vitaminy-dlya-glaz\/",
                childrens: []
            },
            {
                id: 155,
                name: "Витамины для детей",
                url: "https:\/\/www.apteka24.ua\/bad\/vitaminy-dlya-detey\/",
                childrens: []
            },
            {
                id: 156,
                name: "Витамины для беременных и кормящих",
                url: "https:\/\/www.apteka24.ua\/bad\/vitaminy-dlya-zhenshchin\/",
                childrens: []
            },
            {
                id: 157,
                name: "Витамины для красоты",
                url: "https:\/\/www.apteka24.ua\/bad\/vitaminy-dlya-krasoty\/",
                childrens: []
            },
            {
                id: 159,
                name: "Закваски",
                url: "https:\/\/www.apteka24.ua\/bad\/zakvaski\/",
                childrens: []
            },
            {
                id: 160,
                name: "БАДы для пищеварения",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-pishchevareniya\/",
                childrens: []
            },
            {
                id: 161,
                name: "БАДы для сердца и сосудов",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-serdtsa-i-sosudov\/",
                childrens: []
            },
            {
                id: 162,
                name: "БАДы для щитовидной железы",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-shchitovidnoy-zhelezy\/",
                childrens: []
            },
            {
                id: 163,
                name: "БАДы для органов дыхания",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-organov-dykhaniya\/",
                childrens: []
            },
            {
                id: 164,
                name: "БАДы для суставов",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-sustavov\/",
                childrens: []
            },
            {
                id: 165,
                name: "БАДы для женского здоровья",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-zhenskogo-zdorovya\/",
                childrens: [
                    {
                        id: 509,
                        name: "Витамины и минералы для женщин",
                        url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-zhenskogo-zdorovya\/vitaminy-i-mineraly-dlya-zhenshchin\/",
                        childrens: []
                    },
                    {
                        id: 511,
                        name: "Препараты влияющие на женский гормональный фон",
                        url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-zhenskogo-zdorovya\/vliyayushchiy-na-aktivnost-polovykh-gormonov-zhenshchin\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 166,
                name: "БАДы для мужского здоровья",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-muzhskogo-zdorovya\/",
                childrens: []
            },
            {
                id: 678,
                name: "Фитопрепараты",
                url: "https:\/\/www.apteka24.ua\/bad\/fitopreparaty\/",
                childrens: [
                    {
                        id: 806,
                        name: "Для иммунитета и всего организма",
                        url: "https:\/\/www.apteka24.ua\/bad\/fitopreparaty\/fitopreparaty-dlya-immuniteta-i-vsego-organizma\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 167,
                name: "Витамины для нервной системы",
                url: "https:\/\/www.apteka24.ua\/bad\/dlya-nervnoy-sistemy\/",
                childrens: []
            },
            {
                id: 168,
                name: "БАДы для мочеполовой системы",
                url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-mochepolovoy-sistemy\/",
                childrens: [
                    {
                        id: 512,
                        name: "Для лечения и профилактики образования камней",
                        url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-mochepolovoy-sistemy\/dlya-lecheniya-i-profilaktiki-obrazovaniya-kamney\/",
                        childrens: []
                    },
                    {
                        id: 516,
                        name: "Противовоспалительного действия мочеполовой системы и почек",
                        url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-mochepolovoy-sistemy\/protivovospalitelnogo-deystviya-mochepolovoy-sistemy-i-pochek\/",
                        childrens: []
                    },
                    {
                        id: 517,
                        name: "Противовоспалительного действия органов малого таза",
                        url: "https:\/\/www.apteka24.ua\/bad\/bady-dlya-mochepolovoy-sistemy\/protivovospalitelnogo-deystviya-organov-malogo-taza\/",
                        childrens: []
                    }
                ]
            }
        ]
    },
    {
        id: 8,
        name: "Медицинские товары",
        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/",
        icon: `${env.getMainImageRepository()}/icons/menu/MedsProd.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 1103,
                name: "Медицинская техника и приборы",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/",
                childrens: [
                    {
                        id: 57,
                        name: "Глюкометры",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/glyukometri\/",
                        childrens: []
                    },
                    {
                        id: 88,
                        name: "Тонометры",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/tonometry\/",
                        childrens: [
                            {
                                id: 456,
                                name: "Тонометр Omron",
                                url: "tonometr-omron",
                                childrens: []
                            },
                            {
                                id: 988,
                                name: "Тонометры автоматические Microlife",
                                url: "tonometri-avtomatichni-microlife",
                                childrens: []
                            },
                            {
                                id: 989,
                                name: "Тонометры механические Microlife",
                                url: "tonometri-mekhanichni-microlife",
                                childrens: []
                            },
                            {
                                id: 990,
                                name: "Тонометры полуавтоматические Microlife",
                                url: "tonometri-napivavtomatichni-microlife",
                                childrens: []
                            },
                            {
                                id: 991,
                                name: "Тонометры автоматические Vega",
                                url: "tonometri-avtomatichni-vega",
                                childrens: []
                            },
                            {
                                id: 992,
                                name: "Тонометры механические Vega",
                                url: "tonometri-mekhanichni-vega",
                                childrens: []
                            },
                            {
                                id: 993,
                                name: "Тонометры полуавтоматические Vega",
                                url: "tonometri-napivavtomatichni-vega",
                                childrens: []
                            }
                        ]
                    },
                    {
                        id: 94,
                        name: "Ингаляторы и небулайзеры",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/ingalyatory-i-nebulayzery\/",
                        childrens: [
                            {
                                id: 457,
                                name: "Ингалятор Omron",
                                url: "ingalyator-omron",
                                childrens: []
                            },
                            {
                                id: 984,
                                name: "Небулайзеры Microlife",
                                url: "nebulayzeri-microlife",
                                childrens: []
                            },
                            {
                                id: 985,
                                name: "Небулайзеры Vega",
                                url: "nebulayzeri-vega",
                                childrens: []
                            }
                        ]
                    },
                    {
                        id: 95,
                        name: "Стетоскопы",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/stetoskopy\/",
                        childrens: []
                    },
                    {
                        id: 58,
                        name: "Термометры",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-tekhnika-i-pribory\/termometri\/",
                        childrens: [
                            {
                                id: 986,
                                name: "Термометры электронные Microlife",
                                url: "termometri-elektronni-microlife",
                                childrens: []
                            },
                            {
                                id: 987,
                                name: "Термометры электронные Vega",
                                url: "termometr-elektronniy-vega",
                                childrens: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 186,
                name: "Изделия медицинского назначения",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/",
                childrens: [
                    {
                        id: 557,
                        name: "Гинекологические наборы",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/ginekologicheskie-nabory\/",
                        childrens: []
                    },
                    {
                        id: 632,
                        name: "Контейнеры для анализов",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/konteynery-dlya-analizov\/",
                        childrens: []
                    },
                    {
                        id: 1120,
                        name: "Грелки",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/grelki\/",
                        childrens: []
                    },
                    {
                        id: 1121,
                        name: "Массажеры и банки для массажа",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/massazhery-i-banki-dlya-massazha\/",
                        childrens: []
                    },
                    {
                        id: 1122,
                        name: "Пленка для рентгена",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/plenka-dlya-rentgena\/",
                        childrens: []
                    },
                    {
                        id: 1123,
                        name: "Покрытия операционные",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/pokrytiya-operatsionnye\/",
                        childrens: []
                    },
                    {
                        id: 710,
                        name: "Протезы для груди",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/izdeliya-meditcinskogo-naznacheniya\/protezy-dlya-grudi\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 707,
                name: "Бандажи",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/",
                childrens: [
                    {
                        id: 731,
                        name: "Бандажи для шеи",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazh-na-sheynyy-otdel\/",
                        childrens: []
                    },
                    {
                        id: 727,
                        name: "Бандаж на плечевой пояс",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazh-na-plechevoy-poyas\/",
                        childrens: []
                    },
                    {
                        id: 724,
                        name: "Бандаж для руки (поддерживающий)",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/kosynka-podderzhivayushchiy-bandazh\/",
                        childrens: []
                    },
                    {
                        id: 725,
                        name: "Бандажи на локтевой сустав",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-na-loktevoy-sustav\/",
                        childrens: []
                    },
                    {
                        id: 726,
                        name: "Бандажи на лучезапястный сустав",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-na-luchezapyastnyy-sustav\/",
                        childrens: []
                    },
                    {
                        id: 623,
                        name: "Бандаж послеоперационный",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazh-posleoperatsionnyy\/",
                        childrens: []
                    },
                    {
                        id: 719,
                        name: "Грыжевые бандажи",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/gryzhevye-bandazhi\/",
                        childrens: []
                    },
                    {
                        id: 715,
                        name: "Бандажи до- послеродовые",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-do-poslerodovye\/",
                        childrens: []
                    },
                    {
                        id: 729,
                        name: "Бандажи на тазобедренный сустав",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-na-tazobedrennyy-sustav\/",
                        childrens: []
                    },
                    {
                        id: 721,
                        name: "Бандажи на коленный сустав",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-na-kolennyy-sustav\/",
                        childrens: []
                    },
                    {
                        id: 718,
                        name: "Бандажи на голеностопный сустав",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/bandazhi-na-golenostopnyy-sustav\/",
                        childrens: []
                    },
                    {
                        id: 717,
                        name: "Вальгусные бандажи",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/valgusnye-bandazhi\/",
                        childrens: []
                    },
                    {
                        id: 1109,
                        name: "Эластичные бинты",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/korsetno-bandazhnaya-produktsiya\/elastichnye-binty\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1104,
                name: "Ортопедические товары",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/",
                childrens: [
                    {
                        id: 722,
                        name: "Корректоры осанки",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/korrektory-osanki\/",
                        childrens: []
                    },
                    {
                        id: 723,
                        name: "Корсеты пояснично-кресцовые",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/korsety-poyasnichno-krestsovye\/",
                        childrens: []
                    },
                    {
                        id: 730,
                        name: "Тутор",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/tutor\/",
                        childrens: []
                    },
                    {
                        id: 708,
                        name: "Обувь ортопедическая",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/obuv-ortopedicheskaya\/",
                        childrens: []
                    },
                    {
                        id: 711,
                        name: "Стельки ортопедические",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/stelki-ortopedicheskie\/",
                        childrens: []
                    },
                    {
                        id: 737,
                        name: "Ортопедические вкладыши, подпяточники, разделители",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/ortopedicheskie-vkladyshi-podpyatochniki-razdeliteli\/",
                        childrens: []
                    },
                    {
                        id: 739,
                        name: "Полустельки ортопедические",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/polustelki-ortopedicheskie\/",
                        childrens: []
                    },
                    {
                        id: 713,
                        name: "Стельки диабетические",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/stelki-diabeticheskie\/",
                        childrens: []
                    },
                    {
                        id: 709,
                        name: "Подушки ортопедические",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ortopedicheskie-tovary\/podushki-ortopedicheskie\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 701,
                name: "Компрессионный трикотаж",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/",
                childrens: [
                    {
                        id: 703,
                        name: "Гольфы компрессионные",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/golfy\/",
                        childrens: []
                    },
                    {
                        id: 704,
                        name: "Компрессионные колготы",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/kolgoty\/",
                        childrens: []
                    },
                    {
                        id: 706,
                        name: "Компрессионные чулки",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/chulki\/",
                        childrens: []
                    },
                    {
                        id: 705,
                        name: "Товары после липосакции",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/tovary-posle-liposaktsii\/",
                        childrens: []
                    },
                    {
                        id: 702,
                        name: "Антиэмболический трикотаж",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/kompressionnyy-trikotazh\/antiembolicheskiy-trikotazh\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1106,
                name: "Манипуляционные средства",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/manipulyatsionnye-sredstva\/",
                childrens: [
                    {
                        id: 624,
                        name: "Канюля",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/manipulyatsionnye-sredstva\/kanyulya\/",
                        childrens: []
                    },
                    {
                        id: 1124,
                        name: "Катетеры",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/manipulyatsionnye-sredstva\/katetery\/",
                        childrens: []
                    },
                    {
                        id: 548,
                        name: "Шприцы одноразовые",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/manipulyatsionnye-sredstva\/shpritsy-odnorazovye\/",
                        childrens: []
                    },
                    {
                        id: 633,
                        name: "Спринцовки (клизмы)",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/manipulyatsionnye-sredstva\/sprintsovka\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1107,
                name: "Перевязочные средства",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/perevyazochnye-sredstva\/",
                childrens: [
                    {
                        id: 555,
                        name: "Вата",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/perevyazochnye-sredstva\/vata\/",
                        childrens: []
                    },
                    {
                        id: 1125,
                        name: "Бинты",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/perevyazochnye-sredstva\/binty\/",
                        childrens: []
                    },
                    {
                        id: 1126,
                        name: "Пластыри",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/perevyazochnye-sredstva\/plastyri\/",
                        childrens: []
                    },
                    {
                        id: 1127,
                        name: "Марля",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/perevyazochnye-sredstva\/marlya\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1105,
                name: "Уход за больными",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/",
                childrens: [
                    {
                        id: 463,
                        name: "Пеленки для взрослых",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/pelenki\/",
                        childrens: []
                    },
                    {
                        id: 461,
                        name: "Подгузники для взрослых",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/podguzniki-dlya-vzroslykh\/",
                        childrens: []
                    },
                    {
                        id: 462,
                        name: "Урологические прокладки",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/urologicheskie-prokladki\/",
                        childrens: []
                    },
                    {
                        id: 1110,
                        name: "Калоприемники",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/kalopriemniki\/",
                        childrens: []
                    },
                    {
                        id: 1111,
                        name: "Мочеприемники",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/mochepriemniki\/",
                        childrens: []
                    },
                    {
                        id: 132,
                        name: "Средства ухода за стомой",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/ukhod-za-bolnymi\/sredstva-ukhoda-za-stomoy\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1108,
                name: "Планирование семьи",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/planirovanie-semi\/",
                childrens: [
                    {
                        id: 505,
                        name: "Тесты для определения беременности",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/planirovanie-semi\/testy-dlya-opredeleniya-beremennosti\/",
                        childrens: []
                    },
                    {
                        id: 1131,
                        name: "Тесты для определения овуляции",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/planirovanie-semi\/testy-dlya-opredeleniya-ovulyatsii\/",
                        childrens: []
                    },
                    {
                        id: 169,
                        name: "Лубриканты (гель-смазки)",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/planirovanie-semi\/lubrikanty-gel-smazki\/",
                        childrens: []
                    },
                    {
                        id: 1132,
                        name: "Презервативы",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/planirovanie-semi\/prezervativy\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 187,
                name: "Диагностические средства",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/diagnosticheskie-sredstva\/",
                childrens: [
                    {
                        id: 560,
                        name: "Диагностические тесты",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/diagnosticheskie-sredstva\/diagnosticheskie-testy\/",
                        childrens: []
                    },
                    {
                        id: 1133,
                        name: "Ланцеты для глюкометра",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/diagnosticheskie-sredstva\/lantsety-dlya-glyukometra\/",
                        childrens: []
                    },
                    {
                        id: 458,
                        name: "Тест-полоски для глюкометра",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/diagnosticheskie-sredstva\/test-poloski-dlya-glyukometra\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 127,
                name: "Медицинская одежда",
                url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-odezhda\/",
                childrens: [
                    {
                        id: 636,
                        name: "Маска медицинская",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-odezhda\/maska-meditsinskaya\/",
                        childrens: []
                    },
                    {
                        id: 634,
                        name: "Халат медицинский",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-odezhda\/khalat-meditsinskiy\/",
                        childrens: []
                    },
                    {
                        id: 565,
                        name: "Перчатки медицинские",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-odezhda\/perchatki-meditsinskie\/",
                        childrens: []
                    },
                    {
                        id: 635,
                        name: "Бахилы",
                        url: "https:\/\/www.apteka24.ua\/medicinskaja-tehnika\/meditsinskaya-odezhda\/bakhily\/",
                        childrens: []
                    }
                ]
            }
        ]
    },
    {
        id: 15,
        name: "Антибиотики",
        url: "https:\/\/www.apteka24.ua\/antibiotiki\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Antibiotics.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 521,
                name: "Антибиотики при гриппе",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/antibiotiki-pri-grippe\/",
                childrens: []
            },
            {
                id: 244,
                name: "Антибиотики при ангине",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-angine\/",
                childrens: []
            },
            {
                id: 245,
                name: "Антибиотики при бронхите",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-bronkhite\/",
                childrens: []
            },
            {
                id: 246,
                name: "Антибиотики при отите",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-otite\/",
                childrens: []
            },
            {
                id: 247,
                name: "Антибиотики при гайморите",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-gaymorite\/",
                childrens: []
            },
            {
                id: 248,
                name: "Антибиотики при цистите",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-tsistite\/",
                childrens: []
            },
            {
                id: 249,
                name: "Антибиотики при пневмонии",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-pnevmonii\/",
                childrens: []
            },
            {
                id: 250,
                name: "Антибиотики при диареи",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/pri-diarei\/",
                childrens: []
            },
            {
                id: 251,
                name: "Антибиотики в стоматологии",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/v-stomatologii\/",
                childrens: []
            },
            {
                id: 252,
                name: "Антибиотики в гинекологии",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/v-ginekologii\/",
                childrens: []
            },
            {
                id: 253,
                name: "Антибиотики в дерматологии",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/v-dermatologii\/",
                childrens: []
            },
            {
                id: 254,
                name: "Антибиотики для детей",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/dlya-detey\/",
                childrens: []
            },
            {
                id: 255,
                name: "Антибиотик для глаз",
                url: "https:\/\/www.apteka24.ua\/antibiotiki\/dlya-glaz\/",
                childrens: []
            }
        ]
    },
    {
        id: 197,
        name: "Товары для косметологов",
        url: "https:\/\/www.apteka24.ua\/kosmetologiya\/",
        icon: `${env.getMainImageRepository()}/icons/menu/CosmProd.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 200,
                name: "Перчатки",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/perchatki\/",
                childrens: []
            },
            {
                id: 201,
                name: "Шприцы",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/shpritsy\/",
                childrens: []
            },
            {
                id: 203,
                name: "Антисептики и дезинфицирующие",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/antiseptiki-i-dezinfitsiruyushchie\/",
                childrens: []
            },
            {
                id: 202,
                name: "Анестетики",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/anesteziya\/",
                childrens: []
            },
            {
                id: 232,
                name: "Ботулинотерапия",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/botulinoterapiya\/",
                childrens: []
            },
            {
                id: 199,
                name: "Контурная пластика",
                url: "https:\/\/www.apteka24.ua\/kosmetologiya\/inektsii-krasoty\/",
                childrens: []
            }
        ]
    },
    {
        id: 14,
        name: "Товары для мам и детей",
        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Child&MomsProd.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 93,
                name: "Детские аксессуары",
                url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskie-aksessuary\/",
                childrens: [
                    {
                        id: 450,
                        name: "Пустышки",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskie-aksessuary\/pustyshki\/",
                        childrens: []
                    },
                    {
                        id: 452,
                        name: "Детские соски",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskie-aksessuary\/detskie-soski\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1082,
                name: "Товары для мам",
                url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/tovary-dlya-mam\/",
                childrens: [
                    {
                        id: 1083,
                        name: "Молокоотсос",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/tovary-dlya-mam\/molokootsos\/",
                        childrens: []
                    },
                    {
                        id: 1086,
                        name: "Прокладки для груди",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/tovary-dlya-mam\/prokladki-dlya-grudi\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1080,
                name: "Аксессуары для кормления",
                url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/aksessuary-dlya-kormleniya\/",
                childrens: [
                    {
                        id: 1081,
                        name: "Комплекты для кормления",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/aksessuary-dlya-kormleniya\/komplekty-dlya-kormleniya\/",
                        childrens: []
                    },
                    {
                        id: 944,
                        name: "Соски для бутылочек",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/aksessuary-dlya-kormleniya\/soski-dlya-butylochek\/",
                        childrens: []
                    },
                    {
                        id: 453,
                        name: "Детские бутылочки и поильники",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/aksessuary-dlya-kormleniya\/detskie-butylochki\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 139,
                name: "Детская косметика",
                url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/",
                childrens: [
                    {
                        id: 948,
                        name: "Детское жидкое мыло",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskoe-zhidkoe-mylo\/",
                        childrens: []
                    },
                    {
                        id: 444,
                        name: "Детский шампунь",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskiy-shampun\/",
                        childrens: []
                    },
                    {
                        id: 445,
                        name: "Детское масло",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskoe-maslo\/",
                        childrens: []
                    },
                    {
                        id: 446,
                        name: "Детская присыпка",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskaya-prisypka\/",
                        childrens: []
                    },
                    {
                        id: 447,
                        name: "Детское мыло",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskoe-mylo\/",
                        childrens: []
                    },
                    {
                        id: 448,
                        name: "Детский крем",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/detskaya-kosmetika\/detskiy-krem\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 1084,
                name: "Гигиена малышей",
                url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/gigiena-malyshey\/",
                childrens: [
                    {
                        id: 1085,
                        name: "Ватные палочки",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/gigiena-malyshey\/vatnye-palochki\/",
                        childrens: []
                    },
                    {
                        id: 136,
                        name: "Подгузники",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/gigiena-malyshey\/detskie-podguzniki\/",
                        childrens: []
                    },
                    {
                        id: 137,
                        name: "Пеленки",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/gigiena-malyshey\/detskie-pelenki\/",
                        childrens: []
                    },
                    {
                        id: 138,
                        name: "Влажные салфетки",
                        url: "https:\/\/www.apteka24.ua\/mama-i-malysh\/gigiena-malyshey\/detskie-vlazhnye-salfetki\/",
                        childrens: []
                    }
                ]
            }
        ]
    },
    {
        id: 975,
        name: "Оптика",
        url: "https:\/\/www.apteka24.ua\/optika\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Optics.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 976,
                name: "Контактные линзы",
                url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/",
                childrens: [
                    {
                        id: 1098,
                        name: "Линзы День-Ночь",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/linzy-den-noch\/",
                        childrens: []
                    },
                    {
                        id: 1099,
                        name: "Линзы на 1 месяц",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/linzy-na-1-mesyats\/",
                        childrens: []
                    },
                    {
                        id: 1100,
                        name: "Однодневные линзы",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/odnodnevnye-linzy\/",
                        childrens: []
                    },
                    {
                        id: 1101,
                        name: "Квартальные линзы",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/kvartalnye-linzy\/",
                        childrens: []
                    },
                    {
                        id: 977,
                        name: "Мультифокальные линзы",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/multifokalnye-linzy\/",
                        childrens: []
                    },
                    {
                        id: 978,
                        name: "Линзы для дали",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/linzy-dlya-dali\/",
                        childrens: []
                    },
                    {
                        id: 979,
                        name: "Цветные линзы",
                        url: "https:\/\/www.apteka24.ua\/optika\/kontaktnye-linzy\/tsvetnye-linzy\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 587,
                name: "Раствор для линз",
                url: "https:\/\/www.apteka24.ua\/optika\/rastvor-dlya-linz-\/",
                childrens: []
            }
        ]
    },
    {
        id: 48,
        name: "Косметика и гигиена",
        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/",
        icon: `${env.getMainImageRepository()}/icons/menu/Cosmetics&Gigien.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: []
        },
        subItems: [
            {
                id: 178,
                name: "Средства для лица",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/",
                childrens: [
                    {
                        id: 475,
                        name: "Гигиенические помады",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/gigienicheskie-pomady\/",
                        childrens: []
                    },
                    {
                        id: 497,
                        name: "Средства от купероза и демодекоза",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/sredstva-ot-kuperoza-i-demodekoza\/",
                        childrens: []
                    },
                    {
                        id: 901,
                        name: "Лосьон для лица",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/loson-dlya-litsa\/",
                        childrens: []
                    },
                    {
                        id: 900,
                        name: "Сыворотки и эликсиры",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/emulsiya-dlya-litsa\/",
                        childrens: []
                    },
                    {
                        id: 855,
                        name: "Очищающее средство для лица",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/ochishchayushchee-sredstvo-dlya-litsa\/",
                        childrens: []
                    },
                    {
                        id: 500,
                        name: "Маски для лица",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/maski-dlya-litsa\/",
                        childrens: []
                    },
                    {
                        id: 499,
                        name: "Средства для снятия макияжа",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/sredstva-dlya-snyatiya-makiyazha\/",
                        childrens: []
                    },
                    {
                        id: 472,
                        name: "Кремы для лица",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-litsa\/kremy-dlya-litsa\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 176,
                name: "Уход за волосами",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/",
                childrens: [
                    {
                        id: 1069,
                        name: "Масла для волос",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/masla-dlya-volos\/",
                        childrens: []
                    },
                    {
                        id: 889,
                        name: "Кондиционер",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/konditsionery-dlya-volos\/",
                        childrens: []
                    },
                    {
                        id: 503,
                        name: "Бальзамы и маски для волос",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/balzamy-i-maski-dlya-volos\/",
                        childrens: []
                    },
                    {
                        id: 483,
                        name: "Средства от выпадения волос",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/sredstva-protiv-vypadeniya-volos\/",
                        childrens: []
                    },
                    {
                        id: 349,
                        name: "Шампуни",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-volosami\/shampuni-dlya-volos\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 181,
                name: "Средства для тела",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-tela\/",
                childrens: [
                    {
                        id: 893,
                        name: "Лосьон для тела",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-tela\/loson-dlya-tela\/",
                        childrens: []
                    },
                    {
                        id: 473,
                        name: "Крем для тела",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-tela\/kremy-dlya-tela\/",
                        childrens: []
                    },
                    {
                        id: 1070,
                        name: "Антиперспиранты",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-tela\/antiperspiranty\/",
                        childrens: []
                    },
                    {
                        id: 501,
                        name: "Средства для загара",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-tela\/kremy-dlya-zagara\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 175,
                name: "Средства для душа и ванны",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-dusha-i-vanny\/",
                childrens: [
                    {
                        id: 803,
                        name: "Spa наборы",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-dusha-i-vanny\/spa-nabory\/",
                        childrens: []
                    },
                    {
                        id: 801,
                        name: "Скраб",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-dusha-i-vanny\/skrab-dlya-litsa-i-tela\/",
                        childrens: []
                    },
                    {
                        id: 938,
                        name: "Средства для интимной гигиены",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-dusha-i-vanny\/sredstva-dlya-intimnoy-gigieny\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 180,
                name: "Уход за руками и ногтями",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-rukami-i-nogtyami\/",
                childrens: [
                    {
                        id: 854,
                        name: "Крем для рук",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/ukhod-za-rukami-i-nogtyami\/krem-dlya-ruk\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 179,
                name: "Средства для ног",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-nog\/",
                childrens: [
                    {
                        id: 912,
                        name: "Дезодорант для ног",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-nog\/dezodorant-dlya-nog\/",
                        childrens: []
                    },
                    {
                        id: 474,
                        name: "Кремы для ног",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-nog\/kremy-dlya-nog\/",
                        childrens: []
                    },
                    {
                        id: 504,
                        name: "Средства для заживления трещин на пятках",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-dlya-nog\/sredstva-dlya-zazhivleniya-treshchin-na-pyatkakh\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 857,
                name: "Декоративная косметика",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/dekorativnaya-kosmetika\/",
                childrens: [
                    {
                        id: 496,
                        name: "Тональные и матирующие средства",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/dekorativnaya-kosmetika\/tonalnye-i-matiruyushchie-sredstva\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 171,
                name: "Средства женской гигиены",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-zhenskoy-gigieny\/",
                childrens: [
                    {
                        id: 454,
                        name: "Тампоны",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-zhenskoy-gigieny\/tampony\/",
                        childrens: []
                    },
                    {
                        id: 487,
                        name: "Прокладки ежедневные",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-zhenskoy-gigieny\/prokladki-ezhednevnye\/",
                        childrens: []
                    },
                    {
                        id: 488,
                        name: "Прокладки для критических дней",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/sredstva-zhenskoy-gigieny\/prokladki-dlya-kriticheskikh-dney\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 87,
                name: "Лечебная косметика",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnaja-kosmetika\/",
                childrens: []
            },
            {
                id: 85,
                name: "Гигиена полости рта",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/",
                childrens: [
                    {
                        id: 1074,
                        name: "Освежитель для полости рта",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/osvezhitel-dlya-polosti-rta\/",
                        childrens: []
                    },
                    {
                        id: 348,
                        name: "Зубные щетки",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/zubnye-shchetki\/",
                        childrens: []
                    },
                    {
                        id: 468,
                        name: "Средства для зубных протезов",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/sredstva-dlya-zubnykh-protezov\/",
                        childrens: []
                    },
                    {
                        id: 469,
                        name: "Зубные нити ленты",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/zubnye-niti-lenty\/",
                        childrens: []
                    },
                    {
                        id: 470,
                        name: "Зубные пасты",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/zubnye-pasty\/",
                        childrens: []
                    },
                    {
                        id: 484,
                        name: "Зубные щетки для детей",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/zubnye-shchetki-dlya-detey\/",
                        childrens: []
                    },
                    {
                        id: 485,
                        name: "Ополаскиватели для рта",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/gigiena-polosti-rta\/opolaskivateli-dlya-rta\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 90,
                name: "Лечебные масла",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/",
                childrens: [
                    {
                        id: 598,
                        name: "Массажное масло",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/massazhnoe-maslo\/",
                        childrens: []
                    },
                    {
                        id: 599,
                        name: "Эфирные масла ",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/efirnye-masla-\/",
                        childrens: []
                    },
                    {
                        id: 600,
                        name: "Эфирные масла для волос ",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/efirnye-masla-dlya-volos-\/",
                        childrens: []
                    },
                    {
                        id: 601,
                        name: "Эфирные масла для лица ",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/efirnye-masla-dlya-litsa-\/",
                        childrens: []
                    },
                    {
                        id: 602,
                        name: "Эфирные масла для кожи  ",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/lechebnye-masla\/efirnye-masla-dlya-kozhi-\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 142,
                name: "Диспорт",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/disport\/",
                childrens: []
            },
            {
                id: 125,
                name: "Косметика Реванесс - Revanesse",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/revanes\/",
                childrens: []
            },
            {
                id: 1071,
                name: "Для мужчин",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/dlya-muzhchin\/",
                childrens: [
                    {
                        id: 802,
                        name: "Средства для бороды",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/dlya-muzhchin\/sredstva-dlya-borody\/",
                        childrens: []
                    },
                    {
                        id: 922,
                        name: "Шампунь для мужчин",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/dlya-muzhchin\/shampun-dlya-muzhchin\/",
                        childrens: []
                    }
                ]
            },
            {
                id: 495,
                name: "Уход за кожей вокруг глаз",
                url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/kremy-dlya-kozhi-vokrug-glaz\/",
                childrens: [
                    {
                        id: 1061,
                        name: "Кремы для кожи вокруг глаз",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/kremy-dlya-kozhi-vokrug-glaz\/kremy\/",
                        childrens: []
                    },
                    {
                        id: 1062,
                        name: "Сыворотки для век ",
                        url: "https:\/\/www.apteka24.ua\/kosmetika-i-gigiena\/kremy-dlya-kozhi-vokrug-glaz\/syvorotki\/",
                        childrens: []
                    }
                ]
            }
        ]
    },
    {
        id: 1200,
        name: "Сексуальное здоровье",
        url: "https://www.apteka24.ua/seksualnoe-zdorove/",
        icon: `${env.getMainImageRepository()}/icons/menu/Sexual.svg`,
        promo: {
            url: "",
            preview: "@Image"
        },
        popular: {
            title: "Популярные категории",
            items: [

            ]
        },
        subItems: [
            {
                id: 1201,
                name: "Контрацепция",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/",
                childrens: [
                    {
                        id: 1207,
                        name: "Презервативы",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/prezervativu/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1208,
                        name: "Гормональные контрацептивы",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/gormonalnye-kontratseptivu/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1209,
                        name: "Спирали",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/spirali/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1210,
                        name: "Спермициды",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/spermitsidy/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1211,
                        name: "Экстренная контрацепция",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/kontratseptsia/ekstrennaya-kontratseptsiya/",
                        childrens: [

                        ]
                    }
                ]
            },
            {
                id: 1202,
                name: "Смазки и увлажняющие гели",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/smazki-i-uvlazhnyayushchie-geli/",
                childrens: [
                    {
                        id: 1212,
                        name: "Смазки на водной основе",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/smazki-i-uvlazhnyayushchie-geli/smazki-na-vodnoy-osnove/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1213,
                        name: "Смазки, усиливающие ощущения",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/smazki-i-uvlazhnyayushchie-geli/smazki-usilivayushchie-oshchushcheniya/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1214,
                        name: "Смазки на силиконовой основе",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/smazki-i-uvlazhnyayushchie-geli/smazki-na-silikonovoy-osnove/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1215,
                        name: "Натуральные гель-смазки",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/smazki-i-uvlazhnyayushchie-geli/naturalnye-gel-smazki/",
                        childrens: [

                        ]
                    }
                ]
            },
            {
                id: 1203,
                name: "Интимный уход",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/intimnyy-ukhod/",
                childrens: [
                    {
                        id: 1216,
                        name: "Женские средства для интимной гигиены",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/intimnyy-ukhod/zhenskie-sredstva-dlya-intimnoy-gigieny/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1217,
                        name: "Салфетки для интимной гигиены",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/intimnyy-ukhod/salfetki-dlya-intimnoy-gigieny/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1218,
                        name: "Антисептики для интимной гигиены",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/intimnyy-ukhod/antiseptiki-dlya-intimnoy-gigieny/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1219,
                        name: "Средства для восстановления женской микрофлоры",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/intimnyy-ukhod/sredstva-dlya-vosstanovleniya-zhenskoy-mikroflory/",
                        childrens: [

                        ]
                    }
                ]
            },
            {
                id: 1204,
                name: "Препараты для эрекции",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/preparaty-dlya-erektsii/",
                childrens: [

                ]
            },
            {
                id: 1205,
                name: "Пищевые добавки для сексуального здоровья",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/pishchevye-dobavki-dlya-seksualnogo-zdorovya/",
                childrens: [
                    {
                        id: 1220,
                        name: "Для него",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/pishchevye-dobavki-dlya-seksualnogo-zdorovya/dlya-nego/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1221,
                        name: "Для неё",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/pishchevye-dobavki-dlya-seksualnogo-zdorovya/dlya-neye/",
                        childrens: [

                        ]
                    }
                ]
            },
            {
                id: 1206,
                name: "Зачатие и беременность",
                url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/",
                childrens: [
                    {
                        id: 1222,
                        name: "Тесты на овуляцию",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/testy-na-ovulyatsiyu/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1223,
                        name: "Тесты на беременность",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/testy-na-beremennost/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1224,
                        name: "Пищевые добавки до зачатия",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/pishchevye-dobavki-do-zachatiya/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1225,
                        name: "Пищевые добавки и витамины для беременных",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/pishchevye-dobavki-i-vitaminy-dlya-beremennykh/",
                        childrens: [

                        ]
                    },
                    {
                        id: 1226,
                        name: "Уход за кожей от растяжек",
                        url: "https://www.apteka24.ua/seksualnoe-zdorove/zachatie-i-beremennost/ukhod-za-kozhey-ot-rastyazhek/",
                        childrens: [

                        ]
                    }
                ]
            }
        ]
    }
];
