import Util from '../utils/Util';
﻿var alt = require('../alt');
var CheckoutActions = require('../actions/CheckoutActions');
var CheckoutSource = require('../sources/CheckoutSource');

// 貸出・返却画面の状態とその制御
// (こんな考え方でいいのか？ちょっと違うような気がする)
class CheckoutStore {
    constructor() {
        this.checkouts = Util.emptyResults();   // 貸出一覧
        this.currentUser = null;                // 入力されたユーザ
        this.currentBook = null;                // 入力された本
        this.bookCheckout = null;               // 入力された本の貸出情報
        this.errorMessage = null;

        this.bindListeners({
            handleUpdateCheckouts: CheckoutActions.updateCheckouts,
            handleFetchCheckouts: CheckoutActions.fetchCheckouts,
            handleCheckoutsFailed: CheckoutActions.checkoutsFailed,

            handleUpdateCurrentUser: CheckoutActions.updateCurrentUser,
            handleFetchCurrentUser: CheckoutActions.fetchCurrentUser,
            handleCurrentUserFailed: CheckoutActions.currentUserFailed,

            handleUpdateCurrentBook: CheckoutActions.updateCurrentBook,
            handleFetchCurrentBook: CheckoutActions.fetchCurrentBook,
            handleCurrentBookFailed: CheckoutActions.currentBookFailed,

            handleUpdateBookCheckout: CheckoutActions.updateBookCheckout,
            handleFetchBookCheckout: CheckoutActions.fetchBookCheckout,
            handleBookCheckoutFailed: CheckoutActions.bookCheckoutFailed,
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
        this.checkouts = Util.emptyResults();
    }

    handleCheckoutsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleUpdateCurrentUser(currentUser) {
        this.currentUser = currentUser;
        this.errorMessage = null;
    }

    handleFetchCurrentUser() {
        this.currentUser = null;
    }

    handleCurrentUserFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleUpdateCurrentBook(currentBook) {
        this.currentBook = currentBook;
        this.errorMessage = null;
    }

    handleFetchCurrentBook() {
        this.currentBook = null;
    }

    handleCurrentBookFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleUpdateBookCheckout(bookCheckout) {
        this.bookCheckout = bookCheckout;
        this.errorMessage = null;
    }

    handleFetchBookCheckout() {
        this.bookCheckout = null;
    }

    handleBookCheckoutFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(CheckoutStore, 'CheckoutStore');
