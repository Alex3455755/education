import classes from './card.css';
import React from 'react';
const link = 'http://192.168.0.52:3000';

class Heart extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id;
        this.state = { acitve: false, inlov: props.inlov }
        this.addLovList = this.addLovList.bind(this)
    }
    sendCards(obj) {
        if (window.userSign) {
            fetch(link + '/lovers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(obj),
            });
        }
    }
    addLovList() {
        if (!this.state.inlov) {
            this.setState({ acitve: !this.state.acitve });
            if (this.state.acitve) {
                if (window.userSign){
                    this.sendCards({ id: this.id, del: true, jwt: document.cookie });
                }
            } else {
                this.sendCards({ id: this.id, del: false, jwt: document.cookie });
            }
        } else {
            this.setState({ acitve: false, inlov: false });
            this.sendCards({ id: this.id, del: true, jwt: document.cookie });
        }
    }
    render() {
        let className = 'heart';
        if (this.state.acitve || this.state.inlov) { className += ' red' }
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
        this.cartCount = props.cartCount;
        this.count = props.count;
        this.img = props.img;
        this.oldPrice = props.oldPrice;
        this.sale = props.sale;
        this.inlov = props.inlov;
        this.inCart = props.inCart;

    }
    renderSale() {
        if (this.sale) {
            return <div className="sale_lable">%</div>
        }
    }
    ChangeBacket() {
        if (this.inCart) {
            <div className="counter_in_backet">
                <p className="add_cat remove_cat">-</p>
                <p className="counter">{this.cartCount}</p>
                <p className="add_cat">+</p>
            </div>
        } else {
            return <button className="btn_in_backet">В корзину</button>
        }
    }
    render() {
        return (
            <div className={'card ' + this.dopClass}>
                <div className="card_img">
                    {this.renderSale()}
                    <img src={this.img} alt="product" className="img_product" />
                    <Heart id={this.id} inlov={this.inlov} />
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
                            {this.oldPrice ? <div className="old_price">{this.oldPrice + '₽'}</div> : ''}
                        </div>
                        {this.ChangeBacket()}
                    </div>
                </div>
            </div>
        )
    }
}