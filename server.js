const express = require("express");
const app = express();
const jsonParser = express.json();
const path = require('path');
const mysql = require("mysql2");

const menuDate = [
  { title: "Супермаркет", img: "img/Rectangle 12613.svg", alt: "apple", href: "http://192.168.0.52:3000/catalog?catigore=",id: 0 },
  { title: "Кулинария", img: "img/pizza.svg", alt: "cook", href: "http://192.168.0.52:3000/catalog?catigore=",id: 1 },
  { title: "Заморозка", img: "img/trsto.svg", alt: "freez", href: "http://192.168.0.52:3000/catalog?catigore=",id: 2 },
  { title: "Другое", img: "img/meat.svg", alt: "another", href: "http://192.168.0.52:3000/catalog?catigore=",id: 3 },
  { title: "Акции", img: "img/fire.svg", alt: "sale", href: "http://192.168.0.52:3000/catalog?catigore=",id:  4},
  { title: "Магазин", img: "img/lolipop.svg", alt: "market", href: "#market",id: 5},
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
  host: "localhost",
  user: "root",
  database: "shopDB",
  password: "MySql:65108bipE;"
});

app.get('/nav',(req,res)=>{
  res.json({list: menuDate});
});

app.post('/sign', jsonParser, function (req, res) {
  const name = req.body.name;
  const passwordInput = req.body.password;
  console.log(passwordInput)
  /* connection.query('SELECT name,password,id,role,lovleList FROM users where name = ?', [name], function (err, data) {
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
  }); */
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/app/public/index.html'));
});



  
const PORT = 8000;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));