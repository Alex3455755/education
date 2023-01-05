import classes from './menu.css';
import React from 'react';
import Card from '../card/card.jsx';
const link = 'http://192.168.0.52:3000';

class MenuForPhone extends React.Component {
    constructor(props) {
        super(props)
        this.screnSizeVids = props.screnSizeVids;
        this.ascentEvent = this.ascentEvent.bind(this);
        this.myRef = React.createRef();
        this.state = {
            visSearch: false,
            visCatalog: false,
        }
    }
    ascentEvent({ currentTarget }) {
        const list = currentTarget.classList;
        if (list.contains('nav_catalog')) { this.setState({ visCatalog: !this.state.visCatalog }) }
        if (list.contains('search')) { this.setState({ visSearch: !this.state.visSearch }) }
    }
    renderElem(elem, logic) {
        if (logic) {
            switch (elem.type.name) {
                case 'ModalSearch':
                    return <ModalSearch ref={this.myRef} />;
                case 'ModalCatalog':
                    return <ModalCatalog />;
                default:
                    return;
            }
        }
    }
    render() {
        return (
            <div className='header'>
                <div className="nav_catalog" onClick={this.ascentEvent}>
                    <div className="line_catalog"></div>
                    <div className="line_catalog"></div>
                    <div className="line_catalog"></div>
                </div>
                <h3 className="title">Ильйинский</h3>
                <div className="delivery_box">
                    <div className="location">
                        <img src="img/Vector.svg" alt="aroww" className="arrow" />
                        <div className="text location_name">МСК</div>
                    </div>
                    <div className="delivery">
                        <h6 className="del_text">Выберите способ получения</h6>
                        <h4 className="del_text">Доставка или самовывоз</h4>
                    </div>
                </div>
                <div className="search" onClick={this.ascentEvent}>
                    <input type="text" placeholder="Начать поиск" className="search_input text" />
                    <div className="sherlock">
                        <div className="sercule"></div>
                        <div className="line_sherlock"></div>
                    </div>
                </div>
                {this.renderElem(<ModalSearch />, this.state.visSearch)}
                {this.renderElem(<ModalCatalog />, this.state.visCatalog)}
            </div>
        )
    }
}
class Navig extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }
    componentDidMount() {
        fetch(link + '/nav')
            .then((response) => response.json())
            .then((response) => {
                this.setState({ list: response.list })
            })
    }
    render() {
        return (
            <nav>
                {this.state.list.map((item) => {
                    return (
                        <a href={item.href} className="btn_nav" key={item.id}>
                            <img src={item.img} alt="nav_img" className="img_nav" />
                            <h4 className="text">{item.title}</h4>
                        </a>
                    )
                })}
            </nav>
        )
    }
}
class MenuForDesktop extends React.Component {
    constructor(props) {
        super(props)
        this.ascentEvent = this.ascentEvent.bind(this);
        this.myRef = React.createRef();
        this.callback = props.callback;
        this.state = {
            visSearch: false,
            visCatalog: false,
            visSign: false,
            userSign: props.userSign,
        }
    }
    ascentEvent({ currentTarget }) {
        const list = currentTarget.classList;
        if (list.contains('btn_catalog')) { this.setState({ visCatalog: !this.state.visCatalog }) }
        if (list.contains('search')) { this.setState({ visSearch: !this.state.visSearch }) }
        if (list.contains('profil')) { this.setState({ visSign: !this.state.visSign }) }
    }
    renderElem(elem, logic) {
        if (logic) {
            switch (elem.type.name) {
                case 'ModalSearch':
                    return <ModalSearch ref={this.myRef} />;
                case 'ModalCatalog':
                    return <ModalCatalog />;
                case 'ModalSign':
                    return <ModalSign fn={this.callback} />
                default:
                    return;
            }
        }
    }
    render() {
        return (
            <header>
                <div className='header'>
                    <h3 className="title">Ильйинский</h3>
                    <button className="btn btn_catalog" onClick={this.ascentEvent}>
                        <div className="lines">
                            <div className={"exit_catalog" + (this.state.visCatalog ? '' : ' visible')}>
                                <div className="line_exit"></div>
                                <div className="line_exit line_ecit_two"></div>
                            </div>
                            <div className={"line" + (!this.state.visCatalog ? '' : ' visible')}></div>
                            <div className={"line" + (!this.state.visCatalog ? '' : ' visible')}></div>
                            <div className={"line" + (!this.state.visCatalog ? '' : ' visible')}></div>
                        </div>
                        <h4 className="title_catalog">Каталог</h4>
                    </button>
                    <div className="search" onClick={this.ascentEvent}>
                        <input type="text" placeholder="Начать поиск" className="search_input text" />
                        <div className="sherlock">
                            <div className="sercule"></div>
                            <div className="line_sherlock"></div>
                        </div>
                    </div>
                    <div className="delivery_box">
                        <div className="location">
                            <img src="img/Vector.svg" alt="aroww" className="arrow" />
                            <div className="text location_name">МСК</div>
                        </div>
                        <div className="delivery">
                            <h6 className="del_text">Выберите способ получения</h6>
                            <h4 className="del_text">Доставка или самовывоз</h4>
                        </div>
                    </div>
                    <div className="profil" onClick={this.ascentEvent}>
                        <div className="sercule head"></div>
                        <div className="shoulders"></div>
                    </div>
                    <div className="grey_hearth">
                        <img src="img/XMLID_810_.svg" alt="hearth" />
                    </div>
                    <div className="btn_backet">
                        <div className="img_backet">
                            <img src="img/cart.svg" alt="backet" />
                            <div className="line_backet line1"></div>
                            <div className="line_backet line2"></div>
                            <div className="line_backet line3"></div>
                        </div>
                        <h4 className="backet_title">Корзина</h4>
                    </div>
                </div>
                <Navig />
                {this.renderElem(<ModalSign userSign={this.state.userSign} />, this.state.visSign)}
                {this.renderElem(<ModalSearch />, this.state.visSearch)}
                {this.renderElem(<ModalCatalog />, this.state.visCatalog)}
            </header>

        )
    }
}

