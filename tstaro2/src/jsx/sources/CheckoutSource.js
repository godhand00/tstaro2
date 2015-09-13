import HttpUtil from '../utils/HttpUtil'
import Util from '../utils/Util'
var CheckoutActions = require('../actions/CheckoutActions');﻿

// TODO: ログイン時に指定するDOMAINとログイン情報を渡す
var CheckoutSource = {
    fetchCheckouts() {
        return {
            remote(state, account, regno, start) {
                if (!account)
                    return new Promise((resolve, reject) => {
                        resolve(Util.emptyResults());
                    });
                var url = HttpUtil.createUrl("/api/checkouts/sudako", {
                    "void_p": "false",
                    "account": account,
                    "regno": regno,
                    "start": start
                });
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local(state, account, regno, start) {
                return null;
            },
            success: CheckoutActions.updateCheckouts,
            error: CheckoutActions.checkoutsFailed,
            loading: CheckoutActions.fetchCheckouts
        }
    },

    fetchCurrentUser() {
        return {
            remote(state, account) {
                if (!account)
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                var url = HttpUtil.createUrl("/api/users/sudako", {
                    "account": account
                });
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, account) {
                return null;
            },
            success: CheckoutActions.updateCurrentUser,
            error: CheckoutActions.currentUserFailed,
            loading: CheckoutActions.fetchCurrentUser
        }
    },

    fetchCurrentBook() {
        return {
            remote(state, regno) {
                if (!regno)
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                var url = HttpUtil.createUrl("/api/books/sudako", {
                    "regno": regno
                });
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, regno) {
                return null;
            },
            success: CheckoutActions.updateCurrentBook,
            error: CheckoutActions.currentBookFailed,
            loading: CheckoutActions.fetchCurrentBook
        }
    },

    fetchBookCheckout() {
        return {
            remote(state, regno) {
                if (!regno)
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                var url = HttpUtil.createUrl("/api/checkouts/sudako", {
                    "void_p": "false",
                    "regno": regno
                });
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, regno) {
                return null;
            },
            success: CheckoutActions.updateBookCheckout,
            error: CheckoutActions.bookCheckoutFailed,
            loading: CheckoutActions.fetchBookCheckout
        }
    },

    registerCheckout() {
        return {
            remote(state, data) {
                var url = "/api/checkouts/sudako";
                return new Promise((resolve, reject) => HttpUtil.post(url, data, resolve, reject));
            },
            local(state, data) {
                return null;
            },
            success: CheckoutActions.completeRegisterCheckout,
            error: CheckoutActions.registerCheckoutFailed,
            loading: CheckoutActions.registerCheckout
        }
    },

    registerCheckin() {
        return {
            remote(state, data) {
                var url = "/api/checkouts/sudako";
                return new Promise((resolve, reject) => HttpUtil.put(url, data, resolve, reject));
            },
            local(state, data) {
                return null;
            },
            success: CheckoutActions.completeRegisterCheckin,
            error: CheckoutActions.registerCheckinFailed,
            loading: CheckoutActions.registerCheckin
        }
    }
}

module.exports = CheckoutSource;
