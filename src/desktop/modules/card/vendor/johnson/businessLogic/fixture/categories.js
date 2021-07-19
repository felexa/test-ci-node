/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository(),
    bitrixHost = env.getBitrixHost();

export default [
    {
        id: 1,
        name: "При нарушении пищеварения",
        description: "Препараты для улучшения пищеварения: при запоре, при вздутии, при диарее, для улучшения моторики желудка",
        url: `${bitrixHost}/medikamenty/zheludochno-kishechnyj-trakt/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        url: `${bitrixHost}/medikamenty/respiratornaja-sistema/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        description: "Препараты для помощи при симптомах аллергии: насморке, заложенности носа и покраснении глаз",
        url: `${bitrixHost}/medikamenty/allergija/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        description: "Препараты, которые помогают отказаться от курения, уменьшают тягу и облегчают симптомы отмены",
        url: `${bitrixHost}/medikamenty/nervnaja-sistema/ot-tabakokureniya/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        description: "Средства для женской гигиены",
        url: `${bitrixHost}/kosmetika-i-gigiena/sredstva-zhenskoy-gigieny/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        url: `${bitrixHost}/mama-i-malysh/detskaya-kosmetika/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
        description: "Средства для комплексного ухода за ротовой полостью для здоровья зубов и десен",
        url: `${bitrixHost}/kosmetika-i-gigiena/gigiena-polosti-rta/filter/brand-is-johnson%20%26%20johnson/apply/`,
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
