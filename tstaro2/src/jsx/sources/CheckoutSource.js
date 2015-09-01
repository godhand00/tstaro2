import HttpUtil from '../utils/HttpUtil'
var CheckoutActions = require('../actions/CheckoutActions');﻿

var CheckoutSource = {
    fetchCheckouts() {
        return {
            remote(store, account, regno) {
                let url = "/api/checkouts/sudako";
                let cond = "";
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
            local(store, account) {
                return null;
            },
            success: CheckoutActions.updateCheckouts,
            error: CheckoutActions.checkoutsFailed,
            loading: CheckoutActions.fetchCheckouts
        }
    }
}

module.exports = CheckoutSource;
