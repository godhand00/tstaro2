import BaseComponent from './BaseComponent.jsx'

export default class Checkout extends BaseComponent {
    render() {
        return (
			<tr>
                <td>{this.props.author}</td>
                <td>{this.props.children}</td>
            </tr>
        );
    }
}
