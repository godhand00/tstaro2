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
        return (
			<div>
				<table className="table table-striped table-bordered table-condensed table-hover">
					<thead>
						<tr><th></th><th>著者</th><th>タイトル</th><th>貸出日</th></tr>
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
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
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
