var alt = require('../alt');

class CheckoutActions {
    // Checkouts
    updateCheckouts(checkouts) {
        this.dispatch(checkouts);
    }

    fetchCheckouts() {
        this.dispatch();
    }

    checkoutsFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    // User
    updateCurrentUser(currentUser) {
        this.dispatch(currentUser);
    }

    fetchCurrentUser() {
        this.dispatch();
    }

    currentUserFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    // Book
    updateCurrentBook(currentBook) {
        this.dispatch(currentBook);
    }

    fetchCurrentBook() {
        this.dispatch();
    }

    currentBookFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    // BookCheckout
    updateBookCheckout(bookCheckout) {
        this.dispatch(checkout);
    }

    fetchBookCheckout() {
        this.dispatch();
    }

    bookCheckoutFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(CheckoutActions);
