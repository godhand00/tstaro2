var CheckoutStore = require('../stores/CheckoutStore');
var UserStore = require('../stores/UserStore');
var BookStore = require('../stores/BookStore');

export default class CheckoutForm {
    render() {
        var userName = "";
        var bookName = "";
        if (this.props.Users.users.totalCount > 0)
            userName = this.props.Users.users.results[0].name;
        if (this.props.Books.books.totalCount > 0)
            bookName = this.props.Books.books.results[0].Title;
        if (this.props.Users.users.totalCount > 0 ) {
            if (this.props.Books.books.totalCount == 0)
                React.findDOMNode(this.refs.regno).focus();
            else {
                if (this.props.Checkouts.checkouts.totalCount == 0)
                    React.findDOMNode(this.refs.checkout).focus();
                else
                    React.findDOMNode(this.refs.checkin).focus();
            }
        } else
            React.findDOMNode(this.refs.account).focus();

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
            if (!account) {
                return;
            }
            UserStore.fetchUsers(account);
            if (!regno) {
                CheckoutStore.fetchCheckouts(account);
            }
            else {
                BookStore.fetchBooks(regno);
                CheckoutStore.fetchCheckouts(account, regno);
            }
        }
    }

    handleCheckoutSubmit(e) {
        alert("貸出");
    }

    handleCheckinSubmit(e) {
        alert("返却");
    }
}
