import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div class="center_box center_footer">
                    <div class="footer_top">
                        <p class="footer_text">
                            Ильинский онлайн
                            Кулинария
                            Супермаркет
                            Заморозка
                            Другое
                        </p>
                        <p class="footer_text">
                            Ильинский клуб
                            Акции
                            Доставка и оплата
                            Программа лояльности
                            Политика конфиденциальности
                            Вакансии
                        </p>
                        <div class="conection">
                            <div class="number">
                                <div class="phone">
                                    <img src="img/phone.svg" alt="phone" />
                                </div>
                                <h3 class="number_text">+7 (000) 49-09-99</h3>
                                <br />
                                <h5 class="opacity_text">Ежедневно c 09:00 до 21:00</h5>
                            </div>
                            <div class="social"></div>
                        </div>
                        <div class="subscrbe">
                            <h3 class="subscrbe_text">Подпишитесь на вкусные и полезые новости</h3>
                            <div class="input_subscrbe_box">
                                <input type="text" class="input_subscrbe" />
                                <button class="btn_subscrbe">Подписаться</button>
                            </div>
                            <p class="privacy_policy">Согласен с политикой конфиденциальности</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}