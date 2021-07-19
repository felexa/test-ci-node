import React from "react";

class Warning extends React.Component {
    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="warning warning--personal alert-warning">
                <p>
                    <strong>
                        Согласие на использование и обработку персональных данных
                    </strong>
                </p>

                <p>
                    Информация, которую мы предоставляем на apteka24.ua, не предназначена для замены консультации с
                    врачом. Взаимодействуя с этим сайтом, вы соглашаетесь с нашим&nbsp;
                    <a href="/editorial-policy/#responsibility" target="_blank">Отказом от ответственности</a>.
                </p>

                <p>
                    Используя сайт apteka24.ua, вы выражаете согласие на сбор и обработку ваших персональных данных,
                    в том числе с привлечением сторонних сервисов, с применением cookie-файлов и средств анализа
                    поведения пользователей, согласно нашей&nbsp;
                    <a href="/terms/" target="_blank">Политике конфиденциальности</a>.
                </p>

                <p>
                    Вы принимаете условия нашего <a href="/agreement/" target="_blank">Соглашения об использовании</a>.
                </p>
            </div>
        );
    }
}

export default Warning;
