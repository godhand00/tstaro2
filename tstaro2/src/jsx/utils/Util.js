export default class Util {
    static emptyResults() {
        return {
            "results": [],
            "totalCount": 0,
            "start": 0
        };
    }

    static jsonDateToDate(value) {
        var d = new Date(value);
        return d.toISOString().substring(0, 10);
    }

    static getToday() {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    }
}
