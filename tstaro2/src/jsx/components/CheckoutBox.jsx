import CheckoutList from './CheckoutList.jsx'
import CheckoutForm from './CheckoutForm.jsx'
﻿var AltContainer = require('alt/AltContainer');
var CheckoutStore = require('../stores/CheckoutStore');
var UserStore = require('../stores/UserStore');
var BookStore = require('../stores/BookStore');

export default class CheckoutBox {
    componentDidMount() {
        //CheckoutStore.fetchCheckouts();
    }

    render() {
        if (CheckoutStore.isLoading() || UserStore.isLoading()) {
      		return (
        		<div>
          			<img src="/images/ajax-loader.gif" />
        		</div>
      		);
    	}
        return (
            <div>
                <h1>貸出・返却</h1>
                <AltContainer stores={
                    {
                        Users: UserStore,
                        Books: BookStore,
                        Checkouts: CheckoutStore
                    }
                }>
                    <CheckoutForm />
                </AltContainer>
				<AltContainer store={CheckoutStore}>
					<CheckoutList />
				</AltContainer>
            </div>
        );
    }
}
