import Env from "app/core/environment";

let env = Env.getInstance(),
    getBitrixHost = env.getBitrixHost();

export default {
    ru: [
        {
            id: 1,
            name: "Препараты для нервной системы",
            url: `${getBitrixHost}/medikamenty/nervnaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyNervnoySistemy.jpg`
                }
            }
        },
        {
            id: 2,
            name: "Препараты для сердечно-сосудистой системы",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/serdechnoSosudistoySistemy.jpg`
                }
            }
        },
        {
            id: 3,
            name: "Препараты от простуды",
            url: `${getBitrixHost}/medikamenty/respiratornaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyProstuda.jpg`
                }
            }
        },
        {
            id: 4,
            name: "Обезболивающие средства",
            url: `${getBitrixHost}/medikamenty/boleutoljajushtie-sredstva/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/obezbalivauchzie.jpg`
                }
            }
        },
        {
            id: 5,
            name: "Препараты для желудочно-кишечного тракта",
            url: `${getBitrixHost}/medikamenty/zheludochno-kishechnyj-trakt/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyCheludok.jpg`
                }
            }
        },
        {
            id: 6,
            name: "Препараты для опорно-двигательного аппарата",
            url: `${getBitrixHost}/medikamenty/oporno-dvigateljnyj-apparat/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/opornoDvigatelnogoAparata.jpg`
                }
            }
        }
    ],
    uk: [
        {
            id: 1,
            name: "Препарати для нервової системи",
            url: `${getBitrixHost}/medikamenty/nervnaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyNervnoySistemy.jpg`
                }
            }
        },
        {
            id: 2,
            name: "Препарати для серцево-судинної системи",
            url: `${getBitrixHost}/medikamenty/serdechno-sosudistaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/serdechnoSosudistoySistemy.jpg`
                }
            }
        },
        {
            id: 3,
            name: "Препарати від застуди",
            url: `${getBitrixHost}/medikamenty/respiratornaja-sistema/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyProstuda.jpg`
                }
            }
        },
        {
            id: 4,
            name: "Знеболюючі засоби",
            url: `${getBitrixHost}/medikamenty/boleutoljajushtie-sredstva/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/obezbalivauchzie.jpg`
                }
            }
        },
        {
            id: 5,
            name: "Препарати для шлунково-кишкового тракту",
            url: `${getBitrixHost}/medikamenty/zheludochno-kishechnyj-trakt/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/preparatyCheludok.jpg`
                }
            }
        },
        {
            id: 6,
            name: "Препарати для опорно-рухового апарату",
            url: `${getBitrixHost}/medikamenty/oporno-dvigateljnyj-apparat/`,
            icon: {
                src: {
                    original: `${env.getMainImageRepository()}/category/opornoDvigatelnogoAparata.jpg`
                }
            }
        }
    ]
};
