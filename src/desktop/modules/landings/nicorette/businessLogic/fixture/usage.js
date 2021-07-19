import Env from "app/core/environment";

let env = Env.getInstance();

export default {
    title: "Спосіб застосування",
    items: [
        {
            id: 1,
            preview: `${env.getMainImageRepository()}/landings/nicorette/spray-1.png`,
            subtitle: "Як застосовувати спрей Нікоретте®",
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-alert.png`,
                    description: "Тримайте спрей біля відкритого роту"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-spray.png`,
                    description: "Зробіть впорскування в рот, уникайте губ і горла"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-instruction.png`,
                    description: "Не ковтайте, не вдихайте під час впорскування"
                }
            ]
        },
        {
            id: 2,
            preview: `${env.getMainImageRepository()}/landings/nicorette/candy-1.png`,
            subtitle: "Як застосовувати льодяники Нікоретте®",
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-active.png`,
                    description: "Покладіть льодяник в рот, щоб активувати"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-pause.png`,
                    description: "Періодично переміщуйте льодяники в різні сторони"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-time.png`,
                    description: "Повторюйте. Застосовуйте гумку  протягом 16-19 хвилин"
                }
            ]
        },
        {
            id: 3,
            preview: `${env.getMainImageRepository()}/landings/nicorette/gum-1.png`,
            subtitle: "Як застосовувати жувальні гумки Нікоретте®",
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-active.png`,
                    description: "Пожуйте, щоб активувати"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-instruction.png`,
                    description: "Зробіть паузу, покладіть між зубами і яснами. Коли смак нікотину зникне – знов пожуйте."
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-time.png`,
                    description: "Повторюйте. Застосовуйте гумку протягом 30 хвилин"
                }
            ]
        }
    ]
};
