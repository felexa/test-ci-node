/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default [
    {
        id: 1,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/science.svg`,
                small: `${repositoryURL}/manufacturer/farkos/science.svg`
            }
        },
        description: "Укрепилась научно- исследовательская база, создана собственная методология по разработке новых лекарственных средств, расширилась инфраструктура по их внедрению и производству."
    },
    {
        id: 2,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/warehouses.svg`,
                small: `${repositoryURL}/manufacturer/farkos/warehouses.svg`
            }
        },
        description: "В 2010 году открыли оптовый аптечный склад, благодаря которому повысилась эффективность работы логистической службы."
    },
    {
        id: 4,
        icon: {
            alt: "",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/health-products.svg`,
                small: `${repositoryURL}/manufacturer/farkos/health-products.svg`
            }
        },
        description: "В 2013 году запущена разработка линейки «Продуктов для здоровья»: «Мембратон», «ЦитоВел», «ИммуноВел»."
    }
];
