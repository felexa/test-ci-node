/* eslint-disable max-len */
import links from "app/core/resource/links";

export default {
    properties: {
        title: "Характеристики",
        description: `
                    <div>
                        Характеристики товаров заполняются в соответствии с официальным источником 
                        <a href="${links.stateRegisterOfDrugs}" target="_blank">(Державний реєстр лікарських засобів України)</a>, 
                        являются кратким отображением основных 
                        характеристик препарата и содержат следующие пункты:
                        
                        <ul>
                            <li>АТС-Классификация</li>
                            <li>рецептурный отпуск</li>
                            <li>срок годности</li>
                            <li>дозировка</li>
                            <li>упаковка</li>
                            <li>состав</li>
                            <li>показания</li>
                            <li>противопоказания</li>
                            <li>код Морион</li>
                            <li>фармакотерапевтическая группа</li>
                            <li>действующее вещество</li>
                            <li>украинское название</li>
                        </ul>                  
                    </div>
                `
    },
    instruction: {
        title: "Источники формирования инструкций",
        description: `
                    <p>
                        Данная инструкция соответствует действительности и является достоверной.
                        Официальный источник: <a href="${links.stateRegisterOfDrugs}" target="_blank">Державний реєстр лікарських засобів України</a>
    
                        <span class="color-green f-weight-5"> [Официальный источник]</span>.
                        Публикация инструкции и описания осуществлена на основании

                        <a href="${links.editorialPolicy}" target="_blank"> редакционной политики </a>
                        Медмаркета Аптека24,
                        соответствует <a href="${links.lowOfUkraineAboutDrugs}" target="_blank">Закону Украины «Про лікарські засоби»</a>
    
                        <span class="color-green f-weight-5"> [Официальный источник] </span>
    
                        и <a href="${links.lowOfUkraineAboutCopyright}" target="_blank">Закону Украины «Об авторском праве и смежных правах»</a>
    
                        <span class="color-green f-weight-5"> [Официальный источник]</span>,
    
                        а также проверена уполномоченным цензором. Обновление инструкции на сайте apteka24.ua
                        осуществляется после ее обновления на сайте Государственного реєстра лекарственных средств Украины,
                        либо на официальном сайте производителя
                    </p>
                `
    },
    description: {
        title: "Описание лекарственного средства",
        description: `
                    Данное описание основывается на официальной инструкции или маркетинговом материале с официального 
                    сайта производителя и является доступным для пациента информированием о важных свойствах, 
                    взаимодействиях, клинических характеристиках и особенностях лекарственного средства
                `
    },
    analogs: {
        title: "Алгоритм подбора аналогов лекарственного средства",
        description: `
                    <div>
                        Подбор аналогов лекарственного средства на сайте Медмаркета Аптека24 происходит по алгоритму, 
                        утвержденному <a href="${links.whocc}" target="_blank">Сотрудничающим центром ВОЗ по методологии статистики лекарственных средств</a> и 
                        принятому Министерством здравоохранения Украины:
                        
                        <ul>
                            <li>первый уровень: аналогичные лекарственные средства с тем же действующим веществом, дозировкой и формой выпуска</li>
                            <li>второй уровень: аналогичные лекарственные средства с тем же действующим веществом, дозировкой, но с другой формой выпуска</li>
                            <li>третий уровень: аналогичные лекарственные средства с тем же действующим веществом, но  с другой дозировкой и другой формой выпуска</li>
                            <li>четвертый уровень: аналогичные лекарственные средства, подобранные согласно АТС-классификации, которые могут содержать другое действующее вещество, другую дозировку и другую форму выпуска, но оказывают схожий клинический эффект и могут применяться  для  лечения того же заболевания или имеют влияние на ту же систему органов или органы</li>
                        </ul>                  
                    </div>
                `
    },
    mainProperties: {
        title: "Основные физико-химические свойства",
        description: `
                    Данный блок предназначен для информирования о производителе, классификации лекарственного 
                    средства по температурному режиму хранения, а также о форме выпуска, 
                    объеме и количестве в упаковке
                `
    },
    certificate: {
        title: "Сертификат качества",
        description: `
                    Данный сертификат позволяет удостовериться в качественных характеристиках лекарственного 
                    средства и в его соответствии свойствам, заявленным в инструкции
                `
    }
};
