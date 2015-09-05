import HttpUtil from '../utils/HttpUtil'
var CheckoutActions = require('../actions/CheckoutActions');﻿

var CheckoutSource = {
    fetchCheckouts() {
        return {
            remote(state, account, regno) {
                let url = "/api/checkouts/sudako";
                let cond = "void_p=false";
                if (account) {
                    if (cond)
                        cond += "&";
                    cond += "account=" + account;
                }
                if (regno) {
                    if (cond)
                        cond += "&";
                    cond += "regno=" + regno;
                }
                if (cond)
                    url += "?" + cond;
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local(state, account, regno) {
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
                let url = "/api/users/sudako";
                let cond = "";
                if (account) {
                    if (cond)
                        cond += "&";
                    cond += "account=" + account;
                }
                if (cond)
                    url += "?" + cond;
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, account) {
                return null;
            },
            success: CheckoutActions.updateCurrentUsers,
            error: CheckoutActions.currentUsersFailed,
            loading: CheckoutActions.fetchCurrentUsers
        }
    },

    fetchCurrentBook() {
        return {
            remote(state, regno) {
                let url = "/api/books/sudako";
                let cond = "";
                if (regno) {
                    if (cond)
                        cond += "&";
                    cond += "regno=" + regno;
                }
                if (cond)
                    url += "?" + cond;
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, regno) {
                return null;
            },
            success: CheckoutActions.updateCurrentBooks,
            error: CheckoutActions.currentBooksFailed,
            loading: CheckoutActions.fetchCurrentBooks
        }
    },

    fetchBookCheckout() {
        return {
            remote(state, account, regno) {
                let url = "/api/checkouts/sudako";
                let cond = "void_p=false";
                if (account) {
                    if (cond)
                        cond += "&";
                    cond += "account=!" + account;
                }
                if (regno) {
                    if (cond)
                        cond += "&";
                    cond += "regno=" + regno;
                }
                if (cond)
                    url += "?" + cond;
                return new Promise((resolve, reject) => HttpUtil.firstOrDefault(url, resolve, reject));
            },
            local(state, account, regno) {
                return null;
            },
            success: CheckoutActions.updateBookCheckouts,
            error: CheckoutActions.bookCheckoutsFailed,
            loading: CheckoutActions.fetchBookCheckouts
        }
    }
}

module.exports = CheckoutSource;
