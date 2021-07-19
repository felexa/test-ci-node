import React from "react";

class Mailing extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="mailing rounded-16 bg-white new-super-box-shadow p-16">
                <div className="mailing__content rounded-16 p-24 d-md-flex justify-content-between align-items-center">
                    <div>
                        <header className="mailing__header">
                            <div className="mailing__title f-weight-5 text-size--h4 text-black">
                                Оформите нашу рассылку с самыми полезными статьями для здоровья и жизни
                            </div>
                        </header>

                        <div className="mailing__body">
                            <form className="mailing__subscribe d-lg-flex justify-content-between">
                                <input type="text" className="form-control bg-white" placeholder="Введите Ваш e-mail" />
                                <button type="button" className="btn-default btn-sm">ПОДПИСАТЬСЯ</button>
                            </form>
                        </div>
                    </div>

                    <footer className="mailing__footer">
                        <div className="mailing__preview">
                            <img src="https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/blog/blog-mailing.png" alt="#" />
                        </div>
                    </footer>
                </div>
            </section>
        );
    }
}

export default Mailing;