class FormSign extends React.Component {
    constructor(props) {
        super(props)
        this.btnText = props.text;
        this.state = { validlogin: '', validpas: '', activeButton: true }
        this.fn = props.fn;
        this.validInput = this.validInput.bind(this);
        this.isRegistr = props.isRegistr;
    }
    validInput({ target }) {
        if (target.type === 'text') {
            const a = 'validlogin';
            if (target.value.length < 8) {
                this.setState({ [a]: 'input_invalid' });
            } else {
                this.setState({ [a]: 'input_valid' });
            }
        }
        else {
            const a = 'validpas';
            if (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{5,}/g.test(target.value)) {
                this.setState({ [a]: 'input_valid' });
            } else {
                this.setState({ [a]: 'input_invalid' });
            }
        }
        if (this.state.validlogin === 'input_valid' && this.state.validpas === 'input_valid') {
            this.setState({ activeButton: false });
        }
        else { this.setState({ activeButton: true }) }
    }
    render() {
        return (
            <div className='div_reg'>
                <input className={this.state.validlogin} type="text" placeholder="Логин" id={this.isRegistr ? 'regname' : 'name'} onChange={this.validInput} />
                <input className={this.state.validpas} type="password" placeholder="Пароль" id={this.isRegistr ? 'regpassword' : 'password'} onChange={this.validInput} />
                <button id="signIn" disabled={this.state.activeButton} onClick={this.fn}>{this.btnText}</button>
            </div>
        )
    }
}

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.screnSizeVids = this.props.screnSizeVids;
        this.state = { userSign: props.userSign }
        this.callback = props.calback;
    }
    whatRender() {
        if (this.screnSizeVids > 450) {
            return <MenuForDesktop callback={this.callback} />
        } else {
            return <MenuForPhone />
        }
    }
    render() {
        return (
            this.whatRender(this.screnSizeVids)
        )
    }
}

class ModalCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rend: { title: "Акции", list: ['предзаказ со скидкой', 'Праздник к нам приходит', 'Скидка на третий товар «Чистая линия»', 'Комбо-набор три пиццы за 1500'] }
        }
        this.list = {
            "Супермаркет": ["Снэки и сухофрукты", "Кофе, чай и сладости", "Макароны и крупы", "Хлеб и выпечка", "Масло, соусы и специи", "Консервы и соления"],
            "Кулинария": ["Выпечка", "Гриль-меню", "Салаты", "Горячие блюда", "Пиццы", "Супы", "Десерты", "Свежее Мясо"],
            "Заморозка": ["Пельмени вареники и равиоли", "Полу-фабрикаты", "Рыба и морепродукты", "Мясо", "Хинкали и манты", "Замороженные овощи"],
            "Другое": ["Красота и Гигиена", "Стирка и Уборка", "Полезные Мелочи", "Бытовая Химия"],
            "Акции": ["предзаказ со скидкой", "Праздник к нам приходит", "Скидка на третий товар «Чистая линия»", "Комбо-набор три пиццы за 1500"],
            "Популярное": ["Вода и напитки", "Молоко, масло и яйца", "Снэки и сухофрукты", "Кофе, чай и сладости", "Макароны и крупы", "Хлеб и выпечка"],
            "Продукция от Ильинского": [""],
        }
        this.ascentCatigor = this.ascentCatigor.bind(this)
    }
    ascentCatigor(e) {
        if (e.target.tagName === "LABEL") {
            this.setState({ rend: { title: e.target.textContent, list: this.list[e.target.textContent] } });
        }
    }
    render() {
        return (
            <div className="catalog_modal">
                <div className="categories_box">
                    <div className="catigories" onClick={this.ascentCatigor}>
                        <div className="catigore">
                            <input id="radio-1" type="radio" name="radio" value="Акции" />
                            <label htmlFor="radio-1" className="text_catigore">Акции</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-2" type="radio" name="radio" value="Популярное" />
                            <label htmlFor="radio-2" className="text_catigore">Популярное</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-3" type="radio" name="radio" value="Супермаркет" />
                            <label htmlFor="radio-3" className="text_catigore">Супермаркет</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-4" type="radio" name="radio" value="Кулинария" />
                            <label htmlFor="radio-4" className="text_catigore">Кулинария</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-5" type="radio" name="radio" value="Заморозка" />
                            <label htmlFor="radio-5" className="text_catigore">Заморозка</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-6" type="radio" name="radio" value="Другое" />
                            <label htmlFor="radio-6" className="text_catigore">Другое</label>
                        </div>
                        <div className="catigore">
                            <input id="radio-7" type="radio" name="radio" value="Продукция от Ильинского" />
                            <label htmlFor="radio-7" className="text_catigore">Продукция от Ильинского</label>
                        </div>
                    </div>
                </div>
                <div className="grey_line"></div>
                <div className="list">
                    <div className="arrow_back">
                    </div>
                    <div className="list_elem">
                        <h4 className="title_list">{this.state.rend.title}</h4>
                        {this.state.rend.list.map((i, index) => {
                            return (<p className="list_text" key={index}>{i}</p>);
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
class ModalSearch extends React.Component {
    constructor(props) {
        super(props)
        this.serching = this.serching.bind(this);
        this.state = {
            resultList: [], listlov: []
        }
    }
    serching() {
        const inputValue = { value: document.querySelector('.search_place').value };
        fetch("http://192.168.0.52:3000/input", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(inputValue)
        })
            .then(res => (res.json()))
            .then(datain => {   
                fetch(link + '/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ jwt: document.cookie }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({ listlov: data.lovleList, resultList: datain});
                    })
            })

    }
    render() {

        return (
            <div className="search_modal" >
                <div className="center_box">
                    <div className="input_box">
                        <input type="text" className="search_place" maxLength="50" />
                        <div className="sercule_search" onClick={this.serching}>
                            <div className="search_line"></div>
                        </div>
                    </div>
                </div>
                <div className="search_result">
                    <div className="cards_search">
                        {this.state.resultList.map((item) => {
                            return <Card key={item.id} id={item.id} price={item.price} img={item.img}
                                name={item.name} count={item.amount} dopClass=' search_card' 
                                inlov={this.state.listlov.indexOf(item.id.toString()) !== -1} 
                                sale={item.sale} oldPrice={item.oldPrice} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
class ModalSign extends React.Component {
    constructor(props) {
        super(props)
        this.fn = props.fn;
        this.state = {
            visRegistr: false, userSign: props.userSign,
            name: '', loveListCount: 0,
        }
        this.setVis = this.setVis.bind(this);
        this.closModal = this.closModal.bind(this);
        this.whatRender = this.whatRender.bind(this);
        this.serverRespnse = this.serverRespnse.bind(this);
        this.serverRequest = this.serverRequest.bind(this);
        this.exit = this.exit.bind(this);
    }
    serverRespnse() {
        fetch(link + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: document.getElementById('regname').value,
                password: document.getElementById('regpassword').value
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                document.cookie = `${data.jwt}; max-age=7200`;
                window.userSign = true;
                this.setState({ name: data.name });
            })
    }
    whatRender(logic) {
        if (logic) {
            return (
                <div className="reg_modal">
                    <div className="close_btn" onClick={this.closModal}>
                        <div className="line_close"></div>
                        <div className="line_close line_close2"></div>
                    </div>
                    <h3>Зарегестрируйтесь </h3>
                    <div className="div_reg">
                        <FormSign text='Зарегестрироваться' fn={this.serverRespnse} isRegistr={true} />
                    </div>
                </div>
            )
        }
    }
    closModal() {
        this.setState({ visRegistr: false })
    }
    setVis(e) {
        if (e.target.classList.contains('registration')) {
            this.setState({ visRegistr: true })
        }
    }
    serverRequest() {
        fetch(link + '/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                password: document.getElementById('password').value
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                document.cookie = `${data.jwt}; max-age=3600`;
                window.userSign = true;
                this.setState({ name: data.name, loveListCount: data.lovleList.length });
            })
    }
    exit() {
        window.userSign = false;
        this.setState({ name: '' });
        document.cookie = 'name; max-age=1';
    }
    render() {
        if (window.userSign) {
            fetch(link + '/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ jwt: document.cookie }),
            }).then((res) => res.json())
                .then((data) => {
                    this.setState({ name: data.name, loveListCount: data.lovleList.length });
                })
            return (
                < div className="profil_modal_user">
                    <p id="active_name">{this.state.name}</p>
                    <p>Профиль</p>
                    <div id="point">
                        <p>Заказы</p>
                        <div className="point"></div>
                    </div>
                    <div id="point">
                        <p>Избранное</p>
                        <p id="lovList">{this.state.loveListCount + ' тов.'}</p>
                    </div>
                    <p onClick={this.exit}>Выход</p>
                </div >
            )
        }
        return (
            <div className="profil_modal">
                <h3>Авторизируйтесь </h3>
                <div className="div_reg">
                    <FormSign text='Войти' fn={this.serverRequest} isRegistr={false} />
                    <div className="registration" onClick={this.setVis}>Регистрация</div>
                </div>
                {this.whatRender(this.state.visRegistr)}
            </div>
        )
    }
}