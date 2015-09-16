"use strict";
import Util from '../utils/Util';
import CheckoutStore from '../stores/CheckoutStore';

export default class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var userName = "";
        var bookName = "";
        if (this.props.currentUser)
            userName = this.props.currentUser.name;
        if (this.props.currentBook)
            bookName = this.props.currentBook.Title;
        var message = this.getMessage();
        var cnCheckout = "btn btn-primary btn-block";
        if (!this.props.checkoutEnabled)
            cnCheckout += " disabled";
        var cnCheckin = "btn btn-primary btn-block";
        if (!this.props.checkinEnabled)
            cnCheckin += " disabled";
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
                        onKeyUp={this.handleKeyUp.bind(this)}/></div>
					<div className="col-md-6 panel panel-default">
                        <div className="panel-body">{bookName}</div>
                    </div>
				</div>
				<div className="row">
					<div className="col-md-8 panel panel-default">
                        <div className="panel-body">{message}</div>
                    </div>
					<div className="col-md-2">
                        <button type="submit" className={cnCheckout} ref="checkout"
                            onClick={this.handleCheckoutSubmit.bind(this)}>貸出</button>
                    </div>
					<div className="col-md-2">
					    <button type="submit" className={cnCheckin} ref="checkin"
                            onClick={this.handleCheckinSubmit.bind(this)}>返却</button>
                    </div>
				</div>
			</div>
        );
    }

    componentDidMount() {
        this.setFocus();
    }

    componentDidUpdate(prevProps, prevStatus) {
        this.setFocus();
    }

    setFocus() {
        if (this.props.checkoutEnabled)
            React.findDOMNode(this.refs.checkout).focus();
        else if (this.props.checkinEnabled)
            React.findDOMNode(this.refs.checkin).focus();
        else {
            var account = React.findDOMNode(this.refs.account).value;
            var regno = React.findDOMNode(this.refs.regno).value;
            if (!account)
                React.findDOMNode(this.refs.account).focus();
            else if (!regno)
                React.findDOMNode(this.refs.regno).focus();
        }
    }

    getMessage() {
        var message = "";
        if (this.props.checkoutEnabled) {
            message = "貸出できます";
        } else if (this.props.checkinEnabled) {
            message = "返却できます";
        } else if (this.props.bookCheckout && this.props.currentUser) {
            if (this.props.bookCheckout.account != this.props.currentUser.account)
                message = this.props.bookCheckout.name + "さんが借りています";
        }
        return message;
    }

    handleKeyUp(e) {
        if (e.which == 13)
            this.handleInputChange();
    }

    handleInputChange() {
        var account = React.findDOMNode(this.refs.account).value;
        var regno = React.findDOMNode(this.refs.regno).value;

        CheckoutStore.fetchCheckouts(account, regno);
        CheckoutStore.fetchCurrentUser(account);
        CheckoutStore.fetchCurrentBook(regno);
        CheckoutStore.fetchBookCheckout(regno);
    }

    handleCheckoutSubmit(e) {
        if (this.props.checkoutEnabled) {
            var user = this.props.currentUser;
            var book = this.props.currentBook;
            var from_date = Util.getToday();
            var reg_date = Util.getToday();
            var due_date = Util.getToday();
            due_date.setDate(from_date.getDate() + 7);
            CheckoutStore.registerCheckout({
                "account": user.account,
                "name": user.name,
                "grade": user.grade,
                "class": user.class,
                "regno": book.regno,
                "Title": book.Title,
                "Author": book.Author,
                "from_date": from_date,
                "due_date": due_date,
                "checkin_date": null,
                "comment": "",
                "regdate": reg_date,
                "upddate": reg_date,
                "void_p": false
            });
        }
    }

    handleCheckinSubmit(e) {
        if (this.props.checkinEnabled) {
            alert("返却");
            CheckoutStore.registerCheckin(account, regno);
        }
    }
}
