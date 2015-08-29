import CheckoutBox from './CheckoutBox.jsx'

export default class MainMenu {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>図書太郎</h1>
                </div>
                <ul className="list-group">
                    <li className="list-group-item" onClick={
                        () => React.render(<CheckoutBox />,document.getElementById('content'))
                    } active>貸出・返却</li>
                    <li className="list-group-item">本を探す</li>
                </ul>
            </div>
        );
    }
}
