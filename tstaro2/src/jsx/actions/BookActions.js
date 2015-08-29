var alt = require('../alt');

class BookActions {
    updateBooks(books) {
        this.dispatch(books);
    }

    fetchBooks() {
        this.dispatch();
    }

    booksFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(BookActions);
