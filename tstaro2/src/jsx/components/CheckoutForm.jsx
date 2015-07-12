import BaseComponent from './BaseComponent.jsx'
import {Button, Table} from 'react-bootstrap'

export default class CheckoutForm extends BaseComponent {
	constructor() {
		super();
		this._bind('_handleSubmit');
	}

    _handleSubmit(e) {
        e.preventDefault();
        var regno = React.findDOMNode(this.refs.regno).value.trim();
        var account = React.findDOMNode(this.refs.account).value.trim();
        if (!regno || !account) {
            return;
        }
        this.props.onCheckoutSubmit({regno: regno, account: account});
        React.findDOMNode(this.refs.regno).value = '';
        React.findDOMNode(this.refs.account).value = '';
        return;
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
				<Table>
					<thead></thead>
					<tbody>
						<tr><td>借りる人の番号</td><td><input type="text" placeholder="ユーザNo" ref="regno" /></td><td></td></tr>
						<tr><td>本の番号</td><td><input type="text" placeholder="登録No" ref="account" /></td><td></td></tr>
						<tr><td></td><td></td><td></td></tr>
						<tr><td></td><td></td><td><Button type="submit">貸出</Button></td></tr>
					</tbody>
				</Table>
            </form>
        );
    }
}
