var CheckoutActions = require('../actions/CheckoutActions');﻿

var CheckoutSource = {
    fetchCheckouts() {
        return {
            remote() {
                const url = "/api/checkouts/sudako";
                return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = () => {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            var data = JSON.parse(xhr.response);
                            resolve(data["results"]);
                        } else {
                            reject(new Error(xhr.statusText));
                        }
                    };
                    xhr.onerror = () => {
                        reject(new Error(xhr.statusText));
                    };
                    xhr.send(null);
                });
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
