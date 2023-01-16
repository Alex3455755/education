import React from "react";
import Card from '../components/card/card.jsx';
import classes from './styels.css';

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = { listsale: [], listlov: [] }
        this.list = []

    }
    render() {
        fetch('http://192.168.0.52:3000/elems')
            .then((res) => res.json())
            .then((data) => {
                this.list = data.elems
            })
        fetch("http://192.168.0.52:3000/sale")
            .then((res) => res.json())
            .then((datain) => {
                if (window.userSign) {
                    fetch('/list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({ jwt: document.cookie }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({ listlov: data.lovleList, listsale: datain });
                        })
                } else {
                    this.setState({ listsale: datain });
                }
            })
        return (
            <div className="center_box">
                <div className="piew_box">
                    <div className="bake">
                        <h3 className="title_bake">Начните день
                            с вкусной выпечи
                            из нашей кулинарии</h3>
                        <button className="text btn_go_shop"></button>
                    </div>
                    <div className="cashback">
                        <h4 className="title_cashback">Кэшбэк с каждой покупки</h4>
                        <img src="img/basket.png" alt="backet" className="img_cashback" />
                    </div>
                    <div className="total">
                        <div className="stars">
                            <img src="img/star_2b50.svg" alt="star" className="star_total" />
                            <img src="img/star_2b50.svg" alt="star" className="star_total" />
                            <img src="img/star_2b50.svg" alt="star" className="star_total" />
                            <img src="img/star_2b50.svg" alt="star" className="star_total" />
                            <img src="img/star_2b50.svg" alt="star" className="star_total" />
                        </div>
                        <div className="text_total">Оставьте отзыв и получи 5% скидку</div>
                        <img src="img/like.svg" alt="like" className="img_total" />
                    </div>
                </div>
                <div className="sales">
                    <div className="sales_top">
                        <h4 className="title_saels">СКИДКИ</h4>
                        <button className="show_all">Смотреть все
                            <div className="arrow_sales"></div>
                        </button>
                    </div>
                    <div className="cards">
                        {this.state.listsale.map((item) => {
                            return <Card key={item.id} id={item.id} price={item.price} img={item.img}
                                name={item.name} count={item.amount} dopClass=''
                                inlov={this.state.listlov.indexOf(item.id.toString()) !== -1}
                                sale={item.saleVisible} oldPrice={item.oldPrice} />
                        })}
                    </div>
                </div>
                {this.list.map((item) => {
                    return (
                        <CatalogMenu title={item.title} key={this.list.indexOf(item)} list={item.list} isSale={item.isSale} />
                    )
                })}
                <div class="sales supermarket" id="market">
                    <div class="sales_top">
                        <h4 class="title_saels">ДОСТАВКА И ОПЛАТА</h4>
                    </div>
                    <div class="map_box">
                        <div class="advantages">
                            <div class="advantege">
                                <h6 class="map_name">Зоны доставки</h6>
                                <p class="map_text">Доставка осуществляется в районе ЖК «Ильинские Луга»
                                    (Московская обл., Красногорск, пос. Ильинское-Усово, ул. Заповедная) и ЖК «Новая Рига»
                                    (Московская обл., Красногорск, д. Глухово, ул. Рублевское Предместье)</p>
                            </div>
                            <div class="advantege">
                                <h6 class="map_name">25 минут</h6>
                                <p class="map_text">Доставка 25 минут. Принимаем заказы с 7:00 до 23:00</p>
                            </div>
                            <div class="advantege">
                                <h6 class="map_name">500 ₽</h6>
                                <p class="map_text">Минимальная сумма бесплатной доставки с учетом скидок.
                                    Иначе стоимость доставке 250 ₽</p>
                            </div>
                            <div class="advantege">
                                <h6 class="map_name">Оплата</h6>
                                <p class="map_text">При оформлении заказа вы можете выбрать удобный для вас спобос рассчета
                                    <br />
                                    Изображения продуктов могут отличаться от продуктов в заказе.
                                </p>
                            </div>
                        </div>
                        <div class="direction">
                            <h6 class="map_name">Карта доставки</h6>
                            <div class="map">
                                <img src="img/map.png" alt="map" class="map_img" />
                                <img src="img/red_zone.png" alt="red_zone" class="red_zone" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="labels">
                    <div class="lable lable_one">
                        <div class="free_deliver">
                            <h3 class="text_lable">БЕСПЛАТНАЯ ДОСТАВКА + Скидка 10%</h3>
                            <div class="orange">
                                <h6 class="text_orange">первого заказа</h6>
                                <h6 class="text_orange">на заказы клинарии</h6>
                            </div>
                        </div>
                        <div class="get_promo">
                            <button class="btn_promo">Получить промокод</button>
                        </div>
                    </div>
                    <div class="lable lable_two">
                        <div class="mark-up">
                            <h3 class="title_lable_two">Оцените магазин</h3>
                            <p class="text_lable_two">Поделитесь впечатлениями о заказе
                                и помогите сделать нас лучше</p>
                        </div>
                        <div class="feedback">
                            <div class="stars stars_two">
                                <img src="img/gold_star.svg" alt="star" />
                                <img src="img/gold_star.svg" alt="star" />
                                <img src="img/gold_star.svg" alt="star" />
                                <img src="img/gold_star.svg" alt="star" />
                                <img src="img/grey_star.svg" alt="grey star" />
                            </div>
                            <button class="btn_feedback">Оставить отзыв</button>
                        </div>
                        <img src="img/avacados.png" alt="avacado" class="avacado" />
                    </div>
                </div>
            </div>
        )
    }
}

class SalesTop extends React.Component {
    constructor(props) {
        super(props)
        this.title = props.title;
    }
    render() {
        return (
            <div className="sales_top">
                <h4 className="title_saels">{this.title}</h4>
                <button className="show_all">Смотреть все
                    <div className="arrow_sales"></div>
                </button>
            </div>
        )
    }
}

class ElemColumn extends React.Component {
    constructor(props) {
        super(props)
        this.title1 = props.title1;
        this.title2 = props.title2;
        this.class = props.class;
        this.img1 = props.img1;
        this.img2 = props.img2;
        this.lable = props.lable;
        this.isLast = props.isLast;
    }
    render() {
        return (
            <div className="elem_column">
                <div className={'elem ' + this.class}>
                    <h5 className="name_elem">{this.title1}</h5>
                    {this.img1.map((item) => {
                        return (
                            <img src={item.dir} alt="равиоли" key={this.img1.indexOf(item)} className={"img_elem " + item.classImg} />
                        )
                    })}
                    <div className={this.lable ? "promo_code" : ''}>{this.lable}</div>
                </div>
                <div className={this.title2 ? ('elem ' + this.class) : ''}>
                    <h5 className="name_elem">{this.title2}</h5>
                    {this.img2.map((item) => {
                        return (
                            <img src={item.dir} alt="равиоли" key={this.img2.indexOf(item)} className={"img_elem " + item.classImg} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

class CatalogMenu extends React.Component {
    constructor(props) {
        super(props);
        this.isSale = props.isSale;
        this.title = props.title;
        this.list = props.list;
    }
    render() {
        return (
            <div className="sales supermarket" id="other">
                <SalesTop title={this.title} />
                <div className="elems">
                    {this.list.map((item) => {
                        return (
                            <ElemColumn title1={item.title1} title2={item.title2}
                                class={item.class} isLast={item.last} img1={item.img1}
                                img2={item.img2} key={this.list.indexOf(item)}
                                lable={item.lable} />
                        )
                    })}
                </div>
            </div>
        )
    }
}