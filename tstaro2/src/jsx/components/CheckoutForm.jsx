import BaseComponent from './BaseComponent.jsx'

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
			<div className="container">
				<div className="row">
					<div className="col-md-2">借りる人の番号</div>
					<div className="col-md-4"><input type="text" placeholder="ユーザNo" className="form-control" ref="regno" /></div>
					<div className="col-md-4"></div>
				</div>
				<div className="row">
					<div className="col-md-2">本の番号</div>
					<div className="col-md-4"><input type="text" placeholder="登録No" className="form-control" ref="account" /></div>
					<div className="col-md-4"></div>
				</div>
				<div className="row pull-right">
                    <button type="submit" className="btn btn-primary" onClick={this._handleSubmit}>貸出</button>
					<button type="submit" className="btn btn-primary" onClick={this._handleSubmit}>返却</button>
				</div>
			</div>
        );
    }
}
