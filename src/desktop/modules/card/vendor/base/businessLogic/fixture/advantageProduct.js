/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default [
    {
        id: 1,
        title: "Качество",
        description: "Безопасный препарат с простой формулой от известного производителя.",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/quality.svg`,
                small: `${repositoryURL}/manufacturer/farkos/quality.svg`
            }
        }
    },
    {
        id: 2,
        title: "Спокойствие",
        description: "Успокоительное действие днём и улучшение сна ночью. Укрепление нервной системы.",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/calmness.svg`,
                small: `${repositoryURL}/manufacturer/farkos/calmness.svg`
            }
        }
    },
    {
        id: 3,
        title: "Концентрация",
        description: "Улучшение памяти, повышение ясности мышления и работоспособности мозга.",
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/concentration.svg`,
                small: `${repositoryURL}/manufacturer/farkos/concentration.svg`
            }
        }
    }
];
