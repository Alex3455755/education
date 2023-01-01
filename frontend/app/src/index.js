import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './components/menu/menu.jsx';
import Index from './pages/index.jsx';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';

window.userSign = false;

class About extends React.Component {
  render() {
    return <h2 className='title'>О сайте</h2>;
  }
}
class NotFound extends React.Component {

  render() {
    return <h2>Ресурс не найден</h2>;
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <Menu screnSizeVids={window.screen.width} userSign={window.userSign}/>
        <Index />
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
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
