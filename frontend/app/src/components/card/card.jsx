import classes from './card.css';
import React from 'react';

class Heart extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id
        this.state = { acitve: false }
        this.addLovList = this.addLovList.bind(this)
    }
    addLovList() {
        this.setState({ acitve: !this.state.acitve });
    }
    render() {
        let className = 'heart';
        if (this.state.acitve) { className += ' red' }
        return <div className={className} onClick={this.addLovList}></div>
    }
}



export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.dopClass = props.dopClass;
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.count = props.count;
        this.img = props.img;
        this.oldPrice = props.oldPrice;
        this.sale = props.sale;
        this.inCart = false;

    }
    renderSale(){
        if (this.sale){
            return <div class="sale_lable">%</div>
        }
    }
    ChangeBacket(count) {
        if (this.inCart) {
            <div class="counter_in_backet">
                <p class="add_cat remove_cat">-</p>
                <p class="counter">{count}</p>
                <p class="add_cat">+</p>
            </div>
        } else {
            return <button className="btn_in_backet">В корзину</button>
        }
    }
    render() {
        return (
            <div className={'card' + this.dopClass}>
                <div className="card_img">
                    {this.renderSale()}
                    <img src={this.img} alt="product" className="img_product" />
                    <Heart id={this.id} />
                </div>
                <div className="product_info">
                    <div className="count">
                        <div className="price">{`В наличии ${this.count} шт`}</div>
                        <div className="price">{`${this.price},00 ₽/шт`}</div>
                    </div>
                    <div className="product_name">{this.name}</div>
                    <div className="buy">
                        <div className="price_box">
                            <div className={"real_price" + (this.sale ? ' sale_price' : '')}>{`${this.price},00 ₽/шт`}</div>
                            {this.oldPrice ? <div class="old_price">{this.oldPrice + '₽'}</div> : ''}
                        </div>
                        {this.ChangeBacket()}
                    </div>
                </div>
            </div>
        )
    }
}