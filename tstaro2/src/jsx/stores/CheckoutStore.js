var alt = require('../alt');
var CheckoutActions = require('../actions/CheckoutActions');
var CheckoutSource = require('../sources/CheckoutSource');

class CheckoutStore {
    constructor() {
        this.checkouts = [];
        this.errorMessage = null;

        this.bindListeners({
            handleUpdateCheckouts: CheckoutActions.UPDATE_CHECKOUTS,
            handleFetchCheckouts: CheckoutActions.FETCH_CHECKOUTS,
            handleCheckoutsFailed: CheckoutActions.CHECKOUTS_FAILED
        });

        // this.exportPublicMethods({
        //     getCheckout: this.getCheckout
        // });

        this.exportAsync(CheckoutSource);
    }

    handleUpdateCheckouts(checkouts) {
        this.checkouts = checkouts;
        this.errorMessage = null;
    }

    handleFetchCheckouts() {
        this.checkouts = [];
    }

    handleCheckoutsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(CheckoutStore, 'CheckoutStore');
