import React from "react";
import Card from '../components/card/card.jsx';
import classes from './styels.css';

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.saleList = props.saleList;

    }
    render() {
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
            </div>
        )
    }
}