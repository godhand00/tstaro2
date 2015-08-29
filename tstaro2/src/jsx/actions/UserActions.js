var alt = require('../alt');

class UserActions {
    updateUsers(users) {
        this.dispatch(users);
    }

    fetchUsers() {
        this.dispatch();
    }

    usersFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(UserActions);
