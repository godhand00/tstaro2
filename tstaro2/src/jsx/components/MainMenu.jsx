import CheckoutBox from './CheckoutBox.jsx'
import LoginForm from './LoginForm.jsx'
import LoginStore from '../stores/LoginStore'

export default class MainMenu extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>図書太郎</h1>
                </div>
                <div className="list-group">
                    <a href="#" className="list-group-item" onClick={
                        this.handleOnClick.bind(this)
                    } active>貸出・返却</a>
                    <a href="#" className="list-group-item">図書館の本を探す</a>
                    <a href="#" className="list-group-item">Amazonで本を探す</a>
                </div>
                <div className="list-group">
                    <a href="#" className="list-group-item">本の登録・修正</a>
                    <a href="#" className="list-group-item">利用者の登録・修正</a>
                </div>
                <div className="list-group">
                    <a href="#" className="list-group-item">マスタ管理(NDC,NDC9,分類,...)</a>
                    <a href="#" className="list-group-item">貸出中一覧</a>
                    <a href="#" className="list-group-item">貸出履歴</a>
                </div>
            </div>
        );
    }
    handleOnClick(e) {
        React.render(<CheckoutBox />, document.getElementById('content'));
    }
}
