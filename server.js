const express = require("express");
const app = express();
const jsonParser = express.json();
const path = require('path');
const mysql = require("mysql2");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = 'bipE';

const menuDate = [
  { title: "Супермаркет", img: "img/apple.svg", alt: "apple", href: "http://192.168.0.52:3000/catalog?catigore=", id: 0 },
  { title: "Кулинария", img: "img/pizza.svg", alt: "cook", href: "http://192.168.0.52:3000/catalog?catigore=", id: 1 },
  { title: "Заморозка", img: "img/trsto.svg", alt: "freez", href: "http://192.168.0.52:3000/catalog?catigore=", id: 2 },
  { title: "Другое", img: "img/meat.svg", alt: "another", href: "http://192.168.0.52:3000/catalog?catigore=", id: 3 },
  { title: "Акции", img: "img/fire.svg", alt: "sale", href: "http://192.168.0.52:3000/catalog?catigore=", id: 4 },
  { title: "Магазин", img: "img/lolipop.svg", alt: "market", href: "#market", id: 5 },
];
const catigoriesText = [
  { title: "Супермаркет", num: "3", isCheked: false, list: ["Снэки и сухофрукты", "Кофе, чай и сладости", "Макароны и крупы", "Хлеб и выпечка", "Масло, соусы и специи", "Консервы и соления"], isNoFirst: true, isElems: true },
  { title: "Кулинария", num: "4", isCheked: false, list: ["Выпечка", "Гриль-меню", "Салаты", "Горячие блюда", "Пиццы", "Супы", "Десерты", "Свежее Мясо"], isNoFirst: true, isElems: true },
  { title: "Заморозка", num: "5", isCheked: false, list: ["Пельмени вареники и равиоли", "Полу-фабрикаты", "Рыба и морепродукты", "Мясо", "Хинкали и манты", "Замороженные овощи"], isNoFirst: true, isElems: true },
  { title: "Другое", num: "6", isCheked: false, list: ["Красота и Гигиена", "Стирка и Уборка", "Полезные Мелочи", "Бытовая Химия"], isNoFirst: true, isElems: true },
  { title: "Акции", num: "1", isCheked: true, list: ["предзаказ со скидкой", "Праздник к нам приходит", "Скидка на третий товар «Чистая линия»", "Комбо-набор три пиццы за 1500"], isNoFirst: false, isElems: true, },
  { title: "Популярное", num: "2", isCheked: true, list: ["Вода и напитки", "Молоко, масло и яйца", "Снэки и сухофрукты", "Кофе, чай и сладости", "Макароны и крупы", "Хлеб и выпечка"], isNoFirst: true, isElems: false },
  { title: "Продукция от Ильинского", num: "7", isCheked: false, list: [""], isNoFirst: true, isElems: false },
];

const connection = mysql.createConnection({
  host: "192.168.0.52",
  user: "root",
  database: "shopDB",
  password: "MySql:65108bipE;"
});

app.post('/input', jsonParser, function (req, res) {
  const request = req.body;
  connection.query('SELECT name,price,amount,oldPrice,sale,img,id FROM cards', function (err, data) {
    const result = data.filter(({ name }) => {
      return name.match(new RegExp(request.value, 'gui'))
    });
    if (result.length) { res.json(result) }
    else { res.json([{ id: 0, name: "нет данных", price: 0, amount: "", oldPrice: "", img: "" }]) }
  });
});

app.get('/nav', (req, res) => {
  res.json({ list: menuDate });
});

app.post('/sign', jsonParser, function (req, res) {
  const name = req.body.name;
  const passwordInput = req.body.password;
  connection.query('SELECT name,password,id,role,lovleList FROM users where name = ?', [name], function (err, data) {
    if (!data.length) { res.json({ err: true, message: 'пользователь с таким логином не зарегестрирован' }) }
    else {
      let listlove = data[0].lovleList.split(' ');
      listlove = listlove.filter((item) => item != '');
      argon2.verify(data[0].password, passwordInput)
        .then((val) => {
          if (val) {
            const token = jwt.sign({ name: name, role: data[0].role, }, secret, { expiresIn: '2h' });
            res.json({ err: false, jwt: token, name: name, role: data[0].role, lovleList: listlove });
          }
          else {
            res.json({ err: true, message: "неверный пароль" });
          }
        });
    }
  });
});

app.post('/lovers', jsonParser, function (req, res) {
  const logic = req.body.del;
  const id = req.body.id;
  const result = jwt.verify(req.body.jwt, secret);
  if (logic) {
    connection.query(`UPDATE users SET lovleList= REPLACE(lovleList,?,'') WHERE name=?`, [" " + id, result.name],)
  } else {
    connection.query(`UPDATE users SET lovleList= CONCAT(lovleList," ",?) WHERE name=?`, [id, result.name],)
  }
});

app.post('/auth', jsonParser, function (req, res) {
  if (req.body.jwt !== '') {
    try {
      const result = jwt.verify(req.body.jwt, secret);
      connection.query('SELECT lovleList,cartList from users where name=?', [result.name], (err, data) => {
        if (data[0]) {
          const list = data[0] ? data[0].lovleList.split(' ').filter((item) => item != '') : [];
          res.json({
            name: result.name, succes: true, role: result.role,
            loveList: list, cartList: data[0].cartList === ' ' ? '' : JSON.parse(data[0].cartList)
          });
        } else {
          res.json({
            name: result.name, succes: true, role: result.role,
            loveList: [], cartList: [],
          });
        }

      });
    } catch (TokenExpiredError) {
      console.log('time men');
    }
  }
});

app.get('/sale', function (req, res) {
  connection.query("SELECT name,price,amount,oldPrice,sale,img,id FROM cards WHERE sale=?", [true], function (err, data) {
    const card = [];
    for (let i of data) {
      if (i == data[data.length - 1]) {
        card.push({ name: i.name, amount: i.amount, price: i.price, oldPrice: i.oldPrice, saleVisible: i.sale, img: i.img, id: i.id, haveImg: true, isLastCard: true });
      }
      else { card.push({ name: i.name, amount: i.amount, price: i.price, oldPrice: i.oldPrice, saleVisible: i.sale, id: i.id, img: i.img, haveImg: true, }) }
    }
    res.json(card);
  })
})

app.post('/login', jsonParser, function (req, res) {
  const name = req.body.name;
  const password = req.body.password;
  connection.query('SELECT name,id,role,lovleList FROM users WHERE name=?', [name], (err, data) => {
    if (data.length) {
      res.json({ err: true, message: 'пользователь с таким именем уже существует' });
    } else {
      newPas = argon2.hash(password)
        .then((val) => {
          connection.query('INSERT INTO users(name,password,role) VALUE(?,?,?)', [name, val, "user"]);
        });
      const token = jwt.sign({ name: name, role: 'user' }, secret, { expiresIn: '2h' });
      res.json({ err: false, jwt: token, name: name, role: 'user', });
    }
  })
});

app.post('/list', jsonParser, (req, res) => {
  const result = jwt.verify(req.body.jwt, secret);
  connection.query('SELECT lovleList,cartList FROM users WHERE name=?', [result.name], (err, data) => {
    if (data[0]) {
      res.json({
        lovleList: data[0].lovleList.split(' ').filter((item) => item != ''),
        cartList: data[0].cartList === ' ' ? '' : JSON.parse(data[0].cartList),
        name: result.name,
      });
    }
    else { res.json({ lovleList: [], cartList: [], name: result.name }) }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/app/public/index.html'));
});




const PORT = 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));