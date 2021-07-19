/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository(),
    bitrixHost = env.getBitrixHost();

export default [
    {
        id: 1,
        name: "При нарушении пищеварения",
        description: "Препараты для здоровья кишечника и комфортного пищеварения",
        url: `${bitrixHost}/medikamenty/zheludochno-kishechnyj-trakt/filter/price-base-from-0.00-to-10775.80/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/digestion.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/digestion.jpg`
            }
        }
    },
    {
        id: 2,
        name: "При симптомах простуды",
        description: "Препараты при простуде: от боли в горле, от заложенности носа, при кашле и для снижения температуры",
        url: `${bitrixHost}/medikamenty/respiratornaja-sistema/filter/price-base-from-0.00-to-18796.8/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/cold.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/cold.jpg`
            }
        }
    },
    {
        id: 3,
        name: "При симптомах аллергии",
        description: "Препараты от аллергии для облегчения рези в глазах, свободного дыхания и здоровой кожи",
        url: `${bitrixHost}/medikamenty/allergija/filter/price-base-from-0.00-to-1606.20/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/allergy.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/allergy.jpg`
            }
        }
    },
    {
        id: 4,
        name: "Для отказа от курения",
        description: "Средства для отказа от курения, позволяющие безболезненно бросить вредную привычку",
        url: `${bitrixHost}/medikamenty/nervnaja-sistema/ot-tabakokureniya/filter/price-base-from-0.00-to-1254.1/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/smoking.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/smoking.jpg`
            }
        }
    },
    {
        id: 5,
        name: "Средства гигиены",
        description: "Все, что нужно, для того, чтобы поддерживать чистоту и гигиену своего тела",
        url: `${bitrixHost}/kosmetika-i-gigiena/sredstva-zhenskoy-gigieny/filter/price-base-from-0.00-to-90.5/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/hygiene.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/hygiene.jpg`
            }
        }
    },
    {
        id: 6,
        name: "Детские средства",
        description: "Косметические средства для малышей: шампуни, масла и кремы для нежной детской кожи",
        url: `${bitrixHost}/mama-i-malysh/detskaya-kosmetika/filter/price-base-from-0.00-to-141/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/child.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/child.jpg`
            }
        }
    },
    {
        id: 7,
        name: "Уход за ротовой полостью",
        description: "Средства для белоснежной улыбки, свежего дыхания и здоровых дёсен",
        url: `${bitrixHost}/kosmetika-i-gigiena/gigiena-polosti-rta/filter/price-base-from-0.00-to-149.9/brand-is-johnson%20%26%20johnson/apply/`,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/oral.jpg`,
                small: `${repositoryURL}/manufacturer/johnson/oral.jpg`
            }
        }
    }
];
