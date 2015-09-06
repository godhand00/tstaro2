import Checkout from './Checkout.jsx'

export default class CheckoutList {
    render() {
        if (this.props.errorMessage) {
			return (
        		<div>{this.props.errorMessage}</div>
      		);
		}
        var checkoutNodes = this.props.checkouts.results.map((checkout, index) => {
            return (
                <Checkout
                    index={index + 1}
                    author={checkout.Author}
                    title={checkout.Title}
                    from_date={checkout.from_date}
                />
            );
        });
        var pageCount = parseInt((this.props.checkouts.totalCount + 25) / 25);
        var pagenation = Array.from(new Array(pageCount), (x, i) => i + 1)
            .map((page) => {
                return (
                    <li><a href="#">{page}</a></li>
                );
            });
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
                  <ul className="pagination">
                    <li>
                      <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {pagenation}
                    <li>
                      <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
        );
    }
}
