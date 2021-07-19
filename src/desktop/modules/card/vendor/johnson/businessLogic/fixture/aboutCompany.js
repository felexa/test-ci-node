/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default {
    name: "«Johnson & Johnson»",
    description: `<p>
        Основанная в 1886 году, группа компаний Johnson & Johnson является одной из крупнейших 
        в мире многопрофильных корпораций в сфере здравоохранения. Мы производим медицинское 
        оборудование и приборы для диагностики, лекарственные препараты и товары для гигиены и здоровья человека.
        </p>
        <p>
        В подразделении потребительских товаров для здоровья (Consumer Health)  Johnson & Johnson
        мы помогаем свыше 1,2 миллиарду человек по всему миру вести более здоровый образ жизни
        каждый день с самого первого дня жизни. От продуктов для купания малышей и заживления 
        порезов и царапин до средств для защиты кожи от солнца и смягчающих болезненные ощущения –
        потребители находят полезными наши инновационные решения уже более 130 лет.
        </p>`,
    image: {
        title: "«Johnson & Johnson»",
        alt: "«Johnson & Johnson»",
        src: {
            original: `${repositoryURL}/manufacturer/johnson/johnson-logo.png`,
            small: `${repositoryURL}/manufacturer/johnson/johnson-logo.png`
        }
    }
};
