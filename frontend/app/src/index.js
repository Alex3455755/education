import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './components/menu/menu.jsx';
import Index from './pages/index.jsx';
import Catalog from './pages/catalog.jsx';
import Footer from './components/footer/footer.jsx';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';

const link = 'http://192.168.0.52:3000';
window.userSign = false;

class Cat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { cartList: [], loveList: [], userSign: false}
  }
  render() {
    return (
      <div>
        <Menu screnSizeVids={window.screen.width} userSign={this.state.userSign} />
        <Catalog />
        <Footer />
      </div>
    )
  }
}
class NotFound extends React.Component {

  render() {
    return <h2>Ресурс не найден</h2>;
  }
}

function verification() {
  if (document.cookie) {
    const token = { jwt: document.cookie };
    fetch(link + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(token),
    }).then((res) => res.json())
      .then((data) => {
        if (data.succes) {
          window.userSign = true;
        }
      })
  }
}

verification();

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { cartList: [], loveList: [] }
    this.changeState = this.changeState.bind(this)
  }
  changeState(answer) {
    this.setState({ userSign: answer });
  }
  render() {
    return (
      <div>
        <Menu screnSizeVids={window.screen.width} userSign={this.state.userSign} calback={this.changeState} />
        <Index />
        <Footer />
      </div>
    )
  }
}
ReactDOM.createRoot(
  document.getElementById("app")
)
  .render(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalog" element={<Cat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
