var CheckoutStore = require('../stores/CheckoutStore');

export default class CheckoutForm {
    render() {
        var userName = "";
        var bookName = "";
        if (this.props.curretUser != null)
            userName = this.props.currentUser.name;
        if (this.props.currentBook != null)
            bookName = this.props.currentBook.Title;

        return (
			<div className="container">
				<div className="row">
					<div className="col-md-2">借りる人の番号</div>
					<div className="col-md-4"><input type="text" placeholder="ユーザNo" className="form-control" ref="account"
                        onKeyUp={this.handleKeyUp.bind(this)} /></div>
					<div className="col-md-6 panel panel-default">
                        <div className="panel-body">{userName}</div>
                    </div>
				</div>
				<div className="row">
					<div className="col-md-2">本の番号</div>
					<div className="col-md-4"><input type="text" placeholder="登録No" className="form-control" ref="regno"
                        onKeyUp={this.handleKeyUp.bind(this)} /></div>
					<div className="col-md-6 panel panel-default">
                        <div className="panel-body">{bookName}</div>
                    </div>
				</div>
				<div className="row">
					<div className="col-md-8 panel panel-default">
                        <div className="panel-body">
                        </div>
                    </div>
					<div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-block" ref="checkout"
                            onClick={this.handleCheckoutSubmit.bind(this)}>貸出</button>
                    </div>
					<div className="col-md-2">
					    <button type="submit" className="btn btn-primary btn-block" ref="checkin"
                            onClick={this.handleCheckinSubmit.bind(this)}>返却</button>
                    </div>
				</div>
			</div>
        );
    }

    handleKeyUp(e) {
        if (e.which == 13)
        {
            var account = React.findDOMNode(this.refs.account).value.trim();
            var regno = React.findDOMNode(this.refs.regno).value.trim();
            if (account)
                CheckoutStore.fetchCurrentUser(account);
            if (regno)
                CheckoutStore.fetchCurrentBook(regno);

            if (account)
                CheckoutStore.fetchCheckouts(account, regno);
            if (account && regno)
                CheckoutStore.fetchBookCheckout(account, regno);
        }
    }

    handleCheckoutSubmit(e) {
        alert("貸出");
    }

    handleCheckinSubmit(e) {
        alert("返却");
    }
}
