/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository(),
    bitrixHost = env.getBitrixHost();

export default [
    {
        id: 1,
        name: "Доктор МОМ®",
        description: "комбинированные средства, которые применяются при кашле и простудных заболеваниях",
        url: `${bitrixHost}/mnn/doktor-mom/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/mom.png`
            }
        }
    },
    {
        id: 2,
        name: "Имодиум®",
        description: "противодиарейные средства",
        url: `${bitrixHost}/mnn/imodium/`,
        generic: {
            name: "лоперамид",
            url: `${bitrixHost}/mnn/loperamid/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/imodium2.png`
            }
        }
    },
    {
        id: 3,
        name: "Микролакс®",
        description: "слабительные средства в клизмах",
        url: `${bitrixHost}/mnn/mikrolaks/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/mikrolaks.png`
            }
        }
    },
    {
        id: 4,
        name: "Никоретте®",
        description: "препараты для лечения никотиновой зависимости",
        url: `${bitrixHost}/mnn/nikorette/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/hikopette.png`
            }
        }
    },
    {
        id: 5,
        name: "Визин®",
        description: "средства, применяемые в офтальмологии",
        url: `${bitrixHost}/mnn/vizin/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/vizin.png`
            }
        }
    },
    {
        id: 6,
        name: "Тизин®",
        description: "противоотечные препараты для полости носа",
        url: `${bitrixHost}/mnn/tizin/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/tizin.png`
            }
        }
    },
    {
        id: 7,
        name: "Метрогил Дента®",
        description: "противомикробные и антисептические средства для местного применения в стоматологии",
        url: `${bitrixHost}/mnn/metrogil/`,
        generic: {
            name: "метронидазол",
            url: `${bitrixHost}/ingredients/m/metronidazol/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/metrogil.png`
            }
        }
    },
    {
        id: 8,
        name: "Мотилиум®",
        description: "стимуляторы перистальтики",
        url: `${bitrixHost}/mnn/motilium/`,
        generic: {
            name: "домперидон",
            url: `${bitrixHost}/ingredients/d/domperidon/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/imodium.png`
            }
        }
    },
    {
        id: 9,
        name: "Гексорал®",
        description: "противомикробные и антисептические средства для местного применения при простудных заболеваниях",
        url: `${bitrixHost}/mnn/geksoral/`,
        generic: {
            name: "гексетидин",
            url: `${bitrixHost}/ingredients/g/geksetidin/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/gecsoral.png`
            }
        }
    },
    {
        id: 10,
        name: "Ринза®",
        description: "парацетамол, комбинации без психолептиков",
        url: `${bitrixHost}/mnn/rinza/`,
        generic: {
            name: "парацетамол",
            url: `${bitrixHost}/mnn/paracetamol/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/rinza.png`
            }
        }
    },
    {
        id: 11,
        name: "JOHNSON'S® Baby",
        description: "детская косметика",
        url: `${bitrixHost}/mnn/dzhonson/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/johnson.png`
            }
        }
    },
    {
        id: 12,
        name: "Listerine®",
        description: "ополаскиватели для полости рта",
        url: `${bitrixHost}/mnn/listerin/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/listarine.png`
            }
        }
    },
    {
        id: 13,
        name: "Desitin®",
        description: "комбинированный препарат с противовоспалительными свойствами для наружного применения",
        url: `${bitrixHost}/query/search.php?q=Desitin`,
        generic: {
            name: "цинкка оксид",
            url: `${bitrixHost}/ingredients/c/cinka-oksid/`
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/desitin.png`
            }
        }
    },
    {
        id: 14,
        name: "REACH®",
        description: "средства для ухода за ротовой полостью, зубные щетки",
        url: `${bitrixHost}/mnn/reach/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/reach.png`
            }
        }
    },
    {
        id: 15,
        name: "o.b.®",
        description: "гигиенические средства для женщин",
        url: `${bitrixHost}/mnn/tampony/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/ob.png`
            }
        }
    },
    {
        id: 16,
        name: "Carefree®",
        description: "гигиенические средства для женщин",
        url: `${bitrixHost}/mnn/carefree/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/carefree.png`
            }
        }
    },
    {
        id: 17,
        name: "Penaten®",
        description: "детская косметика",
        url: `${bitrixHost}/mnn/penaten/`,
        generic: {
            name: "",
            url: ""
        },
        rating: 5,
        logo: {
            alt: "",
            title: "",
            src: {
                original: "",
                small: `${repositoryURL}/manufacturer/johnson/pematen.png`
            }
        }
    }
];
