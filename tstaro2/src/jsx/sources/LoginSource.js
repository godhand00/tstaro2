import HttpUtil from '../utils/HttpUtil'
import Util from '../utils/Util'
var LoginActions = require('../actions/LoginActions');﻿

var LoginSource = {
    login() {
        return {
            remote(state, domain, account, password) {
                var url = "/api/login/" + domain;
                var data = {
                    "account": account,
                    "password": password
                };
                return new Promise((resolve, reject) => HttpUtil.post(url, data, resolve, reject));
            },
            local(state, domain, account, password) {
                return null;
            },
            success: LoginActions.completeLogin,
            error: LoginActions.loginFailed,
            loading: LoginActions.login
        }
    }
}﻿

module.exports = LoginSource;
