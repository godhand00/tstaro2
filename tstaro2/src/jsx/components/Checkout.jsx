export default class Checkout {
    render() {
        return (
			<tr>
                <td>{this.props.author}</td>
                <td>{this.props.children}</td>
            </tr>
        );
    }
}
