import Env from "app/core/environment";

let env = Env.getInstance();

export default {
    title: "Препарати Нікоретте®",
    items: [
        {
            id: 1,
            title: "Спрей",
            preview: `${env.getMainImageRepository()}/landings/nicorette/spray.png`,
            link: `${env.getBitrixHost()}/nikorette-svezhaya-myata-sprey-d-rot-pol-1mg-doza-150doz-poliet-1_5196012/`,
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-sec.png`,
                    description: "Сприяє зниженню тяги до паління через 60 сек"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-purse.png`,
                    description: "Містить 150 доз у флаконі"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-mint.png`,
                    description: "Має приємний смак свіжої м’яти"
                }
            ]
        },
        {
            id: 2,
            title: "ЛЬОДЯНИКИ",
            preview: `${env.getMainImageRepository()}/landings/nicorette/candy.png`,
            link: `${env.getBitrixHost()}/nikorette-ledyanaya-myata-led-press-4mg-20-flip-up_5196013/`,
            sticker: "Новинка",
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-min.png`,
                    description: "Зменшує тягу до паління вже через 5 хв"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-quiet.png`,
                    description: "Тихий і непомітний формат"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-snowflake.png`,
                    description: "Має приємний смак крижаної м’яти"
                }
            ]
        },
        {
            id: 3,
            title: "ЖУВАЛЬНІ ГУМКИ",
            preview: `${env.getMainImageRepository()}/landings/nicorette/gum.png`,
            link: `${env.getBitrixHost()}/nikorette-zimnyaya-myata-4mg-n30/`,
            features: [
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-plus.png`,
                    description: "Допомагає уникнути розвитку нікотинової залежності"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-whitening.png`,
                    description: "Мають відбілюючий ефект"
                },
                {
                    icon: `${env.getMainImageRepository()}/landings/nicorette/icons/icon-fruits.png`,
                    description: "Широка лінійка смаків: м’ята та фрукти"
                }
            ]
        }
    ]
};
