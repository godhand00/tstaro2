import BaseComponent from './BaseComponent.jsx'
import MenuUtil from '../utils/MenuUtil.jsx'

export default class TopMenu extends BaseComponent {
    render() {
        return (<nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" onClick={MenuUtil.handleSelect.bind(null, 0)}>
                                <img alt="Brand" src="/images/favicon.png"/>
                            </a>
                        </div>
                    </div>
                </nav>);
    }
}
