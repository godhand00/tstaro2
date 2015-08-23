import TopMenu from './components/TopMenu.jsx'
import MenuUtil from './utils/MenuUtil.jsx'

React.render(
    <TopMenu />,
    document.getElementById('header')
);
MenuUtil.handleSelect(0);
