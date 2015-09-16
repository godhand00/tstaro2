import Util from '../utils/Util'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
			<tr>
                <td>{this.props.index}</td>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{Util.jsonDateToDate(this.props.from_date)}</td>
            </tr>
        );
    }
}
