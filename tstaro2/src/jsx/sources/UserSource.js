import HttpUtil from '../utils/HttpUtil'
var UserActions = require('../actions/UserActions');﻿

var UserSource = {
    fetchUsers() {
        return {
            remote(store, account) {
                let url = "/api/users/sudako";
                let cond = "";
                if (account) {
                    if (cond)
                        cond += "&";
                    cond += "account=" + account;
                }
                if (cond)
                    url += "?" + cond;
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local(store, account) {
                return null;
            },
            success: UserActions.updateUsers,
            error: UserActions.usersFailed,
            loading: UserActions.fetchUsers
        }
    }
}

module.exports = UserSource;
