import Checkout from './Checkout.jsx'
import CheckoutStore from '../stores/CheckoutStore';
import Pagination from './Pagination.jsx';

export default class CheckoutList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.errorMessage) {
			return (
        		<div>{this.props.errorMessage}</div>
      		);
		}
        var checkoutNodes = this.props.checkouts.results.map((checkout, index) => {
            return (
                <Checkout
                    index={this.props.checkouts.start + 1 + index}
                    author={checkout.Author}
                    title={checkout.Title}
                    from_date={checkout.from_date}
                />
            );
        });
        var pageCount = parseInt((this.props.checkouts.totalCount + 25) / 25);
        var currentPage = parseInt((this.props.checkouts.start + 25) / 25);
        return (
			<div>
				<table className="table table-striped table-bordered table-condensed table-hover">
					<thead>
						<tr><th></th><th>タイトル</th><th>著者</th><th>貸出日</th></tr>
					</thead>
					<tbody>
						{checkoutNodes}
					</tbody>
				</table>
                <nav>
                    <Pagination pageCount={pageCount} currentPage={currentPage} handlePageClick={this.handlePageClick.bind(this)} />
                </nav>
            </div>
        );
    }
    handlePageClick(page) {
        var account = null;
        if (this.props.currentUser)
            account = this.props.currentUser.account;
        var regno = null;
        if (this.props.currentBook)
            regno = this.props.currentBook.regno;
        CheckoutStore.fetchCheckouts(account, regno, (page - 1) * 25);
    }
}
