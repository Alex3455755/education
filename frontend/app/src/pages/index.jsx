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
            </div>
        )
    }
}