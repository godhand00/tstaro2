import CheckoutList from './CheckoutList.jsx'
import CheckoutForm from './CheckoutForm.jsx'
﻿var AltContainer = require('alt/AltContainer');
var CheckoutStore = require('../stores/CheckoutStore');

export default class CheckoutBox extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //CheckoutStore.fetchCheckouts();
    }

    render() {
        if (CheckoutStore.isLoading()) {
      		return (
        		<div>
          			<img src="/images/ajax-loader.gif" />
        		</div>
      		);
    	}
        return (
            <div>
                <h1>貸出・返却</h1>
                <AltContainer store={CheckoutStore}>
                    <CheckoutForm />
					<CheckoutList />
				</AltContainer>
            </div>
        );
    }
}
