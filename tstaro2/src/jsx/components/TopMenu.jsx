import MainMenu from './MainMenu.jsx'

export default class TopMenu {
    render() {
        return (<nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" onClick={
                                () => React.render(<MainMenu />, document.getElementById('content'))
                            }>
                                <img alt="Brand" src="/images/favicon.png"/>
                            </a>
                        </div>
                    </div>
                </nav>);
    }
}
