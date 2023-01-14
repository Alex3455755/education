import React from "react";
import Card from '../components/card/card.jsx';
import classes from './styels.css';

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = { listsale: [], listlov: [] }

    }
    render() {
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
                <CatalogMenu title="Заморозка" />
                <CatalogMenu isSale={true} title="Скидки" />
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
            <div class="sales_top">
                <h4 class="title_saels">{this.title}</h4>
                <button class="show_all">Смотреть все
                    <div class="arrow_sales"></div>
                </button>
            </div>
        )
    }
}

class ElemColumn extends React.Component {
    render() {
        return (
            <div class="elem_column">
                <div class="elem elem_three">
                    <h5 class="name_elem">Пельмени, вареники и равиоли</h5>
                    <img src="img/pelmeshki.png" alt="равиоли" class="img_elem twenty" />
                </div>
                <div class="elem elem_three">
                    <h5 class="name_elem">Хинкали и манты</h5>
                    <img src="img/khinkali.png" alt="равиоли" class="img_elem twenty_one" />
                    <img src="img/khinkali.png" alt="равиоли" class="img_elem khinkal-1" />
                    <img src="img/khinkali.png" alt="равиоли" class="img_elem khinkal-2" />

                </div>
            </div>
        )
    }
}

class CatalogMenu extends React.Component {
    constructor(props) {
        super(props);
        this.isSale = props.isSale;
        this.title = props.title
    }
    render() {
        if (this.isSale) {
            return (
                <div class="sales supermarket" id="sales">
                    <SalesTop title={this.title} />
                    <div class="elems">
                        <div class="elem_column">
                            <div class="elem elem_five one_sale">
                                <h5 class="name_elem name_elem_two">Сделай предзаказ в кулинарии со скидкой</h5>
                                <img src="img/cooking.png" alt="равиоли" class="img_elem thirdty" />
                            </div>
                        </div>
                        <div class="elem_column">
                            <div class="elem elem_five two_sale">
                                <h5 class="name_elem name_elem_two">Праздник к нам приходит</h5>
                                <div class="promo_code">15% скидка</div>
                                <img src="img/coke.png" alt="равиоли" class="img_elem thirdty_one" />
                            </div>
                        </div>
                        <div class="elem_column">
                            <div class="elem elem_five three_sale">
                                <h5 class="name_elem name_elem_two">Скидка на третий товар в корзине «Чистая линия»</h5>
                                <img src="img/shampun.png" alt="равиоли" class="img_elem thirdty_two" />
                            </div>
                        </div>
                        <div class="elem_column lastColumn">
                            <div class="elem elem_five four_sale">
                                <h5 class="name_elem name_elem_two">Комбо-набор 3 пиццы за 1500 р</h5>
                                <div class="promo_code">trio1500</div>
                                <img src="img/pizza1.png" alt="равиоли" class="img_elem thirdty_three" />
                                <img src="img/pizza2.png" alt="равиоли" class="img_elem thirdty_four" />
                                <img src="img/pizza3.png" alt="равиоли" class="img_elem thirdty_five" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="sales supermarket" id="other">
                    <SalesTop title={this.title} />
                    <div class="elems">
                        <ElemColumn />
                        <div class="elem_column">
                            <div class="elem elem_three">
                                <h5 class="name_elem">Полу-фабрикаты</h5>
                                <img src="img/semi-manufactured.png" alt="равиоли" class="img_elem twenty_two" />
                            </div>
                            <div class="elem elem_three">
                                <h5 class="name_elem">Замороженные овощи</h5>
                                <img src="img/vegetables.png" alt="равиоли" class="img_elem twenty_three" />
                            </div>
                        </div>
                        <div class="elem_column">
                            <div class="elem elem_three">
                                <h5 class="name_elem">Рыба и морепродукты</h5>
                                <img src="img/fish.png" alt="равиоли" class="img_elem twenty_four" />
                            </div>
                        </div>
                        <div class="elem_column lastColumn">
                            <div class="elem elem_three">
                                <h5 class="name_elem">Мясо</h5>
                                <img src="img/meet.png" alt="равиоли" class="img_elem twenty_five" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}