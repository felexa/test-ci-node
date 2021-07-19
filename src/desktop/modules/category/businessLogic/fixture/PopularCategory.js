import Env from "app/core/environment";

let env = Env.getInstance(),
    getBitrixHost = env.getBitrixHost();

export default {
    ru: [
        {
            id: 1,
            name: "Препараты от гриппа",
            url: `${getBitrixHost}/medikamenty/protivovirusnye-sredstva/lechenie-grippa/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyGrippa.png`
                }
            }
        },
        {
            id: 2,
            name: "Препараты от молочницы",
            url: `${getBitrixHost}/medikamenty/ginekologija/lechenie-molochnitsy/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyMolochnitsa2.png`
                }
            }
        },
        {
            id: 3,
            name: "Противогрибковые средства в дерматологии",
            url: `${getBitrixHost}/medikamenty/dermatologicheskie-sredstva/protivogribkovie-v-dermatologii/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/protivogripkovye2.png`
                }
            }
        },
        {
            id: 4,
            name: "Препараты для лечения заболеваний печени",
            url: `${getBitrixHost}/medikamenty/gepatoprotektory/dlya-lecheniya-zabolevaniya-pecheni/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyPecheni2.png`
                }
            }
        },
        {
            id: 5,
            name: "Препараты при болях в почках",
            url: `${getBitrixHost}/medikamenty/urologija/preparaty-pri-bolyakh-v-pochkakh/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyPochki.png`
                }
            }
        },
        {
            id: 6,
            name: "Свечи от геморроя",
            url: `${getBitrixHost}/medikamenty/lechenie-gemorroja/svechi-ot-gemorroya/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/gemoroy.png`
                }
            }
        },
        {
            id: 7,
            name: "Капли от сухости глаз",
            url: `${getBitrixHost}/medikamenty/glaznye-sredstva/kapli-ot-sukhosti-glaz-/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/suhostGlaz2.png`
                }
            }
        },
        {
            id: 8,
            name: "Гипертоническая болезнь препараты",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/gipertoniya.png`
                }
            }
        }
    ],
    uk: [
        {
            id: 1,
            name: "Препарати від грипу",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyGrippa.png`
                }
            }
        },
        {
            id: 2,
            name: "Препарати від молочниці",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyMolochnitsa2.png`
                }
            }
        },
        {
            id: 3,
            name: "Протигрибкові засоби в дерматології",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/protivogripkovye2.png`
                }
            }
        },
        {
            id: 4,
            name: "Препарати для лікування печінки",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyPecheni2.png`
                }
            }
        },
        {
            id: 5,
            name: "Препарати при захворюваннях нирок",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyPochki.png`
                }
            }
        },
        {
            id: 6,
            name: "Свічі від геморою",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/gemoroy.png`
                }
            }
        },
        {
            id: 7,
            name: "Краплі від сухості очей",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/suhostGlaz2.png`
                }
            }
        },
        {
            id: 8,
            name: "Краплі від сухості очей",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/gipertonicheskaya-bolezn/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/gipertoniya.png`
                }
            }
        }
    ]
};
