import HttpUtil from '../utils/HttpUtil'
var UserActions = require('../actions/UserActions');﻿

var UserSource = {
    fetchUsers() {
        return {
            remote() {
                const url = "/api/users/sudako";
                return new Promise((resolve, reject) => HttpUtil.get(url, resolve, reject));
            },
            local() {
                return null;
            },
            success: UserActions.updateUsers,
            error: UserActions.usersFailed,
            loading: UserActions.fetchUsers
        }
    }
}

module.exports = UserSource;
