import Util from '../utils/Util';
﻿var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');
var LoginSource = require('../sources/LoginSource');
﻿
class LoginStore {
    constructor() {
        this.loginUser = null;
        this.errorMessage = null;

        this.bindListeners({
            handleCompleteLogin: LoginActions.completeLogin,
            handleLogin: LoginActions.login,
            handleLoginFailed: LoginActions.loginFailed
        });

        this.exportAsync(LoginSource);
    }

    handleCompleteLogin(loginUser) {
        this.loginUser = loginUser;
        this.errorMessage = null;
    }

    handleLogin() {
        this.loginUser = null;
    }

    handleLoginFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');
