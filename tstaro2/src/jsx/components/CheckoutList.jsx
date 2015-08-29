import Checkout from './Checkout.jsx'

export default class CheckoutList {
    render() {
        var checkoutNodes = this.props.checkouts.map((checkout) => {
            return (
                <Checkout author={checkout.Author}>
                    {checkout.Title}
                </Checkout>
            );
        });
        return (
			<div>
				<table className="table table-striped table-bordered table-condensed table-hover">
					<thead>
						<tr><th>Author</th><th>Title</th></tr>
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
