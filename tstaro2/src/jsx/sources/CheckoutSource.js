import HttpUtil from '../utils/HttpUtil'
var CheckoutActions = require('../actions/CheckoutActions');﻿

var CheckoutSource = {
    fetchCheckouts() {
        return {
            remote() {
                const url = "/api/checkouts/sudako";
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local() {
                return null;
            },
            success: CheckoutActions.updateCheckouts,
            error: CheckoutActions.checkoutsFailed,
            loading: CheckoutActions.fetchCheckouts
        }
    }
}

module.exports = CheckoutSource;
