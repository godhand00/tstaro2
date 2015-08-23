import BaseComponent from './BaseComponent.jsx'
import MenuUtil from '../utils/MenuUtil.jsx'

export default class MainMenu extends BaseComponent {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>図書太郎</h1>
                </div>
                <ul className="list-group">
                    <li className="list-group-item" onClick={MenuUtil.handleSelect.bind(null, 1)} active>貸出・返却</li>
                    <li className="list-group-item" onClick={MenuUtil.handleSelect.bind(null, 2)}>本を探す</li>
                </ul>
            </div>
        );
    }
}
