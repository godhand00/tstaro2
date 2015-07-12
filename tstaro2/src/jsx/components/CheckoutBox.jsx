import BaseComponent from './BaseComponent.jsx'
import CheckoutList from './CheckoutList.jsx'
import CheckoutForm from './CheckoutForm.jsx'

export default class CheckoutBox extends BaseComponent {
	constructor() {
		super();
        this.state = {data: {results: []}};
	}

    _loadCheckoutFromServer() {
        var self = this;
        $.ajax({
            url: self.props.url,
            dataType: "json",
            cache: false
        }).done(function(data) {
            self.setState({data: data});
        }).fail(function(xhr, status, err) {
            console.error(self.props.url, status, err.toString());
        });
    }

    _handleCheckoutSubmit(checkout) {
        var self = this;
        $.ajax({
            url: self.props.url,
            dataType: 'json',
            type: 'POST',
            data: checkout
        }).done(function(data) {
			self._loadCheckoutFromServer();
        }).fail(function(xhr, status, err) {
            console.error(self.props.url, status, err.toString());
        });
    }

    getInitialState() {
        return {data: {results: []}};
    }

    componentDidMount() {
        this._loadCheckoutFromServer();
    }

    render() {
        return (
            <div>
                <h1>本の貸出</h1>
                <CheckoutForm onCheckoutSubmit={this._handleCheckoutSubmit}/>
                <CheckoutList data={this.state.data.results} />
            </div>
        );
    }
}

