import TopMenu from './components/TopMenu.jsx'
import MainMenu from './components/MainMenu.jsx'

React.render(
    <TopMenu />,
    document.getElementById('header')
);
React.render(
    <MainMenu />,
    document.getElementById('content')
);
