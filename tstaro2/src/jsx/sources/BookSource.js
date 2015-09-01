import HttpUtil from '../utils/HttpUtil'
var BookActions = require('../actions/BookActions');﻿

var BookSource = {
    fetchBooks() {
        return {
            remote(store, regno) {
                let url = "/api/books/sudako";
                let cond = "";
                if (regno) {
                    if (cond)
                        cond += "&";
                    cond += "regno=" + regno;
                }
                if (cond)
                    url += "?" + cond;
            return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local(store, regno) {
                return null;
            },
            success: BookActions.updateBooks,
            error: BookActions.booksFailed,
            loading: BookActions.fetchBooks
        }
    }
}

module.exports = BookSource;
