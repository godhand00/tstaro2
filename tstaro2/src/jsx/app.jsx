import TopMenu from './components/TopMenu.jsx'
import MainMenu from './components/MainMenu.jsx'
import Footer from './components/Footer.jsx'
var AltContainer = require('alt/AltContainer');
var LoginStore = require('./stores/LoginStore');

React.render(
    <TopMenu />,
    document.getElementById('header')
);

React.render(
    <MainMenu />,
    document.getElementById('content')
);

React.render(
    <Footer />,
    document.getElementById('footer')
);
