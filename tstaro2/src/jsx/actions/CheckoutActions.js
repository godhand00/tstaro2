var alt = require('../alt');

class CheckoutActions {
    updateCheckouts(checkouts) {
        this.dispatch(checkouts);
    }

    fetchCheckouts() {
        this.dispatch();
    }

    checkoutsFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(CheckoutActions);
