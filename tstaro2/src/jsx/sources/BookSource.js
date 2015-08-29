import HttpUtil from '../utils/HttpUtil'
var BookActions = require('../actions/BookActions');﻿

var BookSource = {
    fetchBooks() {
        return {
            remote() {
                const url = "/api/books/sudako";
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local() {
                return null;
            },
            success: BookActions.updateBooks,
            error: BookActions.booksFailed,
            loading: BookActions.fetchBooks
        }
    }
}

module.exports = BookSource;
