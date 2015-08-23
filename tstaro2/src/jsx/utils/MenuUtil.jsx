import CheckoutBox from '../components/CheckoutBox.jsx'
import MainMenu from '../components/MainMenu.jsx'

export default class MenuUtil {
    static handleSelect(selectedKey) {
        switch (selectedKey) {
            case 0: // メインメニュー
                React.render(
                    <MainMenu />,
                    document.getElementById('content')
                );
                break;
            case 1: // 貸出・返却
                React.render(
                    <CheckoutBox url="/api/checkouts/sudako" />,
                    document.getElementById('content')
                );
                break;
            case 2: // 図書館の本を探す
                break;
            case 3: // Amazonで探す
                break;
            default:
                break;
        }
    }
}