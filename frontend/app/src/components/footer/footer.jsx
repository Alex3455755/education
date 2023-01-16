import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="center_box center_footer">
                    <div className="footer_top">
                        <p className="footer_text">
                            Ильинский онлайн
                            Кулинария
                            Супермаркет
                            Заморозка
                            Другое
                        </p>
                        <p className="footer_text">
                            Ильинский клуб
                            Акции
                            Доставка и оплата
                            Программа лояльности
                            Политика конфиденциальности
                            Вакансии
                        </p>
                        <div className="conection">
                            <div className="number">
                                <div className="phone">
                                    <img src="img/phone.svg" alt="phone" />
                                </div>
                                <h3 className="number_text">+7 (000) 49-09-99</h3>
                                <br />
                                <h5 className="opacity_text">Ежедневно c 09:00 до 21:00</h5>
                            </div>
                            <div className="social"></div>
                        </div>
                        <div className="subscrbe">
                            <h3 className="subscrbe_text">Подпишитесь на вкусные и полезые новости</h3>
                            <div className="input_subscrbe_box">
                                <input type="text" className="input_subscrbe" />
                                <button className="btn_subscrbe">Подписаться</button>
                            </div>
                            <p className="privacy_policy">Согласен с политикой конфиденциальности</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}