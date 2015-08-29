import CheckoutList from './CheckoutList.jsx'
import CheckoutForm from './CheckoutForm.jsx'
﻿var AltContainer = require('alt/AltContainer');
var CheckoutStore = require('../stores/CheckoutStore');
var CheckoutActions = require('../actions/CheckoutActions');

export default class CheckoutBox {
    componentDidMount() {
        CheckoutStore.fetchCheckouts();
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
				<CheckoutForm />
				<AltContainer store={CheckoutStore}>
					<CheckoutList />
				</AltContainer>
            </div>
        );
    }
}
