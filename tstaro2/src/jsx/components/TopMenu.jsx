import MainMenu from './MainMenu.jsx'
var AltContainer = require('alt/AltContainer');
var LoginStore = require('../stores/LoginStore');

export default class TopMenu extends React.Component {
    render() {
        return (<nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" onClick={
                                () => React.render(
                                    <MainMenu />,
                                    document.getElementById('content')
                                )
                            }>
                                <img alt="Brand" src="/images/favicon.png"/>
                            </a>
                        </div>
                    </div>
                </nav>);
    }
}
