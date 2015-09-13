var alt = require('../alt');

class LoginActions {
    completeLogin(loginUser) {
        this.dispatch(loginUser);
    }

    login() {
        this.dispatch();
    }

    loginFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(LoginActions);
﻿
